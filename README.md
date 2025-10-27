# Harbonline — Bespoke Web Development

A modern, high-performance website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The development server runs at [http://localhost:3005](http://localhost:3005)

## 📁 Project Structure

```
harbonline/
├── app/
│   ├── layout.tsx              # Root layout with Inter font
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles & Tailwind
│   └── services/
│       ├── page.tsx            # Services overview
│       ├── website-development/
│       │   └── page.tsx        # Website development service page
│       └── web-applications-bespoke-software/
│           └── page.tsx        # Web applications service page
├── components/
│   ├── Header.tsx              # Global header with navigation
│   ├── Footer.tsx              # Global footer
│   ├── Button.tsx              # Reusable button component
│   ├── Card.tsx                # Reusable card component
│   ├── Section.tsx             # Section wrapper component
│   └── MotionReveal.tsx        # Scroll-triggered animation wrapper
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Design System

### Colours

- **Background**: `#0A0A0A` (primary), `#1A1A1A` (secondary)
- **Text**: `#FFFFFF` (primary), `#A3A3A3` (secondary), `#737373` (tertiary)
- **Accent Primary**: `#3B82F6` (blue)
- **Accent Secondary**: `#8B5CF6` (purple)

### Typography

- **Font**: Inter (via next/font/google)
- **Headings**: Semibold/Bold, tight tracking
- **Body**: Regular, relaxed line height

### Components

All components support:
- Dark mode by default
- Glassmorphism effects
- Smooth animations with Framer Motion
- Full accessibility (keyboard nav, ARIA labels, WCAG AA contrast)
- Responsive design (mobile-first)

## 📄 Pages

### Homepage (`/`)
- Hero section with gradient background
- Capabilities grid (Performance, Accessibility, Future-Proof)
- Featured projects showcase
- Process timeline (4 steps)
- Client testimonials
- CTA band

### Services Overview (`/services`)
- Service intro
- Two service cards (Website Development, Web Applications)
- FAQ section (accordion-style)
- CTA section

### Website Development (`/services/website-development`)
- Service hero
- Problem → Solution section
- 5-step development process
- Performance & SEO highlights
- Typical outcomes list
- Example projects
- CTA

### Web Applications (`/services/web-applications-bespoke-software`)
- Service hero
- 4 common use cases
- Approach & principles (4 key areas)
- Long-term benefits
- Typical outcomes
- Example projects
- CTA

## ✨ Features

- ✅ **Next.js 16** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **Framer Motion** for animations
- ✅ **Lucide React** icons
- ✅ Fully responsive (mobile-first)
- ✅ Dark theme with glassmorphism
- ✅ SEO-optimised metadata
- ✅ Accessibility compliant (WCAG AA)
- ✅ Motion-safe animations (respects `prefers-reduced-motion`)

## 🎯 Performance Targets

- **Lighthouse Performance**: ≥ 95
- **Lighthouse Accessibility**: ≥ 95
- **Lighthouse Best Practices**: ≥ 95
- **Lighthouse SEO**: ≥ 95

## 🧭 Navigation

- **Home** — Homepage
- **Services** — Services overview
- **Contact** — Disabled (placeholder)

Service pages:
- `/services/website-development`
- `/services/web-applications-bespoke-software`

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.0
- **Language**: TypeScript 5.9+
- **Styling**: Tailwind CSS 4.1+
- **Animation**: Framer Motion 12+
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📋 Next Steps

1. **Add Images**: Replace gradient placeholder boxes with real project images
2. **Add Logo**: Create SVG gradient logo with "harbonline." text
3. **Enable Contact**: Build contact form and enable nav link
4. **Add Projects**: Create project/case study pages
5. **SEO Images**: Add Open Graph and Twitter Card images
6. **Analytics**: Configure Google Analytics or alternative
7. **Lighthouse Testing**: Run audits and optimise to 95+ scores

## 📚 Documentation

- [style_guide.md](style_guide.md) — Complete design system reference
- [what_harbonline_is.md](what_harbonline_is.md) — Brand definition
- [harbonline_master_checklist.md](harbonline_master_checklist.md) — Build checklist

## 🧪 Testing

Test the site:
1. Open [http://localhost:3005](http://localhost:3005)
2. Navigate through all pages
3. Test mobile responsiveness (Chrome DevTools)
4. Test keyboard navigation (Tab, Enter)
5. Run Lighthouse audit (Chrome DevTools → Lighthouse)

## 🎨 Brand

**Logo**: Text "harbonline." with gradient (#3B82F6 → #8B5CF6)

**Tone**: Professional, confident, modern, approachable, honest

**Style**: Dark, minimal, high-contrast, glassmorphism, subtle motion

---

Built with technical excellence and attention to detail.
