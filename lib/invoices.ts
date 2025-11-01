// Invoice management for Harbonline

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  createdAt: string;
  dueDate: string;
  paidDate?: string;

  // Client Information
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  clientPhone?: string;
  clientAddress?: string;

  // Invoice Details
  lineItems: InvoiceLineItem[];
  subtotal: number;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  tax?: number;
  total: number;

  // Payment Details
  paymentTerms?: string;
  notes?: string;

  // Related quote (optional)
  quoteId?: string;

  lastUpdated?: string;
}

// Helper functions will be added as needed
export function generateInvoiceNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const timestamp = Date.now().toString().slice(-4);
  return `INV-${year}${month}-${timestamp}`;
}
