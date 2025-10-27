import { QuoteRequest } from './mock-quotes';
import { Callback } from './mock-callbacks';

/**
 * Professional Email Templates for Harbonline
 * Branded, clean, and easy to understand
 */

// Email styles - Professional and modern
const emailStyles = {
  // Outer wrapper with background
  wrapper: {
    backgroundColor: '#f3f4f6',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden' as const,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
  },
  // Logo area
  logo: {
    backgroundColor: '#ffffff',
    padding: '32px 40px 24px',
    textAlign: 'center' as const,
    borderBottom: '2px solid #f3f4f6',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#6A00FF',
    margin: '0',
    letterSpacing: '-0.01em',
  },
  // Header with gradient
  header: {
    background: 'linear-gradient(135deg, #6A00FF 0%, #9D4EDD 100%)',
    padding: '48px 40px',
    textAlign: 'center' as const,
  },
  heading: {
    color: '#ffffff',
    fontSize: '26px',
    fontWeight: '700',
    margin: '0',
    lineHeight: '1.3',
  },
  subheading: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '16px',
    margin: '12px 0 0',
    lineHeight: '1.5',
  },
  // Body content
  body: {
    padding: '48px 40px',
    backgroundColor: '#ffffff',
  },
  greeting: {
    color: '#111827',
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 24px',
  },
  text: {
    color: '#4b5563',
    fontSize: '16px',
    lineHeight: '1.7',
    margin: '0 0 20px',
  },
  // Info box for details
  infoBox: {
    margin: '32px 0',
    padding: '28px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  infoBoxTitle: {
    color: '#111827',
    fontSize: '15px',
    fontWeight: '700',
    margin: '0 0 20px',
    paddingBottom: '16px',
    borderBottom: '2px solid #6A00FF',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  infoRow: {
    marginBottom: '20px',
  },
  label: {
    color: '#6b7280',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    margin: '0 0 6px',
    display: 'block',
  },
  value: {
    color: '#111827',
    fontSize: '15px',
    margin: '0',
    lineHeight: '1.6',
  },
  // Highlighted message box
  messageBox: {
    margin: '32px 0',
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    borderLeft: '4px solid #6A00FF',
  },
  // Signature
  signature: {
    marginTop: '48px',
    paddingTop: '32px',
    borderTop: '1px solid #e5e7eb',
  },
  signatureText: {
    color: '#4b5563',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 8px',
  },
  signatureName: {
    color: '#111827',
    fontSize: '16px',
    fontWeight: '700',
    margin: '16px 0 0',
  },
  signatureTitle: {
    color: '#6b7280',
    fontSize: '14px',
    margin: '4px 0 0',
  },
  // Footer
  footer: {
    padding: '32px 40px',
    backgroundColor: '#f9fafb',
    textAlign: 'center' as const,
  },
  footerText: {
    color: '#9ca3af',
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '0 0 4px',
  },
  footerLink: {
    color: '#6A00FF',
    textDecoration: 'none',
    fontWeight: '600',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '32px 0',
    border: 'none',
  },
};

