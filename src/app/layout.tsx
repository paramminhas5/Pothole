import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { Locale } from '@/types';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sahayata — Turn anger into organized power',
  description: 'Know your rights. File RTIs. Track demands. Hold institutions accountable. Civic action infrastructure for India.',
  manifest: '/manifest.json',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Sahayata',
  },
};

export const viewport: Viewport = { themeColor: '#1d4ed8', width: 'device-width', initialScale: 1 };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return (
    <html lang={locale} dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <a className="skip-link" href="#main-content">{locale === 'hi' ? 'मुख्य सामग्री पर जाएँ' : 'Skip to main content'}</a>
        <ServiceWorkerRegister />
        <Navbar locale={locale} />
        <aside className="prototype-banner" role="note">
          <div className="page-shell">
            <strong>{locale === 'hi' ? 'स्थिति:' : 'Status:'}</strong>{' '}
            {locale === 'hi'
              ? 'गाइड, RTI, FIR, अधिकार कार्ड — सब काम करते हैं। ग्रुप + अलर्ट सुरक्षा ऑडिट के बाद चालू होंगे।'
              : 'Guides, RTI, FIR, Rights Card — all functional. Groups + Alerts activate after security audit.'}
          </div>
        </aside>
        <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
