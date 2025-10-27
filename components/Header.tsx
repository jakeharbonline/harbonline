'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 300); // 300ms delay before closing
  };

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const serviceLinks = [
    { href: '/services/web-design', label: 'Web Design' },
    { href: '/services/web-development', label: 'Web Development' },
    { href: '/services/ecommerce', label: 'E-Commerce' },
    { href: '/services/web-applications', label: 'Custom Software' },
    { href: '/services/seo', label: 'SEO' },
    { href: '/services/maintenance', label: 'Maintenance & Support' },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-semibold">
            <span className="text-gradient">harbonline.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors text-text-secondary hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className="text-sm font-medium transition-colors text-text-secondary hover:text-text-primary flex items-center gap-1"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </Link>

              {servicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-56 z-50">
                  <div className="bg-bg-primary/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl py-2">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Get a Quote Button */}
            <Link
              href="/quote"
              className="px-5 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors text-text-secondary hover:text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Services Section */}
              <div className="border-t border-white/10 pt-4 mt-2">
                <div className="text-xs font-semibold text-text-tertiary mb-3 px-2">Services</div>
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="block text-sm font-medium transition-colors text-text-secondary hover:text-text-primary py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {service.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Get a Quote Button */}
              <Link
                href="/quote"
                className="mt-4 px-5 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white text-sm font-semibold rounded-lg transition-all text-center shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
