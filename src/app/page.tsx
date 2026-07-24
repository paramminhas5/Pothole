import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import SituationBrief from '@/components/SituationBrief';

async function fetchCampaigns() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/campaign?limit=3`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data.campaigns || [];
    }
  } catch { /* empty */ }
  return [];
}

async function fetchGroups() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/groups?limit=4`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data.groups || [];
    }
  } catch { /* empty */ }
  return [];
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  const [liveCampaigns, activeGroups] = await Promise.all([fetchCampaigns(), fetchGroups()]);

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

          {liveCampaigns.length === 0 ? (
            <div className="brutal-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <p style={{ fontSize: '2rem', marginBottom: '12px' }}>📢</p>
              <h3 className="heading-3 mb-2">{hi ? 'अभी कोई सक्रिय अभियान नहीं' : 'No active campaigns yet'}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'पहला अभियान शुरू करें और बदलाव लाएँ।' : 'Start the first campaign and make a difference.'}</p>
              <Link href="/campaign/create" className="brutal-btn brutal-btn-primary">
                {hi ? 'अभियान शुरू करें →' : 'Start one →'}
              </Link>
            </div>
          ) : (
            <div className="result-list">
              {liveCampaigns.map((c: any) => (
                <Link key={c.id} href={`/campaign/${c.slug}`} className="brutal-card block" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {/* Status + city */}
                  <div className="badge-row mb-3">
                    <span className={`brutal-badge ${c.status === 'escalating' ? 'brutal-badge-red animate-urgent' : 'brutal-badge-accent'}`}>
                      {c.status === 'escalating' ? (hi ? '🔺 बढ़ रहा' : '🔺 ESCALATING') : (hi ? '● चालू' : '● LIVE')}
                    </span>
                    <span className="brutal-badge">{c.city}</span>
                  </div>

                  {/* Title + demand */}
                  <h3 className="heading-3 mb-2">{hi && c.title_hi ? c.title_hi : c.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">
                    → <strong>{c.target_institution}</strong>
                  </p>
                  <p className="text-sm mb-4">{hi && c.primary_demand_hi ? c.primary_demand_hi : c.primary_demand}</p>

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
                      <span className="text-xs"><span className="font-mono font-bold">{c.groups_aligned || 0}</span> {hi ? 'ग्रुप' : 'groups'}</span>
                      <span className="text-xs"><span className="font-mono font-bold">{(c.supporter_count || 0).toLocaleString()}</span> {hi ? 'समर्थक' : 'supporters'}</span>
                      <span className="text-xs"><span className="font-mono font-bold">{c.filing_count || 0}</span> RTIs</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

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

          {activeGroups.length === 0 ? (
            <div className="brutal-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <p style={{ fontSize: '2rem', marginBottom: '12px' }}>👥</p>
              <h3 className="heading-3 mb-2">{hi ? 'अभी कोई ग्रुप नहीं' : 'No groups yet'}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'पहला ग्रुप बनाएँ और संगठित हों।' : 'Start the first group and get organized.'}</p>
              <Link href="/groups/create" className="brutal-btn brutal-btn-primary">
                {hi ? 'ग्रुप शुरू करें →' : 'Start a Group →'}
              </Link>
            </div>
          ) : (
            <div className="result-list">
              {activeGroups.map((g: any) => (
                <article key={g.id} className="brutal-card-flat" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <p className="font-bold">{g.name}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">{g.city} · {g.group_type || 'general'}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--color-text-muted)]">{g.member_count || 0} {hi ? 'सदस्य' : 'members'}</span>
                </article>
              ))}
            </div>
          )}

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

      {/* SECTION 4: INSTITUTIONAL SILENCE TRACKER */}
      {liveCampaigns.length > 0 && (
        <section className="content-page" style={{ background: 'var(--color-card)', borderTop: '2px solid var(--color-border)' }} aria-labelledby="rc-title">
          <div className="page-shell">
            <h2 id="rc-title" className="section-title">{hi ? '📋 संस्थागत मौन ट्रैकर' : '📋 Institutional Silence Tracker'}</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">{hi ? 'अभियानों से ऑटो-जनरेट। हर मौन गिना जाता है।' : 'Auto-generated from campaigns. Every silence is counted.'}</p>
            <div className="result-list">
              {liveCampaigns.map((c: any) => {
                const daysActive = c.days_active || Math.max(0, Math.ceil((Date.now() - new Date(c.created_at).getTime()) / 86_400_000));
                return (
                  <article key={c.id} className="brutal-card-flat" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="font-mono font-black text-2xl" style={{ color: 'var(--color-red)', minWidth: '50px', textAlign: 'center' }}>
                      {daysActive}<span className="block text-xs font-bold text-[var(--color-text-muted)]">{hi ? 'दिन' : 'days'}</span>
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{c.target_institution}</p>
                      <p className="text-xs text-[var(--color-text-muted)] truncate">{hi && c.primary_demand_hi ? c.primary_demand_hi : c.primary_demand}</p>
                    </div>
                    <span className="brutal-badge brutal-badge-red">{hi ? 'मौन' : 'SILENT'}</span>
                  </article>
                );
              })}
            </div>
            <Link href="/report-card" className="brutal-btn brutal-btn-sm" style={{ marginTop: '12px' }}>
              {hi ? 'पूरा रिपोर्ट कार्ड →' : 'Full Report Card →'}
            </Link>
          </div>
        </section>
      )}

      {/* SECTION 5: HOW IT WORKS */}
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
