'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, TrendingUp, Clock, CheckCircle, XCircle, Eye, ArrowRight } from 'lucide-react';
import { getQuotes, getQuoteStats } from '@/lib/mock-quotes';
import type { QuoteRequest } from '@/lib/mock-quotes';

export default function AdminDashboardPage() {
  const [quotes] = useState<QuoteRequest[]>(getQuotes());
  const stats = getQuoteStats();

  // Get recent quotes (last 5)
  const recentQuotes = [...quotes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

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
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-text-secondary">Overview of your quote requests and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <div className="bg-bg-secondary border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Total</span>
            <FileText className="w-5 h-5 text-text-tertiary" />
          </div>
          <div className="text-3xl font-bold">{stats.total}</div>
        </div>

        <div className="bg-bg-secondary border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">New</span>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-blue-400">{stats.new}</div>
        </div>

        <div className="bg-bg-secondary border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Reviewed</span>
            <Eye className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-yellow-400">{stats.reviewed}</div>
        </div>

        <div className="bg-bg-secondary border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Quoted</span>
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-purple-400">{stats.quoted}</div>
        </div>

        <div className="bg-bg-secondary border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Accepted</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400">{stats.accepted}</div>
        </div>

        <div className="bg-bg-secondary border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Declined</span>
            <XCircle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-red-400">{stats.declined}</div>
        </div>
      </div>

      {/* Recent Quotes */}
      <div className="bg-bg-secondary border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1">Recent Quote Requests</h2>
            <p className="text-sm text-text-secondary">Latest submissions from potential clients</p>
          </div>
          <Link
            href="/admin/quotes"
            className="text-sm text-accent-primary hover:text-accent-primary-hover font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-white/10">
          {recentQuotes.map((quote) => (
            <Link
              key={quote.id}
              href={`/admin/quotes/${quote.id}`}
              className="block p-6 hover:bg-white/5 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{quote.name}</h3>
                      <p className="text-sm text-text-secondary">
                        {quote.company && `${quote.company} • `}
                        {quote.email}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(
                        quote.status
                      )}`}
                    >
                      {quote.status}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                    {quote.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs text-text-tertiary">
                    <span className="px-2 py-1 bg-white/5 rounded">
                      {quote.projectType.replace('-', ' ')}
                    </span>
                    <span className="px-2 py-1 bg-white/5 rounded">
                      Budget: {quote.budget}
                    </span>
                    <span className="px-2 py-1 bg-white/5 rounded">
                      Timeline: {quote.timeline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-text-tertiary">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDate(quote.createdAt)}
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {recentQuotes.length === 0 && (
          <div className="p-12 text-center text-text-secondary">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No quote requests yet</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/quotes?filter=new"
          className="bg-bg-secondary border border-white/10 rounded-xl p-6 hover:border-accent-primary/30 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Review New Requests</h3>
              <p className="text-sm text-text-secondary">
                {stats.new} new quote{stats.new !== 1 ? 's' : ''} awaiting review
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-accent-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/quotes?filter=quoted"
          className="bg-bg-secondary border border-white/10 rounded-xl p-6 hover:border-accent-primary/30 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Follow Up Quotes</h3>
              <p className="text-sm text-text-secondary">
                {stats.quoted} quote{stats.quoted !== 1 ? 's' : ''} pending client response
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-accent-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
