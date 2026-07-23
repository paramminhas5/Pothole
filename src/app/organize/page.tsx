import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';

export default async function OrganizePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8 flex justify-between items-start gap-4">
        <div>
          <h1 className="heading-display mb-2">{hi ? 'कैसे संगठित करें' : 'How to Organize'}</h1>
          <p className="text-[var(--color-text-muted)]">{hi ? 'ग्रुप बनाएँ। भूमिकाएँ बाँटें। कानूनी रूप से विरोध करें। टिके रहें।' : 'Form groups. Assign roles. Protest legally. Stay sustained.'}</p>
        </div>
        <PrintButton locale={locale} />
      </div>


      {/* FORM A GROUP */}
      <details className="brutal-card mb-4" open>
        <summary className="heading-3 cursor-pointer">1. {hi ? 'ग्रुप बनाएँ' : 'Form a Group'}</summary>
        <div className="mt-4 text-sm space-y-2">
          <p className="font-bold">{hi ? '5-7 भरोसेमंद लोगों से शुरू करें। एक स्पष्ट उद्देश्य। पहले दिन से लिखें।' : 'Start with 5-7 trusted people. One clear purpose. Document from day one.'}</p>
          <ul className="space-y-1">
            <li>→ {hi ? 'एक वाक्य उद्देश्य: "हम [X] चाहते हैं [Y] से [Z तारीख] तक।"' : 'One sentence purpose: "We want [X] from [Y] by [Z date]."'}</li>
            <li>→ {hi ? 'पहली बैठक में तय करें: संवाद कैसे, निर्णय कैसे, रुकना कैसे।' : 'First meeting decides: how to communicate, how to decide, how to stop.'}</li>
            <li>→ {hi ? 'Sahayata पर रजिस्टर करें (मॉडरेशन के बाद डायरेक्टरी में दिखेगा)।' : 'Register on Sahayata (appears in directory after moderation).'}</li>
            <li>→ {hi ? 'या Signal/Telegram पर ग्रुप बनाएँ (संचार गाइड देखें)।' : 'Or create group on Signal/Telegram (see Communication Guide).'}</li>
          </ul>
          <Link href="/submit-chapter" className="text-link">{hi ? 'ग्रुप रजिस्टर करें →' : 'Register Group →'}</Link>
        </div>
      </details>

      {/* ROLES */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">2. {hi ? 'भूमिकाएँ बाँटें' : 'Assign Roles'}</summary>
        <div className="mt-4 text-sm space-y-2">
          <p className="font-bold">{hi ? 'हर भूमिका बदलाव योग्य। कोई एक व्यक्ति अपरिहार्य न हो।' : 'Every role is rotatable. No one person should be indispensable.'}</p>
          <div className="grid md:grid-cols-2 gap-2 mt-3">
            <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? '🎯 समन्वयक' : '🎯 Coordinator'}</strong><br/>{hi ? 'बैठक चलाए, कार्य ट्रैक करे — नेता नहीं।' : 'Runs meetings, tracks tasks — not a leader.'}</div>
            <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? '📱 संचार' : '📱 Comms'}</strong><br/>{hi ? 'मैसेजिंग, बयान, मीडिया संपर्क।' : 'Messaging, statements, media contact.'}</div>
            <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? '⚖️ कानूनी' : '⚖️ Legal'}</strong><br/>{hi ? 'वकील संपर्क, अधिकार, RTI/FIR ट्रैक।' : 'Lawyer contact, rights info, RTI/FIR tracking.'}</div>
            <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? '📝 दस्तावेज़' : '📝 Documentation'}</strong><br/>{hi ? 'सबूत, मिनट्स, टाइमलाइन।' : 'Evidence, minutes, timeline.'}</div>
            <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? '🛡️ सुरक्षा' : '🛡️ Safety'}</strong><br/>{hi ? 'सदस्य जाँच, बर्नआउट, आपातकालीन।' : 'Member check-ins, burnout, emergency.'}</div>
            <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? '🤝 आउटरीच' : '🤝 Outreach'}</strong><br/>{hi ? 'अन्य ग्रुप, संस्थाएँ, मीडिया।' : 'Other groups, institutions, media.'}</div>
          </div>
          <p className="mt-2">{hi ? '⟳ हर 2-4 हफ्ते भूमिकाएँ बदलें।' : '⟳ Rotate roles every 2-4 weeks.'}</p>
        </div>
      </details>

      {/* LEGAL PROTEST */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">3. {hi ? 'कानूनी रूप से विरोध करें' : 'Protest Legally'}</summary>
        <div className="mt-4 text-sm space-y-3">
          <p className="font-bold">{hi ? 'शांतिपूर्ण विरोध मौलिक अधिकार है (अनुच्छेद 19)। लेकिन कुछ नियम हैं।' : 'Peaceful protest is a fundamental right (Article 19). But there are some rules.'}</p>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'अनुमति प्रक्रिया (राज्य अनुसार भिन्न):' : 'Permission process (varies by state):'}</strong>
            <ol className="mt-1 list-decimal list-inside space-y-1">
              <li>{hi ? 'स्थानीय पुलिस स्टेशन को लिखित सूचना (3-7 दिन पहले)।' : 'Written notice to local police station (3-7 days prior).'}</li>
              <li>{hi ? 'जगह, समय, अपेक्षित भीड़, उद्देश्य बताएँ।' : 'Mention place, time, expected crowd, purpose.'}</li>
              <li>{hi ? 'पुलिस "अनुमति" नहीं देती — वे "आपत्ति नहीं" प्रमाणपत्र देते हैं।' : 'Police don`t "give permission" — they issue "no objection" certificate.'}</li>
              <li>{hi ? 'अनुमति मिलना अधिकार नहीं — पुलिस मना कर सकती है (न्यायिक चुनौती संभव)।' : 'Getting permission is not guaranteed — police can refuse (judicial challenge possible).'}</li>
            </ol>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'बिना अनुमति भी:' : 'Even without permission:'}</strong>
            <ul className="mt-1 space-y-1">
              <li>→ {hi ? 'एकल व्यक्ति विरोध (1 व्यक्ति) को अनुमति की जरूरत नहीं।' : 'Single person protest (1 person) needs no permission.'}</li>
              <li>→ {hi ? '4 लोगों तक धारा 163 लागू नहीं (5+ पर)।' : 'Section 163 applies to 5+ (not 4 or fewer).'}</li>
              <li>→ {hi ? 'घर के अंदर बैठक को अनुमति नहीं चाहिए।' : 'Indoor meetings need no permission.'}</li>
            </ul>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'क्या लाएँ:' : 'What to bring:'}</strong>
            <ul className="mt-1 space-y-1">
              <li>✓ {hi ? 'पानी, नमकीन, ID (कॉपी, ओरिजिनल नहीं), वकील का नंबर (याद), चार्ज्ड फोन' : 'Water, snacks, ID (copy not original), lawyer number (memorized), charged phone'}</li>
              <li>✗ {hi ? 'हथियार, शराब, ड्रग्स, ओरिजिनल दस्तावेज़, बहुत कैश' : 'Weapons, alcohol, drugs, original documents, too much cash'}</li>
            </ul>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">{hi ? 'स्रोत: Nyaaya.org "Guide to Lawful Protesting", Indian Express, ICNL Report on India' : 'Source: Nyaaya.org "Guide to Lawful Protesting", Indian Express, ICNL Report on India'}</p>
        </div>
      </details>


      {/* DECISIONS */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">4. {hi ? 'निर्णय लें' : 'Make Decisions'}</summary>
        <div className="mt-4 text-sm space-y-2">
          <div className="grid md:grid-cols-3 gap-2">
            <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'बड़े' : 'Big'}</strong><br/>{hi ? 'माँगें, बयान → सहमति (सब सहमत)' : 'Demands, statements → consensus (all agree)'}</div>
            <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'संचालन' : 'Operational'}</strong><br/>{hi ? 'समय, जगह → बहुमत (वोट)' : 'Time, place → majority (vote)'}</div>
            <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>{hi ? 'व्यक्तिगत' : 'Personal'}</strong><br/>{hi ? 'उपस्थित होना → व्यक्तिगत (खुद तय)' : 'Attending → individual (self-decide)'}</div>
          </div>
          <p>{hi ? 'असहमति रिकॉर्ड करें। अल्पमत राय दस्तावेज़ करें। बँटवारे से बचें।' : 'Record disagreements. Document minority views. Avoid splits.'}</p>
        </div>
      </details>

      {/* SUSTAIN */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">5. {hi ? 'टिके रहें' : 'Sustain Momentum'}</summary>
        <div className="mt-4 text-sm space-y-2">
          <ul className="space-y-1">
            <li>→ {hi ? 'नियमित लय: साप्ताहिक बैठक, दैनिक चेक-इन।' : 'Regular rhythm: weekly meeting, daily check-in.'}</li>
            <li>→ {hi ? 'छोटी जीतें सार्वजनिक करें (RTI जवाब आया? बताएँ)।' : 'Publicize small wins (RTI response received? Share it).'}</li>
            <li>→ {hi ? 'बर्नआउट प्रोटोकॉल: पीछे हटना ठीक है। कोई दोषी नहीं।' : 'Burnout protocol: stepping back is OK. No guilt.'}</li>
            <li>→ {hi ? 'नए सदस्य ऑनबोर्ड: दस्तावेज़ हो तो आसान।' : 'Onboard new members: easy if documentation exists.'}</li>
            <li>→ {hi ? 'जो काम कर रहा वह दोहराएँ। जो नहीं, बदलें।' : 'Repeat what works. Change what doesn`t.'}</li>
          </ul>
        </div>
      </details>

      {/* SECURITY */}
      <details className="brutal-card mb-4 !border-[var(--color-red)]">
        <summary className="heading-3 cursor-pointer">6. {hi ? '🔒 सुरक्षा' : '🔒 Security'}</summary>
        <div className="mt-4 text-sm space-y-2">
          <ul className="space-y-1">
            <li>→ {hi ? 'संगठन पहचान ≠ निजी पहचान। अलग ईमेल/नंबर।' : 'Organizing identity ≠ personal identity. Separate email/number.'}</li>
            <li>→ {hi ? 'नए सदस्य: भरोसेमंद सदस्य की सिफारिश से।' : 'New members: through trusted member recommendation.'}</li>
            <li>→ {hi ? 'गिरफ्तारी प्रोटोकॉल: वकील नंबर याद। बैकअप संपर्क।' : 'Arrest protocol: lawyer number memorized. Backup contacts.'}</li>
            <li>→ {hi ? 'आपातकालीन विघटन: कोडवर्ड → सब बिखर जाएँ।' : 'Emergency dispersal: codeword → everyone disperses.'}</li>
            <li>→ {hi ? 'डिवाइस: ऑटो-डिलीट, PIN लॉक, कोई बायोमेट्रिक।' : 'Devices: auto-delete, PIN lock, no biometrics.'}</li>
            <li>→ {hi ? 'घुसपैठ संकेत: अजीब सवाल, जानकारी लीक → नया ग्रुप बनाएँ, चुपचाप।' : 'Infiltration signs: unusual questions, info leaks → create new group, silently.'}</li>
          </ul>
          <Link href="/communication" className="text-link mt-2 inline-block">{hi ? 'सुरक्षित संचार गाइड →' : 'Secure Comms Guide →'}</Link>
        </div>
      </details>

      {/* COALITION */}
      <details className="brutal-card mb-4">
        <summary className="heading-3 cursor-pointer">7. {hi ? 'गठबंधन' : 'Build Coalitions'}</summary>
        <div className="mt-4 text-sm space-y-2">
          <ul className="space-y-1">
            <li>→ {hi ? 'Sahayata डायरेक्टरी में समान ग्रुप खोजें।' : 'Find similar groups in Sahayata Directory.'}</li>
            <li>→ {hi ? 'संयुक्त माँग दस्तावेज़ (सब सहमत)।' : 'Joint demand document (all agree).'}</li>
            <li>→ {hi ? 'समन्वित RTI: सब एक दिन दाखिल करें।' : 'Coordinated RTI: all file on same day.'}</li>
            <li>→ {hi ? 'स्वायत्तता: गठबंधन ≠ विलय।' : 'Autonomy: coalition ≠ merger.'}</li>
          </ul>
          <Link href="/directory" className="text-link mt-2 inline-block">{hi ? 'डायरेक्टरी →' : 'Directory →'}</Link>
        </div>
      </details>

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/submit-chapter" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'ग्रुप रजिस्टर →' : 'REGISTER GROUP →'}</Link>
        <Link href="/communication" className="brutal-btn brutal-btn-lg text-center">{hi ? 'संचार गाइड →' : 'COMMS GUIDE →'}</Link>
        <Link href="/directory" className="brutal-btn brutal-btn-lg text-center">{hi ? 'डायरेक्टरी →' : 'DIRECTORY →'}</Link>
      </div>
    </div>
  );
}