// Quote Request Confirmation Email (to customer)
export function QuoteConfirmationEmail({ quote }: { quote: QuoteRequest }) {
  const selectedServices = [];
  if (quote.services?.design) selectedServices.push('Web Design');
  if (quote.services?.development) selectedServices.push('Web Development');
  if (quote.services?.ecommerce) selectedServices.push('E-Commerce');
  if (quote.services?.customSoftware) selectedServices.push('Custom Software');
  if (quote.services?.seo) selectedServices.push('SEO');
  if (quote.services?.maintenance) selectedServices.push('Maintenance');

  return (
    <div style={emailStyles.wrapper}>
      <div style={emailStyles.container}>
        {/* Logo */}
        <div style={emailStyles.logo}>
          <h2 style={emailStyles.logoText}>Harbonline</h2>
        </div>

        {/* Header */}
        <div style={emailStyles.header}>
          <h1 style={emailStyles.heading}>Quote Request Received</h1>
          <p style={emailStyles.subheading}>I'll review your project and get back to you soon</p>
        </div>

        {/* Body */}
        <div style={emailStyles.body}>
          <p style={emailStyles.greeting}>Hi {quote.name},</p>

          <p style={emailStyles.text}>
            Thanks for reaching out to Harbonline! I've received your quote request and I'm excited to learn more about your project.
          </p>

          <p style={emailStyles.text}>
            I'll review everything carefully and send you a detailed quote within 1-2 business days. The quote will include transparent pricing, a clear timeline, and next steps.
          </p>

          {/* Project Details Box */}
          <div style={emailStyles.infoBox}>
            <div style={emailStyles.infoBoxTitle}>Your Project Details</div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Project Type</div>
              <div style={emailStyles.value}>{quote.projectType}</div>
            </div>

            {selectedServices.length > 0 && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Services Requested</div>
                <div style={emailStyles.value}>{selectedServices.join(', ')}</div>
              </div>
            )}

            {quote.description && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Project Description</div>
                <div style={emailStyles.value}>{quote.description}</div>
              </div>
            )}

            {quote.timeline && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Timeline</div>
                <div style={emailStyles.value}>{quote.timeline}</div>
              </div>
            )}

            {quote.budget && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Budget</div>
                <div style={emailStyles.value}>{quote.budget}</div>
              </div>
            )}
          </div>

          <p style={emailStyles.text}>
            In the meantime, if you have any questions or want to provide additional details, feel free to reply to this email.
          </p>

          {/* Signature */}
          <div style={emailStyles.signature}>
            <p style={emailStyles.signatureText}>
              Looking forward to working with you!
            </p>
            <p style={emailStyles.signatureName}>Jake</p>
            <p style={emailStyles.signatureTitle}>Founder, Harbonline</p>
          </div>
        </div>

        {/* Footer */}
        <div style={emailStyles.footer}>
          <p style={emailStyles.footerText}>
            <a href="https://harbonline.co.uk" style={emailStyles.footerLink}>harbonline.co.uk</a> • jake@harbonline.co.uk
          </p>
          <p style={emailStyles.footerText}>
            Professional Web Development & Design
          </p>
        </div>
      </div>
    </div>
  );
}

// Contact Form Confirmation Email (to customer)
export function ContactConfirmationEmail({ name, email, message }: { name: string; email: string; message: string }) {
  return (
    <div style={emailStyles.wrapper}>
      <div style={emailStyles.container}>
        {/* Logo */}
        <div style={emailStyles.logo}>
          <h2 style={emailStyles.logoText}>Harbonline</h2>
        </div>

        {/* Header */}
        <div style={emailStyles.header}>
          <h1 style={emailStyles.heading}>Message Received</h1>
          <p style={emailStyles.subheading}>I'll get back to you as soon as possible</p>
        </div>

        {/* Body */}
        <div style={emailStyles.body}>
          <p style={emailStyles.greeting}>Hi {name},</p>

          <p style={emailStyles.text}>
            Thanks for getting in touch! I've received your message and I'll respond within 1 business day.
          </p>

          {/* Message Box */}
          <div style={emailStyles.messageBox}>
            <div style={emailStyles.label}>Your Message</div>
            <div style={{...emailStyles.value, whiteSpace: 'pre-wrap' as const}}>{message}</div>
          </div>

          <p style={emailStyles.text}>
            If your question is urgent, feel free to call me directly or send another email with "URGENT" in the subject line.
          </p>

          {/* Signature */}
          <div style={emailStyles.signature}>
            <p style={emailStyles.signatureText}>
              Thanks for reaching out!
            </p>
            <p style={emailStyles.signatureName}>Jake</p>
            <p style={emailStyles.signatureTitle}>Founder, Harbonline</p>
          </div>
        </div>

        {/* Footer */}
        <div style={emailStyles.footer}>
          <p style={emailStyles.footerText}>
            <a href="https://harbonline.co.uk" style={emailStyles.footerLink}>harbonline.co.uk</a> • jake@harbonline.co.uk
          </p>
          <p style={emailStyles.footerText}>
            Professional Web Development & Design
          </p>
        </div>
      </div>
    </div>
  );
}

