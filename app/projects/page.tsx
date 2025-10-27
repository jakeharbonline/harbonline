'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { MotionReveal } from '@/components/MotionReveal';
import { ArrowRight, ExternalLink, Tag } from 'lucide-react';
import { getProjects } from '@/lib/mock-projects';
import type { Project } from '@/lib/mock-projects';

export default function ProjectsPage() {
  const [projects] = useState<Project[]>(getProjects());

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Section background="gradient" spacing="loose">
          <div className="max-w-4xl mx-auto text-center">
            <MotionReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                My <span className="gradient-text">Work</span>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                A selection of recent projects I've built for clients. Each project showcases different technologies and solutions tailored to specific business needs.
              </p>
            </MotionReveal>
          </div>
        </Section>

        {/* Projects Grid */}
        <Section background="primary" spacing="normal">
          <div className="max-w-6xl mx-auto">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projects.map((project, index) => (
                  <MotionReveal key={project.id} delay={index * 0.1}>
                    <Card variant="elevated" className="group h-full flex flex-col">
                      {/* Project Image */}
                      <div className="aspect-video bg-gradient-mesh rounded-lg mb-4 overflow-hidden">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                            <span className="text-sm">No image</span>
                          </div>
                        )}
                      </div>

                      {/* Project Content */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-accent-primary transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-text-secondary mb-4 flex-1 text-sm leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white/5 rounded text-xs text-text-secondary flex items-center gap-1"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* View Link */}
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-primary-hover transition-colors text-sm font-medium mt-auto"
                          >
                            View Live Site
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </Card>
                  </MotionReveal>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-text-tertiary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
                <p className="text-text-secondary">Check back soon for my latest work</p>
              </div>
            )}
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="secondary" spacing="normal">
          <div className="max-w-3xl mx-auto text-center">
            <MotionReveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Let's discuss how I can help bring your vision to life with a custom solution built just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/quote"
                  className="px-8 py-4 bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Get a Quote
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors font-semibold"
                >
                  Contact Me
                </a>
              </div>
            </MotionReveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
