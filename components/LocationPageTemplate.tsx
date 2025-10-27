import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { ServiceSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { MapPin, Code, Palette, ShoppingCart, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import type { LocationData } from '@/lib/location-data';

interface LocationPageTemplateProps {
  location: LocationData;
}

export function LocationPageTemplate({ location }: LocationPageTemplateProps) {
  const services = [
    {
      icon: Palette,
      title: 'Web Design',
      description: `Modern, professional designs that make your ${location.name} business stand out online.`,
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Fast, reliable websites built with the latest technology.',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce',
      description: `Online stores that help ${location.name} businesses sell more.`,
    },
    {
      icon: TrendingUp,
      title: 'SEO Services',
      description: `Get found by local customers searching in ${location.name} and ${location.county}.`,
    },
  ];

  const benefits = [
    `Local support - I'm based in West Sussex and understand the local market`,
    'Quick response times for meetings and support',
    `Knowledge of the ${location.name} business community`,
    'Competitive pricing for local businesses',
    'Ongoing support and maintenance',
  ];

  return (
    <>
      <ServiceSchema
        data={{
          name: `Web Design & Development in ${location.name}`,
          description: `Professional web design and development services for businesses in ${location.name}, ${location.county}.`,
          url: `https://harbonline.co.uk/locations/${location.slug}`,
          provider: 'Harbonline',
          serviceType: 'Web Design and Development',
          areaServed: [location.name, location.county],
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://harbonline.co.uk' },
          { name: 'Locations', url: 'https://harbonline.co.uk/locations' },
          { name: location.name, url: `https://harbonline.co.uk/locations/${location.slug}` },
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
                <span className="text-accent-primary font-semibold">{location.name}, {location.county}</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Web Design & Development in <span className="text-gradient">{location.name}</span>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Local web designer and developer serving businesses in {location.name} and throughout {location.county}. Modern websites, e-commerce solutions, and custom web applications.
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
              Web Services for {location.name} Businesses
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              From small startups to established businesses, I help {location.name} companies succeed online.
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
                Why Choose a Local {location.name} Web Developer?
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

        {/* About Location Section */}
        <Section background="primary" spacing="normal">
          <div className="max-w-4xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
                Serving the {location.name} Business Community
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="prose prose-lg max-w-none text-text-secondary">
                <p>{location.description}</p>
                <p>{location.localInfo}</p>
                <p>
                  I work with businesses across {location.name} to create websites that attract local customers and drive growth. From simple brochure sites to complex e-commerce platforms, I build solutions tailored to your specific needs.
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
                Ready to Grow Your {location.name} Business Online?
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
