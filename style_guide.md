# Harbonline Style Guide

## Introduction

This style guide defines the visual design system, typography, colour palette, spacing, components, and interaction patterns for the Harbonline website.

**Design Philosophy:** Modern, dark, sophisticated. High contrast, generous spacing, glassmorphism effects, and subtle 3D elements. Performance and accessibility are non-negotiable.

**Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, TypeScript

---

## Colour Palette

### Primary Colours

**Background Colours**
```
--bg-primary: #0A0A0A        // Deep black (main background)
--bg-secondary: #1A1A1A      // Elevated surfaces (cards, sections)
--bg-tertiary: #242424       // Hover states, subtle elevation
```

**Text Colours**
```
--text-primary: #FFFFFF      // Headings, primary content (100% opacity)
--text-secondary: #A3A3A3    // Body text, descriptions (65% opacity)
--text-tertiary: #737373     // Captions, subtle text (45% opacity)
```

### Accent Colours

**Primary Accent (Blue)**
```
--accent-primary: #3B82F6    // CTAs, links, highlights
--accent-primary-hover: #2563EB
--accent-primary-light: #60A5FA
```

**Secondary Accent (Purple)**
```
--accent-secondary: #8B5CF6  // Alternative CTAs, badges
--accent-secondary-hover: #7C3AED
```

**Success / Positive**
```
--success: #10B981
--success-hover: #059669
```

**Warning / Caution**
```
--warning: #F59E0B
--warning-hover: #D97706
```

**Error / Danger**
```
--error: #EF4444
--error-hover: #DC2626
```

### Neutral Scale

```
--neutral-50: #FAFAFA
--neutral-100: #F5F5F5
--neutral-200: #E5E5E5
--neutral-300: #D4D4D4
--neutral-400: #A3A3A3
--neutral-500: #737373
--neutral-600: #525252
--neutral-700: #404040
--neutral-800: #262626
--neutral-900: #171717
--neutral-950: #0A0A0A
```

### Glassmorphism

**Glass Effect (for cards, modals, overlays)**
```css
background: rgba(26, 26, 26, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

**Tailwind Classes:**
```
bg-white/5 backdrop-blur-md border border-white/10
```

### Gradient Accents

**Gradient 1 (Blue to Purple)**
```css
background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
```

**Gradient 2 (Iridescent Mesh - for 3D shapes)**
```css
background: linear-gradient(135deg,
  rgba(59, 130, 246, 0.3) 0%,
  rgba(139, 92, 246, 0.3) 50%,
  rgba(236, 72, 153, 0.3) 100%
);
```

---

## Typography

### Typefaces

**Headings (Display & UI)**
```
Font Family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Weight: 600 (Semibold) for H1-H3, 500 (Medium) for H4-H6
```

**Body Text**
```
Font Family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Weight: 400 (Regular) for body, 500 (Medium) for emphasis
```

**Monospace (code, technical content)**
```
Font Family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace
Weight: 400
```

### Type Scale

**Headings**
```
H1: 3.5rem (56px) / line-height 1.1 / font-weight 600 / letter-spacing -0.02em
H2: 2.5rem (40px) / line-height 1.2 / font-weight 600 / letter-spacing -0.01em
H3: 2rem (32px) / line-height 1.25 / font-weight 600 / letter-spacing -0.01em
H4: 1.5rem (24px) / line-height 1.3 / font-weight 500 / letter-spacing 0
H5: 1.25rem (20px) / line-height 1.4 / font-weight 500 / letter-spacing 0
H6: 1rem (16px) / line-height 1.5 / font-weight 500 / letter-spacing 0
```

**Body & UI**
```
Body Large: 1.125rem (18px) / line-height 1.7 / font-weight 400
Body Regular: 1rem (16px) / line-height 1.6 / font-weight 400
Body Small: 0.875rem (14px) / line-height 1.5 / font-weight 400
Caption: 0.75rem (12px) / line-height 1.4 / font-weight 400
```

**Tailwind Classes:**
```
H1: text-5xl md:text-6xl font-semibold leading-tight tracking-tight
H2: text-4xl md:text-5xl font-semibold leading-tight tracking-tight
H3: text-3xl md:text-4xl font-semibold leading-snug
H4: text-2xl md:text-3xl font-medium leading-snug
Body: text-base md:text-lg leading-relaxed text-neutral-400
```

### Responsive Typography

**Mobile (< 768px)**
```
H1: 2.5rem (40px)
H2: 2rem (32px)
H3: 1.75rem (28px)
Body: 1rem (16px)
```

**Desktop (≥ 768px)**
```
H1: 3.5rem (56px)
H2: 2.5rem (40px)
H3: 2rem (32px)
Body: 1.125rem (18px)
```

### Font Loading Strategy

```javascript
// next/font configuration
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

