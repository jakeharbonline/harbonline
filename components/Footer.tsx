'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { id: 'website-dev', href: '/services/website-development', label: 'Business Websites' },
      { id: 'web-apps', href: '/services/web-applications-bespoke-software', label: 'Custom Tools & Apps' },
    ],
    company: [
      { id: 'about', href: '#', label: 'About Me', disabled: true },
      { id: 'contact', href: '#contact', label: "Let's Chat" },
    ],
    legal: [
      { id: 'privacy', href: '#', label: 'Privacy Policy', disabled: true },
      { id: 'terms', href: '#', label: 'Terms of Service', disabled: true },
    ],
  };

  const socialLinks = [
    { id: 'linkedin', href: '#', label: 'LinkedIn', icon: Linkedin },
    { id: 'github', href: '#', label: 'GitHub', icon: Github },
    { id: 'twitter', href: '#', label: 'Twitter', icon: Twitter },
  ];

  return (
    <footer className="bg-bg-secondary border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-semibold">
              <span className="text-gradient">harbonline.</span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              Freelance web developer helping businesses grow online. No jargon, just results.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">What I Do</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">More</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.disabled
                        ? 'text-text-tertiary cursor-not-allowed'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    aria-disabled={link.disabled ? 'true' : undefined}
                    onClick={(e) => link.disabled && e.preventDefault()}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.disabled
                        ? 'text-text-tertiary cursor-not-allowed'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    aria-disabled={link.disabled ? 'true' : undefined}
                    onClick={(e) => link.disabled && e.preventDefault()}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    aria-label={social.label}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-text-tertiary text-center">
            © {currentYear} Harbonline. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
