import { env } from './env';

/**
 * Centralized Configuration
 *
 * All app configuration in one place.
 * Never access process.env directly - use this Config object instead.
 */
export const Config = {
  /**
   * App metadata
   */
  app: {
    env: env.APP_ENV,
    nodeEnv: env.NODE_ENV,
    isDevelopment: env.NODE_ENV === 'development',
    isProduction: env.NODE_ENV === 'production',
    isLocal: env.APP_ENV === 'local',
  },

  /**
   * Firebase Client SDK Configuration
   * Used in browser for authentication, Firestore, etc.
   */
  firebase: {
    client: {
      apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
    /**
     * Firebase Admin SDK Configuration
     * Server-side only - never exposed to client
     */
    admin: {
      projectId: env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // Fix newline characters in private key
      privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
  },

  /**
   * Google Analytics Configuration
   */
  analytics: {
    measurementId: env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    // Only enable analytics in production
    enabled: env.NEXT_PUBLIC_GA_MEASUREMENT_ID && env.APP_ENV === 'production',
  },

  /**
   * Google Search Console
   */
  searchConsole: {
    verificationCode: env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION,
  },

  /**
   * Resend Email Service Configuration
   */
  resend: {
    apiKey: env.RESEND_API_KEY,
    fromEmail: 'Harbonline <noreply@harbonline.co.uk>',
    replyTo: 'jake@harbonline.co.uk',
    adminEmail: 'jake@harbonline.co.uk',
  },

  /**
   * Feature Flags
   * Toggle experimental features by environment
   */
  flags: {
    // Enable motion debugging tools in development
    enableMotionDebug: env.APP_ENV !== 'production',
    // Enable verbose logging in non-production
    enableVerboseLogging: env.APP_ENV !== 'production',
    // Enable Firebase integration
    enableFirebase: !!env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // Enable Resend email service
    enableResend: !!env.RESEND_API_KEY,
  },
} as const;

/**
 * Type export for config
 */
export type AppConfig = typeof Config;
