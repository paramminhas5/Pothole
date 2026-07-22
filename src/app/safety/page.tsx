import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function SafetyPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">
          {hi ? 'अपने अधिकार जानें' : 'Know Your Rights'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {hi ? 'विरोध, हिरासत, पुलिस मुठभेड़, और डिजिटल सुरक्षा — सब कुछ एक जगह।' : 'Protest, detention, police encounters, and digital safety — everything in one place.'}
        </p>
        <div className="brutal-banner mt-4 text-xs">
          {hi ? 'यह सामान्य जानकारी है, कानूनी सलाह नहीं। अपनी स्थिति के लिए योग्य वकील से बात करें।' : 'This is general information, not legal advice. Consult a qualified lawyer for your specific situation.'}
        </div>
      </div>


      {/* CONSTITUTIONAL RIGHTS */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'संवैधानिक अधिकार' : 'Constitutional Rights'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 border-l-4 border-[var(--color-primary)]">
            <strong>Article 19(1)(a)</strong> — {hi ? 'बोलने और अभिव्यक्ति की स्वतंत्रता' : 'Freedom of speech and expression'}
          </div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]">
            <strong>Article 19(1)(b)</strong> — {hi ? 'शांतिपूर्ण और निःशस्त्र सभा का अधिकार' : 'Right to assemble peaceably and without arms'}
          </div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]">
            <strong>Article 21</strong> — {hi ? 'जीवन और व्यक्तिगत स्वतंत्रता का अधिकार' : 'Right to life and personal liberty'}
          </div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]">
            <strong>Article 22(1)</strong> — {hi ? 'गिरफ्तारी का कारण जानने और वकील से मिलने का अधिकार' : 'Right to be informed of grounds of arrest and to consult a lawyer'}
          </div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]">
            <strong>Article 22(2)</strong> — {hi ? '24 घंटे में निकटतम मजिस्ट्रेट के सामने पेश होने का अधिकार' : 'Right to be produced before nearest magistrate within 24 hours'}
          </div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]">
            <strong>Article 20(3)</strong> — {hi ? 'अपने खिलाफ गवाही देने के लिए बाध्य नहीं किया जा सकता' : 'Cannot be compelled to be a witness against yourself'}
          </div>
        </div>
        <p className="text-xs mt-3 text-[var(--color-text-muted)]">{hi ? 'सुप्रीम कोर्ट ने रामलीला मैदान (2012) और मजदूर किसान शक्ति संगठन (2018) में शांतिपूर्ण विरोध के अधिकार की पुष्टि की है।' : 'Supreme Court affirmed right to peaceful protest in Ramlila Maidan (2012) and Mazdoor Kisan Shakti Sangathan (2018).'}</p>
      </section>


      {/* IF POLICE STOP YOU */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'अगर पुलिस रोके' : 'If Police Stop You'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'शांत रहें। शारीरिक प्रतिरोध न करें।' : 'Stay calm. Do not physically resist.'}</li>
          <li>→ {hi ? 'पूछें: "मुझे क्यों रोका जा रहा है?" — आपको कारण जानने का अधिकार है।' : 'Ask: "Why am I being stopped?" — you have the right to know the reason.'}</li>
          <li>→ {hi ? 'नाम और बैज नंबर पूछें — यह आपका अधिकार है।' : 'Ask for name and badge number — this is your right.'}</li>
          <li>→ {hi ? 'आप बातचीत रिकॉर्ड कर सकते हैं (भारत में सार्वजनिक स्थान पर रिकॉर्डिंग स्पष्ट रूप से प्रतिबंधित नहीं है)।' : 'You can record the interaction (recording in public places is not explicitly prohibited in India).'}</li>
          <li>→ {hi ? 'फोन पासवर्ड देने के लिए बाध्य नहीं हैं। "मैं अपना फोन अनलॉक करने से इनकार करता/करती हूँ" कहें।' : 'You are NOT obligated to give phone password. Say "I decline to unlock my phone."'}</li>
          <li>→ {hi ? 'बिना वारंट तलाशी: पुरुषों की शरीर तलाशी केवल पुरुष अधिकारी। महिलाओं की केवल महिला अधिकारी।' : 'Search without warrant: body search of men only by male officer. Women only by female officer.'}</li>
          <li>→ {hi ? 'सब कुछ नोट करें — समय, जगह, अधिकारी, वाहन नंबर, गवाह।' : 'Note everything — time, place, officers, vehicle numbers, witnesses.'}</li>
        </ul>
      </section>

      {/* IF DETAINED / ARRESTED */}
      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">{hi ? 'अगर हिरासत में लिया जाए / गिरफ्तार किया जाए' : 'If Detained / Arrested'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'तुरंत:' : 'Immediately:'}</strong>
            <ol className="mt-2 list-decimal list-inside space-y-1">
              <li>{hi ? 'गिरफ्तारी का कारण पूछें (अनुच्छेद 22(1))' : 'Ask for grounds of arrest (Article 22(1))'}</li>
              <li>{hi ? 'वकील से बात करने का अधिकार माँगें (अनुच्छेद 22(1))' : 'Demand right to consult lawyer (Article 22(1))'}</li>
              <li>{hi ? 'परिवार/दोस्त को सूचित करने का अधिकार (BNSS धारा 37)' : 'Right to inform family/friend (BNSS Section 37)'}</li>
              <li>{hi ? '24 घंटे में मजिस्ट्रेट के सामने पेश होने का अधिकार (अनुच्छेद 22(2))' : 'Right to be produced before magistrate within 24 hours (Article 22(2))'}</li>
              <li>{hi ? 'चिकित्सा जाँच का अधिकार' : 'Right to medical examination'}</li>
              <li>{hi ? 'चुप रहने का अधिकार — अपने खिलाफ कुछ भी बोलने के लिए बाध्य नहीं (अनुच्छेद 20(3))' : 'Right to remain silent — cannot be compelled to say anything against yourself (Article 20(3))'}</li>
            </ol>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'महत्वपूर्ण:' : 'Important:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ {hi ? 'महिलाओं को सूर्यास्त के बाद और सूर्योदय से पहले गिरफ्तार नहीं किया जा सकता (विशेष परिस्थितियों को छोड़कर)।' : 'Women cannot be arrested after sunset and before sunrise (except exceptional circumstances).'}</li>
              <li>→ {hi ? 'मुफ्त कानूनी सहायता का अधिकार (अनुच्छेद 39A, कानूनी सेवा प्राधिकरण अधिनियम)।' : 'Right to free legal aid (Article 39A, Legal Services Authorities Act).'}</li>
              <li>→ {hi ? 'कोई भी बयान जो दबाव में दिया गया वह अदालत में अमान्य है।' : 'Any statement made under duress is inadmissible in court.'}</li>
              <li>→ {hi ? 'FIR की प्रति माँगें — यह आपका अधिकार है।' : 'Ask for a copy of the FIR — this is your right.'}</li>
            </ul>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'याद रखने योग्य वाक्य:' : 'Phrases to remember:'}</strong>
            <ul className="mt-2 space-y-1 italic">
              <li>"{hi ? 'मुझे गिरफ्तारी का कारण बताएँ।' : 'Tell me the grounds of my arrest.'}"</li>
              <li>"{hi ? 'मुझे वकील से बात करनी है।' : 'I want to speak to a lawyer.'}"</li>
              <li>"{hi ? 'मुझे अपने परिवार को सूचित करने दें।' : 'Let me inform my family.'}"</li>
              <li>"{hi ? 'मैं बिना वकील के कोई बयान नहीं दूँगा/दूँगी।' : 'I will not give any statement without my lawyer.'}"</li>
              <li>"{hi ? 'मैं अपना फोन अनलॉक करने से इनकार करता/करती हूँ।' : 'I decline to unlock my phone.'}"</li>
            </ul>
          </div>
        </div>
      </section>


      {/* SECTION 163 BNSS */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'धारा 163 BNSS (पहले धारा 144 CrPC)' : 'Section 163 BNSS (formerly Section 144 CrPC)'}</h2>
        <div className="space-y-2 text-sm">
          <p><strong>{hi ? 'क्या है:' : 'What it is:'}</strong> {hi ? 'निषेधाज्ञा आदेश जो सभा/जुलूस पर प्रतिबंध लगाता है।' : 'Prohibitory order that restricts assemblies/processions.'}</p>
          <p><strong>{hi ? 'अवधि:' : 'Duration:'}</strong> {hi ? 'अधिकतम 2 महीने (नवीकरणीय)।' : 'Maximum 2 months (renewable).'}</p>
          <p><strong>{hi ? 'क्या कर सकता है:' : 'What it can do:'}</strong> {hi ? '5+ लोगों की सभा प्रतिबंधित, जुलूस प्रतिबंधित, हथियार रखना प्रतिबंधित।' : 'Prohibit assemblies of 5+, ban processions, restrict carrying weapons.'}</p>
          <p><strong>{hi ? 'क्या नहीं कर सकता:' : 'What it cannot do:'}</strong> {hi ? 'शांतिपूर्ण व्यक्तिगत अभिव्यक्ति अभी भी संरक्षित हो सकती है (केस-बाय-केस)।' : 'Peaceful individual expression may still be protected (case-by-case).'}</p>
          <p><strong>{hi ? 'चुनौती:' : 'Challenge:'}</strong> {hi ? 'हाई कोर्ट में रिट याचिका द्वारा चुनौती दी जा सकती है।' : 'Can be challenged via writ petition in High Court.'}</p>
          <p><strong>{hi ? 'उल्लंघन का दंड:' : 'Penalty for violation:'}</strong> {hi ? 'IPC धारा 188 — 1 माह कारावास या ₹200 जुर्माना (या दोनों)।' : 'IPC Section 188 — 1 month imprisonment or ₹200 fine (or both).'}</p>
        </div>
      </section>

      {/* DIGITAL SAFETY */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'डिजिटल सुरक्षा' : 'Digital Safety'}</h2>
        <div className="space-y-4 text-sm">
          <div>
            <strong>{hi ? 'विरोध से पहले:' : 'Before a protest:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ {hi ? 'फोन को मजबूत PIN से लॉक करें (6+ अंक)। बायोमेट्रिक अक्षम करें।' : 'Lock phone with strong PIN (6+ digits). Disable biometrics.'}</li>
              <li>→ {hi ? 'लोकेशन सर्विसेज बंद करें।' : 'Turn off location services.'}</li>
              <li>→ {hi ? 'AirDrop/Nearby Share बंद करें।' : 'Turn off AirDrop/Nearby Share.'}</li>
              <li>→ {hi ? 'महत्वपूर्ण डेटा क्लाउड पर बैकअप करें।' : 'Back up important data to cloud.'}</li>
              <li>→ {hi ? 'ऑटो-डिलीट मैसेज चालू करें (Signal: 1 घंटा या 1 दिन)।' : 'Enable auto-delete messages (Signal: 1 hour or 1 day).'}</li>
              <li>→ {hi ? 'अनावश्यक ऐप्स लॉगआउट करें (बैंकिंग, सोशल मीडिया)।' : 'Log out of unnecessary apps (banking, social media).'}</li>
              <li>→ {hi ? 'सेकेंडरी/बर्नर फोन ले जाएँ अगर संभव हो।' : 'Carry a secondary/burner phone if possible.'}</li>
            </ul>
          </div>
          <div>
            <strong>{hi ? 'विरोध के दौरान:' : 'During a protest:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ {hi ? 'फ्लाइट मोड ऑन रखें जब ज़रूरत न हो। WiFi/Bluetooth बंद।' : 'Keep flight mode on when not needed. WiFi/Bluetooth off.'}</li>
              <li>→ {hi ? 'फोटो/वीडियो लें → तुरंत क्लाउड पर अपलोड।' : 'Take photos/videos → immediately upload to cloud.'}</li>
              <li>→ {hi ? 'मेटाडेटा: समय और जगह नोट करें (स्क्रीनशॉट में घड़ी दिखाएँ)।' : 'Metadata: note time and place (show clock in screenshots).'}</li>
              <li>→ {hi ? 'VPN इस्तेमाल करें अगर इंटरनेट शटडाउन की आशंका हो।' : 'Use VPN if internet shutdown is expected.'}</li>
            </ul>
          </div>
          <div>
            <strong>{hi ? 'अगर फोन ज़ब्त हो:' : 'If phone is seized:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ {hi ? 'अनलॉक करने से इनकार करें। "मैं अपना फोन अनलॉक करने से इनकार करता/करती हूँ।"' : 'Refuse to unlock. "I decline to unlock my phone."'}</li>
              <li>→ {hi ? 'भारत में कोई स्पष्ट कानूनी प्रावधान नहीं है जो बायोमेट्रिक अनलॉक बाध्य कर सके।' : 'No clear legal provision in India compels biometric unlock.'}</li>
              <li>→ {hi ? 'ज़ब्ती की रसीद माँगें — इसमें उपकरणों की सूची हो।' : 'Ask for seizure receipt — it should list devices.'}</li>
              <li>→ {hi ? 'वकील को तुरंत बताएँ।' : 'Inform lawyer immediately.'}</li>
            </ul>
          </div>
        </div>
      </section>


      {/* TEAR GAS / WATER CANNON / LATHI */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'अगर आँसू गैस / वॉटर कैनन / लाठी चार्ज हो' : 'If Tear Gas / Water Cannon / Lathi Charge'}</h2>
        <div className="space-y-4 text-sm">
          <div>
            <strong>{hi ? 'आँसू गैस:' : 'Tear gas:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ {hi ? 'हवा की दिशा से 90° पर चलें (हवा से दूर, न कि सीधे पीछे)।' : 'Move perpendicular to wind (away from wind, not straight back).'}</li>
              <li>→ {hi ? 'नाक-मुँह गीले कपड़े से ढकें।' : 'Cover nose-mouth with wet cloth.'}</li>
              <li>→ {hi ? 'आँखें मत रगड़ें — साफ पानी से धोएँ।' : 'Do NOT rub eyes — rinse with clean water.'}</li>
              <li>→ {hi ? 'कॉन्टैक्ट लेंस तुरंत निकालें।' : 'Remove contact lenses immediately.'}</li>
              <li>→ {hi ? 'ऊँचाई पर जाएँ (गैस भारी होती है, नीचे बैठती है)।' : 'Move to higher ground (gas is heavy, settles low).'}</li>
            </ul>
          </div>
          <div>
            <strong>{hi ? 'वॉटर कैनन:' : 'Water cannon:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ {hi ? 'सीधे निशाने में न खड़े हों — बहुत तेज दबाव होता है।' : 'Do not stand directly in line — pressure is very high.'}</li>
              <li>→ {hi ? 'बैठ जाएँ या किसी मजबूत ढाँचे के पीछे जाएँ।' : 'Sit down or get behind a solid structure.'}</li>
              <li>→ {hi ? 'पानी में केमिकल हो सकता है — जल्दी कपड़े बदलें, नहाएँ।' : 'Water may contain chemicals — change clothes quickly, bathe.'}</li>
            </ul>
          </div>
          <div>
            <strong>{hi ? 'लाठी चार्ज:' : 'Lathi charge:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ {hi ? 'सिर और पेट बचाएँ — हाथ ऊपर, गोलाकार मुद्रा।' : 'Protect head and abdomen — arms up, fetal position.'}</li>
              <li>→ {hi ? 'भीड़ में भगदड़ से बचें — किनारे की तरफ जाएँ।' : 'Avoid stampede in crowd — move toward edges.'}</li>
              <li>→ {hi ? 'चोट लगे → टाइमस्टैम्प्ड फोटो → अस्पताल जाएँ → MLC बनवाएँ।' : 'If injured → timestamped photos → go to hospital → get MLC (medico-legal certificate).'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* EVIDENCE PRESERVATION */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'सबूत सुरक्षित करें' : 'Preserve Evidence'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'वीडियो/फोटो में समय और जगह दिखे (घड़ी, लैंडमार्क)।' : 'Video/photos should show time and place (clock, landmarks).'}</li>
          <li>→ {hi ? 'तुरंत क्लाउड पर बैकअप करें (Google Drive, iCloud, Sahayata Vault)।' : 'Back up to cloud immediately (Google Drive, iCloud, Sahayata Vault).'}</li>
          <li>→ {hi ? 'ओरिजिनल फाइल कभी एडिट/क्रॉप न करें।' : 'Never edit/crop original files.'}</li>
          <li>→ {hi ? 'बैज नंबर, वाहन नंबर, यूनिट पहचान नोट करें।' : 'Note badge numbers, vehicle numbers, unit identifiers.'}</li>
          <li>→ {hi ? 'गवाहों के संपर्क लें (उनकी सहमति से)।' : 'Get witness contacts (with their consent).'}</li>
          <li>→ {hi ? 'जितनी जल्दी हो, घटना की टाइमलाइन लिखें — याददाश्त जल्दी धुँधली होती है।' : 'Write event timeline ASAP — memory fades quickly.'}</li>
          <li>→ {hi ? 'Sahayata Evidence Vault का उपयोग करें: एन्क्रिप्ट + SHA-256 हैश = छेड़छाड़-प्रमाण।' : 'Use Sahayata Evidence Vault: encrypt + SHA-256 hash = tamper-proof.'}</li>
        </ul>
        <Link href="/vault" className="text-link mt-3 inline-block">{hi ? 'एविडेंस वॉल्ट खोलें →' : 'Open Evidence Vault →'}</Link>
      </section>


      {/* EMERGENCY CONTACTS */}
      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">{hi ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div><strong>112</strong><br />{hi ? 'एकीकृत आपातकालीन' : 'Unified Emergency'}</div>
          <div><strong>100</strong><br />{hi ? 'पुलिस' : 'Police'}</div>
          <div><strong>108</strong><br />{hi ? 'एम्बुलेंस' : 'Ambulance'}</div>
          <div><strong>181</strong><br />{hi ? 'महिला हेल्पलाइन' : 'Women Helpline'}</div>
          <div><strong>1098</strong><br />{hi ? 'चाइल्डलाइन' : 'Childline'}</div>
          <div><strong>1930</strong><br />{hi ? 'साइबर अपराध' : 'Cyber Crime'}</div>
        </div>
        <div className="mt-4 p-3 bg-[var(--color-surface-alt)] rounded text-sm">
          <strong>{hi ? 'NHRC शिकायत:' : 'NHRC Complaint:'}</strong> {hi ? 'nhrc.nic.in पर ऑनलाइन शिकायत दर्ज करें — पुलिस अत्याचार, मानवाधिकार उल्लंघन।' : 'File online complaint at nhrc.nic.in — police brutality, human rights violations.'}
        </div>
        <Link href="/resources" className="text-link mt-3 inline-block">{hi ? 'सभी संसाधन और हेल्पलाइन →' : 'All resources & helplines →'}</Link>
      </section>

      {/* WHAT TO DO AFTER */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'घटना के बाद' : 'After an Incident'}</h2>
        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li>{hi ? 'सुरक्षित जगह जाएँ।' : 'Get to a safe location.'}</li>
          <li>{hi ? 'चोट लगी हो → अस्पताल जाएँ → MLC (मेडिको-लीगल सर्टिफिकेट) बनवाएँ।' : 'If injured → go to hospital → get MLC (medico-legal certificate).'}</li>
          <li>{hi ? 'घटना की टाइमलाइन लिखें (जितनी जल्दी हो)।' : 'Write event timeline (as soon as possible).'}</li>
          <li>{hi ? 'सबूत सुरक्षित करें (Evidence Vault)।' : 'Secure evidence (Evidence Vault).'}</li>
          <li>{hi ? 'वकील से बात करें।' : 'Talk to a lawyer.'}</li>
          <li>{hi ? 'NHRC/SHRC में शिकायत दर्ज करें (अगर मानवाधिकार उल्लंघन हुआ)।' : 'File complaint with NHRC/SHRC (if human rights violation occurred).'}</li>
          <li>{hi ? 'FIR दर्ज करें (अगर अपराध हुआ)।' : 'File FIR (if a crime was committed).'}</li>
          <li>{hi ? 'मानसिक स्वास्थ्य — किसी से बात करें। iCall: 9152987821।' : 'Mental health — talk to someone. iCall: 9152987821.'}</li>
        </ol>
      </section>

      {/* LINKS */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/resources" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'सभी संसाधन →' : 'ALL RESOURCES →'}</Link>
        <Link href="/fir" className="brutal-btn brutal-btn-lg text-center">{hi ? 'FIR असिस्टेंट →' : 'FIR ASSISTANT →'}</Link>
        <Link href="/vault" className="brutal-btn brutal-btn-lg text-center">{hi ? 'एविडेंस वॉल्ट →' : 'EVIDENCE VAULT →'}</Link>
      </div>
    </div>
  );
}
