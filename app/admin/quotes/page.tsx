'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, ArrowRight, Clock, Mail, Phone, Building } from 'lucide-react';
import type { QuoteRequest, QuoteStatus } from '@/lib/mock-quotes';

export default function QuotesListPage() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');

  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>(
    (filterParam as QuoteStatus) || 'all'
  );

  // Fetch quotes from Firebase API
  useEffect(() => {
    async function fetchQuotes() {
      try {
        setLoading(true);
        const response = await fetch('/api/quotes');

        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }

        const data = await response.json();
        setQuotes(data.quotes || []);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setQuotes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  // Filter and search quotes
  const filteredQuotes = useMemo(() => {
    let filtered = quotes;

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((q) => q.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.name.toLowerCase().includes(query) ||
          q.email.toLowerCase().includes(query) ||
          q.company.toLowerCase().includes(query) ||
          q.description.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [quotes, statusFilter, searchQuery]);

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
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusOptions: { value: QuoteStatus | 'all'; label: string; count: number }[] = [
    { value: 'all', label: 'All Quotes', count: quotes.length },
    { value: 'new', label: 'New', count: quotes.filter((q) => q.status === 'new').length },
    { value: 'reviewed', label: 'Reviewed', count: quotes.filter((q) => q.status === 'reviewed').length },
    { value: 'quoted', label: 'Quoted', count: quotes.filter((q) => q.status === 'quoted').length },
    { value: 'accepted', label: 'Accepted', count: quotes.filter((q) => q.status === 'accepted').length },
    { value: 'declined', label: 'Declined', count: quotes.filter((q) => q.status === 'declined').length },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Quote Requests</h1>
        <p className="text-text-secondary">Manage and respond to client quote requests</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search by name, email, company, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-bg-secondary border border-white/10 rounded-lg focus:border-accent-primary outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as QuoteStatus | 'all')}
            className="pl-12 pr-8 py-3 bg-bg-secondary border border-white/10 rounded-lg focus:border-accent-primary outline-none appearance-none cursor-pointer min-w-[180px]"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-text-secondary">
        Showing {filteredQuotes.length} of {quotes.length} quote{quotes.length !== 1 ? 's' : ''}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-text-secondary">Loading quotes...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && quotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-2">No quote requests yet</p>
          <p className="text-sm text-text-tertiary">
            Quote requests will appear here when customers submit the quote form
          </p>
        </div>
      )}

      {/* No Results State */}
      {!loading && quotes.length > 0 && filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-2">No quotes match your search</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}
            className="text-accent-primary hover:underline text-sm"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Quotes List */}
      {!loading && filteredQuotes.length > 0 && (
        <div className="space-y-4">
          {filteredQuotes.map((quote) => (
          <Link
            key={quote.id}
            href={`/admin/quotes/${quote.id}`}
            className="block bg-bg-secondary border border-white/10 rounded-xl p-6 hover:border-accent-primary/30 transition-colors"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left: Main Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{quote.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary">
                      {quote.company && (
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {quote.company}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {quote.email}
                      </span>
                      {quote.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {quote.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border capitalize whitespace-nowrap ${getStatusColor(
                      quote.status
                    )}`}
                  >
                    {quote.status}
                  </span>
                </div>

                <p className="text-text-secondary mb-3 line-clamp-2">{quote.description}</p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white/5 rounded text-xs capitalize">
                    {quote.projectType.replace('-', ' ')}
                  </span>
                  <span className="px-2 py-1 bg-white/5 rounded text-xs">
                    Budget: {quote.budget.replace('-', ' - £')}
                  </span>
                  <span className="px-2 py-1 bg-white/5 rounded text-xs capitalize">
                    Timeline: {quote.timeline.replace('-', ' - ')}
                  </span>
                  {quote.quotedAmount && (
                    <span className="px-2 py-1 bg-accent-primary/10 text-accent-primary rounded text-xs font-medium">
                      Quoted: {quote.quotedAmount}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Meta Info */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 lg:min-w-[140px]">
                <div className="flex items-center gap-1.5 text-sm text-text-tertiary">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(quote.createdAt)}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-accent-primary" />
              </div>
            </div>
          </Link>
          ))}
        </div>
      )}
    </div>
  );
}
