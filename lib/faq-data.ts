/**
 * FAQ data for service pages
 * Optimized for SEO and featured snippets
 */

interface FAQItem {
  question: string;
  answer: string;
}

export const webDesignFAQs: FAQItem[] = [
  {
    question: 'How much does web design cost?',
    answer: 'Web design costs vary based on your needs. A basic brochure website typically starts from £800-£1,500, while more complex sites with custom features range from £2,000-£5,000+. I provide transparent, fixed-price quotes with no hidden fees.',
  },
  {
    question: 'How long does it take to design a website?',
    answer: 'Most websites take 2-4 weeks from start to finish. This includes initial consultation, design mockups, revisions, development, and launch. Rush projects can be accommodated for an additional fee.',
  },
  {
    question: 'Will my website work on mobile devices?',
    answer: 'Yes, all websites I design are fully responsive and mobile-friendly. With over 60% of web traffic coming from mobile devices, responsive design is standard on every project.',
  },
  {
    question: 'Can I update the website myself after it\'s built?',
    answer: 'Yes, I build websites with easy-to-use content management systems (CMS) that allow you to update text, images, and pages yourself. I also provide training and documentation to help you get started.',
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes, I offer ongoing maintenance and support packages that include updates, backups, security monitoring, and priority support. You can also contact me for one-off updates as needed.',
  },
];

export const webDevelopmentFAQs: FAQItem[] = [
  {
    question: 'What technologies do you use for web development?',
    answer: 'I use modern, proven technologies including Next.js, React, TypeScript, and Node.js. These provide fast performance, excellent SEO, and easy maintenance. I choose the best technology stack for each project based on your specific needs.',
  },
  {
    question: 'How do you ensure my website is fast and secure?',
    answer: 'I follow best practices including code optimization, image compression, CDN delivery, HTTPS encryption, regular security updates, and performance monitoring. Every website is tested for speed and security before launch.',
  },
  {
    question: 'Can you integrate with my existing systems?',
    answer: 'Yes, I can integrate your website with CRM systems, payment processors, email marketing platforms, booking systems, and other third-party services through APIs and custom integrations.',
  },
  {
    question: 'Do you build custom web applications?',
    answer: 'Yes, I build custom web applications including booking systems, client portals, dashboards, calculators, and workflow tools. If you have a specific business need, I can build a solution for it.',
  },
  {
    question: 'What happens if something breaks after launch?',
    answer: 'All projects include a 30-day warranty period where I fix any bugs or issues at no charge. After that, I offer maintenance packages or hourly support for updates and fixes.',
  },
];

export const ecommerceFAQs: FAQItem[] = [
  {
    question: 'How much does an e-commerce website cost?',
    answer: 'E-commerce websites typically start from £2,500 for a basic online store with essential features. More complex stores with custom functionality, multiple payment options, and advanced features range from £4,000-£10,000+. The final cost depends on the number of products, required features, and integrations.',
  },
  {
    question: 'Which e-commerce platform do you recommend?',
    answer: 'It depends on your needs. Shopify is great for quick setup and ease of use. WooCommerce offers more flexibility and lower ongoing costs. For complex requirements, I build custom solutions. I\'ll recommend the best platform based on your products, budget, and growth plans.',
  },
  {
    question: 'Can customers pay with credit cards and PayPal?',
    answer: 'Yes, I integrate secure payment processors like Stripe, PayPal, and others that accept all major credit cards, debit cards, and digital wallets. All transactions are encrypted and PCI compliant.',
  },
  {
    question: 'How do I manage inventory and orders?',
    answer: 'Your e-commerce platform will include an admin dashboard where you can manage products, track inventory levels, process orders, handle refunds, and view sales reports. I provide training on how to use all features effectively.',
  },
  {
    question: 'Can you help with shipping and delivery setup?',
    answer: 'Yes, I can configure shipping zones, rates, and methods including flat rate, calculated shipping, local delivery, and click-and-collect. I can also integrate with shipping carriers for automated label printing and tracking.',
  },
];

export const seoFAQs: FAQItem[] = [
  {
    question: 'How long does SEO take to show results?',
    answer: 'SEO is a long-term strategy. You\'ll typically see initial improvements in 2-3 months, with significant results in 4-6 months. Timeline varies based on competition, current site status, and the keywords you\'re targeting. Local SEO often shows faster results than national campaigns.',
  },
  {
    question: 'What\'s included in your SEO services?',
    answer: 'My SEO services include keyword research, on-page optimization (title tags, meta descriptions, content), technical SEO (site speed, mobile-friendliness, structured data), local SEO (Google Business Profile), monthly reporting, and ongoing recommendations.',
  },
  {
    question: 'Do you guarantee first page rankings on Google?',
    answer: 'No one can honestly guarantee specific rankings as Google\'s algorithm constantly changes. However, I use proven SEO techniques that improve your visibility, increase organic traffic, and help you rank better for relevant search terms.',
  },
  {
    question: 'How much does SEO cost?',
    answer: 'SEO services typically range from £400-£1,500 per month depending on the scope, competition, and number of keywords. I offer one-off website SEO audits from £300 and local SEO packages starting at £450/month.',
  },
  {
    question: 'Can you help with local SEO in West Sussex?',
    answer: 'Yes, local SEO is one of my specialties. I optimize your Google Business Profile, build local citations, create location-specific content, and implement local schema markup to help you rank in local search results and Google Maps.',
  },
];

