import { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
}

/**
 * Generate canonical URL from pathname
 */
export function getCanonical(pathname: string): string {
  const baseUrl = 'https://harbonline.co.uk';
  const cleanPath = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate optimized metadata for Next.js pages
 * Use this in page.tsx files with: export const metadata = generateMetadata({...})
 */
export function generateMetadata({
  title,
  description = 'Professional web design, development and SEO services in West Sussex. Mobile-first, fast and accessible sites built to convert.',
  canonical,
  ogImage = '/og-image.png',
  noindex = false,
  keywords = [],
}: SEOProps): Metadata {
  const fullTitle = title.includes('Harbonline') ? title : `${title} | Harbonline`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: canonical || undefined,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || undefined,
      siteName: 'Harbonline',
      locale: 'en_GB',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
