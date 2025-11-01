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

    // QUOTATION Title (top right)
    pdf.setFontSize(20);
    pdf.setTextColor(106, 0, 255);
    pdf.text('QUOTATION', pageWidth - margin, 20, { align: 'right' });

    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Date: ${currentDate}`, pageWidth - margin, 28, { align: 'right' });
    if (validUntil) {
      const validDate = new Date(validUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      pdf.text(`Valid Until: ${validDate}`, pageWidth - margin, 34, { align: 'right' });
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
    pdf.text('Client Information', margin, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    pdf.text('Name:', margin, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.text(clientName, margin + 40, yPos);
    yPos += 6;

    if (clientCompany) {
      pdf.setTextColor(60, 60, 60);
      pdf.text('Company:', margin, yPos);
      pdf.setTextColor(0, 0, 0);
      pdf.text(clientCompany, margin + 40, yPos);
      yPos += 6;
    }

    pdf.setTextColor(60, 60, 60);
    pdf.text('Email:', margin, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.text(clientEmail, margin + 40, yPos);
    yPos += 6;

    if (clientPhone) {
      pdf.setTextColor(60, 60, 60);
      pdf.text('Phone:', margin, yPos);
      pdf.setTextColor(0, 0, 0);
      pdf.text(clientPhone, margin + 40, yPos);
      yPos += 6;
    }

    yPos += 5;

    // Project Overview
    pdf.setFontSize(14);
    pdf.setTextColor(106, 0, 255);
    pdf.text('Project Overview', margin, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    pdf.text('Project Type:', margin, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.text(quote.projectType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()), margin + 40, yPos);
    yPos += 6;

    pdf.setTextColor(60, 60, 60);
    pdf.text('Timeline:', margin, yPos);
    pdf.setTextColor(0, 0, 0);
    pdf.text(quote.timeline.replace('-', ' to ').replace(/\b\w/g, l => l.toUpperCase()), margin + 40, yPos);
    yPos += 8;

    pdf.setTextColor(60, 60, 60);
    pdf.text('Description:', margin, yPos);
    yPos += 5;
    pdf.setTextColor(0, 0, 0);
    const descLines = pdf.splitTextToSize(quote.description, pageWidth - (2 * margin));
    pdf.text(descLines, margin, yPos);
    yPos += (descLines.length * 5) + 8;

    // Quote Breakdown (if line items exist)
    if (lineItems.length > 0) {
      if (yPos > 200) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(14);
      pdf.setTextColor(106, 0, 255);
      pdf.text('Quote Breakdown', margin, yPos);
      yPos += 8;

      // Table headers
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.setFillColor(249, 249, 249);
      pdf.rect(margin, yPos - 5, pageWidth - (2 * margin), 8, 'F');
      pdf.text('Description', margin + 2, yPos);
      pdf.text('Hours', pageWidth - margin - 80, yPos);
      pdf.text('Rate', pageWidth - margin - 50, yPos);
      pdf.text('Amount', pageWidth - margin - 20, yPos, { align: 'right' });
      yPos += 6;

      // Table rows
      pdf.setTextColor(0, 0, 0);
      lineItems.forEach((item, idx) => {
        if (yPos > 270) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.text(item.description, margin + 2, yPos);
        pdf.text(`${item.hours}h`, pageWidth - margin - 80, yPos);
        pdf.text(`£${item.rate.toFixed(2)}/hr`, pageWidth - margin - 50, yPos);
        pdf.text(`£${(item.hours * item.rate).toFixed(2)}`, pageWidth - margin - 2, yPos, { align: 'right' });
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

    // Terms & Conditions
    if (terms) {
      if (yPos > 220) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(12);
      pdf.setTextColor(106, 0, 255);
      pdf.text('Terms & Conditions', margin, yPos);
      yPos += 6;

      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      const termsLines = pdf.splitTextToSize(terms, pageWidth - (2 * margin));
      pdf.text(termsLines, margin, yPos);
      yPos += (termsLines.length * 4) + 8;
    }

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
    pdf.text('Thank you for considering Harbonline for your project.', pageWidth / 2, yPos, { align: 'center' });

    // Save PDF
    pdf.save(`Quote_${clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white font-medium rounded-lg transition-colors"
            >
              Build Quote
            </button>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium border capitalize ${getStatusColor(
                quote.status
              )}`}
            >
              {quote.status}
            </span>
          </div>
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
          <div id="quote-builder" className="bg-bg-secondary border border-white/10 rounded-xl p-6 scroll-mt-6">
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
