import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Database, Users, BarChart, Lock, Code, TrendingUp, ArrowRight, Calendar, Calculator, FileText, Package, Wrench } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Software Development — Harbonline',
  description: 'Bespoke software built for your business. Booking systems, calculators, client portals, dashboards, inventory management, and custom forms. Tailored solutions that solve real problems.',
  openGraph: {
    title: 'Custom Software Development — Harbonline',
    description: 'Bespoke software built for your business. Booking systems, calculators, portals, and more.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function WebApplicationsPage() {
  const softwareExamples = [
    {
      icon: Calendar,
      title: 'Booking Systems',
      description: 'Let customers book appointments online. Automatic calendar syncing, email reminders, payment processing, and availability management.',
      link: '/examples/booking-systems',
    },
    {
      icon: Lock,
      title: 'Client Portals',
      description: 'Give clients secure access to their information—documents, invoices, project updates, messages. Everything in one place.',
      link: '/examples/client-portals',
    },
    {
      icon: Calculator,
      title: 'Calculators & Quote Tools',
      description: 'Interactive calculators for pricing, ROI, loan payments, quotes—whatever helps customers make decisions faster.',
      link: '/examples/calculators',
    },
    {
      icon: BarChart,
      title: 'Dashboards & Analytics',
      description: 'See your key metrics at a glance. Sales, traffic, performance data displayed clearly and updated in real-time.',
      link: '/examples/dashboards',
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track stock levels, manage orders, get alerts when items run low. Connect to suppliers and sync across locations.',
      link: '/examples/inventory-management',
    },
    {
      icon: FileText,
      title: 'Forms & Workflows',
      description: 'Custom forms that collect exactly what you need and process it automatically—approvals, notifications, data entry, integrations.',
      link: '/examples/forms-workflows',
    },
  ];

  const principles = [
    {
      title: 'Built To Grow',
      description: 'I design software to handle more users, more data, and new features as your business expands.',
    },
    {
      title: 'Secure By Default',
      description: 'User logins, data encryption, and proper security practises are built in from the start—not added later.',
    },
    {
      title: 'Easy To Maintain',
      description: 'Clean code and clear documentation mean you can update it yourself or hand it to another developer easily.',
    },
    {
      title: 'Fast & Reliable',
      description: 'Quick load times, smooth interactions, and efficient behind-the-scenes work—even when busy.',
    },
  ];

  const outcomes = [
    'Reduced manual work through automation',
    'Improved data accuracy and accessibility',
    'Streamlined workflows and faster processes',
    'Better insights through custom reporting and analytics',
    'Scalable platform that grows with your business',
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
                <span className="text-gradient">Custom Software</span>
                <br />
                Built For Your Business
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Whatever software your business needs, I can build it. Booking systems, calculators, portals, dashboards, inventory tools—tailored exactly to how you work.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Button href="/contact" size="lg">
                Discuss Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </MotionReveal>
          </div>
        </Section>

        {/* Software Examples Section */}
        <Section background="primary" spacing="normal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">What I Can Build</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              These are just examples. If your business needs something specific, I can build it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {softwareExamples.map((example, index) => {
              const Icon = example.icon;
              return (
                <MotionReveal key={example.title} delay={index * 0.1}>
                  <Card variant="glass" className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{example.title}</h3>
                    <p className="text-text-secondary leading-relaxed mb-4 flex-grow">{example.description}</p>
                    <Button href={example.link} variant="ghost" size="sm" className="w-full">
                      See Example →
                    </Button>
                  </Card>
                </MotionReveal>
              );
            })}
          </div>
        </Section>

        {/* Approach & Scalability Section */}
        <Section background="secondary" spacing="normal">
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">How I Build Software</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                I focus on creating software that works reliably, stays secure, and grows with your business.
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {principles.map((principle, index) => (
              <MotionReveal key={principle.title} delay={index * 0.1}>
                <Card variant="elevated">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Code className="w-6 h-6 text-accent-secondary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </Section>

        {/* Process Highlights */}
        <Section background="primary" spacing="normal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <MotionReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">Built To Last</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Custom software is an investment. I build it properly from the start so it works reliably for years and adapts as your business changes.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Modular Design</h4>
                      <p className="text-sm text-text-secondary">
                        Adding new features won't break what's already working. Everything is organised and separate.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Properly Tested</h4>
                      <p className="text-sm text-text-secondary">
                        I test everything thoroughly to catch problems before they affect your users.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Clear Documentation</h4>
                      <p className="text-sm text-text-secondary">
                        Step-by-step guides and technical documentation so you understand how everything works.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium mb-1">Training & Handover</h4>
                      <p className="text-sm text-text-secondary">
                        I'll teach you or your team how to use and maintain the system when I'm done.
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
                    <ArrowRight className="w-5 h-5 text-accent-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Tailored to your exact requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Secure authentication and data handling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Scalable infrastructure that grows with you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Clean, maintainable codebase</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Comprehensive documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-accent-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-secondary">Post-launch support and maintenance</span>
                  </li>
                </ul>
              </Card>
            </MotionReveal>
          </div>
        </Section>

        {/* Outcomes Section */}
        <Section background="secondary" spacing="normal">
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Typical Outcomes</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                The impact of well-built bespoke software.
              </p>
            </div>
          </MotionReveal>

          <div className="max-w-3xl mx-auto">
            <Card variant="glass">
              <ul className="space-y-4">
                {outcomes.map((outcome, index) => (
                  <MotionReveal key={index} delay={index * 0.05}>
                    <li className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-accent-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-text-secondary">{outcome}</span>
                    </li>
                  </MotionReveal>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        {/* Related Work Section */}
        <Section background="primary" spacing="normal">
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Example Projects</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Recent bespoke application work showcasing technical quality and problem-solving.
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <MotionReveal delay={0.1}>
              <Card variant="elevated">
                <div className="aspect-video bg-gradient-mesh rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Project Management Tool</h3>
                <p className="text-text-secondary mb-4">
                  Custom platform for task tracking, team collaboration, and deadline management.
                </p>
                <span className="text-accent-secondary text-sm font-medium">View Case Study →</span>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card variant="elevated">
                <div className="aspect-video bg-gradient-mesh rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-text-secondary mb-4">
                  Real-time data visualisation and reporting for business intelligence.
                </p>
                <span className="text-accent-secondary text-sm font-medium">View Case Study →</span>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card variant="elevated">
                <div className="aspect-video bg-gradient-mesh rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Client Portal</h3>
                <p className="text-text-secondary mb-4">
                  Secure platform for document sharing, invoicing, and client communication.
                </p>
                <span className="text-accent-secondary text-sm font-medium">View Case Study →</span>
              </Card>
            </MotionReveal>
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Need Custom Software?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Tell me what your business needs and I'll build it. No cookie-cutter solutions—just software that works exactly how you want it to.
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
