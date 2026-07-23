import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';

export default async function CommunicationPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8 flex justify-between items-start gap-4">
        <div>
          <h1 className="heading-display mb-2">{hi ? 'सुरक्षित संचार' : 'Secure Communication'}</h1>
          <p className="text-[var(--color-text-muted)]">{hi ? 'सही प्लेटफॉर्म। सही संरचना। सही नियम।' : 'Right platform. Right structure. Right rules.'}</p>
        </div>
        <PrintButton locale={locale} />
      </div>


      {/* PLATFORM COMPARISON */}
      <section className="brutal-card mb-8">
        <h2 className="heading-3 mb-4">{hi ? 'कौन सा प्लेटफॉर्म?' : 'Which Platform?'}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b text-left"><th className="pb-2 pr-2"></th><th className="pb-2 pr-2">Signal</th><th className="pb-2 pr-2">Telegram</th><th className="pb-2 pr-2">WhatsApp</th></tr></thead>
            <tbody>
              <tr><td className="py-1 pr-2 font-bold">{hi ? 'एन्क्रिप्शन' : 'Encryption'}</td><td className="py-1 pr-2">✅ {hi ? 'हमेशा' : 'Always'}</td><td className="py-1 pr-2">❌ {hi ? 'केवल Secret Chat' : 'Only Secret Chat'}</td><td className="py-1 pr-2">✅ {hi ? 'हमेशा' : 'Always'}</td></tr>
              <tr><td className="py-1 pr-2 font-bold">{hi ? 'फोन दिखता' : 'Phone visible'}</td><td className="py-1 pr-2">✅ {hi ? 'छिपा सकते' : 'Can hide'}</td><td className="py-1 pr-2">✅ {hi ? 'छिपा सकते' : 'Can hide'}</td><td className="py-1 pr-2">❌ {hi ? 'हमेशा' : 'Always'}</td></tr>
              <tr><td className="py-1 pr-2 font-bold">{hi ? 'ऑटो-डिलीट' : 'Auto-delete'}</td><td className="py-1 pr-2">✅ 1s-4w</td><td className="py-1 pr-2">✅ 1d-1y</td><td className="py-1 pr-2">✅ 24h-90d</td></tr>
              <tr><td className="py-1 pr-2 font-bold">{hi ? 'ग्रुप साइज' : 'Group size'}</td><td className="py-1 pr-2">1,000</td><td className="py-1 pr-2">200,000</td><td className="py-1 pr-2">1,024</td></tr>
              <tr><td className="py-1 pr-2 font-bold">{hi ? 'मेटाडेटा' : 'Metadata'}</td><td className="py-1 pr-2">{hi ? 'न्यूनतम' : 'Minimal'}</td><td className="py-1 pr-2">{hi ? 'बहुत' : 'Extensive'}</td><td className="py-1 pr-2">Meta</td></tr>
              <tr className="border-t font-bold"><td className="py-1 pr-2">{hi ? 'अनुशंसा' : 'Recommendation'}</td><td className="py-1 pr-2 text-green-700">★★★</td><td className="py-1 pr-2">★★</td><td className="py-1 pr-2">★</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3 text-[var(--color-text-muted)]">{hi ? 'संवेदनशील बातचीत: Signal। बड़ा ब्रॉडकास्ट: Telegram चैनल। बाकी: WhatsApp ठीक है।' : 'Sensitive conversations: Signal. Large broadcasts: Telegram channel. Everything else: WhatsApp is fine.'}</p>
      </section>

      {/* GROUP STRUCTURE */}
      <section className="brutal-card mb-8">
        <h2 className="heading-3 mb-4">{hi ? 'ग्रुप संरचना (4 चैनल)' : 'Group Structure (4 Channels)'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>1. {hi ? 'ब्रॉडकास्ट (एक-तरफ़ा)' : 'Broadcast (one-way)'}</strong><br/>{hi ? 'सिर्फ एडमिन पोस्ट करे। सत्यापित जानकारी। सबसे बड़ा ऑडियंस। Telegram Channel।' : 'Only admins post. Verified info. Largest audience. Telegram Channel.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>2. {hi ? 'समन्वय (छोटा, निर्णय)' : 'Coordination (small, decisions)'}</strong><br/>{hi ? '5-10 लीड्स। ऑटो-डिलीट ON। Signal ग्रुप।' : '5-10 leads. Auto-delete ON. Signal group.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>3. {hi ? 'खुला चर्चा (बड़ा)' : 'Open discussion (large)'}</strong><br/>{hi ? 'सामान्य समन्वय। मॉडरेटेड। कोई निजी जानकारी नहीं। WhatsApp/Telegram।' : 'General coordination. Moderated. No private info. WhatsApp/Telegram.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded border border-red-300"><strong>4. {hi ? '🚨 आपातकालीन (केवल सुरक्षा)' : '🚨 Emergency (safety only)'}</strong><br/>{hi ? 'तत्काल खतरा ही। बहुत कम संदेश। शोर नहीं।' : 'Immediate danger only. Very few messages. No noise.'}</div>
        </div>
      </section>

      {/* RULES */}
      <section className="brutal-card mb-8">
        <h2 className="heading-3 mb-4">{hi ? 'नियम (सब ग्रुप पर लागू)' : 'Rules (Apply to All Groups)'}</h2>
        <ul className="space-y-2 text-sm">
          <li>❌ {hi ? 'निजी फोन नंबर, पता, पहचान कभी ग्रुप में न भेजें।' : 'Never share private phone, address, identity in groups.'}</li>
          <li>❌ {hi ? 'सटीक लोकेशन न भेजें। "दक्षिण दिल्ली" ठीक है, "XYZ गली नं 5" नहीं।' : 'No precise locations. "South Delhi" OK, "XYZ Street No 5" not OK.'}</li>
          <li>⚠️ {hi ? 'अपुष्ट = "⚠️ अपुष्ट:" लगाएँ। तथ्य की तरह न भेजें।' : 'Unverified = prefix "⚠️ UNVERIFIED:". Don`t share as fact.'}</li>
          <li>✅ {hi ? 'गलती → उसी जगह सुधार: "⚠️ सुधार: पहले का संदेश गलत था।"' : 'Mistake → correction in same place: "⚠️ CORRECTION: earlier message was wrong."'}</li>
          <li>✅ {hi ? 'एक "सत्यापन प्रमुख" नियुक्त — बिना जाँचे कुछ शेयर नहीं।' : 'Designate "verification lead" — nothing shared without checking.'}</li>
          <li>❌ {hi ? 'स्क्रीनशॉट बाहर न ले जाएँ (बिना सहमति)।' : 'No screenshots outside (without consent).'}</li>
        </ul>
      </section>

      {/* INTERNET SHUTDOWN */}
      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-3 mb-4">{hi ? '🚫 इंटरनेट शटडाउन में' : '🚫 During Internet Shutdown'}</h2>
        <div className="space-y-2 text-sm">
          <p className="font-bold">{hi ? 'पहले से तैयार रहें। शटडाउन होने के बाद बहुत देर है।' : 'Prepare in advance. After shutdown happens it`s too late.'}</p>
          <ul className="space-y-1">
            <li>→ <strong>VPN:</strong> ProtonVPN ({hi ? 'मुफ्त' : 'free'}) / Psiphon — {hi ? 'पहले से इंस्टॉल करें' : 'install BEFORE shutdown'}</li>
            <li>→ <strong>Briar:</strong> briarproject.org — {hi ? 'Bluetooth/WiFi से मैसेज, बिना इंटरनेट' : 'Messages via Bluetooth/WiFi, no internet needed'}</li>
            <li>→ <strong>SMS:</strong> {hi ? 'पूर्व-तय कोडवर्ड + भरोसेमंद नंबर (जैसे "चाय पीने चलें" = "सुरक्षित हूँ")' : 'Pre-set codewords + trusted numbers (e.g., "let`s get tea" = "I am safe")'}</li>
            <li>→ <strong>Sahayata:</strong> {hi ? 'ऑफलाइन काम करता है — गाइड, टेम्पलेट कैश्ड' : 'Works offline — guides, templates cached'}</li>
            <li>→ <strong>{hi ? 'रेडियो:' : 'Radio:'}</strong> {hi ? 'स्थानीय FM अक्सर बुनियादी अपडेट देते हैं।' : 'Local FM often gives basic updates.'}</li>
          </ul>
        </div>
      </section>

      {/* COMPROMISED */}
      <section className="brutal-card mb-8">
        <h2 className="heading-3 mb-4">{hi ? 'ग्रुप समझौता हो गया?' : 'Group Compromised?'}</h2>
        <div className="text-sm space-y-2">
          <p><strong>{hi ? 'संकेत:' : 'Signs:'}</strong> {hi ? 'अजीब सवाल, जानकारी लीक, स्क्रीनशॉट बाहर, अज्ञात व्यक्ति।' : 'Unusual questions, info leaks, screenshots outside, unknown persons.'}</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>{hi ? 'नया ग्रुप बनाएँ (अलग प्लेटफॉर्म/नाम)।' : 'Create new group (different platform/name).'}</li>
            <li>{hi ? 'सत्यापित सदस्यों को व्यक्तिगत रूप से आमंत्रित।' : 'Invite verified members individually.'}</li>
            <li>{hi ? 'पुराने ग्रुप में घोषणा न करें।' : 'Do NOT announce in old group.'}</li>
            <li>{hi ? 'पासवर्ड, ईमेल बदलें।' : 'Change passwords, emails.'}</li>
          </ol>
        </div>
      </section>

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/organize" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'संगठन गाइड →' : 'ORGANIZE GUIDE →'}</Link>
        <Link href="/safety" className="brutal-btn brutal-btn-lg text-center">{hi ? 'अधिकार →' : 'RIGHTS →'}</Link>
        <Link href="/alerts" className="brutal-btn brutal-btn-lg text-center">{hi ? 'सूचना जाँच →' : 'INFO VERIFY →'}</Link>
      </div>
    </div>
  );
}
