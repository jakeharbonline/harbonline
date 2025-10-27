// Mock data store for quote requests
// This will be replaced with Firebase after deployment

export type QuoteStatus = 'new' | 'reviewed' | 'quoted' | 'accepted' | 'declined';

export interface QuoteRequest {
  id: string;
  status: QuoteStatus;
  createdAt: string;

  // Step 1: Project Type
  projectType: string;

  // Step 2: Requirements
  services: {
    design: boolean;
    development: boolean;
    ecommerce: boolean;
    customSoftware: boolean;
    seo: boolean;
    maintenance: boolean;
  };

  // Step 3: Project Details
  timeline: string;
  budget: string;
  hasContent: string;

  // Step 4: About You
  name: string;
  email: string;
  phone: string;
  company: string;

  // Step 5: Tell More
  description: string;

  // Admin fields
  notes?: string;
  quotedAmount?: string;
  lastUpdated?: string;
}

// Mock data - cleaned for production
// Real quote submissions will be stored in Firebase
export const mockQuotes: QuoteRequest[] = [];

// Helper functions for mock data management
export function getQuotes(): QuoteRequest[] {
  return mockQuotes;
}

export function getQuoteById(id: string): QuoteRequest | undefined {
  return mockQuotes.find((quote) => quote.id === id);
}

export function getQuotesByStatus(status: QuoteStatus): QuoteRequest[] {
  return mockQuotes.filter((quote) => quote.status === status);
}

export function updateQuoteStatus(id: string, status: QuoteStatus): boolean {
  const quote = mockQuotes.find((q) => q.id === id);
  if (quote) {
    quote.status = status;
    quote.lastUpdated = new Date().toISOString();
    return true;
  }
  return false;
}

export function updateQuoteNotes(id: string, notes: string): boolean {
  const quote = mockQuotes.find((q) => q.id === id);
  if (quote) {
    quote.notes = notes;
    quote.lastUpdated = new Date().toISOString();
    return true;
  }
  return false;
}

export function updateQuotedAmount(id: string, amount: string): boolean {
  const quote = mockQuotes.find((q) => q.id === id);
  if (quote) {
    quote.quotedAmount = amount;
    quote.lastUpdated = new Date().toISOString();
    return true;
  }
  return false;
}

// Stats helpers
export function getQuoteStats() {
  return {
    total: mockQuotes.length,
    new: mockQuotes.filter((q) => q.status === 'new').length,
    reviewed: mockQuotes.filter((q) => q.status === 'reviewed').length,
    quoted: mockQuotes.filter((q) => q.status === 'quoted').length,
    accepted: mockQuotes.filter((q) => q.status === 'accepted').length,
    declined: mockQuotes.filter((q) => q.status === 'declined').length,
  };
}
