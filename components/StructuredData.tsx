/**
 * Structured Data Components (JSON-LD Schema.org)
 * Improves SEO with rich snippets and better search understanding
 */

interface LocalBusinessData {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email: string;
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  areaServed: string[];
  priceRange?: string;
}

interface ServiceData {
  name: string;
  description: string;
  url: string;
  provider: string;
  serviceType: string;
  areaServed: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Local Business Structured Data
 * Shows in Google Maps, local search, and knowledge panels
 */
export function LocalBusinessSchema({ data }: { data: LocalBusinessData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${data.url}#organization`,
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    ...(data.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: data.geo.latitude,
        longitude: data.geo.longitude,
      },
    }),
    areaServed: data.areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    priceRange: data.priceRange || '££',
    openingHours: 'Mo-Fr 09:00-18:00',
    sameAs: [
      // Add your social media profiles here when available
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Organization Structured Data
 * Company information for search engines
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://harbonline.co.uk#organization',
    name: 'Harbonline',
    legalName: 'Harbonline',
    url: 'https://harbonline.co.uk',
    email: 'jake@harbonline.co.uk',
    logo: 'https://harbonline.co.uk/logo.png',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Jake',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chichester',
      addressRegion: 'West Sussex',
      addressCountry: 'GB',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'jake@harbonline.co.uk',
      contactType: 'Customer Service',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service Structured Data
 * For individual service pages
 */
export function ServiceSchema({ data }: { data: ServiceData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: data.serviceType,
    name: data.name,
    description: data.description,
    url: data.url,
    provider: {
      '@type': 'Organization',
      name: data.provider,
      url: 'https://harbonline.co.uk',
    },
    areaServed: data.areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: data.name,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: data.name,
            description: data.description,
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQ Structured Data
 * Eligible for featured snippets
 */
export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Breadcrumb Structured Data
 * Shows breadcrumb trail in search results
 */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebSite Structured Data
 * Enables sitelinks search box in Google
 */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://harbonline.co.uk#website',
    url: 'https://harbonline.co.uk',
    name: 'Harbonline',
    description: 'Professional Web Design & Development in West Sussex',
    publisher: {
      '@id': 'https://harbonline.co.uk#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://harbonline.co.uk/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
