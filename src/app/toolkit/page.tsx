import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function ToolkitPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-accent mb-4">
          {isHindi ? 'टूलकिट' : 'TOOLKIT'}
        </div>
        <h1 className="heading-1 mb-3">
          {isHindi ? 'संगठन टूलकिट' : 'Organizing Toolkit'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? 'हांगकांग (2019), बेलारूस (2020), म्यांमार (2021), और भारतीय किसान आंदोलन से सीखे गए सिद्ध तरीके।'
            : 'Proven tactics from Hong Kong (2019), Belarus (2020), Myanmar (2021), and Indian farmers\' movement.'}
        </p>
      </div>


      {/* Communication Structure */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-sky mb-4">{isHindi ? 'संचार' : 'COMMUNICATION'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'संचार संरचना (HK मॉडल)' : 'Communication Structure (HK Model)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="font-bold">{isHindi ? 'तीन-स्तरीय चैनल प्रणाली:' : 'Three-tier channel system:'}</p>
          <div className="brutal-card-flat !p-4 !border-[var(--color-lime)]">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-1">{isHindi ? 'स्तर 1: सार्वजनिक प्रसारण' : 'TIER 1: PUBLIC BROADCAST'}</h3>
            <p>{isHindi
              ? 'एक-तरफ़ा चैनल (Telegram broadcast)। केवल सत्यापित समन्वयक पोस्ट कर सकते हैं। तथ्य, कोई चर्चा नहीं। 50K+ सदस्य हो सकते हैं।'
              : 'One-way channel (Telegram broadcast). Only verified coordinators post. Facts only, no discussion. Can scale to 50K+ members.'}</p>
          </div>
          <div className="brutal-card-flat !p-4 !border-[var(--color-accent)]">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-1">{isHindi ? 'स्तर 2: समन्वय समूह' : 'TIER 2: COORDINATION GROUPS'}</h3>
            <p>{isHindi
              ? 'शहर/क्षेत्र-विशिष्ट Telegram/Signal समूह (200-500 लोग)। दो-तरफ़ा लेकिन मॉडरेटेड। logistics, संसाधन साझा करना।'
              : 'City/area-specific Telegram/Signal groups (200-500 people). Two-way but moderated. Logistics, resource sharing.'}</p>
          </div>
          <div className="brutal-card-flat !p-4 !border-[var(--color-accent-2)]">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-1">{isHindi ? 'स्तर 3: कोर टीम' : 'TIER 3: CORE TEAM'}</h3>
            <p>{isHindi
              ? 'छोटे Signal समूह (5-15 लोग)। निर्णय लेना, संवेदनशील समन्वय। Disappearing messages चालू।'
              : 'Small Signal groups (5-15 people). Decision-making, sensitive coordination. Disappearing messages on.'}</p>
          </div>
          <p className="text-[var(--color-text-muted)] text-xs border-t-[2px] border-[var(--color-border)] pt-3">
            {isHindi
              ? 'क्यों काम करता है: जानकारी ऊपर से नीचे बहती है (तेज़, सत्यापित)। चर्चा केवल समन्वय स्तर पर (शोर कम)। नेतृत्व वितरित (कोई एक लक्ष्य नहीं)।'
              : 'Why it works: information flows top-down (fast, verified). Discussion only at coordination level (less noise). Leadership is distributed (no single target).'}
          </p>
        </div>
      </section>


      {/* Buddy System */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-lime mb-4">{isHindi ? 'बडी सिस्टम' : 'BUDDY SYSTEM'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'बडी सिस्टम (सबसे महत्वपूर्ण सुरक्षा उपाय)' : 'Buddy System (Single Most Important Safety Measure)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>{isHindi
            ? 'हर व्यक्ति का एक "buddy" होना चाहिए — कोई जो जानता है कि आप कहाँ हैं और कब संपर्क करना है।'
            : 'Every person must have a "buddy" — someone who knows where you are and when to raise alarm.'}</p>
          <ul className="list-none space-y-2">
            <li>→ <strong>{isHindi ? 'साथी पर सहमत हों' : 'Agree on a buddy'}</strong> — {isHindi ? 'आदर्श रूप से कोई जो इवेंट में नहीं है' : 'ideally someone NOT at the event'}</li>
            <li>→ <strong>{isHindi ? 'Check-in समय तय करें' : 'Set check-in times'}</strong> — {isHindi ? 'हर 30-60 मिनट। "मैं ठीक हूँ" टेक्स्ट' : 'every 30-60 minutes. "I\'m okay" text'}</li>
            <li>→ <strong>{isHindi ? 'मिस्ड check-in प्रोटोकॉल' : 'Missed check-in protocol'}</strong> — {isHindi ? 'अगर 2 check-in मिस: वकील और परिवार को सूचित करें' : 'if 2 check-ins missed: inform lawyer and family'}</li>
            <li>→ <strong>{isHindi ? 'Code words' : 'Code words'}</strong> — {isHindi ? '"मैं घर जा रहा हूँ" = सब ठीक। "मेरा फ़ोन कम है" = मुझे मदद चाहिए' : '"I\'m heading home" = all fine. "My phone is low" = I need help'}</li>
            <li>→ <strong>{isHindi ? 'बैकअप buddy' : 'Backup buddy'}</strong> — {isHindi ? 'अगर primary से संपर्क नहीं हो, secondary buddy सक्रिय होता है' : 'if primary unreachable, secondary buddy activates'}</li>
          </ul>
        </div>
      </section>

      {/* Affinity Groups */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-accent mb-4">{isHindi ? 'संगठन' : 'ORGANIZING'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'एफ़िनिटी ग्रुप (5-15 लोगों की इकाई)' : 'Affinity Groups (Unit of 5-15 People)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>{isHindi
            ? 'दुनिया भर के सफल आंदोलनों की मूल इकाई: छोटे, विश्वसनीय समूह जो स्वायत्त रूप से कार्य करते हैं लेकिन बड़े नेटवर्क से जुड़े होते हैं।'
            : 'Core unit of successful movements worldwide: small, trusted groups that operate autonomously but connect to the larger network.'}</p>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-2">{isHindi ? 'भूमिकाएं (प्रत्येक समूह में)' : 'ROLES (IN EACH GROUP)'}</h3>
            <ul className="list-none space-y-1">
              <li><strong>{isHindi ? 'समन्वयक' : 'Coordinator'}:</strong> {isHindi ? 'बड़े नेटवर्क से संपर्क, जानकारी प्रवाह' : 'connects to larger network, information flow'}</li>
              <li><strong>{isHindi ? 'मेडिक' : 'Medic'}:</strong> {isHindi ? 'प्राथमिक चिकित्सा प्रशिक्षित, किट साथ' : 'first-aid trained, carries kit'}</li>
              <li><strong>{isHindi ? 'कानूनी पर्यवेक्षक' : 'Legal Observer'}:</strong> {isHindi ? 'दस्तावेज़ीकरण, समय रिकॉर्ड, बैज नंबर नोट' : 'documentation, time records, badge numbers'}</li>
              <li><strong>{isHindi ? 'संचार' : 'Comms'}:</strong> {isHindi ? 'बाहरी दुनिया से संपर्क, अपडेट भेजना' : 'contact with outside world, sending updates'}</li>
              <li><strong>{isHindi ? 'जेल सहायता' : 'Jail Support'}:</strong> {isHindi ? 'गिरफ्तारी होने पर वकील को कॉल, परिवार सूचित' : 'calls lawyer if arrest, informs family'}</li>
            </ul>
          </div>
        </div>
      </section>


      {/* Information Hygiene */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-red mb-4">{isHindi ? 'सूचना' : 'INFO HYGIENE'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'सूचना स्वच्छता (अफवाह नियंत्रण)' : 'Information Hygiene (Rumor Control)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="font-bold">{isHindi ? 'एक अफवाह एक हज़ार लोगों को खतरे में डाल सकती है। ये नियम अपनाएं:' : 'One rumor can endanger a thousand people. Adopt these rules:'}</p>
          <ul className="list-none space-y-2">
            <li>→ <strong>{isHindi ? 'स्रोत नियम' : 'Source rule'}:</strong> {isHindi ? 'अगर 2 स्वतंत्र स्रोतों से पुष्टि नहीं है, तो शेयर न करें' : 'if not confirmed by 2 independent sources, don\'t share'}</li>
            <li>→ <strong>{isHindi ? 'समय नियम' : 'Timestamp rule'}:</strong> {isHindi ? 'हर अपडेट में समय लिखें। "अभी" अर्थहीन है — "14:30 IST" सत्यापनीय है' : 'every update must have a time. "Now" is meaningless — "14:30 IST" is verifiable'}</li>
            <li>→ <strong>{isHindi ? 'स्थान नियम' : 'Location rule'}:</strong> {isHindi ? 'केवल क्षेत्र-स्तर (South Delhi, Koramangala)। सटीक पता कभी नहीं।' : 'area-level only (South Delhi, Koramangala). Never exact address.'}</li>
            <li>→ <strong>{isHindi ? 'Forwarded = unverified' : 'Forwarded = unverified'}:</strong> {isHindi ? 'Forward किया गया संदेश = असत्यापित। कभी भी बिना जाँचे forward न करें।' : 'A forwarded message = unverified. Never forward without checking.'}</li>
            <li>→ <strong>{isHindi ? 'सुधार तेज़ भेजें' : 'Correct fast'}:</strong> {isHindi ? 'अगर आपने गलत जानकारी शेयर की, तुरंत सुधार भेजें — "CORRECTION:" से शुरू करें' : 'if you shared wrong info, immediately send correction — start with "CORRECTION:"'}</li>
          </ul>
          <div className="brutal-card-flat !p-3 !border-[var(--color-red)] mt-4">
            <p className="text-xs font-bold text-[var(--color-red)]">
              {isHindi
                ? '⚠️ "पुलिस यहाँ आ रही है" जैसे अपुष्ट संदेश ने दुनिया भर में लोगों को चोट पहुँचाई है और आंदोलनों को बदनाम किया है। सत्यापन के बिना कुछ न फैलाएं।'
                : '⚠️ Unverified messages like "police coming here" have gotten people hurt worldwide and discredited movements. Verify before spreading ANYTHING.'}
            </p>
          </div>
        </div>
      </section>

      {/* Escalation Ladder */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-purple mb-4">{isHindi ? 'रणनीति' : 'TACTICS'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'एस्केलेशन लैडर (शांतिपूर्ण दबाव बढ़ाना)' : 'Escalation Ladder (Increasing Peaceful Pressure)'}</h2>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3 items-center">
            <span className="brutal-badge brutal-badge-lime shrink-0">1</span>
            <span>{isHindi ? 'दृश्यता: बैनर, पोस्टर, सोशल मीडिया अभियान' : 'Visibility: banners, posters, social media campaigns'}</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="brutal-badge brutal-badge-lime shrink-0">2</span>
            <span>{isHindi ? 'एकत्रीकरण: सभाएं, मोमबत्ती मार्च, मौन प्रदर्शन' : 'Assembly: gatherings, candlelight marches, silent protests'}</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="brutal-badge brutal-badge-yellow shrink-0">3</span>
            <span>{isHindi ? 'दबाव: हड़ताल, बहिष्कार, चुनी हुई non-cooperation' : 'Pressure: strikes, boycotts, selective non-cooperation'}</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="brutal-badge brutal-badge-yellow shrink-0">4</span>
            <span>{isHindi ? 'व्यवधान: सड़क बंद, धरना, अहिंसक प्रत्यक्ष कार्रवाई' : 'Disruption: road blocks, dharnas, nonviolent direct action'}</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="brutal-badge brutal-badge-accent shrink-0">5</span>
            <span>{isHindi ? 'बड़े पैमाने पर non-cooperation: सामान्य हड़ताल, संस्थागत non-compliance' : 'Mass non-cooperation: general strike, institutional non-compliance'}</span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] border-t-[2px] border-[var(--color-border)] pt-3 mt-3">
            {isHindi
              ? 'सिद्धांत: हमेशा अगले स्तर पर जाने से पहले पूरी तैयारी करें। जल्दबाज़ी में escalation = थकान और दमन।'
              : 'Principle: always build capacity at one level before escalating. Premature escalation = burnout and repression.'}
          </p>
        </div>
      </section>

      {/* Source attribution */}
      <div className="brutal-banner text-center text-xs">
        {isHindi
          ? 'स्रोत: हांगकांग प्रदर्शन मैनुअल (2019), बेलारूस Telegram अध्ययन (USENIX 2021), म्यांमार #MilkTeaAlliance, Gene Sharp "From Dictatorship to Democracy", भारतीय किसान आंदोलन (2020-21)'
          : 'SOURCES: HK PROTEST MANUAL (2019), BELARUS TELEGRAM STUDY (USENIX 2021), MYANMAR #MILKTEAALLIANCE, GENE SHARP "FROM DICTATORSHIP TO DEMOCRACY", INDIAN FARMERS\' MOVEMENT (2020-21)'}
      </div>
    </div>
  );
}
