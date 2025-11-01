'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
} from 'lucide-react';
import type { QuoteRequest, QuoteStatus } from '@/lib/mock-quotes';

export default function QuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const quoteId = params.id as string;

  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<QuoteStatus>('new');
  const [notes, setNotes] = useState('');
  const [quotedAmount, setQuotedAmount] = useState('');
  const [saved, setSaved] = useState(false);

  // Quote builder fields
  const [estimatedHours, setEstimatedHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('50');
  const [breakdown, setBreakdown] = useState<{service: string, hours: number}[]>([]);

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
          setQuotedAmount(data.quote.quotedAmount || '');
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

    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          notes,
          quotedAmount,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);

        // Update local quote state
        setQuote({ ...quote, status, notes, quotedAmount });
      }
    } catch (error) {
      console.error('Failed to save quote:', error);
    }
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

  // Calculate estimated hours based on services
  const calculateEstimatedHours = () => {
    if (!quote) return { total: 0, breakdown: [] };

    const hourEstimates: {[key: string]: number} = {
      design: 40,
      development: 80,
      ecommerce: 120,
      customSoftware: 160,
      seo: 20,
      maintenance: 10,
    };

    const breakdown: {service: string, hours: number}[] = [];
    let total = 0;

    if (quote.services.design) {
      breakdown.push({ service: 'Web Design', hours: hourEstimates.design });
      total += hourEstimates.design;
    }
    if (quote.services.development) {
      breakdown.push({ service: 'Web Development', hours: hourEstimates.development });
      total += hourEstimates.development;
    }
    if (quote.services.ecommerce) {
      breakdown.push({ service: 'E-Commerce Integration', hours: hourEstimates.ecommerce });
      total += hourEstimates.ecommerce;
    }
    if (quote.services.customSoftware) {
      breakdown.push({ service: 'Custom Software', hours: hourEstimates.customSoftware });
      total += hourEstimates.customSoftware;
    }
    if (quote.services.seo) {
      breakdown.push({ service: 'SEO Setup', hours: hourEstimates.seo });
      total += hourEstimates.seo;
    }
    if (quote.services.maintenance) {
      breakdown.push({ service: 'Maintenance & Support (monthly)', hours: hourEstimates.maintenance });
      total += hourEstimates.maintenance;
    }

    return { total, breakdown };
  };

  // Auto-calculate on quote load
  useEffect(() => {
    if (quote) {
      const { total, breakdown: calc } = calculateEstimatedHours();
      setEstimatedHours(total.toString());
      setBreakdown(calc);

      // Auto-calculate quoted amount
      const rate = parseFloat(hourlyRate) || 50;
      const amount = total * rate;
      if (!quotedAmount) {
        setQuotedAmount(`£${amount.toLocaleString()}`);
      }
    }
  }, [quote]);

  const generateQuotationDocument = () => {
    if (!quote) return;

    const services = getSelectedServices();
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Create HTML document
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #6A00FF; padding-bottom: 20px; }
    .header h1 { color: #6A00FF; margin: 0; font-size: 32px; }
    .header p { color: #666; margin: 5px 0 0; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #6A00FF; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px; }
    .info-grid { display: grid; grid-template-columns: 150px 1fr; gap: 10px; margin-bottom: 15px; }
    .info-label { font-weight: 600; color: #666; }
    .services { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
    .service-tag { background: #f0e6ff; color: #6A00FF; padding: 6px 12px; border-radius: 4px; font-size: 14px; }
    .amount { background: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0; }
    .amount h3 { margin: 0 0 10px; color: #666; font-size: 16px; }
    .amount p { font-size: 36px; font-weight: bold; color: #6A00FF; margin: 0; }
    .description { background: #f9f9f9; padding: 20px; border-radius: 8px; white-space: pre-wrap; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Harbonline</h1>
    <p>Professional Web Development & Design</p>
  </div>

  <div class="section">
    <h2>Quotation</h2>
    <div class="info-grid">
      <div class="info-label">Quote Date:</div>
      <div>${currentDate}</div>
      <div class="info-label">Client Name:</div>
      <div>${quote.name}</div>
      ${quote.company ? `<div class="info-label">Company:</div><div>${quote.company}</div>` : ''}
      <div class="info-label">Email:</div>
      <div>${quote.email}</div>
      ${quote.phone ? `<div class="info-label">Phone:</div><div>${quote.phone}</div>` : ''}
    </div>
  </div>

  <div class="section">
    <h2>Project Overview</h2>
    <div class="info-grid">
      <div class="info-label">Project Type:</div>
      <div style="text-transform: capitalize;">${quote.projectType.replace('-', ' ')}</div>
      <div class="info-label">Timeline:</div>
      <div style="text-transform: capitalize;">${quote.timeline.replace('-', ' to ')}</div>
      <div class="info-label">Budget Range:</div>
      <div style="text-transform: capitalize;">${quote.budget}</div>
    </div>
    <div style="margin-top: 15px;">
      <div class="info-label">Services Required:</div>
      <div class="services">
        ${services.map(s => `<span class="service-tag">${s}</span>`).join('')}
      </div>
    </div>
  </div>

  ${breakdown.length > 0 ? `
  <div class="section">
    <h2>Work Breakdown</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
      <thead>
        <tr style="border-bottom: 2px solid #f0f0f0;">
          <th style="text-align: left; padding: 12px 8px; color: #666;">Service</th>
          <th style="text-align: right; padding: 12px 8px; color: #666;">Estimated Hours</th>
          <th style="text-align: right; padding: 12px 8px; color: #666;">Rate</th>
          <th style="text-align: right; padding: 12px 8px; color: #666;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${breakdown.map(item => `
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 12px 8px;">${item.service}</td>
            <td style="text-align: right; padding: 12px 8px;">${item.hours}h</td>
            <td style="text-align: right; padding: 12px 8px;">£${hourlyRate}/hr</td>
            <td style="text-align: right; padding: 12px 8px;">£${(item.hours * parseFloat(hourlyRate)).toLocaleString()}</td>
          </tr>
        `).join('')}
        <tr style="font-weight: bold; background: #f9f9f9;">
          <td style="padding: 12px 8px;" colspan="2">Total</td>
          <td style="text-align: right; padding: 12px 8px;">${estimatedHours}h</td>
          <td style="text-align: right; padding: 12px 8px; color: #6A00FF;">£${((parseFloat(estimatedHours) || 0) * (parseFloat(hourlyRate) || 0)).toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  </div>
  ` : ''}

  ${quotedAmount ? `
  <div class="amount">
    <h3>Final Quoted Amount</h3>
    <p>${quotedAmount}</p>
  </div>
  ` : ''}

  <div class="section">
    <h2>Project Description</h2>
    <div class="description">${quote.description}</div>
  </div>

  ${notes ? `
  <div class="section">
    <h2>Additional Notes</h2>
    <div class="description">${notes}</div>
  </div>
  ` : ''}

  <div class="footer">
    <p>Harbonline | jake@harbonline.co.uk | www.harbonline.co.uk</p>
    <p>This quotation is valid for 30 days from the date above.</p>
  </div>
</body>
</html>
    `;

    // Create a blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Quotation_${quote.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

          {/* Project Type & Requirements */}
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

              {/* Quote Builder */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm font-semibold mb-3 text-accent-primary">Quote Calculator</h3>

                {/* Hours Breakdown */}
                <div className="mb-3">
                  <label className="block text-xs font-medium mb-2 text-text-secondary">Estimated Hours Breakdown</label>
                  <div className="space-y-2 bg-bg-tertiary/50 rounded-lg p-3">
                    {breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-text-secondary">{item.service}</span>
                        <span className="font-medium">{item.hours}h</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-semibold pt-2 border-t border-white/10">
                      <span>Total Hours</span>
                      <span className="text-accent-primary">{estimatedHours}h</span>
                    </div>
                  </div>
                </div>

                {/* Hourly Rate */}
                <div className="mb-3">
                  <label className="block text-xs font-medium mb-2 text-text-secondary">Hourly Rate</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => {
                      setHourlyRate(e.target.value);
                      const hours = parseFloat(estimatedHours) || 0;
                      const rate = parseFloat(e.target.value) || 0;
                      setQuotedAmount(`£${(hours * rate).toLocaleString()}`);
                    }}
                    placeholder="50"
                    className="w-full px-3 py-2 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none text-sm"
                  />
                </div>

                {/* Calculated Total Preview */}
                <div className="bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 rounded-lg p-3">
                  <div className="text-xs text-text-secondary mb-1">Calculated Amount</div>
                  <div className="text-2xl font-bold text-accent-primary">
                    £{((parseFloat(estimatedHours) || 0) * (parseFloat(hourlyRate) || 0)).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Quoted Amount */}
              <div className="pt-4">
                <label className="block text-sm font-medium mb-2">Final Quoted Amount</label>
                <input
                  type="text"
                  value={quotedAmount}
                  onChange={(e) => setQuotedAmount(e.target.value)}
                  placeholder="e.g. £5,000"
                  className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                />
                <p className="text-xs text-text-secondary mt-1">You can override the calculated amount</p>
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

              {/* Generate Quotation */}
              <button
                onClick={generateQuotationDocument}
                className="w-full px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 text-white font-semibold rounded-lg transition-opacity flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Quotation
              </button>

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
