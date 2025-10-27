'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { VantaBackground } from '@/components/VantaBackground';
import { TrendingUp, Smartphone, Search, Users, CheckCircle, ArrowRight, Clock, MessageCircle, Calendar, Calculator, FileText, Lock, BarChart, Package } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { floatingOrb } from '@/lib/motion-presets';

export default function HomePage() {
  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // Local Business
      {
        '@type': 'ProfessionalService',
        '@id': 'https://harbonline.co.uk/#organization',
        name: 'Harbonline',
        description: 'Professional web design, development, and SEO services in West Sussex',
        url: 'https://harbonline.co.uk',
        telephone: '07340917384',
        email: 'jake@harbonline.co.uk',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'West Sussex',
          addressRegion: 'England',
          addressCountry: 'GB',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '50.8365',
          longitude: '-0.7792',
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Chichester',
          },
          {
            '@type': 'City',
            name: 'Bognor Regis',
          },
          {
            '@type': 'City',
            name: 'Littlehampton',
          },
          {
            '@type': 'City',
            name: 'Worthing',
          },
        ],
        priceRange: '££',
        sameAs: [
          // Add your social media profiles
          // 'https://twitter.com/harbonline',
          // 'https://linkedin.com/company/harbonline',
        ],
      },
      // Website
      {
        '@type': 'WebSite',
        '@id': 'https://harbonline.co.uk/#website',
        url: 'https://harbonline.co.uk',
        name: 'Harbonline',
        description: 'Professional web design, development, and SEO services in West Sussex',
        publisher: {
          '@id': 'https://harbonline.co.uk/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://harbonline.co.uk/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      // Services Offered
      {
        '@type': 'Service',
        '@id': 'https://harbonline.co.uk/#service',
        serviceType: 'Web Development',
        provider: {
          '@id': 'https://harbonline.co.uk/#organization',
        },
        areaServed: {
          '@type': 'Country',
          name: 'United Kingdom',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web Development Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Web Design',
                description: 'Modern, professional web design services',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Web Development',
                description: 'Fast, professional websites built with modern technology',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'E-Commerce Development',
                description: 'Custom online stores and e-commerce solutions',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Software Development',
                description: 'Bespoke web applications and custom software',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'SEO Services',
                description: 'Search engine optimization for better visibility',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <Section background="primary" spacing="normal">
          <VantaBackground />
          <div className="relative">
            {/* Floating Accent Orb (1 of 2 above-the-fold elements) */}
            <motion.div
              {...floatingOrb}
              className="absolute -top-10 right-0 md:right-20 h-64 w-64 md:h-96 md:w-96 rounded-full bg-gradient-to-tr from-[#6A00FF] to-[#B24CFF] blur-3xl pointer-events-none select-none -z-10"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-sm">
                <MotionReveal>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-5">
                    Building Websites That
                    <br />
                    <span className="gradient-text">Help Businesses Grow</span>
                  </h1>
                </MotionReveal>

              <MotionReveal delay={0.1}>
                <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6">
                  I'm Jake, a freelance web developer. I build fast, professional websites that help businesses grow and get more customers online.
                </p>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/contact" size="lg">
                    Let's Talk
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button href="/quote" variant="secondary" size="lg">
                    Get A Quote
                  </Button>
                </div>
              </MotionReveal>
            </div>

              <MotionReveal delay={0.3}>
                <div className="relative">
                  <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-white/10 bg-gradient-mesh depth-glow">
                    <Image
                      src="/images/jake.png"
                      alt="Jake - Freelance Web Developer"
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </MotionReveal>
            </div>
          </div>
        </Section>

        {/* What I Do */}
        <Section background="primary" spacing="normal">
          <div className="relative">
            <MotionReveal>
              <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">What I Do</h2>
                <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
                  I handle everything from design to launch. You get one person who manages your entire project—no juggling multiple people or companies.
                </p>
              </div>
            </MotionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
              <MotionReveal delay={0.1}>
                <Card variant="glass" href="/services/web-design">
                <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Web Design</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Modern, professional designs that make your business look credible and trustworthy online.
                </p>
                <span className="text-accent-primary text-sm font-medium">Learn More →</span>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card variant="glass" href="/services/web-development">
                <div className="w-12 h-12 rounded-lg bg-accent-secondary/10 flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-accent-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Web Development</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Fast, professional websites that work perfectly on all devices and turn visitors into customers.
                </p>
                <span className="text-accent-secondary text-sm font-medium">Learn More →</span>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card variant="glass" href="/services/ecommerce">
                <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">E-Commerce</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Secure online stores where customers can buy easily. Simple for you to manage, safe for them to use.
                </p>
                <span className="text-accent-primary text-sm font-medium">Learn More →</span>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <Card variant="glass" href="/services/web-applications">
                <div className="w-12 h-12 rounded-lg bg-accent-secondary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-accent-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Web Applications</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Custom tools like booking systems, dashboards, and portals built specifically for your business.
                </p>
                <span className="text-accent-secondary text-sm font-medium">Learn More →</span>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.5}>
              <Card variant="glass" href="/services/seo">
                <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">SEO</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Get your website showing up in Google searches so more people can find your business online.
                </p>
                <span className="text-accent-primary text-sm font-medium">Learn More →</span>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.6}>
              <Card variant="glass" href="/services/maintenance">
                <div className="w-12 h-12 rounded-lg bg-accent-secondary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-accent-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Maintenance & Support</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Keep your website running smoothly with regular updates, backups, and quick fixes when needed.
                </p>
                <span className="text-accent-secondary text-sm font-medium">Learn More →</span>
              </Card>
              </MotionReveal>
            </div>
          </div>
        </Section>

        {/* Custom Software Examples */}
        <Section background="primary" spacing="normal">
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Custom Software I Build</h2>
              <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Whatever software your business needs, I can build it. Here are some examples of tools I create:
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <MotionReveal delay={0.1}>
              <div className="p-6 bg-bg-tertiary rounded-xl border border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5 text-accent-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Booking Systems</h3>
                <p className="text-sm text-text-secondary mb-4 flex-grow">
                  Let customers book appointments online—automatically syncs with your calendar, sends reminders, handles payments.
                </p>
                <Button href="/examples/booking-systems" variant="ghost" size="sm" className="w-full">
                  See Example →
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="p-6 bg-bg-tertiary rounded-xl border border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
                <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5 text-accent-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Client Portals</h3>
                <p className="text-sm text-text-secondary mb-4 flex-grow">
                  Give clients secure access to their information, documents, invoices, and project updates in one place.
                </p>
                <Button href="/examples/client-portals" variant="ghost" size="sm" className="w-full">
                  See Example →
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <div className="p-6 bg-bg-tertiary rounded-xl border border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                  <Calculator className="w-5 h-5 text-accent-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Calculators & Quote Tools</h3>
                <p className="text-sm text-text-secondary mb-4 flex-grow">
                  Interactive calculators for quotes, pricing, ROI, loan payments—whatever helps customers make decisions.
                </p>
                <Button href="/examples/calculators" variant="ghost" size="sm" className="w-full">
                  See Example →
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <div className="p-6 bg-bg-tertiary rounded-xl border border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
                <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center mb-4">
                  <BarChart className="w-5 h-5 text-accent-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Dashboards & Analytics</h3>
                <p className="text-sm text-text-secondary mb-4 flex-grow">
                  See your key metrics at a glance—sales, traffic, performance data displayed clearly and simply.
                </p>
                <Button href="/examples/dashboards" variant="ghost" size="sm" className="w-full">
                  See Example →
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.5}>
              <div className="p-6 bg-bg-tertiary rounded-xl border border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                  <Package className="w-5 h-5 text-accent-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Inventory Management</h3>
                <p className="text-sm text-text-secondary mb-4 flex-grow">
                  Track stock levels, manage orders, and get alerts when items are running low. All in one system.
                </p>
                <Button href="/examples/inventory-management" variant="ghost" size="sm" className="w-full">
                  See Example →
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.6}>
              <div className="p-6 bg-bg-tertiary rounded-xl border border-white/5 hover:border-white/10 transition-all flex flex-col h-full">
                <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-accent-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Forms & Workflows</h3>
                <p className="text-sm text-text-secondary mb-4 flex-grow">
                  Custom forms that collect exactly the information you need and automatically process it how you want.
                </p>
                <Button href="/examples/forms-workflows" variant="ghost" size="sm" className="w-full">
                  See Example →
                </Button>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.7}>
            <div className="text-center mt-12">
              <p className="text-text-secondary mb-6">
                These are just examples. If you need something specific for your business, I can build it.
              </p>
              <Button href="/services/web-applications" variant="primary">
                Learn More About Custom Software
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </MotionReveal>
        </Section>

        {/* Why Me */}
        <Section background="primary" spacing="normal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <MotionReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">Why Work With Me</h2>
                <p className="text-text-secondary leading-relaxed mb-8">
                  You work directly with me—the person building your website. No sales teams, no project managers, just clear communication and quality work.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium mb-1">You Talk Directly To Me</h4>
                      <p className="text-sm text-text-secondary">
                        No middlemen, no account managers. You work with the person actually building your site.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium mb-1">Built To Last</h4>
                      <p className="text-sm text-text-secondary">
                        Fast loading, works on all devices, and built properly so it keeps running smoothly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium mb-1">Clear Pricing</h4>
                      <p className="text-sm text-text-secondary">
                        I quote you a price upfront. That's what you pay. No hidden fees or surprise costs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium mb-1">Honest Advice</h4>
                      <p className="text-sm text-text-secondary">
                        If something won't help your business, I'll tell you. I'd rather give you honest advice than make a quick sale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card variant="elevated" className="p-8 md:p-10">
                <h3 className="text-2xl font-semibold mb-6">What You Get</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Website that loads in under 2 seconds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Works perfectly on phones and tablets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Set up to rank on Google</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Easy for you to update yourself (if you want)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Clear updates throughout the project</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Support after launch (no disappearing act)</span>
                  </li>
                </ul>
              </Card>
            </MotionReveal>
          </div>
        </Section>

        {/* How It Works */}
        <Section background="primary" spacing="normal">
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">How It Works</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                A straightforward process—no complicated steps or confusing jargon.
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: '01',
                title: 'We Chat',
                description: "I learn about your business, what you need, and what you want your website to achieve.",
              },
              {
                step: '02',
                title: 'I Quote You',
                description: "You get a clear price and timeline. No hidden costs, no surprises.",
              },
              {
                step: '03',
                title: 'I Build It',
                description: "I keep you updated as I work, show you previews, and make changes based on your feedback.",
              },
              {
                step: '04',
                title: 'You Go Live',
                description: "Your website launches, and I make sure everything works perfectly. I stick around to help if you need me.",
              },
            ].map((item, index) => (
              <MotionReveal key={item.step} delay={index * 0.1}>
                <div>
                  <div className="text-4xl font-bold text-accent-primary/20 mb-3">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </Section>

        {/* Local SEO */}
        <Section background="primary" spacing="normal">
          <MotionReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Based in West Sussex</h2>
              <p className="text-text-secondary leading-relaxed max-w-2xl mx-auto">
                I'm based in West Sussex, working with businesses across Chichester, Bognor Regis, Littlehampton, and throughout the UK. Whether you need a local presence or national reach, I build digital solutions that scale with your ambitions.
              </p>
            </div>
          </MotionReveal>
        </Section>

        {/* CTA */}
        <Section background="primary" spacing="normal" id="contact">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Let's Discuss Your Project
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Whether you have a detailed brief or just an idea, I'd be glad to discuss how I can help bring your vision to life.
              </p>
              <Button href="mailto:jake@harbonline.co.uk" size="lg">
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-text-tertiary text-sm mt-4">
                <Clock className="w-4 h-4 inline mr-1" />
                Typically respond within one business day
              </p>
            </MotionReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
