import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function CommunicationPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">{hi ? 'सुरक्षित संचार और समन्वय' : 'Secure Communication & Coordination'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'सही प्लेटफॉर्म चुनें, ग्रुप बनाएँ, सुरक्षित रहें।' : 'Choose the right platform, set up groups, stay safe.'}</p>
      </div>


      {/* PLATFORM COMPARISON */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'प्लेटफॉर्म तुलना' : 'Platform Comparison'}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b text-left"><th className="pb-2 pr-3"></th><th className="pb-2 pr-3">Signal</th><th className="pb-2 pr-3">Telegram</th><th className="pb-2 pr-3">WhatsApp</th><th className="pb-2">Sahayata</th></tr></thead>
            <tbody>
              <tr><td className="py-2 pr-3 font-bold">{hi ? 'E2E एन्क्रिप्शन' : 'E2E Encryption'}</td><td className="py-2 pr-3">✓ {hi ? 'हमेशा' : 'Always'}</td><td className="py-2 pr-3">✗ {hi ? 'केवल Secret Chat' : 'Only Secret Chat'}</td><td className="py-2 pr-3">✓ {hi ? 'हमेशा' : 'Always'}</td><td className="py-2">✓ AES-256-GCM</td></tr>
              <tr><td className="py-2 pr-3 font-bold">{hi ? 'ऑटो-डिलीट' : 'Auto-delete'}</td><td className="py-2 pr-3">✓ 1s-4w</td><td className="py-2 pr-3">✓ 1d-1y</td><td className="py-2 pr-3">✓ 24h/7d/90d</td><td className="py-2">✓ {hi ? 'एफ़ेमरल' : 'Ephemeral'}</td></tr>
              <tr><td className="py-2 pr-3 font-bold">{hi ? 'ग्रुप साइज' : 'Group size'}</td><td className="py-2 pr-3">1,000</td><td className="py-2 pr-3">200,000</td><td className="py-2 pr-3">1,024</td><td className="py-2">{hi ? 'असीमित' : 'Unlimited'}</td></tr>
              <tr><td className="py-2 pr-3 font-bold">{hi ? 'फोन # दिखता है' : 'Phone # visible'}</td><td className="py-2 pr-3">✗ {hi ? 'छिपा सकते हैं' : 'Can hide'}</td><td className="py-2 pr-3">✗ {hi ? 'छिपा सकते हैं' : 'Can hide'}</td><td className="py-2 pr-3">✓ {hi ? 'हमेशा' : 'Always'}</td><td className="py-2">✗ {hi ? 'कोई फोन नहीं' : 'No phone needed'}</td></tr>
              <tr><td className="py-2 pr-3 font-bold">{hi ? 'मेटाडेटा' : 'Metadata'}</td><td className="py-2 pr-3">{hi ? 'न्यूनतम' : 'Minimal'}</td><td className="py-2 pr-3">{hi ? 'बहुत' : 'Extensive'}</td><td className="py-2 pr-3">{hi ? 'Meta को' : 'To Meta'}</td><td className="py-2">{hi ? 'शून्य' : 'Zero'}</td></tr>
              <tr className="border-t"><td className="py-2 pr-3 font-bold">{hi ? 'अनुशंसा' : 'Recommendation'}</td><td className="py-2 pr-3 font-bold text-green-700">★★★</td><td className="py-2 pr-3">★★</td><td className="py-2 pr-3">★</td><td className="py-2 font-bold text-green-700">★★★</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3">{hi ? 'सबसे सुरक्षित: Signal (बाहरी) + Sahayata Groups (मंच पर)। Telegram बड़े ब्रॉडकास्ट के लिए। WhatsApp अंतिम विकल्प।' : 'Safest: Signal (external) + Sahayata Groups (on-platform). Telegram for large broadcasts. WhatsApp as last resort.'}</p>
      </section>

      {/* GROUP SETUP */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'ग्रुप संरचना' : 'Group Structure'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '1. ब्रॉडकास्ट चैनल (एक-तरफ़ा)' : '1. Broadcast Channel (one-way)'}</strong>
            <p>{hi ? 'केवल सत्यापित जानकारी। एडमिन ही भेज सकते हैं। सबसे बड़ा ऑडियंस।' : 'Verified information only. Only admins can post. Largest audience.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '2. समन्वय ग्रुप (छोटा, निर्णय)' : '2. Coordination Group (small, decisions)'}</strong>
            <p>{hi ? '5-10 लीड्स। निर्णय यहाँ होते हैं। ऑटो-डिलीट चालू। Sahayata Encrypted Group या Signal।' : '5-10 leads. Decisions happen here. Auto-delete on. Sahayata Encrypted Group or Signal.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '3. खुला चर्चा ग्रुप (बड़ा, मॉडरेटेड)' : '3. Open Discussion Group (large, moderated)'}</strong>
            <p>{hi ? 'सामान्य समन्वय। मॉडरेशन नियम। कोई निजी जानकारी नहीं।' : 'General coordination. Moderation rules. No private information.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded !border-[var(--color-red)] border">
            <strong>{hi ? '4. आपातकालीन चैनल (केवल सुरक्षा)' : '4. Emergency Channel (safety only)'}</strong>
            <p>{hi ? 'तत्काल सुरक्षा अलर्ट। बहुत कम संदेश। शोर नहीं।' : 'Immediate safety alerts. Very few messages. No noise.'}</p>
          </div>
        </div>
      </section>

      {/* PROTOCOLS */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'संचार प्रोटोकॉल' : 'Communication Protocols'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'निजी जानकारी कभी ग्रुप में न भेजें (फोन, पता, पहचान)।' : 'Never share private info in groups (phone, address, identity).'}</li>
          <li>→ {hi ? 'सटीक लोकेशन न भेजें। "दक्षिण दिल्ली" ठीक है, "XYZ गली नं 5" नहीं।' : 'Do not share precise locations. "South Delhi" is OK, "XYZ Street No 5" is not.'}</li>
          <li>→ {hi ? 'अपुष्ट जानकारी लेबल करें: "⚠️ अपुष्ट: ..."' : 'Label unverified info: "⚠️ UNVERIFIED: ..."'}</li>
          <li>→ {hi ? 'गलती हो → उसी जगह स्पष्ट सुधार: "⚠️ सुधार: पहले का संदेश गलत था..."' : 'Mistake → clear correction in same place: "⚠️ CORRECTION: earlier message was wrong..."'}</li>
          <li>→ {hi ? 'एक "सत्यापन प्रमुख" नियुक्त करें — जानकारी साझा करने से पहले जाँचे।' : 'Designate a "verification lead" — checks info before sharing.'}</li>
          <li>→ {hi ? 'स्क्रीनशॉट नियम: ग्रुप की बातें बाहर न ले जाएँ (जब तक सहमति न हो)।' : 'Screenshot rule: do not take group conversations outside (unless agreed).'}</li>
        </ul>
      </section>

      {/* IF COMPROMISED */}
      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">{hi ? 'अगर ग्रुप समझौता हो जाए' : 'If Your Group Is Compromised'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'संकेत: अजीब सवाल, जानकारी लीक, स्क्रीनशॉट बाहर दिख रहे।' : 'Signs: unusual questions, info leaks, screenshots appearing outside.'}</li>
          <li>→ {hi ? 'नया ग्रुप बनाएँ। सत्यापित सदस्यों को व्यक्तिगत रूप से आमंत्रित करें।' : 'Create new group. Invite verified members individually.'}</li>
          <li>→ {hi ? 'पुराने ग्रुप में घोषणा न करें। चुपचाप बदलें।' : 'Do NOT announce in old group. Switch silently.'}</li>
          <li>→ {hi ? 'Sahayata Encrypted Group: नया पासफ़्रेज़ → नया ग्रुप। पुराना स्वतः बेकार।' : 'Sahayata Encrypted Group: new passphrase → new group. Old becomes useless.'}</li>
        </ul>
      </section>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Link href="/groups" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'एन्क्रिप्टेड ग्रुप बनाएँ →' : 'CREATE ENCRYPTED GROUP →'}</Link>
        <Link href="/organize" className="brutal-btn brutal-btn-lg text-center">{hi ? 'संगठन गाइड →' : 'ORGANIZING GUIDE →'}</Link>
      </div>
    </div>
  );
}
