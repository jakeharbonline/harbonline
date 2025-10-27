import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Shield, RefreshCw, Zap, Wrench, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Maintenance & Support — Harbonline',
  description: 'Keep your website running smoothly with ongoing maintenance, updates, and support. Bug fixes, security updates, and minor changes included.',
  openGraph: {
    title: 'Website Maintenance & Support — Harbonline',
    description: 'Keep your website running smoothly with ongoing maintenance and support.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function MaintenancePage() {
  const benefits = [
    {
      icon: Shield,
      title: 'Security & Updates',
      description: 'Regular security patches and software updates to keep your site safe and running smoothly.',
    },
    {
      icon: Wrench,
      title: 'Bug Fixes',
      description: 'Quick fixes for any issues that come up, so your site stays working perfectly.',
    },
    {
      icon: RefreshCw,
      title: 'Content Updates',
      description: 'Small content changes, image updates, and minor tweaks as your business evolves.',
    },
    {
      icon: Zap,
      title: 'Performance Monitoring',
      description: 'I keep an eye on your site\'s performance and fix issues before they become problems.',
    },
  ];

  const included = [
    'Security updates and patches',
    'Software and plugin updates',
    'Bug fixes and troubleshooting',
    'Content and image updates',
    'Performance monitoring',
    'Backup management',
    'Uptime monitoring',
    'Priority support',
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
                Maintenance & Support
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Your website needs regular care to stay secure, fast, and up-to-date. I provide ongoing maintenance so you can focus on your business.
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
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">What's Included</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Everything you need to keep your website running smoothly and securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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

        {/* Services List Section */}
        <Section background="secondary" spacing="normal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <MotionReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ongoing Care</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Websites aren't a one-and-done project. They need regular updates, security patches, and occasional tweaks to stay healthy.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  I offer flexible maintenance packages so you get the support you need without worrying about hourly rates or surprise bills.
                </p>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card variant="glass">
                <ul className="space-y-4">
                  {included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </MotionReveal>
          </div>
        </Section>

        {/* Peace of Mind Section */}
        <Section background="primary" spacing="normal">
          <MotionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Peace Of Mind</h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                With a maintenance plan, you don't have to worry about technical issues, security risks, or things breaking when you need your site most.
              </p>
              <p className="text-text-secondary leading-relaxed">
                I monitor your site, apply updates, and fix problems quickly—so your website is always working for your business.
              </p>
            </div>
          </MotionReveal>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Ready To Protect Your Investment?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Let's discuss a maintenance plan that keeps your website healthy and secure.
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