**Performance:**
- Use `font-display: swap` to prevent FOIT (Flash of Invisible Text)
- Preload critical fonts
- Subset fonts to Latin character set only

---

## Spacing System

### Base Unit

```
Base: 4px (0.25rem)
```

### Spacing Scale

```
xs:   0.5rem  (8px)   - tight spacing, inline elements
sm:   1rem    (16px)  - small gaps, list items
md:   1.5rem  (24px)  - default spacing
lg:   2rem    (32px)  - section padding (mobile)
xl:   3rem    (48px)  - section padding (desktop)
2xl:  4rem    (64px)  - large section gaps
3xl:  6rem    (96px)  - hero/major section spacing
4xl:  8rem    (128px) - extra large dividers
```

### Layout Spacing

**Section Padding (Vertical)**
```
Mobile:  py-12 (3rem / 48px)
Desktop: py-20 (5rem / 80px)
Hero:    py-24 md:py-32 (6rem-8rem / 96px-128px)
```

**Container Padding (Horizontal)**
```
Mobile:  px-4 (1rem / 16px)
Tablet:  px-6 (1.5rem / 24px)
Desktop: px-8 (2rem / 32px)
```

**Element Gaps**
```
Tight:   gap-2 (0.5rem / 8px)
Normal:  gap-4 (1rem / 16px)
Loose:   gap-6 (1.5rem / 24px)
Section: gap-8 md:gap-12 (2rem-3rem / 32px-48px)
```

---

## Grid & Layout

### Container

**Max-Width**
```
Small:  max-w-3xl (48rem / 768px)  - narrow content, forms
Medium: max-w-5xl (64rem / 1024px) - standard content
Large:  max-w-7xl (80rem / 1280px) - wide layouts, grids
Full:   max-w-full - hero sections, full-bleed
```

**Tailwind Classes:**
```
<div class="max-w-7xl mx-auto px-4 md:px-8">
  <!-- Content -->
</div>
```

### Breakpoints

```
sm:  640px   - Large mobile, small tablet
md:  768px   - Tablet portrait
lg:  1024px  - Tablet landscape, small desktop
xl:  1280px  - Standard desktop
2xl: 1536px  - Large desktop
```

### Grid Systems

**Two-Column Layout**
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

**Three-Column Layout (Cards)**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

**Four-Column Layout (Icon Grid)**
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
  <!-- Items -->
</div>
```

---

## Components

### Buttons

**Primary Button**
```html
<button class="px-6 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-neutral-950">
  Get Started
</button>
```

**Secondary Button (Outline)**
```html
<button class="px-6 py-3 bg-transparent border-2 border-white/20 hover:border-white/40 text-white font-medium rounded-lg transition-all duration-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-neutral-950">
  Learn More
</button>
```

**Ghost Button**
```html
<button class="px-6 py-3 bg-transparent text-neutral-400 hover:text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg">
  View All
</button>
```

**Button Sizes**
```
Small:  px-4 py-2 text-sm
Medium: px-6 py-3 text-base  (default)
Large:  px-8 py-4 text-lg
```

**Accessibility:**
- Minimum touch target: 44x44px
- Visible focus indicator (ring)
- Hover state with subtle scale or colour change
- Active state feedback

### Cards

**Glass Card (Default)**
```html
<div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
  <!-- Card content -->
