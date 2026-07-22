import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function SafetyPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-purple mb-4">
          {isHindi ? 'सुरक्षा' : 'SAFETY'}
        </div>
        <h1 className="heading-1 mb-3">{isHindi ? 'अपने अधिकार जानें' : 'Know Your Rights'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? 'यह जानकारी ऑफ़लाइन भी उपलब्ध है। स्क्रीनशॉट लें या सेव करें। अंतिम अपडेट: जुलाई 2026।'
            : 'This information is available offline. Screenshot or save it. Last updated: July 2026.'}
        </p>
      </div>

      {/* IMPORTANT: Legal framework update notice */}
      <div className="brutal-banner mb-8">
        {isHindi
          ? '⚠️ ध्यान दें: 1 जुलाई 2024 से CrPC को BNSS (भारतीय नागरिक सुरक्षा संहिता, 2023) ने बदल दिया है। नीचे की जानकारी नए कानून के अनुसार अपडेट है।'
          : '⚠️ NOTE: As of 1 July 2024, CrPC has been replaced by BNSS (Bharatiya Nagarik Suraksha Sanhita, 2023). Information below is updated to reflect the new law.'}
      </div>


      {/* Section 1: Constitutional Right to Protest */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-sky mb-4">{isHindi ? 'संवैधानिक अधिकार' : 'CONSTITUTIONAL RIGHT'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'शांतिपूर्ण विरोध प्रदर्शन का अधिकार' : 'Right to Peaceful Protest'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p><strong>Article 19(1)(a):</strong> {isHindi ? 'वाक् एवं अभिव्यक्ति की स्वतंत्रता' : 'Freedom of speech and expression'}</p>
          <p><strong>Article 19(1)(b):</strong> {isHindi ? 'शांतिपूर्वक और निरायुध सम्मेलन का अधिकार' : 'Right to assemble peaceably and without arms'}</p>
          <p><strong>Article 19(1)(c):</strong> {isHindi ? 'संगम या संघ बनाने का अधिकार' : 'Right to form associations or unions'}</p>
          <p><strong>Article 21:</strong> {isHindi ? 'प्राण एवं दैहिक स्वतंत्रता का अधिकार' : 'Right to life and personal liberty'}</p>
          <p className="text-[var(--color-text-muted)] border-t-[2px] border-[var(--color-border)] pt-3 mt-3">
            <strong>{isHindi ? 'मुख्य निर्णय:' : 'Key judgments:'}</strong>{' '}
            {isHindi
              ? 'रामलीला मैदान (2012) — शांतिपूर्ण विरोध मौलिक अधिकार है। शाहीन बाग (2020) — प्रदर्शन का अधिकार है, लेकिन अनिश्चितकाल तक सार्वजनिक स्थान नहीं रोक सकते।'
              : 'Ramlila Maidan (2012) — peaceful protest is a fundamental right. Shaheen Bagh (2020) — right to protest exists but cannot occupy public ways indefinitely.'}
          </p>
        </div>
      </section>


      {/* Section 2: If Detained — BNSS (replacing CrPC) */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-red mb-4">{isHindi ? 'हिरासत' : 'IF DETAINED'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'अगर आपको हिरासत में लिया जाए (BNSS 2023)' : 'If You Are Detained (BNSS 2023)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p><strong>1.</strong> {isHindi
            ? 'गिरफ्तारी का कारण पूछें। BNSS धारा 47 के तहत पुलिस को गिरफ्तारी का कारण तुरंत बताना अनिवार्य है।'
            : 'Ask the reason for arrest. Under BNSS Section 47, police MUST inform you of the grounds of arrest immediately.'}</p>
          <p><strong>2.</strong> {isHindi
            ? 'अनुच्छेद 22(1): गिरफ्तारी के तुरंत बाद वकील से मिलने का अधिकार। यह मौलिक अधिकार है — इसे कोई अस्वीकार नहीं कर सकता।'
            : 'Article 22(1): Right to consult a lawyer immediately after arrest. This is a fundamental right — no one can deny this.'}</p>
          <p><strong>3.</strong> {isHindi
            ? 'BNSS धारा 50: गिरफ्तारी के तुरंत बाद परिवार/मित्र को सूचित करने का अधिकार। पुलिस को यह करना अनिवार्य है।'
            : 'BNSS Section 50: Right to have family/friend informed immediately upon arrest. Police are OBLIGATED to do this.'}</p>
          <p><strong>4.</strong> {isHindi
            ? 'अनुच्छेद 22(2): 24 घंटे के भीतर निकटतम मजिस्ट्रेट के सामने पेश किया जाना चाहिए (यात्रा समय को छोड़कर)।'
            : 'Article 22(2): Must be produced before nearest magistrate within 24 hours (excluding travel time).'}</p>
          <p><strong>5.</strong> {isHindi
            ? 'आप कोई बयान देने के लिए बाध्य नहीं हैं। अनुच्छेद 20(3) — आत्म-दोष के विरुद्ध संरक्षण। बिना वकील के कुछ न कहें।'
            : 'You are NOT obligated to make any statement. Article 20(3) — protection against self-incrimination. Say nothing without a lawyer.'}</p>
          <p><strong>6.</strong> {isHindi
            ? 'BNSS धारा 35: महिलाओं को सूर्यास्त के बाद गिरफ्तार नहीं किया जा सकता (असाधारण मामलों को छोड़कर, और तब भी महिला अधिकारी अनिवार्य)।'
            : 'BNSS Section 35: Women cannot be arrested after sunset (except in exceptional cases, and even then a female officer is mandatory).'}</p>
          <p><strong>7.</strong> {isHindi
            ? 'D.K. Basu दिशानिर्देश अभी भी लागू हैं: गिरफ्तार करने वाले अधिकारी की पहचान पत्रिका दिखनी चाहिए, गिरफ्तारी मेमो बनाया जाना चाहिए, चिकित्सा जांच का अधिकार।'
            : 'D.K. Basu guidelines still apply: arresting officer must display ID, arrest memo must be prepared, right to medical examination.'}</p>
        </div>
        <div className="brutal-card-flat !p-4 !mt-4 !border-[var(--color-red)]">
          <p className="text-xs font-bold text-[var(--color-red)]">
            {isHindi
              ? '⚠️ महत्वपूर्ण BNSS परिवर्तन: धारा 187 के तहत पुलिस हिरासत अब 60/90 दिनों की अवधि में कभी भी (अधिकतम 15 दिन) ली जा सकती है — पहले यह केवल पहले 15 दिनों में संभव थी। वकील से तुरंत संपर्क करें।'
              : '⚠️ CRITICAL BNSS CHANGE: Under Section 187, police custody (max 15 days) can now be sought at ANY point during the 60/90 day remand period — previously only in first 15 days. Contact a lawyer IMMEDIATELY.'}
          </p>
        </div>
      </section>


      {/* Section 3: Verified Organizations */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-accent mb-4">{isHindi ? 'सत्यापित संगठन' : 'VERIFIED ORGANIZATIONS'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'नागरिक स्वतंत्रता संगठन (वास्तविक, सक्रिय)' : 'Civil Liberties Organizations (Real, Active)'}</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-2">PUCL</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-1">{isHindi ? "पीपुल्स यूनियन फॉर सिविल लिबर्टीज़" : "People's Union for Civil Liberties"}</p>
            <p className="text-xs">Web: pucldelhi.org</p>
            <p className="text-xs">Email: puclnat@gmail.com</p>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'राष्ट्रव्यापी। 1976 से सक्रिय।' : 'Nationwide. Active since 1976.'}</p>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-2">PUDR</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-1">{isHindi ? "पीपुल्स यूनियन फॉर डेमोक्रेटिक राइट्स" : "People's Union for Democratic Rights"}</p>
            <p className="text-xs">Web: pudr.org</p>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'दिल्ली। 1977 से सक्रिय। नागरिक अधिकारों पर रिपोर्ट और कानूनी हस्तक्षेप।' : 'Delhi. Active since 1977. Reports and legal interventions on civil rights.'}</p>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-2">CJP</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-1">{isHindi ? 'सिटीजन्स फॉर जस्टिस एंड पीस' : 'Citizens for Justice and Peace'}</p>
            <p className="text-xs">Web: cjp.org.in</p>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'कानूनी सहायता, मानवाधिकार दस्तावेज़ीकरण, अल्पसंख्यक अधिकार।' : 'Legal aid, human rights documentation, minority rights.'}</p>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-2">IFF</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-1">{isHindi ? 'इंटरनेट फ्रीडम फाउंडेशन' : 'Internet Freedom Foundation'}</p>
            <p className="text-xs">Web: internetfreedom.in</p>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'डिजिटल अधिकार, इंटरनेट शटडाउन, निगरानी विरोध।' : 'Digital rights, internet shutdowns, surveillance opposition.'}</p>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-2">SFLC.in</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-1">{isHindi ? 'सॉफ्टवेयर फ्रीडम लॉ सेंटर' : 'Software Freedom Law Centre'}</p>
            <p className="text-xs">Web: sflc.in</p>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'डिजिटल अधिकारों पर मुफ़्त कानूनी सहायता।' : 'Free legal aid on digital rights issues.'}</p>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-2">NHRC</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-1">{isHindi ? 'राष्ट्रीय मानवाधिकार आयोग' : 'National Human Rights Commission'}</p>
            <p className="text-xs">{isHindi ? 'फ़ोन' : 'Phone'}: 011-23385368</p>
            <p className="text-xs">Web: nhrc.nic.in</p>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'सरकारी निकाय। शिकायत दर्ज की जा सकती है।' : 'Government body. Complaints can be filed.'}</p>
          </div>
        </div>
      </section>


      {/* Section 4: Emergency Helplines — VERIFIED */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-yellow mb-4">{isHindi ? 'हेल्पलाइन' : 'HELPLINES'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'आपातकालीन हेल्पलाइन (सत्यापित, सक्रिय)' : 'Emergency Helplines (Verified, Active)'}</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="brutal-card-flat !p-4 !border-[var(--color-red)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">{isHindi ? 'आपातकालीन' : 'EMERGENCY'}</h3>
            <ul className="space-y-1">
              <li><strong>Police:</strong> 100</li>
              <li><strong>Ambulance:</strong> 102 / 108</li>
              <li><strong>Women Helpline:</strong> 181</li>
              <li><strong>Emergency (unified):</strong> 112</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-4 !border-[var(--color-accent)]">
            <h3 className="font-bold text-[var(--color-accent)] mb-2">{isHindi ? 'कानूनी सहायता' : 'LEGAL AID'}</h3>
            <ul className="space-y-1">
              <li><strong>NALSA (free legal aid):</strong> 15100 (toll-free)</li>
              <li><strong>NALSA WhatsApp:</strong> +91 94180 33385</li>
              <li><strong>Nyaaya.org:</strong> {isHindi ? 'कानून को सरल भाषा में समझाता है' : 'Explains law in plain language'}</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-2">{isHindi ? 'मानवाधिकार' : 'HUMAN RIGHTS'}</h3>
            <ul className="space-y-1">
              <li><strong>NHRC:</strong> 011-23385368</li>
              <li><strong>NHRC complaint:</strong> nhrc.nic.in</li>
              <li><strong>State HRC:</strong> {isHindi ? 'प्रत्येक राज्य का अपना है — Google "[राज्य] SHRC"' : 'Each state has one — Google "[state] SHRC"'}</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-2">{isHindi ? 'डिजिटल अधिकार' : 'DIGITAL RIGHTS'}</h3>
            <ul className="space-y-1">
              <li><strong>IFF:</strong> internetfreedom.in</li>
              <li><strong>SFLC.in:</strong> sflc.in</li>
              <li><strong>{isHindi ? 'इंटरनेट बंद रिपोर्ट' : 'Internet shutdown report'}:</strong> internetshutdowns.in</li>
            </ul>
          </div>
        </div>
      </section>


      {/* Section 5: Digital Safety */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-sky mb-4">{isHindi ? 'डिजिटल सुरक्षा' : 'DIGITAL SAFETY'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'डिजिटल सुरक्षा (हांगकांग/म्यांमार से सीखा गया)' : 'Digital Safety (Learned from Hong Kong / Myanmar)'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p><strong>→</strong> {isHindi
            ? 'Signal का उपयोग करें (WhatsApp नहीं)। Signal में disappearing messages चालू करें। WhatsApp मेटाडेटा Meta को देता है।'
            : 'Use Signal (not WhatsApp). Enable disappearing messages. WhatsApp gives metadata to Meta.'}</p>
          <p><strong>→</strong> {isHindi
            ? 'फ़ोटो शेयर करने से पहले EXIF डेटा हटाएं (GPS, समय)। Signal ऐप इसे स्वचालित करता है। ObscuraCam ऐप चेहरे धुंधले करता है।'
            : 'Strip EXIF data (GPS, timestamps) before sharing photos. Signal does this automatically. ObscuraCam app blurs faces.'}</p>
          <p><strong>→</strong> {isHindi
            ? 'फ़ोन पासकोड से लॉक करें — बायोमेट्रिक नहीं। कानूनी रूप से आपको पासवर्ड देने के लिए मजबूर नहीं किया जा सकता, लेकिन फिंगरप्रिंट लिया जा सकता है।'
            : 'Lock phone with passcode — not biometric. Legally you cannot be compelled to give a password, but fingerprints can be taken.'}</p>
          <p><strong>→</strong> {isHindi
            ? 'VPN का उपयोग करें: ProtonVPN (मुफ़्त टियर भरोसेमंद) या Mullvad। मुफ़्त VPN से बचें — वे डेटा बेचते हैं।'
            : 'Use a VPN: ProtonVPN (free tier is trustworthy) or Mullvad. Avoid free VPNs — they sell data.'}</p>
          <p><strong>→</strong> {isHindi
            ? 'बिना सहमति के किसी की पहचान साझा न करें। चेहरे धुंधले करें। नाम न लिखें।'
            : 'Never share someone\'s identity without consent. Blur faces. Don\'t write names.'}</p>
          <p><strong>→</strong> {isHindi
            ? '2FA (दो-चरणीय सत्यापन) सभी खातों पर चालू करें — SMS नहीं, authenticator ऐप या hardware key।'
            : 'Enable 2FA on all accounts — NOT SMS, use authenticator app or hardware key.'}</p>
          <p><strong>→</strong> {isHindi
            ? 'इंटरनेट बंद होने पर: Briar ऐप (Bluetooth/WiFi mesh), Bridgefy, या ऑफ़लाइन मोड में Sahayata।'
            : 'During internet shutdown: Briar app (Bluetooth/WiFi mesh), Bridgefy, or Sahayata in offline mode.'}</p>
          <p><strong>→</strong> {isHindi
            ? 'Telegram चैनल सार्वजनिक हैं — फ़ोन नंबर छुपाने के लिए Settings → Privacy → Phone Number → Nobody।'
            : 'Telegram channels are public — to hide your phone: Settings → Privacy → Phone Number → Nobody.'}</p>
        </div>
      </section>


      {/* Section 6: Protest Safety — Field-tested */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-accent mb-4">{isHindi ? 'प्रदर्शन' : 'AT A PROTEST'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'विरोध प्रदर्शन में सुरक्षा (फ़ील्ड-परीक्षित)' : 'Protest Safety (Field-Tested)'}</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <div>
            <h3 className="font-bold mb-2 uppercase text-xs tracking-wider">{isHindi ? 'जाने से पहले' : 'BEFORE YOU GO'}</h3>
            <ul className="list-none space-y-1.5">
              <li>→ {isHindi ? 'किसी विश्वसनीय व्यक्ति को बताएं: कहाँ, कब तक, अगर संपर्क न हो तो क्या करें' : 'Tell a trusted person: where, how long, what to do if no contact'}</li>
              <li>→ {isHindi ? 'आपातकालीन नंबर बांह पर स्थायी मार्कर से लिखें (NALSA: 15100, वकील का नंबर)' : 'Write emergency numbers on arm with permanent marker (NALSA: 15100, lawyer\'s number)'}</li>
              <li>→ {isHindi ? 'फ़ोन पूरा चार्ज + पोर्टेबल बैटरी। Flight mode में रखें जब तक ज़रूरत न हो।' : 'Full charge phone + portable battery. Keep in flight mode until needed.'}</li>
              <li>→ {isHindi ? 'ले जाएं: पानी, स्नैक्स, ID की फ़ोटोकॉपी (मूल घर रखें), कैश (UPI बंद हो सकता है)' : 'Bring: water, snacks, photocopy of ID (leave originals home), cash (UPI may be down)'}</li>
              <li>→ {isHindi ? 'आँसू गैस किट: गीला कपड़ा, सादा पानी की बोतल (आँखें धोने), चश्मा (contact lens नहीं)' : 'Tear gas kit: wet cloth, plain water bottle (rinse eyes), goggles (no contact lenses)'}</li>
              <li>→ {isHindi ? 'हल्के, ढकने वाले कपड़े। बिना logo/पहचान वाले। दौड़ने लायक जूते।' : 'Light, covering clothes. No logos/identifiable. Running shoes.'}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 uppercase text-xs tracking-wider">{isHindi ? 'वहाँ पहुँचकर' : 'ONCE THERE'}</h3>
            <ul className="list-none space-y-1.5">
              <li>→ {isHindi ? 'Buddy system: कम से कम एक दोस्त के साथ रहें। हर 30 मिनट में check-in।' : 'Buddy system: stay with at least one friend. Check-in every 30 minutes.'}</li>
              <li>→ {isHindi ? 'बाहर निकलने के रास्ते पहले पहचानें। कम से कम 2 exit routes याद रखें।' : 'Identify exits FIRST. Memorize at least 2 exit routes.'}</li>
              <li>→ {isHindi ? 'भीड़ के किनारे रहें — बीच में फंसना सबसे खतरनाक।' : 'Stay at edges of crowd — being trapped in the middle is most dangerous.'}</li>
              <li>→ {isHindi ? 'भड़काने वालों से दूर रहें। वे जानबूझकर हिंसा शुरू करते हैं।' : 'Stay away from provocateurs. They deliberately start violence.'}</li>
              <li>→ {isHindi ? 'लाठी चार्ज: सिर और पेट ढकें, बैठ जाएं अगर फंसे हों, किनारे की तरफ़ जाएं।' : 'Lathi charge: cover head and stomach, sit down if trapped, move toward edges.'}</li>
              <li>→ {isHindi ? 'आँसू गैस: हवा की दिशा में भागें (गैस से दूर), ऊँचाई पर जाएं (गैस भारी है, नीचे रहती है)।' : 'Tear gas: run upwind (away from gas), go uphill (gas is heavy, settles low).'}</li>
            </ul>
          </div>
        </div>
      </section>


      {/* Section 7: Legal Observer Role */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-purple mb-4">{isHindi ? 'भूमिका' : 'ROLES'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'कानूनी पर्यवेक्षक (Legal Observer) कैसे बनें' : 'How to Be a Legal Observer'}</h2>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>{isHindi
            ? 'कानूनी पर्यवेक्षक = वे लोग जो प्रदर्शन में भाग नहीं लेते, बल्कि पुलिस कार्रवाई को दस्तावेज़ करते हैं। यह सबसे शक्तिशाली सुरक्षा उपकरण है।'
            : 'Legal observers = people who don\'t participate in the protest, but document police actions. This is the most powerful protection tool.'}</p>
          <ul className="list-none space-y-1.5">
            <li>→ {isHindi ? 'पहचान बनाएं: "LEGAL OBSERVER" लिखी पट्टी, हाई-विज जैकेट' : 'Identify yourself: "LEGAL OBSERVER" armband, high-vis jacket'}</li>
            <li>→ {isHindi ? 'दस्तावेज़ करें: समय, स्थान, अधिकारियों के बैज नंबर, क्या हुआ, गवाह' : 'Document: time, location, officer badge numbers, what happened, witnesses'}</li>
            <li>→ {isHindi ? 'वीडियो रिकॉर्ड करें लेकिन प्रदर्शनकारियों के चेहरे न दिखाएं — केवल पुलिस कार्रवाई' : 'Record video but don\'t show protesters\' faces — only police actions'}</li>
            <li>→ {isHindi ? 'बैकअप: क्लाउड पर ऑटो-अपलोड (Google Drive/Proton Drive), डिवाइस ज़ब्त हो सकता है' : 'Backup: auto-upload to cloud (Google Drive/Proton Drive), device may be seized'}</li>
            <li>→ {isHindi ? 'कभी हस्तक्षेप न करें — आपकी शक्ति दस्तावेज़ीकरण में है, शारीरिक हस्तक्षेप में नहीं' : 'Never intervene physically — your power is in documentation, not physical intervention'}</li>
          </ul>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="brutal-banner text-center text-xs">
        {isHindi
          ? 'यह सामान्य जानकारी है, कानूनी सलाह नहीं। विशिष्ट स्थितियों के लिए हमेशा एक योग्य वकील से परामर्श करें। NALSA हेल्पलाइन (15100) मुफ़्त कानूनी सहायता प्रदान करती है।'
          : 'THIS IS GENERAL INFORMATION, NOT LEGAL ADVICE. ALWAYS CONSULT A QUALIFIED LAWYER FOR SPECIFIC SITUATIONS. NALSA HELPLINE (15100) PROVIDES FREE LEGAL AID.'}
      </div>

      {/* Last verified */}
      <p className="text-xs text-[var(--color-text-muted)] text-center mt-4">
        {isHindi
          ? 'अंतिम सत्यापन: जुलाई 2026 · स्रोत: BNSS 2023, CJP.org.in, NALSA, PUCL, PUDR, nyaaya.org'
          : 'Last verified: July 2026 · Sources: BNSS 2023, CJP.org.in, NALSA, PUCL, PUDR, nyaaya.org'}
      </p>
    </div>
  );
}
