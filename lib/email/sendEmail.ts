import { Resend } from 'resend';
import { render } from '@react-email/render';
import { ContactFormEmail } from './templates/contactFormEmail';
import { ThankYouEmail } from './templates/thankYouEmail';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Email send result interface
export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send contact form email to admin
 * @param data - Contact form data
 * @returns Promise with send result
 */
export async function sendContactFormEmail(
  data: ContactFormData
): Promise<EmailSendResult> {
  try {
    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    if (!process.env.CONTACT_EMAIL) {
      throw new Error('CONTACT_EMAIL is not configured');
    }

    // Log the email attempt
    console.log('Sending contact form email:', {
      from: data.name,
      email: data.email,
      timestamp: new Date().toISOString(),
    });

    // Render email template
    const emailHtml = render(ContactFormEmail(data));

    // Send email using Resend
    const { data: result, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'LigaDeals <noreply@ligadeals-berlin.com>',
      to: process.env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `הודעה חדשה מ-${data.name} - LigaDeals Berlin`,
      html: emailHtml,
      tags: [
        {
          name: 'category',
          value: 'contact-form',
        },
      ],
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    console.log('Contact form email sent successfully:', result?.id);

    return {
      success: true,
      messageId: result?.id,
    };
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send thank you auto-reply email to customer
 * @param data - Contact form data
 * @returns Promise with send result
 */
export async function sendThankYouEmail(
  data: ContactFormData
): Promise<EmailSendResult> {
  try {
    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    // Log the email attempt
    console.log('Sending thank you email to:', data.email);

    // Render email template
    const emailHtml = render(ThankYouEmail(data));

    // Send email using Resend
    const { data: result, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'LigaDeals <noreply@ligadeals-berlin.com>',
      to: data.email,
      subject: 'תודה שפנית אלינו - LigaDeals Berlin 🙏',
      html: emailHtml,
      tags: [
        {
          name: 'category',
          value: 'thank-you',
        },
      ],
    });

    if (error) {
      console.error('Resend API error (thank you email):', error);
      return {
        success: false,
        error: error.message || 'Failed to send thank you email',
      };
    }

    console.log('Thank you email sent successfully:', result?.id);

    return {
      success: true,
      messageId: result?.id,
    };
  } catch (error) {
    console.error('Error sending thank you email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send both contact form and thank you emails
 * @param data - Contact form data
 * @returns Promise with send results for both emails
 */
export async function sendContactEmails(data: ContactFormData): Promise<{
  contactFormEmail: EmailSendResult;
  thankYouEmail: EmailSendResult;
}> {
  try {
    // Send both emails in parallel
    const [contactFormResult, thankYouResult] = await Promise.allSettled([
      sendContactFormEmail(data),
      sendThankYouEmail(data),
    ]);

    return {
      contactFormEmail:
        contactFormResult.status === 'fulfilled'
          ? contactFormResult.value
          : { success: false, error: 'Promise rejected' },
      thankYouEmail:
        thankYouResult.status === 'fulfilled'
          ? thankYouResult.value
          : { success: false, error: 'Promise rejected' },
    };
  } catch (error) {
    console.error('Error sending contact emails:', error);
    throw error;
  }
}

/**
 * Test email configuration
 * @returns Promise with test result
 */
export async function testEmailConfig(): Promise<{
  configured: boolean;
  issues: string[];
}> {
  const issues: string[] = [];

  // Check API key
  if (!process.env.RESEND_API_KEY) {
    issues.push('RESEND_API_KEY is not set');
  } else if (!process.env.RESEND_API_KEY.startsWith('re_')) {
    issues.push('RESEND_API_KEY format appears invalid');
  }

  // Check contact email
  if (!process.env.CONTACT_EMAIL) {
    issues.push('CONTACT_EMAIL is not set');
  }

  // Check from email
  if (!process.env.RESEND_FROM_EMAIL) {
    issues.push('RESEND_FROM_EMAIL is not set (will use default)');
  }

  return {
    configured: issues.length === 0,
    issues,
  };
}
