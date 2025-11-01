'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, ArrowRight, Clock, Mail, Phone, Building, Plus } from 'lucide-react';
import type { Invoice, InvoiceStatus } from '@/lib/invoices';

export default function InvoicesListPage() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>(
    (filterParam as InvoiceStatus) || 'all'
  );

  // Fetch invoices from Firebase API
  useEffect(() => {
    async function fetchInvoices() {
      try {
        setLoading(true);
        const response = await fetch('/api/invoices');

        if (!response.ok) {
          throw new Error('Failed to fetch invoices');
        }

        const data = await response.json();
        setInvoices(data.invoices || []);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    }

    fetchInvoices();
  }, []);

  // Filter and search invoices
  const filteredInvoices = useMemo(() => {
    let filtered = invoices;

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((inv) => inv.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (inv) =>
          inv.invoiceNumber.toLowerCase().includes(query) ||
          inv.clientName.toLowerCase().includes(query) ||
          inv.clientEmail.toLowerCase().includes(query) ||
          (inv.clientCompany && inv.clientCompany.toLowerCase().includes(query))
      );
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [invoices, statusFilter, searchQuery]);

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
      month: 'short',
      year: 'numeric',
    });
  };

  const statusOptions: { value: InvoiceStatus | 'all'; label: string; count: number }[] = [
    { value: 'all', label: 'All Invoices', count: invoices.length },
    { value: 'draft', label: 'Draft', count: invoices.filter((i) => i.status === 'draft').length },
    { value: 'sent', label: 'Sent', count: invoices.filter((i) => i.status === 'sent').length },
    { value: 'paid', label: 'Paid', count: invoices.filter((i) => i.status === 'paid').length },
    { value: 'overdue', label: 'Overdue', count: invoices.filter((i) => i.status === 'overdue').length },
    { value: 'cancelled', label: 'Cancelled', count: invoices.filter((i) => i.status === 'cancelled').length },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Invoices</h1>
          <p className="text-text-secondary">Manage and track your invoices</p>
        </div>
        <Link
          href="/admin/invoices/new"
          className="px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Invoice
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search by invoice number, client name, email, or company..."
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
            onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | 'all')}
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
        Showing {filteredInvoices.length} of {invoices.length} invoice{invoices.length !== 1 ? 's' : ''}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-text-secondary">Loading invoices...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && invoices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-4">No invoices yet</p>
          <Link
            href="/admin/invoices/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Your First Invoice
          </Link>
        </div>
      )}

      {/* No Results State */}
      {!loading && invoices.length > 0 && filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-2">No invoices match your search</p>
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

      {/* Invoices List */}
      {!loading && filteredInvoices.length > 0 && (
        <div className="space-y-4">
          {filteredInvoices.map((invoice) => (
            <Link
              key={invoice.id}
              href={`/admin/invoices/${invoice.id}`}
              className="block bg-bg-secondary border border-white/10 rounded-xl p-6 hover:border-accent-primary/30 transition-colors"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left: Main Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-semibold">{invoice.invoiceNumber}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border capitalize whitespace-nowrap ${getStatusColor(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-text-secondary mb-2">{invoice.clientName}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary">
                        {invoice.clientCompany && (
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {invoice.clientCompany}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {invoice.clientEmail}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white/5 rounded text-xs">
                      Created: {formatDate(invoice.createdAt)}
                    </span>
                    <span className="px-2 py-1 bg-white/5 rounded text-xs">
                      Due: {formatDate(invoice.dueDate)}
                    </span>
                    {invoice.paidDate && (
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs">
                        Paid: {formatDate(invoice.paidDate)}
                      </span>
                    )}
                    <span className="px-2 py-1 bg-accent-primary/10 text-accent-primary rounded text-xs font-medium">
                      Total: £{invoice.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Right: Arrow */}
                <div className="flex items-center justify-end">
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
