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

// Mock data - in production this will be in Firebase
export const mockQuotes: QuoteRequest[] = [
  {
    id: 'q001',
    status: 'new',
    createdAt: '2025-10-26T14:30:00Z',
    projectType: 'new-website',
    services: {
      design: true,
      development: true,
      ecommerce: false,
      customSoftware: false,
      seo: true,
      maintenance: false,
    },
    timeline: '1-2-months',
    budget: '2k-5k',
    hasContent: 'partial',
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    phone: '07700 900123',
    company: 'Mitchell Consulting',
    description: 'Looking for a modern professional website for my consulting business. Need to showcase services, team members, and have a contact form. Would like it to rank well on Google for local searches.',
  },
  {
    id: 'q002',
    status: 'reviewed',
    createdAt: '2025-10-25T10:15:00Z',
    projectType: 'ecommerce',
    services: {
      design: true,
      development: true,
      ecommerce: true,
      customSoftware: false,
      seo: true,
      maintenance: true,
    },
    timeline: '3-6-months',
    budget: '5k-10k',
    hasContent: 'yes',
    name: 'Tom Richardson',
    email: 'tom@shoplocal.co.uk',
    phone: '07700 900456',
    company: 'Shop Local Ltd',
    description: 'Need a full e-commerce site to sell handmade products. Around 50 products to start with but plan to expand. Need payment processing, inventory management, and customer accounts. Already have product photos and descriptions ready.',
    notes: 'Follow up scheduled for Monday. Discussed Shopify vs custom solution.',
    lastUpdated: '2025-10-25T16:20:00Z',
  },
  {
    id: 'q003',
    status: 'quoted',
    createdAt: '2025-10-24T09:45:00Z',
    projectType: 'custom-software',
    services: {
      design: true,
      development: true,
      ecommerce: false,
      customSoftware: true,
      seo: false,
      maintenance: true,
    },
    timeline: '3-6-months',
    budget: '10k-25k',
    hasContent: 'no',
    name: 'David Chen',
    email: 'david@techstartup.io',
    phone: '',
    company: 'TechStartup Ltd',
    description: 'Building a SaaS product for project management. Need custom booking system, client portal, dashboard with analytics, and user authentication. This is a complex build with multiple user roles.',
    quotedAmount: '£15,500',
    notes: 'Sent detailed proposal with phased approach. Waiting for client feedback.',
    lastUpdated: '2025-10-24T14:00:00Z',
  },
  {
    id: 'q004',
    status: 'accepted',
    createdAt: '2025-10-20T11:20:00Z',
    projectType: 'redesign',
    services: {
      design: true,
      development: true,
      ecommerce: false,
      customSoftware: false,
      seo: true,
      maintenance: true,
    },
    timeline: '1-2-months',
    budget: '5k-10k',
    hasContent: 'yes',
    name: 'Emma Wilson',
    email: 'emma@creativestudio.co.uk',
    phone: '07700 900789',
    company: 'Creative Studio',
    description: 'Current website is outdated and not mobile-friendly. Need a complete redesign with modern aesthetics, better navigation, and improved load times. Have all content and brand assets ready.',
    quotedAmount: '£6,200',
    notes: 'Project starts November 1st. 50% deposit received.',
    lastUpdated: '2025-10-21T09:30:00Z',
  },
  {
    id: 'q005',
    status: 'declined',
    createdAt: '2025-10-18T16:00:00Z',
    projectType: 'other',
    services: {
      design: false,
      development: true,
      ecommerce: false,
      customSoftware: true,
      seo: false,
      maintenance: false,
    },
    timeline: 'asap',
    budget: 'under-2k',
    hasContent: 'partial',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '07700 900321',
    company: '',
    description: 'Need a mobile app with complex backend integrations and real-time features. Budget is limited but need it done quickly.',
    notes: 'Project scope too large for budget and timeline. Referred to mobile app specialist.',
    lastUpdated: '2025-10-19T10:00:00Z',
  },
];

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
