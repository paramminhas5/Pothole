import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function HowItWorksPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">
          {hi ? 'Sahayata कैसे काम करता है' : 'How Sahayata Works'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {hi ? 'यह 30 अलग-अलग उपकरण नहीं हैं। यह एक सिस्टम है। हर कदम अगले से जुड़ता है।'
            : 'This is not 30 separate tools. It is one system. Every step connects to the next.'}
        </p>
      </div>

      {/* THE CHAIN */}
      <div className="space-y-6">
        <section className="brutal-card" style={{ borderLeft: '6px solid var(--color-red)' }}>
          <h2 className="heading-3 mb-2">1. {hi ? 'अधिकार जानो' : 'Know Your Rights'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">{hi ? 'गिरफ्तार हों, रोके जाएँ, फोन ज़ब्त हो — ये 5 वाक्य आपकी सुरक्षा करेंगे।' : 'Arrested, stopped, phone seized — these 5 phrases protect you.'}</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/safety" className="brutal-btn brutal-btn-sm">{hi ? 'अधिकार कार्ड' : 'Rights Card'}</Link>
            <Link href="/glossary" className="brutal-btn brutal-btn-sm">{hi ? 'कानूनी शब्दावली' : 'Glossary'}</Link>
          </div>
        </section>

        <section className="brutal-card" style={{ borderLeft: '6px solid var(--color-yellow)' }}>
          <h2 className="heading-3 mb-2">2. {hi ? 'तैयार हो जाओ' : 'Get Prepared'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">{hi ? 'विरोध में जा रहे? बडी सेट करो। फोन तैयार करो। जानो कि पुलिस क्या करती है।' : 'Going to a protest? Set a buddy. Prepare your phone. Know what police do.'}</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/expect" className="brutal-btn brutal-btn-sm">{hi ? 'तैयारी गाइड' : 'Prep Guide'}</Link>
            <Link href="/buddy" className="brutal-btn brutal-btn-sm">{hi ? 'बडी सिस्टम' : 'Buddy System'}</Link>
            <Link href="/protest-mode" className="brutal-btn brutal-btn-sm">{hi ? 'प्रोटेस्ट मोड' : 'Protest Mode'}</Link>
            <Link href="/offline" className="brutal-btn brutal-btn-sm">{hi ? 'ऑफलाइन' : 'Offline'}</Link>
          </div>
        </section>

        <section className="brutal-card" style={{ borderLeft: '6px solid var(--color-accent)' }}>
          <h2 className="heading-3 mb-2">3. {hi ? 'कानूनी हथियार चलाओ' : 'Use Legal Weapons'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">{hi ? 'RTI: ₹10, 30 दिन, जवाब अनिवार्य। FIR: पुलिस मना नहीं कर सकती। माँग: सार्वजनिक जवाबदेही।' : 'RTI: ₹10, 30 days, response mandatory. FIR: police cannot refuse. Demand: public accountability.'}</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/rti" className="brutal-btn brutal-btn-sm">RTI</Link>
            <Link href="/rti/track" className="brutal-btn brutal-btn-sm">{hi ? 'RTI ट्रैकर' : 'RTI Tracker'}</Link>
            <Link href="/fir" className="brutal-btn brutal-btn-sm">FIR</Link>
            <Link href="/demands" className="brutal-btn brutal-btn-sm">{hi ? 'माँग ट्रैकर' : 'Demands'}</Link>
            <Link href="/representatives" className="brutal-btn brutal-btn-sm">{hi ? 'प्रतिनिधि' : 'Representatives'}</Link>
          </div>
        </section>

        <section className="brutal-card" style={{ borderLeft: '6px solid var(--color-lime)' }}>
          <h2 className="heading-3 mb-2">4. {hi ? 'संगठित हो जाओ' : 'Get Organized'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">{hi ? 'अकेले RTI < 10 ग्रुप एक साथ RTI। ग्रुप खोजो, बनाओ, कौशल से मदद करो।' : 'Solo RTI < 10 groups filing RTI together. Find groups, create them, contribute skills.'}</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/groups" className="brutal-btn brutal-btn-sm">{hi ? 'ग्रुप' : 'Groups'}</Link>
            <Link href="/contribute" className="brutal-btn brutal-btn-sm">{hi ? 'योगदान' : 'Contribute'}</Link>
            <Link href="/organize" className="brutal-btn brutal-btn-sm">{hi ? 'गाइड' : 'Guide'}</Link>
            <Link href="/map" className="brutal-btn brutal-btn-sm">{hi ? 'मैप' : 'Map'}</Link>
          </div>
        </section>

        <section className="brutal-card" style={{ borderLeft: '6px solid var(--color-accent-2)' }}>
          <h2 className="heading-3 mb-2">5. {hi ? 'सत्ता समझो, सत्ता लो' : 'Understand Power, Take Power'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">{hi ? 'आंदोलन कैसे जीतते हैं। व्यवस्था कैसे काम करती है। वार्ड कमेटी → विधायक → नीति।' : 'How movements win. How the system works. Ward committee → MLA → policy.'}</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/learn" className="brutal-btn brutal-btn-sm">{hi ? 'सत्ता कैसे' : 'How Power'}</Link>
            <Link href="/playbook" className="brutal-btn brutal-btn-sm">{hi ? 'एस्केलेशन' : 'Escalation'}</Link>
            <Link href="/governance" className="brutal-btn brutal-btn-sm">{hi ? 'स्कोरकार्ड' : 'Scorecard'}</Link>
          </div>
        </section>

        <section className="brutal-card" style={{ borderLeft: '6px solid var(--color-text)' }}>
          <h2 className="heading-3 mb-2">6. {hi ? 'मदद लो, मदद दो' : 'Get Help, Give Help'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">{hi ? 'वकील, मेडिक, सुरक्षित स्थान — असली लोग, सरकारी नंबर नहीं। आप भी जोड़ सकते हैं।' : 'Lawyers, medics, safe spaces — real people, not govt numbers. You can add yours too.'}</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/help-now" className="brutal-btn brutal-btn-sm">{hi ? 'मदद अभी' : 'Help Now'}</Link>
            <Link href="/resources" className="brutal-btn brutal-btn-sm">{hi ? 'संसाधन' : 'Resources'}</Link>
            <Link href="/submit" className="brutal-btn brutal-btn-sm">{hi ? 'जोड़ें' : 'Submit'}</Link>
          </div>
        </section>
      </div>

      {/* KEY POINTS */}
      <div className="brutal-card mt-8" style={{ background: 'var(--color-surface-alt)' }}>
        <h2 className="heading-3 mb-3">{hi ? 'ज़रूरी बातें' : 'Key Points'}</h2>
        <ul className="space-y-2 text-sm">
          <li>✓ {hi ? 'कोई अकाउंट नहीं चाहिए (लेकिन 6-शब्द पासफ्रेज़ से पहचान बना सकते हैं)' : 'No account needed (but you can create a 6-word passphrase identity)'}</li>
          <li>✓ {hi ? 'सब कुछ ऑफलाइन काम करता है (गाइड, टेम्पलेट, अधिकार कार्ड)' : 'Everything works offline (guides, templates, rights card)'}</li>
          <li>✓ {hi ? 'द्विभाषी: English + हिन्दी' : 'Bilingual: English + Hindi'}</li>
          <li>✓ {hi ? 'ओपन सोर्स — कोई भी कोड देख/सुधार सकता है' : 'Open source — anyone can inspect/improve the code'}</li>
          <li>✓ {hi ? '₹500/माह पर चलता है — कोई कॉर्पोरेट, कोई विज्ञापन, कोई ट्रैकिंग' : 'Runs on ₹500/mo — no corporate, no ads, no tracking'}</li>
          <li>✓ {hi ? 'सेंसरशिप-प्रतिरोधी — 5 मिरर, IPFS, Tor, ऑफलाइन' : 'Censorship-resistant — 5 mirrors, IPFS, Tor, offline'}</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <Link href="/start" className="brutal-btn brutal-btn-primary brutal-btn-lg">
          {hi ? 'मेरा एक्शन प्लान बनाओ →' : 'Get My Action Plan →'}
        </Link>
        <p className="text-xs text-[var(--color-text-muted)] mt-3">{hi ? '3 सवाल → आपकी स्थिति के लिए कस्टम अगले कदम' : '3 questions → custom next steps for your situation'}</p>
      </div>
    </div>
  );
}