export const webApplicationsFAQs: FAQItem[] = [
  {
    question: 'What types of web applications can you build?',
    answer: 'I build booking systems, client portals, custom dashboards, calculators and quote tools, inventory management systems, workflow automation tools, forms and data collection systems, and other custom business applications tailored to your specific needs.',
  },
  {
    question: 'How much does a custom web application cost?',
    answer: 'Custom web applications typically start from £3,000 and can range up to £15,000+ depending on complexity. Simple tools like calculators or forms start around £1,000-£2,000. I provide detailed quotes after understanding your requirements.',
  },
  {
    question: 'How long does it take to build a web application?',
    answer: 'Timeline varies by complexity. Simple applications take 3-4 weeks, while complex systems with multiple features can take 2-3 months. I break projects into milestones so you can see progress and provide feedback throughout development.',
  },
  {
    question: 'Will the application be secure?',
    answer: 'Yes, security is built in from the start. I implement user authentication, data encryption, input validation, secure APIs, and regular security updates. For applications handling sensitive data, I can also implement additional security measures.',
  },
  {
    question: 'Can the application integrate with my existing software?',
    answer: 'Yes, I can integrate your web application with CRMs, accounting software, email platforms, payment processors, and other business tools through APIs. This allows data to flow seamlessly between systems.',
  },
];

export const maintenanceFAQs: FAQItem[] = [
  {
    question: 'What\'s included in website maintenance?',
    answer: 'Website maintenance includes software updates, security patches, bug fixes, content updates, performance monitoring, regular backups, uptime monitoring, and priority support. I also provide monthly reports on site health and performance.',
  },
  {
    question: 'How much does website maintenance cost?',
    answer: 'Maintenance packages start from £50/month for basic sites with quarterly updates and monitoring. More complex sites or those requiring frequent updates range from £100-£300/month. I offer packages tailored to your specific needs.',
  },
  {
    question: 'How quickly do you respond to issues?',
    answer: 'For maintenance clients, I respond to urgent issues within 2-4 hours during business hours. Critical security issues are addressed immediately. Non-urgent requests are typically handled within 1-2 business days.',
  },
  {
    question: 'Do I need ongoing maintenance?',
    answer: 'Yes, regular maintenance is essential to keep your site secure, fast, and functioning properly. Without updates, sites become vulnerable to security threats and compatibility issues. Maintenance is much more cost-effective than dealing with a hacked or broken website.',
  },
  {
    question: 'Can I cancel my maintenance plan?',
    answer: 'Yes, maintenance plans are month-to-month with no long-term contracts. You can cancel anytime with 30 days notice. However, most clients find ongoing maintenance saves them time and prevents costly emergency repairs.',
  },
];

export const websiteDevelopmentFAQs: FAQItem[] = [
  {
    question: 'What makes your websites faster than others?',
    answer: 'I use modern frameworks like Next.js with server-side rendering, optimize all images and code, implement caching strategies, use CDN delivery, and follow Google\'s Core Web Vitals guidelines. This results in Lighthouse scores of 95+ and load times under 2 seconds.',
  },
  {
    question: 'Do you build accessible websites?',
    answer: 'Yes, accessibility is standard in all my projects. Websites are built following WCAG 2.1 guidelines, ensuring they work for users with disabilities. This includes proper semantic HTML, keyboard navigation, screen reader compatibility, and sufficient color contrast.',
  },
  {
    question: 'How do you ensure good SEO from the start?',
    answer: 'I build SEO into every website with proper semantic HTML, meta tags, structured data (schema.org), fast load times, mobile responsiveness, clean URLs, XML sitemaps, and optimized content structure. Technical SEO is included in every project.',
  },
  {
    question: 'What if I need changes after the website is live?',
    answer: 'Minor tweaks during the first 30 days are included. For larger changes or ongoing updates, I offer hourly rates (£60/hour) or monthly maintenance packages. I\'m always available to help your site evolve as your business grows.',
  },
  {
    question: 'Do you provide hosting?',
    answer: 'I can arrange hosting for you through reliable providers like Vercel, Netlify, or traditional hosts. Hosting costs typically range from £5-£30/month depending on your needs. I\'ll recommend the best hosting solution for your specific site.',
  },
];
