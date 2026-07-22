import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';

export default async function PlaybookPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10 flex justify-between items-start">
        <div>
          <div className="brutal-badge brutal-badge-accent mb-4">
            {isHindi ? 'प्लेबुक' : 'PLAYBOOK'}
          </div>
          <h1 className="heading-display mb-3">
            {isHindi ? 'सहायता प्लेबुक' : 'The Sahayata Playbook'}
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg">
            {isHindi
              ? 'शांतिपूर्ण, प्रभावी, और टिकाऊ सामूहिक कार्रवाई के लिए एक व्यावहारिक फ़ील्ड मैन्युअल।'
              : 'A practical field manual for peaceful, effective, and sustainable collective action.'}
          </p>
        </div>
        <PrintButton locale={locale} />
      </div>


      {/* Chapter 1: The Unit */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-lime mb-4">
          {isHindi ? 'अध्याय 1' : 'CHAPTER 1'}
        </div>
        <h2 className="heading-1 mb-4">{isHindi ? 'इकाई (5-15 लोग)' : 'The Unit (5-15 People)'}</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p className="text-base font-bold">{isHindi ? 'हर बड़ा आंदोलन छोटी, विश्वसनीय इकाइयों से बना होता है।' : 'Every large movement is made of small, trusted units.'}</p>
          <p>{isHindi
            ? '5-15 लोगों का समूह — इतना छोटा कि सब एक-दूसरे को जानें, इतना बड़ा कि सभी ज़रूरी भूमिकाएं भरी जा सकें। यह संगठन की बुनियादी इकाई है।'
            : '5-15 people — small enough that everyone knows each other, large enough to fill all essential roles. This is the fundamental unit of organizing.'}</p>
          
          <h3 className="heading-3 mt-6 mb-3">{isHindi ? '6 भूमिकाएं' : '6 Roles'}</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="brutal-card-flat !p-3">
              <strong>🏥 {isHindi ? 'मेडिक' : 'Medic'}</strong>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{isHindi ? 'First aid, ORS, पानी, बुनियादी दवाएं। CPR जानना ज़रूरी। 108 speed dial पर।' : 'First aid, ORS, water, basic meds. Must know CPR. 108 on speed dial.'}</p>
            </div>
            <div className="brutal-card-flat !p-3">
              <strong>⚖️ {isHindi ? 'कानूनी' : 'Legal'}</strong>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{isHindi ? 'NALSA 15100 speed dial। BNSS अधिकार याद। बैज नंबर नोट करता है। गिरफ्तारी पर तुरंत कार्रवाई।' : 'NALSA 15100 on speed dial. BNSS rights memorized. Notes badge numbers. Immediate action on arrest.'}</p>
            </div>
            <div className="brutal-card-flat !p-3">
              <strong>📡 {isHindi ? 'संचार' : 'Comms'}</strong>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{isHindi ? 'बाहरी दुनिया से संपर्क। अपडेट भेजना। बडी check-in। Sahayata पर अलर्ट पोस्ट।' : 'Contact with outside world. Sends updates. Buddy check-ins. Posts alerts on Sahayata.'}</p>
            </div>
            <div className="brutal-card-flat !p-3">
              <strong>🚗 {isHindi ? 'परिवहन' : 'Transport'}</strong>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{isHindi ? 'वाहन तैयार। निकासी मार्ग पता। नज़दीकी अस्पताल का रास्ता जानता है।' : 'Vehicle ready. Knows evacuation routes. Knows route to nearest hospital.'}</p>
            </div>
            <div className="brutal-card-flat !p-3">
              <strong>🍲 {isHindi ? 'आपूर्ति' : 'Supply'}</strong>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{isHindi ? 'पानी, भोजन, ORS, सैनिटरी पैड, कैश। रोटेशन में व्यवस्था।' : 'Water, food, ORS, sanitary pads, cash. Arranges in rotation.'}</p>
            </div>
            <div className="brutal-card-flat !p-3">
              <strong>📋 {isHindi ? 'दस्तावेज़' : 'Document'}</strong>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{isHindi ? 'वीडियो/फ़ोटो (केवल कार्रवाई, चेहरे नहीं)। समय+स्थान रिकॉर्ड। Cloud backup ON।' : 'Video/photo (actions only, not faces). Time+location recorded. Cloud backup ON.'}</p>
            </div>
          </div>

          <div className="brutal-card-flat !p-4 !border-[var(--color-accent)] mt-4">
            <p className="text-xs font-bold">
              <Link href="/groups" className="underline">{isHindi ? '→ Sahayata पर अपनी इकाई बनाएं (30 सेकंड)' : '→ Create your unit on Sahayata (30 seconds)'}</Link>
            </p>
          </div>
        </div>
      </section>


      {/* Chapter 2: The Network */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-sky mb-4">{isHindi ? 'अध्याय 2' : 'CHAPTER 2'}</div>
        <h2 className="heading-1 mb-4">{isHindi ? 'नेटवर्क (इकाइयों को जोड़ना)' : 'The Network (Connecting Units)'}</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p className="text-base font-bold">{isHindi ? 'तीन-स्तरीय संचार — शोर कम, गति अधिक, विश्वास बरकरार।' : 'Three-layer communication — less noise, more speed, trust intact.'}</p>
          
          <div className="space-y-3 mt-4">
            <div className="brutal-card-flat !p-4 !border-l-[6px] !border-l-[var(--color-lime)]">
              <h4 className="font-black text-xs uppercase tracking-wider">{isHindi ? 'परत 1: प्रसारण' : 'LAYER 1: BROADCAST'}</h4>
              <p className="mt-1">{isHindi ? 'एक-तरफ़ा। केवल सत्यापित समन्वयक पोस्ट करें। तथ्य, अपडेट, अलर्ट। कोई चर्चा नहीं। Telegram channel या Sahayata /alerts।' : 'One-way. Only verified coordinators post. Facts, updates, alerts. No discussion. Telegram channel or Sahayata /alerts.'}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{isHindi ? 'उद्देश्य: 50,000+ लोगों तक सत्यापित जानकारी पहुँचाना।' : 'Purpose: reach 50,000+ people with verified information.'}</p>
            </div>
            <div className="brutal-card-flat !p-4 !border-l-[6px] !border-l-[var(--color-accent)]">
              <h4 className="font-black text-xs uppercase tracking-wider">{isHindi ? 'परत 2: समन्वय' : 'LAYER 2: COORDINATION'}</h4>
              <p className="mt-1">{isHindi ? 'दो-तरफ़ा, मॉडरेटेड। शहर/क्षेत्र-विशिष्ट। 200-500 लोग। Logistics, राइड शेयरिंग, भोजन, संसाधन। "कौन कहाँ जा रहा है" यहाँ पूछें।' : 'Two-way, moderated. City/area-specific. 200-500 people. Logistics, ride sharing, food, resources. "Who is going where" happens here.'}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{isHindi ? 'उद्देश्य: संसाधन समन्वय और logistics।' : 'Purpose: resource coordination and logistics.'}</p>
            </div>
            <div className="brutal-card-flat !p-4 !border-l-[6px] !border-l-[var(--color-accent-2)]">
              <h4 className="font-black text-xs uppercase tracking-wider">{isHindi ? 'परत 3: कोर' : 'LAYER 3: CORE'}</h4>
              <p className="mt-1">{isHindi ? 'Signal only। 5-15 लोग। Disappearing messages ON। निर्णय, संवेदनशील समन्वय। कभी WhatsApp पर नहीं।' : 'Signal only. 5-15 people. Disappearing messages ON. Decisions, sensitive coordination. Never on WhatsApp.'}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{isHindi ? 'उद्देश्य: रणनीतिक निर्णय, सुरक्षित।' : 'Purpose: strategic decisions, secure.'}</p>
            </div>
          </div>
          
          <div className="brutal-card-flat !p-3 !border-[var(--color-red)] mt-4">
            <p className="text-xs font-bold text-[var(--color-red)]">
              {isHindi ? '⚠️ नियम: जानकारी ऊपर से नीचे बहती है (तेज़, सत्यापित)। सवाल नीचे से ऊपर (समन्वय → कोर)। कभी भी असत्यापित जानकारी broadcast layer पर न भेजें।' : '⚠️ RULE: Information flows top-down (fast, verified). Questions flow bottom-up (coordination → core). Never send unverified info to the broadcast layer.'}
            </p>
          </div>
        </div>
      </section>


      {/* Chapter 3: The Ground */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-yellow mb-4">{isHindi ? 'अध्याय 3' : 'CHAPTER 3'}</div>
        <h2 className="heading-1 mb-4">{isHindi ? 'ज़मीन पर (तैयारी → कार्रवाई → वापसी)' : 'On The Ground (Prep → Action → Return)'}</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          
          <h3 className="heading-3">{isHindi ? 'जाने से पहले (चेकलिस्ट)' : 'Before You Go (Checklist)'}</h3>
          <div className="grid md:grid-cols-2 gap-2">
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="mt-0.5" /><span>{isHindi ? 'बडी को बताया: कहाँ, कब तक, code words' : 'Told buddy: where, how long, code words'}</span></label>
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="mt-0.5" /><span>{isHindi ? 'बांह पर लिखा: NALSA 15100, buddy नंबर, blood group' : 'Written on arm: NALSA 15100, buddy number, blood group'}</span></label>
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="mt-0.5" /><span>{isHindi ? 'फ़ोन चार्ज + पोर्टेबल बैटरी' : 'Phone charged + portable battery'}</span></label>
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="mt-0.5" /><span>{isHindi ? 'पानी 2L+, स्नैक्स, ORS' : 'Water 2L+, snacks, ORS'}</span></label>
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="mt-0.5" /><span>{isHindi ? 'ID फ़ोटोकॉपी (मूल घर)' : 'ID photocopy (originals home)'}</span></label>
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="mt-0.5" /><span>{isHindi ? 'कैश ₹500-1000 (UPI बंद हो सकता है)' : 'Cash ₹500-1000 (UPI may go down)'}</span></label>
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="mt-0.5" /><span>{isHindi ? 'सैनिटरी पैड, टॉयलेट पेपर' : 'Sanitary pads, toilet paper'}</span></label>
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="mt-0.5" /><span>{isHindi ? 'आँसू गैस किट: गीला कपड़ा, पानी बोतल, चश्मा' : 'Tear gas kit: wet cloth, water bottle, goggles'}</span></label>
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="mt-0.5" /><span>{isHindi ? 'कपड़े: हल्के, ढकने वाले, बिना logo, दौड़ने लायक जूते' : 'Clothes: light, covering, no logos, running shoes'}</span></label>
            <label className="flex items-start gap-2 text-xs"><input type="checkbox" className="mt-0.5" /><span>{isHindi ? 'Cloud auto-upload ON (photos/videos)' : 'Cloud auto-upload ON (photos/videos)'}</span></label>
          </div>

          <h3 className="heading-3 mt-6">{isHindi ? 'वहाँ पहुँचकर' : 'Once There'}</h3>
          <ul className="list-none space-y-1.5 text-xs">
            <li>→ {isHindi ? 'बाहर निकलने के 2+ रास्ते पहचानें। याद रखें।' : 'Identify 2+ exit routes. Memorize them.'}</li>
            <li>→ {isHindi ? 'भीड़ के किनारे रहें — बीच में फंसना सबसे खतरनाक।' : 'Stay at edges — being trapped in the middle is most dangerous.'}</li>
            <li>→ {isHindi ? 'हर 30 मिनट: बडी को check-in। Sahayata group में "safe" mark करें।' : 'Every 30 min: check-in with buddy. Mark "safe" in Sahayata group.'}</li>
            <li>→ {isHindi ? 'भड़काने वालों से दूर रहें। वे जानबूझकर माहौल बिगाड़ते हैं।' : 'Stay away from provocateurs. They deliberately escalate.'}</li>
            <li>→ {isHindi ? 'लाठी चार्ज: सिर+पेट ढकें, बैठें, किनारे जाएं।' : 'Lathi charge: cover head+stomach, sit down, move to edges.'}</li>
            <li>→ {isHindi ? 'आँसू गैस: हवा की विपरीत दिशा में भागें, ऊँचाई पर जाएं (गैस भारी, नीचे रहती है)।' : 'Tear gas: run upwind, go uphill (gas is heavy, settles low).'}</li>
          </ul>

          <h3 className="heading-3 mt-6">{isHindi ? 'वापसी के बाद' : 'After Return'}</h3>
          <ul className="list-none space-y-1.5 text-xs">
            <li>→ {isHindi ? 'बडी को "सुरक्षित वापस" संदेश।' : '"Safe return" message to buddy.'}</li>
            <li>→ {isHindi ? 'Sahayata group में "safe" mark करें।' : 'Mark "safe" in Sahayata group.'}</li>
            <li>→ {isHindi ? 'दस्तावेज़ीकरण सुरक्षित करें — backup verify करें।' : 'Secure documentation — verify backups.'}</li>
            <li>→ {isHindi ? 'आराम करें। अगली बार कोई और जाएगा। रोटेशन ज़रूरी है।' : 'Rest. Someone else goes next time. Rotation is essential.'}</li>
          </ul>
        </div>
      </section>


      {/* Chapter 4: Information Discipline */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-red mb-4">{isHindi ? 'अध्याय 4' : 'CHAPTER 4'}</div>
        <h2 className="heading-1 mb-4">{isHindi ? 'सूचना अनुशासन' : 'Information Discipline'}</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p className="text-base font-bold">{isHindi ? 'एक झूठी खबर हज़ार सच्ची खबरों से ज़्यादा नुकसान करती है।' : 'One false report does more damage than a thousand true ones.'}</p>
          
          <div className="space-y-3">
            <div className="flex gap-3 items-start">
              <span className="brutal-badge brutal-badge-red shrink-0">1</span>
              <div><strong>{isHindi ? '2-स्रोत नियम' : '2-Source Rule'}</strong><p className="text-xs text-[var(--color-text-muted)]">{isHindi ? '2 स्वतंत्र स्रोतों से पुष्टि नहीं हुई = शेयर मत करो। बस।' : 'Not confirmed by 2 independent sources = don\'t share. Period.'}</p></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="brutal-badge brutal-badge-red shrink-0">2</span>
              <div><strong>{isHindi ? 'हर चीज़ में समय लिखो' : 'Timestamp Everything'}</strong><p className="text-xs text-[var(--color-text-muted)]">{isHindi ? '"अभी" अर्थहीन है। "14:30 IST, 22 जुलाई, जंतर मंतर क्षेत्र" सत्यापनीय है।' : '"Now" is meaningless. "14:30 IST, 22 July, Jantar Mantar area" is verifiable.'}</p></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="brutal-badge brutal-badge-red shrink-0">3</span>
              <div><strong>{isHindi ? 'क्षेत्र-स्तर ही' : 'Area-Level Only'}</strong><p className="text-xs text-[var(--color-text-muted)]">{isHindi ? '"Central Delhi", "Koramangala" — कभी सटीक पता या GPS स्थान नहीं।' : '"Central Delhi", "Koramangala" — never exact address or GPS location.'}</p></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="brutal-badge brutal-badge-red shrink-0">4</span>
              <div><strong>{isHindi ? 'Forward = असत्यापित' : 'Forwarded = Unverified'}</strong><p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'Forward किया गया कोई भी संदेश तब तक असत्यापित है जब तक आपने खुद पुष्टि न की हो।' : 'Any forwarded message is unverified until YOU have personally confirmed it.'}</p></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="brutal-badge brutal-badge-red shrink-0">5</span>
              <div><strong>{isHindi ? 'तुरंत सुधारो' : 'Correct Immediately'}</strong><p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'गलत जानकारी भेजी? "CORRECTION:" से शुरू करके तुरंत सुधार भेजो। देर मत करो।' : 'Sent wrong info? Immediately send correction starting with "CORRECTION:" Don\'t delay.'}</p></div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="brutal-badge brutal-badge-red shrink-0">6</span>
              <div><strong>{isHindi ? 'इंटरनेट बंद हो तो' : 'If Internet Goes Down'}</strong><p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'Sahayata offline mode (cached directory + rights)। Briar ऐप (Bluetooth mesh)। SMS tree (पहले से तय)। मिलने की जगह पहले से तय करें।' : 'Sahayata offline mode (cached directory + rights). Briar app (Bluetooth mesh). SMS tree (pre-arranged). Pre-decide meeting points.'}</p></div>
            </div>
          </div>
        </div>
      </section>


      {/* Chapter 5: Sustained Pressure */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-purple mb-4">{isHindi ? 'अध्याय 5' : 'CHAPTER 5'}</div>
        <h2 className="heading-1 mb-4">{isHindi ? 'लंबी लड़ाई (टिकाऊ दबाव)' : 'The Long Game (Sustained Pressure)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p className="text-base font-bold">{isHindi ? 'तीव्रता से ज़्यादा ज़रूरी है स्थिरता।' : 'Sustainability matters more than intensity.'}</p>
          <div className="space-y-2">
            <div className="flex gap-3 items-center"><span className="brutal-badge brutal-badge-lime shrink-0">1</span><span>{isHindi ? 'दृश्यता: सोशल मीडिया, बैनर, hashtag, पोस्टर' : 'Visibility: social media, banners, hashtags, posters'}</span></div>
            <div className="flex gap-3 items-center"><span className="brutal-badge brutal-badge-lime shrink-0">2</span><span>{isHindi ? 'एकत्रीकरण: मोमबत्ती मार्च, धरना, मौन प्रदर्शन' : 'Assembly: candlelight marches, dharnas, silent protests'}</span></div>
            <div className="flex gap-3 items-center"><span className="brutal-badge brutal-badge-yellow shrink-0">3</span><span>{isHindi ? 'दबाव: चलो संसद, ज्ञापन, RTI, बहिष्कार' : 'Pressure: Chalo Sansad, memorandums, RTI, boycotts'}</span></div>
            <div className="flex gap-3 items-center"><span className="brutal-badge brutal-badge-accent shrink-0">4</span><span>{isHindi ? 'Non-cooperation: हड़ताल, बंद (अंतिम विकल्प)' : 'Non-cooperation: strikes, bandh (last resort only)'}</span></div>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] border-t-[2px] border-[var(--color-border)] pt-3 mt-4">{isHindi ? 'सिद्धांत: एक स्तर पर पूरी तैयारी के बिना अगले पर मत जाओ। रोटेशन ज़रूरी है — हर कोई आराम करे, हर कोई बारी-बारी से जाए।' : 'Principle: don\'t escalate without full preparation at current level. Rotation is essential — everyone rests, everyone takes turns.'}</p>
        </div>
      </section>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/groups" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{isHindi ? 'इकाई बनाएं' : 'FORM A UNIT'} →</Link>
        <Link href="/resources" className="brutal-btn brutal-btn-dark brutal-btn-lg text-center">{isHindi ? 'संसाधन' : 'RESOURCES'} →</Link>
        <Link href="/safety" className="brutal-btn brutal-btn-lg text-center">{isHindi ? 'अधिकार जानें' : 'KNOW YOUR RIGHTS'} →</Link>
      </div>

      <div className="brutal-banner text-center text-xs mt-8">
        {isHindi ? 'यह प्लेबुक ऑफ़लाइन उपलब्ध है। प्रिंट करें या स्क्रीनशॉट लें।' : 'THIS PLAYBOOK IS AVAILABLE OFFLINE. PRINT IT OR SCREENSHOT IT.'}
      </div>
    </div>
  );
}
