import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Code, Zap, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Jake — Harbonline',
  description: 'Jake is a freelance web developer based in West Sussex. Building professional websites that help businesses grow and succeed online.',
  openGraph: {
    title: 'About Jake — Harbonline',
    description: 'Freelance web developer based in West Sussex, building professional websites for local businesses.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Code,
      title: 'Quality Work',
      description: 'I take pride in writing clean code and building websites that work reliably for years.',
    },
    {
      icon: Users,
      title: 'Direct Communication',
      description: 'You work directly with me—no project managers or sales teams. Just clear, honest conversation.',
    },
    {
      icon: Zap,
      title: 'Results Focused',
      description: 'I build websites that help your business succeed, not just look good in screenshots.',
    },
  ];

  const techStack = [
    'Next.js & React',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'WordPress',
    'HTML/CSS/JavaScript',
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="loose">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <MotionReveal>
                <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                  <Image
                    src="/images/jakewembley.png"
                    alt="Jake Wembley - Freelance Web Developer"
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                </div>
              </MotionReveal>

              <div className="text-center lg:text-left">
                <MotionReveal delay={0.1}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                    Hi, I'm Jake
                  </h1>
                </MotionReveal>

                <MotionReveal delay={0.2}>
                  <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
                    I'm a freelance web developer based in West Sussex. I help businesses grow by building professional websites that work.
                  </p>
                </MotionReveal>

                <MotionReveal delay={0.3}>
                  <Button href="/contact" size="lg">
                    Let's Work Together
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </MotionReveal>
              </div>
            </div>
          </div>
        </Section>

        {/* About Content */}
        <Section background="primary" spacing="normal">
          <div className="max-w-3xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">My Approach</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  I started building websites because I enjoyed solving problems and creating things that actually help people. That's still what drives me today.
                </p>
                <p>
                  When you work with me, you get one person who understands your project from start to finish. No miscommunication between teams, no being passed around departments. Just me, focused on building something that works for your business.
                </p>
                <p>
                  I keep things simple and honest. I'll tell you what you need, what you don't, and what's going to give you the best return on your investment. My goal is to build websites that help your business succeed—not to upsell unnecessary features or overcomplicate things.
                </p>
              </div>
            </MotionReveal>
          </div>
        </Section>

        {/* Values Section */}
        <Section background="secondary" spacing="normal">
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">What I Value</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                The principles that guide how I work and build websites.
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <MotionReveal key={value.title} delay={index * 0.1}>
                  <Card variant="glass">
                    <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{value.description}</p>
                  </Card>
                </MotionReveal>
              );
            })}
          </div>
        </Section>

        {/* Tech Stack */}
        <Section background="primary" spacing="normal">
          <div className="max-w-3xl mx-auto">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Technologies I Use</h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                I work with modern, reliable technologies that create fast, secure websites. Here's what I use most:
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card variant="glass">
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {techStack.map((tech, index) => (
                    <li key={index} className="text-text-secondary">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <p className="text-text-secondary leading-relaxed mt-6">
                I choose the right tool for each project based on your needs, not what's trendy or what I want to experiment with.
              </p>
            </MotionReveal>
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Let's Build Something Together
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                If you need a website that works and someone you can actually talk to, let's chat.
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
