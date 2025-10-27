# Harbonline - Complete Reference

**Website:** https://harbonline.co.uk
**Owner:** Jake
**Email:** jake@harbonline.co.uk
**Location:** West Sussex, UK

---

## What is Harbonline?

Harbonline is a freelance web development business providing professional web design, development, and SEO services to businesses throughout West Sussex and the UK.

### Services Offered:
1. **Web Design** - Modern, professional designs that convert visitors
2. **Web Development** - Fast, reliable websites built with modern technology
3. **E-Commerce** - Secure online stores and payment processing
4. **Custom Software** - Bespoke web applications (booking systems, portals, dashboards)
5. **SEO** - Local and national search engine optimization
6. **Website Maintenance** - Ongoing support, updates, and monitoring

### Target Market:
- **Primary:** Small to medium businesses in West Sussex (Chichester, Bognor Regis, Littlehampton, Worthing, Brighton)
- **Secondary:** UK-wide businesses needing professional web solutions
- **Focus:** Businesses needing professional websites, online stores, or custom software solutions

---

## Technology Stack

### Frontend:
- **Framework:** Next.js 16.0.0 (App Router with Turbopack)
- **UI Library:** React 19.2.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4.1
- **Animation:** Framer Motion 11.15.0
- **Icons:** Lucide React 0.468.0

### Backend/Services:
- **Email:** Resend with React Email templates
- **Authentication:** Firebase Authentication
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4 (configured)
- **Search Console:** Google Search Console (configured)

### Development:
- **Package Manager:** pnpm
- **Build System:** Turbopack
- **Linting:** ESLint with TypeScript
- **Version Control:** Git + GitHub

---

## Site Structure

### Public Pages:
- **/** - Homepage with hero, services, custom software examples
- **/about** - About page (to be completed)
- **/contact** - Contact page with callback form
- **/quote** - Multi-step quote request form
- **/services** - Services overview page
- **/services/web-design** - Web design service details + FAQ
- **/services/web-development** - Web development service details + FAQ
- **/services/ecommerce** - E-commerce service details + FAQ
- **/services/seo** - SEO service details + FAQ
- **/services/web-applications** - Custom software details + FAQ
- **/services/maintenance** - Maintenance service details + FAQ
- **/services/website-development** - Business websites details + FAQ

### Location Pages (Local SEO):
- **/locations** - Hub page for all locations
- **/locations/chichester** - Chichester-specific landing page
- **/locations/brighton** - Brighton-specific landing page
- **/locations/bognor-regis** - Bognor Regis-specific landing page
- **/locations/littlehampton** - Littlehampton-specific landing page
- **/locations/worthing** - Worthing-specific landing page

### Blog:
- **/blog** - Blog listing page
- **/blog/why-west-sussex-businesses-need-modern-websites** - Blog post 1
- **/blog/seo-checklist-for-local-businesses** - Blog post 2
- **/blog/choosing-web-designer-chichester** - Blog post 3

### Examples:
- **/examples/booking-systems**
- **/examples/calculators**
- **/examples/client-portals**
- **/examples/dashboards**
- **/examples/inventory-management**
- **/examples/forms-workflows**

### Admin Panel (Protected):
- **/admin** - Dashboard
- **/admin/login** - Firebase authentication login
- **/admin/quotes** - Manage quote requests
- **/admin/callbacks** - Manage callback requests
- **/admin/projects** - Manage portfolio projects (ready for when needed)
- **/admin/reviews** - Manage testimonials (ready for when needed)
- **/admin/settings** - Site configuration

---

## Key Features Implemented

### SEO & Marketing:
✅ **Comprehensive SEO Package**
- JSON-LD structured data (LocalBusiness, Organization, Service, FAQ, Breadcrumb schemas)
- Optimized robots.txt
- XML sitemap with 28+ pages
- Meta tags and Open Graph data on all pages
- Mobile-friendly and fast (Core Web Vitals optimized)
- Local SEO for 5 cities in West Sussex

✅ **Content Marketing**
- 3 in-depth blog posts (7,000+ words total)
- 35+ FAQs ready to add to service pages
- Location-specific landing pages
- Internal linking structure

### User Experience:
✅ **Forms & Lead Generation**
- Multi-step quote form with validation
- Callback request form
- Contact form
- All forms send confirmation emails to customers
- Admin notifications for all form submissions

✅ **Email System**
- Professional branded email templates
- Customer confirmations (quote, contact, callback)
- Admin notifications
- Sent from: Jake from Harbonline <jake@harbonline.co.uk>

✅ **Navigation & UX**
- Smooth scroll-to-section buttons
- Services dropdown menu with 300ms hover delay
- Mobile-responsive navigation
- Footer with location links
- Breadcrumb navigation

### Admin Features:
✅ **Authentication**
- Firebase Authentication with persistent sessions
- Protected admin routes
- Login page with email/password

✅ **Content Management**
- Quote request management
- Callback request management
- Project portfolio system (ready to use)
- Review/testimonial system (ready to use)

---

## Important Files & Structure

### Configuration:
- `/lib/config.ts` - Central configuration (Firebase, Resend, analytics, etc.)
- `/lib/env.ts` - Environment variable validation
- `/.env.local` - Local environment variables
- `/app/sitemap.ts` - XML sitemap generation