// Callback Request Confirmation Email (to customer)
export function CallbackConfirmationEmail({ callback }: { callback: Callback }) {
  return (
    <div style={emailStyles.wrapper}>
      <div style={emailStyles.container}>
        {/* Logo */}
        <div style={emailStyles.logo}>
          <h2 style={emailStyles.logoText}>Harbonline</h2>
        </div>

        {/* Header */}
        <div style={emailStyles.header}>
          <h1 style={emailStyles.heading}>Callback Request Confirmed</h1>
          <p style={emailStyles.subheading}>I'll call you at your preferred time</p>
        </div>

        {/* Body */}
        <div style={emailStyles.body}>
          <p style={emailStyles.greeting}>Hi {callback.name},</p>

          <p style={emailStyles.text}>
            Thanks for requesting a callback. I've received your request and I'll call you on <strong>{callback.phone}</strong>.
          </p>

          {/* Callback Details */}
          <div style={emailStyles.infoBox}>
            <div style={emailStyles.infoBoxTitle}>Callback Details</div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Phone Number</div>
              <div style={emailStyles.value}>{callback.phone}</div>
            </div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Preferred Time</div>
              <div style={emailStyles.value}>{callback.preferredTime}</div>
            </div>

            {callback.notes && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Your Notes</div>
                <div style={emailStyles.value}>{callback.notes}</div>
              </div>
            )}
          </div>

          <p style={emailStyles.text}>
            I'll do my best to call you at your preferred time. If I miss you, I'll try again or send you an email to reschedule.
          </p>

          {/* Signature */}
          <div style={emailStyles.signature}>
            <p style={emailStyles.signatureText}>
              Looking forward to speaking with you!
            </p>
            <p style={emailStyles.signatureName}>Jake</p>
            <p style={emailStyles.signatureTitle}>Founder, Harbonline</p>
          </div>
        </div>

        {/* Footer */}
        <div style={emailStyles.footer}>
          <p style={emailStyles.footerText}>
            <a href="https://harbonline.co.uk" style={emailStyles.footerLink}>harbonline.co.uk</a> • jake@harbonline.co.uk
          </p>
          <p style={emailStyles.footerText}>
            Professional Web Development & Design
          </p>
        </div>
      </div>
    </div>
  );
}

// Admin Notification Emails

