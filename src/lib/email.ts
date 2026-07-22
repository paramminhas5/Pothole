// Email service abstraction
// Uses Resend (free tier: 100 emails/day) or any SMTP provider
// For production, swap with your preferred email provider

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Sahayata <noreply@sahayata.org>';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log('[EMAIL] No RESEND_API_KEY set. Email would have been sent to:', to);
    console.log('[EMAIL] Subject:', subject);
    return true; // Don't block flow in development
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        html,
        text: text || subject,
      }),
    });

    return res.ok;
  } catch (error) {
    console.error('[EMAIL] Failed to send:', error);
    return false;
  }
}

// OTP verification email
export async function sendOTPEmail(to: string, code: string, locale: 'en' | 'hi' = 'en'): Promise<boolean> {
  const subject = locale === 'hi'
    ? `सहायता — आपका सत्यापन कोड: ${code}`
    : `Sahayata — Your verification code: ${code}`;

  const html = locale === 'hi'
    ? `
      <div style="font-family: system-ui, sans-serif; max-width: 400px; margin: 0 auto; padding: 24px;">
        <h1 style="font-size: 24px; font-weight: 900; border-bottom: 3px solid #000; padding-bottom: 12px;">🤝 सहायता</h1>
        <p style="margin: 16px 0;">आपका सत्यापन कोड:</p>
        <div style="background: #FBBF24; border: 3px solid #000; padding: 16px; text-align: center; font-size: 32px; font-weight: 900; letter-spacing: 8px; font-family: monospace;">${code}</div>
        <p style="margin: 16px 0; font-size: 14px; color: #525252;">यह कोड 10 मिनट में समाप्त हो जाएगा। इसे किसी के साथ साझा न करें।</p>
        <p style="margin: 16px 0; font-size: 12px; color: #737373;">यदि आपने यह अनुरोध नहीं किया, तो इस ईमेल को अनदेखा करें।</p>
      </div>
    `
    : `
      <div style="font-family: system-ui, sans-serif; max-width: 400px; margin: 0 auto; padding: 24px;">
        <h1 style="font-size: 24px; font-weight: 900; border-bottom: 3px solid #000; padding-bottom: 12px;">🤝 SAHAYATA</h1>
        <p style="margin: 16px 0;">Your verification code:</p>
        <div style="background: #FBBF24; border: 3px solid #000; padding: 16px; text-align: center; font-size: 32px; font-weight: 900; letter-spacing: 8px; font-family: monospace;">${code}</div>
        <p style="margin: 16px 0; font-size: 14px; color: #525252;">This code expires in 10 minutes. Do not share it with anyone.</p>
        <p style="margin: 16px 0; font-size: 12px; color: #737373;">If you didn't request this, ignore this email.</p>
      </div>
    `;

  return sendEmail({ to, subject, html });
}

// Notification email when someone responds to a post
export async function sendResponseNotification(
  posterEmail: string,
  responderContact: string,
  responderMessage: string,
  postDescription: string,
  locale: 'en' | 'hi' = 'en'
): Promise<boolean> {
  const subject = locale === 'hi'
    ? 'सहायता — किसी ने आपकी पोस्ट का जवाब दिया!'
    : 'Sahayata — Someone responded to your post!';

  const html = locale === 'hi'
    ? `
      <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
        <h1 style="font-size: 24px; font-weight: 900; border-bottom: 3px solid #000; padding-bottom: 12px;">🤝 सहायता</h1>
        <p style="margin: 16px 0; font-weight: bold;">किसी ने आपकी पोस्ट का जवाब दिया है!</p>
        <div style="background: #f5f5f5; border: 2px solid #000; padding: 16px; margin: 16px 0;">
          <p style="font-size: 12px; color: #525252; margin: 0 0 8px;">आपकी पोस्ट:</p>
          <p style="margin: 0; font-size: 14px;">${postDescription.slice(0, 200)}${postDescription.length > 200 ? '...' : ''}</p>
        </div>
        <div style="background: #84CC16; border: 2px solid #000; padding: 16px; margin: 16px 0;">
          <p style="font-size: 12px; font-weight: bold; margin: 0 0 8px;">जवाब देने वाले का संपर्क:</p>
          <p style="margin: 0; font-size: 16px; font-weight: bold;">${responderContact}</p>
          ${responderMessage ? `<p style="margin: 8px 0 0; font-size: 14px; color: #333;">"${responderMessage}"</p>` : ''}
        </div>
        <p style="font-size: 12px; color: #737373; margin-top: 24px;">यह जानकारी केवल आपके लिए है। इसे सार्वजनिक रूप से साझा न करें।</p>
      </div>
    `
    : `
      <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
        <h1 style="font-size: 24px; font-weight: 900; border-bottom: 3px solid #000; padding-bottom: 12px;">🤝 SAHAYATA</h1>
        <p style="margin: 16px 0; font-weight: bold;">Someone responded to your post!</p>
        <div style="background: #f5f5f5; border: 2px solid #000; padding: 16px; margin: 16px 0;">
          <p style="font-size: 12px; color: #525252; margin: 0 0 8px;">Your post:</p>
          <p style="margin: 0; font-size: 14px;">${postDescription.slice(0, 200)}${postDescription.length > 200 ? '...' : ''}</p>
        </div>
        <div style="background: #84CC16; border: 2px solid #000; padding: 16px; margin: 16px 0;">
          <p style="font-size: 12px; font-weight: bold; margin: 0 0 8px;">Responder's contact:</p>
          <p style="margin: 0; font-size: 16px; font-weight: bold;">${responderContact}</p>
          ${responderMessage ? `<p style="margin: 8px 0 0; font-size: 14px; color: #333;">"${responderMessage}"</p>` : ''}
        </div>
        <p style="font-size: 12px; color: #737373; margin-top: 24px;">This information is for you only. Do not share publicly.</p>
      </div>
    `;

  return sendEmail({ to: posterEmail, subject, html });
}