</div>
```

**Elevated Card (Higher contrast)**
```html
<div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 hover:border-neutral-700 hover:shadow-xl hover:shadow-accent-primary/5 transition-all duration-300">
  <!-- Card content -->
</div>
```

**Interactive Card (Clickable)**
```html
<a href="#" class="block bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-neutral-950">
  <!-- Card content -->
</a>
```

**Card Hover Effects:**
- Subtle lift: `hover:-translate-y-1`
- Border glow: `hover:border-white/20`
- Background brighten: `hover:bg-white/10`
- Shadow: `hover:shadow-xl hover:shadow-accent-primary/10`

### Section Wrapper

**Standard Section**
```html
<section class="py-12 md:py-20 bg-neutral-950">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
    <!-- Section content -->
  </div>
</section>
```

**Alternate Background Section**
```html
<section class="py-12 md:py-20 bg-neutral-900">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
    <!-- Section content -->
  </div>
</section>
```

**Hero Section**
```html
<section class="py-24 md:py-32 lg:py-40 bg-gradient-to-b from-neutral-950 to-neutral-900">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
    <!-- Hero content -->
  </div>
</section>
```

### Form Elements

**Text Input**
```html
<input
  type="text"
  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200"
  placeholder="Your name"
/>
```

**Textarea**
```html
<textarea
  rows="4"
  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all duration-200 resize-none"
  placeholder="Your message"
></textarea>
```

**Form Labels**
```html
<label class="block text-sm font-medium text-neutral-300 mb-2">
  Your Email
</label>
```

### Badges & Tags

**Badge**
```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
  New
</span>
```

**Tag**
```html
<span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300">
  TypeScript
</span>
```

---

## Motion & Animation

### Principles

- **Purposeful:** Every animation should serve a purpose (draw attention, provide feedback, guide the eye)
- **Subtle:** Avoid distracting or excessive motion
- **Fast:** Keep durations short (200-500ms)
- **Smooth:** Use easing functions for natural movement
- **Respectful:** Honour `prefers-reduced-motion` preference

### Framer Motion Variants

**Fade In (Simple)**
```typescript
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
}
```

**Fade Up (Default for sections)**
```typescript
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}
```

**Fade Up with Delay (Staggered)**
```typescript
const fadeUpStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
}
```

**Scale In (for cards, modals)**
```typescript
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}
```

**Slide In from Left**
```typescript
const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}
```

**Slide In from Right**
```typescript
const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}
```

### Scroll-Triggered Animation (MotionReveal)

```typescript
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function MotionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

### Transition Durations

```
Ultra Fast: 150ms  - button hover, focus states
Fast:       200ms  - simple fades, colour changes
Normal:     300ms  - default transitions
Medium:     400ms  - fade in/out, simple reveals
Slow:       500ms  - complex animations, page transitions
```

### Easing Functions

```
easeOut:     'cubic-bezier(0, 0, 0.2, 1)'     - default for enter animations
easeIn:      'cubic-bezier(0.4, 0, 1, 1)'     - exit animations
easeInOut:   'cubic-bezier(0.4, 0, 0.2, 1)'   - reversible animations
spring:      { type: 'spring', stiffness: 300, damping: 30 }  - playful, bouncy
```

### Reduced Motion

**Always respect user preferences:**
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const transition = prefersReducedMotion
  ? { duration: 0 }
  : { duration: 0.5, ease: 'easeOut' }
```

---

## Shadows & Depth

### Shadow Scale

```css
/* Tailwind shadow classes */
shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow:      0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
shadow-xl:   0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
shadow-2xl:  0 25px 50px -12px rgb(0 0 0 / 0.25)
```

### Glow Effects (Accent Shadows)

**Subtle Glow**
```css
box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
```
```
shadow-[0_0_20px_rgba(59,130,246,0.1)]
```

**Medium Glow**
```css
box-shadow: 0 0 40px rgba(59, 130, 246, 0.2);
```

**Strong Glow (Hover, Focus)**
```css
box-shadow: 0 0 60px rgba(59, 130, 246, 0.3);
```

---

## Icons

### Icon Library

**Recommended:** Lucide React (clean, consistent, modern)
```bash
npm install lucide-react
```

**Usage:**
```typescript
import { ArrowRight, Check, X } from 'lucide-react'

