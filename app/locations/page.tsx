import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { MapPin, ArrowRight } from 'lucide-react';
import { locations } from '@/lib/location-data';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Areas We Serve | Harbonline',
  description: 'Local web design & SEO across West Sussex — Arundel, Selsey, Chichester, Bognor Regis, Littlehampton, Worthing, and Brighton.',
  keywords: [
    'web design West Sussex',
    'web development Brighton',
    'local web designer',
    'Chichester web developer',
    'Bognor Regis web design',
    'Littlehampton website design',
    'Worthing web development',
    'Arundel web design',
    'Selsey web developer',
  ],
  openGraph: {
    title: 'Areas We Serve | Harbonline',
    description: 'Local web design & SEO across West Sussex — Arundel, Selsey, and more.',
    url: 'https://harbonline.co.uk/locations',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://harbonline.co.uk/locations',
  },
};

export default function LocationsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://harbonline.co.uk' },
          { name: 'Locations', url: 'https://harbonline.co.uk/locations' },
        ]}
      />

      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="loose">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <div className="flex items-center justify-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-accent-primary" />
                <span className="text-accent-primary font-semibold">Local Web Development Services</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Web Design & Development Across <span className="text-gradient">West Sussex</span>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Professional web design, development, and SEO services for businesses throughout West Sussex and Brighton. Local support, fast response times, and websites that drive results.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" size="lg">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  View Services
                </Button>
              </div>
            </MotionReveal>
          </div>
        </Section>

        {/* Locations Grid */}
        <Section background="primary" spacing="normal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Areas We Serve
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Click on your area to learn more about our local web design and development services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <MotionReveal key={location.slug} delay={index * 0.1}>
                <Link href={`/locations/${location.slug}`}>
                  <Card variant="glass" className="h-full hover:border-accent-primary transition-colors cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-primary/20 transition-colors">
                        <MapPin className="w-6 h-6 text-accent-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-primary transition-colors">
                          {location.name}
                        </h3>
                        <p className="text-sm text-text-secondary mb-3">{location.county}</p>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {location.description}
                        </p>
                        <div className="mt-4 flex items-center text-accent-primary font-semibold text-sm group-hover:gap-2 transition-all">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </MotionReveal>
            ))}
          </div>
        </Section>

        {/* Why Local Section */}
        <Section background="secondary" spacing="normal">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Why Choose a Local Web Developer?
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8">
                <Card variant="elevated">
                  <h3 className="text-xl font-semibold mb-3">Local Market Knowledge</h3>
                  <p className="text-text-secondary">
                    I understand the West Sussex and Brighton business landscape, your customers, and what works in the local market.
                  </p>
                </Card>

                <Card variant="elevated">
                  <h3 className="text-xl font-semibold mb-3">Fast Response Times</h3>
                  <p className="text-text-secondary">
                    Being local means quick meetings, faster support, and the ability to visit your business when needed.
                  </p>
                </Card>

                <Card variant="elevated">
                  <h3 className="text-xl font-semibold mb-3">Ongoing Support</h3>
                  <p className="text-text-secondary">
                    I'm here for the long term, providing reliable maintenance and support as your business grows.
                  </p>
                </Card>

                <Card variant="elevated">
                  <h3 className="text-xl font-semibold mb-3">Competitive Pricing</h3>
                  <p className="text-text-secondary">
                    Fair, transparent pricing tailored to local businesses. No hidden fees, just honest quotes.
                  </p>
                </Card>
              </div>
            </MotionReveal>
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg text-text-secondary mb-8">
                Get a free quote and find out how a professional website can help your business succeed.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/quote" size="lg">
                  Get a Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Contact Me
                </Button>
              </div>
            </MotionReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