### Key Components:
- `/components/Header.tsx` - Main navigation with services dropdown
- `/components/Footer.tsx` - Footer with services, locations, legal links
- `/components/StructuredData.tsx` - All JSON-LD schema components
- `/components/FAQ.tsx` - FAQ accordion with schema markup
- `/components/LocationPageTemplate.tsx` - Reusable location page template

### Data Files:
- `/lib/location-data.ts` - All 5 location details
- `/lib/faq-data.ts` - 35+ FAQs for service pages
- `/lib/blog-data.ts` - Blog post data and structure
- `/lib/mock-quotes.ts` - Quote request interface and CRUD
- `/lib/mock-callbacks.ts` - Callback request interface and CRUD
- `/lib/mock-projects.ts` - Project portfolio (ready for use)
- `/lib/mock-reviews.ts` - Reviews/testimonials (ready for use)

### Email Templates:
- `/lib/email-templates.tsx` - All customer and admin email templates
- `/lib/resend.ts` - Resend email service configuration
- `/app/api/send-quote-confirmation/route.tsx` - Quote email API
- `/app/api/send-contact-confirmation/route.tsx` - Contact email API
- `/app/api/send-callback-confirmation/route.tsx` - Callback email API

---

## Environment Variables

Required in `.env.local` and Vercel:

```env
# App Environment
APP_ENV=production

# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Google Search Console
NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION=

# Resend Email API
RESEND_API_KEY=
```

---

## Budget Ranges (Quote Form)

- Under £1,000
- £1,000 - £2,000
- £2,000 - £5,000
- £5,000 - £10,000
- £10,000 - £25,000
- Over £25,000
- Not sure yet

---

## Brand Colors

- **Primary Purple:** `#6A00FF` (accent-primary)
- **Secondary Purple:** `#9D4EDD` (accent-secondary)
- **Gradient:** `linear-gradient(135deg, #6A00FF 0%, #9D4EDD 100%)`
- **Success Green:** For checkmarks and confirmations
- **Background:** Dark theme with `bg-bg-primary`, `bg-bg-secondary`, `bg-bg-tertiary`
- **Text:** `text-text-primary`, `text-text-secondary`, `text-text-tertiary`

---

## Deployment

### Production:
- **Platform:** Vercel
- **URL:** https://harbonline.co.uk
- **Custom Domain:** Configured with harbonline.co.uk
- **Auto-deploy:** Pushes to `main` branch auto-deploy

### Build Command:
```bash
pnpm build
```

### Dev Server:
```bash
pnpm dev
```

---

## What's NOT Included (Removed)

- ❌ Projects/Work section on homepage (no projects yet)
- ❌ Reviews/Testimonials section (no reviews yet)
- ❌ "Work" link in navigation
- ❌ `/projects` page from sitemap

**Note:** Admin panels for projects and reviews still exist and work - just hidden from frontend until content is available.

---

## Future Additions (When Ready)

1. **Portfolio Projects**
   - Add real project case studies via `/admin/projects`
   - Re-add "Work" section to homepage
   - Re-add navigation link

2. **Client Reviews**
   - Collect testimonials from satisfied clients
   - Add via `/admin/reviews`
   - Re-enable ReviewsCarousel on homepage

3. **Blog Expansion**
   - Add more blog posts monthly
   - Topics: web design tips, local business guides, technical tutorials
   - Update blog-data.ts with new posts

4. **About Page**
   - Complete the about page with bio, experience, values
   - Add photo(s) and credentials

5. **Social Media**
   - Add social media profiles when created
   - Update footer links and structured data

---

## SEO Performance Targets

### Technical SEO:
- ✅ Page load time: < 2 seconds
- ✅ Mobile-friendly: Yes
- ✅ HTTPS: Yes
- ✅ Structured data: Comprehensive
- ✅ Sitemap: Submitted to Google Search Console

### Expected Results:
- **2-4 weeks:** Rich snippets appearing, pages indexed
- **2-3 months:** 30-50% increase in organic traffic, better local rankings
- **4-6 months:** Top 3 rankings for local terms, featured snippets

### Target Keywords:
- web designer Chichester
- web developer Brighton
- website design Bognor Regis
- web development West Sussex
- e-commerce developer Chichester
- SEO services West Sussex
- custom software Brighton
- [+ 100+ long-tail variations]

---

## Support & Maintenance

### Regular Tasks:
- Monitor Google Search Console for indexing issues
- Review Analytics data monthly
- Update blog with new content (1-2 posts/month recommended)
- Respond to quote/callback/contact requests via admin panel
- Keep dependencies updated (`pnpm update`)

### Backups:
- Code: GitHub repository
- Database: Firebase (auto-backed up)
- Content: Stored in code (version controlled)

---

## Contact & Access

**Owner:** Jake
**Email:** jake@harbonline.co.uk
**Admin Login:** https://harbonline.co.uk/admin/login
**GitHub:** Private repository
**Vercel:** Connected to GitHub for auto-deployment

---

## Quick Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Production build
pnpm start                  # Start production server
pnpm lint                   # Run ESLint

# Deployment
git add .
git commit -m "message"
git push                    # Auto-deploys to Vercel
```

---

## Last Updated

**Date:** January 2025
**Status:** ✅ Fully built and deployed
**Version:** 1.0 - Production ready

---

*This is the complete reference for the Harbonline website. Everything you need to know about the site, its features, and how to manage it is documented here.*
