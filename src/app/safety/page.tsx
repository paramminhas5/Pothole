import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';
import ShareButton from '@/components/ShareButton';
import ReportError from '@/components/ReportError';

export default async function SafetyPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-6 flex justify-between items-start gap-4">
        <div>
          <h1 className="heading-display mb-2">{hi ? 'अपने अधिकार जानें' : 'Know Your Rights'}</h1>
          <p className="text-[var(--color-text-muted)]">{hi ? 'प्रिंट करें। फोन में सेव करें। याद करें।' : 'Print it. Save it. Memorize it.'}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <ShareButton locale={locale} title={hi ? 'अधिकार कार्ड — Sahayata' : 'Rights Card — Sahayata'} />
          <PrintButton locale={locale} />
          <ReportError locale={locale} context="safety/rights" />
        </div>
      </div>


      {/* POCKET CARD — fits one screen, printable */}
      <section className="brutal-card mb-8 !border-[var(--color-primary)] print:border-2" id="pocket-card">
        <div className="text-center mb-4">
          <h2 className="heading-2">{hi ? '📋 पॉकेट अधिकार कार्ड' : '📋 Pocket Rights Card'}</h2>
          <p className="text-xs text-[var(--color-text-muted)]">{hi ? 'इसे प्रिंट करें या स्क्रीनशॉट लें' : 'Print this or take a screenshot'}</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold text-sm mb-2">{hi ? '🗣️ ये वाक्य बोलें:' : '🗣️ SAY THESE WORDS:'}</h3>
            <ul className="space-y-2 text-sm">
              <li className="font-bold">"{hi ? 'मुझे रोकने / गिरफ्तार करने का कारण बताएँ।' : 'Tell me the reason for stopping / arresting me.'}"</li>
              <li className="font-bold">"{hi ? 'मुझे वकील से बात करनी है।' : 'I want to speak to a lawyer.'}"</li>
              <li className="font-bold">"{hi ? 'मेरे परिवार को सूचित करें।' : 'Inform my family.'}"</li>
              <li className="font-bold">"{hi ? 'मैं अपना फोन अनलॉक नहीं करूँगा/करूँगी।' : 'I will not unlock my phone.'}"</li>
              <li className="font-bold">"{hi ? 'मैं बिना वकील कोई बयान नहीं दूँगा/दूँगी।' : 'I will not give any statement without my lawyer.'}"</li>
            </ul>
          </div>

          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold text-sm mb-2">{hi ? '⚡ याद रखें:' : '⚡ REMEMBER:'}</h3>
            <ul className="space-y-1 text-sm">
              <li>• {hi ? '24 घंटे में मजिस्ट्रेट के सामने पेश होना ज़रूरी' : 'Must be produced before magistrate within 24 hours'}</li>
              <li>• {hi ? 'चुप रहने का अधिकार है — बोलने के लिए मजबूर नहीं कर सकते' : 'Right to remain silent — cannot be forced to speak'}</li>
              <li>• {hi ? 'महिलाएँ: रात में गिरफ्तार नहीं किया जा सकता' : 'Women: cannot be arrested at night'}</li>
              <li>• {hi ? 'नाम और बैज नंबर माँगें — लिख लें' : 'Ask for name + badge number — write it down'}</li>
              <li>• {hi ? 'मुफ्त वकील का अधिकार — DSLSA: 1516' : 'Right to free lawyer — DSLSA: 1516'}</li>
              <li>• {hi ? 'FIR की कॉपी माँगने का अधिकार' : 'Right to demand copy of FIR'}</li>
            </ul>
          </div>

          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold text-sm mb-2">{hi ? '📞 तुरंत कॉल करें:' : '📞 CALL IMMEDIATELY:'}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>1516</strong> — {hi ? 'मुफ्त वकील (दिल्ली)' : 'Free lawyer (Delhi)'}</div>
              <div><strong>112</strong> — {hi ? 'आपातकालीन' : 'Emergency'}</div>
              <div><strong>NHRC</strong> — 011-24663333</div>
              <div><strong>181</strong> — {hi ? 'महिला' : 'Women'}</div>
            </div>
          </div>
        </div>
      </section>


      {/* FULL GUIDE — expandable sections */}
      <h2 className="heading-2 mb-6 mt-12">{hi ? 'विस्तृत अधिकार गाइड' : 'Detailed Rights Guide'}</h2>

      {/* CONSTITUTIONAL BASIS */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '📜 संवैधानिक आधार' : '📜 Constitutional Basis'}</summary>
        <div className="mt-4 space-y-3 text-sm">
          <div className="p-3 border-l-4 border-[var(--color-primary)]"><strong>Article 19(1)(a)</strong> — {hi ? 'बोलने और अभिव्यक्ति की स्वतंत्रता' : 'Freedom of speech and expression'}</div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]"><strong>Article 19(1)(b)</strong> — {hi ? 'शांतिपूर्ण और निःशस्त्र सभा का अधिकार' : 'Right to assemble peaceably and without arms'}</div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]"><strong>Article 21</strong> — {hi ? 'जीवन और व्यक्तिगत स्वतंत्रता का अधिकार' : 'Right to life and personal liberty'}</div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]"><strong>Article 22(1)</strong> — {hi ? 'गिरफ्तारी का कारण जानने + वकील से मिलने का अधिकार' : 'Right to know grounds of arrest + consult lawyer'}</div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]"><strong>Article 22(2)</strong> — {hi ? '24 घंटे में मजिस्ट्रेट के सामने पेश' : 'Produced before magistrate within 24 hours'}</div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]"><strong>Article 20(3)</strong> — {hi ? 'अपने खिलाफ गवाही देने को बाध्य नहीं' : 'Cannot be compelled to be witness against yourself'}</div>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? 'सुप्रीम कोर्ट: रामलीला मैदान (2012), मजदूर किसान शक्ति संगठन (2018) — शांतिपूर्ण विरोध मौलिक अधिकार है।' : 'Supreme Court: Ramlila Maidan (2012), Mazdoor Kisan Shakti Sangathan (2018) — peaceful protest is a fundamental right.'}</p>
        </div>
      </details>

      {/* IF STOPPED */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '🚨 अगर पुलिस रोके' : '🚨 If Police Stop You'}</summary>
        <div className="mt-4 space-y-2 text-sm">
          <p>→ {hi ? 'शांत रहें। शारीरिक प्रतिरोध न करें।' : 'Stay calm. Do not physically resist.'}</p>
          <p>→ {hi ? '"मुझे क्यों रोका जा रहा है?" पूछें।' : 'Ask "Why am I being stopped?"'}</p>
          <p>→ {hi ? 'नाम + बैज नंबर पूछें और लिखें।' : 'Ask name + badge number and write it down.'}</p>
          <p>→ {hi ? 'आप रिकॉर्ड कर सकते हैं (सार्वजनिक स्थान पर)।' : 'You can record (in public place).'}</p>
          <p>→ {hi ? 'फोन अनलॉक करने से मना करें। "मैं मना करता/करती हूँ।"' : 'Refuse to unlock phone. "I decline."'}</p>
          <p>→ {hi ? 'तलाशी: पुरुष → पुरुष अधिकारी। महिला → महिला अधिकारी।' : 'Search: men → male officer. Women → female officer only.'}</p>
          <p>→ {hi ? 'सब कुछ नोट करें: समय, जगह, अधिकारी, वाहन नंबर, गवाह।' : 'Note everything: time, place, officers, vehicle numbers, witnesses.'}</p>
        </div>
      </details>

      {/* IF DETAINED */}
      <details className="brutal-card mb-4" open>
        <summary className="heading-3 cursor-pointer">{hi ? '⛓️ अगर हिरासत / गिरफ्तार' : '⛓️ If Detained / Arrested'}</summary>
        <div className="mt-4 space-y-3 text-sm">
          <div className="p-3 bg-red-50 dark:bg-red-950 rounded border border-red-200 dark:border-red-800">
            <strong>{hi ? 'तुरंत (पहले 5 मिनट):' : 'Immediately (first 5 minutes):'}</strong>
            <ol className="mt-2 list-decimal list-inside space-y-1">
              <li>{hi ? 'गिरफ्तारी का कारण पूछें' : 'Ask grounds of arrest'}</li>
              <li>{hi ? '"मुझे वकील चाहिए" बोलें' : 'Say "I want a lawyer"'}</li>
              <li>{hi ? '"मेरे परिवार को बताएँ" बोलें (BNSS धारा 37)' : 'Say "Inform my family" (BNSS Section 37)'}</li>
              <li>{hi ? 'कोई बयान न दें — "वकील के बिना कुछ नहीं बोलूँगा"' : 'Give no statement — "Nothing without my lawyer"'}</li>
              <li>{hi ? 'कुछ भी साइन न करें' : 'Sign nothing'}</li>
            </ol>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'आपके अधिकार:' : 'Your rights:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>✓ {hi ? '24 घंटे में मजिस्ट्रेट (अनुच्छेद 22(2))' : '24hr magistrate (Article 22(2))'}</li>
              <li>✓ {hi ? 'मुफ्त कानूनी सहायता (अनुच्छेद 39A) — DSLSA: 1516' : 'Free legal aid (Article 39A) — DSLSA: 1516'}</li>
              <li>✓ {hi ? 'चिकित्सा जाँच का अधिकार' : 'Right to medical examination'}</li>
              <li>✓ {hi ? 'दबाव में दिया बयान अमान्य' : 'Statement under duress inadmissible'}</li>
              <li>✓ {hi ? 'FIR की कॉपी का अधिकार' : 'Right to copy of FIR'}</li>
              <li>✓ {hi ? 'महिला: रात में गिरफ्तार नहीं (विशेष परिस्थिति छोड़)' : 'Women: no night arrest (except exceptional)'}</li>
            </ul>
          </div>
        </div>
      </details>


      {/* SECTION 163 */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '🚫 धारा 163 BNSS (निषेधाज्ञा आदेश)' : '🚫 Section 163 BNSS (Prohibitory Orders)'}</summary>
        <div className="mt-4 space-y-2 text-sm">
          <p><strong>{hi ? 'सरल भाषा में:' : 'In simple words:'}</strong> {hi ? 'पुलिस एक आदेश जारी कर सकती है जो कहता है "इस इलाके में 5+ लोग इकट्ठा नहीं हो सकते।"' : 'Police can issue an order saying "5+ people cannot gather in this area."'}</p>
          <p><strong>{hi ? 'कितने समय:' : 'Duration:'}</strong> {hi ? 'अधिकतम 2 महीने (बढ़ाया जा सकता है)।' : 'Maximum 2 months (can be extended).'}</p>
          <p><strong>{hi ? 'क्या कर सकते हैं:' : 'What you can do:'}</strong></p>
          <ul className="ml-4 space-y-1">
            <li>→ {hi ? 'अकेले या 4 लोगों तक शांतिपूर्ण उपस्थिति संभवतः अनुमत (केस-बाय-केस)' : 'Alone or up to 4 people peaceful presence possibly allowed (case-by-case)'}</li>
            <li>→ {hi ? 'हाई कोर्ट में चुनौती दे सकते हैं (रिट याचिका)' : 'Can challenge in High Court (writ petition)'}</li>
          </ul>
          <p><strong>{hi ? 'दंड:' : 'Penalty if violated:'}</strong> {hi ? '1 माह कारावास या ₹200 जुर्माना (IPC 188)' : '1 month imprisonment or ₹200 fine (IPC 188)'}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{hi ? 'स्रोत: Indian Express, 22 जुलाई 2026, Nyaaya.org' : 'Source: Indian Express, July 22 2026, Nyaaya.org'}</p>
        </div>
      </details>

      {/* DIGITAL SAFETY */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '📱 डिजिटल सुरक्षा' : '📱 Digital Safety'}</summary>
        <div className="mt-4 space-y-4 text-sm">
          <div>
            <strong>{hi ? 'विरोध से पहले:' : 'Before protest:'}</strong>
            <ul className="mt-1 space-y-1">
              <li>→ {hi ? 'मजबूत PIN (6+ अंक)। बायोमेट्रिक (चेहरा/अँगुली) बंद करें।' : 'Strong PIN (6+ digits). Disable biometrics (face/fingerprint).'}</li>
              <li>→ {hi ? 'लोकेशन, AirDrop, Bluetooth बंद।' : 'Location, AirDrop, Bluetooth OFF.'}</li>
              <li>→ {hi ? 'जरूरी डेटा क्लाउड पर बैकअप।' : 'Backup important data to cloud.'}</li>
              <li>→ {hi ? 'Signal में ऑटो-डिलीट चालू (1 घंटा या 1 दिन)।' : 'Signal auto-delete ON (1 hour or 1 day).'}</li>
              <li>→ {hi ? 'बैंकिंग, सोशल मीडिया ऐप्स लॉगआउट।' : 'Log out of banking, social media apps.'}</li>
            </ul>
          </div>
          <div>
            <strong>{hi ? 'दौरान:' : 'During:'}</strong>
            <ul className="mt-1 space-y-1">
              <li>→ {hi ? 'फोटो/वीडियो लें → तुरंत क्लाउड अपलोड।' : 'Take photos/videos → immediately upload to cloud.'}</li>
              <li>→ {hi ? 'VPN चालू रखें (ProtonVPN मुफ्त)।' : 'Keep VPN on (ProtonVPN free).'}</li>
            </ul>
          </div>
          <div>
            <strong>{hi ? 'फोन ज़ब्त हो:' : 'Phone seized:'}</strong>
            <ul className="mt-1 space-y-1">
              <li>→ {hi ? '"मैं अनलॉक नहीं करूँगा/करूँगी।" बार-बार कहें।' : '"I will not unlock." Repeat.'}</li>
              <li>→ {hi ? 'ज़ब्ती रसीद माँगें (उपकरणों की सूची के साथ)।' : 'Ask for seizure receipt (with list of devices).'}</li>
              <li>→ {hi ? 'वकील को तुरंत बताएँ।' : 'Inform lawyer immediately.'}</li>
            </ul>
          </div>
        </div>
      </details>

      {/* TEAR GAS / LATHI */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '💨 आँसू गैस / लाठी / वॉटर कैनन' : '💨 Tear Gas / Lathi / Water Cannon'}</summary>
        <div className="mt-4 space-y-4 text-sm">
          <div>
            <strong>{hi ? 'आँसू गैस:' : 'Tear gas:'}</strong>
            <ul className="mt-1 space-y-1">
              <li>→ {hi ? 'हवा से 90° पर चलें (हवा की दिशा से दूर)।' : 'Move 90° to wind (perpendicular, away from wind).'}</li>
              <li>→ {hi ? 'गीला कपड़ा नाक-मुँह पर।' : 'Wet cloth over nose-mouth.'}</li>
              <li>→ {hi ? 'आँखें मत रगड़ें! साफ पानी से धोएँ।' : 'Do NOT rub eyes! Rinse with clean water.'}</li>
              <li>→ {hi ? 'ऊँचाई पर जाएँ (गैस भारी — नीचे बैठती है)।' : 'Move higher (gas is heavy — settles low).'}</li>
              <li>→ {hi ? 'कॉन्टैक्ट लेंस तुरंत निकालें।' : 'Remove contact lenses immediately.'}</li>
            </ul>
          </div>
          <div>
            <strong>{hi ? 'लाठी:' : 'Lathi charge:'}</strong>
            <ul className="mt-1 space-y-1">
              <li>→ {hi ? 'सिर और पेट बचाएँ — हाथ ऊपर, झुक जाएँ।' : 'Protect head and abdomen — arms up, crouch.'}</li>
              <li>→ {hi ? 'भगदड़ से बचें — किनारे की ओर।' : 'Avoid stampede — move toward edges.'}</li>
              <li>→ {hi ? 'चोट → टाइमस्टैम्प फोटो → अस्पताल → MLC बनवाएँ।' : 'Injury → timestamped photo → hospital → get MLC.'}</li>
            </ul>
          </div>
        </div>
      </details>


      {/* EVIDENCE */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '📸 सबूत सुरक्षित करें' : '📸 Secure Evidence'}</summary>
        <div className="mt-4 space-y-2 text-sm">
          <p>→ {hi ? 'वीडियो/फोटो में समय दिखाएँ (घड़ी, लैंडमार्क)।' : 'Show time in video/photo (clock, landmarks).'}</p>
          <p>→ {hi ? 'तुरंत क्लाउड बैकअप (Google Drive, iCloud, ProtonDrive)।' : 'Immediately cloud backup (Google Drive, iCloud, ProtonDrive).'}</p>
          <p>→ {hi ? 'ओरिजिनल कभी एडिट/क्रॉप न करें।' : 'Never edit/crop originals.'}</p>
          <p>→ {hi ? 'बैज नंबर, वाहन नंबर लिखें।' : 'Write down badge numbers, vehicle numbers.'}</p>
          <p>→ {hi ? 'गवाह संपर्क लें (सहमति से)।' : 'Get witness contacts (with consent).'}</p>
          <p>→ {hi ? 'जल्द से जल्द टाइमलाइन लिखें — याददाश्त जल्दी धुंधली होती है।' : 'Write timeline ASAP — memory fades quickly.'}</p>
        </div>
      </details>

      {/* AFTER INCIDENT */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '🏥 घटना के बाद' : '🏥 After an Incident'}</summary>
        <div className="mt-4 text-sm">
          <ol className="list-decimal list-inside space-y-2">
            <li>{hi ? 'सुरक्षित जगह जाएँ।' : 'Get to a safe location.'}</li>
            <li>{hi ? 'चोट → अस्पताल → MLC (मेडिको-लीगल सर्टिफिकेट) बनवाएँ।' : 'Injury → hospital → get MLC (medico-legal certificate).'}</li>
            <li>{hi ? 'घटना की टाइमलाइन लिखें (जल्द)।' : 'Write event timeline (soon).'}</li>
            <li>{hi ? 'सबूत क्लाउड पर बैकअप करें।' : 'Backup evidence to cloud.'}</li>
            <li>{hi ? 'वकील से बात करें (DSLSA: 1516 — मुफ्त)।' : 'Talk to lawyer (DSLSA: 1516 — free).'}</li>
            <li>{hi ? 'NHRC शिकायत दर्ज करें (nhrc.nic.in)।' : 'File NHRC complaint (nhrc.nic.in).'}</li>
            <li>{hi ? 'FIR दर्ज करें (Sahayata FIR असिस्टेंट उपयोग करें)।' : 'File FIR (use Sahayata FIR Assistant).'}</li>
            <li>{hi ? 'मानसिक स्वास्थ्य: iCall 9152987821 या Vandrevala 9999666555।' : 'Mental health: iCall 9152987821 or Vandrevala 9999666555.'}</li>
          </ol>
        </div>
      </details>

      {/* DISCLAIMER */}
      <div className="brutal-banner text-xs mt-8">
        {hi ? '⚠️ यह सामान्य कानूनी जानकारी है, कानूनी सलाह नहीं। अपनी विशिष्ट स्थिति के लिए योग्य वकील से संपर्क करें। स्रोत: भारतीय संविधान, BNSS 2023, Nyaaya.org, Indian Express।' : '⚠️ This is general legal information, not legal advice. Contact a qualified lawyer for your specific situation. Sources: Indian Constitution, BNSS 2023, Nyaaya.org, Indian Express.'}
      </div>

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/resources" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'सभी संसाधन →' : 'ALL RESOURCES →'}</Link>
        <Link href="/fir" className="brutal-btn brutal-btn-lg text-center">{hi ? 'FIR असिस्टेंट →' : 'FIR ASSISTANT →'}</Link>
        <Link href="/rti" className="brutal-btn brutal-btn-lg text-center">{hi ? 'RTI जनरेटर →' : 'RTI GENERATOR →'}</Link>
      </div>
    </div>
  );
}
