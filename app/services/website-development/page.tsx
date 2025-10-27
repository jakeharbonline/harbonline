import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { Zap, Search, Smartphone, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Development Services — Harbonline',
  description: 'High-performance, accessible, and SEO-optimised websites. Lighthouse scores of 95+, fast load times, and built to convert.',
  openGraph: {
    title: 'Website Development Services — Harbonline',
    description: 'High-performance, accessible, and SEO-optimised websites. Lighthouse scores of 95+, fast load times, and built to convert.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function WebsiteDevelopmentPage() {
  const problems = [
    {
      icon: Zap,
      title: 'Slow Load Times',
      description: 'Heavy frameworks, unoptimised images, and bloated code slow down your site and frustrate users.',
    },
    {
      icon: Search,
      title: 'Poor SEO Performance',
      description: 'Technical issues, missing metadata, and slow speeds prevent your site from ranking well.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Experience',
      description: 'Sites that don\'t adapt to mobile devices lose visitors and conversions.',
    },
  ];

  const process = [
    {
      title: 'Discovery & Planning',
      description: 'We learn about your business, target audience, and goals. We map out site structure, content strategy, and technical requirements.',
    },
    {
      title: 'Design & Prototyping',
      description: 'Wireframes and visual designs focused on user experience and conversion. Mobile-first layouts tested for clarity and usability.',
    },
    {
      title: 'Development',
      description: 'Clean code using modern frameworks. Regular progress updates and opportunities for feedback throughout the build.',
    },
    {
      title: 'Testing & Optimisation',
      description: 'Rigorous testing across devices and browsers. Performance tuning to hit Lighthouse 95+ across all metrics.',
    },
    {
      title: 'Launch & Support',
      description: 'Smooth deployment with minimal downtime. Post-launch support to address any issues and ensure success.',
    },
  ];

  const outcomes = [
    'Faster load times leading to lower bounce rates',
    'Improved search rankings through technical SEO',
    'Better user experience and higher conversion rates',
    'Accessible design that works for all users',
    'Clean codebase that\'s easy to maintain and extend',
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
                Website Development
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                Fast, accessible, and SEO-optimised websites that convert visitors and rank well. Built with modern frameworks and designed to perform.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Button href="/services" size="lg">
                View All Services
              </Button>
            </MotionReveal>
          </div>
        </Section>

        {/* Problem �' Solution Section */}
        <Section background="primary" spacing="normal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Common Challenges We Solve</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Many websites struggle with performance, accessibility, and SEO. We build sites that excel in all three.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <MotionReveal key={problem.title} delay={index * 0.1}>
                  <Card variant="glass">
                    <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{problem.description}</p>
                  </Card>
                </MotionReveal>
              );
            })}
          </div>

          <MotionReveal>
            <Card variant="elevated" className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4">Our Solution</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                We build websites with performance, accessibility, and SEO baked in from the start�"not added as an afterthought.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Every site targets <strong className="text-text-primary">Lighthouse scores of 95+</strong>, meets <strong className="text-text-primary">WCAG AA</strong> accessibility standards, and is optimised for search engines and conversions.
              </p>
            </Card>
          </MotionReveal>
        </Section>

        {/* Process Section */}
        <Section background="secondary" spacing="normal">
          <MotionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Development Process</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                A structured, collaborative approach that delivers exceptional results.
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

        {/* Performance & SEO Section */}
        <Section background="primary" spacing="normal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <MotionReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">Performance & SEO Focus</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Fast sites rank better, convert more visitors, and provide a better user experience. We optimise every aspect of your website to ensure peak performance.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium mb-1">Lighthouse 95+ Scores</h4>
                      <p className="text-sm text-text-secondary">Performance, Accessibility, Best Practises, and SEO.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium mb-1">Core Web Vitals</h4>
                      <p className="text-sm text-text-secondary">LCP, FID, and CLS all within Google's "Good" thresholds.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium mb-1">Technical SEO</h4>
                      <p className="text-sm text-text-secondary">Structured data, sitemaps, meta tags, and clean URLs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium mb-1">Mobile-First</h4>
                      <p className="text-sm text-text-secondary">Responsive design that works beautifully on all devices.</p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card variant="elevated" className="p-8 md:p-10">
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-accent-primary mb-2">95+</div>
                    <div className="text-sm text-text-secondary">Lighthouse Performance Score</div>
                  </div>

                  <div>
                    <div className="text-4xl font-bold text-accent-primary mb-2">&lt; 2.5s</div>
                    <div className="text-sm text-text-secondary">Largest Contentful Paint (LCP)</div>
                  </div>

                  <div>
                    <div className="text-4xl font-bold text-accent-primary mb-2">WCAG AA</div>
                    <div className="text-sm text-text-secondary">Accessibility Compliance</div>
                  </div>

                  <div>
                    <div className="text-4xl font-bold text-accent-primary mb-2">100%</div>
                    <div className="text-sm text-text-secondary">Mobile Responsive</div>
                  </div>
                </div>
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
                What you can expect when working with Harbonline.
              </p>
            </div>
          </MotionReveal>

          <div className="max-w-3xl mx-auto">
            <Card variant="glass">
              <ul className="space-y-4">
                {outcomes.map((outcome, index) => (
                  <MotionReveal key={index} delay={index * 0.05}>
                    <li className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
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
                Recent website development work showcasing performance and attention to detail.
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <MotionReveal delay={0.1}>
              <Card variant="elevated">
                <div className="aspect-video bg-gradient-mesh rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Professional Services Site</h3>
                <p className="text-text-secondary mb-4">
                  Clean design, fast performance, and strong SEO for a growing consultancy.
                </p>
                <span className="text-accent-primary text-sm font-medium">View Case Study �'</span>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <Card variant="elevated">
                <div className="aspect-video bg-gradient-mesh rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">E-Commerce Platform</h3>
                <p className="text-text-secondary mb-4">
                  Bespoke online store with product filtering and seamless checkout.
                </p>
                <span className="text-accent-primary text-sm font-medium">View Case Study �'</span>
              </Card>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <Card variant="elevated">
                <div className="aspect-video bg-gradient-mesh rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Portfolio & Blog</h3>
                <p className="text-text-secondary mb-4">
                  Content-focused site with elegant typography and smooth navigation.
                </p>
                <span className="text-accent-primary text-sm font-medium">View Case Study �'</span>
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
                Let's discuss your project and how we can help you achieve your goals.
              </p>
              <Button href="/services" size="lg">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </MotionReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
