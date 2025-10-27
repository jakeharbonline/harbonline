'use client';

import Script from 'next/script';
import { Config } from '@/lib/config';

/**
 * Google Analytics Component
 *
 * Loads GA4 tracking script
 * Only enabled in production with valid measurement ID
 */
export function Analytics() {
  // Don't load analytics if not enabled
  if (!Config.analytics.enabled || !Config.analytics.measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${Config.analytics.measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${Config.analytics.measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

/**
 * Track custom events
 * Usage: trackEvent('button_click', { button_name: 'Get Quote' })
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (!Config.analytics.enabled) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
}

/**
 * Track page views
 * Usage: trackPageView('/about')
 */
export function trackPageView(url: string) {
  if (!Config.analytics.enabled) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', Config.analytics.measurementId, {
      page_path: url,
    });
  }
}
