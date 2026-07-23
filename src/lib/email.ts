import 'server-only';

import { escapeHtml } from './output';

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim() || '';
const FROM_EMAIL = process.env.FROM_EMAIL?.trim() || 'Sahayata <noreply@sahayata.org>';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('[EMAIL] Delivery is disabled because RESEND_API_KEY is not configured.');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html, text: text || subject }),
    });
    return response.ok;
  } catch {
    console.error('[EMAIL] Delivery failed.');
    return false;
  }
}

export async function sendOTPEmail(to: string, code: string, locale: 'en' | 'hi' = 'en'): Promise<boolean> {
  const safeCode = escapeHtml(code);
  const subject = locale === 'hi'
    ? 'सहायता — आपका सत्यापन कोड'
    : 'Sahayata — Your verification code';
  const explanation = locale === 'hi'
    ? 'यह कोड 10 मिनट में समाप्त हो जाएगा। इसे किसी के साथ साझा न करें।'
    : 'This code expires in 10 minutes. Do not share it with anyone.';

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:400px;margin:0 auto;padding:24px">
      <h1 style="font-size:24px;font-weight:900;border-bottom:3px solid #000;padding-bottom:12px">SAHAYATA</h1>
      <p>${locale === 'hi' ? 'आपका सत्यापन कोड:' : 'Your verification code:'}</p>
      <div style="background:#FBBF24;border:3px solid #000;padding:16px;text-align:center;font-size:32px;font-weight:900;letter-spacing:8px;font-family:monospace">${safeCode}</div>
      <p style="font-size:14px;color:#525252">${explanation}</p>
    </div>`;

  return sendEmail({ to, subject, html, text: `${subject}\n\n${code}\n\n${explanation}` });
}

export async function sendResponseNotification(
  posterEmail: string,
  _responderContact: string,
  _responderMessage: string,
  _postDescription: string,
  locale: 'en' | 'hi' = 'en'
): Promise<boolean> {
  const subject = locale === 'hi'
    ? 'सहायता — किसी ने आपकी पोस्ट का जवाब दिया!'
    : 'Sahayata — Someone responded to your post!';
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:500px;margin:0 auto;padding:24px">
      <h1 style="font-size:24px;font-weight:900;border-bottom:3px solid #000;padding-bottom:12px">SAHAYATA</h1>
      <p style="font-weight:bold">${locale === 'hi' ? 'आपकी पोस्ट पर एक निजी जवाब आया है।' : 'Your post has a private response.'}</p>
      <p>${locale === 'hi' ? 'संपर्क और संदेश देखने के लिए उसी डिवाइस पर Sahayata में “मेरी पोस्ट” खोलें। ईमेल से निजी जानकारी साझा न करें।' : 'Open “My posts” in Sahayata on the same device to review the contact and message. Do not share private details by email.'}</p>
    </div>`;

  const text = locale === 'hi'
    ? `${subject}\n\nउसी डिवाइस पर Sahayata में “मेरी पोस्ट” खोलें।`
    : `${subject}\n\nOpen “My posts” in Sahayata on the same device.`;
  return sendEmail({ to: posterEmail, subject, html, text });
}
