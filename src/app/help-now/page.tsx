import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function HelpNowPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'असली मदद — अभी' : 'Real Help — Now'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'ये सरकारी हेल्पलाइन नहीं हैं। ये असली लोग और संगठन हैं जो प्रदर्शनकारियों की मदद करते हैं।' : 'These are NOT government helplines. These are real people and organizations that help protesters.'}</p>
      </div>

      <section className="brutal-card mb-6 !border-[var(--color-accent)]">
        <h2 className="heading-2 mb-3">{hi ? '⚖️ वकील (जो वाकई आएँगे)' : '⚖️ Lawyers (Who Will Actually Come)'}</h2>
        <div className="space-y-3 text-sm">
          <a href="tel:1516" className="block p-3 bg-[var(--color-surface-alt)] rounded hover:border-[var(--color-accent)] border border-transparent"><strong>DSLSA — 1516</strong> (24/7, {hi ? 'मुफ्त, दिल्ली' : 'free, Delhi'})<br/>{hi ? 'सरकारी लेकिन काम करता है। मुफ्त वकील 3 दिन में।' : 'Government but works. Free lawyer in 3 days.'}</a>
          <a href="https://hrln.org" target="_blank" rel="noopener noreferrer" className="block p-3 bg-[var(--color-surface-alt)] rounded hover:border-[var(--color-accent)] border border-transparent"><strong>HRLN</strong> — hrln.org ({hi ? '26 राज्य, 200+ वकील, pro-bono' : '26 states, 200+ lawyers, pro-bono'})<br/>{hi ? 'गिरफ्तारी, पुलिस बर्बरता, PIL — तुरंत कानूनी मदद।' : 'Arrests, police brutality, PIL — immediate legal help.'}</a>
          <a href="https://pudr.org" target="_blank" rel="noopener noreferrer" className="block p-3 bg-[var(--color-surface-alt)] rounded hover:border-[var(--color-accent)] border border-transparent"><strong>PUDR</strong> — pudr.org ({hi ? 'दिल्ली, तथ्य-अन्वेषण' : 'Delhi, fact-finding'})<br/>{hi ? 'लोकतांत्रिक अधिकार, तथ्य-अन्वेषण रिपोर्ट, पुलिस जवाबदेही।' : 'Democratic rights, fact-finding reports, police accountability.'}</a>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'और वकील:' : 'More lawyers:'}</strong> <Link href="/resources#legal" className="text-[var(--color-accent)] underline">{hi ? 'पूरी सूची →' : 'Full list →'}</Link> {hi ? 'या' : 'or'} <Link href="/submit" className="text-[var(--color-accent)] underline">{hi ? 'वकील जोड़ें →' : 'Add a lawyer →'}</Link></div>
        </div>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-3">{hi ? '🏥 चिकित्सा सहायता (प्रदर्शन-अनुकूल)' : '🏥 Medical Help (Protest-Friendly)'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'MLC के लिए अस्पताल (दिल्ली — जंतर मंतर के पास):' : 'Hospitals for MLC (Delhi — near Jantar Mantar):'}</strong><br/>• RML Hospital — 1.5km — <a href="tel:01123404567" className="text-[var(--color-accent)]">011-23404567</a><br/>• Lady Hardinge — 2km — <a href="tel:01123408295" className="text-[var(--color-accent)]">011-23408295</a><br/>• LNJP — 3km — <a href="tel:01123231904" className="text-[var(--color-accent)]">011-23231904</a></div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'स्ट्रीट मेडिक्स:' : 'Street Medics:'}</strong> <Link href="/submit" className="text-[var(--color-accent)] underline">{hi ? 'अगर आप ट्रेन्ड मेडिक हैं → रजिस्टर करें' : 'If you\'re a trained medic → register'}</Link></div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'मानसिक स्वास्थ्य (विरोध के बाद):' : 'Mental health (after protest):'}</strong><br/>• iCall: <a href="tel:9152987821" className="text-[var(--color-accent)]">9152987821</a> ({hi ? 'सोम-शनि' : 'Mon-Sat'})<br/>• Vandrevala: <a href="tel:9999666555" className="text-[var(--color-accent)]">9999666555</a> (24/7)</div>
        </div>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-3">{hi ? '🔒 सुरक्षित स्थान' : '🔒 Safe Spaces'}</h2>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Gurdwara Bangla Sahib</strong> — {hi ? 'कनॉट प्लेस, 24/7 खुला, भोजन + पानी + आश्रय' : 'Connaught Place, 24/7 open, food + water + shelter'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Gurdwara Sis Ganj Sahib</strong> — {hi ? 'चाँदनी चौक, 24/7 खुला' : 'Chandni Chowk, 24/7 open'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">{hi ? 'और सुरक्षित स्थान:' : 'More safe spaces:'} <Link href="/submit" className="text-[var(--color-accent)] underline">{hi ? 'अगर आपकी दुकान/जगह उपलब्ध है → जोड़ें' : 'If your shop/space is available → add it'}</Link></div>
        </div>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-3">{hi ? '📶 मुफ्त WiFi + चार्जिंग' : '📶 Free WiFi + Charging'}</h2>
        <div className="space-y-2 text-sm">
          <p>{hi ? 'प्रदर्शन स्थलों के पास दुकानें/कैफे जो मुफ्त WiFi और चार्जिंग देते हैं:' : 'Shops/cafes near protest sites offering free WiFi and charging:'}</p>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">{hi ? 'अभी कोई सत्यापित स्थान नहीं।' : 'No verified locations yet.'} <Link href="/submit" className="text-[var(--color-accent)] underline">{hi ? 'अगर आपकी दुकान मदद कर सकती है → जोड़ें' : 'If your shop can help → add it'}</Link></div>
        </div>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-3">{hi ? '🚗 परिवहन (अगर फंस गए)' : '🚗 Transport (If Stuck)'}</h2>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">{hi ? 'स्वयंसेवक ड्राइवर, ऑटो पूल, वैकल्पिक मार्ग:' : 'Volunteer drivers, auto pools, alternate routes:'} <Link href="/submit" className="text-[var(--color-accent)] underline">{hi ? 'अगर आप सवारी दे सकते हैं → रजिस्टर करें' : 'If you can offer rides → register'}</Link></div>
          <p className="text-xs text-[var(--color-text-muted)]">{hi ? '💡 मेट्रो बंद हो? @OfficialDMRC (X) पर चेक करें।' : '💡 Metro closed? Check @OfficialDMRC on X.'}</p>
        </div>
      </section>

      <div className="brutal-card mb-6 !border-[var(--color-lime)]">
        <h2 className="heading-3 mb-2">{hi ? '🤝 आप मदद कर सकते हैं' : '🤝 You Can Help'}</h2>
        <p className="text-sm mb-3">{hi ? 'वकील, डॉक्टर, दुकानदार, ड्राइवर — अगर आप मदद कर सकते हैं, रजिस्टर करें। समीक्षा के बाद यहाँ दिखेगा।' : 'Lawyers, doctors, shop owners, drivers — if you can help, register. Shows here after review.'}</p>
        <Link href="/submit" className="brutal-btn brutal-btn-primary">{hi ? 'मैं मदद कर सकता/सकती हूँ →' : 'I Can Help →'}</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/safety" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'अधिकार →' : 'RIGHTS →'}</Link>
        <Link href="/protest-mode" className="brutal-btn brutal-btn-lg text-center">{hi ? 'प्रोटेस्ट मोड →' : 'PROTEST MODE →'}</Link>
        <Link href="/buddy" className="brutal-btn brutal-btn-lg text-center">{hi ? 'बडी सिस्टम →' : 'BUDDY →'}</Link>
      </div>
    </div>
  );
}