<ArrowRight className="w-5 h-5" />
```

### Icon Sizes

```
xs:  w-3 h-3  (12px) - inline, small badges
sm:  w-4 h-4  (16px) - inline text, list items
md:  w-5 h-5  (20px) - buttons, nav items (default)
lg:  w-6 h-6  (24px) - section icons, large buttons
xl:  w-8 h-8  (32px) - feature icons, headers
2xl: w-12 h-12 (48px) - hero icons, large features
```

### Icon Colour

```
Primary:   text-white
Secondary: text-neutral-400
Accent:    text-accent-primary
Success:   text-success
Warning:   text-warning
Error:     text-error
```

### Icon Accessibility

- Use `aria-hidden="true"` for decorative icons
- Add `aria-label` or visible text for functional icons
- Ensure sufficient contrast when used on backgrounds

---

## Borders & Dividers

### Border Widths

```
border:   1px (default)
border-2: 2px (emphasis, buttons)
border-4: 4px (strong separation)
```

### Border Colours

```
Subtle:    border-white/10  - default card borders
Medium:    border-white/20  - hover states
Strong:    border-white/30  - active/focus states
Accent:    border-accent-primary
```

### Border Radius

```
rounded-none: 0px
rounded-sm:   0.125rem (2px)
rounded:      0.25rem (4px)
rounded-md:   0.375rem (6px)
rounded-lg:   0.5rem (8px)   - buttons, inputs
rounded-xl:   0.75rem (12px) - small cards
rounded-2xl:  1rem (16px)    - large cards (default)
rounded-3xl:  1.5rem (24px)  - hero elements
rounded-full: 9999px         - pills, avatars
```

### Dividers

**Horizontal Divider**
```html
<hr class="border-t border-white/10 my-8" />
```

**Vertical Divider (in flex layouts)**
```html
<div class="w-px h-full bg-white/10"></div>
```

---

## Accessibility

### Focus States

**Visible Focus Ring (All Interactive Elements)**
```
focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-neutral-950
```

**Contrast Requirements**
- Text on background: ≥ 4.5:1 (WCAG AA)
- Large text (18pt+): ≥ 3:1
- UI components: ≥ 3:1

### Keyboard Navigation

- All interactive elements must be reachable via Tab
- Skip-to-content link for keyboard users
- Logical tab order (follows visual order)
- Enter/Space activate buttons and links
- Escape closes modals and dropdowns

### Semantic HTML

```html
<header> - Site header
<nav>    - Navigation blocks
<main>   - Primary content
<section> - Thematic content sections
<article> - Independent content
<aside>  - Complementary content
<footer> - Site footer
```

### ARIA Landmarks

```html
<nav aria-label="Primary navigation">
<button aria-label="Open menu" aria-expanded="false">
<img alt="Descriptive alternative text">
```

### Screen Reader Support

- All images have descriptive `alt` text
- Icon-only buttons have `aria-label`
- Form inputs have associated `<label>` elements
- Headings follow hierarchical order (h1 → h2 → h3, no skips)

---

## Performance

### Image Optimisation

**Next.js Image Component**
```typescript
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Descriptive text"
  width={1200}
  height={800}
  quality={85}
  loading="lazy"
  placeholder="blur"
/>
```

**Formats:**
- WebP for modern browsers (Next.js auto-converts)
- AVIF for cutting-edge performance
- JPEG/PNG fallbacks

**Best Practices:**
- Lazy load below-fold images
- Set explicit width/height to prevent layout shift
- Use responsive image sizes (`sizes` prop)
- Compress images (aim for < 200KB per image)

### Font Loading

```typescript
// next/font/google
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})
```

**Strategies:**
- `display: swap` - show fallback immediately, swap when loaded
- Preload critical fonts
- Subset to necessary character sets

### Code Splitting

- Use dynamic imports for large components
- Split routes automatically (Next.js App Router)
- Lazy load below-fold content

```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

