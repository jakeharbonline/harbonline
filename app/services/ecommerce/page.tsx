import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { ShoppingCart, CreditCard, Package, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Commerce Development — Harbonline',
  description: 'Custom online stores that make it easy for customers to browse, buy, and checkout. Secure payment processing and inventory management built in.',
  openGraph: {
    title: 'E-Commerce Development — Harbonline',
    description: 'Custom online stores that make it easy for customers to browse, buy, and checkout.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function EcommercePage() {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Easy Shopping Experience',
      description: 'Clean product pages, simple navigation, and a checkout process that actually works.',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Safe, reliable payment processing with all major cards and digital wallets.',
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track stock levels, manage products, and update your store easily.',
    },
    {
      icon: TrendingUp,
      title: 'Built To Sell',
      description: 'Designed to turn browsers into buyers with clear calls to action and smooth checkout.',
    },
  ];

  const included = [
    'Product catalog and categories',
    'Shopping cart and checkout',
    'Secure payment processing',
    'Order management',
    'Inventory tracking',
    'Discount codes and promotions',
    'Customer accounts',
    'Mobile-friendly design',
    'Search functionality',
    'Analytics and reporting',
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
                E-Commerce Development
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                I build online stores that are easy for your customers to use and simple for you to manage. Start selling online with a custom e-commerce website.
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

        {/* Features Section */}
        <Section background="primary" spacing="normal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Everything You Need To Sell Online</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              A complete e-commerce solution built around your products and customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <MotionReveal key={feature.title} delay={index * 0.1}>
                  <Card variant="glass">
                    <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                  </Card>
                </MotionReveal>
              );
            })}
          </div>
        </Section>

        {/* What's Included Section */}
        <Section background="secondary" spacing="normal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <MotionReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">What's Included</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Your online store comes with everything you need to start selling—products, payments, orders, and more.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  I build custom solutions tailored to your products and business model, not one-size-fits-all templates.
                </p>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card variant="glass">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-text-secondary">{item}</span>
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
                Ready To Start Selling Online?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Let's discuss your products and build an online store that works for your business.
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
