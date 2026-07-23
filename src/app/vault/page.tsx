import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function VaultPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">{hi ? 'एविडेंस वॉल्ट' : 'Evidence Vault'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'फोटो/वीडियो/दस्तावेज़ एन्क्रिप्ट करें, स्टोर करें, छेड़छाड़-प्रमाण बनाएँ।' : 'Encrypt photos/videos/documents, store them, create tamper-proof evidence.'}</p>
        <div className="brutal-banner mt-4 text-xs">🔒 {hi ? 'ब्राउज़र में AES-256-GCM एन्क्रिप्शन। सर्वर कभी प्लेनटेक्स्ट नहीं देखता।' : 'AES-256-GCM encryption in browser. Server never sees plaintext.'}</div>
      </div>
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'यह कैसे काम करता है' : 'How This Works'}</h2>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li><strong>{hi ? 'पासफ़्रेज़ चुनें' : 'Choose a passphrase'}</strong> — {hi ? 'यही एन्क्रिप्शन की चाबी है। याद रखें!' : 'This IS your encryption key. Remember it!'}</li>
          <li><strong>{hi ? 'फाइल अपलोड करें' : 'Upload file'}</strong> — {hi ? 'फोटो, वीडियो, PDF, दस्तावेज़' : 'Photos, videos, PDFs, documents'}</li>
          <li><strong>{hi ? 'ब्राउज़र में एन्क्रिप्ट' : 'Encrypted in browser'}</strong> — {hi ? 'AES-256-GCM, PBKDF2 key derivation' : 'AES-256-GCM, PBKDF2 key derivation'}</li>
          <li><strong>{hi ? 'SHA-256 हैश' : 'SHA-256 hash'}</strong> — {hi ? 'ओरिजिनल फाइल का डिजिटल फिंगरप्रिंट = छेड़छाड़-प्रमाण' : 'Digital fingerprint of original = tamper evidence'}</li>
          <li><strong>{hi ? 'एन्क्रिप्टेड स्टोर' : 'Encrypted storage'}</strong> — {hi ? 'सर्वर पर सिफरटेक्स्ट। बिना पासफ़्रेज़ कोई नहीं खोल सकता।' : 'Ciphertext on server. Nobody can open without passphrase.'}</li>
          <li><strong>{hi ? 'डाउनलोड' : 'Download'}</strong> — {hi ? 'पासफ़्रेज़ डालें → डिक्रिप्ट → ओरिजिनल फाइल' : 'Enter passphrase → decrypt → original file'}</li>
        </ol>
      </section>
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'सुरक्षा मॉडल' : 'Security Model'}</h2>
        <ul className="space-y-2 text-sm">
          <li>✓ {hi ? 'Web Crypto API — ब्राउज़र-नेटिव, कोई बाहरी लाइब्रेरी नहीं' : 'Web Crypto API — browser-native, no external libraries'}</li>
          <li>✓ {hi ? 'PBKDF2 100,000 iterations — brute-force कठिन' : 'PBKDF2 100,000 iterations — brute-force resistant'}</li>
          <li>✓ {hi ? 'प्रति-फाइल अद्वितीय salt और IV' : 'Per-file unique salt and IV'}</li>
          <li>✓ {hi ? 'पासफ़्रेज़ कभी सर्वर पर नहीं भेजा जाता' : 'Passphrase never sent to server'}</li>
          <li>✓ {hi ? 'SHA-256 हैश अलग से स्टोर = छेड़छाड़ पहचान' : 'SHA-256 hash stored separately = tamper detection'}</li>
          <li>✗ {hi ? 'पासफ़्रेज़ भूल गए = कोई रिकवरी नहीं (by design)' : 'Forget passphrase = no recovery (by design)'}</li>
        </ul>
      </section>
      <section className="brutal-card mb-8 !border-[var(--color-primary)]">
        <h2 className="heading-2 mb-4">{hi ? 'फीचर विकास में है' : 'Feature Under Development'}</h2>
        <p className="text-sm">{hi ? 'एविडेंस वॉल्ट इंटरफेस जल्द आ रहा है। अभी सबूत सुरक्षित करने के लिए:' : 'Evidence Vault interface coming soon. To secure evidence now:'}</p>
        <ul className="text-sm mt-2 space-y-1">
          <li>→ {hi ? 'Google Drive / iCloud पर अपलोड करें (तुरंत बैकअप)' : 'Upload to Google Drive / iCloud (immediate backup)'}</li>
          <li>→ {hi ? 'ओरिजिनल फाइल कभी एडिट न करें' : 'Never edit original files'}</li>
          <li>→ {hi ? 'टाइमस्टैम्प और लोकेशन नोट करें' : 'Note timestamp and location'}</li>
        </ul>
        <Link href="/toolkit" className="text-link mt-3 inline-block">{hi ? 'एविडेंस लॉग टेम्पलेट →' : 'Evidence Log Template →'}</Link>
      </section>
    </div>
  );
}
