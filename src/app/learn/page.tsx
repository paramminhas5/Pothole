import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function LearnPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">
          {hi ? 'सत्ता कैसे काम करती है — और इसे कैसे लें' : 'How Power Works — And How to Take It'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {hi ? 'गुस्सा काफी नहीं। आपको समझना होगा कि व्यवस्था कैसे काम करती है, पहले किसने जीता, और आप कैसे जीत सकते हैं।'
            : 'Anger is not enough. You need to understand how the system works, who won before, and how you can win.'}
        </p>
      </div>


      {/* MODULE 1: HOW MOVEMENTS WIN */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">{hi ? '1. आंदोलन कैसे जीतते हैं' : '1. How Movements Win'}</h2>
        <div className="space-y-4 text-sm">
          <details className="p-4 bg-[var(--color-surface-alt)] rounded">
            <summary className="font-bold cursor-pointer">{hi ? '🇮🇳 किसान आंदोलन 2020-21 (13 महीने → सरकार झुकी)' : '🇮🇳 Farmers Movement 2020-21 (13 months → govt backed down)'}</summary>
            <div className="mt-3 space-y-2">
              <p><strong>{hi ? 'क्या काम किया:' : 'What worked:'}</strong></p>
              <ul className="ml-4 list-disc space-y-1">
                <li>{hi ? 'एक स्पष्ट माँग: "3 कानून वापस लो"' : 'One clear demand: "Repeal 3 laws"'}</li>
                <li>{hi ? 'आर्थिक दबाव: टोल बंद, सप्लाई चेन प्रभावित' : 'Economic pressure: toll blocked, supply chains affected'}</li>
                <li>{hi ? 'चुनावी खतरा: UP चुनाव से पहले वापसी' : 'Electoral threat: backed down before UP elections'}</li>
                <li>{hi ? 'अंतरराष्ट्रीय दबाव: Rihanna, Greta, global media' : 'International pressure: Rihanna, Greta, global media'}</li>
                <li>{hi ? 'संगठनात्मक ताकत: SKM 40+ यूनियन = बिखर नहीं सके' : 'Organizational strength: SKM 40+ unions = couldn\'t be split'}</li>
                <li>{hi ? 'आत्मनिर्भर: लंगर, टेंट, खुद का इन्फ्रा — सरकार पर निर्भर नहीं' : 'Self-sufficient: langar, tents, own infra — not dependent on govt'}</li>
              </ul>
              <p><strong>{hi ? 'सबक:' : 'Lesson:'}</strong> {hi ? 'एक माँग + आर्थिक दबाव + चुनावी खतरा = सरकार झुकती है।' : 'One demand + economic pressure + electoral threat = govt backs down.'}</p>
            </div>
          </details>

          <details className="p-4 bg-[var(--color-surface-alt)] rounded">
            <summary className="font-bold cursor-pointer">{hi ? '🇧🇩 बांग्लादेश 2024 (छात्रों ने सरकार गिराई — 2 हफ्ते)' : '🇧🇩 Bangladesh 2024 (Students toppled government — 2 weeks)'}</summary>
            <div className="mt-3 space-y-2">
              <p><strong>{hi ? 'क्या काम किया:' : 'What worked:'}</strong></p>
              <ul className="ml-4 list-disc space-y-1">
                <li>{hi ? 'कोटा सुधार → सरकार विरोधी → शासन परिवर्तन (escalation)' : 'Quota reform → anti-government → regime change (escalation)'}</li>
                <li>{hi ? 'पूर्ण अवज्ञा: स्कूल, कॉलेज, ऑफिस सब बंद' : 'Complete disobedience: schools, colleges, offices all shut'}</li>
                <li>{hi ? 'सेना ने साथ छोड़ दिया (critical tipping point)' : 'Army refused orders (critical tipping point)'}</li>
                <li>{hi ? 'सोशल मीडिया + अंतरराष्ट्रीय मीडिया एक साथ' : 'Social media + international media simultaneously'}</li>
              </ul>
              <p><strong>{hi ? 'सबक:' : 'Lesson:'}</strong> {hi ? 'जब हर संस्था (सेना, न्यायपालिका, मीडिया) में दरार — तभी शासन बदलता है।' : 'When every institution (army, judiciary, media) cracks — that\'s when regimes fall.'}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{hi ? '⚠️ भारत ≠ बांग्लादेश। भारतीय सेना कभी राजनीति में नहीं आई। यहाँ रास्ता: चुनाव + न्यायपालिका।' : '⚠️ India ≠ Bangladesh. Indian army has never entered politics. Here the path is: elections + judiciary.'}</p>
            </div>
          </details>

          <details className="p-4 bg-[var(--color-surface-alt)] rounded">
            <summary className="font-bold cursor-pointer">{hi ? '🇮🇳 AAP: विरोध से सत्ता तक (2 साल में)' : '🇮🇳 AAP: Protest to Power (in 2 years)'}</summary>
            <div className="mt-3 space-y-2">
              <p><strong>{hi ? 'टाइमलाइन:' : 'Timeline:'}</strong></p>
              <ul className="ml-4 list-disc space-y-1">
                <li>2011: {hi ? 'Anna Hazare भ्रष्टाचार-विरोधी आंदोलन → राष्ट्रीय ध्यान' : 'Anna Hazare anti-corruption → national attention'}</li>
                <li>2012: {hi ? 'Kejriwal ने AAP बनाई → "हम चुनाव लड़ेंगे"' : 'Kejriwal forms AAP → "We\'ll contest elections"'}</li>
                <li>2013: {hi ? 'दिल्ली चुनाव: 28/70 सीट → सरकार बनाई (49 दिन)' : 'Delhi election: 28/70 seats → formed govt (49 days)'}</li>
                <li>2015: {hi ? '67/70 सीट → पूर्ण बहुमत' : '67/70 seats → full majority'}</li>
              </ul>
              <p><strong>{hi ? 'सबक:' : 'Lesson:'}</strong> {hi ? 'विरोध → पार्टी → चुनाव = 2 साल में सत्ता। लेकिन: सत्ता आने के बाद भी वही समस्याएँ (भ्रष्टाचार, अत्याचार) — सत्ता बदलती है, व्यवस्था नहीं।' : 'Protest → party → election = power in 2 years. But: same problems after power (corruption, abuse) — power changes, system doesn\'t.'}</p>
              <p><strong>{hi ? 'CJP के लिए सवाल:' : 'Question for CJP:'}</strong> {hi ? 'क्या चुनाव लड़ना है? या बाहर से दबाव? दोनों वैध रणनीतियाँ।' : 'Contest elections? Or pressure from outside? Both are valid strategies.'}</p>
            </div>
          </details>

          <details className="p-4 bg-[var(--color-surface-alt)] rounded">
            <summary className="font-bold cursor-pointer">{hi ? '🇷🇸 सर्बिया Otpor! 2000 (अहिंसक शासन परिवर्तन)' : '🇷🇸 Serbia Otpor! 2000 (Nonviolent regime change)'}</summary>
            <div className="mt-3 space-y-2">
              <p><strong>{hi ? 'रणनीति:' : 'Strategy:'}</strong></p>
              <ul className="ml-4 list-disc space-y-1">
                <li>{hi ? 'हास्य + व्यंग्य = डर खत्म (सत्ता को हँसी का निशाना बनाओ)' : 'Humor + satire = fear removed (make power a target of laughter)'}</li>
                <li>{hi ? 'विकेंद्रित: कोई एक नेता नहीं = कोई एक गिरफ्तारी आंदोलन नहीं मारती' : 'Decentralized: no single leader = no single arrest kills movement'}</li>
                <li>{hi ? 'पिलर्स ऑफ सपोर्ट: पुलिस, सेना, बिजनेस — एक-एक करके तोड़ो' : 'Pillars of support: police, army, business — peel off one by one'}</li>
                <li>{hi ? 'चुनाव + सड़क = दोनों एक साथ' : 'Elections + streets = both simultaneously'}</li>
              </ul>
              <p><strong>{hi ? 'CJP समानता:' : 'CJP parallel:'}</strong> {hi ? 'CJP पहले से व्यंग्य + विकेंद्रित + हास्य = Otpor! मॉडल जैसा। अगला कदम: चुनावी खतरा।' : 'CJP already uses satire + decentralized + humor = Otpor! model. Next step: electoral threat.'}</p>
            </div>
          </details>
        </div>
      </section>


      {/* MODULE 2: HOW THE STATE WORKS */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">{hi ? '2. राज्य कैसे काम करता है (अपने दुश्मन को जानो)' : '2. How the State Works (Know Your Opponent)'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'निर्णय कौन लेता है (वास्तव में):' : 'Who actually makes decisions:'}</strong>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li><strong>PM/CM:</strong> {hi ? 'दिशा तय करते हैं, लेकिन हर चीज़ को नियंत्रित नहीं करते' : 'Sets direction, doesn\'t control everything'}</li>
              <li><strong>{hi ? 'नौकरशाही (IAS/IPS):' : 'Bureaucracy (IAS/IPS):'}</strong> {hi ? 'असली लीवर। ये लागू करते हैं। RTI इन्हीं पर दबाव बनाता है।' : 'The real lever. They implement. RTI pressures THEM.'}</li>
              <li><strong>{hi ? 'न्यायपालिका:' : 'Judiciary:'}</strong> {hi ? 'PIL यहाँ जाती है। सुप्रीम कोर्ट सरकार को आदेश दे सकता है।' : 'PILs go here. Supreme Court can ORDER the government.'}</li>
              <li><strong>{hi ? 'मीडिया:' : 'Media:'}</strong> {hi ? 'ध्यान = दबाव। लेकिन अधिकांश capture हो चुका है। स्वतंत्र मीडिया ≠ TV।' : 'Attention = pressure. But most is captured. Independent media ≠ TV.'}</li>
            </ul>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'दबाव कहाँ काम करता है:' : 'Where pressure actually works:'}</strong>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>{hi ? '📊 चुनाव से पहले (6 महीने = सबसे प्रभावी समय)' : '📊 Before elections (6 months = most effective window)'}</li>
              <li>{hi ? '⚖️ अदालत आदेश (सरकार को मानना पड़ता है)' : '⚖️ Court orders (government MUST comply)'}</li>
              <li>{hi ? '💰 आर्थिक प्रभाव (हड़ताल, बॉयकॉट, सप्लाई चेन)' : '💰 Economic impact (strikes, boycotts, supply chains)'}</li>
              <li>{hi ? '🌍 अंतरराष्ट्रीय शर्मिंदगी (UN, foreign media, diaspora)' : '🌍 International embarrassment (UN, foreign media, diaspora)'}</li>
              <li>{hi ? '📱 वायरल मीडिया (लेकिन केवल अगर संस्थागत दबाव के साथ हो)' : '📱 Viral media (but ONLY if paired with institutional pressure)'}</li>
            </ul>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded border border-[var(--color-accent)]">
            <strong>{hi ? '⚡ सबसे ज़रूरी सबक:' : '⚡ Most important lesson:'}</strong>
            <p className="mt-2 font-bold">{hi ? 'सोशल मीडिया वायरलिटी ≠ शक्ति। 1 करोड़ लाइक < 1 PIL + 10 RTI + 1 चुनावी खतरा।' : 'Social media virality ≠ power. 10M likes < 1 PIL + 10 RTIs + 1 electoral threat.'}</p>
            <p className="mt-1">{hi ? 'Pothole इसीलिए बना: वायरलिटी को संस्थागत दबाव में बदलना।' : 'That\'s why Pothole exists: converting virality into institutional pressure.'}</p>
          </div>
        </div>
      </section>

      {/* MODULE 3: GETTING POWER IN THE SYSTEM */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">{hi ? '3. व्यवस्था में शक्ति कैसे पाएँ' : '3. How to Get Power in the System'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-4 bg-[var(--color-surface-alt)] rounded border-l-4 border-[var(--color-lime)]">
            <strong>{hi ? 'स्तर 1: वार्ड कमेटी (अभी, कोई चुनाव नहीं)' : 'Level 1: Ward Committee (NOW, no election needed)'}</strong>
            <p className="mt-1">{hi ? '74वाँ संशोधन कहता है: हर वार्ड में कमेटी हो। बैठक में जाएँ, शामिल होने की माँग करें, बजट चर्चा में हिस्सा लें।' : '74th Amendment mandates ward committees. Attend meetings, demand inclusion, participate in budget discussions.'}</p>
            <p className="mt-1 font-bold">{hi ? 'शक्ति: स्थानीय बजट (₹1-5 करोड़/साल) पर प्रभाव।' : 'Power: influence over local budget (₹1-5 crore/year).'}</p>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded border-l-4 border-[var(--color-yellow)]">
            <strong>{hi ? 'स्तर 2: नगर पार्षद (1-2 साल)' : 'Level 2: Municipal Councillor (1-2 years)'}</strong>
            <p className="mt-1">{hi ? '5,000-10,000 मतदाताओं को संगठित करें। स्थानीय सेवा + मुद्दा = जीत। सबसे कम बाधा।' : 'Organize 5,000-10,000 voters. Local service + issue = win. Lowest barrier to entry.'}</p>
            <p className="mt-1 font-bold">{hi ? 'शक्ति: सड़क, पानी, सफाई, बिजली पर सीधा नियंत्रण।' : 'Power: direct control over roads, water, sanitation, electricity.'}</p>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded border-l-4 border-[var(--color-accent)]">
            <strong>{hi ? 'स्तर 3: विधायक (3-5 साल)' : 'Level 3: MLA (3-5 years)'}</strong>
            <p className="mt-1">{hi ? 'नगरपालिका आधार से राज्य स्तर। शिक्षा, पुलिस, स्वास्थ्य — सब राज्य विषय।' : 'Build from municipal base to state level. Education, police, health — all state subjects.'}</p>
            <p className="mt-1 font-bold">{hi ? 'शक्ति: कानून बनाना, पुलिस निगरानी, बजट आवंटन।' : 'Power: make laws, police oversight, budget allocation.'}</p>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded border-l-4 border-[var(--color-accent-2)]">
            <strong>{hi ? 'स्तर 4: नीति प्रभाव (समानांतर ट्रैक)' : 'Level 4: Policy Influence (parallel track)'}</strong>
            <p className="mt-1">{hi ? 'चुनाव जीते बिना भी: RTI डेटा → रिपोर्ट → मीडिया → संसदीय समिति → कानून बदलो।' : 'Without winning elections: RTI data → report → media → parliamentary committee → change law.'}</p>
            <p className="mt-1 font-bold">{hi ? 'शक्ति: नीति आकार देना। ADR, Praja Foundation ऐसे ही करते हैं।' : 'Power: shape policy. ADR, Praja Foundation do exactly this.'}</p>
          </div>
        </div>
      </section>

      {/* MODULE 4: WHEN STATE WON'T BUDGE */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">{hi ? '4. जब व्यवस्था नहीं हिलती' : '4. When the System Won\'t Budge'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'एस्केलेशन सीढ़ी (नीचे से ऊपर):' : 'Escalation ladder (bottom to top):'}</strong>
            <ol className="mt-2 list-decimal list-inside space-y-2">
              <li><strong>{hi ? 'कानूनी दबाव:' : 'Legal pressure:'}</strong> RTI → CIC (₹250/दिन) → PIL → {hi ? 'सुप्रीम कोर्ट' : 'Supreme Court'}</li>
              <li><strong>{hi ? 'राजनीतिक दबाव:' : 'Political pressure:'}</strong> {hi ? 'गठबंधन → चुनावी खतरा → "अगले चुनाव में याद रखेंगे"' : 'Coalition → electoral threat → "we\'ll remember next election"'}</li>
              <li><strong>{hi ? 'आर्थिक दबाव:' : 'Economic pressure:'}</strong> {hi ? 'बॉयकॉट, हड़ताल, सप्लाई चेन बाधा (कानूनी सीमा में)' : 'Boycotts, strikes, supply chain disruption (within legal limits)'}</li>
              <li><strong>{hi ? 'अंतरराष्ट्रीय दबाव:' : 'International pressure:'}</strong> {hi ? 'UN मानवाधिकार, विदेशी मीडिया, diaspora campaigns' : 'UN human rights, foreign media, diaspora campaigns'}</li>
              <li><strong>{hi ? 'सविनय अवज्ञा:' : 'Civil disobedience:'}</strong> {hi ? 'सिद्धांतबद्ध कानून-तोड़ (गांधी मॉडल) — गिरफ्तारी का जोखिम, लेकिन नैतिक शक्ति' : 'Principled law-breaking (Gandhi model) — arrest risk, but moral power'}</li>
              <li><strong>{hi ? 'आम हड़ताल:' : 'General strike:'}</strong> {hi ? 'परमाणु विकल्प। पूरा शहर/राज्य ठप। अंतिम उपाय।' : 'Nuclear option. Entire city/state shutdown. Last resort.'}</li>
            </ol>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded border border-[var(--color-red)]">
            <strong>{hi ? '⚠️ ज़रूरी अस्वीकरण:' : '⚠️ Essential disclaimer:'}</strong>
            <p className="mt-1">{hi ? 'Pothole शांतिपूर्ण, कानूनी, संस्थागत उपकरण प्रदान करता है। हिंसा, संपत्ति विनाश, या सशस्त्र प्रतिरोध इस प्लेटफॉर्म का हिस्सा नहीं है और कभी नहीं होगा। शांतिपूर्ण प्रतिरोध अधिक प्रभावी भी है (Chenoweth & Stephan research: अहिंसक आंदोलन 53% सफल, हिंसक केवल 26%)।' : 'Pothole provides peaceful, legal, institutional tools. Violence, property destruction, or armed resistance is not and will never be part of this platform. Peaceful resistance is also more effective (Chenoweth & Stephan research: nonviolent movements succeed 53% of the time, violent only 26%).'}</p>
          </div>
        </div>
      </section>

      {/* MODULE 5: TRAPS TO AVOID */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">{hi ? '5. जाल जिनसे बचें (आलोचनात्मक सोच)' : '5. Traps to Avoid (Critical Thinking)'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '🎭 सह-चयन (Co-optation):' : '🎭 Co-optation:'}</strong>
            <p>{hi ? 'जब कोई पार्टी आपकी माँग अपना लेती है = आपका आंदोलन मर जाता है। "हम करेंगे" ≠ किया। माँग-केंद्रित रहें, व्यक्ति/पार्टी-केंद्रित नहीं।' : 'When a party adopts your demand = your movement dies. "We will do it" ≠ done. Stay demand-focused, not person/party-focused.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '🕵️ एजेंट प्रोवोकेटर:' : '🕵️ Agent Provocateurs:'}</strong>
            <p>{hi ? 'सरकार लोग भेजती है जो हिंसा भड़काएँ → फिर "देखो, ये हिंसक हैं" कहें। पहचान: अज्ञात, पत्थर फेंकने को उकसाए, चेहरा छुपाए, भीड़ के किनारे।' : 'Govt sends people to incite violence → then says "see, they\'re violent." Signs: unknown, urges stone-throwing, hidden face, at edges of crowd.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '📱 सोशल मीडिया जाल:' : '📱 Social Media Trap:'}</strong>
            <p>{hi ? 'वायरलिटी = ताकत नहीं। 1 करोड़ रील्स < 10 RTI। ऑनलाइन गुस्सा ← ऑफलाइन संगठन। Pothole इसलिए बना: ऑनलाइन → ऑफलाइन → संस्थागत।' : 'Virality ≠ power. 10M reels < 10 RTIs. Online anger must become offline organization. Pothole exists for this: online → offline → institutional.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '🔥 बर्नआउट:' : '🔥 Burnout:'}</strong>
            <p>{hi ? 'आंदोलन हारते नहीं — वे थक जाते हैं। भूमिकाएँ बदलें। आराम = कमज़ोरी नहीं। छोटी जीतें मनाएँ।' : 'Movements don\'t lose — they get tired. Rotate roles. Rest ≠ weakness. Celebrate small wins.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? '👑 व्यक्तिवाद:' : '👑 Personality Cult:'}</strong>
            <p>{hi ? 'अगर आंदोलन एक व्यक्ति पर टिका है → उसे गिरफ्तार करो और आंदोलन मर जाता है। समाधान: विकेंद्रित, कोई अपरिहार्य नहीं, माँग > नेता।' : 'If movement depends on one person → arrest them and movement dies. Solution: decentralized, nobody indispensable, demand > leader.'}</p>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/start" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'एक्शन प्लान →' : 'ACTION PLAN →'}</Link>
        <Link href="/playbook" className="brutal-btn brutal-btn-lg text-center">{hi ? 'एस्केलेशन प्लेबुक →' : 'ESCALATION →'}</Link>
        <Link href="/groups" className="brutal-btn brutal-btn-lg text-center">{hi ? 'ग्रुप खोजें →' : 'FIND GROUPS →'}</Link>
      </div>
    </div>
  );
}
