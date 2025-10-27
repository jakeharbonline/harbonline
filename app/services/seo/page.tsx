import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Search, TrendingUp, FileText, BarChart, CheckCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Services — Harbonline',
  description: 'Get found on Google and other search engines. I optimise your website to rank higher and bring in more customers through search.',
  openGraph: {
    title: 'SEO Services — Harbonline',
    description: 'Get found on Google and other search engines.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function SEOPage() {
  const benefits = [
    {
      icon: Search,
      title: 'Show Up In Search',
      description: 'Improve your rankings on Google so potential customers can find you when they search.',
    },
    {
      icon: TrendingUp,
      title: 'More Visitors',
      description: 'Higher rankings mean more people visiting your site, and more opportunities to grow your business.',
    },
    {
      icon: BarChart,
      title: 'Track Progress',
      description: 'See how your site is performing with clear reporting on rankings, traffic, and results.',
    },
  ];

  const services = [
    'Keyword research and strategy',
    'On-page optimization',
    'Technical SEO improvements',
    'Content recommendations',
    'Local SEO (Google Business Profile)',
    'Performance monitoring',
    'Competitor analysis',
    'Monthly reporting',
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
                SEO Services
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                I help your website show up in Google when people search for what you offer. More visibility means more customers.
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
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why SEO Matters</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Most people find businesses through search engines. If you're not showing up, you're missing out on customers.
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

        {/* Services Section */}
        <Section background="secondary" spacing="normal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <MotionReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">What I Do</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  I improve your website's visibility in search engines through a combination of technical improvements, content optimisation, and ongoing monitoring.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Whether you're starting from scratch or improving an existing site, I'll create a plan that works for your business and budget.
                </p>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card variant="glass">
                <ul className="space-y-4">
                  {services.map((service, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-text-secondary">{service}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </MotionReveal>
          </div>
        </Section>

        {/* Local SEO Section */}
        <Section background="primary" spacing="normal">
          <MotionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Local SEO</h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                If you serve customers in a specific area like West Sussex, local SEO helps you show up when people search for businesses near them.
              </p>
              <p className="text-text-secondary leading-relaxed">
                I'll optimise your Google Business Profile, local citations, and website to rank for local searches in Chichester, Bognor Regis, Littlehampton, and surrounding areas.
              </p>
            </div>
          </MotionReveal>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Ready To Get Found Online?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Let's talk about how SEO can help your business reach more customers.
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
