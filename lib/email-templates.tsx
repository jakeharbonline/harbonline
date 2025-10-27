import { QuoteRequest } from './mock-quotes';
import { Callback } from './mock-callbacks';

/**
 * Email Templates using React Components
 * These will be rendered to HTML by Resend
 */

// Email styles
const emailStyles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#6A00FF',
    padding: '30px 40px',
    borderRadius: '12px 12px 0 0',
    textAlign: 'center' as const,
  },
  heading: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0',
  },
  body: {
    backgroundColor: '#f9fafb',
    padding: '40px',
    borderRadius: '0 0 12px 12px',
  },
  text: {
    color: '#374151',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 16px',
  },
  label: {
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    margin: '24px 0 8px',
  },
  value: {
    color: '#111827',
    fontSize: '16px',
    margin: '0 0 16px',
  },
  button: {
    display: 'inline-block',
    padding: '14px 28px',
    backgroundColor: '#6A00FF',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '16px',
    margin: '24px 0',
  },
  footer: {
    marginTop: '40px',
    padding: '30px 40px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    textAlign: 'center' as const,
  },
  footerText: {
    color: '#6b7280',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '0',
  },
};

// Quote Request Confirmation Email (to customer)
export function QuoteConfirmationEmail({ quote }: { quote: QuoteRequest }) {
  return (
    <div style={emailStyles.container}>
      <div style={emailStyles.header}>
        <h1 style={emailStyles.heading}>Thanks for Your Quote Request!</h1>
      </div>
      <div style={emailStyles.body}>
        <p style={emailStyles.text}>
          Hi {quote.name},
        </p>
        <p style={emailStyles.text}>
          Thank you for reaching out to Harbonline. I've received your quote request and will review the details carefully.
        </p>
        <p style={emailStyles.text}>
          I'll get back to you within 1-2 business days with a detailed quote tailored to your project.
        </p>

        <div style={{ margin: '32px 0' }}>
          <h2 style={{ ...emailStyles.label, fontSize: '18px', margin: '0 0 16px' }}>
            Your Request Details:
          </h2>

          <div style={emailStyles.label}>Project Type</div>
          <div style={emailStyles.value}>{quote.projectType}</div>

          <div style={emailStyles.label}>Description</div>
          <div style={emailStyles.value}>{quote.description}</div>

          {quote.timeline && (
            <>
              <div style={emailStyles.label}>Timeline</div>
              <div style={emailStyles.value}>{quote.timeline}</div>
            </>
          )}

          {quote.budget && (
            <>
              <div style={emailStyles.label}>Budget</div>
              <div style={emailStyles.value}>{quote.budget}</div>
            </>
          )}

          <div style={emailStyles.label}>Contact</div>
          <div style={emailStyles.value}>
            Email: {quote.email}<br />
            {quote.phone && `Phone: ${quote.phone}`}
          </div>
        </div>

        <p style={emailStyles.text}>
          If you have any questions in the meantime, feel free to reply to this email.
        </p>

        <p style={emailStyles.text}>
          Best regards,<br />
          <strong>Jake</strong><br />
          Harbonline
        </p>
      </div>

      <div style={emailStyles.footer}>
        <p style={emailStyles.footerText}>
          Harbonline | Professional Web Development<br />
          jake@harbonline.co.uk | harbonline.co.uk
        </p>
      </div>
    </div>
  );
}

