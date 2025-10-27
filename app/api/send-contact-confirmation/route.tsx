import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';
import { Config } from '@/lib/config';
import { ContactConfirmationEmail } from '@/lib/email-templates';
import { render } from '@react-email/render';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate data
    if (!email || !name || !message) {
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

    // Render email template to HTML
    const emailHtml = await render(<ContactConfirmationEmail name={name} email={email} message={message} />);

    // Send email
    const { data, error } = await resend.emails.send({
      from: Config.resend.fromEmail,
      to: email,
      replyTo: Config.resend.replyTo,
      subject: 'Message Received - Harbonline',
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending contact confirmation email:', error);
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Error in send-contact-confirmation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
