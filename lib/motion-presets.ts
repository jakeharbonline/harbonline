/**
 * Motion Presets for Framer Motion
 *
 * Strict motion budget:
 * - Durations: 200-350ms
 * - Easing: ease-out / ease-in-out
 * - Respects prefers-reduced-motion
 */

// Check if user prefers reduced motion
const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

/**
 * Fade in from bottom (small movement)
 */
export const fadeInUp = (size: 'sm' | 'md' = 'sm') => {
  const yOffset = size === 'sm' ? 12 : 20;

  return {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: yOffset },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0 },
    transition: {
      duration: 0.3,
      ease: 'easeOut' as any
    }
  };
};

/**
 * Simple fade in (opacity only)
 */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.25,
    ease: 'easeOut' as any
  }
};

/**
 * Subtle scale in
 */
export const scaleIn = prefersReducedMotion
  ? fadeIn
  : {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      transition: {
        duration: 0.3,
        ease: 'easeOut' as any
      }
    };

/**
 * Stagger children animations
 */
export const stagger = (size: 'sm' | 'md' | 'lg' = 'md') => {
  const delays = {
    sm: 0.05,
    md: 0.08,
    lg: 0.12
  };

  return {
    animate: {
      transition: {
        staggerChildren: delays[size],
        delayChildren: 0.05
      }
    }
  };
};

/**
 * Floating orb (very subtle vertical movement)
 * Only animates if motion is allowed
 */
export const floatingOrb = prefersReducedMotion
  ? {
      initial: { opacity: 0 },
      animate: { opacity: 0.2 }
    }
  : {
      initial: { opacity: 0, y: 12 },
      animate: {
        opacity: 0.2,
        y: [12, 0, 12],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut" as any
      }
    };

/**
 * Gentle parallax scroll effect
 */
export const parallax = (offset: number = 50) =>
  prefersReducedMotion
    ? {}
    : {
        y: [0, offset],
        transition: {
          ease: 'linear'
        }
      };

/**
 * Card hover lift (micro-interaction)
 */
export const cardHover = prefersReducedMotion
  ? {}
  : {
      whileHover: {
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" as any }
      }
    };

/**
 * Button press effect
 */
export const buttonPress = prefersReducedMotion
  ? {}
  : {
      whileTap: {
        scale: 0.98,
        transition: { duration: 0.1 }
      }
    };
