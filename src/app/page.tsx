import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import SituationBrief from '@/components/SituationBrief';

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  // Live campaigns data (fallback to seed)
  const liveCampaigns = [
    {
      id: '1', slug: 'dissolve-nta',
      title: hi ? 'NTA भंग करो — शिक्षा सुधार' : 'Dissolve NTA — Education Reform',
      target: hi ? 'शिक्षा मंत्रालय' : 'Ministry of Education',
      city: 'Delhi', status: 'escalating',
      days_active: 34, groups_aligned: 5, supporters: 4200, rtis_filed: 47,
      demand: hi ? 'NTA को भंग करो और पारदर्शी परीक्षा निकाय बनाओ' : 'Dissolve NTA and establish transparent exam body',
      deadline: '2026-08-19',
    },
    {
      id: '2', slug: 'investigate-lathi-charge',
      title: hi ? '20 जुलाई लाठीचार्ज जाँच' : 'Jul 20 Lathi Charge Investigation',
      target: hi ? 'गृह मंत्रालय' : 'Ministry of Home Affairs',
      city: 'Delhi', status: 'live',
      days_active: 3, groups_aligned: 8, supporters: 1800, rtis_filed: 12,
      demand: hi ? '180+ घायलों के लिए स्वतंत्र जाँच' : 'Independent inquiry for 180+ injured',
      deadline: '2026-08-20',
    },
    {
      id: '3', slug: 'mg-road-potholes-pune',
      title: hi ? 'MG रोड गड्ढे — पुणे' : 'MG Road Potholes — Pune',
      target: hi ? 'पुणे नगर निगम' : 'Pune Municipal Corporation',
      city: 'Pune', status: 'live',
      days_active: 15, groups_aligned: 2, supporters: 340, rtis_filed: 3,
      demand: hi ? '30 दिन में सभी गड्ढे ठीक करो' : 'Fix all potholes within 30 days',
      deadline: '2026-08-10',
    },
  ];

  const activeGroups = [
    { name: hi ? 'CJP दिल्ली' : 'CJP Delhi', action: hi ? 'आज 3 RTI दायर कीं' : 'Filed 3 RTIs today', members: 2400 },
    { name: hi ? 'पुणे सिविक वॉच' : 'Pune Civic Watch', action: hi ? 'MG रोड दस्तावेज़ीकरण' : 'Documenting MG Road damage', members: 89 },
    { name: hi ? 'दिल्ली छात्र अधिकार नेटवर्क' : 'Delhi Student Rights Network', action: hi ? 'NTA अभियान समन्वय' : 'Coordinating NTA campaign', members: 560 },
    { name: hi ? 'बेंगलुरु ट्रैफिक एक्शन' : 'Bengaluru Traffic Action', action: hi ? 'BBMP को शिकायत दर्ज' : 'Filing complaint with BBMP', members: 120 },
  ];

  const quickActions = [
    { label: hi ? '✊ आज रात प्रोटेस्ट' : '✊ Protest tonight', href: '/protest-mode' },
    { label: hi ? '🆘 अभी मदद चाहिए' : '🆘 Need help now', href: '/directory' },
    { label: hi ? '👥 ग्रुप बनाओ/खोजो' : '👥 Find/start group', href: '/groups' },
    { label: hi ? '🤝 मेरा कौशल दो' : '🤝 Offer my skills', href: '/exchange' },
    { label: hi ? '📋 रिपोर्ट कार्ड' : '📋 Report Card', href: '/report-card' },
    { label: hi ? '🧠 व्यवस्था जानो' : '🧠 Know the System', href: '/know-the-system' },
  ];

  const daysUntil = (d: string) => Math.max(0, Math.ceil((new Date(d).getTime() - Date.now()) / 86_400_000));

  return (
    <div>
      {/* HERO — minimal, get to content fast */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="page-shell home-hero-inner" style={{ paddingBlock: 'clamp(40px, 8vw, 72px)' }}>
          <p className="eyebrow">SAHAYATA</p>
          <h1 id="home-title" className="home-title">
            {hi ? 'भारत का नागरिक ऑपरेटिंग सिस्टम' : "India's civic operating system"}
          </h1>
          <p className="home-intro">
            {hi
              ? 'सक्रिय अभियान। संगठित ग्रुप। सार्वजनिक जवाबदेही। सब एक जगह।'
              : 'Active campaigns. Organized groups. Public accountability. All in one place.'}
          </p>
          <div className="button-row">
            <Link href="/campaign/create" className="brutal-btn brutal-btn-primary home-primary-action">
              {hi ? '📢 अभियान शुरू करें' : '📢 Start a Campaign'}
            </Link>
            <a href="#campaigns" className="brutal-btn">
              {hi ? '↓ सक्रिय अभियान देखें' : '↓ See active campaigns'}
            </a>
          </div>
        </div>
      </section>

      {/* SITUATION BRIEF */}
      <SituationBrief locale={locale} />

      {/* SECTION 1: LIVE CAMPAIGNS — The heart of the platform */}
      <section id="campaigns" className="content-page" style={{ background: 'var(--color-card)', borderTop: '2px solid var(--color-border)' }} aria-labelledby="campaigns-title">
        <div className="page-shell">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 id="campaigns-title" className="section-title" style={{ margin: 0 }}>
              {hi ? '🔥 सक्रिय अभियान' : '🔥 Active Campaigns'}
            </h2>
            <Link href="/campaign" className="brutal-btn brutal-btn-sm">
              {hi ? 'सब देखें →' : 'View all →'}
            </Link>
          </div>

          <div className="result-list">
            {liveCampaigns.map(c => (
              <Link key={c.id} href={`/campaign/${c.slug}`} className="brutal-card block" style={{ textDecoration: 'none', color: 'inherit' }}>
                {/* Status + city */}
                <div className="badge-row mb-3">
                  <span className={`brutal-badge ${c.status === 'escalating' ? 'brutal-badge-red animate-urgent' : 'brutal-badge-accent'}`}>
                    {c.status === 'escalating' ? (hi ? '🔺 बढ़ रहा' : '🔺 ESCALATING') : (hi ? '● चालू' : '● LIVE')}
                  </span>
                  <span className="brutal-badge">{c.city}</span>
                  <span className="brutal-badge brutal-badge-purple">{c.days_active} {hi ? 'दिन' : 'days'}</span>
                </div>

                {/* Title + demand */}
                <h3 className="heading-3 mb-2">{c.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-1">
                  → <strong>{c.target}</strong>
                </p>
                <p className="text-sm mb-4">{c.demand}</p>

                {/* Deadline clock + stats */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  {/* Deadline */}
                  <div style={{ textAlign: 'center' }}>
                    <span className="font-mono font-black text-2xl" style={{ color: daysUntil(c.deadline) < 7 ? 'var(--color-red)' : 'var(--color-text)' }}>
                      {daysUntil(c.deadline)}
                    </span>
                    <span className="block text-xs font-bold text-[var(--color-text-muted)]">{hi ? 'दिन शेष' : 'days left'}</span>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span className="text-xs"><span className="font-mono font-bold">{c.groups_aligned}</span> {hi ? 'ग्रुप' : 'groups'}</span>
                    <span className="text-xs"><span className="font-mono font-bold">{c.supporters.toLocaleString()}</span> {hi ? 'समर्थक' : 'supporters'}</span>
                    <span className="text-xs"><span className="font-mono font-bold">{c.rtis_filed}</span> RTIs</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Start campaign CTA */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link href="/campaign/create" className="brutal-btn brutal-btn-primary brutal-btn-lg">
              {hi ? '📢 अपना अभियान शुरू करें' : '📢 Start Your Own Campaign'}
            </Link>
            <p className="action-note" style={{ marginTop: '8px' }}>
              {hi ? 'कोई भी शुरू कर सकता है — व्यक्ति या ग्रुप।' : 'Anyone can start — individual or group.'}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: GROUPS IN ACTION */}
      <section className="content-page" aria-labelledby="groups-title">
        <div className="page-shell">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 id="groups-title" className="section-title" style={{ margin: 0 }}>
              {hi ? '👥 सक्रिय ग्रुप' : '👥 Groups in Action'}
            </h2>
            <Link href="/groups" className="brutal-btn brutal-btn-sm">
              {hi ? 'सब ग्रुप →' : 'All groups →'}
            </Link>
          </div>

          <div className="result-list">
            {activeGroups.map((g, i) => (
              <article key={i} className="brutal-card-flat" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <p className="font-bold">{g.name}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{g.action}</p>
                </div>
                <span className="font-mono text-xs font-bold text-[var(--color-text-muted)]">{g.members} {hi ? 'सदस्य' : 'members'}</span>
              </article>
            ))}
          </div>

          <div className="button-row" style={{ marginTop: '16px' }}>
            <Link href="/groups/create" className="brutal-btn brutal-btn-primary">
              {hi ? '➕ ग्रुप शुरू करें' : '➕ Start a Group'}
            </Link>
            <Link href="/groups" className="brutal-btn">
              {hi ? 'ग्रुप खोजें' : 'Find a Group'}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: QUICK ACTIONS */}
      <section className="home-choices" aria-labelledby="actions-title" style={{ background: 'var(--color-card)', borderTop: '2px solid var(--color-border)' }}>
        <div className="page-shell">
          <h2 id="actions-title" className="section-title">
            {hi ? '⚡ तुरंत एक्शन' : '⚡ Quick Actions'}
          </h2>
          <div className="choice-grid">
            {quickActions.map(action => (
              <Link key={action.href} href={action.href} className="choice-card">
                <h3>{action.label}</h3>
                <span className="choice-link">{hi ? 'जाएँ →' : 'Go →'}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: NEWS & ALERTS */}
      <section className="content-page" aria-labelledby="news-title">
        <div className="page-shell">
          <h2 id="news-title" className="section-title">{hi ? '📰 ताज़ा अपडेट' : '📰 Latest Updates'}</h2>
          <div className="result-list">
            {[
              { title: hi ? 'चलो संसद — वीडियो साक्ष्य प्रकाशित' : 'Chalo Sansad — video evidence published', badge: 'evidence', critical: true },
              { title: hi ? 'शिक्षा सुधार विधेयक — समिति में' : 'Education Reform Bill — in committee', badge: 'law_update', critical: false },
              { title: hi ? 'धारा 163 BNSS — मध्य दिल्ली में लागू' : 'Section 163 BNSS — enforced in Central Delhi', badge: 'safety_warning', critical: true },
            ].map((item, i) => (
              <article key={i} className={`brutal-card-flat ${item.critical ? 'border-l-4 border-l-[var(--color-red)]' : ''}`} style={{ padding: '14px' }}>
                <div className="badge-row mb-1">
                  <span className={`brutal-badge ${item.critical ? 'brutal-badge-red' : 'brutal-badge-sky'}`}>{item.badge}</span>
                </div>
                <p className="font-bold text-sm">{item.title}</p>
              </article>
            ))}
          </div>
          <Link href="/news" className="brutal-btn brutal-btn-sm" style={{ marginTop: '12px' }}>
            {hi ? 'सब देखें →' : 'See all →'}
          </Link>
        </div>
      </section>

      {/* SECTION 5: REPORT CARD PREVIEW */}
      <section className="content-page" style={{ background: 'var(--color-card)', borderTop: '2px solid var(--color-border)' }} aria-labelledby="rc-title">
        <div className="page-shell">
          <h2 id="rc-title" className="section-title">{hi ? '📋 संस्थागत मौन ट्रैकर' : '📋 Institutional Silence Tracker'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">{hi ? 'अभियानों से ऑटो-जनरेट। हर मौन गिना जाता है।' : 'Auto-generated from campaigns. Every silence is counted.'}</p>
          <div className="result-list">
            {liveCampaigns.map((c, i) => (
              <article key={i} className="brutal-card-flat" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="font-mono font-black text-2xl" style={{ color: 'var(--color-red)', minWidth: '50px', textAlign: 'center' }}>
                  {c.days_active}<span className="block text-xs font-bold text-[var(--color-text-muted)]">{hi ? 'दिन' : 'days'}</span>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{c.target}</p>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">{c.demand}</p>
                </div>
                <span className="brutal-badge brutal-badge-red">{hi ? 'मौन' : 'SILENT'}</span>
              </article>
            ))}
          </div>
          <Link href="/report-card" className="brutal-btn brutal-btn-sm" style={{ marginTop: '12px' }}>
            {hi ? 'पूरा रिपोर्ट कार्ड →' : 'Full Report Card →'}
          </Link>
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS */}
      <section className="how-it-works" aria-labelledby="how-title">
        <div className="page-shell">
          <h2 id="how-title" className="section-title">{hi ? 'कैसे काम करता है' : 'How It Works'}</h2>
          <ol className="steps-list">
            <li><strong>{hi ? 'अभियान शुरू करो या जुड़ो' : 'Start or join a campaign'}</strong><span>{hi ? 'लक्ष्य + माँग + समय सीमा = सार्वजनिक जवाबदेही' : 'Target + demand + deadline = public accountability'}</span></li>
            <li><strong>{hi ? 'ग्रुप को जोड़ो' : 'Align your group'}</strong><span>{hi ? '10 ग्रुप = 10x ताकत। गठबंधन बनाओ।' : '10 groups = 10x power. Build coalitions.'}</span></li>
            <li><strong>{hi ? 'टूल्स इस्तेमाल करो' : 'Use the tools'}</strong><span>{hi ? 'RTI, FIR, साक्ष्य, शेयर कार्ड — सब अभियान से जुड़ा' : 'RTI, FIR, evidence, share cards — all connected to campaign'}</span></li>
            <li><strong>{hi ? 'एस्केलेट करो' : 'Escalate'}</strong><span>{hi ? 'समय सीमा बीती? अपील। मौन? सार्वजनिक करो।' : 'Deadline passed? Appeal. Silence? Make it public.'}</span></li>
            <li><strong>{hi ? 'नतीजा दर्ज करो' : 'Record the outcome'}</strong><span>{hi ? 'जीत, इनकार, मौन — सब रिपोर्ट कार्ड पर' : 'Won, refused, silent — all on the Report Card'}</span></li>
          </ol>
        </div>
      </section>

      {/* FOOTER: HELP + TRUST */}
      <aside style={{ padding: '14px 0', borderTop: '1px solid var(--color-border-light)', textAlign: 'center' }}>
        <div className="page-shell">
          <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>
            {hi ? '⚖️ वकील:' : '⚖️ Lawyer:'} <a href="tel:1516" style={{ color: 'var(--color-accent)' }}>DSLSA 1516</a> ({hi ? 'मुफ्त, 24/7' : 'free, 24/7'}) · <a href="https://hrln.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>HRLN ↗</a> · <Link href="/directory" style={{ color: 'var(--color-accent)' }}>{hi ? 'पूरी डायरेक्टरी →' : 'Full directory →'}</Link>
          </p>
        </div>
      </aside>
    </div>
  );
}
