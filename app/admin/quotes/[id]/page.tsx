'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  Save,
  Download,
  Plus,
  Trash2,
  Eye,
} from 'lucide-react';
import type { QuoteRequest, QuoteStatus, QuoteLineItem } from '@/lib/mock-quotes';

export default function QuoteDetailPage() {
  const params = useParams();
  const quoteId = params.id as string;

  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<QuoteStatus>('new');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  // Quote Builder
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [tax, setTax] = useState(20); // Default 20% VAT
  const [validUntil, setValidUntil] = useState('');
  const [terms, setTerms] = useState('Payment due within 30 days of project completion.');

  // Fetch quote from Firebase
  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch(`/api/quotes/${quoteId}`);
        const data = await response.json();

        if (data.quote) {
          setQuote(data.quote);
          setStatus(data.quote.status);
          setNotes(data.quote.notes || '');

          // Load quote builder data or auto-fill from client info
          if (data.quote.quoteBuilder) {
            setClientName(data.quote.quoteBuilder.clientName);
            setClientEmail(data.quote.quoteBuilder.clientEmail);
            setClientCompany(data.quote.quoteBuilder.clientCompany || '');
            setClientPhone(data.quote.quoteBuilder.clientPhone || '');
            setLineItems(data.quote.quoteBuilder.lineItems || []);
            setDiscount(data.quote.quoteBuilder.discount || 0);
            setDiscountType(data.quote.quoteBuilder.discountType || 'percentage');
            setTax(data.quote.quoteBuilder.tax || 20);
            setValidUntil(data.quote.quoteBuilder.validUntil || '');
            setTerms(data.quote.quoteBuilder.terms || 'Payment due within 30 days of project completion.');
          } else {
            // Auto-fill from quote request
            setClientName(data.quote.name);
            setClientEmail(data.quote.email);
            setClientCompany(data.quote.company || '');
            setClientPhone(data.quote.phone || '');

            // Set default valid until (30 days from now)
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 30);
            setValidUntil(futureDate.toISOString().split('T')[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch quote:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, [quoteId]);

  const handleSave = async () => {
    if (!quote) return;

    const quoteBuilder = {
      clientName,
      clientEmail,
      clientCompany,
      clientPhone,
      lineItems,
      subtotal: calculateSubtotal(),
      discount,
      discountType,
      tax,
      total: calculateTotal(),
      validUntil,
      terms,
    };

    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          notes,
          quoteBuilder,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);

        // Update local quote state
        setQuote({ ...quote, status, notes, quoteBuilder });
      }
    } catch (error) {
      console.error('Failed to save quote:', error);
    }
  };

  const addLineItem = () => {
    const newItem: QuoteLineItem = {
      id: Date.now().toString(),
      description: '',
      hours: 0,
      rate: 50,
    };
    setLineItems([...lineItems, newItem]);
  };

  const updateLineItem = (id: string, field: keyof QuoteLineItem, value: string | number) => {
    setLineItems(lineItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.hours * item.rate), 0);
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

  const downloadQuote = () => {
    if (!quote) return;

    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscount();
    const taxAmount = calculateTax();
    const total = calculateTotal();
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    .header { display: flex; justify-between; align-items: start; margin-bottom: 40px; border-bottom: 3px solid #6A00FF; padding-bottom: 20px; }
    .header h1 { color: #6A00FF; margin: 0; font-size: 32px; }
    .header p { color: #666; margin: 5px 0 0; }
    .header-right { text-align: right; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #6A00FF; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px; }
    .info-grid { display: grid; grid-template-columns: 150px 1fr; gap: 10px; margin-bottom: 15px; }
    .info-label { font-weight: 600; color: #666; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #f9f9f9; text-align: left; padding: 12px; border-bottom: 2px solid #ddd; color: #666; font-weight: 600; }
    td { padding: 12px; border-bottom: 1px solid #f0f0f0; }
    .text-right { text-align: right; }
    .summary { margin-top: 30px; }
    .summary-table { width: 300px; margin-left: auto; }
    .summary-table td { padding: 8px; }
    .summary-table .total { font-size: 24px; font-weight: bold; color: #6A00FF; border-top: 2px solid #6A00FF; padding-top: 12px; }
    .terms { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 30px; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>Harbonline</h1>
      <p>Professional Web Development & Design</p>
      <p style="margin-top: 10px; font-size: 14px;">jake@harbonline.co.uk | www.harbonline.co.uk</p>
    </div>
    <div class="header-right">
      <h2 style="color: #6A00FF; margin: 0;">QUOTATION</h2>
      <p style="margin: 5px 0 0; font-size: 14px;">Date: ${currentDate}</p>
      ${validUntil ? `<p style="margin: 5px 0 0; font-size: 14px;">Valid Until: ${new Date(validUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>` : ''}
    </div>
  </div>

  <div class="section">
    <h2>Client Information</h2>
    <div class="info-grid">
      <div class="info-label">Name:</div>
      <div>${clientName}</div>
      ${clientCompany ? `<div class="info-label">Company:</div><div>${clientCompany}</div>` : ''}
      <div class="info-label">Email:</div>
      <div>${clientEmail}</div>
      ${clientPhone ? `<div class="info-label">Phone:</div><div>${clientPhone}</div>` : ''}
    </div>
  </div>

  <div class="section">
    <h2>Project Overview</h2>
    <div class="info-grid">
      <div class="info-label">Project Type:</div>
      <div style="text-transform: capitalize;">${quote.projectType.replace('-', ' ')}</div>
      <div class="info-label">Timeline:</div>
      <div style="text-transform: capitalize;">${quote.timeline.replace('-', ' to ')}</div>
    </div>
    <p style="margin-top: 15px;"><strong>Description:</strong></p>
    <p style="white-space: pre-wrap;">${quote.description}</p>
  </div>

  ${lineItems.length > 0 ? `
  <div class="section">
    <h2>Quote Breakdown</h2>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th class="text-right">Hours</th>
          <th class="text-right">Rate</th>
          <th class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${lineItems.map(item => `
          <tr>
            <td>${item.description}</td>
            <td class="text-right">${item.hours}h</td>
            <td class="text-right">£${item.rate.toFixed(2)}/hr</td>
            <td class="text-right">£${(item.hours * item.rate).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="summary">
      <table class="summary-table">
        <tr>
          <td>Subtotal:</td>
          <td class="text-right">£${subtotal.toFixed(2)}</td>
        </tr>
        ${discount > 0 ? `
        <tr>
          <td>Discount (${discountType === 'percentage' ? discount + '%' : '£' + discount}):</td>
          <td class="text-right">-£${discountAmount.toFixed(2)}</td>
        </tr>
        ` : ''}
        ${tax > 0 ? `
        <tr>
          <td>VAT (${tax}%):</td>
          <td class="text-right">£${taxAmount.toFixed(2)}</td>
        </tr>
        ` : ''}
        <tr>
          <td class="total">Total:</td>
          <td class="text-right total">£${total.toFixed(2)}</td>
        </tr>
      </table>
    </div>
  </div>
  ` : ''}

  ${terms ? `
  <div class="terms">
    <h3 style="margin: 0 0 10px; color: #6A00FF;">Terms & Conditions</h3>
    <p style="margin: 0; white-space: pre-wrap;">${terms}</p>
  </div>
  ` : ''}

  <div class="footer">
    <p>Harbonline | jake@harbonline.co.uk | www.harbonline.co.uk</p>
    <p>Thank you for considering Harbonline for your project.</p>
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Quote_${clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getSelectedServices = () => {
    if (!quote) return [];
    const services = [];
    if (quote.services.design) services.push('Web Design');
    if (quote.services.development) services.push('Web Development');
    if (quote.services.ecommerce) services.push('E-Commerce');
    if (quote.services.customSoftware) services.push('Custom Software');
    if (quote.services.seo) services.push('SEO');
    if (quote.services.maintenance) services.push('Maintenance & Support');
    return services;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'reviewed':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'quoted':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'accepted':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'declined':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
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
          <p className="text-text-secondary">Loading quote...</p>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-text-secondary">Quote not found</p>
          <Link href="/admin/quotes" className="text-accent-primary hover:underline mt-4 inline-block">
            Back to quotes
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
          href="/admin/quotes"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to quotes
        </Link>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{quote.name}</h1>
            <p className="text-text-secondary">Quote Request Details</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium border capitalize ${getStatusColor(
              quote.status
            )}`}
          >
            {quote.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent-primary mt-0.5" />
                <div>
                  <div className="text-sm text-text-secondary mb-1">Email</div>
                  <a
                    href={`mailto:${quote.email}`}
                    className="text-text-primary hover:text-accent-primary transition-colors"
                  >
                    {quote.email}
                  </a>
                </div>
              </div>

              {quote.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent-primary mt-0.5" />
                  <div>
                    <div className="text-sm text-text-secondary mb-1">Phone</div>
                    <a
                      href={`tel:${quote.phone}`}
                      className="text-text-primary hover:text-accent-primary transition-colors"
                    >
                      {quote.phone}
                    </a>
                  </div>
                </div>
              )}

              {quote.company && (
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-accent-primary mt-0.5" />
                  <div>
                    <div className="text-sm text-text-secondary mb-1">Company</div>
                    <div className="text-text-primary">{quote.company}</div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent-primary mt-0.5" />
                <div>
                  <div className="text-sm text-text-secondary mb-1">Submitted</div>
                  <div className="text-text-primary">{formatDate(quote.createdAt)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-text-secondary mb-2">Project Type</div>
                <div className="px-3 py-2 bg-white/5 rounded-lg capitalize inline-block">
                  {quote.projectType.replace('-', ' ')}
                </div>
              </div>

              <div>
                <div className="text-sm text-text-secondary mb-2">Services Required</div>
                <div className="flex flex-wrap gap-2">
                  {getSelectedServices().map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-lg text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-text-secondary mb-2">Timeline</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent-primary" />
                    <span className="capitalize">{quote.timeline.replace('-', ' - ')}</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-text-secondary mb-2">Budget Range</div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-accent-primary" />
                    <span className="capitalize">{quote.budget.replace('-', ' - £')}</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-text-secondary mb-2">Content Ready</div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent-primary" />
                    <span className="capitalize">{quote.hasContent.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Project Description</h2>
            <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
              {quote.description}
            </p>
          </div>

          {/* QUOTE BUILDER */}
          <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Quote Builder</h2>

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
                  <p className="text-text-secondary">No line items yet. Click "Add Item" to start building your quote.</p>
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
                            placeholder="Description (e.g., Homepage Design)"
                            className="w-full px-3 py-2 bg-bg-tertiary rounded border border-white/10 focus:border-accent-primary outline-none text-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="number"
                            value={item.hours}
                            onChange={(e) => updateLineItem(item.id, 'hours', parseFloat(e.target.value) || 0)}
                            placeholder="Hours"
                            min="0"
                            step="0.5"
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
                            step="1"
                            className="w-full px-3 py-2 bg-bg-tertiary rounded border border-white/10 focus:border-accent-primary outline-none text-sm"
                          />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2">
                          <span className="text-sm font-medium">£{(item.hours * item.rate).toFixed(2)}</span>
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

            {/* Valid Until & Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Valid Until</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-4 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Terms & Conditions</label>
              <textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none resize-none"
              />
            </div>
          </div>

          {/* QUOTE PREVIEW */}
          {lineItems.length > 0 && (
            <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Quote Preview</h2>
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
                    <h2 className="text-xl font-bold text-purple-600">QUOTATION</h2>
                    <p className="text-sm text-gray-600">{new Date().toLocaleDateString('en-GB')}</p>
                  </div>
                </div>

                {/* Client Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-purple-600 mb-2">Client Information</h3>
                  <p className="text-sm">{clientName}</p>
                  {clientCompany && <p className="text-sm">{clientCompany}</p>}
                  <p className="text-sm">{clientEmail}</p>
                  {clientPhone && <p className="text-sm">{clientPhone}</p>}
                </div>

                {/* Line Items */}
                <table className="w-full mb-6">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 text-sm text-gray-600">Description</th>
                      <th className="text-right py-2 text-sm text-gray-600">Hours</th>
                      <th className="text-right py-2 text-sm text-gray-600">Rate</th>
                      <th className="text-right py-2 text-sm text-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-2 text-sm">{item.description}</td>
                        <td className="text-right py-2 text-sm">{item.hours}h</td>
                        <td className="text-right py-2 text-sm">£{item.rate.toFixed(2)}/hr</td>
                        <td className="text-right py-2 text-sm">£{(item.hours * item.rate).toFixed(2)}</td>
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
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Management */}
        <div className="space-y-6">
          {/* Status Management */}
          <div className="bg-bg-secondary border border-white/10 rounded-xl p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Manage Quote</h2>

            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as QuoteStatus)}
                  className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="quoted">Quoted</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">Internal Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  placeholder="Add notes about this quote request..."
                  className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none resize-none"
                />
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

              {/* Download Quote Button */}
              {lineItems.length > 0 && (
                <button
                  onClick={downloadQuote}
                  className="w-full px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 text-white font-semibold rounded-lg transition-opacity flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Quote
                </button>
              )}

              {/* Quick Actions */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <a
                  href={`mailto:${quote.email}?subject=Re: Quote Request from ${quote.name}`}
                  className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                {quote.phone && (
                  <a
                    href={`tel:${quote.phone}`}
                    className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call Client
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Metadata */}
          {quote.lastUpdated && (
            <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
              <h3 className="text-sm font-medium text-text-secondary mb-2">Last Updated</h3>
              <p className="text-sm">{formatDate(quote.lastUpdated)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
