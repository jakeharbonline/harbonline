import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { LocalBusinessSchema, OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";
import { Config } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://harbonline.co.uk'),
  title: {
    default: "Harbonline — Web Design & Development | Chichester, West Sussex",
    template: "%s | Harbonline",
  },
  description: "Professional web design, development, and SEO services in West Sussex. I build fast, modern websites and e-commerce solutions for businesses in Chichester, Bognor Regis, and Littlehampton. Custom web applications and ongoing support available.",
  keywords: [
    // Core Services
    "web design West Sussex",
    "web developer Chichester",
    "website design Bognor Regis",
    "web development Littlehampton",
    "freelance web developer West Sussex",

    // Specific Services
    "ecommerce development",
    "custom software development",
    "SEO services West Sussex",
    "website maintenance",
    "web applications",

    // Local SEO
    "Chichester web designer",
    "Bognor Regis website developer",
    "Littlehampton web development",
    "Worthing web design",
    "Portsmouth web developer",

    // Technology
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "modern web development",

    // Business Types
    "small business website",
    "online shop development",
    "booking system development",
    "client portal development",
  ],
  authors: [{ name: "Jake - Harbonline" }],
  creator: "Harbonline",
  publisher: "Harbonline",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Harbonline — Web Design & Development | Chichester, West Sussex",
    description: "Professional web design, development, and SEO services in West Sussex. I build fast, modern websites and e-commerce solutions for businesses in Chichester, Bognor Regis, and Littlehampton.",
    url: "https://harbonline.co.uk",
    siteName: "Harbonline",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harbonline - Web Design & Development West Sussex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harbonline — Web Design & Development | West Sussex",
    description: "Professional web design, development, and SEO services in West Sussex.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: Config.searchConsole.verificationCode || undefined,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <LocalBusinessSchema
          data={{
            name: 'Harbonline',
            description: 'Professional web design, development, and SEO services in West Sussex. Custom websites, e-commerce solutions, and web applications.',
            url: 'https://harbonline.co.uk',
            email: 'jake@harbonline.co.uk',
            address: {
              addressLocality: 'Chichester',
              addressRegion: 'West Sussex',
              addressCountry: 'GB',
            },
            areaServed: [
              'Chichester',
              'Bognor Regis',
              'Littlehampton',
              'Worthing',
              'Brighton',
              'West Sussex',
            ],
            priceRange: '££',
          }}
        />
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