// Contact Form Confirmation Email (to customer)
export function ContactConfirmationEmail({ name, email, message }: { name: string; email: string; message: string }) {
  return (
    <div style={emailStyles.container}>
      <div style={emailStyles.header}>
        <h1 style={emailStyles.heading}>Thanks for Getting in Touch!</h1>
      </div>
      <div style={emailStyles.body}>
        <p style={emailStyles.text}>
          Hi {name},
        </p>
        <p style={emailStyles.text}>
          Thank you for contacting Harbonline. I've received your message and will respond as soon as possible.
        </p>

        <div style={{ margin: '32px 0', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', borderLeft: '4px solid #6A00FF' }}>
          <div style={emailStyles.label}>Your Message</div>
          <div style={{ ...emailStyles.value, whiteSpace: 'pre-wrap' as const }}>{message}</div>
        </div>

        <p style={emailStyles.text}>
          I typically respond within 1 business day. If your matter is urgent, feel free to call me directly.
        </p>

        <p style={emailStyles.text}>
          Best regards,<br />
          <strong>Jake</strong><br />
          Harbonline
        </p>
      </div>

      <div style={emailStyles.footer}>
        <p style={emailStyles.footerText}>
          Harbonline | Professional Web Development<br />
          jake@harbonline.co.uk | harbonline.co.uk
        </p>
      </div>
    </div>
  );
}

// Callback Request Confirmation Email (to customer)
export function CallbackConfirmationEmail({ callback }: { callback: Callback }) {
  return (
    <div style={emailStyles.container}>
      <div style={emailStyles.header}>
        <h1 style={emailStyles.heading}>Callback Request Confirmed!</h1>
      </div>
      <div style={emailStyles.body}>
        <p style={emailStyles.text}>
          Hi {callback.name},
        </p>
        <p style={emailStyles.text}>
          Thanks for requesting a callback. I've received your request and will call you on <strong>{callback.phone}</strong>.
        </p>

        <div style={{ margin: '32px 0', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <div style={emailStyles.label}>Preferred Time</div>
          <div style={emailStyles.value}>{callback.preferredTime}</div>

          {callback.notes && (
            <>
              <div style={emailStyles.label}>Your Notes</div>
              <div style={emailStyles.value}>{callback.notes}</div>
            </>
          )}
        </div>

        <p style={emailStyles.text}>
          I'll do my best to call you at your preferred time. If I miss you, I'll try again or drop you an email.
        </p>

        <p style={emailStyles.text}>
          Best regards,<br />
          <strong>Jake</strong><br />
          Harbonline
        </p>
      </div>

      <div style={emailStyles.footer}>
        <p style={emailStyles.footerText}>
          Harbonline | Professional Web Development<br />
          jake@harbonline.co.uk | harbonline.co.uk
        </p>
      </div>
    </div>
  );
}

// Admin Notification Emails
export function AdminQuoteNotification({ quote }: { quote: QuoteRequest }) {
  return (
    <div style={emailStyles.container}>
      <div style={emailStyles.header}>
        <h1 style={emailStyles.heading}>New Quote Request!</h1>
      </div>
      <div style={emailStyles.body}>
        <p style={emailStyles.text}>
          You have a new quote request from <strong>{quote.name}</strong>.
        </p>

        <div style={{ margin: '32px 0', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <div style={emailStyles.label}>Contact Information</div>
          <div style={emailStyles.value}>
            Name: {quote.name}<br />
            Email: {quote.email}<br />
            {quote.phone && `Phone: ${quote.phone}`}<br />
            {quote.company && `Company: ${quote.company}`}
          </div>

          <div style={emailStyles.label}>Project Type</div>
          <div style={emailStyles.value}>{quote.projectType}</div>

          <div style={emailStyles.label}>Description</div>
          <div style={emailStyles.value}>{quote.description}</div>

          {quote.timeline && (
            <>
              <div style={emailStyles.label}>Timeline</div>
              <div style={emailStyles.value}>{quote.timeline}</div>
            </>
          )}

          {quote.budget && (
            <>
              <div style={emailStyles.label}>Budget</div>
              <div style={emailStyles.value}>{quote.budget}</div>
            </>
          )}
        </div>

        <p style={emailStyles.text}>
          View and manage this quote in your admin panel at harbonline.co.uk/admin
        </p>
      </div>
    </div>
  );
}

export function AdminContactNotification({ name, email, message }: { name: string; email: string; message: string }) {
  return (
    <div style={emailStyles.container}>
      <div style={emailStyles.header}>
        <h1 style={emailStyles.heading}>New Contact Message!</h1>
      </div>
      <div style={emailStyles.body}>
        <p style={emailStyles.text}>
          You have a new message from <strong>{name}</strong>.
        </p>

        <div style={{ margin: '32px 0', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <div style={emailStyles.label}>Contact Information</div>
          <div style={emailStyles.value}>
            Name: {name}<br />
            Email: {email}
          </div>

          <div style={emailStyles.label}>Message</div>
          <div style={{ ...emailStyles.value, whiteSpace: 'pre-wrap' as const }}>{message}</div>
        </div>

        <p style={emailStyles.text}>
          Reply directly to {email} to respond.
        </p>
      </div>
    </div>
  );
}

export function AdminCallbackNotification({ callback }: { callback: Callback }) {
  return (
    <div style={emailStyles.container}>
      <div style={emailStyles.header}>
        <h1 style={emailStyles.heading}>New Callback Request!</h1>
      </div>
      <div style={emailStyles.body}>
        <p style={emailStyles.text}>
          You have a new callback request from <strong>{callback.name}</strong>.
        </p>

        <div style={{ margin: '32px 0', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <div style={emailStyles.label}>Contact Information</div>
          <div style={emailStyles.value}>
            Name: {callback.name}<br />
            Email: {callback.email}<br />
            Phone: <strong>{callback.phone}</strong>
          </div>

          <div style={emailStyles.label}>Preferred Time</div>
          <div style={emailStyles.value}>{callback.preferredTime}</div>

          {callback.notes && (
            <>
              <div style={emailStyles.label}>Notes</div>
              <div style={emailStyles.value}>{callback.notes}</div>
            </>
          )}
        </div>

        <p style={emailStyles.text}>
          View and manage this callback in your admin panel at harbonline.co.uk/admin
        </p>
      </div>
    </div>
  );
}
