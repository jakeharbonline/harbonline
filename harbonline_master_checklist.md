# Harbonline Front-End Master Construction Checklist

## Introduction

This checklist guides the complete front-end build of the **Harbonline** website, covering four pages: Homepage, Services Overview, Website Development, and Web Applications & Bespoke Software.

**In scope:** Content, layout, design, motion, accessibility, SEO (front-end only)
**Out of scope:** Contact page, forms, APIs, email systems, hosting, back-end logic

**Target:** Lighthouse scores ≥ 95 across Performance, Accessibility, Best Practices, and SEO

---

## Phase 1 — Pre-Flight & Foundations

### Typography System
- [ ] Define primary typeface (headings) with fallbacks
- [ ] Define secondary typeface (body) with fallbacks
- [ ] Establish type scale (h1, h2, h3, h4, body, small)
- [ ] Configure font loading strategy (swap, optional, or fallback)
- [ ] Add `font-display: swap` or preload critical fonts
- [ ] Test type rendering across Chrome, Firefox, Safari, Edge
- [ ] Verify font licensing and self-hosting if required

### Colour System
- [ ] Define primary brand colour palette (min 3 shades)
- [ ] Define neutral/grey scale (min 5 shades)
- [ ] Define accent colours for CTAs and highlights
- [ ] Define success, warning, error states
- [ ] Ensure WCAG AA contrast ratios (4.5:1 text, 3:1 UI elements)
- [ ] Document colour tokens in Tailwind config or CSS variables
- [ ] Test colour consistency in light mode (dark mode out of scope)

### Spacing & Layout Grid
- [ ] Define base spacing unit (e.g. 4px, 8px)
- [ ] Establish spacing scale (xs, sm, md, lg, xl, 2xl, etc.)
- [ ] Define container max-widths and breakpoints
- [ ] Configure Tailwind breakpoints (sm, md, lg, xl, 2xl)
- [ ] Test responsive behaviour at 320px, 375px, 768px, 1024px, 1440px, 1920px

