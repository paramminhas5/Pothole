import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function AlertsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">{hi ? 'सूचना सत्यापन और स्थिति जागरूकता' : 'Information Verification & Situational Awareness'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'सही जानकारी कहाँ मिलेगी, कैसे जाँचें, और अफवाहों से कैसे बचें।' : 'Where to find accurate information, how to verify, and how to avoid rumors.'}</p>
      </div>

      {/* VERIFIED SOURCES */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'भरोसेमंद सूचना स्रोत' : 'Trusted Information Sources'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'कोर्ट ऑर्डर:' : 'Court Orders:'}</strong>
            <p>sci.gov.in ({hi ? 'सुप्रीम कोर्ट' : 'Supreme Court'}) | {hi ? 'राज्य हाई कोर्ट वेबसाइट' : 'State High Court websites'} | indiankanoon.org</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'सरकारी प्रेस रिलीज:' : 'Government Press Releases:'}</strong>
            <p>pib.gov.in — {hi ? 'प्रेस सूचना ब्यूरो (आधिकारिक)' : 'Press Information Bureau (official)'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'ट्रैफिक/पुलिस अपडेट:' : 'Traffic/Police Updates:'}</strong>
            <p>{hi ? 'शहरवार आधिकारिक Twitter/X: @DelhiPolice, @MumbaiPolice, @BaborBengaluru, आदि' : 'City-wise official Twitter/X: @DelhiPolice, @MumbaiPolice, @BloreCityTraffic, etc.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'बार एसोसिएशन और वकील सामूहिक:' : 'Bar Associations & Lawyer Collectives:'}</strong>
            <p>{hi ? 'कानूनी स्थिति अपडेट, गिरफ्तारी सहायता, बेल सूचना' : 'Legal situation updates, arrest assistance, bail information'}</p>
          </div>
        </div>
      </section>

      {/* HOW TO VERIFY */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'जानकारी कैसे जाँचें' : 'How to Verify Information'}</h2>
        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li><strong>{hi ? 'स्रोत जाँचें:' : 'Check the source:'}</strong> {hi ? 'किसने कहा? उनका ट्रैक रिकॉर्ड? आधिकारिक अकाउंट है?' : 'Who said it? Their track record? Is it an official account?'}</li>
          <li><strong>{hi ? 'तारीख जाँचें:' : 'Check the date:'}</strong> {hi ? 'यह ताज़ा है या पुरानी खबर दोबारा शेयर हो रही है?' : 'Is this current or old news being reshared?'}</li>
          <li><strong>{hi ? 'मीडिया जाँचें:' : 'Check the media:'}</strong> {hi ? 'फोटो/वीडियो इसी घटना का है? रिवर्स इमेज सर्च करें (Google Images/TinEye)।' : 'Is the photo/video from this event? Do a reverse image search (Google Images/TinEye).'}</li>
          <li><strong>{hi ? 'क्रॉस-रेफ़रेंस:' : 'Cross-reference:'}</strong> {hi ? 'क्या 2+ स्वतंत्र स्रोत इसकी पुष्टि करते हैं?' : 'Do 2+ independent sources confirm this?'}</li>
          <li><strong>{hi ? 'संदेह हो:' : 'When in doubt:'}</strong> {hi ? '"अपुष्ट" लिखें और इंतज़ार करें। शेयर न करें।' : 'Label "unverified" and wait. Do not share.'}</li>
        </ol>
      </section>

      {/* COMMON MISINFO */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'आम गलत सूचना पैटर्न' : 'Common Misinformation Patterns'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'पुरानी तस्वीरें वर्तमान के रूप में शेयर' : 'Old images shared as current'}</li>
          <li>→ {hi ? 'क्रॉप किए वीडियो — संदर्भ हटा दिया' : 'Cropped videos — context removed'}</li>
          <li>→ {hi ? 'फ़र्ज़ी उद्धरण नेताओं के नाम पर' : 'Fake quotes attributed to leaders'}</li>
          <li>→ {hi ? 'नकली आपातकालीन अलर्ट — दहशत फैलाने के लिए' : 'Fake emergency alerts — designed to cause panic'}</li>
          <li>→ {hi ? 'घुसपैठिया पोस्ट — हिंसा भड़काने के लिए डिज़ाइन' : 'Infiltrator posts — designed to incite violence'}</li>
          <li>→ {hi ? '"अभी-अभी सुना" + कोई स्रोत नहीं = अफवाह तक प्रमाणित न हो' : '"Just heard" + no source = rumor until proven'}</li>
        </ul>
      </section>

      {/* VERIFICATION WORKFLOW */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'ग्रुप के लिए सत्यापन वर्कफ़्लो' : 'Verification Workflow for Groups'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? '2-3 "सत्यापन प्रमुख" नियुक्त करें।' : 'Designate 2-3 "verification leads."'}</li>
          <li>→ {hi ? 'मुख्य चैनल में सिर्फ सत्यापित जानकारी।' : 'Only verified information in main channel.'}</li>
          <li>→ {hi ? 'अलग "आने वाली सूचना" चैनल — जाँच के बाद ही मुख्य में।' : 'Separate "incoming tips" channel — only moves to main after verification.'}</li>
          <li>→ {hi ? 'हर अपडेट के साथ: स्रोत? समय? पुष्टि? प्रकाशित कहाँ?' : 'With every update: Source? Time? Corroboration? Published where?'}</li>
        </ul>
      </section>

      {/* INTERNET SHUTDOWN */}
      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">{hi ? 'इंटरनेट शटडाउन के दौरान' : 'During Internet Shutdown'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'VPN पहले से इंस्टॉल रखें: ProtonVPN (मुफ्त), Mullvad, Psiphon।' : 'Pre-install VPN: ProtonVPN (free), Mullvad, Psiphon.'}</li>
          <li>→ {hi ? 'Sahayata ऑफलाइन काम करता है — गाइड, टेम्पलेट, उपकरण कैश्ड।' : 'Sahayata works offline — guides, templates, tools are cached.'}</li>
          <li>→ {hi ? 'Bluetooth mesh: Briar ऐप (इंटरनेट के बिना मैसेजिंग, Bluetooth/WiFi Direct)।' : 'Bluetooth mesh: Briar app (messaging without internet, via Bluetooth/WiFi Direct).'}</li>
          <li>→ {hi ? 'SMS बैकअप: पूर्व-निर्धारित कोडवर्ड + ट्रस्टेड नंबर।' : 'SMS backup: pre-set codewords + trusted numbers.'}</li>
          <li>→ {hi ? 'रेडियो: स्थानीय FM स्टेशन अक्सर बुनियादी अपडेट देते हैं।' : 'Radio: local FM stations often give basic updates.'}</li>
        </ul>
      </section>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Link href="/communication" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'संचार गाइड →' : 'COMMS GUIDE →'}</Link>
        <Link href="/safety" className="brutal-btn brutal-btn-lg text-center">{hi ? 'अधिकार गाइड →' : 'RIGHTS GUIDE →'}</Link>
      </div>
    </div>
  );
}