export function AdminQuoteNotification({ quote }: { quote: QuoteRequest }) {
  const selectedServices = [];
  if (quote.services?.design) selectedServices.push('Web Design');
  if (quote.services?.development) selectedServices.push('Web Development');
  if (quote.services?.ecommerce) selectedServices.push('E-Commerce');
  if (quote.services?.customSoftware) selectedServices.push('Custom Software');
  if (quote.services?.seo) selectedServices.push('SEO');
  if (quote.services?.maintenance) selectedServices.push('Maintenance');

  return (
    <div style={emailStyles.wrapper}>
      <div style={emailStyles.container}>
        {/* Header */}
        <div style={emailStyles.header}>
          <h1 style={emailStyles.heading}>🎉 New Quote Request</h1>
          <p style={emailStyles.subheading}>From {quote.name}</p>
        </div>

        {/* Body */}
        <div style={emailStyles.body}>
          <p style={emailStyles.text}>
            You have a new quote request from <strong>{quote.name}</strong>.
          </p>

          {/* Contact Info */}
          <div style={emailStyles.infoBox}>
            <div style={emailStyles.infoBoxTitle}>Contact Information</div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Name</div>
              <div style={emailStyles.value}>{quote.name}</div>
            </div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Email</div>
              <div style={emailStyles.value}>
                <a href={`mailto:${quote.email}`} style={emailStyles.footerLink}>{quote.email}</a>
              </div>
            </div>

            {quote.phone && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Phone</div>
                <div style={emailStyles.value}>{quote.phone}</div>
              </div>
            )}

            {quote.company && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Company</div>
                <div style={emailStyles.value}>{quote.company}</div>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div style={emailStyles.infoBox}>
            <div style={emailStyles.infoBoxTitle}>Project Details</div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Project Type</div>
              <div style={emailStyles.value}>{quote.projectType}</div>
            </div>

            {selectedServices.length > 0 && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Services</div>
                <div style={emailStyles.value}>{selectedServices.join(', ')}</div>
              </div>
            )}

            {quote.description && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Description</div>
                <div style={emailStyles.value}>{quote.description}</div>
              </div>
            )}

            {quote.timeline && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Timeline</div>
                <div style={emailStyles.value}>{quote.timeline}</div>
              </div>
            )}

            {quote.budget && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Budget</div>
                <div style={emailStyles.value}>{quote.budget}</div>
              </div>
            )}
          </div>

          <p style={emailStyles.text}>
            <a href="https://harbonline.co.uk/admin" style={emailStyles.footerLink}>View in Admin Panel →</a>
          </p>
        </div>

        {/* Footer */}
        <div style={emailStyles.footer}>
          <p style={emailStyles.footerText}>
            Harbonline Admin Notification
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdminContactNotification({ name, email, message }: { name: string; email: string; message: string }) {
  return (
    <div style={emailStyles.wrapper}>
      <div style={emailStyles.container}>
        {/* Header */}
        <div style={emailStyles.header}>
          <h1 style={emailStyles.heading}>💬 New Contact Message</h1>
          <p style={emailStyles.subheading}>From {name}</p>
        </div>

        {/* Body */}
        <div style={emailStyles.body}>
          <p style={emailStyles.text}>
            You have a new contact message from <strong>{name}</strong>.
          </p>

          {/* Contact Info */}
          <div style={emailStyles.infoBox}>
            <div style={emailStyles.infoBoxTitle}>Contact Information</div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Name</div>
              <div style={emailStyles.value}>{name}</div>
            </div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Email</div>
              <div style={emailStyles.value}>
                <a href={`mailto:${email}`} style={emailStyles.footerLink}>{email}</a>
              </div>
            </div>
          </div>

          {/* Message */}
          <div style={emailStyles.messageBox}>
            <div style={emailStyles.label}>Message</div>
            <div style={{...emailStyles.value, whiteSpace: 'pre-wrap' as const}}>{message}</div>
          </div>

          <p style={emailStyles.text}>
            <a href={`mailto:${email}`} style={emailStyles.footerLink}>Reply to {name} →</a>
          </p>
        </div>

        {/* Footer */}
        <div style={emailStyles.footer}>
          <p style={emailStyles.footerText}>
            Harbonline Admin Notification
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdminCallbackNotification({ callback }: { callback: Callback }) {
  return (
    <div style={emailStyles.wrapper}>
      <div style={emailStyles.container}>
        {/* Header */}
        <div style={emailStyles.header}>
          <h1 style={emailStyles.heading}>📞 New Callback Request</h1>
          <p style={emailStyles.subheading}>From {callback.name}</p>
        </div>

        {/* Body */}
        <div style={emailStyles.body}>
          <p style={emailStyles.text}>
            You have a new callback request from <strong>{callback.name}</strong>.
          </p>

          {/* Contact Info */}
          <div style={emailStyles.infoBox}>
            <div style={emailStyles.infoBoxTitle}>Contact Information</div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Name</div>
              <div style={emailStyles.value}>{callback.name}</div>
            </div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Email</div>
              <div style={emailStyles.value}>
                <a href={`mailto:${callback.email}`} style={emailStyles.footerLink}>{callback.email}</a>
              </div>
            </div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Phone</div>
              <div style={emailStyles.value}>
                <strong style={{fontSize: '18px', color: '#6A00FF'}}>{callback.phone}</strong>
              </div>
            </div>
          </div>

          {/* Callback Details */}
          <div style={emailStyles.infoBox}>
            <div style={emailStyles.infoBoxTitle}>Callback Details</div>

            <div style={emailStyles.infoRow}>
              <div style={emailStyles.label}>Preferred Time</div>
              <div style={emailStyles.value}>{callback.preferredTime}</div>
            </div>

            {callback.notes && (
              <div style={emailStyles.infoRow}>
                <div style={emailStyles.label}>Notes</div>
                <div style={emailStyles.value}>{callback.notes}</div>
              </div>
            )}
          </div>

          <p style={emailStyles.text}>
            <a href="https://harbonline.co.uk/admin" style={emailStyles.footerLink}>View in Admin Panel →</a>
          </p>
        </div>

        {/* Footer */}
        <div style={emailStyles.footer}>
          <p style={emailStyles.footerText}>
            Harbonline Admin Notification
          </p>
        </div>
      </div>
    </div>
  );
}