### Core Web Vitals Targets

```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay):        < 100ms
CLS (Cumulative Layout Shift):  < 0.1
```

---

## Responsive Design

### Mobile-First Approach

Write base styles for mobile, enhance for larger screens using `md:`, `lg:`, etc.

```html
<!-- Mobile: stacked, Desktop: side-by-side -->
<div class="flex flex-col md:flex-row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Touch Targets

**Minimum Size:** 44x44px (Apple HIG, WCAG guideline)

```html
<button class="min-w-[44px] min-h-[44px] px-6 py-3">
  Tap Me
</button>
```

### Responsive Typography

Use viewport-relative units sparingly, prefer breakpoint-based scaling:

```html
<h1 class="text-4xl md:text-5xl lg:text-6xl">
  Responsive Heading
</h1>
```

### Breakpoint Strategy

```
Mobile:       Base styles (< 768px)
Tablet:       md: (768px+)
Desktop:      lg: (1024px+)
Large Desktop: xl: (1280px+)
Extra Large:  2xl: (1536px+)
```

---

## SEO

### Meta Tags (Next.js Metadata API)

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title — Harbonline',
  description: 'Compelling meta description (150-160 characters)',
  openGraph: {
    title: 'Page Title — Harbonline',
    description: 'Description for social sharing',
    url: 'https://harbonline.com/page',
    siteName: 'Harbonline',
    images: [
      {
        url: 'https://harbonline.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title — Harbonline',
    description: 'Description for Twitter',
    images: ['https://harbonline.com/twitter-image.jpg'],
  },
}
```

### Structured Data (JSON-LD)

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Harbonline",
  "url": "https://harbonline.com",
  "logo": "https://harbonline.com/logo.png",
  "description": "Bespoke web development and applications"
}
```

### Heading Hierarchy

- One `<h1>` per page (page title)
- Logical nesting: h1 → h2 → h3 (no skips)
- Descriptive, keyword-rich headings

---

## Code Style

### Tailwind Class Order (Recommended)

```
1. Layout (display, position, float)
2. Spacing (margin, padding)
3. Sizing (width, height)
4. Typography (font, text size, colour)
5. Backgrounds & Borders
6. Effects (shadow, opacity, transforms)
7. Transitions & Animations
8. States (hover, focus, active)
9. Responsive variants (md:, lg:)
```

**Example:**
```html
<button class="flex items-center px-6 py-3 text-base font-medium text-white bg-accent-primary rounded-lg shadow-md hover:bg-accent-primary-hover hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all duration-200 md:px-8 md:py-4">
  Get Started
</button>
```

### Component Structure (TypeScript + React)

```typescript
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant]} ${sizeStyles[size]} transition-all duration-200`}
    >
      {children}
    </button>
  )
}
```

---

## Testing Checklist

### Visual Regression
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on iOS Safari, Android Chrome
- [ ] Test at 320px, 768px, 1024px, 1440px, 1920px
- [ ] Verify no horizontal scroll at any breakpoint
- [ ] Check typography rendering (font loading, spacing)

### Accessibility
- [ ] Run axe DevTools or WAVE scanner
- [ ] Test keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- [ ] Test with screen reader (NVDA, VoiceOver)
- [ ] Verify focus indicators are visible
- [ ] Check colour contrast (WebAIM Contrast Checker)
- [ ] Ensure headings follow hierarchy

### Performance
- [ ] Run Lighthouse (aim for ≥ 95 across all metrics)
- [ ] Test on 3G/4G connection
- [ ] Check Core Web Vitals (LCP, FID, CLS)
- [ ] Verify images are optimised and lazy-loaded
- [ ] Check for layout shift issues
- [ ] Verify no console errors

### SEO
- [ ] Verify unique `<title>` per page
- [ ] Check meta descriptions (150-160 characters)
- [ ] Validate Open Graph and Twitter Card tags
- [ ] Test canonical URLs
- [ ] Check structured data (JSON-LD)
- [ ] Verify sitemap.xml and robots.txt

---

**End of Style Guide**
