import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import {
  Globe,
  Code,
  ShoppingCart,
  Search,
  Wrench,
  Layers,
  ArrowRight,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Harbonline',
  description: 'Bespoke web development services in West Sussex: high-performance websites, e-commerce, custom applications, and ongoing support.',
  openGraph: {
    title: 'Services — Harbonline',
    description: 'Bespoke web development services in West Sussex: high-performance websites, e-commerce, custom applications, and ongoing support.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function ServicesPage() {
  const services = [
    {
      icon: Globe,
      title: 'Web Design',
      description:
        'Beautiful, modern website designs that reflect your brand and engage your visitors. Every design is crafted with user experience and conversions in mind.',
      features: [
        'Custom, bespoke designs',
        'Mobile-first responsive layouts',
        'Brand-focused visuals',
        'Conversion-optimised interfaces',
        'User experience research',
      ],
      href: '/services/web-design',
      color: 'accent-primary',
    },
    {
      icon: Code,
      title: 'Web Development',
      description:
        'High-performance websites built with modern technologies. Fast, secure, and scalable solutions that grow with your business.',
      features: [
        'Lightning-fast load times',
        'Clean, maintainable code',
        'SEO-friendly architecture',
        'Cross-browser compatibility',
        'Secure by design',
      ],
      href: '/services/web-development',
      color: 'accent-secondary',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce',
      description:
        'Complete online shop solutions that drive sales. From product catalogues to secure payments, everything you need to sell online.',
      features: [
        'Secure payment processing',
        'Inventory management',
        'Order tracking systems',
        'Customer accounts',
        'Analytics and reporting',
      ],
      href: '/services/ecommerce',
      color: 'accent-primary',
    },
    {
      icon: Search,
      title: 'SEO',
      description:
        'Get found on Google. Technical SEO implementation and optimisation to improve your search rankings and drive organic traffic.',
      features: [
        'Technical SEO audits',
        'On-page optimisation',
        'Performance improvements',
        'Structured data markup',
        'Analytics setup and tracking',
      ],
      href: '/services/seo',
      color: 'accent-secondary',
    },
    {
      icon: Wrench,
      title: 'Website Maintenance',
      description:
        'Keep your website running smoothly. Regular updates, security patches, and technical support to ensure peak performance.',
      features: [
        'Regular security updates',
        'Performance monitoring',
        'Backup and recovery',
        'Content updates',
        'Priority technical support',
      ],
      href: '/services/maintenance',
      color: 'accent-primary',
    },
    {
      icon: Layers,
      title: 'Web Applications',
      description:
        'Bespoke web applications tailored to your business processes. From internal tools to customer-facing platforms.',
      features: [
        'Custom functionality',
        'User authentication',
        'Database integration',
        'API development',
        'Scalable architecture',
      ],
      href: '/services/web-applications',
      color: 'accent-secondary',
    },
  ];

  const process = [
    {
      number: '1',
      title: 'Discovery',
      description:
        "We start with a conversation about your goals, target audience, and project requirements. I'll ask questions to fully understand what you need.",
    },
    {
      number: '2',
      title: 'Planning',
      description:
        "I'll create a detailed project plan with timeline, milestones, and deliverables. You'll know exactly what to expect and when.",
    },
    {
      number: '3',
      title: 'Design & Development',
      description:
        "Your project comes to life. I'll keep you updated with regular progress reports and opportunities for feedback.",
    },
    {
      number: '4',
      title: 'Testing & Launch',
      description:
        'Rigorous testing across devices and browsers ensures everything works perfectly before launch. Then we go live.',
    },
    {
      number: '5',
      title: 'Support',
      description:
        'Post-launch support to address any issues. Optional maintenance packages available for ongoing updates and improvements.',
    },
  ];

  const faqs = [
    {
      question: 'What technologies do you work with?',
      answer:
        'I specialise in modern web technologies including Next.js, React, TypeScript, and Tailwind CSS. The tech stack is always chosen based on project requirements, prioritising performance, maintainability, and scalability.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'Project timelines vary based on scope and complexity. A standard website typically takes 4-8 weeks, whilst bespoke applications may require 3-6 months. I provide realistic estimates during the discovery phase.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer:
        'Yes. I offer flexible maintenance packages that include security updates, performance monitoring, content updates, and technical support to keep your website running smoothly long-term.',
    },
    {
      question: 'What makes Harbonline different?',
      answer:
        'I focus on quality over quantity. Every project is built to exceptional standards: fast load times, WCAG AA accessibility compliance, clean maintainable code, and SEO best practises. You get my full attention, not diluted across dozens of projects.',
    },
    {
      question: 'Do you work with clients outside West Sussex?',
      answer:
        'Absolutely. Whilst I\'m based in West Sussex and work with many local businesses in Chichester, Bognor Regis, and Littlehampton, I work remotely with clients throughout the UK. Location doesn\'t matter—good communication does.',
    },
    {
      question: 'What information do you need to provide a quote?',
      answer:
        'I\'ll need to understand your project goals, target audience, key features required, timeline expectations, and any design preferences. The more detail you can provide, the more accurate the quote will be.',
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Web Development Services
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-8">
                Professional web development services in West Sussex. From beautiful websites to powerful web applications, I build digital solutions that drive results for your business.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
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

        {/* Services Grid */}
        <Section background="primary" spacing="normal">
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">What I Can Do For You</h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Comprehensive web development services to help your business succeed online
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <MotionReveal key={service.title} delay={index * 0.1}>
                  <Card variant="elevated" className="h-full flex flex-col">
                    <div
                      className={`w-14 h-14 rounded-lg bg-${service.color}/10 flex items-center justify-center mb-6`}
                    >
                      <Icon
                        className={`w-7 h-7 text-${service.color}`}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>

                    <p className="text-text-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="mb-6 flex-grow">
                      <ul className="space-y-2 text-sm">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle
                              className={`w-4 h-4 text-${service.color} mt-0.5 flex-shrink-0`}
                              aria-hidden="true"
                            />
                            <span className="text-text-secondary">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <Button
                        href={service.href}
                        variant="primary"
                        className="w-full sm:w-auto"
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
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
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">How We'll Work Together</h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                A clear, structured process from initial conversation to launch and beyond
              </p>
            </div>
          </MotionReveal>

          <div className="max-w-4xl mx-auto space-y-6">
            {process.map((step, index) => (
              <MotionReveal key={step.number} delay={index * 0.1}>
                <Card variant="glass">
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent-primary/10 flex items-center justify-center">
                        <span className="text-accent-primary font-bold text-lg md:text-xl">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </Section>

        {/* FAQ Section */}
        <Section background="primary" spacing="normal">
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Common questions about working with Harbonline
              </p>
            </div>
          </MotionReveal>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <MotionReveal key={index} delay={index * 0.1}>
                <Card variant="glass">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <HelpCircle
                        className="w-6 h-6 text-accent-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                      <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
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
                Ready to Start Your Project?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Let's discuss your requirements and how I can help your business succeed online. Get in touch today for a free consultation.
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
