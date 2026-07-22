import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';

export default async function ToolkitPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10 flex justify-between items-start">
        <div>
          <div className="brutal-badge brutal-badge-accent mb-4">{isHindi ? 'टूलकिट' : 'TOOLKIT'}</div>
          <h1 className="heading-1 mb-3">{isHindi ? 'संगठन टूलकिट' : 'Organizing Toolkit'}</h1>
          <p className="text-[var(--color-text-muted)] text-lg">
            {isHindi
              ? 'भारतीय आंदोलनों से सीखे गए सिद्ध तरीके — किसान आंदोलन (2020-21), CAA विरोध (2019-20), जंतर मंतर (2026)।'
              : 'Proven tactics from Indian movements — Farmers\' Movement (2020-21), CAA protests (2019-20), Jantar Mantar (2026).'}
          </p>
        </div>
        <PrintButton locale={locale} />
      </div>

      {/* Buddy System */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-lime mb-4">{isHindi ? 'बडी सिस्टम' : 'BUDDY SYSTEM'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'बडी सिस्टम (सबसे ज़रूरी सुरक्षा उपाय)' : 'Buddy System (Most Critical Safety Measure)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>{isHindi
            ? 'किसान आंदोलन में हर ट्रैक्टर ट्रॉली का एक "संपर्क व्यक्ति" था गाँव में। यही बडी सिस्टम है — कोई जो जानता है कि आप कहाँ हैं।'
            : 'In the farmers\' movement, every tractor trolley had a "contact person" back in the village. This is the buddy system — someone who knows where you are.'}</p>
          <ul className="list-none space-y-2">
            <li>→ <strong>{isHindi ? 'साथी चुनें' : 'Choose a buddy'}</strong> — {isHindi ? 'आदर्श: कोई जो प्रदर्शन स्थल पर नहीं है (घर पर, दूसरे शहर में)' : 'Ideally someone NOT at the protest site (at home, in another city)'}</li>
            <li>→ <strong>{isHindi ? 'Check-in तय करें' : 'Set check-in times'}</strong> — {isHindi ? 'हर 30-60 मिनट। "ठीक हूँ" message। WhatsApp/Signal।' : 'Every 30-60 min. "I\'m okay" message. WhatsApp/Signal.'}</li>
            <li>→ <strong>{isHindi ? 'मिस्ड check-in प्रोटोकॉल' : 'Missed check-in protocol'}</strong> — {isHindi ? '2 check-in मिस = वकील को कॉल (NALSA: 15100), फिर परिवार।' : '2 missed check-ins = call lawyer (NALSA: 15100), then family.'}</li>
            <li>→ <strong>{isHindi ? 'Code words रखें' : 'Keep code words'}</strong> — {isHindi ? '"चाय पी ली" = सब ठीक। "बैटरी कम है" = मदद चाहिए। "घर जा रहा हूँ" = तुरंत वकील भेजो।' : '"Had chai" = all fine. "Battery low" = need help. "Going home" = send lawyer immediately.'}</li>
            <li>→ <strong>{isHindi ? 'बांह पर लिखें' : 'Write on your arm'}</strong> — {isHindi ? 'स्थायी मार्कर से: NALSA 15100, buddy का नंबर, blood group।' : 'Permanent marker: NALSA 15100, buddy\'s number, blood group.'}</li>
          </ul>
        </div>
      </section>

      {/* Communication Structure */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-sky mb-4">{isHindi ? 'संचार' : 'COMMUNICATION'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'संचार संरचना' : 'Communication Structure'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="font-bold">{isHindi ? 'तीन-स्तरीय चैनल प्रणाली (CAA/किसान आंदोलन में सफल):' : 'Three-tier channel system (proven in CAA/Farmers\' movement):'}</p>
          <div className="brutal-card-flat !p-4 !border-[var(--color-lime)]">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-1">{isHindi ? 'स्तर 1: सार्वजनिक प्रसारण (Telegram/WhatsApp Broadcast)' : 'TIER 1: PUBLIC BROADCAST (Telegram/WhatsApp Broadcast)'}</h3>
            <p>{isHindi
              ? 'एक-तरफ़ा। केवल सत्यापित समन्वयक पोस्ट करें। तथ्य और अपडेट — कोई चर्चा नहीं, कोई अफवाह नहीं।'
              : 'One-way. Only verified coordinators post. Facts and updates — no discussion, no rumors.'}</p>
          </div>
          <div className="brutal-card-flat !p-4 !border-[var(--color-accent)]">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-1">{isHindi ? 'स्तर 2: शहर/क्षेत्र समन्वय समूह (200-500 लोग)' : 'TIER 2: CITY/AREA COORDINATION (200-500 people)'}</h3>
            <p>{isHindi
              ? 'दो-तरफ़ा लेकिन मॉडरेटेड। Logistics, संसाधन, राइड शेयरिंग, भोजन समन्वय। "कौन कहाँ जा रहा है" यहाँ पूछें।'
              : 'Two-way but moderated. Logistics, resources, ride sharing, food coordination. "Who\'s going where" happens here.'}</p>
          </div>
          <div className="brutal-card-flat !p-4 !border-[var(--color-accent-2)]">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-1">{isHindi ? 'स्तर 3: कोर टीम (Signal, 5-15 लोग)' : 'TIER 3: CORE TEAM (Signal, 5-15 people)'}</h3>
            <p>{isHindi
              ? 'निर्णय, संवेदनशील समन्वय। Disappearing messages ON। कभी WhatsApp पर नहीं — Signal ही।'
              : 'Decisions, sensitive coordination. Disappearing messages ON. Never on WhatsApp — Signal only.'}</p>
          </div>
        </div>
      </section>

      {/* Affinity Groups / Roles */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-accent mb-4">{isHindi ? 'समूह संगठन' : 'GROUP ORGANIZING'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'एफ़िनिटी ग्रुप (5-15 लोगों की इकाई)' : 'Affinity Group (Unit of 5-15 People)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>{isHindi
            ? 'जंतर मंतर (2026) में हर "zone" की अपनी टीम थी — मेडिक, कानूनी, भोजन, संचार। यही एफ़िनिटी ग्रुप है।'
            : 'At Jantar Mantar (2026), every "zone" had its own team — medic, legal, food, comms. This is the affinity group.'}</p>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-2">{isHindi ? 'भूमिकाएं' : 'ROLES'}</h3>
            <ul className="list-none space-y-1.5">
              <li><strong>🏥 {isHindi ? 'मेडिक' : 'Medic'}:</strong> {isHindi ? 'First aid किट, ORS, पानी, बुनियादी दवाइयाँ। CPR जानना ज़रूरी।' : 'First aid kit, ORS, water, basic meds. Must know CPR.'}</li>
              <li><strong>⚖️ {isHindi ? 'कानूनी' : 'Legal'}:</strong> {isHindi ? 'NALSA 15100 पर speed dial। D.K. Basu दिशानिर्देश याद। बैज नंबर नोट करना।' : 'NALSA 15100 on speed dial. D.K. Basu guidelines memorized. Notes badge numbers.'}</li>
              <li><strong>📡 {isHindi ? 'संचार' : 'Comms'}:</strong> {isHindi ? 'बाहरी दुनिया से संपर्क। अपडेट भेजना। बडी को check-in।' : 'Contact with outside world. Sends updates. Check-ins with buddy.'}</li>
              <li><strong>🚗 {isHindi ? 'परिवहन' : 'Transport'}:</strong> {isHindi ? 'गाड़ी/बाइक तैयार। निकासी मार्ग पता। अस्पताल का रास्ता जानना।' : 'Vehicle ready. Knows evacuation routes. Knows hospital route.'}</li>
              <li><strong>📋 {isHindi ? 'दस्तावेज़ीकरण' : 'Documentation'}:</strong> {isHindi ? 'वीडियो/फ़ोटो। समय + स्थान रिकॉर्ड। Cloud backup ON।' : 'Video/photo. Time + location recorded. Cloud backup ON.'}</li>
              <li><strong>🍲 {isHindi ? 'आपूर्ति' : 'Supply'}:</strong> {isHindi ? 'पानी, भोजन, ORS, छाते, सैनिटरी पैड, कैश।' : 'Water, food, ORS, umbrellas, sanitary pads, cash.'}</li>
            </ul>
          </div>
          <p className="text-[var(--color-text-muted)] text-xs mt-3">
            <Link href="/groups" className="underline font-bold">{isHindi ? '→ Sahayata पर अपना ग्रुप बनाएं' : '→ Create your group on Sahayata'}</Link>
          </p>
        </div>
      </section>

      {/* Information Hygiene */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-red mb-4">{isHindi ? 'अफवाह नियंत्रण' : 'RUMOR CONTROL'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'सूचना स्वच्छता' : 'Information Hygiene'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="font-bold">{isHindi ? 'एक अफवाह = हज़ारों लोग खतरे में। ये नियम अपनाएं:' : 'One rumor = thousands in danger. Follow these rules:'}</p>
          <ul className="list-none space-y-2">
            <li>→ <strong>{isHindi ? '2-स्रोत नियम' : '2-source rule'}:</strong> {isHindi ? '2 स्वतंत्र स्रोतों से पुष्टि नहीं = शेयर मत करो' : 'Not confirmed by 2 independent sources = don\'t share'}</li>
            <li>→ <strong>{isHindi ? 'समय लिखो' : 'Timestamp everything'}:</strong> {isHindi ? '"अभी" नहीं — "14:30 IST, 22 जुलाई"। सत्यापनीय।' : 'Not "now" — "14:30 IST, 22 July." Verifiable.'}</li>
            <li>→ <strong>{isHindi ? 'क्षेत्र-स्तर ही' : 'Area-level only'}:</strong> {isHindi ? '"जंतर मंतर के पास" — कभी सटीक पता नहीं।' : '"Near Jantar Mantar" — never exact address.'}</li>
            <li>→ <strong>{isHindi ? 'Forward = असत्यापित' : 'Forward = unverified'}:</strong> {isHindi ? 'Forward किया गया = सत्यापित नहीं। बिना जाँचे कभी forward मत करो।' : 'Forwarded = not verified. Never forward without checking.'}</li>
            <li>→ <strong>{isHindi ? 'CORRECTION: से शुरू करो' : 'Start with CORRECTION:'}:</strong> {isHindi ? 'अगर गलत जानकारी भेजी, तुरंत "CORRECTION:" भेजो।' : 'If you sent wrong info, immediately send "CORRECTION:"'}</li>
          </ul>
          <div className="brutal-card-flat !p-3 !border-[var(--color-red)] mt-4">
            <p className="text-xs font-bold text-[var(--color-red)]">
              {isHindi
                ? '⚠️ "पुलिस आ रही है" जैसे अपुष्ट संदेश CAA विरोध और किसान आंदोलन दोनों में भगदड़ का कारण बने। सत्यापन के बिना कुछ मत फैलाओ।'
                : '⚠️ Unverified messages like "police coming" caused stampedes during both CAA protests and farmers\' movement. Verify before spreading ANYTHING.'}
            </p>
          </div>
        </div>
      </section>

      {/* Supply Chain (from farmers' movement) */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-yellow mb-4">{isHindi ? 'आपूर्ति' : 'SUPPLY CHAIN'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'आपूर्ति श्रृंखला (किसान आंदोलन मॉडल)' : 'Supply Chain (Farmers\' Movement Model)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>{isHindi
            ? 'सिंघु बॉर्डर पर किसानों ने 13+ महीने एक स्व-पर्याप्त शहर बनाया। उनकी प्रणाली:'
            : 'Farmers at Singhu Border built a self-sufficient city for 13+ months. Their system:'}</p>
          <ul className="list-none space-y-2">
            <li>→ <strong>{isHindi ? 'लंगर (सामूहिक रसोई)' : 'Langar (community kitchen)'}:</strong> {isHindi ? 'रोटेशन में — हर गाँव/संगठन बारी-बारी से। कभी एक व्यक्ति पर बोझ नहीं।' : 'In rotation — every village/org takes turns. Never burden on one person.'}</li>
            <li>→ <strong>{isHindi ? 'मेडिकल टेंट' : 'Medical tent'}:</strong> {isHindi ? 'डॉक्टर/नर्स volunteers + first aid + ORS + basic दवाइयाँ। 24/7।' : 'Doctor/nurse volunteers + first aid + ORS + basic meds. 24/7.'}</li>
            <li>→ <strong>{isHindi ? 'Swiggy/Zomato सॉलिडैरिटी' : 'Swiggy/Zomato solidarity'}:</strong> {isHindi ? 'दूर से लोग food delivery apps से भोजन भेज सकते हैं। (जंतर मंतर 2026 में सफल)' : 'People from far can send food via delivery apps. (Proven at Jantar Mantar 2026)'}</li>
            <li>→ <strong>{isHindi ? 'सैनिटरी ज़रूरतें' : 'Sanitary needs'}:</strong> {isHindi ? 'पैड, टॉयलेट पेपर, साबुन, पानी। अक्सर भूला जाता है — सबसे पहले व्यवस्था करें।' : 'Pads, toilet paper, soap, water. Often forgotten — arrange FIRST.'}</li>
            <li>→ <strong>{isHindi ? 'कैश रखें' : 'Keep cash'}:</strong> {isHindi ? 'UPI/internet बंद हो सकता है। कम से कम ₹500-1000 cash साथ रखें।' : 'UPI/internet may be shut down. Keep at least ₹500-1000 cash.'}</li>
          </ul>
        </div>
      </section>

      {/* Escalation */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-purple mb-4">{isHindi ? 'रणनीति' : 'STRATEGY'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'दबाव बढ़ाने की सीढ़ी (शांतिपूर्ण)' : 'Escalation Ladder (Nonviolent)'}</h2>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3 items-center">
            <span className="brutal-badge brutal-badge-lime shrink-0">1</span>
            <span>{isHindi ? 'दृश्यता: सोशल मीडिया, बैनर, पोस्टर, hashtag campaigns' : 'Visibility: social media, banners, posters, hashtag campaigns'}</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="brutal-badge brutal-badge-lime shrink-0">2</span>
            <span>{isHindi ? 'एकत्रीकरण: मोमबत्ती मार्च, मौन प्रदर्शन, धरना (Jantar Mantar मॉडल)' : 'Assembly: candlelight marches, silent protests, dharna (Jantar Mantar model)'}</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="brutal-badge brutal-badge-yellow shrink-0">3</span>
            <span>{isHindi ? 'दबाव: चलो संसद मार्च, बहिष्कार, ज्ञापन, RTI' : 'Pressure: Chalo Sansad march, boycotts, memorandums, RTI'}</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="brutal-badge brutal-badge-yellow shrink-0">4</span>
            <span>{isHindi ? 'Non-cooperation: हड़ताल, बंद, सड़क जाम (शांतिपूर्ण)' : 'Non-cooperation: strikes, bandh, road block (peaceful)'}</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="brutal-badge brutal-badge-accent shrink-0">5</span>
            <span>{isHindi ? 'सामान्य हड़ताल / भारत बंद — सबसे अंतिम विकल्प' : 'General strike / Bharat Bandh — last resort only'}</span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] border-t-[2px] border-[var(--color-border)] pt-3 mt-3">
            {isHindi
              ? 'सिद्धांत: किसान आंदोलन 13 महीने तक इसलिए टिका क्योंकि उन्होंने जल्दबाज़ी नहीं की। स्थिरता > तीव्रता।'
              : 'Principle: The farmers\' movement lasted 13 months because they didn\'t rush escalation. Sustainability > intensity.'}
          </p>
        </div>
      </section>

      {/* Legal Observer */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-purple mb-4">{isHindi ? 'भूमिका' : 'ROLE'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'कानूनी पर्यवेक्षक कैसे बनें' : 'How to Be a Legal Observer'}</h2>
        <div className="space-y-2 text-sm">
          <li className="list-none">→ {isHindi ? '"LEGAL OBSERVER" लिखी पट्टी / हाई-विज जैकेट पहनें' : 'Wear "LEGAL OBSERVER" armband / high-vis jacket'}</li>
          <li className="list-none">→ {isHindi ? 'दस्तावेज़: समय, स्थान, बैज नंबर, क्या हुआ, गवाह' : 'Document: time, location, badge numbers, what happened, witnesses'}</li>
          <li className="list-none">→ {isHindi ? 'वीडियो: केवल पुलिस कार्रवाई — प्रदर्शनकारियों के चेहरे नहीं' : 'Video: police actions ONLY — not protesters\' faces'}</li>
          <li className="list-none">→ {isHindi ? 'Cloud auto-upload ON (Google Drive/Proton Drive) — फ़ोन ज़ब्त हो सकता है' : 'Cloud auto-upload ON (Google Drive/Proton Drive) — phone may be seized'}</li>
          <li className="list-none">→ {isHindi ? 'शारीरिक हस्तक्षेप कभी नहीं — आपकी शक्ति दस्तावेज़ में है' : 'Never intervene physically — your power is in documentation'}</li>
        </div>
      </section>

      {/* Quick Links */}
      <div className="brutal-banner text-center text-xs">
        <Link href="/safety" className="underline mx-2">{isHindi ? 'अपने अधिकार जानें' : 'Know Your Rights'}</Link> ·
        <Link href="/resources" className="underline mx-2">{isHindi ? 'संसाधन' : 'Resources'}</Link> ·
        <Link href="/groups" className="underline mx-2">{isHindi ? 'ग्रुप बनाएं' : 'Form a Group'}</Link> ·
        <Link href="/alerts" className="underline mx-2">{isHindi ? 'अलर्ट' : 'Alerts'}</Link>
      </div>
    </div>
  );
}
