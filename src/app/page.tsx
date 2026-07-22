import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';
  return (
    <div>
      {/* HERO */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="page-shell home-hero-inner">
          <p className="eyebrow">{hi ? 'नागरिक समन्वय बुनियादी ढाँचा' : 'Civic Coordination Infrastructure'}</p>
          <h1 id="home-title" className="home-title">
            {hi ? 'विरोध को शक्ति में बदलो।\nशक्ति को बदलाव में।' : 'Turn protest into power.\nPower into change.'}
          </h1>
          <p className="home-intro">
            {hi
              ? 'संगठित हों। सुरक्षित रहें। माँगें दर्ज करें। संस्थाओं को जवाबदेह बनाएँ। — गोपनीय, ऑफलाइन-सक्षम, सेंसरशिप-प्रतिरोधी।'
              : 'Organize. Stay safe. Document demands. Hold institutions accountable. — Private, offline-capable, censorship-resistant.'}
          </p>
          <div className="home-hero-actions">
            <Link href="/create-post" className="brutal-btn brutal-btn-primary brutal-btn-lg">{hi ? 'मदद पाएँ या दें' : 'Get or Give Help'}</Link>
            <Link href="/playbook" className="brutal-btn brutal-btn-lg">{hi ? 'विरोध → शक्ति गाइड' : 'Protest → Power Guide'}</Link>
          </div>
        </div>
      </section>

      {/* WHAT THIS IS */}
      <section className="page-shell section-block" aria-labelledby="what-title">
        <h2 id="what-title" className="section-title">{hi ? 'यह क्या है' : 'What This Is'}</h2>
        <div className="manifesto-grid">
          <div className="manifesto-point">
            <span className="manifesto-icon" aria-hidden="true">&#9632;</span>
            <div>
              <h3>{hi ? 'असली उपकरण, सिर्फ गाइड नहीं' : 'Real tools, not just guides'}</h3>
              <p>{hi ? 'RTI जनरेटर, FIR असिस्टेंट, एन्क्रिप्टेड ग्रुप, एविडेंस वॉल्ट, डिमांड ट्रैकर — सब कुछ यहीं करें।' : 'RTI generator, FIR assistant, encrypted groups, evidence vault, demand tracker — do everything right here.'}</p>
            </div>
          </div>
          <div className="manifesto-point">
            <span className="manifesto-icon" aria-hidden="true">&#9632;</span>
            <div>
              <h3>{hi ? 'गोपनीयता-प्रथम, बंद नहीं हो सकता' : 'Privacy-first, unbannable'}</h3>
              <p>{hi ? 'कोई अकाउंट नहीं। क्लाइंट-साइड एन्क्रिप्शन। ऑफलाइन काम करता है। IPFS मिरर। कोई एक बिंदु विफलता नहीं।' : 'No accounts needed. Client-side encryption. Works offline. IPFS mirrors. No single point of failure.'}</p>
            </div>
          </div>
          <div className="manifesto-point">
            <span className="manifesto-icon" aria-hidden="true">&#9632;</span>
            <div>
              <h3>{hi ? 'नतीजे, हैशटैग नहीं' : 'Outcomes, not hashtags'}</h3>
              <p>{hi ? 'हर उपकरण एक संस्थागत कार्रवाई की ओर इशारा करता है — RTI, FIR, PIL, जनप्रतिनिधि को पत्र, सार्वजनिक माँग।' : 'Every tool points toward an institutional action — RTI, FIR, PIL, letter to representative, public demand.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ALL FEATURES — THE PLATFORM */}
      <section className="page-shell section-block" aria-labelledby="features-title">
        <h2 id="features-title" className="section-title">{hi ? 'मंच की सुविधाएँ' : 'Platform Features'}</h2>
        <div className="feature-grid">
          <article className="feature-card feature-card-highlight">
            <div className="feature-icon">&#128274;</div>
            <h3>{hi ? 'एन्क्रिप्टेड ग्रुप समन्वय' : 'Encrypted Group Coordination'}</h3>
            <p>{hi ? 'ग्रुप बनाएँ, रियल-टाइम संदेश भेजें, भूमिकाएँ बाँटें, कार्य सौंपें — सब कुछ एंड-टू-एंड एन्क्रिप्टेड। सर्वर कुछ नहीं पढ़ सकता।' : 'Create groups, send real-time messages, assign roles, delegate tasks — everything end-to-end encrypted. Server cannot read anything.'}</p>
            <Link href="/groups" className="feature-link">{hi ? 'ग्रुप शुरू करें' : 'Start a group'} →</Link>
          </article>
          <article className="feature-card">
            <div className="feature-icon">&#128196;</div>
            <h3>{hi ? 'RTI जनरेटर' : 'RTI Generator'}</h3>
            <p>{hi ? 'फॉर्म भरें → कानूनी रूप से सही RTI आवेदन PDF तैयार। विभाग पता ऑटो-भरा। 30 दिन टाइमर। अपील जनरेटर।' : 'Fill a form → legally correct RTI application PDF generated. Department address auto-filled. 30-day timer. Appeal generator.'}</p>
            <Link href="/rti" className="feature-link">{hi ? 'RTI बनाएँ' : 'Generate RTI'} →</Link>
          </article>
          <article className="feature-card">
            <div className="feature-icon">&#128221;</div>
            <h3>{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</h3>
            <p>{hi ? 'स्टेप-बाय-स्टेप विज़ार्ड: क्या हुआ → कब → कहाँ → शिकायत तैयार। पुलिस मना करे तो SP को पत्र, फिर मजिस्ट्रेट शिकायत।' : 'Step-by-step wizard: what happened → when → where → complaint ready. If police refuse: letter to SP, then magistrate complaint.'}</p>
            <Link href="/fir" className="feature-link">{hi ? 'FIR बनाएँ' : 'File FIR'} →</Link>
          </article>
          <article className="feature-card">
            <div className="feature-icon">&#128200;</div>
            <h3>{hi ? 'डिमांड ट्रैकर' : 'Demand Tracker'}</h3>
            <p>{hi ? 'माँग बनाएँ, लक्ष्य संस्था तय करें, सबूत जोड़ें, समय-सीमा रखें। स्थिति ट्रैक करें: जमा → स्वीकृत → कार्रवाई → समाधान।' : 'Create demands, set target institution, attach evidence, set deadlines. Track status: Submitted → Acknowledged → Action → Resolved.'}</p>
            <Link href="/demands" className="feature-link">{hi ? 'माँग बनाएँ' : 'Create demand'} →</Link>
          </article>
          <article className="feature-card">
            <div className="feature-icon">&#128737;</div>
            <h3>{hi ? 'एविडेंस वॉल्ट' : 'Evidence Vault'}</h3>
            <p>{hi ? 'फोटो/वीडियो/दस्तावेज़ अपलोड करें — ब्राउज़र में एन्क्रिप्ट, फिर स्टोर। SHA-256 हैश छेड़छाड़-प्रमाण। सिर्फ आपकी चाबी से खुलेगा।' : 'Upload photos/videos/docs — encrypted in browser before storage. SHA-256 hash for tamper evidence. Only your passphrase opens it.'}</p>
            <Link href="/vault" className="feature-link">{hi ? 'सबूत सुरक्षित करें' : 'Secure evidence'} →</Link>
          </article>
          <article className="feature-card">
            <div className="feature-icon">&#128226;</div>
            <h3>{hi ? 'लाइव बोर्ड' : 'Live Coordination Board'}</h3>
            <p>{hi ? 'रियल-टाइम ज़रूरतें और प्रस्ताव। कानूनी सहायता, चिकित्सा, भोजन, परिवहन, आश्रय — अभी माँगें या दें। 72 घंटे में गायब।' : 'Real-time needs and offers. Legal, medical, food, transport, shelter — ask or give now. Disappears in 72 hours.'}</p>
            <Link href="/board" className="feature-link">{hi ? 'बोर्ड देखें' : 'View board'} →</Link>
          </article>
          <article className="feature-card">
            <div className="feature-icon">&#127963;</div>
            <h3>{hi ? 'जनप्रतिनिधि खोजें + पत्र लिखें' : 'Find Representatives + Write Letters'}</h3>
            <p>{hi ? 'अपने MLA, MP, नगर पार्षद खोजें। एक क्लिक में पत्र तैयार। पोस्टल पता, ईमेल, RTI अनुवर्ती — सब शामिल।' : 'Find your MLA, MP, municipal councillor. Generate a letter in one click. Postal address, email, RTI follow-up — all included.'}</p>
            <Link href="/representatives" className="feature-link">{hi ? 'प्रतिनिधि खोजें' : 'Find reps'} →</Link>
          </article>
          <article className="feature-card">
            <div className="feature-icon">&#128214;</div>
            <h3>{hi ? 'गाइड और प्लेबुक' : 'Guides & Playbook'}</h3>
            <p>{hi ? 'अधिकार गाइड, विरोध → शक्ति प्लेबुक, संगठन गाइड, सुरक्षित संचार, सूचना सत्यापन — सब कुछ ऑफलाइन उपलब्ध।' : 'Rights guide, protest→power playbook, organizing guide, secure comms, info verification — all available offline.'}</p>
            <Link href="/playbook" className="feature-link">{hi ? 'प्लेबुक' : 'Playbook'} →</Link>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS — ONBOARDING */}
      <section className="page-shell section-block section-block-alt" aria-labelledby="how-title">
        <h2 id="how-title" className="section-title">{hi ? 'कैसे काम करता है' : 'How It Works'}</h2>
        <ol className="steps-list">
          <li><strong>{hi ? 'कोई अकाउंट नहीं।' : 'No account needed.'}</strong><span>{hi ? 'कोई नाम, फोन, ईमेल या ID नहीं देना है। बस आएँ और शुरू करें।' : 'No name, phone, email, or ID required. Just arrive and start.'}</span></li>
          <li><strong>{hi ? 'एक छोटी स्पैम जाँच।' : 'A quick spam check.'}</strong><span>{hi ? 'आपके डिवाइस पर चलती है। 5 सेकंड। बॉट्स से बचाव।' : 'Runs on your device. 5 seconds. Keeps bots out.'}</span></li>
          <li><strong>{hi ? 'सब कुछ एन्क्रिप्टेड।' : 'Everything encrypted.'}</strong><span>{hi ? 'ग्रुप, सबूत, ड्राफ्ट — ब्राउज़र में एन्क्रिप्ट होते हैं। सर्वर सिर्फ अस्पष्ट डेटा देखता है।' : 'Groups, evidence, drafts — encrypted in your browser. Server only sees ciphertext.'}</span></li>
          <li><strong>{hi ? 'ऑफलाइन काम करता है।' : 'Works offline.'}</strong><span>{hi ? 'एक बार खोलें, कैश हो जाता है। इंटरनेट बंद हो जाए तो भी गाइड, टूल, टेम्पलेट उपलब्ध।' : 'Visit once, it is cached. Internet goes down? Guides, tools, templates still available.'}</span></li>
          <li><strong>{hi ? 'बंद नहीं हो सकता।' : 'Cannot be banned.'}</strong><span>{hi ? 'कई मिरर, IPFS पर पिन, ओपन सोर्स। एक साइट बंद हो — बाकी चालू।' : 'Multiple mirrors, pinned on IPFS, open source. One site goes down — others keep running.'}</span></li>
        </ol>
        <Link href="/guide" className="text-link">{hi ? 'विस्तृत उपयोग गाइड →' : 'Detailed usage guide →'}</Link>
      </section>

      {/* EMERGENCY CONTACTS */}
      <section className="page-shell section-block" aria-labelledby="emergency-title">
        <h2 id="emergency-title" className="section-title">{hi ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}</h2>
        <div className="emergency-grid">
          <div className="emergency-item"><span className="emergency-number">112</span><span>{hi ? 'एकीकृत आपातकालीन (पुलिस, एम्बुलेंस, फायर)' : 'Unified Emergency (Police, Ambulance, Fire)'}</span></div>
          <div className="emergency-item"><span className="emergency-number">100</span><span>{hi ? 'पुलिस' : 'Police'}</span></div>
          <div className="emergency-item"><span className="emergency-number">108</span><span>{hi ? 'एम्बुलेंस' : 'Ambulance'}</span></div>
          <div className="emergency-item"><span className="emergency-number">181</span><span>{hi ? 'महिला हेल्पलाइन 24/7' : 'Women Helpline 24/7'}</span></div>
          <div className="emergency-item"><span className="emergency-number">1098</span><span>{hi ? 'चाइल्डलाइन (18 से कम)' : 'Childline (Under 18)'}</span></div>
          <div className="emergency-item"><span className="emergency-number">1930</span><span>{hi ? 'साइबर अपराध' : 'Cyber Crime'}</span></div>
          <div className="emergency-item"><span className="emergency-number">14461</span><span>{hi ? 'वरिष्ठ नागरिक' : 'Senior Citizen'}</span></div>
          <div className="emergency-item"><span className="emergency-number">1800-599-0019</span><span>{hi ? 'किसान कॉल सेंटर' : 'Kisan Call Center'}</span></div>
        </div>
        <Link href="/resources" className="text-link">{hi ? 'सभी हेल्पलाइन, संगठन और संसाधन →' : 'All helplines, organizations & resources →'}</Link>
      </section>

      {/* THEORY OF CHANGE */}
      <section className="page-shell section-block section-block-alt" aria-labelledby="change-title">
        <h2 id="change-title" className="section-title">{hi ? 'विरोध से बदलाव तक' : 'From Protest to Change'}</h2>
        <div className="change-path">
          <div className="path-step"><span className="path-num">1</span><strong>{hi ? 'इकट्ठा हों' : 'Gather'}</strong><p>{hi ? 'सड़क, ऑनलाइन, ग्रुप' : 'Streets, online, groups'}</p></div>
          <div className="path-arrow" aria-hidden="true">→</div>
          <div className="path-step"><span className="path-num">2</span><strong>{hi ? 'दस्तावेज़' : 'Document'}</strong><p>{hi ? 'माँगें, सबूत, टाइमलाइन' : 'Demands, evidence, timeline'}</p></div>
          <div className="path-arrow" aria-hidden="true">→</div>
          <div className="path-step"><span className="path-num">3</span><strong>{hi ? 'दबाव' : 'Pressure'}</strong><p>{hi ? 'RTI, FIR, PIL, मीडिया' : 'RTI, FIR, PIL, media'}</p></div>
          <div className="path-arrow" aria-hidden="true">→</div>
          <div className="path-step"><span className="path-num">4</span><strong>{hi ? 'ट्रैक' : 'Track'}</strong><p>{hi ? 'प्रतिक्रिया, अपील, एस्केलेट' : 'Response, appeal, escalate'}</p></div>
          <div className="path-arrow" aria-hidden="true">→</div>
          <div className="path-step"><span className="path-num">5</span><strong>{hi ? 'बदलाव' : 'Change'}</strong><p>{hi ? 'नीति, व्यवस्था, जवाबदेही' : 'Policy, systems, accountability'}</p></div>
        </div>
        <p className="text-center mt-6 text-[var(--color-text-muted)]">
          {hi ? 'हर कदम के लिए उपकरण यहाँ मौजूद हैं।' : 'Tools for every step are here.'}
        </p>
        <div className="button-row" style={{ justifyContent: 'center', marginTop: '1rem' }}>
          <Link href="/playbook" className="brutal-btn brutal-btn-primary">{hi ? 'प्लेबुक शुरू करें' : 'Start the Playbook'}</Link>
          <Link href="/toolkit" className="brutal-btn">{hi ? 'टेम्पलेट' : 'Templates'}</Link>
          <Link href="/manifesto" className="brutal-btn">{hi ? 'घोषणापत्र' : 'Manifesto'}</Link>
        </div>
      </section>

      {/* SAFETY STRIP */}
      <section className="safety-strip" aria-labelledby="safety-title">
        <div className="page-shell safety-strip-inner">
          <div>
            <h2 id="safety-title" className="section-title">{hi ? 'तुरंत ज़रूरी अधिकार' : 'Rights You Need Right Now'}</h2>
          </div>
          <ul className="plain-list">
            <li><strong>{hi ? 'गिरफ्तारी पर:' : 'On arrest:'}</strong> {hi ? 'कारण जानने का अधिकार। वकील का अधिकार। 24 घंटे में मजिस्ट्रेट के सामने पेश होने का अधिकार।' : 'Right to know grounds. Right to a lawyer. Right to be produced before magistrate within 24 hours.'}</li>
            <li><strong>{hi ? 'फोन:' : 'Phone:'}</strong> {hi ? 'बायोमेट्रिक से अनलॉक करने के लिए बाध्य नहीं कर सकते। PIN से लॉक रखें।' : 'Cannot be compelled to unlock via biometrics. Keep PIN-locked.'}</li>
            <li><strong>{hi ? 'धारा 163 BNSS:' : 'Section 163 BNSS:'}</strong> {hi ? 'निषेधाज्ञा आदेश। शांतिपूर्ण व्यक्तिगत अभिव्यक्ति अभी भी संरक्षित हो सकती है। हाई कोर्ट में चुनौती संभव।' : 'Prohibitory orders. Peaceful individual expression may still be protected. Can be challenged in High Court.'}</li>
            <li><strong>{hi ? 'महिलाएँ:' : 'Women:'}</strong> {hi ? 'सूर्यास्त के बाद और सूर्योदय से पहले गिरफ्तार नहीं किया जा सकता (विशेष परिस्थितियों को छोड़कर)।' : 'Cannot be arrested after sunset and before sunrise (except exceptional circumstances).'}</li>
          </ul>
          <Link href="/safety" className="text-link">{hi ? 'पूरी अधिकार गाइड →' : 'Full rights guide →'}</Link>
        </div>
      </section>

      {/* EMERGENCY BANNER */}
      <aside className="emergency-note" aria-label={hi ? 'आपातकालीन सूचना' : 'Emergency notice'}>
        <div className="page-shell">
          <strong>{hi ? 'तुरंत खतरा है?' : 'In immediate danger?'}</strong>{' '}
          {hi ? '112 डायल करें अभी। इस साइट का इंतज़ार न करें।' : 'Dial 112 now. Do not wait for this site.'}
        </div>
      </aside>
    </div>
  );
}
