import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function GroupsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">
          {hi ? 'एन्क्रिप्टेड ग्रुप समन्वय' : 'Encrypted Group Coordination'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {hi ? 'ग्रुप बनाएँ, रियल-टाइम एन्क्रिप्टेड संदेश भेजें, भूमिकाएँ बाँटें, कार्य ट्रैक करें।' : 'Create groups, send real-time encrypted messages, assign roles, track tasks.'}
        </p>
      </div>

      {/* COMING SOON - Feature placeholder */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'यह कैसे काम करता है' : 'How This Works'}</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3 items-start">
            <span className="font-bold text-lg">1.</span>
            <div><strong>{hi ? 'ग्रुप बनाएँ' : 'Create a Group'}</strong><p>{hi ? 'नाम और पासफ़्रेज़ चुनें। पासफ़्रेज़ ही एन्क्रिप्शन की चाबी है।' : 'Choose name and passphrase. The passphrase IS the encryption key.'}</p></div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-bold text-lg">2.</span>
            <div><strong>{hi ? 'साथियों को आमंत्रित करें' : 'Invite Comrades'}</strong><p>{hi ? 'जॉइन लिंक + पासफ़्रेज़ शेयर करें (Signal/मिलकर — यहाँ नहीं)।' : 'Share join link + passphrase (via Signal/in-person — not here).'}</p></div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-bold text-lg">3.</span>
            <div><strong>{hi ? 'एन्क्रिप्टेड संवाद' : 'Encrypted Communication'}</strong><p>{hi ? 'AES-256-GCM। ब्राउज़र में एन्क्रिप्ट। सर्वर सिफरटेक्स्ट देखता है।' : 'AES-256-GCM. Encrypted in browser. Server sees ciphertext.'}</p></div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="font-bold text-lg">4.</span>
            <div><strong>{hi ? 'एफ़ेमरल मैसेज' : 'Ephemeral Messages'}</strong><p>{hi ? 'रियल-टाइम संदेश डेटाबेस में स्टोर नहीं होते। सत्र समाप्त = संदेश गायब।' : 'Real-time messages not stored in database. Session ends = messages gone.'}</p></div>
          </div>
        </div>
      </section>

      {/* SECURITY MODEL */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'सुरक्षा मॉडल' : 'Security Model'}</h2>
        <ul className="space-y-2 text-sm">
          <li>✓ {hi ? 'क्लाइंट-साइड एन्क्रिप्शन (Web Crypto API, AES-256-GCM)' : 'Client-side encryption (Web Crypto API, AES-256-GCM)'}</li>
          <li>✓ {hi ? 'सर्वर कभी प्लेनटेक्स्ट नहीं देखता' : 'Server never sees plaintext'}</li>
          <li>✓ {hi ? 'कोई अकाउंट नहीं — सेशन + पासफ़्रेज़ = एक्सेस' : 'No accounts — session + passphrase = access'}</li>
          <li>✓ {hi ? 'रियल-टाइम मैसेज: Supabase Broadcast (एफ़ेमरल, DB में नहीं)' : 'Real-time messages: Supabase Broadcast (ephemeral, not in DB)'}</li>
          <li>✓ {hi ? 'पिन किए गए संदेश: एन्क्रिप्टेड स्टोर (पासफ़्रेज़ से ही खुलें)' : 'Pinned messages: encrypted store (only opens with passphrase)'}</li>
          <li>✓ {hi ? 'ऑटो-एक्सपायर विकल्प: ग्रुप तय समय बाद स्वतः विघटित' : 'Auto-expire option: group auto-dissolves after set time'}</li>
          <li>✓ {hi ? 'सर्वर ज़ब्त हो → डेटा अपठनीय (बिना पासफ़्रेज़ के)' : 'Server seized → data unreadable (without passphrase)'}</li>
        </ul>
      </section>

      {/* FEATURE COMING SOON */}
      <section className="brutal-card mb-8 !border-[var(--color-primary)]">
        <h2 className="heading-2 mb-4">{hi ? 'ग्रुप फीचर शीघ्र आ रहा है' : 'Group Feature Coming Soon'}</h2>
        <p className="text-sm mb-4">{hi ? 'एन्क्रिप्टेड ग्रुप इंटरफेस विकास में है। अभी उपलब्ध:' : 'The encrypted group interface is under development. Currently available:'}</p>
        <div className="space-y-2 text-sm">
          <p>→ {hi ? 'संगठन गाइड — ग्रुप कैसे बनाएँ और चलाएँ' : 'Organizing Guide — how to form and run groups'}</p>
          <p>→ {hi ? 'संचार गाइड — सुरक्षित प्लेटफ़ॉर्म तुलना और सेटअप' : 'Communication Guide — secure platform comparison and setup'}</p>
          <p>→ {hi ? 'सपोर्ट डायरेक्टरी — मौजूदा ग्रुप खोजें' : 'Support Directory — find existing groups'}</p>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/organize" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'संगठन गाइड →' : 'ORGANIZE GUIDE →'}</Link>
        <Link href="/communication" className="brutal-btn brutal-btn-lg text-center">{hi ? 'संचार गाइड →' : 'COMMS GUIDE →'}</Link>
        <Link href="/directory" className="brutal-btn brutal-btn-lg text-center">{hi ? 'डायरेक्टरी →' : 'DIRECTORY →'}</Link>
      </div>
    </div>
  );
}
