import { Resend } from 'resend';
import { Config } from './config';

/**
 * Resend Email Service
 *
 * Used for sending transactional emails:
 * - Quote request confirmations
 * - Contact form confirmations
 * - Callback request confirmations
 */

let resend: Resend | null = null;

export function getResend(): Resend | null {
  if (!Config.flags.enableResend) {
    console.warn('⚠️  Resend is not configured. Email sending disabled.');
    return null;
  }

  if (!resend) {
    const apiKey = Config.resend.apiKey;

    if (!apiKey) {
      console.warn('⚠️  Resend API key not found. Email sending disabled.');
      return null;
    }

    resend = new Resend(apiKey);
    console.log('✅ Resend initialized');
  }

  return resend;
}

export { resend };
