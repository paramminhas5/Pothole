import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import SituationBrief from '@/components/SituationBrief';
import ActionChain from '@/components/ActionChain';
import QuickAction from '@/components/QuickAction';

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO — What this is, in one breath
          ═══════════════════════════════════════════════════════════ */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="page-shell home-hero-inner">
          <p className="eyebrow">{hi ? 'नागरिक कार्रवाई का बुनियादी ढाँचा' : 'Civic Action Infrastructure'}</p>
          <h1 id="home-title" className="home-title">
            {hi
              ? 'गुस्से को संगठित ताकत में बदलो।'
              : 'Turn anger into organized power.'}
          </h1>
          <p className="home-intro">
            {hi
              ? 'अधिकार जानो। RTI दाखिल करो। माँगें ट्रैक करो। संस्थाओं को जवाबदेह बनाओ। अकेले नहीं — संगठित।'
              : 'Know your rights. File RTIs. Track demands. Hold institutions accountable. Not alone — organized.'}
          </p>
          <div className="button-row">
            <Link href="/expect" className="brutal-btn brutal-btn-primary home-primary-action">
              {hi ? 'विरोध की तैयारी करें →' : 'Prepare for Protest →'}
            </Link>
            <Link href="/safety" className="brutal-btn">
              {hi ? 'अधिकार कार्ड →' : 'Rights Card →'}
            </Link>
          </div>
          <p className="action-note">
            {hi
              ? 'अकाउंट नहीं चाहिए। फोन नंबर नहीं। ऑफलाइन काम करता है। प्रिंट कर सकते हैं।'
              : 'No account needed. No phone number. Works offline. Printable.'}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: WHAT'S HAPPENING RIGHT NOW
          ═══════════════════════════════════════════════════════════ */}
      <SituationBrief locale={locale} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: HOW TO HELP — Three paths
          ═══════════════════════════════════════════════════════════ */}
      <section className="home-choices" aria-labelledby="paths-title">
        <div className="page-shell">
          <h2 id="paths-title" className="section-title">
            {hi ? 'आप क्या कर सकते हैं' : 'What you can do'}
          </h2>
          <div className="choice-grid">
            <div className="choice-card choice-card-primary">
              <div className="choice-number">1</div>
              <h3>{hi ? 'जा रहे हैं' : "I'm going"}</h3>
              <p>{hi ? 'तैयारी, सुरक्षा, अधिकार, क्या उम्मीद करें, बडी सिस्टम।' : 'Preparation, safety, rights, what to expect, buddy system.'}</p>
              <Link href="/expect" className="choice-link">
                {hi ? 'तैयारी गाइड' : 'Preparation Guide'} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="choice-card">
              <div className="choice-number">2</div>
              <h3>{hi ? 'रिमोट से मदद' : 'Help remotely'}</h3>
              <p>{hi ? 'अनुवाद, शोध, डिज़ाइन, सोशल मीडिया, कानूनी, डेटा।' : 'Translation, research, design, social media, legal, data analysis.'}</p>
              <Link href="/contribute" className="choice-link">
                {hi ? 'योगदान बोर्ड' : 'Contribution Board'} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="choice-card">
              <div className="choice-number">3</div>
              <h3>{hi ? 'कानूनी दबाव बनाएँ' : 'Apply legal pressure'}</h3>
              <p>{hi ? 'RTI, FIR, PIL, प्रतिनिधि पत्र, CPGRAMS, एस्केलेशन।' : 'RTI, FIR, PIL, representative letter, CPGRAMS, escalation.'}</p>
              <Link href="/act" className="choice-link">
                {hi ? 'कानूनी हथियार' : 'Legal Weapons'} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: YOUR RIGHTS — Always one tap away
          ═══════════════════════════════════════════════════════════ */}
      <section className="safety-strip" aria-labelledby="rights-title">
        <div className="page-shell safety-strip-inner">
          <div>
            <h2 id="rights-title" className="section-title" style={{ color: '#0f0f0f' }}>
              {hi ? 'अगर पुलिस रोके' : 'If police stop you'}
            </h2>
            <ul className="plain-list">
              <li><strong>{hi ? '"कारण बताएँ।"' : '"Tell me the reason."'}</strong></li>
              <li><strong>{hi ? '"मुझे वकील चाहिए।"' : '"I want a lawyer."'}</strong></li>
              <li><strong>{hi ? '"परिवार को सूचित करें।"' : '"Inform my family."'}</strong></li>
              <li><strong>{hi ? '"फोन अनलॉक नहीं करूँगा/करूँगी।"' : '"I will not unlock my phone."'}</strong></li>
              <li><strong>{hi ? '"बिना वकील कोई बयान नहीं।"' : '"No statement without my lawyer."'}</strong></li>
            </ul>
            <Link href="/safety" className="text-link" style={{ color: '#0f0f0f' }}>
              {hi ? 'पूरा अधिकार कार्ड (प्रिंट करें) →' : 'Full Rights Card (print it) →'}
            </Link>
          </div>
          <div>
            <p style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '12px' }}>
              {hi ? 'आपातकालीन नंबर' : 'Emergency Numbers'}
            </p>
            <div style={{ display: 'grid', gap: '8px' }}>
              <span><strong>112</strong> — {hi ? 'एकीकृत आपातकालीन' : 'Unified Emergency'}</span>
              <span><strong>1516</strong> — {hi ? 'मुफ्त वकील (दिल्ली)' : 'Free Lawyer (Delhi)'}</span>
              <span><strong>181</strong> — {hi ? 'महिला हेल्पलाइन' : 'Women Helpline'}</span>
              <span><strong>108</strong> — {hi ? 'एम्बुलेंस' : 'Ambulance'}</span>
            </div>
            <Link href="/resources" className="text-link" style={{ color: '#0f0f0f', marginTop: '16px' }}>
              {hi ? 'सभी संसाधन + हेल्पलाइन →' : 'All Resources + Helplines →'}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: HOW POTHOLE WORKS — Feature chain as story
          ═══════════════════════════════════════════════════════════ */}
      <ActionChain locale={locale} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: 5-MINUTE ONBOARDING
          ═══════════════════════════════════════════════════════════ */}
      <QuickAction locale={locale} />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: WHAT'S LIVE vs. WHAT'S COMING
          ═══════════════════════════════════════════════════════════ */}
      <section className="how-it-works" aria-labelledby="status-title">
        <div className="page-shell">
          <h2 id="status-title" className="section-title">
            {hi ? 'प्लेटफॉर्म की स्थिति' : 'Platform Status'}
          </h2>
          <p style={{ maxWidth: '680px', marginBottom: '28px', color: 'var(--color-text-muted)' }}>
            {hi
              ? 'Sahayata अभी निजी प्रोटोटाइप है। कुछ सुविधाएँ पूरी तरह काम करती हैं, कुछ सुरक्षा समीक्षा के बाद चालू होंगी। हम पारदर्शी हैं।'
              : 'Sahayata is currently a private prototype. Some features are fully functional, others will activate after security review. We are transparent about this.'}
          </p>

          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {/* LIVE NOW */}
            <div className="brutal-card" style={{ borderTop: '6px solid var(--color-lime)' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 800 }}>
                {hi ? '✓ अभी काम करता है' : '✓ Live Now'}
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 1.2rem', fontSize: '0.9rem', lineHeight: 2 }}>
                <li>{hi ? 'अधिकार कार्ड + सुरक्षा गाइड' : 'Rights Card + Safety Guide'}</li>
                <li>{hi ? 'RTI जनरेटर (ऑफलाइन)' : 'RTI Generator (offline)'}</li>
                <li>{hi ? 'FIR असिस्टेंट (ऑफलाइन)' : 'FIR Assistant (offline)'}</li>
                <li>{hi ? 'संसाधन + हेल्पलाइन' : 'Resources + Helplines'}</li>
                <li>{hi ? 'प्लेबुक (विरोध → शक्ति)' : 'Playbook (Protest → Power)'}</li>
                <li>{hi ? 'लाइव अभियान मैप' : 'Live Campaign Map'}</li>
                <li>{hi ? 'शासन ट्रैकर + स्कोरकार्ड' : 'Governance Tracker + Scorecard'}</li>
                <li>{hi ? 'माँग ट्रैकर' : 'Demand Tracker'}</li>
                <li>{hi ? 'योगदान बोर्ड' : 'Contribution Board'}</li>
                <li>{hi ? 'ग्रुप डायरेक्टरी (ब्राउज़)' : 'Group Directory (browse)'}</li>
              </ul>
            </div>

            {/* COMING AFTER SECURITY REVIEW */}
            <div className="brutal-card" style={{ borderTop: '6px solid var(--color-yellow)' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 800 }}>
                {hi ? '⏳ सुरक्षा समीक्षा के बाद' : '⏳ After Security Review'}
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 1.2rem', fontSize: '0.9rem', lineHeight: 2 }}>
                <li>{hi ? 'ज़रूरत/प्रस्ताव बोर्ड (पोस्ट)' : 'Needs/Offers Board (posts)'}</li>
                <li>{hi ? 'ग्रुप बनाना + सदस्यता' : 'Group creation + membership'}</li>
                <li>{hi ? 'रियलटाइम अलर्ट + पुश' : 'Realtime Alerts + Push'}</li>
                <li>{hi ? 'एन्क्रिप्टेड मैसेजिंग' : 'Encrypted Messaging'}</li>
                <li>{hi ? 'SMS अलर्ट (2G बैकअप)' : 'SMS Alerts (2G backup)'}</li>
                <li>{hi ? 'डायरेक्टरी सबमिशन' : 'Directory submissions'}</li>
              </ul>
              <p style={{ margin: '12px 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {hi
                  ? 'क्यों: सुरक्षा ऑडिट पूरा होने तक ये सुविधाएँ उपयोगकर्ताओं को जोखिम में डाल सकती हैं।'
                  : 'Why: These features could put users at risk until security audit is complete.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EMERGENCY FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <aside className="emergency-note" aria-label={hi ? 'आपातकालीन' : 'Emergency'}>
        <div className="page-shell">
          <strong>{hi ? 'तुरंत खतरा?' : 'Immediate danger?'}</strong>{' '}
          {hi ? '112 डायल करें। इस साइट का इंतज़ार न करें।' : 'Dial 112. Do not wait for this site.'}
        </div>
      </aside>
    </div>
  );
}
