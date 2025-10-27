import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Palette, Users, Smartphone, Eye, CheckCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Design Services — Harbonline',
  description: 'Modern, professional web design that makes your business look credible and trustworthy. Clean, user-friendly designs built to convert visitors into customers.',
  openGraph: {
    title: 'Web Design Services — Harbonline',
    description: 'Modern, professional web design that makes your business look credible and trustworthy.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function WebDesignPage() {
  const benefits = [
    {
      icon: Eye,
      title: 'Professional First Impressions',
      description: 'Clean, modern designs that make your business look credible and trustworthy from the first visit.',
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Intuitive layouts that make it easy for visitors to find what they need and take action.',
    },
    {
      icon: Smartphone,
      title: 'Works Everywhere',
      description: 'Your site looks great and works perfectly on phones, tablets, and desktops.',
    },
  ];

  const process = [
    {
      title: 'Understanding Your Business',
      description: 'I learn about your business, customers, and what you want to achieve with your website.',
    },
    {
      title: 'Design Concepts',
      description: 'I create mockups showing how your site could look, focused on clarity and ease of use.',
    },
    {
      title: 'Refinement',
      description: 'We review together and I make adjustments based on your feedback.',
    },
    {
      title: 'Development',
      description: 'I build the final design into a working website.',
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="loose">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Web Design
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Modern, professional designs that make your business look credible and trustworthy online. Built to convert visitors into customers.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Button href="/contact" size="lg">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </MotionReveal>
          </div>
        </Section>

        {/* Benefits Section */}
        <Section background="primary" spacing="normal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why Good Design Matters</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Your website is often the first interaction people have with your business. Make it count.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <MotionReveal key={benefit.title} delay={index * 0.1}>
                  <Card variant="glass">
                    <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{benefit.description}</p>
                  </Card>
                </MotionReveal>
              );
            })}
          </div>
        </Section>

        {/* Process Section */}
        <Section background="secondary" spacing="normal">
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Design Process</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                A collaborative approach that keeps you involved every step of the way.
              </p>
            </div>
          </MotionReveal>

          <div className="max-w-3xl mx-auto space-y-6">
            {process.map((step, index) => (
              <MotionReveal key={step.title} delay={index * 0.1}>
                <Card variant="glass">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center">
                        <span className="text-accent-primary font-semibold">{index + 1}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Ready to Improve Your Online Presence?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Let's chat about how good design can help your business grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/quote" size="lg">
                  Get a Quote
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
