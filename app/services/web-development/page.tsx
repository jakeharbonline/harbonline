import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Zap, Code, Smartphone, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development Services — Harbonline',
  description: 'Fast, professional websites built with modern technology. Clean code, great performance, and works perfectly on all devices.',
  openGraph: {
    title: 'Web Development Services — Harbonline',
    description: 'Fast, professional websites built with modern technology.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function WebDevelopmentPage() {
  const benefits = [
    {
      icon: Zap,
      title: 'Fast Loading',
      description: 'Your site loads quickly, keeping visitors engaged and improving your search rankings.',
    },
    {
      icon: Smartphone,
      title: 'Works On All Devices',
      description: 'Perfect display and functionality whether someone visits on phone, tablet, or desktop.',
    },
    {
      icon: Code,
      title: 'Clean, Maintainable Code',
      description: 'Built properly from the start, making it easy to update and add features later.',
    },
  ];

  const features = [
    'Fast load times',
    'Mobile-friendly design',
    'Search engine optimised',
    'Secure and reliable',
    'Easy to update',
    'Scalable as you grow',
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
                Web Development
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Fast, professional websites built with modern technology. I create sites that work great, load quickly, and are easy to manage.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href="/contact" size="lg">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  href="#benefits"
                  variant="secondary"
                  size="lg"
                >
                  Learn More
                  <ChevronDown className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </MotionReveal>
          </div>
        </Section>

        {/* Benefits Section */}
        <Section id="benefits" background="primary" spacing="normal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">What You Get</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Professional web development that helps your business succeed online.
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

        {/* Features Section */}
        <Section background="secondary" spacing="normal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <MotionReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">Built To Perform</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  I build websites using modern frameworks and best practises. This means your site is fast, secure, and ready to grow with your business.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  You get a professional website that loads quickly, works on all devices, and ranks well in search engines.
                </p>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card variant="glass">
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </MotionReveal>
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Ready to Build Your Website?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Let's discuss your project and how I can help bring it to life.
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
