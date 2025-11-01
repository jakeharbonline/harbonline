'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Save,
  Download,
  Plus,
  Trash2,
  Eye,
  CreditCard,
} from 'lucide-react';
import type { Invoice, InvoiceStatus, InvoiceLineItem } from '@/lib/invoices';

export default function InvoiceDetailPage() {
  const params = useParams();
  const invoiceId = params.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<InvoiceStatus>('draft');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  // Invoice Builder
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [tax, setTax] = useState(20); // Default 20% VAT
  const [dueDate, setDueDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('Payment due within 30 days of invoice date.');

  // Fetch invoice from API
  useEffect(() => {
    async function fetchInvoice() {
      try {
        const response = await fetch(`/api/invoices/${invoiceId}`);
        const data = await response.json();

        if (data.invoice) {
          const inv = data.invoice;
          setInvoice(inv);
          setStatus(inv.status);
          setNotes(inv.notes || '');

          // Load invoice data
          setClientName(inv.clientName);
          setClientEmail(inv.clientEmail);
          setClientCompany(inv.clientCompany || '');
          setClientPhone(inv.clientPhone || '');
          setClientAddress(inv.clientAddress || '');
          setLineItems(inv.lineItems || []);
          setDiscount(inv.discount || 0);
          setDiscountType(inv.discountType || 'percentage');
          setTax(inv.tax || 20);
          setDueDate(inv.dueDate || '');
          setPaymentTerms(inv.paymentTerms || 'Payment due within 30 days of invoice date.');
        }
      } catch (error) {
        console.error('Failed to fetch invoice:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchInvoice();
  }, [invoiceId]);

  const handleSave = async () => {
    if (!invoice) return;

    const updatedInvoice = {
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
      dueDate,
      paymentTerms,
      status,
      notes,
    };

    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedInvoice),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);

        // Update local invoice state
        const result = await response.json();
        setInvoice(result.invoice);
      }
    } catch (error) {
      console.error('Failed to save invoice:', error);
    }
  };

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

  const downloadInvoice = () => {
    if (!invoice) return;

    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscount();
    const taxAmount = calculateTax();
    const total = calculateTotal();
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;

    // Harbonline Company Info Header
    pdf.setFontSize(24);
    pdf.setTextColor(106, 0, 255); // #6A00FF
    pdf.text('Harbonline Ltd', margin, yPos);

    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    yPos += 7;
    pdf.text('17 Winston Close', margin, yPos);
    yPos += 5;
    pdf.text('Bognor Regis', margin, yPos);
    yPos += 5;
    pdf.text('PO21 5DE', margin, yPos);
    yPos += 7;
    pdf.text('jake@harbonline.co.uk | www.harbonline.co.uk', margin, yPos);

    // INVOICE Title (top right)
    pdf.setFontSize(20);
    pdf.setTextColor(106, 0, 255);
    pdf.text('INVOICE', pageWidth - margin, 20, { align: 'right' });

    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Invoice #: ${invoice.invoiceNumber}`, pageWidth - margin, 28, { align: 'right' });
    pdf.text(`Date: ${currentDate}`, pageWidth - margin, 34, { align: 'right' });
    if (dueDate) {
      const dueDateFormatted = new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      pdf.text(`Due Date: ${dueDateFormatted}`, pageWidth - margin, 40, { align: 'right' });
    }

    // Line separator
    yPos += 10;
    pdf.setDrawColor(106, 0, 255);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // Client Information
    pdf.setFontSize(14);
    pdf.setTextColor(106, 0, 255);
    pdf.text('Bill To:', margin, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(clientName, margin, yPos);
    yPos += 5;

    if (clientCompany) {
      pdf.text(clientCompany, margin, yPos);
      yPos += 5;
    }

    if (clientAddress) {
      const addressLines = pdf.splitTextToSize(clientAddress, 80);
      pdf.text(addressLines, margin, yPos);
      yPos += (addressLines.length * 5);
    }

    pdf.setTextColor(60, 60, 60);
    pdf.text(clientEmail, margin, yPos);
    yPos += 5;

    if (clientPhone) {
      pdf.text(clientPhone, margin, yPos);
      yPos += 5;
    }

    yPos += 5;

    // Invoice Items
    if (lineItems.length > 0) {
      if (yPos > 200) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(14);
      pdf.setTextColor(106, 0, 255);
      pdf.text('Invoice Items', margin, yPos);
      yPos += 8;

      // Table headers
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.setFillColor(249, 249, 249);
      pdf.rect(margin, yPos - 5, pageWidth - (2 * margin), 8, 'F');
      pdf.text('Description', margin + 2, yPos);
      pdf.text('Qty', pageWidth - margin - 80, yPos);
      pdf.text('Rate', pageWidth - margin - 50, yPos);
      pdf.text('Amount', pageWidth - margin - 20, yPos, { align: 'right' });
      yPos += 6;

      // Table rows
      pdf.setTextColor(0, 0, 0);
      lineItems.forEach((item) => {
        if (yPos > 270) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.text(item.description, margin + 2, yPos);
        pdf.text(`${item.quantity}`, pageWidth - margin - 80, yPos);
        pdf.text(`£${item.rate.toFixed(2)}`, pageWidth - margin - 50, yPos);
        pdf.text(`£${(item.quantity * item.rate).toFixed(2)}`, pageWidth - margin - 2, yPos, { align: 'right' });
        yPos += 6;

        // Light divider line
        pdf.setDrawColor(240, 240, 240);
        pdf.setLineWidth(0.1);
        pdf.line(margin, yPos - 1, pageWidth - margin, yPos - 1);
      });

      yPos += 5;

      // Summary calculations
      const summaryX = pageWidth - margin - 60;

      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      pdf.text('Subtotal:', summaryX, yPos);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`£${subtotal.toFixed(2)}`, pageWidth - margin - 2, yPos, { align: 'right' });
      yPos += 6;

      if (discount > 0) {
        pdf.setTextColor(60, 60, 60);
        pdf.text(`Discount (${discountType === 'percentage' ? discount + '%' : '£' + discount}):`, summaryX, yPos);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`-£${discountAmount.toFixed(2)}`, pageWidth - margin - 2, yPos, { align: 'right' });
        yPos += 6;
      }

      if (tax > 0) {
        pdf.setTextColor(60, 60, 60);
        pdf.text(`VAT (${tax}%):`, summaryX, yPos);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`£${taxAmount.toFixed(2)}`, pageWidth - margin - 2, yPos, { align: 'right' });
        yPos += 6;
      }

      // Total line
      pdf.setDrawColor(106, 0, 255);
      pdf.setLineWidth(0.5);
      pdf.line(summaryX - 5, yPos, pageWidth - margin, yPos);
      yPos += 5;

      pdf.setFontSize(12);
      pdf.setTextColor(106, 0, 255);
      pdf.text('Total:', summaryX, yPos);
      pdf.text(`£${total.toFixed(2)}`, pageWidth - margin - 2, yPos, { align: 'right' });
      yPos += 10;
    }

    // Payment Terms
    if (paymentTerms) {
      if (yPos > 220) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(12);
      pdf.setTextColor(106, 0, 255);
      pdf.text('Payment Terms', margin, yPos);
      yPos += 6;

      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      const termsLines = pdf.splitTextToSize(paymentTerms, pageWidth - (2 * margin));
      pdf.text(termsLines, margin, yPos);
      yPos += (termsLines.length * 4) + 8;
    }

    // Bank Details
    if (yPos > 230) {
      pdf.addPage();
      yPos = 20;
    }

    pdf.setFontSize(12);
    pdf.setTextColor(106, 0, 255);
    pdf.text('Payment Details', margin, yPos);
    yPos += 6;

    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Bank Transfer Details:', margin, yPos);
    yPos += 5;
    pdf.text('Account Name: Harbonline Ltd', margin, yPos);
    yPos += 4;
    pdf.text('Sort Code: 04-00-03', margin, yPos);
    yPos += 4;
    pdf.text('Account Number: 64677401', margin, yPos);
    yPos += 8;

    // Footer
    if (yPos > 250) {
      pdf.addPage();
      yPos = 20;
    }

    pdf.setDrawColor(240, 240, 240);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Harbonline Ltd | 17 Winston Close, Bognor Regis, PO21 5DE', pageWidth / 2, yPos, { align: 'center' });
    yPos += 4;
    pdf.text('jake@harbonline.co.uk | www.harbonline.co.uk', pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
    pdf.text('Thank you for your business.', pageWidth / 2, yPos, { align: 'center' });

    // Save PDF
    pdf.save(`Invoice_${invoice.invoiceNumber}_${clientName.replace(/\s+/g, '_')}.pdf`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'sent':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'paid':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'overdue':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'cancelled':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      default:
        return 'bg-white/10 text-text-secondary border-white/20';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-text-secondary">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-text-secondary">Invoice not found</p>
          <Link href="/admin/invoices" className="text-accent-primary hover:underline mt-4 inline-block">
            Back to invoices
          </Link>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Invoice {invoice.invoiceNumber}</h1>
            <p className="text-text-secondary">{clientName}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium border capitalize ${getStatusColor(
                invoice.status
              )}`}
            >
              {invoice.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Information */}
          <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Invoice Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-accent-primary mt-0.5" />
                <div>
                  <div className="text-sm text-text-secondary mb-1">Invoice Number</div>
                  <div className="text-text-primary font-mono">{invoice.invoiceNumber}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-accent-primary mt-0.5" />
                <div>
                  <div className="text-sm text-text-secondary mb-1">Created</div>
                  <div className="text-text-primary">{formatDate(invoice.createdAt)}</div>
                </div>
              </div>

              {dueDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-accent-primary mt-0.5" />
                  <div>
                    <div className="text-sm text-text-secondary mb-1">Due Date</div>
                    <div className="text-text-primary">
                      {new Date(dueDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              )}

              {invoice.paidDate && status === 'paid' && (
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-text-secondary mb-1">Paid Date</div>
                    <div className="text-green-400">
                      {new Date(invoice.paidDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* INVOICE BUILDER */}
          <div id="invoice-builder" className="bg-bg-secondary border border-white/10 rounded-xl p-6 scroll-mt-6">
            <h2 className="text-xl font-semibold mb-4">Invoice Builder</h2>

            {/* Client Info (Editable) */}
            <div className="space-y-4 mb-6 p-5 bg-white/5 rounded-lg">
              <h3 className="font-semibold text-accent-primary">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Client Email</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
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
                    placeholder="Street address, city, postal code"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-accent-primary">Line Items</h3>
                <button
                  onClick={addLineItem}
                  className="px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-lg text-sm flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              {lineItems.length === 0 ? (
                <div className="text-center py-8 bg-white/5 rounded-lg">
                  <p className="text-text-secondary">No line items yet. Click "Add Item" to start building your invoice.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lineItems.map((item) => (
                    <div key={item.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-5">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                            placeholder="Description (e.g., Website Development)"
                            className="w-full px-3 py-2 bg-bg-tertiary rounded border border-white/10 focus:border-accent-primary outline-none text-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                            placeholder="Quantity"
                            min="0"
                            step="1"
                            className="w-full px-3 py-2 bg-bg-tertiary rounded border border-white/10 focus:border-accent-primary outline-none text-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                            placeholder="Rate"
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 bg-bg-tertiary rounded border border-white/10 focus:border-accent-primary outline-none text-sm"
                          />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2">
                          <span className="text-sm font-medium">£{(item.quantity * item.rate).toFixed(2)}</span>
                          <button
                            onClick={() => removeLineItem(item.id)}
                            className="ml-auto p-2 hover:bg-red-500/10 text-red-400 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Discount & Tax */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Discount</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="1"
                  className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Discount Type</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                  className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">VAT (%)</label>
                <input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                  step="1"
                  className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                />
              </div>
            </div>

            {/* Due Date & Payment Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Payment Terms</label>
              <textarea
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Internal notes about this invoice..."
                className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none resize-none"
              />
            </div>
          </div>

          {/* INVOICE PREVIEW */}
          {lineItems.length > 0 && (
            <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Invoice Preview</h2>
                <Eye className="w-5 h-5 text-text-secondary" />
              </div>

              <div className="bg-white text-black p-8 rounded-lg">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 border-b-2 border-purple-600 pb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-purple-600">Harbonline</h1>
                    <p className="text-sm text-gray-600">Professional Web Development & Design</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-xl font-bold text-purple-600">INVOICE</h2>
                    <p className="text-sm text-gray-600">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-600">{new Date().toLocaleDateString('en-GB')}</p>
                  </div>
                </div>

                {/* Client Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-purple-600 mb-2">Bill To:</h3>
                  <p className="text-sm">{clientName}</p>
                  {clientCompany && <p className="text-sm">{clientCompany}</p>}
                  {clientAddress && <p className="text-sm whitespace-pre-line">{clientAddress}</p>}
                  <p className="text-sm">{clientEmail}</p>
                  {clientPhone && <p className="text-sm">{clientPhone}</p>}
                </div>

                {/* Line Items */}
                <table className="w-full mb-6">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 text-sm text-gray-600">Description</th>
                      <th className="text-right py-2 text-sm text-gray-600">Qty</th>
                      <th className="text-right py-2 text-sm text-gray-600">Rate</th>
                      <th className="text-right py-2 text-sm text-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-2 text-sm">{item.description}</td>
                        <td className="text-right py-2 text-sm">{item.quantity}</td>
                        <td className="text-right py-2 text-sm">£{item.rate.toFixed(2)}</td>
                        <td className="text-right py-2 text-sm">£{(item.quantity * item.rate).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between py-2 text-sm">
                      <span>Subtotal:</span>
                      <span>£{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between py-2 text-sm">
                        <span>Discount ({discountType === 'percentage' ? discount + '%' : '£' + discount}):</span>
                        <span>-£{calculateDiscount().toFixed(2)}</span>
                      </div>
                    )}
                    {tax > 0 && (
                      <div className="flex justify-between py-2 text-sm">
                        <span>VAT ({tax}%):</span>
                        <span>£{calculateTax().toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-3 text-lg font-bold border-t-2 border-purple-600 mt-2">
                      <span className="text-purple-600">Total:</span>
                      <span className="text-purple-600">£{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="mt-6 pt-6 border-t border-gray-300">
                  <h3 className="font-semibold text-purple-600 mb-2">Payment Details</h3>
                  <p className="text-xs text-gray-600">Bank Transfer Details:</p>
                  <p className="text-xs">Account Name: Harbonline Ltd</p>
                  <p className="text-xs">Sort Code: 04-00-03</p>
                  <p className="text-xs">Account Number: 64677401</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Management */}
        <div className="space-y-6">
          {/* Status Management */}
          <div className="bg-bg-secondary border border-white/10 rounded-xl p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Manage Invoice</h2>

            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
                  className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full px-6 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {saved ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>

              {/* Download Invoice Button */}
              {lineItems.length > 0 && (
                <button
                  onClick={downloadInvoice}
                  className="w-full px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 text-white font-semibold rounded-lg transition-opacity flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Invoice
                </button>
              )}

              {/* Quick Actions */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <a
                  href={`mailto:${clientEmail}?subject=Invoice ${invoice.invoiceNumber}`}
                  className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                {clientPhone && (
                  <a
                    href={`tel:${clientPhone}`}
                    className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call Client
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-4">Invoice Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal:</span>
                <span className="font-medium">£{calculateSubtotal().toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Discount:</span>
                  <span className="font-medium text-orange-400">-£{calculateDiscount().toFixed(2)}</span>
                </div>
              )}
              {tax > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">VAT ({tax}%):</span>
                  <span className="font-medium">£{calculateTax().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-3">
                <span className="text-accent-primary">Total:</span>
                <span className="text-accent-primary">£{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Metadata */}
          {invoice.lastUpdated && (
            <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
              <h3 className="text-sm font-medium text-text-secondary mb-2">Last Updated</h3>
              <p className="text-sm">{formatDate(invoice.lastUpdated)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
