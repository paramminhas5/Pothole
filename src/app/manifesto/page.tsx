import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function ManifestoPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">
          {hi ? 'घोषणापत्र: यह मंच क्यों मायने रखता है' : 'Manifesto: Why This Platform Matters'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {hi ? 'विरोध शुरुआत है। बुनियादी ढाँचा ही असली ताकत है।' : 'Protest is the beginning. Infrastructure is the real power.'}
        </p>
      </div>


      {/* THE PROBLEM */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'समस्या' : 'The Problem'}</h2>
        <p className="text-sm leading-relaxed mb-4">
          {hi ? 'भारत में विरोध प्रदर्शन होते हैं। ऊर्जा उमड़ती है। फिर क्या होता है? ज़्यादातर बार — कुछ नहीं। ऊर्जा बिखर जाती है क्योंकि:' : 'Protests happen in India. Energy surges. Then what? Most of the time — nothing. Energy dissipates because:'}
        </p>
        <ul className="space-y-2 text-sm mb-4">
          <li>→ {hi ? 'माँगें स्पष्ट नहीं होतीं — "जवाबदेही" एक भावना है, माँग नहीं।' : 'Demands are not specific — "accountability" is a feeling, not a demand.'}</li>
          <li>→ {hi ? 'कोई संस्थागत दबाव का रास्ता नहीं — RTI, FIR, PIL किसी को करनी नहीं आती।' : 'No institutional pressure pathway — nobody knows how to file RTI, FIR, PIL.'}</li>
          <li>→ {hi ? 'कोई अनुवर्ती ढाँचा नहीं — 30 दिन बाद कोई नहीं पूछता "क्या हुआ?"' : 'No follow-up structure — 30 days later nobody asks "what happened?"'}</li>
          <li>→ {hi ? 'सुरक्षित समन्वय के उपकरण नहीं — WhatsApp ग्रुप Meta को दिखता है।' : 'No safe coordination tools — WhatsApp groups are visible to Meta.'}</li>
          <li>→ {hi ? 'सबूत खो जाते हैं — फोन ज़ब्त, वीडियो डिलीट, गवाह डरे हुए।' : 'Evidence gets lost — phone seized, video deleted, witnesses scared.'}</li>
        </ul>
        <p className="text-sm font-bold">
          {hi ? 'Sahayata इन सब समस्याओं का समाधान है।' : 'Sahayata solves all of these problems.'}
        </p>
      </section>


      {/* WHAT ACTUALLY WORKS — HISTORY */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'इतिहास से सबक — क्या काम करता है' : 'Lessons From History — What Actually Works'}</h2>
        <div className="space-y-4 text-sm">
          <div className="p-3 border-l-4 border-[var(--color-primary)]">
            <strong>JP Movement → Janata Government (1977)</strong>
            <p className="mt-1">{hi ? 'जयप्रकाश नारायण ने स्पष्ट माँग (इंदिरा का इस्तीफा) + संगठित गठबंधन + निरंतर दबाव = सरकार गिरी।' : 'Jayaprakash Narayan: clear demand (Indira resign) + organized coalition + sustained pressure = government fell.'}</p>
          </div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]">
            <strong>Anna Hazare → Lokpal Act (2013)</strong>
            <p className="mt-1">{hi ? 'एक स्पष्ट विधेयक + जनसमर्थन + संसदीय दबाव = कानून बना।' : 'One specific bill + public support + parliamentary pressure = law passed.'}</p>
          </div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]">
            <strong>Nirbhaya → Criminal Law Amendment (2013)</strong>
            <p className="mt-1">{hi ? 'व्यापक जनाक्रोश + वर्मा समिति + स्पष्ट कानूनी सुधार माँग = कानून बदला।' : 'Massive public outrage + Verma Committee + specific legal reform demands = law changed.'}</p>
          </div>
          <div className="p-3 border-l-4 border-[var(--color-primary)]">
            <strong>Farm Protests → Repeal of Farm Laws (2021)</strong>
            <p className="mt-1">{hi ? '13 महीने निरंतर + स्पष्ट माँग (तीन कानून रद्द) + संगठित ढाँचा + कानूनी लड़ाई = कानून वापस।' : '13 months sustained + specific demand (repeal 3 laws) + organized structure + legal battles = laws repealed.'}</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-[var(--color-surface-alt)] rounded">
          <strong>{hi ? 'सबमें क्या समान था:' : 'What they all had in common:'}</strong>
          <ol className="mt-2 space-y-1 text-sm list-decimal list-inside">
            <li>{hi ? 'एक स्पष्ट, मापने योग्य माँग' : 'One clear, measurable demand'}</li>
            <li>{hi ? 'निरंतर, संगठित दबाव' : 'Sustained, organized pressure'}</li>
            <li>{hi ? 'संस्थागत रास्ते (कानूनी, संसदीय, मीडिया)' : 'Institutional pathways (legal, parliamentary, media)'}</li>
            <li>{hi ? 'दस्तावेज़ीकरण और सबूत' : 'Documentation and evidence'}</li>
            <li>{hi ? 'गठबंधन निर्माण' : 'Coalition building'}</li>
          </ol>
        </div>
      </section>


      {/* WHAT SAHAYATA PROVIDES */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'Sahayata क्या देता है' : 'What Sahayata Provides'}</h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3 items-start">
            <span className="text-lg">&#128274;</span>
            <div><strong>{hi ? 'एन्क्रिप्टेड ग्रुप समन्वय' : 'Encrypted Group Coordination'}</strong><p>{hi ? 'रियल-टाइम मैसेजिंग, भूमिकाएँ, कार्य — सर्वर कुछ नहीं पढ़ सकता। AES-256-GCM एन्क्रिप्शन।' : 'Real-time messaging, roles, tasks — server cannot read anything. AES-256-GCM encryption.'}</p></div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg">&#128196;</span>
            <div><strong>{hi ? 'RTI जनरेटर' : 'RTI Generator'}</strong><p>{hi ? 'फॉर्म भरें → कानूनी RTI PDF तैयार। 30-दिन टाइमर। अपील जनरेटर। सब ब्राउज़र में, कुछ भी सर्वर को नहीं भेजा।' : 'Fill form → legal RTI PDF ready. 30-day timer. Appeal generator. All in browser, nothing sent to server.'}</p></div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg">&#128221;</span>
            <div><strong>{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</strong><p>{hi ? 'गाइडेड विज़ार्ड → शिकायत तैयार। पुलिस मना करे → SP पत्र → मजिस्ट्रेट शिकायत। पूरा एस्केलेशन पथ।' : 'Guided wizard → complaint ready. Police refuse → SP letter → magistrate complaint. Full escalation path.'}</p></div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg">&#128200;</span>
            <div><strong>{hi ? 'डिमांड ट्रैकर' : 'Demand Tracker'}</strong><p>{hi ? 'माँग → लक्ष्य → समय-सीमा → ट्रैक। जमा → स्वीकृत → कार्रवाई → समाधान। सार्वजनिक स्कोरकार्ड।' : 'Demand → target → deadline → track. Submitted → Acknowledged → Action → Resolved. Public scorecard.'}</p></div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg">&#128737;</span>
            <div><strong>{hi ? 'एविडेंस वॉल्ट' : 'Evidence Vault'}</strong><p>{hi ? 'फोटो/वीडियो एन्क्रिप्ट → स्टोर → SHA-256 हैश। छेड़छाड़-प्रमाण। कोर्ट-योग्य चेन ऑफ कस्टडी।' : 'Photos/videos encrypted → stored → SHA-256 hash. Tamper-proof. Court-ready chain of custody.'}</p></div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg">&#128226;</span>
            <div><strong>{hi ? 'लाइव बोर्ड' : 'Live Coordination Board'}</strong><p>{hi ? 'रियल-टाइम ज़रूरतें और प्रस्ताव। कानूनी, चिकित्सा, भोजन, परिवहन। 72 घंटे में गायब। गोपनीय।' : 'Real-time needs and offers. Legal, medical, food, transport. Disappears in 72h. Private.'}</p></div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg">&#127963;</span>
            <div><strong>{hi ? 'जनप्रतिनिधि + पत्र जनरेटर' : 'Representatives + Letter Generator'}</strong><p>{hi ? 'MLA/MP/पार्षद खोजें → एक क्लिक में पत्र तैयार → RTI अनुवर्ती।' : 'Find MLA/MP/councillor → generate letter in one click → RTI follow-up.'}</p></div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg">&#128214;</span>
            <div><strong>{hi ? 'गाइड और प्लेबुक' : 'Guides & Playbook'}</strong><p>{hi ? 'अधिकार, RTI, FIR, PIL, मीडिया, गठबंधन, एस्केलेशन — सब ऑफलाइन उपलब्ध।' : 'Rights, RTI, FIR, PIL, media, coalitions, escalation — all available offline.'}</p></div>
          </div>
        </div>
      </section>


      {/* WHY IT CANNOT BE BANNED */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'यह बंद क्यों नहीं हो सकता' : 'Why This Cannot Be Banned'}</h2>
        <div className="space-y-2 text-sm">
          <p>→ <strong>{hi ? 'कई मिरर:' : 'Multiple mirrors:'}</strong> {hi ? 'Vercel + Netlify + Cloudflare + IPFS। एक बंद हो, बाकी चालू।' : 'Vercel + Netlify + Cloudflare + IPFS. One goes down, others keep running.'}</p>
          <p>→ <strong>{hi ? 'IPFS पिनिंग:' : 'IPFS pinning:'}</strong> {hi ? 'कंटेंट-एड्रेस्ड। जिसके पास हैश है, वह एक्सेस कर सकता है। हमेशा।' : 'Content-addressed. Anyone with the hash can access it. Forever.'}</p>
          <p>→ <strong>{hi ? 'ऑफलाइन-फर्स्ट:' : 'Offline-first:'}</strong> {hi ? 'एक बार खोलें → सर्विस वर्कर कैश। इंटरनेट बंद हो जाए तो भी काम करता है।' : 'Visit once → service worker caches. Works even if internet goes down.'}</p>
          <p>→ <strong>{hi ? 'ओपन सोर्स:' : 'Open source:'}</strong> {hi ? 'कोड सार्वजनिक। कोई भी फोर्क कर मिनटों में नई साइट बना सकता है।' : 'Code is public. Anyone can fork and deploy a new instance in minutes.'}</p>
          <p>→ <strong>{hi ? 'क्लाइंट-साइड एन्क्रिप्शन:' : 'Client-side encryption:'}</strong> {hi ? 'सर्वर ज़ब्त हो जाए तो भी डेटा अपठनीय।' : 'Even if server is seized, data is unreadable.'}</p>
          <p>→ <strong>{hi ? 'कोई एकल विफलता बिंदु नहीं:' : 'No single point of failure:'}</strong> {hi ? 'Supabase रियल-टाइम के लिए है, पर ऐप इसके बिना भी काम करता है।' : 'Supabase is for real-time, but app works without it too.'}</p>
        </div>
      </section>

      {/* PRIVACY MODEL */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'गोपनीयता मॉडल' : 'Privacy Model'}</h2>
        <div className="space-y-2 text-sm">
          <p>→ {hi ? 'कोई अकाउंट नहीं — सेशन-आधारित छद्मनामी पहचान' : 'No accounts — session-based pseudonymous identity'}</p>
          <p>→ {hi ? 'ग्रुप मैसेज: ब्राउज़र में AES-256-GCM एन्क्रिप्ट → सर्वर को सिफरटेक्स्ट मिलता है' : 'Group messages: AES-256-GCM encrypted in browser → server gets ciphertext'}</p>
          <p>→ {hi ? 'एविडेंस वॉल्ट: आपकी चाबी (पासफ़्रेज़) के बिना कोई नहीं खोल सकता' : 'Evidence vault: nobody can open without your passphrase'}</p>
          <p>→ {hi ? 'रियल-टाइम मैसेज: एफ़ेमरल (डेटाबेस में स्टोर नहीं होते)' : 'Real-time messages: ephemeral (not stored in database)'}</p>
          <p>→ {hi ? 'पोस्ट: 72 घंटे में ऑटो-एक्सपायर' : 'Posts: auto-expire in 72 hours'}</p>
          <p>→ {hi ? 'कोई ट्रैकिंग, कोई एनालिटिक्स, कोई फिंगरप्रिंटिंग' : 'No tracking, no analytics, no fingerprinting'}</p>
          <p>→ {hi ? 'स्थान: शहर + क्षेत्र (GPS कोऑर्डिनेट नहीं)' : 'Location: city + area (no GPS coordinates)'}</p>
          <p>→ {hi ? 'RTI/FIR ड्राफ्ट: IndexedDB में लोकल — सर्वर को कभी नहीं भेजे जाते' : 'RTI/FIR drafts: local in IndexedDB — never sent to server'}</p>
        </div>
      </section>


      {/* THEORY OF CHANGE */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'परिवर्तन का सिद्धांत' : 'Theory of Change'}</h2>
        <p className="text-sm mb-4">{hi ? 'हर सफल आंदोलन एक ही ढाँचे का पालन करता है:' : 'Every successful movement follows the same framework:'}</p>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li><strong>{hi ? 'इकट्ठा हों' : 'Gather'}</strong> — {hi ? 'सड़कों पर, ऑनलाइन, ग्रुप में। लोगों को एक जगह लाएँ।' : 'On streets, online, in groups. Bring people together.'}</li>
          <li><strong>{hi ? 'दस्तावेज़ बनाएँ' : 'Document'}</strong> — {hi ? 'एक स्पष्ट माँग लिखें। सबूत जमा करें। टाइमलाइन बनाएँ।' : 'Write one clear demand. Collect evidence. Build a timeline.'}</li>
          <li><strong>{hi ? 'संस्थागत दबाव' : 'Institutional pressure'}</strong> — {hi ? 'RTI दाखिल करें। FIR दर्ज करें। जनप्रतिनिधि को लिखें। PIL दायर करें। मीडिया को बताएँ।' : 'File RTI. Register FIR. Write to representatives. File PIL. Inform media.'}</li>
          <li><strong>{hi ? 'ट्रैक करें' : 'Track'}</strong> — {hi ? 'क्या जवाब आया? नहीं आया? → अगला कदम: अपील, एस्केलेट, सार्वजनिक करें।' : 'Did they respond? No? → Next step: appeal, escalate, make public.'}</li>
          <li><strong>{hi ? 'बदलाव' : 'Change'}</strong> — {hi ? 'नीति बदले। लोग बदलें। व्यवस्था बदले। और सबूत रखें कि बदलाव हुआ।' : 'Policy changes. People change. Systems change. And document that change happened.'}</li>
        </ol>
        <p className="text-sm mt-4 font-bold">{hi ? 'Sahayata हर कदम के लिए उपकरण देता है।' : 'Sahayata provides tools for every step.'}</p>
      </section>

      {/* PRINCIPLES */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'सिद्धांत' : 'Principles'}</h2>
        <ul className="space-y-2 text-sm">
          <li><strong>{hi ? 'सुरक्षा > सहभागिता' : 'Safety > engagement'}</strong> — {hi ? 'वायरलिटी, एंगेजमेंट मेट्रिक्स, लीडरबोर्ड नहीं।' : 'No virality metrics, engagement scores, or leaderboards.'}</li>
          <li><strong>{hi ? 'नतीजे > तमाशा' : 'Outcomes > spectacle'}</strong> — {hi ? 'RTI का जवाब > 10 लाख लाइक।' : 'An RTI response > 10 million likes.'}</li>
          <li><strong>{hi ? 'बुनियादी ढाँचा > क्षणिक ऊर्जा' : 'Infrastructure > momentary energy'}</strong> — {hi ? 'एक विरोध चक्र से परे बना रहे।' : 'Built to last beyond any single protest cycle.'}</li>
          <li><strong>{hi ? 'गोपनीयता > विकास' : 'Privacy > growth'}</strong> — {hi ? 'उपयोगकर्ता डेटा कभी नहीं बेचा, शेयर या माइन नहीं किया।' : 'User data never sold, shared, or mined.'}</li>
          <li><strong>{hi ? 'विकेंद्रीकृत > केंद्रित' : 'Decentralized > centralized'}</strong> — {hi ? 'कोई एक व्यक्ति या कंपनी इसे बंद नहीं कर सकती।' : 'No single person or company can shut this down.'}</li>
        </ul>
      </section>

      {/* WHAT THIS IS NOT */}
      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">{hi ? 'यह क्या नहीं है' : 'What This Is NOT'}</h2>
        <ul className="space-y-2 text-sm">
          <li>✗ {hi ? 'कोई राजनीतिक दल नहीं। किसी दल से संबद्ध नहीं।' : 'Not a political party. Not affiliated with any party.'}</li>
          <li>✗ {hi ? 'कोई सोशल नेटवर्क नहीं। कोई फ़ीड, फॉलोअर, लाइक नहीं।' : 'Not a social network. No feeds, followers, likes.'}</li>
          <li>✗ {hi ? 'कानूनी प्राधिकार से बचने के लिए नहीं बनाया गया।' : 'Not designed to evade lawful authority.'}</li>
          <li>✗ {hi ? 'हिंसा, घृणा, या गैरकानूनी गतिविधि का उपकरण नहीं।' : 'Not a tool for violence, hate, or unlawful activity.'}</li>
          <li>✗ {hi ? 'चंदा वाहन नहीं। कोई पैसा नहीं माँगा जाता।' : 'Not a fundraising vehicle. No money is asked for.'}</li>
        </ul>
        <p className="text-sm mt-3 font-bold">{hi ? 'यह नागरिक समन्वय का बुनियादी ढाँचा है — बस।' : 'This is civic coordination infrastructure — nothing more, nothing less.'}</p>
      </section>


      {/* CTA */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/guide" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'शुरू करें →' : 'GET STARTED →'}</Link>
        <Link href="/playbook" className="brutal-btn brutal-btn-lg text-center">{hi ? 'प्लेबुक →' : 'PLAYBOOK →'}</Link>
        <Link href="/safety" className="brutal-btn brutal-btn-lg text-center">{hi ? 'अधिकार गाइड →' : 'RIGHTS GUIDE →'}</Link>
      </div>
    </div>
  );
}
