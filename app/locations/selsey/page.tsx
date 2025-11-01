import { Metadata } from 'next';
import { LocationPageTemplate } from '@/components/LocationPageTemplate';
import { locations } from '@/lib/location-data';
import { notFound } from 'next/navigation';

const location = locations.find((loc) => loc.slug === 'selsey')!;

export const metadata: Metadata = {
  title: `Web Design & SEO in ${location.name} | Harbonline`,
  description: `Freelance web design & SEO for ${location.name}. Mobile-first, fast, accessible sites that convert. Get a free proposal.`,
  alternates: {
    canonical: `https://harbonline.co.uk/locations/${location.slug}`,
  },
  openGraph: {
    title: `Web Design & SEO in ${location.name} | Harbonline`,
    description: `Freelance web design & SEO for ${location.name}. Mobile-first, fast, accessible sites that convert.`,
    url: `https://harbonline.co.uk/locations/${location.slug}`,
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
  keywords: location.keywords,
};

export default function SelseyPage() {
  return <LocationPageTemplate location={location} />;
}
