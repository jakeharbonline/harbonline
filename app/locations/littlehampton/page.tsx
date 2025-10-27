import { LocationPageTemplate } from '@/components/LocationPageTemplate';
import { locations } from '@/lib/location-data';
import type { Metadata } from 'next';

const locationData = locations.find(l => l.slug === 'littlehampton')!;

export const metadata: Metadata = {
  title: `Web Design & Development in ${locationData.name}, ${locationData.county}`,
  description: `Professional web design and development services in ${locationData.name}. Local web developer creating modern websites, e-commerce stores, and custom web applications for businesses in ${locationData.name} and ${locationData.county}.`,
  keywords: locationData.keywords,
  openGraph: {
    title: `Web Design & Development in ${locationData.name} | Harbonline`,
    description: `Professional web design and development services in ${locationData.name}, ${locationData.county}.`,
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: `/locations/${locationData.slug}`,
  },
};

export default function LittlehamptonPage() {
  return <LocationPageTemplate location={locationData} />;
}
