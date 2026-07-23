'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Props { slug: string; locale: Locale; }

interface CampaignDetail {
  title: string; target: string; demand: string;
  city: string; status: string; deadline: string;
  days_active: number; groups: { name: string; members: number }[];
  supporters: number; rtis_filed: number;
  skills_needed: { skill: string; title: string }[];
  evidence: { title: string; type: string; date: string }[];
  timeline: { date: string; event: string }[];
  started_by: string; started_by_type: string;
}

export default function CampaignHubClient({ slug, locale }: Props) {
  const hi = locale === 'hi';
  const [c, setC] = useState<CampaignDetail | null>(null);

  useEffect(() => {
    // Fallback campaign data for now
    setC({
      title: slug === 'dissolve-nta' ? (hi ? 'NTA भंग करो — शिक्षा सुधार' : 'Dissolve NTA — Education Reform') : slug.replace(/-/g, ' '),
      target: hi ? 'शिक्षा मंत्रालय, भारत सरकार' : 'Ministry of Education, Govt of India',
      demand: hi ? 'NTA को तुरंत भंग करो और स्वतंत्र, पारदर्शी परीक्षा निकाय बनाओ' : 'Dissolve NTA immediately and establish independent, transparent examination body',
      city: 'Delhi', status: 'escalating', deadline: '2026-08-19',
      days_active: 34,
      groups: [
        { name: 'CJP Delhi', members: 2400 },
        { name: hi ? 'SFI दिल्ली' : 'SFI Delhi', members: 800 },
        { name: 'AISA', members: 450 },
        { name: hi ? 'NSUI दिल्ली' : 'NSUI Delhi', members: 350 },
        { name: hi ? 'AISF' : 'AISF', members: 200 },
      ],
      supporters: 4200, rtis_filed: 47,
      skills_needed: [
        { skill: 'legal', title: hi ? 'RTI अपील समीक्षा' : 'RTI appeal review' },
        { skill: 'media', title: hi ? 'प्रेस रिलीज़ लेखन' : 'Press release writing' },
        { skill: 'translation', title: hi ? 'तमिल अनुवाद' : 'Tamil translation' },
      ],
      evidence: [
        { title: hi ? '47 RTI दायर (संकलन)' : '47 RTIs filed (compilation)', type: 'document', date: '2026-07-22' },
        { title: hi ? 'चलो संसद — वीडियो साक्ष्य' : 'Chalo Sansad — video evidence', type: 'video', date: '2026-07-20' },
        { title: hi ? 'NTA परीक्षा लीक — दस्तावेज़' : 'NTA exam leak — documents', type: 'document', date: '2026-06-25' },
      ],
      timeline: [
        { date: 'Jun 19', event: hi ? 'अभियान शुरू — जंतर मंतर धरना' : 'Campaign started — Jantar Mantar sit-in' },
        { date: 'Jun 25', event: hi ? '5 ग्रुप जुड़े' : '5 groups aligned' },
        { date: 'Jul 5', event: hi ? '47 RTI दायर' : '47 RTIs filed' },
        { date: 'Jul 19', event: hi ? 'RTI समय सीमा — कोई जवाब नहीं' : 'RTI deadline — no response' },
        { date: 'Jul 20', event: hi ? 'चलो संसद — लाठीचार्ज' : 'Chalo Sansad — lathi charge' },
        { date: 'Jul 22', event: hi ? 'अपील दायर' : 'Appeals filed' },
      ],
      started_by: 'CJP Delhi', started_by_type: 'group',
    });
  }, [slug, hi]);

  if (!c) return <div className="loading-state page-shell"><div className="loading-dot" /></div>;

  const daysLeft = Math.max(0, Math.ceil((new Date(c.deadline).getTime() - Date.now()) / 86_400_000));

  return (
    <div className="content-page">
      <div className="page-shell">
        {/* Status + meta */}
        <div className="badge-row mb-4">
          <span className={`brutal-badge ${c.status === 'escalating' ? 'brutal-badge-red animate-urgent' : 'brutal-badge-accent'}`}>
            {c.status === 'escalating' ? '🔺 ESCALATING' : '● LIVE'}
          </span>
          <span className="brutal-badge">{c.city}</span>
          <span className="brutal-badge brutal-badge-purple">{c.days_active} {hi ? 'दिन सक्रिय' : 'days active'}</span>
          <span className="brutal-badge">{hi ? 'द्वारा:' : 'by:'} {c.started_by}</span>
        </div>

        {/* Title */}
        <h1 className="heading-1 mb-6">{c.title}</h1>

        {/* ═══ THE DEMAND CARD ═══ */}
        <div className="brutal-card" style={{ borderTop: '6px solid var(--color-accent)', padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'start' }}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">{hi ? 'लक्ष्य' : 'TARGET'}</p>
              <p className="heading-3 mb-4">→ {c.target}</p>
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">{hi ? 'माँग' : 'DEMAND'}</p>
              <p className="text-base font-bold">{c.demand}</p>
            </div>
            {/* Deadline Clock */}
            <div style={{ textAlign: 'center', minWidth: '80px' }}>
              <span className="font-mono font-black text-4xl block" style={{ color: daysLeft < 7 ? 'var(--color-red)' : 'var(--color-text)' }}>
                {daysLeft}
              </span>
              <span className="text-xs font-bold text-[var(--color-text-muted)]">{hi ? 'दिन शेष' : 'DAYS LEFT'}</span>
              <div style={{ height: '6px', borderRadius: '3px', background: 'var(--color-border-light)', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, (c.days_active / (c.days_active + daysLeft)) * 100)}%`, background: daysLeft < 7 ? 'var(--color-red)' : 'var(--color-accent)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ═══ TOOLS ═══ */}
        <h2 className="heading-2 mb-4">{hi ? '🔧 टूल्स' : '🔧 Campaign Tools'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          <Link href={`/rti?target=${encodeURIComponent(c.target)}&campaign=${slug}`} className="brutal-btn brutal-btn-primary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', height: 'auto' }}>
            <span className="text-xl">📄</span>
            <span className="text-xs mt-1">{hi ? 'RTI दायर करो' : 'File RTI'}</span>
          </Link>
          <button className="brutal-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', height: 'auto' }}>
            <span className="text-xl">📎</span>
            <span className="text-xs mt-1">{hi ? 'साक्ष्य जोड़ो' : 'Add Evidence'}</span>
          </button>
          <button className="brutal-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', height: 'auto' }}>
            <span className="text-xl">📤</span>
            <span className="text-xs mt-1">{hi ? 'शेयर कार्ड' : 'Share Card'}</span>
          </button>
          <button className="brutal-btn brutal-btn-danger" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', height: 'auto' }}>
            <span className="text-xl">⬆️</span>
            <span className="text-xs mt-1">{hi ? 'एस्केलेट' : 'Escalate'}</span>
          </button>
        </div>

        {/* ═══ ALIGNED GROUPS ═══ */}
        <h2 className="heading-2 mb-4">{hi ? '👥 जुड़े ग्रुप' : '👥 Aligned Groups'}</h2>
        <div className="result-list mb-6">
          {c.groups.map((g, i) => (
            <div key={i} className="brutal-card-flat" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-bold">{g.name}</span>
              <span className="font-mono text-xs text-[var(--color-text-muted)]">{g.members} {hi ? 'सदस्य' : 'members'}</span>
            </div>
          ))}
        </div>
        <div className="button-row mb-8">
          <button className="brutal-btn brutal-btn-primary brutal-btn-sm">{hi ? '+ अपना ग्रुप जोड़ो' : '+ Align your group'}</button>
          <button className="brutal-btn brutal-btn-sm">{hi ? '🙋 व्यक्तिगत जुड़ो' : '🙋 Join as individual'}</button>
        </div>

        {/* ═══ SKILLS NEEDED ═══ */}
        <h2 className="heading-2 mb-4">{hi ? '🤝 कौशल चाहिए' : '🤝 Skills Needed'}</h2>
        <div className="result-list mb-8">
          {c.skills_needed.map((s, i) => (
            <div key={i} className="brutal-card-flat" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="brutal-badge brutal-badge-accent mr-2">{s.skill}</span>
                <span className="font-bold text-sm">{s.title}</span>
              </div>
              <button className="brutal-btn brutal-btn-sm brutal-btn-primary">{hi ? 'मैं कर सकता/सकती हूँ' : 'I can help'}</button>
            </div>
          ))}
        </div>

        {/* ═══ EVIDENCE LOCKER ═══ */}
        <h2 className="heading-2 mb-4">{hi ? '📎 साक्ष्य' : '📎 Evidence Locker'}</h2>
        <div className="result-list mb-8">
          {c.evidence.map((e, i) => (
            <div key={i} className="brutal-card-flat" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="brutal-badge mr-2">{e.type}</span>
                <span className="text-sm font-bold">{e.title}</span>
              </div>
              <span className="font-mono text-xs text-[var(--color-text-muted)]">{e.date}</span>
            </div>
          ))}
        </div>

        {/* ═══ TIMELINE ═══ */}
        <h2 className="heading-2 mb-4">{hi ? '📅 टाइमलाइन' : '📅 Timeline'}</h2>
        <ol className="steps-list mb-8">
          {c.timeline.map((t, i) => (
            <li key={i}><strong className="font-mono">{t.date}</strong><span>{t.event}</span></li>
          ))}
        </ol>

        {/* ═══ STATS ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
          <div className="brutal-stat"><span className="brutal-stat-number">{c.supporters.toLocaleString()}</span><span className="brutal-stat-label">{hi ? 'समर्थक' : 'Supporters'}</span></div>
          <div className="brutal-stat"><span className="brutal-stat-number">{c.rtis_filed}</span><span className="brutal-stat-label">RTIs</span></div>
          <div className="brutal-stat"><span className="brutal-stat-number">{c.groups.length}</span><span className="brutal-stat-label">{hi ? 'ग्रुप' : 'Groups'}</span></div>
          <div className="brutal-stat"><span className="brutal-stat-number">{c.days_active}</span><span className="brutal-stat-label">{hi ? 'दिन' : 'Days'}</span></div>
        </div>

        {/* ═══ REPORT CARD LINK ═══ */}
        <div className="info-panel">
          <strong>{hi ? '📋 रिपोर्ट कार्ड' : '📋 Report Card'}</strong>
          <p className="text-sm mt-1 text-[var(--color-text-muted)]">
            {hi ? 'इस अभियान की माँग सार्वजनिक रिपोर्ट कार्ड पर ट्रैक हो रही है।' : "This campaign's demand is tracked on the public Report Card."}
            {' '}<span className="font-mono font-bold" style={{ color: 'var(--color-red)' }}>{c.days_active} {hi ? 'दिन मौन' : 'days silent'}</span>
          </p>
          <Link href="/report-card" className="brutal-btn brutal-btn-sm mt-3">{hi ? 'रिपोर्ट कार्ड देखें →' : 'View Report Card →'}</Link>
        </div>

        {/* Support button */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <button className="brutal-btn brutal-btn-primary brutal-btn-lg" style={{ width: '100%', maxWidth: '400px' }}>
            {hi ? `✊ इस अभियान का समर्थन करें (${c.supporters.toLocaleString()} लोग)` : `✊ Support this campaign (${c.supporters.toLocaleString()} people)`}
          </button>
        </div>
      </div>
    </div>
  );
}
