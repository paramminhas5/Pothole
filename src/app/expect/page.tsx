import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';

export default async function ExpectPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8 flex justify-between items-start gap-4">
        <div>
          <h1 className="heading-display mb-2">
            {hi ? 'विरोध प्रदर्शन की तैयारी' : 'Protest Preparation'}
          </h1>
          <p className="text-[var(--color-text-muted)]">
            {hi
              ? 'पहली बार? या अनुभवी? यह गाइड आपको सुरक्षित और प्रभावी बनाएगी।'
              : 'First time? Or experienced? This guide will keep you safe and effective.'}
          </p>
        </div>
        <PrintButton locale={locale} />
      </div>


      {/* CURRENT SITUATION CONTEXT */}
      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-3">{hi ? 'वर्तमान स्थिति — जुलाई 2026' : 'Current Situation — July 2026'}</h2>
        <div className="space-y-2 text-sm">
          <p><strong>{hi ? 'कहाँ:' : 'Where:'}</strong> {hi ? 'जंतर मंतर, नई दिल्ली (मुख्य धरना स्थल)' : 'Jantar Mantar, New Delhi (main sit-in site)'}</p>
          <p><strong>{hi ? 'कौन:' : 'Who:'}</strong> {hi ? 'CJP + SFI + AISA + AISF + NSUI + स्वतंत्र छात्र' : 'CJP + SFI + AISA + AISF + NSUI + independent students'}</p>
          <p><strong>{hi ? 'धारा 163:' : 'Section 163:'}</strong> {hi ? 'मध्य दिल्ली में लागू — 5+ व्यक्ति एकत्रित नहीं हो सकते' : 'Active in Central Delhi — 5+ persons cannot gather'}</p>
          <p><strong>{hi ? 'पुलिस:' : 'Police:'}</strong> {hi ? 'दिल्ली पुलिस + CRPF। आँसू गैस, लाठी, डिटेंशन का इतिहास (20 जुलाई)।' : 'Delhi Police + CRPF. History of tear gas, lathi, detention (July 20).'}</p>
          <p><strong>{hi ? 'कानूनी सहायता:' : 'Legal support:'}</strong> DSLSA 1516 (24/7) | HRLN | PUDR</p>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-3">{hi ? 'अपडेट: 23 जुलाई 2026। स्थिति बदल सकती है — जाने से पहले ताज़ा जानकारी लें।' : 'Updated: July 23, 2026. Situation may change — get latest info before going.'}</p>
      </section>

      {/* TIMELINE: WHAT A PROTEST DAY LOOKS LIKE */}
      <details className="brutal-card mb-4" open>
        <summary className="heading-3 cursor-pointer">{hi ? '⏱️ एक विरोध दिवस कैसा दिखता है' : '⏱️ What a Protest Day Looks Like'}</summary>
        <div className="mt-4">
          <ol className="steps-list">
            <li><strong>{hi ? 'सुबह: तैयारी' : 'Morning: Preparation'}</strong><span>{hi ? 'बैग पैक करें (नीचे चेकलिस्ट)। बडी से मिलें। Signal ग्रुप चेक करें। फोन चार्ज + PIN सेट।' : 'Pack bag (checklist below). Meet buddy. Check Signal group. Phone charged + PIN set.'}</span></li>
            <li><strong>{hi ? 'पहुँचना: निरीक्षण' : 'Arrival: Observe'}</strong><span>{hi ? 'पुलिस तैनाती देखें। निकास मार्ग पहचानें। बडी को स्थान बताएँ। नेतृत्व/मार्शल पहचानें।' : 'Note police positions. Identify exit routes. Tell buddy your location. Identify leadership/marshals.'}</span></li>
            <li><strong>{hi ? 'दौरान: भाग लें' : 'During: Participate'}</strong><span>{hi ? 'भीड़ के बीच में रहें (किनारे पर ज़्यादा खतरा)। हाइड्रेटेड रहें। फोटो/वीडियो → तुरंत क्लाउड।' : 'Stay in middle of crowd (edges more dangerous). Stay hydrated. Photos/videos → cloud immediately.'}</span></li>
            <li><strong>{hi ? 'अगर तनाव बढ़े' : 'If tension rises'}</strong><span>{hi ? 'शांत रहें। भगदड़ न करें। किनारे की ओर बढ़ें। बडी से संपर्क। मार्शल निर्देश सुनें।' : 'Stay calm. Don\'t stampede. Move toward edges. Contact buddy. Listen to marshal instructions.'}</span></li>
            <li><strong>{hi ? 'निकलना: सुरक्षित' : 'Leaving: Safely'}</strong><span>{hi ? 'अकेले न जाएँ। बडी को बताएँ "मैं सुरक्षित निकला।" फोटो बैकअप जाँचें।' : 'Don\'t go alone. Tell buddy "I\'m out safe." Check photo backups.'}</span></li>
            <li><strong>{hi ? 'बाद: ध्यान रखें' : 'After: Take care'}</strong><span>{hi ? 'पानी पिएँ। टाइमलाइन लिखें (जल्दी — याददाश्त धुंधली होती है)। मानसिक स्वास्थ्य चेक।' : 'Drink water. Write timeline (quickly — memory fades). Mental health check.'}</span></li>
          </ol>
        </div>
      </details>


      {/* PACKING CHECKLIST */}
      <details className="brutal-card mb-4" open>
        <summary className="heading-3 cursor-pointer">{hi ? '🎒 क्या ले जाएँ / क्या नहीं' : '🎒 What to Bring / What NOT to Bring'}</summary>
        <div className="mt-4 grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-bold mb-2" style={{ color: 'var(--color-lime)' }}>{hi ? '✓ ले जाएँ' : '✓ BRING'}</h4>
            <ul className="space-y-1">
              <li>→ {hi ? 'सरकारी ID (ओरिजिनल)' : 'Government ID (original)'}</li>
              <li>→ {hi ? 'पानी की बोतल (1L+)' : 'Water bottle (1L+)'}</li>
              <li>→ {hi ? 'नमकीन स्नैक्स (ऊर्जा)' : 'Salty snacks (energy)'}</li>
              <li>→ {hi ? 'गीला रुमाल (प्लास्टिक बैग में — आँसू गैस के लिए)' : 'Wet cloth in plastic bag (for tear gas)'}</li>
              <li>→ {hi ? 'पावरबैंक + चार्जिंग केबल' : 'Powerbank + charging cable'}</li>
              <li>→ {hi ? 'कैश ₹500-1000 (UPI काम न करे तो)' : 'Cash ₹500-1000 (in case UPI fails)'}</li>
              <li>→ {hi ? 'आपातकालीन नंबर कागज़ पर (फोन छिन सकता है)' : 'Emergency numbers on paper (phone may be seized)'}</li>
              <li>→ {hi ? 'सनस्क्रीन + टोपी (धूप)' : 'Sunscreen + cap (sun)'}</li>
              <li>→ {hi ? 'आरामदायक जूते (भागना पड़ सकता है)' : 'Comfortable shoes (you may need to run)'}</li>
              <li>→ {hi ? 'छोटा प्राथमिक उपचार (बैंड-एड, ORS, दर्दनिवारक)' : 'Small first aid (band-aids, ORS, painkiller)'}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2" style={{ color: 'var(--color-red)' }}>{hi ? '✗ नहीं ले जाएँ' : '✗ DO NOT BRING'}</h4>
            <ul className="space-y-1">
              <li>→ {hi ? 'कॉन्टैक्ट लेंस (आँसू गैस + लेंस = आँख खराब)' : 'Contact lenses (tear gas + lenses = eye damage)'}</li>
              <li>→ {hi ? 'कोई हथियार / चाकू / छुरी' : 'Any weapon / knife / blade'}</li>
              <li>→ {hi ? 'ज़्यादा कीमती सामान' : 'Expensive valuables'}</li>
              <li>→ {hi ? 'ड्रग्स / शराब' : 'Drugs / alcohol'}</li>
              <li>→ {hi ? 'कोई चीज़ जो "हथियार" जैसी दिखे (छड़ी, डंडा)' : 'Anything that looks like a "weapon" (stick, rod)'}</li>
              <li>→ {hi ? 'पासपोर्ट / ओरिजिनल ज़रूरी दस्तावेज़' : 'Passport / original important documents'}</li>
              <li>→ {hi ? 'बैंक कार्ड / ज़्यादा कैश' : 'Bank cards / excess cash'}</li>
            </ul>
          </div>
        </div>
      </details>

      {/* BUDDY SYSTEM */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '👥 बडी सिस्टम — अकेले मत जाओ' : '👥 Buddy System — Never Go Alone'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <p className="font-bold">{hi ? 'हर व्यक्ति का एक बडी होना चाहिए। बडी = एक दोस्त जो आपकी सुरक्षा ट्रैक करता है।' : 'Every person needs a buddy. Buddy = one friend who tracks your safety.'}</p>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'बडी प्रोटोकॉल:' : 'Buddy Protocol:'}</strong>
            <ol className="mt-2 list-decimal list-inside space-y-1">
              <li>{hi ? 'एक बडी चुनें — वही जो आपके साथ जा रहा हो' : 'Choose a buddy — someone going with you'}</li>
              <li>{hi ? 'हर 30 मिनट "ठीक" मैसेज भेजें (Signal)' : 'Send "OK" message every 30 min (Signal)'}</li>
              <li>{hi ? 'अगर 45 मिनट कोई मैसेज नहीं → बडी अलर्ट प्रोटोकॉल शुरू' : 'If 45 min no message → buddy starts alert protocol'}</li>
              <li>{hi ? 'कोडवर्ड तय करें: "चाय पीने चलें" = मैं मुश्किल में हूँ' : 'Set codeword: "let\'s get chai" = I\'m in trouble'}</li>
              <li>{hi ? 'मिलन बिंदु तय करें (अगर बिछड़ जाएँ)' : 'Set meeting point (if separated)'}</li>
            </ol>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'होम कॉन्टैक्ट (जो नहीं जा रहा):' : 'Home Contact (person NOT going):'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ {hi ? 'एक व्यक्ति जो घर पर है और आपकी स्थिति जानता है' : 'One person staying home who knows your status'}</li>
              <li>→ {hi ? 'आपका नाम, ID नंबर, वकील नंबर, अपेक्षित वापसी समय दें' : 'Give them: your name, ID number, lawyer number, expected return time'}</li>
              <li>→ {hi ? 'अगर X बजे तक संपर्क नहीं → DSLSA 1516 कॉल करें' : 'If no contact by X time → call DSLSA 1516'}</li>
            </ul>
          </div>
        </div>
      </details>


      {/* WHAT POLICE TYPICALLY DO */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '🚔 पुलिस आमतौर पर क्या करती है' : '🚔 What Police Typically Do'}</summary>
        <div className="mt-4 text-sm space-y-4">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'स्तर 1: उपस्थिति + निगरानी' : 'Level 1: Presence + Surveillance'}</strong>
            <p className="mt-1">{hi ? 'फोटोग्राफी, वीडियो, ड्रोन। सादी वर्दी में लोग भीड़ में। CCTV।' : 'Photography, video, drones. Plain-clothes officers in crowd. CCTV.'}</p>
            <p className="mt-1 font-bold">{hi ? 'आप क्या करें: सामान्य। आपको भी रिकॉर्ड करने का अधिकार है।' : 'What you do: Normal. You also have the right to record.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'स्तर 2: धारा 163 / चेतावनी' : 'Level 2: Section 163 / Warnings'}</strong>
            <p className="mt-1">{hi ? 'लाउडस्पीकर से "तितर-बितर हो जाओ" की घोषणा। बैरिकेड। रास्ता रोकना।' : 'Loudspeaker announcements to "disperse." Barricades. Road blocking.'}</p>
            <p className="mt-1 font-bold">{hi ? 'आप क्या करें: शांत रहें। निकास मार्ग पहचानें। बडी को बताएँ।' : 'What you do: Stay calm. Identify exits. Inform buddy.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded border border-[var(--color-yellow)]">
            <strong>{hi ? 'स्तर 3: लाठी / वॉटर कैनन' : 'Level 3: Lathi / Water Cannon'}</strong>
            <p className="mt-1">{hi ? 'बिना चेतावनी भी हो सकता है। किनारे के लोगों पर पहले। लाठी → सिर और पेट बचाएँ।' : 'Can happen without warning. Edges targeted first. Lathi → protect head and abdomen.'}</p>
            <p className="mt-1 font-bold">{hi ? 'आप क्या करें: झुक जाएँ, हाथ सिर पर, भीड़ के बीच की ओर, भगदड़ न करें।' : 'What you do: Crouch, hands over head, move toward middle, don\'t stampede.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded border border-[var(--color-red)]">
            <strong>{hi ? 'स्तर 4: आँसू गैस' : 'Level 4: Tear Gas'}</strong>
            <p className="mt-1">{hi ? 'गोल कनस्तर ज़मीन पर गिरते हैं → सफेद धुआँ। आँखों, नाक, गले में जलन।' : 'Round canisters fall on ground → white smoke. Eyes, nose, throat burn.'}</p>
            <p className="mt-1 font-bold">{hi ? 'आप क्या करें: हवा से 90° चलें। गीला कपड़ा नाक पर। ऊँचाई पर जाएँ। आँखें मत रगड़ें!!' : 'What you do: Move 90° to wind. Wet cloth on nose. Move uphill. DO NOT rub eyes!!'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded border-2 border-[var(--color-red)]">
            <strong>{hi ? 'स्तर 5: गिरफ्तारी / डिटेंशन' : 'Level 5: Arrest / Detention'}</strong>
            <p className="mt-1">{hi ? 'चुनिंदा लोगों को उठाना या सामूहिक डिटेंशन। बस में बिठाना।' : 'Selective pickup or mass detention. Loading into buses.'}</p>
            <p className="mt-1 font-bold">{hi ? 'आप क्या करें: → अगला सेक्शन (अगर गिरफ्तार हों) देखें' : 'What you do: → See next section (If Arrested)'}</p>
          </div>
        </div>
      </details>

      {/* IF ARRESTED */}
      <details className="brutal-card mb-4 !border-[var(--color-red)]" open>
        <summary className="heading-3 cursor-pointer">{hi ? '⛓️ अगर गिरफ्तार / डिटेन किया जाए' : '⛓️ If Arrested / Detained'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded border border-red-200 dark:border-red-800">
            <strong>{hi ? 'पहले 5 मिनट — ये बोलें:' : 'First 5 minutes — SAY THESE:'}</strong>
            <ol className="mt-2 list-decimal list-inside space-y-2 font-bold">
              <li>{hi ? '"गिरफ्तारी का कारण बताएँ।"' : '"Tell me the grounds of arrest."'}</li>
              <li>{hi ? '"मुझे वकील चाहिए।"' : '"I want a lawyer."'}</li>
              <li>{hi ? '"मेरे परिवार को सूचित करें।" (BNSS धारा 37)' : '"Inform my family." (BNSS Section 37)'}</li>
              <li>{hi ? '"मैं बिना वकील कोई बयान नहीं दूँगा/दूँगी।"' : '"I will not give any statement without my lawyer."'}</li>
              <li>{hi ? '"मैं अपना फोन अनलॉक नहीं करूँगा/करूँगी।"' : '"I will not unlock my phone."'}</li>
              <li>{hi ? 'कुछ भी साइन मत करें।' : 'Sign NOTHING.'}</li>
            </ol>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'आपके अधिकार (संवैधानिक):' : 'Your Rights (Constitutional):'}</strong>
            <ul className="mt-2 space-y-1">
              <li>✓ {hi ? '24 घंटे में मजिस्ट्रेट — अनुच्छेद 22(2)' : '24hr magistrate production — Article 22(2)'}</li>
              <li>✓ {hi ? 'मुफ्त वकील — अनुच्छेद 39A — DSLSA: 1516' : 'Free lawyer — Article 39A — DSLSA: 1516'}</li>
              <li>✓ {hi ? 'चुप रहने का अधिकार — अनुच्छेद 20(3)' : 'Right to silence — Article 20(3)'}</li>
              <li>✓ {hi ? 'चिकित्सा जाँच का अधिकार' : 'Right to medical examination'}</li>
              <li>✓ {hi ? 'FIR की कॉपी का अधिकार' : 'Right to copy of FIR'}</li>
              <li>✓ {hi ? 'महिला: रात में गिरफ्तार नहीं (विशेष परिस्थिति छोड़)' : 'Women: no night arrest (except exceptional)'}</li>
              <li>✓ {hi ? 'महिला: तलाशी केवल महिला अधिकारी' : 'Women: search only by female officer'}</li>
            </ul>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'तुरंत कॉल करें:' : 'Call immediately:'}</strong>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <span><strong>1516</strong> — DSLSA ({hi ? 'मुफ्त वकील' : 'free lawyer'})</span>
              <span><strong>112</strong> — {hi ? 'आपातकालीन' : 'Emergency'}</span>
              <span><strong>NHRC</strong> — 011-24663333</span>
              <span><strong>HRLN</strong> — hrln.org</span>
            </div>
          </div>
        </div>
      </details>


      {/* COMMUNICATION PLAN */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '📱 संचार योजना' : '📱 Communication Plan'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'जाने से पहले (अनिवार्य):' : 'Before going (mandatory):'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ {hi ? 'Signal इंस्टॉल करें। ऑटो-डिलीट: 1 घंटा।' : 'Install Signal. Auto-delete: 1 hour.'}</li>
              <li>→ {hi ? 'फोन PIN: 6+ अंक। बायोमेट्रिक (चेहरा/अँगुली) बंद करें।' : 'Phone PIN: 6+ digits. Disable biometrics (face/finger).'}</li>
              <li>→ {hi ? 'लोकेशन, Bluetooth, AirDrop बंद।' : 'Location, Bluetooth, AirDrop OFF.'}</li>
              <li>→ {hi ? 'ज़रूरी डेटा क्लाउड बैकअप कर लें।' : 'Cloud backup important data.'}</li>
              <li>→ {hi ? 'बैंकिंग + सोशल मीडिया ऐप्स लॉगआउट।' : 'Log out banking + social media apps.'}</li>
              <li>→ {hi ? 'आपातकालीन नंबर कागज़ पर लिखें (फोन छिन सकता है)।' : 'Write emergency numbers on paper (phone may be taken).'}</li>
            </ul>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'इंटरनेट बंद हो जाए तो:' : 'If internet is shut down:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ <strong>Briar</strong> — {hi ? 'Bluetooth/WiFi Direct से मैसेजिंग (इंटरनेट नहीं चाहिए)' : 'Messaging via Bluetooth/WiFi (no internet needed)'}</li>
              <li>→ <strong>VPN</strong> — {hi ? 'ProtonVPN (मुफ्त) पहले से इंस्टॉल रखें' : 'ProtonVPN (free) pre-install'}</li>
              <li>→ <strong>SMS</strong> — {hi ? 'पूर्व-निर्धारित कोडवर्ड: "चाय" = सुरक्षित, "डॉक्टर" = मुश्किल में' : 'Pre-set codewords: "chai" = safe, "doctor" = in trouble'}</li>
              <li>→ <strong>Sahayata</strong> — {hi ? 'ऑफलाइन काम करता है — गाइड, टेम्पलेट कैश्ड' : 'Works offline — guides, templates cached'}</li>
            </ul>
          </div>
        </div>
      </details>

      {/* AFTER: WHAT TO DO */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">{hi ? '🏥 बाद में: क्या करें' : '🏥 Afterwards: What to Do'}</summary>
        <div className="mt-4 text-sm">
          <ol className="list-decimal list-inside space-y-3">
            <li><strong>{hi ? 'सुरक्षित जगह जाएँ।' : 'Get to a safe location.'}</strong></li>
            <li><strong>{hi ? 'चोट?' : 'Injured?'}</strong> {hi ? '→ अस्पताल → MLC (मेडिको-लीगल सर्टिफिकेट) बनवाएँ। यह सबूत है।' : '→ Hospital → get MLC (medico-legal certificate). This is evidence.'}</li>
            <li><strong>{hi ? 'टाइमलाइन लिखें' : 'Write timeline'}</strong> {hi ? '(जल्दी — याददाश्त धुंधली होती है): क्या हुआ, कब, किसने किया।' : '(quickly — memory fades): what happened, when, who did it.'}</li>
            <li><strong>{hi ? 'सबूत बैकअप' : 'Backup evidence'}</strong> {hi ? '→ Google Drive / ProtonDrive / iCloud। ओरिजिनल कभी एडिट न करें।' : '→ Google Drive / ProtonDrive / iCloud. Never edit originals.'}</li>
            <li><strong>{hi ? 'वकील से बात' : 'Talk to lawyer'}</strong> {hi ? '→ DSLSA 1516 (मुफ्त, 24/7)।' : '→ DSLSA 1516 (free, 24/7).'}</li>
            <li><strong>{hi ? 'NHRC शिकायत' : 'NHRC complaint'}</strong> {hi ? '→ nhrc.nic.in (पुलिस बर्बरता / अत्यधिक बल)।' : '→ nhrc.nic.in (police brutality / excessive force).'}</li>
            <li><strong>{hi ? 'FIR दर्ज' : 'File FIR'}</strong> {hi ? '→ Sahayata FIR असिस्टेंट उपयोग करें।' : '→ Use Sahayata FIR Assistant.'}</li>
            <li><strong>{hi ? 'मानसिक स्वास्थ्य' : 'Mental health'}</strong> {hi ? '→ iCall: 9152987821 | Vandrevala: 9999666555 (24/7, मुफ्त)।' : '→ iCall: 9152987821 | Vandrevala: 9999666555 (24/7, free).'}</li>
          </ol>
        </div>
      </details>

      {/* DISCLAIMER */}
      <div className="brutal-banner text-xs mt-8">
        {hi
          ? '⚠️ यह सामान्य जानकारी है, कानूनी सलाह नहीं। स्थिति बदल सकती है। जाने से पहले ताज़ा जानकारी लें। योग्य वकील से संपर्क करें। स्रोत: भारतीय संविधान, BNSS 2023, Nyaaya.org।'
          : '⚠️ This is general information, not legal advice. Situation may change. Get latest info before going. Contact a qualified lawyer. Sources: Indian Constitution, BNSS 2023, Nyaaya.org.'}
      </div>

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/safety" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'अधिकार कार्ड →' : 'RIGHTS CARD →'}</Link>
        <Link href="/fir" className="brutal-btn brutal-btn-lg text-center">{hi ? 'FIR असिस्टेंट →' : 'FIR ASSISTANT →'}</Link>
        <Link href="/map" className="brutal-btn brutal-btn-lg text-center">{hi ? 'लाइव मैप →' : 'LIVE MAP →'}</Link>
      </div>
    </div>
  );
}
