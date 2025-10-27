import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { ServiceSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { MapPin, Code, Palette, ShoppingCart, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Design & Development in Chichester, West Sussex',
  description: 'Professional web design and development services in Chichester. Local web developer creating modern websites, e-commerce stores, and custom web applications for businesses in Chichester and West Sussex.',
  keywords: [
    'web designer Chichester',
    'web developer Chichester',
    'website design Chichester',
    'Chichester web development',
    'web design West Sussex',
    'Chichester website developer',
    'ecommerce Chichester',
    'SEO Chichester',
  ],
  openGraph: {
    title: 'Web Design & Development in Chichester | Harbonline',
    description: 'Professional web design and development services in Chichester, West Sussex.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: '/locations/chichester',
  },
};

export default function ChichesterPage() {
  const services = [
    {
      icon: Palette,
      title: 'Web Design',
      description: 'Modern, professional designs that make your Chichester business stand out online.',
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Fast, reliable websites built with the latest technology.',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce',
      description: 'Online stores that help Chichester businesses sell more.',
    },
    {
      icon: TrendingUp,
      title: 'SEO Services',
      description: 'Get found by local customers searching in Chichester and West Sussex.',
    },
  ];

  const benefits = [
    'Local support - I\'m based in West Sussex and understand the local market',
    'Quick response times for meetings and support',
    'Knowledge of the Chichester business community',
    'Competitive pricing for local businesses',
    'Ongoing support and maintenance',
  ];

  return (
    <>
      <ServiceSchema
        data={{
          name: 'Web Design & Development in Chichester',
          description: 'Professional web design and development services for businesses in Chichester, West Sussex.',
          url: 'https://harbonline.co.uk/locations/chichester',
          provider: 'Harbonline',
          serviceType: 'Web Design and Development',
          areaServed: ['Chichester', 'West Sussex'],
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://harbonline.co.uk' },
          { name: 'Locations', url: 'https://harbonline.co.uk/locations' },
          { name: 'Chichester', url: 'https://harbonline.co.uk/locations/chichester' },
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
                <span className="text-accent-primary font-semibold">Chichester, West Sussex</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Web Design & Development in <span className="text-gradient">Chichester</span>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Local web designer and developer serving businesses in Chichester and throughout West Sussex. Modern websites, e-commerce solutions, and custom web applications.
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

        {/* Services Section */}
        <Section background="primary" spacing="normal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Web Services for Chichester Businesses
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              From small startups to established businesses, I help Chichester companies succeed online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <MotionReveal key={service.title} delay={index * 0.1}>
                  <Card variant="glass">
                    <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{service.description}</p>
                  </Card>
                </MotionReveal>
              );
            })}
          </div>
        </Section>

        {/* Why Local Section */}
        <Section background="secondary" spacing="normal">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Why Choose a Local Chichester Web Developer?
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Working with a local developer means better communication, faster support, and someone who understands your market.
              </p>
            </div>

            <MotionReveal>
              <Card variant="elevated">
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-primary flex-shrink-0 mt-1" />
                      <p className="text-text-secondary">{benefit}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </MotionReveal>
          </div>
        </Section>

        {/* About Chichester Section */}
        <Section background="primary" spacing="normal">
          <div className="max-w-4xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
                Serving the Chichester Business Community
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="prose prose-lg max-w-none text-text-secondary">
                <p>
                  Chichester is a vibrant city with a thriving business community, from independent shops in the historic city centre to professional services and growing tech companies. Whether you're a retail business near the Cathedral, a restaurant on South Street, or a professional service provider in the surrounding villages, having a strong online presence is essential.
                </p>
                <p>
                  I work with businesses across Chichester to create websites that attract local customers and drive growth. From simple brochure sites to complex e-commerce platforms, I build solutions tailored to your specific needs.
                </p>
                <p>
                  Serving Chichester city centre, Stockbridge, Whyke, Fishbourne, Bosham, and surrounding areas.
                </p>
              </div>
            </MotionReveal>
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Grow Your Chichester Business Online?
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
