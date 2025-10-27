'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cardHover } from '@/lib/motion-presets';

interface CardProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'glass' | 'elevated';
  className?: string;
}

export function Card({ children, href, variant = 'glass', className = '' }: CardProps) {
  const baseStyles = 'rounded-2xl p-6 md:p-8 transition-all duration-300 relative overflow-hidden';

  const variantStyles = {
    glass: 'bg-[#141414] border border-white/5 hover:border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:ring-1 hover:ring-white/5 surface-noise',
    elevated: 'bg-bg-secondary border border-white/5 hover:border-white/10 depth-glow surface-noise',
  };

  // Gradient edge effect for glass variant
  const glassEdge = variant === 'glass' ? (
    <div
      className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-white/0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  ) : null;

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={`${classes} block focus-ring group`}
      >
        {glassEdge}
        <motion.div {...cardHover}>
          {children}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div className={classes} {...cardHover}>
      {glassEdge}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
