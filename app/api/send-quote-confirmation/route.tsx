import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';
import { Config } from '@/lib/config';
import { QuoteConfirmationEmail, AdminQuoteNotification } from '@/lib/email-templates';
import { QuoteRequest } from '@/lib/mock-quotes';
import { render } from '@react-email/render';

export async function POST(request: NextRequest) {
  try {
    const quote: QuoteRequest = await request.json();

    // Validate quote data
    if (!quote.email || !quote.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get Resend instance
    const resend = getResend();
    if (!resend) {
      console.warn('Resend not configured - skipping email');
      return NextResponse.json({
        success: true,
        message: 'Email sending is disabled'
      });
    }

    // Render customer confirmation email
    const customerEmailHtml = await render(<QuoteConfirmationEmail quote={quote} />);

    // Send customer confirmation email
    const { data, error } = await resend.emails.send({
      from: Config.resend.fromEmail,
      to: quote.email,
      replyTo: Config.resend.replyTo,
      subject: 'Quote Request Received - Harbonline',
      html: customerEmailHtml,
    });

    if (error) {
      console.error('Error sending quote confirmation email:', error);
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    // Render and send admin notification email
    try {
      const adminEmailHtml = await render(<AdminQuoteNotification quote={quote} />);
      await resend.emails.send({
        from: Config.resend.fromEmail,
        to: Config.resend.adminEmail,
        subject: 'New Quote Request - Harbonline',
        html: adminEmailHtml,
      });
    } catch (adminError) {
      console.error('Error sending admin notification:', adminError);
      // Don't fail the request if admin email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Error in send-quote-confirmation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
