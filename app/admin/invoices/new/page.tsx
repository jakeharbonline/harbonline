'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { generateInvoiceNumber } from '@/lib/invoices';
import type { InvoiceLineItem } from '@/lib/invoices';

export default function NewInvoicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Invoice fields
  const [invoiceNumber] = useState(generateInvoiceNumber());
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    // Default: 30 days from now
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  });
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [tax, setTax] = useState(20); // Default 20% VAT
  const [paymentTerms, setPaymentTerms] = useState('Payment due within 30 days of invoice date.');
  const [notes, setNotes] = useState('');

  // Calculation functions
  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (discountType === 'percentage') {
      return (subtotal * discount) / 100;
    }
    return discount;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscount();
    return ((subtotal - discountAmount) * tax) / 100;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscount();
    const taxAmount = calculateTax();
    return subtotal - discountAmount + taxAmount;
  };

  // Line item management
  const addLineItem = () => {
    const newItem: InvoiceLineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  const updateLineItem = (id: string, field: keyof InvoiceLineItem, value: string | number) => {
    setLineItems(lineItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  // Save invoice
  const handleSave = async () => {
    if (!clientName || !clientEmail || lineItems.length === 0) {
      alert('Please fill in client name, email, and add at least one line item.');
      return;
    }

    try {
      setSaving(true);

      const invoiceData = {
        invoiceNumber,
        status: 'draft',
        dueDate,
        clientName,
        clientEmail,
        clientCompany,
        clientPhone,
        clientAddress,
        lineItems,
        subtotal: calculateSubtotal(),
        discount,
        discountType,
        tax,
        total: calculateTotal(),
        paymentTerms,
        notes,
      };

      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/admin/invoices/${data.id}`);
      } else {
        alert('Failed to create invoice');
      }
    } catch (error) {
      console.error('Failed to create invoice:', error);
      alert('Failed to create invoice');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/invoices"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to invoices
        </Link>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Create New Invoice</h1>
            <p className="text-text-secondary">Invoice #{invoiceNumber}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Client Information */}
        <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Client Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Client Name *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Client Email *</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company (Optional)</label>
              <input
                type="text"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address (Optional)</label>
              <textarea
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full md:w-auto px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Line Items</h2>
            <button
              onClick={addLineItem}
              className="px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          {lineItems.length === 0 ? (
            <p className="text-text-secondary text-center py-8">No line items yet. Click "Add Item" to start.</p>
          ) : (
            <div className="space-y-4">
              {lineItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none text-sm"
                      placeholder="Item description"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Rate (£)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <div className="px-3 py-2 bg-bg-tertiary/50 rounded-lg text-sm text-text-secondary">
                      £{(item.quantity * item.rate).toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => removeLineItem(item.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Calculations */}
          {lineItems.length > 0 && (
            <div className="mt-6 border-t border-white/10 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Discount</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      className="flex-1 px-3 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                    />
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                      className="px-3 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">£</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">VAT (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={tax}
                    onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                  />
                </div>

                <div className="md:text-right">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between md:justify-end gap-4">
                      <span className="text-text-secondary">Subtotal:</span>
                      <span>£{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between md:justify-end gap-4">
                        <span className="text-text-secondary">Discount:</span>
                        <span>-£{calculateDiscount().toFixed(2)}</span>
                      </div>
                    )}
                    {tax > 0 && (
                      <div className="flex justify-between md:justify-end gap-4">
                        <span className="text-text-secondary">VAT:</span>
                        <span>£{calculateTax().toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between md:justify-end gap-4 text-xl font-bold text-accent-primary pt-2 border-t border-white/10">
                      <span>Total:</span>
                      <span>£{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Terms & Notes */}
        <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Terms & Notes</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Payment Terms</label>
              <textarea
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none resize-none"
                placeholder="e.g., Payment due within 30 days of invoice date."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Internal Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none resize-none"
                placeholder="Add any internal notes..."
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/invoices"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={saving || !clientName || !clientEmail || lineItems.length === 0}
            className="px-6 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Creating...' : 'Create Invoice'}
          </button>
        </div>
      </div>
    </div>
  );
}
