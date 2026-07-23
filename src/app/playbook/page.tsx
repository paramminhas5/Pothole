import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';

export default async function PlaybookPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8 flex justify-between items-start gap-4">
        <div>
          <h1 className="heading-display mb-2">{hi ? 'विरोध → शक्ति → बदलाव' : 'Protest → Power → Change'}</h1>
          <p className="text-[var(--color-text-muted)]">{hi ? '10 कदम: सड़क की ऊर्जा को संस्थागत जवाबदेही में बदलें।' : '10 steps: Convert street energy into institutional accountability.'}</p>
        </div>
        <PrintButton locale={locale} />
      </div>

      {/* TL;DR */}
      <section className="brutal-card mb-8 !border-[var(--color-primary)]">
        <h2 className="heading-3 mb-3">{hi ? 'एक वाक्य में:' : 'In one sentence:'}</h2>
        <p className="text-sm font-bold">{hi ? 'एक स्पष्ट माँग लिखें → सबूत जमा करें → RTI/FIR/PIL दाखिल करें → जनप्रतिनिधि को लिखें → ट्रैक करें → एस्केलेट करें → तब तक जारी रखें जब तक जवाब न मिले।' : 'Write one clear demand → collect evidence → file RTI/FIR/PIL → write to representative → track → escalate → keep going until you get a response.'}</p>
      </section>


      {/* CHAPTER 1 */}
      <details className="brutal-card mb-4" open>
        <summary className="heading-3 cursor-pointer">1. {hi ? 'माँग स्पष्ट करें' : 'Define Your Demand'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <p className="font-bold">{hi ? '"जवाबदेही" माँग नहीं है। "शिक्षा मंत्री 15 अगस्त तक इस्तीफा दें" माँग है।' : '"Accountability" is not a demand. "Education Minister resign by August 15" is a demand.'}</p>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'माँग का फॉर्मूला:' : 'Demand formula:'}</strong>
            <p className="mt-1 font-mono text-xs">[{hi ? 'कौन' : 'WHO'}] + [{hi ? 'क्या करे' : 'does WHAT'}] + [{hi ? 'कब तक' : 'by WHEN'}]</p>
            <p className="mt-2">{hi ? 'उदाहरण: "NTA प्रमुख 30 जुलाई तक सभी लीक परीक्षाओं की स्वतंत्र जाँच की रिपोर्ट सार्वजनिक करें।"' : 'Example: "NTA chief publicly release independent investigation report of all leaked exams by July 30."'}</p>
          </div>
          <p>{hi ? '→ Sahayata डिमांड बोर्ड पर अपनी माँग दर्ज करें और ट्रैक करें।' : '→ Register and track your demand on the Sahayata Demand Board.'}</p>
          <Link href="/create-post" className="text-link">{hi ? 'माँग पोस्ट करें →' : 'Post a demand →'}</Link>
        </div>
      </details>

      {/* CHAPTER 2 */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">2. {hi ? 'सब कुछ दस्तावेज़ करें' : 'Document Everything'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <p className="font-bold">{hi ? 'बिना सबूत के माँग सिर्फ शोर है। सबूत के साथ यह कानूनी दबाव है।' : 'Without evidence a demand is just noise. With evidence it is legal pressure.'}</p>
          <ul className="space-y-1">
            <li>→ {hi ? 'फोटो/वीडियो: समय + जगह दिखे। ओरिजिनल कभी एडिट न करें।' : 'Photos/videos: show time + place. Never edit originals.'}</li>
            <li>→ {hi ? 'टाइमलाइन: क्या हुआ, कब, किसने किया — लिखें (जल्दी)।' : 'Timeline: what happened, when, who did it — write it down (quickly).'}</li>
            <li>→ {hi ? 'गवाह: नाम + संपर्क (सहमति से)।' : 'Witnesses: name + contact (with consent).'}</li>
            <li>→ {hi ? 'मीडिया कवरेज: लिंक सेव करें, स्क्रीनशॉट लें।' : 'Media coverage: save links, take screenshots.'}</li>
            <li>→ {hi ? 'तुरंत क्लाउड बैकअप: Google Drive, ProtonDrive।' : 'Immediate cloud backup: Google Drive, ProtonDrive.'}</li>
          </ul>
          <Link href="/toolkit" className="text-link">{hi ? 'एविडेंस लॉग टेम्पलेट →' : 'Evidence Log Template →'}</Link>
        </div>
      </details>

      {/* CHAPTER 3 */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">3. {hi ? 'RTI दाखिल करें' : 'File RTI'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <p className="font-bold">{hi ? 'RTI = सरकार को जवाब देने पर मजबूर करने का कानूनी हथियार। ₹10। 30 दिन। नहीं दिया → जुर्माना।' : 'RTI = legal weapon to force government to answer. ₹10. 30 days. No response → penalty.'}</p>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'कैसे:' : 'How:'}</strong>
            <ol className="mt-1 list-decimal list-inside space-y-1">
              <li>{hi ? 'Sahayata RTI जनरेटर में फॉर्म भरें' : 'Fill form in Sahayata RTI Generator'}</li>
              <li>{hi ? 'rtionline.gov.in पर जमा करें (₹10 ऑनलाइन)' : 'Submit on rtionline.gov.in (₹10 online)'}</li>
              <li>{hi ? '30 दिन टाइमर शुरू' : 'Start 30-day timer'}</li>
              <li>{hi ? 'जवाब नहीं → प्रथम अपील (Sahayata अपील जनरेटर)' : 'No response → First Appeal (Sahayata Appeal Generator)'}</li>
              <li>{hi ? 'फिर भी नहीं → सूचना आयोग (CIC/SIC)' : 'Still nothing → Information Commission (CIC/SIC)'}</li>
            </ol>
          </div>
          <p className="text-xs">{hi ? 'CIC जुर्माना: ₹250/दिन, अधिकतम ₹25,000 — अधिकारी की जेब से।' : 'CIC penalty: ₹250/day, max ₹25,000 — from the officer`s pocket.'}</p>
          <Link href="/rti" className="brutal-btn brutal-btn-primary mt-2 inline-block">{hi ? 'RTI जनरेटर खोलें →' : 'Open RTI Generator →'}</Link>
        </div>
      </details>


      {/* CHAPTER 4 */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">4. {hi ? 'FIR दर्ज करें' : 'File FIR'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <p className="font-bold">{hi ? 'अपराध हुआ है? पुलिस FIR दर्ज करने से मना नहीं कर सकती। मना करे तो 3 रास्ते हैं।' : 'Crime committed? Police cannot refuse to file FIR. If they refuse, there are 3 paths.'}</p>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'एस्केलेशन:' : 'Escalation:'}</strong>
            <ol className="mt-1 list-decimal list-inside space-y-1">
              <li>{hi ? 'पुलिस स्टेशन → लिखित शिकायत दें → रसीद लें' : 'Police station → give written complaint → get receipt'}</li>
              <li>{hi ? 'मना करें → SP (पुलिस अधीक्षक) को पत्र' : 'Refuse → letter to SP (Superintendent of Police)'}</li>
              <li>{hi ? 'SP भी मना → मजिस्ट्रेट शिकायत (BNSS 175(3))' : 'SP also refuses → Magistrate complaint (BNSS 175(3))'}</li>
            </ol>
            <p className="mt-2">{hi ? 'Zero FIR: कहीं भी दर्ज करवा सकते हैं — सही थाने में ट्रांसफर होगी।' : 'Zero FIR: can file anywhere — will be transferred to correct station.'}</p>
          </div>
          <Link href="/fir" className="brutal-btn brutal-btn-primary mt-2 inline-block">{hi ? 'FIR असिस्टेंट खोलें →' : 'Open FIR Assistant →'}</Link>
        </div>
      </details>

      {/* CHAPTER 5 */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">5. {hi ? 'PIL दायर करें' : 'File PIL'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <p className="font-bold">{hi ? 'व्यवस्थागत समस्या? सरकारी अकर्मण्यता? कोई भी व्यक्ति हाई कोर्ट / सुप्रीम कोर्ट में PIL दायर कर सकता है।' : 'Systemic problem? Government inaction? Anyone can file PIL in High Court / Supreme Court.'}</p>
          <ul className="space-y-1">
            <li>→ {hi ? 'सादे कागज पर भी सुप्रीम कोर्ट को पत्र लिख सकते हैं।' : 'Can even write a letter on plain paper to Supreme Court.'}</li>
            <li>→ {hi ? 'लागत: ₹50-500 कोर्ट फीस। वकील ज़रूरी नहीं (पर अनुशंसित)।' : 'Cost: ₹50-500 court fee. Lawyer not required (but recommended).'}</li>
            <li>→ {hi ? 'मुफ्त वकील: HRLN (hrln.org) या NALSA से माँगें।' : 'Free lawyer: ask HRLN (hrln.org) or NALSA.'}</li>
          </ul>
          <p className="text-xs text-[var(--color-text-muted)]">{hi ? 'सफल PILs: विशाखा दिशानिर्देश, NREGA, मिड-डे मील, पर्यावरण संरक्षण।' : 'Successful PILs: Vishaka guidelines, NREGA, mid-day meal, environmental protection.'}</p>
        </div>
      </details>

      {/* CHAPTER 6 */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">6. {hi ? 'जनप्रतिनिधि को लिखें' : 'Write to Representative'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <p className="font-bold">{hi ? 'आपके MLA/MP आपके कर्मचारी हैं। उन्हें बताएँ कि आप क्या चाहते हैं।' : 'Your MLA/MP are your employees. Tell them what you want.'}</p>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'कौन क्या नियंत्रित करता है:' : 'Who controls what:'}</strong>
            <ul className="mt-1 space-y-1">
              <li>• <strong>{hi ? 'नगर पार्षद:' : 'Councillor:'}</strong> {hi ? 'सड़क, पानी, सफाई, स्ट्रीटलाइट' : 'Roads, water, sanitation, streetlights'}</li>
              <li>• <strong>MLA:</strong> {hi ? 'पुलिस, शिक्षा (राज्य), स्वास्थ्य, बिजली' : 'Police, education (state), health, electricity'}</li>
              <li>• <strong>MP:</strong> {hi ? 'रेलवे, दूरसंचार, परीक्षाएँ (NTA), केंद्रीय कानून' : 'Railways, telecom, exams (NTA), central laws'}</li>
            </ul>
          </div>
          <p>{hi ? '→ MP खोजें: sansad.in/ls/members (राज्य/निर्वाचन क्षेत्र से)' : '→ Find MP: sansad.in/ls/members (by state/constituency)'}</p>
          <Link href="/representatives" className="text-link">{hi ? 'पत्र टेम्पलेट + प्रतिनिधि खोजें →' : 'Letter template + find representative →'}</Link>
        </div>
      </details>


      {/* CHAPTER 7 */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">7. {hi ? 'मीडिया रणनीति' : 'Media Strategy'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <p className="font-bold">{hi ? 'मीडिया तभी मदद करता है जब: स्पष्ट माँग + सबूत + मानवीय कहानी + संस्थागत दबाव के साथ हो।' : 'Media only helps when: clear demand + evidence + human story + alongside institutional pressure.'}</p>
          <ul className="space-y-1">
            <li>→ {hi ? 'प्रेस रिलीज: कौन, क्या, कब, कहाँ, क्यों — एक पेज। संपर्क दें।' : 'Press release: who, what, when, where, why — one page. Give contact.'}</li>
            <li>→ {hi ? 'पत्रकार संपर्क: बीट-विशिष्ट। Signal/encrypted email से।' : 'Journalist contact: beat-specific. Via Signal/encrypted email.'}</li>
            <li>→ {hi ? 'सोशल मीडिया: एक हैशटैग, एक संदेश, एक माँग। पहचान सुरक्षित रखें।' : 'Social media: one hashtag, one message, one demand. Protect identity.'}</li>
          </ul>
          <Link href="/toolkit" className="text-link">{hi ? 'प्रेस रिलीज टेम्पलेट →' : 'Press Release Template →'}</Link>
        </div>
      </details>

      {/* CHAPTER 8 */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">8. {hi ? 'एस्केलेशन सीढ़ी' : 'Escalation Ladder'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <p className="font-bold">{hi ? 'हर स्तर पर: जवाब नहीं → अगला स्तर + RTI कि "पिछली शिकायत पर क्या हुआ?"' : 'At every level: no response → next level + RTI asking "what happened to my last complaint?"'}</p>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded font-mono text-xs leading-loose">
            <p>{hi ? 'नगर पार्षद / नगर निगम' : 'Ward Councillor / Municipal Corp'}</p>
            <p className="pl-4">↓ {hi ? '15 दिन — जवाब नहीं' : '15 days — no response'}</p>
            <p className="pl-4 font-bold">MLA</p>
            <p className="pl-8">↓ {hi ? '15 दिन — जवाब नहीं' : '15 days — no response'}</p>
            <p className="pl-8 font-bold">MP</p>
            <p className="pl-12">↓ {hi ? '15 दिन — जवाब नहीं' : '15 days — no response'}</p>
            <p className="pl-12 font-bold">{hi ? 'विभाग सचिव + CPGRAMS' : 'Dept Secretary + CPGRAMS'}</p>
            <p className="pl-16">↓</p>
            <p className="pl-16 font-bold">NHRC / {hi ? 'लोकपाल' : 'Lokpal'}</p>
            <p className="pl-20">↓</p>
            <p className="pl-20 font-bold">{hi ? 'हाई कोर्ट (PIL)' : 'High Court (PIL)'}</p>
            <p className="pl-24">↓</p>
            <p className="pl-24 font-bold">{hi ? 'सुप्रीम कोर्ट' : 'Supreme Court'}</p>
          </div>
        </div>
      </details>

      {/* CHAPTER 9 */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">9. {hi ? 'गठबंधन बनाएँ' : 'Build Coalitions'}</summary>
        <div className="mt-4 text-sm space-y-2">
          <p className="font-bold">{hi ? 'अकेला समूह कमज़ोर है। 10 समूह मिलकर → अनदेखा करना असंभव।' : 'One group is weak. 10 groups together → impossible to ignore.'}</p>
          <ul className="space-y-1">
            <li>→ {hi ? 'Sahayata डायरेक्टरी में समान माँग वाले ग्रुप खोजें।' : 'Find groups with similar demands on Sahayata Directory.'}</li>
            <li>→ {hi ? 'संयुक्त माँग दस्तावेज़ बनाएँ — सबकी सहमति।' : 'Create joint demand document — everyone agrees.'}</li>
            <li>→ {hi ? 'समन्वित कार्रवाई: एक दिन सब एक साथ RTI दाखिल।' : 'Coordinated action: everyone files RTI on same day.'}</li>
            <li>→ {hi ? 'स्वायत्तता रखें — गठबंधन ≠ विलय।' : 'Keep autonomy — coalition ≠ merger.'}</li>
            <li>→ {hi ? 'दल-कब्जा रोकें: माँग-केंद्रित रहें, व्यक्ति-केंद्रित नहीं।' : 'Prevent co-optation: stay demand-focused, not personality-focused.'}</li>
          </ul>
          <Link href="/directory" className="text-link">{hi ? 'डायरेक्टरी में ग्रुप खोजें →' : 'Find groups in Directory →'}</Link>
        </div>
      </details>

      {/* CHAPTER 10 */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">10. {hi ? 'दीर्घकालिक दबाव' : 'Sustain Long-Term Pressure'}</summary>
        <div className="mt-4 text-sm space-y-2">
          <p className="font-bold">{hi ? 'ज़्यादातर आंदोलन हारते नहीं — वे थक जाते हैं। थकान मारती है।' : 'Most movements don`t lose — they get tired. Fatigue kills.'}</p>
          <ul className="space-y-1">
            <li>→ {hi ? 'भूमिकाएँ बदलें — कोई एक व्यक्ति अपरिहार्य न हो।' : 'Rotate roles — no one person indispensable.'}</li>
            <li>→ {hi ? 'हर 30 दिन एक RTI और। पुराने जवाब पर अनुवर्ती।' : 'One more RTI every 30 days. Follow-up on old responses.'}</li>
            <li>→ {hi ? 'सार्वजनिक स्कोरकार्ड: संस्था ने क्या किया, क्या नहीं।' : 'Public scorecard: what institution did, what it didn`t.'}</li>
            <li>→ {hi ? 'छोटी जीतें सार्वजनिक करें — ऊर्जा बनी रहती है।' : 'Publicize small wins — keeps energy up.'}</li>
            <li>→ {hi ? 'चुनावी जवाबदेही: माँगें चुनाव एजेंडे से जोड़ें।' : 'Electoral accountability: link demands to election agenda.'}</li>
            <li>→ {hi ? 'बर्नआउट प्रोटोकॉल: पीछे हटना ठीक है। कोई दोषी नहीं।' : 'Burnout protocol: stepping back is OK. No guilt.'}</li>
          </ul>
          <Link href="/organize" className="text-link">{hi ? 'संगठन गाइड →' : 'Organizing Guide →'}</Link>
        </div>
      </details>

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/rti" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'RTI जनरेटर →' : 'RTI GENERATOR →'}</Link>
        <Link href="/fir" className="brutal-btn brutal-btn-lg text-center">{hi ? 'FIR असिस्टेंट →' : 'FIR ASSISTANT →'}</Link>
        <Link href="/toolkit" className="brutal-btn brutal-btn-lg text-center">{hi ? 'सभी टेम्पलेट →' : 'ALL TEMPLATES →'}</Link>
      </div>
    </div>
  );
}