### Accessibility Baseline
- [ ] Configure semantic HTML5 structure (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`)
- [ ] Set up skip-to-content link (visually hidden, keyboard accessible)
- [ ] Ensure focus indicators meet WCAG AA (visible, 3:1 contrast)
- [ ] Test keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- [ ] Configure `lang` attribute on `<html>` tag (en-GB)
- [ ] Validate ARIA landmarks and roles are used correctly

### SEO Baseline
- [ ] Create `metadata` config in Next.js root layout
- [ ] Set site title template and default description
- [ ] Add Open Graph and Twitter Card meta tags structure
- [ ] Configure robots.txt (allow all, if no restrictions)
- [ ] Create sitemap.xml placeholder or config
- [ ] Add canonical URL structure per page
- [ ] Configure Google Analytics or placeholder (if required)

---

## Phase 2 — Global UI & Layout

### Header Component
- [ ] Build responsive header with logo and navigation
- [ ] Implement mobile menu toggle (hamburger icon)
- [ ] Add navigation links: Home, Services, About, Contact (Contact greyed/disabled)
- [ ] Add hover and focus states to nav links
- [ ] Ensure header is sticky or fixed (if designed that way)
- [ ] Add `aria-label` to mobile menu button
- [ ] Test keyboard navigation through menu items
- [ ] Add active link indicator (current page highlight)
- [ ] Verify header height doesn't obstruct content on mobile

### Footer Component
- [ ] Build footer with columns: About, Services, Legal, Social
- [ ] Add company tagline or brief description
- [ ] Add service links (mirror header links)
- [ ] Add social media icons (LinkedIn, GitHub, etc.) with `aria-label`
- [ ] Add copyright notice with current year
- [ ] Add Privacy Policy and Terms links (placeholder pages if needed)
- [ ] Ensure footer text meets contrast requirements
- [ ] Test footer responsiveness (stacked on mobile, columns on desktop)

### Section Wrapper Component
- [ ] Create reusable `<Section>` component with consistent padding
- [ ] Support background colour variants (white, light grey, brand accent)
- [ ] Add optional max-width container
- [ ] Add spacing variants (tight, normal, loose)
- [ ] Ensure semantic `<section>` tag with optional `id` for anchor links

### Button Component
- [ ] Build primary button style (filled, brand colour)
- [ ] Build secondary button style (outline or ghost)
- [ ] Build disabled button state
- [ ] Add hover, focus, and active states
- [ ] Ensure min 44x44px touch target on mobile
- [ ] Add loading/spinner state (if needed for future forms)
- [ ] Support icon + text or text-only variants
- [ ] Test keyboard activation (Enter and Space keys)

### Card Component
- [ ] Create reusable card with image, title, description slots
- [ ] Add hover effect (lift, shadow, or scale)
- [ ] Ensure card links are accessible (whole card clickable or clear CTA)
- [ ] Add focus indicator for keyboard users
- [ ] Support vertical and horizontal layouts
- [ ] Test card grid responsiveness (1 col mobile, 2-3 cols desktop)

### MotionReveal Component
- [ ] Build Framer Motion wrapper for scroll-triggered animations
- [ ] Configure fade-in and slide-up variants
- [ ] Set sensible animation duration (300-500ms)
- [ ] Respect `prefers-reduced-motion` media query (disable animations)
- [ ] Test performance (avoid layout thrashing or jank)
- [ ] Apply sparingly to hero, section headings, and key content blocks

### Global Meta & Favicons
- [ ] Add favicon.ico and apple-touch-icon.png
- [ ] Add favicon sizes (16x16, 32x32, 192x192, 512x512)
- [ ] Configure manifest.json or app metadata
- [ ] Set theme-colour meta tag
- [ ] Test favicons on desktop and mobile browsers

---

## Phase 3 — Homepage

### Hero Section
- [ ] Build full-width hero with headline, subheadline, and CTA
- [ ] Add hero background (solid colour, gradient, or image with overlay)
- [ ] Ensure headline is `<h1>` and unique to page
- [ ] Add primary CTA button ("Get Started", "View Services", etc.)
- [ ] Add optional secondary CTA or scroll indicator
- [ ] Apply MotionReveal animation to headline and CTA
- [ ] Test hero height on mobile and desktop (min-height 60vh or full viewport)
- [ ] Ensure CTA stands out with strong contrast
- [ ] Verify text is readable over background (contrast ≥ 4.5:1)

### Capabilities Section
- [ ] Build section showcasing 3-4 core capabilities
- [ ] Use grid or flex layout (responsive: 1 col mobile, 2-3 cols desktop)
- [ ] Add icon or visual for each capability
- [ ] Add heading and short description per capability
- [ ] Apply MotionReveal to capability cards
- [ ] Ensure icons have `aria-hidden="true"` or descriptive alt text
- [ ] Test spacing and alignment across breakpoints

### Featured Projects Section
- [ ] Build section with 2-3 featured case studies or projects
- [ ] Use Card component for each project
- [ ] Include project image, title, short description, and link
- [ ] Add "View All Projects" CTA (if project archive exists)
- [ ] Apply MotionReveal to project cards
- [ ] Ensure card links are keyboard accessible and have focus indicators
- [ ] Test image loading performance (lazy load, optimised formats)
- [ ] Add `alt` text to project images

### Process Section
- [ ] Build section outlining 3-5 step process (Discovery, Design, Build, Launch, etc.)
- [ ] Use numbered steps or timeline visual
- [ ] Add heading and brief description per step
- [ ] Apply MotionReveal with staggered delay per step
- [ ] Ensure headings follow hierarchy (`<h2>` for section, `<h3>` for steps)
- [ ] Test readability and spacing on mobile

### Proof / Testimonials Section
- [ ] Build section with 2-3 client testimonials or trust signals
- [ ] Include client name, role, company (if permitted)
- [ ] Add optional client logo or photo
- [ ] Use blockquote or card layout
- [ ] Apply MotionReveal to testimonials
- [ ] Ensure text is legible and not too long (2-4 sentences)
- [ ] Test quote styling (quotation marks, italics, etc.)

### CTA Band
- [ ] Build full-width CTA section near page end
- [ ] Add compelling headline and supporting text
- [ ] Add primary CTA button ("Start a Project", "Get in Touch", etc.)
- [ ] Use contrasting background colour to stand out
- [ ] Apply MotionReveal to headline and button
- [ ] Ensure CTA button meets min touch target size
- [ ] Test CTA visibility and urgency

### Homepage SEO & Accessibility
- [ ] Set unique `<title>` tag (e.g. "Harbonline — Bespoke Web Development & Applications")
- [ ] Set unique meta description (150-160 characters)
- [ ] Add Open Graph title, description, and image
- [ ] Add Twitter Card meta tags
- [ ] Set canonical URL to homepage
- [ ] Ensure `<h1>` is unique and descriptive
- [ ] Verify heading hierarchy (`<h1>` → `<h2>` → `<h3>`, no skips)
- [ ] Add descriptive `alt` text to all images
- [ ] Test page with screen reader (NVDA or VoiceOver)
- [ ] Run axe DevTools or WAVE accessibility checker
- [ ] Verify all interactive elements are keyboard accessible
- [ ] Test colour contrast for all text and UI elements

### Homepage Performance
- [ ] Optimise images (WebP or AVIF, lazy load below fold)
- [ ] Minimise layout shift (set width/height on images and embeds)
- [ ] Defer non-critical JavaScript
- [ ] Inline critical CSS or use Next.js font optimisation
- [ ] Test Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Run Lighthouse and aim for ≥ 95 Performance score

---

## Phase 4 — Services Overview

### Intro Section
- [ ] Build hero or intro section with page title and description
- [ ] Ensure `<h1>` is "Our Services" or similar
- [ ] Add supporting paragraph explaining Harbonline's service philosophy
- [ ] Apply MotionReveal to heading and intro text
- [ ] Test readability and spacing on mobile

### Two-Column Layout
- [ ] Build responsive two-column layout (stacked on mobile, side-by-side on desktop)
- [ ] Left column: Service summary or key benefits
- [ ] Right column: Service categories or navigation
- [ ] Ensure semantic HTML (`<aside>` or `<div>` with appropriate roles)
- [ ] Test column balance and spacing across breakpoints

### Service Cards
- [ ] Create card for "Website Development" service
  - [ ] Add icon or image
  - [ ] Add service title (h2 or h3)
  - [ ] Add short description (2-3 sentences)
  - [ ] Add "Learn More" link to `/services/website-development`
- [ ] Create card for "Web Applications & Bespoke Software" service
  - [ ] Add icon or image
  - [ ] Add service title
  - [ ] Add short description
  - [ ] Add "Learn More" link to `/services/web-applications-bespoke-software`
- [ ] Apply MotionReveal to service cards
- [ ] Ensure cards are keyboard accessible and have focus indicators
- [ ] Test card hover states and visual consistency

### FAQ Section
- [ ] Build FAQ section with 4-6 common questions
- [ ] Use accordion or expandable pattern for answers
- [ ] Ensure accordion is keyboard accessible (Enter to toggle, Tab to navigate)
- [ ] Add `aria-expanded` and `aria-controls` attributes
- [ ] Apply MotionReveal to FAQ heading
- [ ] Test FAQ usability on mobile (tap targets, readability)
- [ ] Ensure FAQ answers are concise and helpful

### CTA Section
- [ ] Build CTA section encouraging users to get in touch or learn more
- [ ] Add headline and supporting text
- [ ] Add primary CTA button
- [ ] Use contrasting background colour
- [ ] Apply MotionReveal to CTA
- [ ] Test CTA button accessibility and touch target size

### Services Overview SEO & Accessibility
- [ ] Set unique `<title>` tag (e.g. "Services — Harbonline")
- [ ] Set unique meta description
- [ ] Add Open Graph and Twitter Card meta tags
- [ ] Set canonical URL to `/services`
- [ ] Ensure `<h1>` is unique and descriptive
- [ ] Verify heading hierarchy (no skips)
- [ ] Add `alt` text to service card icons/images
- [ ] Test page with screen reader
- [ ] Run axe DevTools or WAVE checker
- [ ] Verify all links and buttons are keyboard accessible
- [ ] Test colour contrast across all sections

### Services Overview Performance
- [ ] Optimise service card images (WebP/AVIF, lazy load)
- [ ] Minimise layout shift
- [ ] Test Core Web Vitals
- [ ] Run Lighthouse and aim for ≥ 95 Performance score

---

## Phase 5 — Website Development Page

### Hero Section
- [ ] Build hero with page title: "Website Development"
- [ ] Ensure `<h1>` is "Website Development" or similar
- [ ] Add supporting subheadline (1-2 sentences)
- [ ] Add primary CTA ("Start Your Project", "Get in Touch", etc.)
- [ ] Apply MotionReveal to heading and CTA
- [ ] Test hero layout and spacing on mobile and desktop

### Problem → Solution Section
- [ ] Build section outlining common client challenges
- [ ] Add 3-4 problem statements (slow sites, poor UX, outdated tech, etc.)
- [ ] Follow with Harbonline's solution approach
- [ ] Use two-column layout or alternating blocks
- [ ] Apply MotionReveal to problem and solution blocks
- [ ] Ensure headings follow hierarchy (`<h2>` for section, `<h3>` for problems)
- [ ] Test readability and visual flow

### Process Section
- [ ] Build section detailing website development process
- [ ] Outline 4-5 steps (Discovery, Design, Build, Test, Launch)
- [ ] Add short description per step
- [ ] Use numbered list, timeline, or step cards
- [ ] Apply MotionReveal with staggered delay
- [ ] Ensure semantic HTML (`<ol>` for ordered steps if appropriate)
- [ ] Test spacing and alignment on mobile

### Performance & SEO Section
- [ ] Build section highlighting Harbonline's focus on speed and SEO
- [ ] Add key metrics or benefits (Lighthouse 95+, fast load times, mobile-first, etc.)
- [ ] Include visual indicators (badges, icons, or graphs if appropriate)
- [ ] Apply MotionReveal to section
- [ ] Test visual impact and clarity

### Outcomes Section
- [ ] Build section showcasing typical client outcomes
- [ ] Add 3-4 outcome statements (increased traffic, better conversions, improved UX, etc.)
- [ ] Use grid or card layout
- [ ] Apply MotionReveal to outcome cards
- [ ] Test spacing and readability

### Related Work Section
- [ ] Build section with 2-3 example projects (if available)
- [ ] Use Card component for each example
- [ ] Include project image, title, short description, and link
- [ ] Apply MotionReveal to project cards
- [ ] Ensure card links are accessible
- [ ] Add `alt` text to project images

### CTA Section
- [ ] Build CTA section encouraging next steps
- [ ] Add headline and supporting text
- [ ] Add primary CTA button
- [ ] Use contrasting background
- [ ] Apply MotionReveal
- [ ] Test CTA accessibility and touch target size

### Website Development SEO & Accessibility
- [ ] Set unique `<title>` tag (e.g. "Website Development Services — Harbonline")
- [ ] Set unique meta description
- [ ] Add Open Graph and Twitter Card meta tags
- [ ] Set canonical URL to `/services/website-development`
- [ ] Ensure `<h1>` is unique and descriptive
- [ ] Verify heading hierarchy
- [ ] Add `alt` text to all images
- [ ] Test page with screen reader
- [ ] Run axe DevTools or WAVE checker
- [ ] Verify all interactive elements are keyboard accessible
- [ ] Test colour contrast

### Website Development Performance
- [ ] Optimise images (WebP/AVIF, lazy load)
- [ ] Minimise layout shift
- [ ] Test Core Web Vitals
- [ ] Run Lighthouse and aim for ≥ 95 Performance score

---

## Phase 6 — Web Applications & Bespoke Software Page

### Hero Section
- [ ] Build hero with page title: "Web Applications & Bespoke Software"
- [ ] Ensure `<h1>` is "Web Applications & Bespoke Software" or similar
- [ ] Add supporting subheadline
- [ ] Add primary CTA
- [ ] Apply MotionReveal to heading and CTA
- [ ] Test hero layout and spacing

### Use Cases Section
- [ ] Build section outlining 3-5 common use cases
- [ ] Examples: internal tools, client portals, SaaS products, data dashboards, etc.
- [ ] Add icon or visual per use case
- [ ] Add heading and description per use case
- [ ] Apply MotionReveal to use case cards
- [ ] Ensure headings follow hierarchy
- [ ] Test grid layout and spacing

### Approach & Scalability Section
- [ ] Build section explaining Harbonline's approach to bespoke software
- [ ] Highlight scalability, maintainability, and future-proofing
- [ ] Add 3-4 key principles (modular code, testing, documentation, performance, etc.)
- [ ] Use two-column layout or icon + text blocks
- [ ] Apply MotionReveal
- [ ] Test readability and visual balance

### Outcomes Section
- [ ] Build section showcasing typical client outcomes
- [ ] Add 3-4 outcome statements (time saved, automation, better insights, etc.)
- [ ] Use grid or card layout
- [ ] Apply MotionReveal
- [ ] Test spacing and readability

### Related Work Section
- [ ] Build section with 2-3 example projects (if available)
- [ ] Use Card component
- [ ] Include project image, title, description, and link
- [ ] Apply MotionReveal
- [ ] Ensure accessibility of card links
- [ ] Add `alt` text to images

### CTA Section
- [ ] Build CTA section
- [ ] Add headline and supporting text
- [ ] Add primary CTA button
- [ ] Use contrasting background
- [ ] Apply MotionReveal
- [ ] Test CTA accessibility and touch target size

### Web Applications SEO & Accessibility
- [ ] Set unique `<title>` tag (e.g. "Web Applications & Bespoke Software — Harbonline")
- [ ] Set unique meta description
- [ ] Add Open Graph and Twitter Card meta tags
- [ ] Set canonical URL to `/services/web-applications-bespoke-software`
- [ ] Ensure `<h1>` is unique and descriptive
- [ ] Verify heading hierarchy
- [ ] Add `alt` text to all images
- [ ] Test page with screen reader
- [ ] Run axe DevTools or WAVE checker
- [ ] Verify all interactive elements are keyboard accessible
- [ ] Test colour contrast

### Web Applications Performance
- [ ] Optimise images (WebP/AVIF, lazy load)
- [ ] Minimise layout shift
- [ ] Test Core Web Vitals
- [ ] Run Lighthouse and aim for ≥ 95 Performance score

---

## Phase 7 — Cross-Page SEO / Accessibility / Performance Pass

### SEO Cross-Check
- [ ] Verify each page has unique `<title>` tag
- [ ] Verify each page has unique meta description (150-160 chars)
- [ ] Verify Open Graph tags are present and unique per page
- [ ] Verify Twitter Card tags are present and unique per page
- [ ] Verify canonical URLs are set correctly per page
- [ ] Check internal linking structure (header, footer, in-content links)
- [ ] Ensure no broken links (404s)
- [ ] Verify sitemap.xml includes all four pages
- [ ] Test structured data if applicable (JSON-LD for Organization, etc.)

### Accessibility Cross-Check
- [ ] Verify all pages have unique `<h1>` tags
- [ ] Verify heading hierarchy on all pages (no skips)
- [ ] Verify all images have descriptive `alt` text
- [ ] Verify all interactive elements have visible focus indicators
- [ ] Verify keyboard navigation works across all pages
- [ ] Verify skip-to-content link is present and functional
- [ ] Test all pages with screen reader (NVDA or VoiceOver)
- [ ] Run axe DevTools on all pages and fix violations
- [ ] Verify colour contrast meets WCAG AA on all pages
- [ ] Verify `lang` attribute is set to "en-GB" on all pages

### Performance Cross-Check
- [ ] Verify all images are optimised (WebP/AVIF, appropriate sizes)
- [ ] Verify lazy loading is applied to below-fold images
- [ ] Verify font loading strategy is consistent (swap or preload)
- [ ] Verify no layout shift issues (CLS < 0.1)
- [ ] Test Core Web Vitals on all pages (LCP, FID, CLS)
- [ ] Run Lighthouse on all pages and aim for ≥ 95 across all metrics
- [ ] Verify no console errors or warnings on any page
- [ ] Test page load speed on 3G/4G and desktop connections

### Motion & Animation Cross-Check
- [ ] Verify MotionReveal animations respect `prefers-reduced-motion`
- [ ] Test animations are smooth and don't cause jank
- [ ] Ensure animation durations are sensible (300-500ms)
- [ ] Verify animations enhance UX and don't distract

---

## Phase 8 — Content Polish & Consistency

### Copy Proofing
- [ ] Proofread all page content for spelling and grammar (British English)
- [ ] Verify tone is professional, clear, and client-focused
- [ ] Check for consistency in terminology (e.g. "web applications" vs "web apps")
- [ ] Ensure CTAs are compelling and clear
- [ ] Remove placeholder text or lorem ipsum
- [ ] Verify all links have descriptive anchor text (avoid "click here")

### Visual Consistency
- [ ] Verify typography is consistent across all pages
- [ ] Verify colour usage is consistent
- [ ] Verify spacing rhythm is consistent (section padding, margins)
- [ ] Verify button styles are consistent
- [ ] Verify card styles are consistent
- [ ] Verify icon styles and sizes are consistent
- [ ] Test visual hierarchy on all pages (headlines stand out, body is readable)

### Interaction Consistency
- [ ] Verify hover states are consistent across buttons and links
- [ ] Verify focus states are consistent and visible
- [ ] Verify active states are consistent
- [ ] Verify card interactions are consistent (whole card clickable or clear CTA)
- [ ] Test mobile touch interactions (tap targets ≥ 44x44px)

### Responsive Consistency
- [ ] Test all pages at 320px width (smallest mobile)
- [ ] Test all pages at 375px width (iPhone SE, etc.)
- [ ] Test all pages at 768px width (tablet portrait)
- [ ] Test all pages at 1024px width (tablet landscape / small desktop)
- [ ] Test all pages at 1440px width (standard desktop)
- [ ] Test all pages at 1920px width (large desktop)
- [ ] Verify no horizontal scroll at any breakpoint
- [ ] Verify content reflows gracefully at all breakpoints

---

## Phase 9 — Final Review

### Visual QA
- [ ] Review all pages for visual consistency and polish
- [ ] Verify no misaligned elements or broken layouts
- [ ] Verify images load correctly and are not stretched or distorted
- [ ] Verify typography renders correctly across browsers
- [ ] Verify colours match design system
- [ ] Verify spacing is consistent and balanced

### Functional QA
- [ ] Test all navigation links across all pages
- [ ] Test all CTA buttons and links
- [ ] Test mobile menu toggle and navigation
- [ ] Test accordion/FAQ interactions (if applicable)
- [ ] Test keyboard navigation across all pages
- [ ] Verify no JavaScript errors in console (all pages)
- [ ] Verify no 404 or broken links

### Browser Testing
- [ ] Test on Chrome (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Edge (latest)
- [ ] Test on mobile Safari (iOS)
- [ ] Test on mobile Chrome (Android)

### Lighthouse Final Pass
- [ ] Run Lighthouse on Homepage and achieve ≥ 95 across all categories
- [ ] Run Lighthouse on Services Overview and achieve ≥ 95
- [ ] Run Lighthouse on Website Development page and achieve ≥ 95
- [ ] Run Lighthouse on Web Applications page and achieve ≥ 95
- [ ] Address any Lighthouse warnings or opportunities
- [ ] Document any scores below 95 and justify or fix

### Final Checklist
- [ ] All pages are complete and functional
- [ ] All content is proofread and polished
- [ ] All images have `alt` text
- [ ] All interactive elements are keyboard accessible
- [ ] All pages meet accessibility standards (WCAG AA)
- [ ] All pages meet performance standards (Lighthouse ≥ 95)
- [ ] All pages meet SEO standards (unique titles, meta, canonical)
- [ ] No console errors or warnings
- [ ] No broken links or 404s
- [ ] Visual design is consistent and polished
- [ ] Project is ready for client review

---

## Per-Page Definition of Done

### Homepage Definition of Done
- [ ] Hero section is complete with headline, subheadline, and CTA
- [ ] Capabilities section displays 3-4 core capabilities
- [ ] Featured Projects section displays 2-3 projects
- [ ] Process section outlines 3-5 steps
- [ ] Testimonials section displays 2-3 testimonials
- [ ] CTA band is prominent and compelling
- [ ] Unique `<title>` and meta description are set
- [ ] Open Graph and Twitter Card tags are set
- [ ] Heading hierarchy is valid (`<h1>` → `<h2>` → `<h3>`)
- [ ] All images have `alt` text
- [ ] All interactive elements are keyboard accessible
- [ ] Colour contrast meets WCAG AA
- [ ] Page passes screen reader test
- [ ] Page passes axe DevTools or WAVE
- [ ] Lighthouse score ≥ 95 across all categories
- [ ] No console errors
- [ ] Visual design is polished and consistent

### Services Overview Definition of Done
- [ ] Intro section is complete with title and description
- [ ] Two-column layout is responsive and balanced
- [ ] Service cards for both services are complete
- [ ] FAQ section is functional and accessible
- [ ] CTA section is prominent
- [ ] Unique `<title>` and meta description are set
- [ ] Open Graph and Twitter Card tags are set
- [ ] Heading hierarchy is valid
- [ ] All images have `alt` text
- [ ] All interactive elements are keyboard accessible
- [ ] Colour contrast meets WCAG AA
- [ ] Page passes screen reader test
- [ ] Page passes axe DevTools or WAVE
- [ ] Lighthouse score ≥ 95 across all categories
- [ ] No console errors
- [ ] Visual design is polished and consistent

### Website Development Page Definition of Done
- [ ] Hero section is complete
- [ ] Problem → Solution section is clear and compelling
- [ ] Process section outlines development steps
- [ ] Performance & SEO section highlights key benefits
- [ ] Outcomes section showcases client results
- [ ] Related Work section displays example projects
- [ ] CTA section is prominent
- [ ] Unique `<title>` and meta description are set
- [ ] Open Graph and Twitter Card tags are set
- [ ] Heading hierarchy is valid
- [ ] All images have `alt` text
- [ ] All interactive elements are keyboard accessible
- [ ] Colour contrast meets WCAG AA
- [ ] Page passes screen reader test
- [ ] Page passes axe DevTools or WAVE
- [ ] Lighthouse score ≥ 95 across all categories
- [ ] No console errors
- [ ] Visual design is polished and consistent

### Web Applications & Bespoke Software Page Definition of Done
- [ ] Hero section is complete
- [ ] Use Cases section displays 3-5 use cases
- [ ] Approach & Scalability section explains methodology
- [ ] Outcomes section showcases client results
- [ ] Related Work section displays example projects
- [ ] CTA section is prominent
- [ ] Unique `<title>` and meta description are set
- [ ] Open Graph and Twitter Card tags are set
- [ ] Heading hierarchy is valid
- [ ] All images have `alt` text
- [ ] All interactive elements are keyboard accessible
- [ ] Colour contrast meets WCAG AA
- [ ] Page passes screen reader test
- [ ] Page passes axe DevTools or WAVE
- [ ] Lighthouse score ≥ 95 across all categories
- [ ] No console errors
- [ ] Visual design is polished and consistent

---

## Acceptance Criteria

### Scope Confirmation
- [ ] Homepage is complete and matches requirements
- [ ] Services Overview page is complete and matches requirements
- [ ] Website Development page is complete and matches requirements
- [ ] Web Applications & Bespoke Software page is complete and matches requirements
- [ ] Contact page, forms, APIs, and back-end are explicitly out of scope

### Quality Standards
- [ ] All pages achieve Lighthouse scores ≥ 95 (Performance, Accessibility, Best Practices, SEO)
- [ ] All pages meet WCAG AA accessibility standards
- [ ] All pages are fully keyboard navigable
- [ ] All pages have unique, descriptive titles and meta descriptions
- [ ] All pages have valid heading hierarchy
- [ ] All images have descriptive `alt` text
- [ ] All interactive elements have visible focus indicators
- [ ] All pages are responsive and tested across breakpoints
- [ ] All pages are tested across Chrome, Firefox, Safari, Edge
- [ ] All content is proofread and uses British English
- [ ] All links are functional and point to correct destinations
- [ ] No console errors or warnings on any page
- [ ] Motion animations respect `prefers-reduced-motion`

### Deliverables
- [ ] Four complete front-end pages (/, /services, /services/website-development, /services/web-applications-bespoke-software)
- [ ] Global components: Header, Footer, Section, Button, Card, MotionReveal
- [ ] Consistent design system: typography, colours, spacing, interactions
- [ ] SEO foundations: titles, meta, Open Graph, canonical URLs, sitemap
- [ ] Accessibility foundations: semantic HTML, ARIA, keyboard navigation, screen reader support
- [ ] Performance optimisations: image optimisation, lazy loading, font strategy, Core Web Vitals
- [ ] Documentation of any deviations from checklist or known issues

---

**End of Checklist**
