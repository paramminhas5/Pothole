import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function PlaybookPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">
          {hi ? 'विरोध → शक्ति → बदलाव' : 'Protest → Power → Change'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {hi ? 'सड़क की ऊर्जा को संस्थागत जवाबदेही में बदलने का पूरा रास्ता।' : 'The complete path from street energy to institutional accountability.'}
        </p>
      </div>


      {/* CHAPTER 1: DEFINE DEMANDS */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-lime mb-4">1</div>
        <h2 className="heading-2 mb-4">{hi ? 'माँग को स्पष्ट करें' : 'Define Your Demand'}</h2>
        <p className="text-sm mb-3">{hi ? '"जवाबदेही" एक भावना है। "शिक्षा मंत्री का इस्तीफा 15 अगस्त तक" एक माँग है।' : '"Accountability" is a feeling. "Education Minister resign by August 15" is a demand.'}</p>
        <div className="p-4 bg-[var(--color-surface-alt)] rounded text-sm mb-4">
          <strong>{hi ? 'माँग टेम्पलेट:' : 'Demand template:'}</strong>
          <ul className="mt-2 space-y-1">
            <li>→ <strong>{hi ? 'क्या:' : 'What:'}</strong> {hi ? '[एक स्पष्ट, मापने योग्य कार्रवाई]' : '[One clear, measurable action]'}</li>
            <li>→ <strong>{hi ? 'कौन:' : 'Who:'}</strong> {hi ? '[जिम्मेदार व्यक्ति/संस्था का नाम]' : '[Name of accountable person/institution]'}</li>
            <li>→ <strong>{hi ? 'कब तक:' : 'By when:'}</strong> {hi ? '[तारीख]' : '[Date]'}</li>
            <li>→ <strong>{hi ? 'सबूत:' : 'Evidence:'}</strong> {hi ? '[समस्या का प्रमाण]' : '[Proof of the problem]'}</li>
            <li>→ <strong>{hi ? 'अगर नहीं:' : 'If not:'}</strong> {hi ? '[एस्केलेशन — RTI/PIL/चुनावी जवाबदेही]' : '[Escalation — RTI/PIL/electoral accountability]'}</li>
          </ul>
        </div>
        <p className="text-sm">{hi ? '→ Sahayata Demand Tracker में माँग बनाएँ और ट्रैक करें।' : '→ Create and track demands in the Sahayata Demand Tracker.'}</p>
        <Link href="/demands" className="text-link mt-2 inline-block">{hi ? 'डिमांड ट्रैकर →' : 'Demand Tracker →'}</Link>
      </section>

      {/* CHAPTER 2: DOCUMENT */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-sky mb-4">2</div>
        <h2 className="heading-2 mb-4">{hi ? 'सब कुछ दस्तावेज़ करें' : 'Document Everything'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'फोटो/वीडियो: मेटाडेटा (समय, जगह) दिखाएँ। ओरिजिनल कभी एडिट न करें।' : 'Photos/videos: show metadata (time, place). Never edit originals.'}</li>
          <li>→ {hi ? 'चेन ऑफ कस्टडी: कब लिया → कहाँ स्टोर → किसे दिया।' : 'Chain of custody: when taken → where stored → who received.'}</li>
          <li>→ {hi ? 'टाइमलाइन: घटनाओं का क्रम, तारीख-समय के साथ।' : 'Timeline: sequence of events with date-time.'}</li>
          <li>→ {hi ? 'गवाह: नाम (सहमति से), संपर्क, क्या देखा।' : 'Witnesses: names (with consent), contact, what they saw.'}</li>
          <li>→ {hi ? 'मीडिया कवरेज: लिंक, स्क्रीनशॉट, आर्काइव।' : 'Media coverage: links, screenshots, archives.'}</li>
          <li>→ {hi ? 'वित्तीय: अगर सार्वजनिक धन शामिल — बजट दस्तावेज़, व्यय विवरण।' : 'Financial: if public money involved — budget documents, expenditure details.'}</li>
        </ul>
        <Link href="/vault" className="text-link mt-3 inline-block">{hi ? 'एविडेंस वॉल्ट में सुरक्षित करें →' : 'Secure in Evidence Vault →'}</Link>
      </section>

      {/* CHAPTER 3: RTI */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-accent mb-4">3</div>
        <h2 className="heading-2 mb-4">{hi ? 'RTI — सबसे शक्तिशाली नागरिक हथियार' : 'RTI — The Most Powerful Citizen Weapon'}</h2>
        <div className="space-y-3 text-sm">
          <p><strong>{hi ? 'क्या है:' : 'What it is:'}</strong> {hi ? 'सूचना का अधिकार — किसी भी सरकारी विभाग से जानकारी माँगने का कानूनी अधिकार।' : 'Right to Information — legal right to demand information from any government department.'}</p>
          <p><strong>{hi ? 'शुल्क:' : 'Fee:'}</strong> ₹10 ({hi ? 'BPL के लिए मुफ्त' : 'Free for BPL'}).</p>
          <p><strong>{hi ? 'समय-सीमा:' : 'Timeline:'}</strong> {hi ? '30 दिन में जवाब अनिवार्य।' : '30-day response mandatory.'}</p>
          <p><strong>{hi ? 'कैसे:' : 'How:'}</strong> rtionline.gov.in ({hi ? 'केंद्रीय' : 'central'}) | {hi ? 'राज्य RTI पोर्टल (राज्यों के लिए)' : 'State RTI portals (for state level)'}</p>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded mt-3">
            <strong>{hi ? 'एस्केलेशन:' : 'Escalation:'}</strong>
            <ol className="mt-1 list-decimal list-inside space-y-1">
              <li>{hi ? '30 दिन कोई जवाब नहीं → प्रथम अपील (उसी विभाग में वरिष्ठ अधिकारी को)' : '30 days no response → First Appeal (to senior officer in same department)'}</li>
              <li>{hi ? 'प्रथम अपील विफल → द्वितीय अपील (CIC/SIC — सूचना आयोग)' : 'First appeal fails → Second Appeal (CIC/SIC — Information Commission)'}</li>
              <li>{hi ? 'CIC जुर्माना लगा सकता है: ₹250/दिन तक अधिकतम ₹25,000' : 'CIC can impose penalty: ₹250/day up to ₹25,000'}</li>
            </ol>
          </div>
          <p className="font-bold mt-3">{hi ? '→ Sahayata RTI जनरेटर में फॉर्म भरें → PDF डाउनलोड → जमा करें।' : '→ Fill form in Sahayata RTI Generator → download PDF → submit.'}</p>
        </div>
        <Link href="/rti" className="text-link mt-3 inline-block">{hi ? 'RTI जनरेटर →' : 'RTI Generator →'}</Link>
      </section>


      {/* CHAPTER 4: FIR */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-red mb-4">4</div>
        <h2 className="heading-2 mb-4">{hi ? 'FIR — पुलिस को कार्रवाई के लिए मजबूर करें' : 'FIR — Make Police Act'}</h2>
        <div className="space-y-3 text-sm">
          <p><strong>{hi ? 'कब:' : 'When:'}</strong> {hi ? 'जब संज्ञेय अपराध (cognizable offence) हुआ हो — हमला, चोरी, धमकी, भ्रष्टाचार।' : 'When a cognizable offence occurred — assault, theft, threats, corruption.'}</p>
          <p><strong>{hi ? 'आपका अधिकार:' : 'Your right:'}</strong> {hi ? 'पुलिस FIR दर्ज करने से मना नहीं कर सकती (BNSS धारा 173)।' : 'Police cannot refuse to register FIR (BNSS Section 173).'}</p>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'अगर पुलिस मना करे:' : 'If police refuse:'}</strong>
            <ol className="mt-1 list-decimal list-inside space-y-1">
              <li>{hi ? 'लिखित शिकायत SP (पुलिस अधीक्षक) को भेजें' : 'Send written complaint to SP (Superintendent of Police)'}</li>
              <li>{hi ? 'SP भी मना करे → मजिस्ट्रेट शिकायत (धारा 156(3) CrPC / BNSS धारा 175(3))' : 'SP also refuses → Magistrate complaint (Section 156(3) CrPC / BNSS Section 175(3))'}</li>
              <li>{hi ? 'Zero FIR: कहीं भी दर्ज करवा सकते हैं, सही थाने में ट्रांसफर होगी' : 'Zero FIR: can file anywhere, will be transferred to correct station'}</li>
            </ol>
          </div>
          <p className="font-bold mt-3">{hi ? '→ Sahayata FIR असिस्टेंट: विज़ार्ड भरें → शिकायत/पत्र तैयार।' : '→ Sahayata FIR Assistant: fill wizard → complaint/letter ready.'}</p>
        </div>
        <Link href="/fir" className="text-link mt-3 inline-block">{hi ? 'FIR असिस्टेंट →' : 'FIR Assistant →'}</Link>
      </section>

      {/* CHAPTER 5: PIL */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-yellow mb-4">5</div>
        <h2 className="heading-2 mb-4">{hi ? 'PIL — जनहित याचिका' : 'PIL — Public Interest Litigation'}</h2>
        <div className="space-y-2 text-sm">
          <p><strong>{hi ? 'क्या है:' : 'What it is:'}</strong> {hi ? 'कोई भी व्यक्ति सार्वजनिक हित में हाई कोर्ट या सुप्रीम कोर्ट में याचिका दायर कर सकता है।' : 'Any person can file a petition in High Court or Supreme Court for public interest.'}</p>
          <p><strong>{hi ? 'कब:' : 'When:'}</strong> {hi ? 'सरकारी अकर्मण्यता, व्यवस्थागत समस्या, मौलिक अधिकार उल्लंघन।' : 'Government inaction, systemic problems, fundamental rights violations.'}</p>
          <p><strong>{hi ? 'कैसे:' : 'How:'}</strong> {hi ? 'सादे कागज पर भी दायर की जा सकती है (सुप्रीम कोर्ट को पत्र)।' : 'Can be filed even on plain paper (letter to Supreme Court).'}</p>
          <p><strong>{hi ? 'लागत:' : 'Cost:'}</strong> {hi ? 'न्यूनतम — कोर्ट फीस ₹50-500। वकील ज़रूरी नहीं (पर अनुशंसित)।' : 'Minimal — court fee ₹50-500. Lawyer not required (but recommended).'}</p>
          <p><strong>{hi ? 'सफल PILs:' : 'Successful PILs:'}</strong> {hi ? 'विशाखा दिशानिर्देश, पर्यावरण संरक्षण, NREGA, मिड-डे मील।' : 'Vishaka guidelines, environmental protection, NREGA, mid-day meal.'}</p>
          <p className="mt-2">{hi ? '→ PIL के लिए कानूनी सहायता: NALSA से मुफ्त वकील माँगें या human rights law firms से संपर्क करें।' : '→ For PIL legal help: request free lawyer from NALSA or contact human rights law firms.'}</p>
        </div>
      </section>

      {/* CHAPTER 6: REPRESENTATIVES */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-sky mb-4">6</div>
        <h2 className="heading-2 mb-4">{hi ? 'जनप्रतिनिधियों को लिखें' : 'Write to Representatives'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'कौन क्या नियंत्रित करता है:' : 'Who controls what:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>→ <strong>{hi ? 'नगर पार्षद:' : 'Municipal Councillor:'}</strong> {hi ? 'सड़क, पानी, सफाई, स्ट्रीटलाइट, स्थानीय' : 'Roads, water, sanitation, streetlights, local'}</li>
              <li>→ <strong>MLA:</strong> {hi ? 'राज्य विषय — पुलिस, शिक्षा, स्वास्थ्य, बिजली' : 'State subjects — police, education, health, electricity'}</li>
              <li>→ <strong>MP:</strong> {hi ? 'केंद्रीय विषय — रेलवे, रक्षा, दूरसंचार, परीक्षाएँ (NTA)' : 'Central subjects — railways, defence, telecom, exams (NTA)'}</li>
            </ul>
          </div>
          <p>{hi ? 'पत्र टेम्पलेट, पता, और अनुवर्ती RTI — सब Sahayata Representatives फीचर में।' : 'Letter templates, addresses, and follow-up RTI — all in Sahayata Representatives feature.'}</p>
        </div>
        <Link href="/representatives" className="text-link mt-3 inline-block">{hi ? 'जनप्रतिनिधि खोजें →' : 'Find Representatives →'}</Link>
      </section>

      {/* CHAPTER 7: MEDIA */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-accent mb-4">7</div>
        <h2 className="heading-2 mb-4">{hi ? 'मीडिया रणनीति' : 'Media Strategy'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ <strong>{hi ? 'प्रेस रिलीज:' : 'Press release:'}</strong> {hi ? 'कौन, क्या, कब, कहाँ, क्यों — एक पेज में। संपर्क व्यक्ति का नाम + फोन।' : 'Who, what, when, where, why — one page. Contact person name + phone.'}</li>
          <li>→ <strong>{hi ? 'पत्रकारों से संपर्क:' : 'Contact journalists:'}</strong> {hi ? 'बीट-विशिष्ट (शिक्षा/कानून/राजनीति)। Signal/encrypted email से। WhatsApp ग्रुप में न जोड़ें।' : 'Beat-specific (education/law/politics). Via Signal/encrypted email. Do not add to WhatsApp groups.'}</li>
          <li>→ <strong>{hi ? 'सोशल मीडिया:' : 'Social media:'}</strong> {hi ? 'एक हैशटैग, एक संदेश, एक माँग। विजुअल शेयर करें। अपनी पहचान सुरक्षित रखें।' : 'One hashtag, one message, one demand. Share visuals. Protect your identity.'}</li>
          <li>→ <strong>{hi ? 'प्रेस कॉन्फ्रेंस:' : 'Press conference:'}</strong> {hi ? 'एक स्पीकर, लिखित माँग दस्तावेज़ बाँटें, Q&A तैयार।' : 'One speaker, distribute written demand document, prepare Q&A.'}</li>
          <li>→ <strong>{hi ? 'कब मीडिया मदद करता है:' : 'When media helps:'}</strong> {hi ? 'स्पष्ट माँग + सबूत + मानवीय कहानी + संस्थागत दबाव के साथ।' : 'Clear demand + evidence + human story + alongside institutional pressure.'}</li>
        </ul>
        <Link href="/toolkit" className="text-link mt-3 inline-block">{hi ? 'प्रेस रिलीज टेम्पलेट →' : 'Press Release Template →'}</Link>
      </section>


      {/* CHAPTER 8: ESCALATION LADDER */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-red mb-4">8</div>
        <h2 className="heading-2 mb-4">{hi ? 'एस्केलेशन सीढ़ी' : 'Escalation Ladder'}</h2>
        <div className="text-sm space-y-2">
          <p>{hi ? 'हर स्तर पर: जवाब नहीं → अगले स्तर पर जाएँ + RTI दाखिल करें कि पिछले स्तर ने कार्रवाई क्यों नहीं की।' : 'At every level: no response → move to next level + file RTI asking why previous level did not act.'}</p>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded font-mono text-xs leading-relaxed">
            <p>{hi ? 'वार्ड पार्षद / नगर निगम कार्यालय' : 'Ward Councillor / Municipal Office'}</p>
            <p className="pl-4">↓ {hi ? 'जवाब नहीं (15 दिन)' : 'No response (15 days)'}</p>
            <p className="pl-4">{hi ? 'MLA कार्यालय' : 'MLA Office'}</p>
            <p className="pl-8">↓ {hi ? 'जवाब नहीं (15 दिन)' : 'No response (15 days)'}</p>
            <p className="pl-8">{hi ? 'MP कार्यालय' : 'MP Office'}</p>
            <p className="pl-12">↓ {hi ? 'जवाब नहीं (15 दिन)' : 'No response (15 days)'}</p>
            <p className="pl-12">{hi ? 'विभाग सचिव' : 'Department Secretary'}</p>
            <p className="pl-16">↓ {hi ? 'जवाब नहीं' : 'No response'}</p>
            <p className="pl-16">{hi ? 'मंत्री कार्यालय + CPGRAMS' : "Minister's Office + CPGRAMS"}</p>
            <p className="pl-20">↓ {hi ? 'जवाब नहीं' : 'No response'}</p>
            <p className="pl-20">{hi ? 'NHRC / SHRC / लोकपाल' : 'NHRC / SHRC / Lokpal'}</p>
            <p className="pl-24">↓ {hi ? 'जवाब नहीं' : 'No response'}</p>
            <p className="pl-24">{hi ? 'हाई कोर्ट (PIL)' : 'High Court (PIL)'}</p>
            <p className="pl-28">↓</p>
            <p className="pl-28">{hi ? 'सुप्रीम कोर्ट' : 'Supreme Court'}</p>
          </div>
          <p className="mt-3 font-bold">{hi ? 'हर स्तर पर: लिखित शिकायत + रसीद + RTI कि शिकायत पर क्या कार्रवाई हुई।' : 'At every level: written complaint + receipt + RTI asking what action was taken on complaint.'}</p>
        </div>
      </section>

      {/* CHAPTER 9: COALITION */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-lime mb-4">9</div>
        <h2 className="heading-2 mb-4">{hi ? 'गठबंधन निर्माण' : 'Coalition Building'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'समान माँग वाले अन्य समूहों को खोजें (Sahayata Directory)।' : 'Find other groups with similar demands (Sahayata Directory).'}</li>
          <li>→ {hi ? 'संयुक्त माँग दस्तावेज़ बनाएँ — सबकी सहमति से।' : 'Create joint demand document — with everyone`s consent.'}</li>
          <li>→ {hi ? 'समन्वित कार्रवाई: एक दिन सब एक साथ RTI दाखिल करें।' : 'Coordinated action: everyone files RTI on the same day.'}</li>
          <li>→ {hi ? 'स्वायत्तता बनाए रखें — गठबंधन ≠ विलय। हर समूह अपने फैसले खुद करे।' : 'Maintain autonomy — coalition ≠ merger. Each group makes its own decisions.'}</li>
          <li>→ {hi ? 'राजनीतिक दलों द्वारा कब्जा रोकें — माँग-केंद्रित रहें, व्यक्ति-केंद्रित नहीं।' : 'Prevent co-optation by parties — stay demand-focused, not personality-focused.'}</li>
        </ul>
        <Link href="/organize" className="text-link mt-3 inline-block">{hi ? 'संगठन गाइड →' : 'Organizing Guide →'}</Link>
      </section>

      {/* CHAPTER 10: SUSTAIN */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-sky mb-4">10</div>
        <h2 className="heading-2 mb-4">{hi ? 'दीर्घकालिक दबाव बनाएँ' : 'Sustain Long-Term Pressure'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'भूमिकाएँ बदलें — बर्नआउट रोकें। नेतृत्व एक व्यक्ति में केंद्रित न हो।' : 'Rotate roles — prevent burnout. Leadership should not be concentrated in one person.'}</li>
          <li>→ {hi ? 'नियमित RTI — हर 30 दिन एक और। पुराने जवाब पर अनुवर्ती RTI।' : 'Regular RTIs — one more every 30 days. Follow-up RTI on old responses.'}</li>
          <li>→ {hi ? 'सार्वजनिक स्कोरकार्ड — संस्था ने क्या किया, क्या नहीं। साझा करें।' : 'Public scorecard — what institution did, what it did not. Share widely.'}</li>
          <li>→ {hi ? 'चुनावी जवाबदेही — माँगें चुनाव एजेंडे से जोड़ें। उम्मीदवारों से पूछें।' : 'Electoral accountability — link demands to election agenda. Ask candidates.'}</li>
          <li>→ {hi ? 'संस्थागत स्मृति — सब कुछ दस्तावेज़ करें ताकि नए सदस्य वहीं से शुरू कर सकें।' : 'Institutional memory — document everything so new members can pick up where you left off.'}</li>
          <li>→ {hi ? 'जश्न मनाएँ — छोटी जीतें सार्वजनिक करें। ऊर्जा बनाए रखें।' : 'Celebrate — make small wins public. Maintain energy.'}</li>
        </ul>
      </section>

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/rti" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'RTI जनरेटर →' : 'RTI GENERATOR →'}</Link>
        <Link href="/fir" className="brutal-btn brutal-btn-lg text-center">{hi ? 'FIR असिस्टेंट →' : 'FIR ASSISTANT →'}</Link>
        <Link href="/demands" className="brutal-btn brutal-btn-lg text-center">{hi ? 'डिमांड ट्रैकर →' : 'DEMAND TRACKER →'}</Link>
      </div>
    </div>
  );
}
