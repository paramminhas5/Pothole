import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

const GLOSSARY = [
  { term: 'FIR', full: 'First Information Report', fullHi: 'प्रथम सूचना रिपोर्ट', desc: 'The first document police create when a crime is reported. Police CANNOT refuse to file it. If they do: write to SP, or file with Magistrate under BNSS 175(3).', descHi: 'अपराध की सूचना मिलने पर पुलिस का पहला दस्तावेज़। पुलिस मना नहीं कर सकती। मना करे तो: SP को लिखें, या BNSS 175(3) में मजिस्ट्रेट से शिकायत।' },
  { term: 'PIL', full: 'Public Interest Litigation', fullHi: 'जनहित याचिका', desc: 'A case anyone can file in High Court or Supreme Court on behalf of the public. Used to challenge government inaction. Cost: ₹50-500 court fee. Lawyer optional.', descHi: 'कोई भी जनता की ओर से हाई कोर्ट या सुप्रीम कोर्ट में दायर कर सकता है। सरकारी अकर्मण्यता चुनौती। लागत: ₹50-500। वकील वैकल्पिक।' },
  { term: 'RTI', full: 'Right to Information', fullHi: 'सूचना का अधिकार', desc: 'Legal right to ask any government department for information. ₹10 fee. They MUST respond in 30 days or face penalty (₹250/day, max ₹25,000).', descHi: 'किसी भी सरकारी विभाग से जानकारी माँगने का कानूनी अधिकार। ₹10 शुल्क। 30 दिन में जवाब अनिवार्य या जुर्माना (₹250/दिन, अधिकतम ₹25,000)।' },
  { term: 'BNSS', full: 'Bharatiya Nagarik Suraksha Sanhita, 2023', fullHi: 'भारतीय नागरिक सुरक्षा संहिता, 2023', desc: 'Replaced the old CrPC (criminal procedure code) from July 2024. Governs arrest, bail, trials. Key sections: 37 (inform family), 163 (prohibitory orders), 175 (magistrate complaint).', descHi: 'पुरानी CrPC (आपराधिक प्रक्रिया संहिता) जुलाई 2024 से बदली। गिरफ्तारी, जमानत, मुकदमे। मुख्य धाराएँ: 37 (परिवार सूचित), 163 (निषेधाज्ञा), 175 (मजिस्ट्रेट शिकायत)।' },
  { term: 'Section 163', full: 'BNSS Section 163 (Prohibitory Orders)', fullHi: 'BNSS धारा 163 (निषेधाज्ञा आदेश)', desc: 'Executive Magistrate can ban gatherings of 5+ people in an area. Max 2 months. Violation: 1 month jail or ₹200 fine. Can be challenged in High Court.', descHi: 'कार्यकारी मजिस्ट्रेट किसी क्षेत्र में 5+ व्यक्ति एकत्रित होने पर रोक लगा सकता है। अधिकतम 2 माह। उल्लंघन: 1 माह जेल या ₹200 जुर्माना। हाई कोर्ट में चुनौती संभव।' },
  { term: 'Bail', full: 'Release from custody pending trial', fullHi: 'मुकदमे तक हिरासत से रिहाई', desc: 'Right to be released from jail while case is ongoing. Types: Regular bail (from court), Anticipatory bail (before arrest), Default bail (if chargesheet not filed in time).', descHi: 'मामला चलने तक जेल से रिहाई का अधिकार। प्रकार: नियमित (अदालत से), अग्रिम (गिरफ्तारी से पहले), डिफ़ॉल्ट (चार्जशीट समय पर न हो)।' },
  { term: 'Remand', full: 'Continued custody beyond 24 hours', fullHi: '24 घंटे से अधिक हिरासत जारी', desc: 'After 24 hours, police must produce you before a magistrate. Magistrate decides: release, judicial custody (jail), or police custody (for investigation, max 15 days).', descHi: '24 घंटे बाद, पुलिस को मजिस्ट्रेट के सामने पेश करना होगा। मजिस्ट्रेट तय करता है: रिहाई, न्यायिक हिरासत (जेल), या पुलिस हिरासत (जाँच, अधिकतम 15 दिन)।' },
  { term: 'Habeas Corpus', full: 'Writ to produce detained person before court', fullHi: 'हिरासत में व्यक्ति को अदालत में पेश करने की रिट', desc: 'If someone is illegally detained, anyone can file this in High Court demanding they be produced. Most powerful tool against disappearances and illegal detention.', descHi: 'अवैध हिरासत हो तो कोई भी हाई कोर्ट में दायर कर सकता है। गायब और अवैध हिरासत के खिलाफ सबसे शक्तिशाली उपकरण।' },
  { term: 'MLC', full: 'Medico-Legal Certificate', fullHi: 'मेडिको-लीगल सर्टिफिकेट', desc: 'Medical document recording injuries. Go to ANY hospital — they must give it. This is your legal proof of injury. Get it IMMEDIATELY after any incident. Free at govt hospitals.', descHi: 'चोटों का चिकित्सा दस्तावेज़। किसी भी अस्पताल में जाएँ — देना अनिवार्य है। यह चोट का कानूनी प्रमाण है। घटना के तुरंत बाद बनवाएँ। सरकारी अस्पतालों में मुफ्त।' },
  { term: 'NALSA', full: 'National Legal Services Authority', fullHi: 'राष्ट्रीय कानूनी सेवा प्राधिकरण', desc: 'Government body providing FREE lawyers to BPL, SC/ST, women, children, disabled, disaster victims. Access via district DLSA offices or call 15100.', descHi: 'BPL, SC/ST, महिला, बच्चे, विकलांग, आपदा पीड़ितों को मुफ्त वकील। DLSA कार्यालय या 15100 कॉल करें।' },
  { term: 'DSLSA', full: 'Delhi State Legal Services Authority', fullHi: 'दिल्ली राज्य कानूनी सेवा प्राधिकरण', desc: 'Delhi-specific free legal aid. Helpline 1516 (24/7). Office at Rouse Avenue Court Complex. Lawyer assigned within 3 days.', descHi: 'दिल्ली-विशिष्ट मुफ्त कानूनी सहायता। हेल्पलाइन 1516 (24/7)। कार्यालय: राउज़ एवेन्यू कोर्ट कॉम्प्लेक्स। 3 दिन में वकील।' },
  { term: 'CIC', full: 'Central Information Commission', fullHi: 'केंद्रीय सूचना आयोग', desc: 'If your RTI gets no response even after First Appeal → file complaint with CIC. They can impose ₹250/day penalty on the officer.', descHi: 'RTI का प्रथम अपील के बाद भी जवाब नहीं → CIC में शिकायत। वे अधिकारी पर ₹250/दिन जुर्माना लगा सकते हैं।' },
  { term: 'CPGRAMS', full: 'Centralized Public Grievance Redressal', fullHi: 'केंद्रीयकृत सार्वजनिक शिकायत निवारण', desc: 'Online government complaint portal (pgportal.gov.in). File complaints against any central government department. Gets tracked with reference number.', descHi: 'ऑनलाइन सरकारी शिकायत पोर्टल (pgportal.gov.in)। किसी भी केंद्रीय विभाग के खिलाफ शिकायत। संदर्भ संख्या से ट्रैक।' },
  { term: 'NHRC', full: 'National Human Rights Commission', fullHi: 'राष्ट्रीय मानवाधिकार आयोग', desc: 'Files complaints about police brutality, custodial death, rights violations. Online at nhrc.nic.in or call 011-24663333.', descHi: 'पुलिस बर्बरता, हिरासत में मृत्यु, अधिकार उल्लंघन की शिकायत। nhrc.nic.in या 011-24663333 कॉल।' },
  { term: 'Lok Adalat', full: 'People\'s Court', fullHi: 'लोक अदालत', desc: 'Free dispute resolution forum. No court fees. Decisions are final and binding. Good for simple cases, pending complaints, utility disputes.', descHi: 'मुफ्त विवाद समाधान मंच। कोई शुल्क नहीं। निर्णय अंतिम और बाध्यकारी। सरल मामलों, लंबित शिकायतों के लिए अच्छा।' },
  { term: 'Zero FIR', full: 'FIR filed at any police station', fullHi: 'किसी भी थाने में FIR', desc: 'You can file an FIR at ANY police station, regardless of jurisdiction. It will be transferred to the correct station. Police cannot refuse.', descHi: 'आप किसी भी थाने में FIR दर्ज करा सकते हैं, क्षेत्राधिकार चाहे जो हो। सही थाने में ट्रांसफर होगी। पुलिस मना नहीं कर सकती।' },
  { term: 'Article 19', full: 'Fundamental right to speech & assembly', fullHi: 'बोलने और सभा का मौलिक अधिकार', desc: '19(1)(a): Freedom of speech. 19(1)(b): Right to peaceful assembly without arms. Reasonable restrictions only (not blanket bans). Supreme Court: protest is a fundamental right.', descHi: '19(1)(a): अभिव्यक्ति की स्वतंत्रता। 19(1)(b): शांतिपूर्ण निःशस्त्र सभा। केवल उचित प्रतिबंध (कुल प्रतिबंध नहीं)। सुप्रीम कोर्ट: विरोध मौलिक अधिकार।' },
  { term: 'Article 21', full: 'Right to life and personal liberty', fullHi: 'जीवन और व्यक्तिगत स्वतंत्रता का अधिकार', desc: 'No person shall be deprived of life or personal liberty except by procedure established by law. Broadest right — includes right to dignity, privacy, health, education.', descHi: 'कानून द्वारा स्थापित प्रक्रिया के बिना जीवन या स्वतंत्रता नहीं छीनी जा सकती। सबसे व्यापक — गरिमा, गोपनीयता, स्वास्थ्य, शिक्षा शामिल।' },
  { term: 'Article 22', full: 'Protection against arrest & detention', fullHi: 'गिरफ्तारी और नज़रबंदी से संरक्षण', desc: '22(1): Right to know grounds of arrest + consult lawyer. 22(2): Must be produced before magistrate within 24 hours. These cannot be suspended.', descHi: '22(1): गिरफ्तारी का कारण जानने + वकील से मिलने का अधिकार। 22(2): 24 घंटे में मजिस्ट्रेट के सामने। ये निलंबित नहीं हो सकते।' },
  { term: 'Chargesheet', full: 'Police report to court after investigation', fullHi: 'जाँच के बाद पुलिस की अदालत रिपोर्ट', desc: 'Police must file within 60-90 days of arrest. If not → you get default bail (automatic release). This is often missed — ask your lawyer to check.', descHi: 'गिरफ्तारी के 60-90 दिन में दाखिल करना होगा। नहीं किया → डिफ़ॉल्ट जमानत (स्वचालित रिहाई)। अक्सर छूट जाता है — वकील से जाँच कराएँ।' },
  { term: 'Anticipatory Bail', full: 'Bail before arrest', fullHi: 'गिरफ्तारी से पहले जमानत', desc: 'If you fear arrest, you can apply to High Court or Sessions Court for protection BEFORE being arrested. Commonly used by activists and journalists.', descHi: 'गिरफ्तारी का डर हो तो हाई कोर्ट या सेशन कोर्ट में पहले से सुरक्षा माँगें। कार्यकर्ताओं और पत्रकारों द्वारा अक्सर उपयोग।' },
  { term: 'Writ Petition', full: 'Direct application to High/Supreme Court', fullHi: 'हाई/सुप्रीम कोर्ट में सीधा आवेदन', desc: '5 types: Habeas Corpus (produce person), Mandamus (force action), Certiorari (quash decision), Quo Warranto (challenge authority), Prohibition (stop action).', descHi: '5 प्रकार: हेबियस कॉर्पस (व्यक्ति पेश), मैंडमस (कार्रवाई करवाएँ), सर्टिओरारी (निर्णय रद्द), क्वो वारंटो (अधिकार चुनौती), प्रोहिबिशन (कार्रवाई रोकें)।' },
  { term: 'UAPA', full: 'Unlawful Activities (Prevention) Act', fullHi: 'गैरकानूनी गतिविधियाँ (रोकथाम) अधिनियम', desc: 'Anti-terror law, but increasingly used against activists. Bail very difficult. If charged: immediately get a lawyer (HRLN, PUCL). Do NOT make statements.', descHi: 'आतंकवाद-रोधी कानून, लेकिन कार्यकर्ताओं पर बढ़ता उपयोग। जमानत बहुत कठिन। आरोप लगे तो: तुरंत वकील (HRLN, PUCL)। कोई बयान न दें।' },
  { term: 'Sedition', full: 'Section 150 BNS (formerly 124A IPC)', fullHi: 'BNS धारा 150 (पहले IPC 124A)', desc: 'Used to silence dissent. Supreme Court effectively paused it in 2022. If charged: do not panic, get HRLN/PUCL lawyer, it is constitutionally challenged.', descHi: 'असहमति दबाने के लिए। सुप्रीम कोर्ट ने 2022 में प्रभावी रूप से रोका। आरोप लगे: घबराएँ नहीं, HRLN/PUCL वकील लें, संवैधानिक चुनौती दी गई है।' },
];

export default async function GlossaryPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-3">{hi ? 'कानूनी शब्दावली' : 'Legal Glossary'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'हर कानूनी शब्द — सरल भाषा में। एक 20 साल का छात्र भी समझे।' : 'Every legal term — in plain language. Even a 20-year-old student understands.'}</p>
      </div>

      <div className="space-y-4">
        {GLOSSARY.map((item) => (
          <details key={item.term} className="brutal-card !p-4">
            <summary className="cursor-pointer">
              <strong className="text-lg">{item.term}</strong>
              <span className="text-sm text-[var(--color-text-muted)] ml-2">— {hi ? item.fullHi : item.full}</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed">{hi ? item.descHi : item.desc}</p>
          </details>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/safety" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'अधिकार कार्ड →' : 'Rights Card →'}</Link>
        <Link href="/rti" className="brutal-btn brutal-btn-lg text-center">RTI →</Link>
        <Link href="/fir" className="brutal-btn brutal-btn-lg text-center">FIR →</Link>
      </div>
    </div>
  );
}
