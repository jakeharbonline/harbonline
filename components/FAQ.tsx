'use client';

import { Card } from './Card';
import { MotionReveal } from './MotionReveal';
import { FAQSchema } from './StructuredData';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

function FAQAccordionItem({ faq, index }: { faq: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full text-left py-6 flex items-start justify-between gap-4 hover:text-accent-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-6 text-text-secondary leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export function FAQ({ title = 'Frequently Asked Questions', subtitle, faqs }: FAQProps) {
  return (
    <>
      {/* Add FAQ Schema for SEO */}
      <FAQSchema faqs={faqs} />

      <div className="text-center mb-12">
        <MotionReveal>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">{title}</h2>
        </MotionReveal>
        {subtitle && (
          <MotionReveal delay={0.1}>
            <p className="text-text-secondary max-w-2xl mx-auto">{subtitle}</p>
          </MotionReveal>
        )}
      </div>

      <MotionReveal delay={0.2}>
        <div className="max-w-3xl mx-auto">
          <Card variant="elevated">
            {faqs.map((faq, index) => (
              <FAQAccordionItem key={index} faq={faq} index={index} />
            ))}
          </Card>
        </div>
      </MotionReveal>
    </>
  );
}
