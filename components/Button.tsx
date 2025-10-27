'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { buttonPress } from '@/lib/motion-presets';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus-ring';

  const variantStyles = {
    primary: 'bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-accent-primary/30 active:shadow-md',
    secondary: 'bg-transparent border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/5 active:bg-white/10',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  if (href && !disabled) {
    return (
      <motion.div className="inline-block" {...buttonPress}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...buttonPress}
    >
      {children}
    </motion.button>
  );
}
