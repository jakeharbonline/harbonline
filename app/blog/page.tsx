import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Design & Development Blog | Harbonline',
  description: 'Tips, guides, and insights on web design, development, SEO, and digital marketing for West Sussex businesses.',
  keywords: ['web design blog', 'SEO tips', 'web development guide', 'digital marketing'],
  openGraph: {
    title: 'Web Design Blog | Harbonline',
    description: 'Tips and guides on web design, development, and SEO.',
    siteName: 'Harbonline',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://harbonline.co.uk' },
          { name: 'Blog', url: 'https://harbonline.co.uk/blog' },
        ]}
      />

      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <div className="flex items-center justify-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-accent-primary" />
                <span className="text-accent-primary font-semibold">Blog & Resources</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Web Design & Development <span className="text-gradient">Insights</span>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Tips, guides, and best practices for building better websites and growing your online presence.
              </p>
            </MotionReveal>
          </div>
        </Section>

        {/* Blog Posts */}
        <Section background="primary" spacing="normal">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {sortedPosts.map((post, index) => (
                <MotionReveal key={post.slug} delay={index * 0.1}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card variant="elevated" className="hover:border-accent-primary transition-colors cursor-pointer group">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold group-hover:text-accent-primary transition-colors">
                          {post.title}
                        </h2>

                        <p className="text-text-secondary leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center text-accent-primary font-semibold group-hover:gap-2 transition-all">
                          Read Article
                          <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </MotionReveal>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="gradient" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need Help With Your Website?
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg text-text-secondary mb-8">
                From design to development to SEO, I can help your West Sussex business succeed online.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/quote" size="lg">
                  Get a Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  View Services
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
