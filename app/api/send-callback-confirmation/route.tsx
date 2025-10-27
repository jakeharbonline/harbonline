import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';
import { Config } from '@/lib/config';
import { CallbackConfirmationEmail } from '@/lib/email-templates';
import { Callback } from '@/lib/mock-callbacks';
import { render } from '@react-email/render';

export async function POST(request: NextRequest) {
  try {
    const callback: Callback = await request.json();

    // Validate callback data
    if (!callback.email || !callback.name || !callback.phone) {
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
    const emailHtml = render(<CallbackConfirmationEmail callback={callback} />);

    // Send email
    const { data, error } = await resend.emails.send({
      from: Config.resend.fromEmail,
      to: callback.email,
      replyTo: Config.resend.replyTo,
      subject: 'Callback Request Confirmed - Harbonline',
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending callback confirmation email:', error);
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
    console.error('Error in send-callback-confirmation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
