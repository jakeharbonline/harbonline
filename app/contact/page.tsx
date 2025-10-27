import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Button } from '@/components/Button';
import { CallbackForm } from '@/components/CallbackForm';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Harbonline',
  description: 'Get in touch to discuss your web development project. Based in West Sussex, serving businesses across Chichester, Bognor Regis, Littlehampton, and the UK.',
  openGraph: {
    title: 'Contact — Harbonline',
    description: 'Get in touch to discuss your web development project.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'jake@harbonline.co.uk',
      href: 'mailto:jake@harbonline.co.uk',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '07340 917384',
      href: 'tel:07340917384',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'West Sussex, UK',
      href: null,
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero + Contact Methods Combined */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <MotionReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Let's Talk
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Have a project in mind? Want to discuss how I can help your business? Get in touch and I'll get back to you as soon as possible.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="#contact-form" size="lg">
                  Contact Form
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button href="/quote" variant="secondary" size="lg">
                  Get a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </MotionReveal>
          </div>

          {/* Contact Methods */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <MotionReveal key={method.title} delay={index * 0.1}>
                    <Card variant="glass" className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4 mx-auto">
                        <Icon className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="text-text-secondary hover:text-accent-primary transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-text-secondary">{method.value}</p>
                      )}
                    </Card>
                  </MotionReveal>
                );
              })}
            </div>

            <div id="contact-form">
              <MotionReveal delay={0.4}>
                <Card variant="elevated" className="max-w-2xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4 text-center">Request a Callback</h2>
                  <p className="text-text-secondary mb-6 text-center">
                    Enter your details and I'll call you back as soon as possible.
                  </p>
                  <CallbackForm />
                </Card>
              </MotionReveal>
            </div>
          </div>
        </Section>

        {/* What to Expect */}
        <Section background="secondary" spacing="normal">
          <div className="max-w-3xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center">What Happens Next?</h2>
            </MotionReveal>

            <div className="space-y-6">
              <MotionReveal delay={0.1}>
                <Card variant="glass">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center">
                        <span className="text-accent-primary font-semibold">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">You Get In Touch</h3>
                      <p className="text-text-secondary leading-relaxed">
                        Send me an email with some details about your project, business, and what you're looking to achieve.
                      </p>
                    </div>
                  </div>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.2}>
                <Card variant="glass">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center">
                        <span className="text-accent-primary font-semibold">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">We Chat</h3>
                      <p className="text-text-secondary leading-relaxed">
                        I'll reply with some questions to better understand your needs. We can arrange a call if needed.
                      </p>
                    </div>
                  </div>
                </Card>
              </MotionReveal>

              <MotionReveal delay={0.3}>
                <Card variant="glass">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center">
                        <span className="text-accent-primary font-semibold">3</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">You Get a Quote</h3>
                      <p className="text-text-secondary leading-relaxed">
                        I'll send you a clear proposal with pricing, timeline, and what's included. No pressure, no surprises.
                      </p>
                    </div>
                  </div>
                </Card>
              </MotionReveal>
            </div>
          </div>
        </Section>

        {/* Local Area */}
        <Section background="primary" spacing="normal">
          <MotionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Serving West Sussex & Beyond</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                I'm based in West Sussex and work with businesses across Chichester, Bognor Regis, Littlehampton, and surrounding areas.
              </p>
              <p className="text-text-secondary leading-relaxed">
                I also work remotely with clients throughout the UK. Location doesn't matter—good communication does.
              </p>
            </div>
          </MotionReveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
