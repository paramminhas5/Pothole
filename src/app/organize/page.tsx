import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function OrganizePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">{hi ? 'संगठन कैसे करें' : 'How to Organize'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'ग्रुप बनाएँ, भूमिकाएँ बाँटें, निर्णय लें, टिके रहें।' : 'Form groups, assign roles, make decisions, sustain momentum.'}</p>
      </div>


      {/* FORMING */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-lime mb-4">1</div>
        <h2 className="heading-2 mb-4">{hi ? 'ग्रुप बनाएँ' : 'Form a Group'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'छोटा शुरू करें: 5-7 लोग जो एक-दूसरे पर भरोसा करते हैं।' : 'Start small: 5-7 people who trust each other.'}</li>
          <li>→ {hi ? 'एक स्पष्ट उद्देश्य तय करें: "हम [X] चाहते हैं [Y संस्था] से [Z तारीख] तक।"' : 'Set one clear purpose: "We want [X] from [Y institution] by [Z date]."'}</li>
          <li>→ {hi ? 'पहली बैठक में तय करें: संवाद कैसे, निर्णय कैसे, रुकना कैसे।' : 'Decide in first meeting: how to communicate, how to decide, how to stop.'}</li>
          <li>→ {hi ? 'शुरू से लिखें — हर निर्णय, हर कार्रवाई। संस्थागत स्मृति बनाएँ।' : 'Document from day one — every decision, every action. Build institutional memory.'}</li>
          <li>→ {hi ? 'Sahayata पर ग्रुप बनाएँ: एन्क्रिप्टेड, कोई अकाउंट नहीं, ऑटो-एक्सपायर विकल्प।' : 'Create group on Sahayata: encrypted, no accounts, auto-expire option.'}</li>
        </ul>
        <Link href="/groups" className="text-link mt-3 inline-block">{hi ? 'एन्क्रिप्टेड ग्रुप बनाएँ →' : 'Create Encrypted Group →'}</Link>
      </section>

      {/* ROLES */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-sky mb-4">2</div>
        <h2 className="heading-2 mb-4">{hi ? 'भूमिकाएँ' : 'Roles'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'समन्वयक' : 'Coordinator'}</strong> — {hi ? 'बैठक सुगम बनाए, कार्य ट्रैक करे। नेता नहीं — बदलाव योग्य।' : 'Facilitates meetings, tracks tasks. Not a leader — rotatable.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'संचार' : 'Communications'}</strong> — {hi ? 'मैसेजिंग चैनल, सार्वजनिक बयान, मीडिया संपर्क।' : 'Messaging channels, public statements, media contact.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'कानूनी संपर्क' : 'Legal Liaison'}</strong> — {hi ? 'वकीलों से संपर्क, अधिकारों की जानकारी, FIR/RTI ट्रैक।' : 'Lawyer contact, rights knowledge, FIR/RTI tracking.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'दस्तावेज़ीकरण' : 'Documentation'}</strong> — {hi ? 'सबूत, मिनट्स, टाइमलाइन, एविडेंस वॉल्ट प्रबंधन।' : 'Evidence, minutes, timeline, Evidence Vault management.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'सुरक्षा/कल्याण' : 'Safety/Wellbeing'}</strong> — {hi ? 'सदस्यों की जाँच, बर्नआउट, आपातकालीन प्रोटोकॉल।' : 'Check on members, burnout, emergency protocols.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'आउटरीच' : 'Outreach'}</strong> — {hi ? 'अन्य ग्रुप, मीडिया, संस्थाओं से जोड़े।' : 'Connects with other groups, media, institutions.'}</div>
        </div>
        <p className="text-sm mt-3">{hi ? '⟳ भूमिकाएँ हर [सहमत समय] पर बदलें — कोई एक व्यक्ति अपरिहार्य न हो।' : '⟳ Rotate roles every [agreed time] — no one person should be indispensable.'}</p>
      </section>

      {/* DECISION-MAKING */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-accent mb-4">3</div>
        <h2 className="heading-2 mb-4">{hi ? 'निर्णय लेना' : 'Decision-Making'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ <strong>{hi ? 'बड़े निर्णय (माँगें, सार्वजनिक बयान):' : 'Big decisions (demands, public statements):'}</strong> {hi ? 'सहमति (consensus) — सब सहमत हों।' : 'Consensus — everyone agrees.'}</li>
          <li>→ <strong>{hi ? 'संचालन (समय, जगह):' : 'Operational (time, place):'}</strong> {hi ? 'बहुमत — वोट।' : 'Majority — vote.'}</li>
          <li>→ <strong>{hi ? 'व्यक्तिगत जोखिम (उपस्थित होना या नहीं):' : 'Personal risk (attending or not):'}</strong> {hi ? 'व्यक्तिगत स्वायत्तता — हर व्यक्ति खुद तय करे।' : 'Individual autonomy — each person decides for themselves.'}</li>
          <li>→ <strong>{hi ? 'असहमति:' : 'Disagreement:'}</strong> {hi ? 'रिकॉर्ड करें। अल्पमत की राय दस्तावेज़ करें। बँटवारे से बचें।' : 'Record it. Document minority view. Avoid splits.'}</li>
        </ul>
      </section>

      {/* SUSTAINING */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-yellow mb-4">4</div>
        <h2 className="heading-2 mb-4">{hi ? 'गति बनाए रखें' : 'Sustain Momentum'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'नियमित लय: साप्ताहिक बैठक, दैनिक चेक-इन।' : 'Regular rhythm: weekly meeting, daily check-in.'}</li>
          <li>→ {hi ? 'छोटी जीतें सार्वजनिक करें — RTI का जवाब आया? बताएँ।' : 'Celebrate small wins publicly — RTI response received? Share it.'}</li>
          <li>→ {hi ? 'माँग के खिलाफ प्रगति ट्रैक करें (Demand Tracker)।' : 'Track progress against demands (Demand Tracker).'}</li>
          <li>→ {hi ? 'बर्नआउट प्रोटोकॉल: पीछे हटना ठीक है। कोई दोषी नहीं।' : 'Burnout protocol: stepping back is OK. No guilt.'}</li>
          <li>→ {hi ? 'नए सदस्यों को ऑनबोर्ड करें — दस्तावेज़ हो तो आसान।' : 'Onboard new members — easy if documentation exists.'}</li>
          <li>→ {hi ? 'जो काम कर रहा है, उसे दोहराएँ। जो नहीं, बदलें।' : 'Repeat what is working. Change what is not.'}</li>
        </ul>
      </section>

      {/* SECURITY */}
      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <div className="brutal-badge brutal-badge-red mb-4">5</div>
        <h2 className="heading-2 mb-4">{hi ? 'संगठकों की सुरक्षा' : 'Security for Organizers'}</h2>
        <ul className="space-y-2 text-sm">
          <li>→ {hi ? 'संगठन पहचान ≠ निजी पहचान। अलग ईमेल, नंबर अगर संभव।' : 'Organizing identity ≠ personal identity. Separate email, number if possible.'}</li>
          <li>→ {hi ? 'नए सदस्य: भरोसेमंद सदस्य की सिफारिश से ही।' : 'New members: only through recommendation of trusted member.'}</li>
          <li>→ {hi ? 'अगर कोई गिरफ्तार हो: वकील का नंबर याद हो। बैकअप संपर्क तय।' : 'If someone is arrested: lawyer number memorized. Backup contacts set.'}</li>
          <li>→ {hi ? 'आपातकालीन विघटन: अगर ख़तरा → पूर्व-निर्धारित कोडवर्ड → सब बिखर जाएँ।' : 'Emergency dispersal: if danger → pre-set codeword → everyone disperses.'}</li>
          <li>→ {hi ? 'डिवाइस सुरक्षा: ऑटो-डिलीट, PIN लॉक, कोई बायोमेट्रिक।' : 'Device security: auto-delete, PIN lock, no biometrics.'}</li>
        </ul>
      </section>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/groups" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'ग्रुप बनाएँ →' : 'CREATE GROUP →'}</Link>
        <Link href="/communication" className="brutal-btn brutal-btn-lg text-center">{hi ? 'संचार गाइड →' : 'COMMS GUIDE →'}</Link>
        <Link href="/playbook" className="brutal-btn brutal-btn-lg text-center">{hi ? 'प्लेबुक →' : 'PLAYBOOK →'}</Link>
      </div>
    </div>
  );
}
