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
} from 'lucide-react';
import { getQuoteById, updateQuoteStatus, updateQuoteNotes, updateQuotedAmount } from '@/lib/mock-quotes';
import type { QuoteRequest, QuoteStatus } from '@/lib/mock-quotes';

export default function QuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const quoteId = params.id as string;

  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [status, setStatus] = useState<QuoteStatus>('new');
  const [notes, setNotes] = useState('');
  const [quotedAmount, setQuotedAmount] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchedQuote = getQuoteById(quoteId);
    if (fetchedQuote) {
      setQuote(fetchedQuote);
      setStatus(fetchedQuote.status);
      setNotes(fetchedQuote.notes || '');
      setQuotedAmount(fetchedQuote.quotedAmount || '');
    }
  }, [quoteId]);

  const handleSave = () => {
    if (quote) {
      updateQuoteStatus(quote.id, status);
      updateQuoteNotes(quote.id, notes);
      if (quotedAmount) {
        updateQuotedAmount(quote.id, quotedAmount);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
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

              {/* Quoted Amount */}
              <div>
                <label className="block text-sm font-medium mb-2">Quoted Amount</label>
                <input
                  type="text"
                  value={quotedAmount}
                  onChange={(e) => setQuotedAmount(e.target.value)}
                  placeholder="e.g. £5,000"
                  className="w-full px-4 py-3 bg-bg-tertiary rounded-lg border border-white/10 focus:border-accent-primary outline-none"
                />
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
