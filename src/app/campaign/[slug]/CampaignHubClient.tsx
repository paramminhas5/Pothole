'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Props { slug: string; locale: Locale; }

interface AlignedGroup {
  id: string;
  name: string;
  members: number;
  city: string;
}

interface EvidenceItem {
  id: string;
  title: string;
  evidence_type: string;
  created_at: string;
}

interface CampaignData {
  id: string;
  slug: string;
  title: string;
  title_hi?: string;
  target_institution: string;
  primary_demand: string;
  primary_demand_hi?: string;
  issue_statement?: string;
  issue_statement_hi?: string;
  city: string;
  status: string;
  deadline: string;
  created_at: string;
  creator_id: string;
  groups_aligned: number;
  supporter_count: number;
  filing_count: number;
  aligned_groups: AlignedGroup[];
  evidence: EvidenceItem[];
  category?: string;
}

export default function CampaignHubClient({ slug, locale }: Props) {
  const hi = locale === 'hi';
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [supporting, setSupporting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [supportMsg, setSupportMsg] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/campaign/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setCampaign(data.campaign);
        } else {
          const data = await res.json();
          setError(data.error || 'Failed to load campaign');
        }
      } catch {
        setError(hi ? 'नेटवर्क त्रुटि' : 'Network error');
      }
      setLoading(false);
    }
    load();
  }, [slug, hi]);

  async function handleSupport() {
    if (!campaign) return;
    setSupporting(true);
    setSupportMsg('');
    try {
      const res = await fetch(`/api/campaign/${campaign.id}/support`, { method: 'POST' });
      if (res.ok) {
        setSupportMsg(hi ? '✓ समर्थन दर्ज!' : '✓ Support registered!');
        setCampaign(prev => prev ? { ...prev, supporter_count: (prev.supporter_count || 0) + 1 } : prev);
      } else {
        const data = await res.json();
        setSupportMsg(data.error || 'Failed');
      }
    } catch {
      setSupportMsg(hi ? 'त्रुटि' : 'Error');
    }
    setSupporting(false);
  }

  async function handlePublish() {
    if (!campaign) return;
    setPublishing(true);
    try {
      const res = await fetch(`/api/campaign/${campaign.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'live' }),
      });
      if (res.ok) {
        setCampaign(prev => prev ? { ...prev, status: 'live' } : prev);
      } else {
        const data = await res.json();
        alert(data.error || 'Publish failed');
      }
    } catch {
      alert(hi ? 'त्रुटि' : 'Error');
    }
    setPublishing(false);
  }

  if (loading) {
    return <div className="loading-state page-shell" style={{ paddingTop: '80px' }}><div className="loading-dot" /><span>{hi ? 'लोड हो रहा...' : 'Loading...'}</span></div>;
  }

  if (error || !campaign) {
    return (
      <div className="content-page">
        <div className="page-shell" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <p style={{ fontSize: '2rem', marginBottom: '12px' }}>😔</p>
          <h2 className="heading-2 mb-2">{hi ? 'अभियान नहीं मिला' : 'Campaign not found'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">{error}</p>
          <Link href="/campaign" className="brutal-btn brutal-btn-primary">{hi ? 'सभी अभियान देखें' : 'View all campaigns'}</Link>
        </div>
      </div>
    );
  }

  const c = campaign;
  const daysActive = Math.max(0, Math.ceil((Date.now() - new Date(c.created_at).getTime()) / 86_400_000));
  const daysLeft = Math.max(0, Math.ceil((new Date(c.deadline).getTime() - Date.now()) / 86_400_000));

  return (
    <div className="content-page">
      <div className="page-shell">
        {/* Status + meta */}
        <div className="badge-row mb-4">
          <span className={`brutal-badge ${c.status === 'escalating' ? 'brutal-badge-red animate-urgent' : c.status === 'draft' ? 'brutal-badge-purple' : 'brutal-badge-accent'}`}>
            {c.status === 'escalating' ? '🔺 ESCALATING' : c.status === 'draft' ? '📝 DRAFT' : '● LIVE'}
          </span>
          <span className="brutal-badge">{c.city}</span>
          <span className="brutal-badge brutal-badge-purple">{daysActive} {hi ? 'दिन सक्रिय' : 'days active'}</span>
        </div>

        {/* Draft notice + publish button */}
        {c.status === 'draft' && (
          <div style={{ marginBottom: '24px', padding: '16px', border: '2px solid var(--color-accent)', borderRadius: '8px', background: 'var(--color-card)' }}>
            <p className="font-bold mb-2">{hi ? '📝 यह अभियान ड्राफ्ट में है' : '📝 This campaign is in draft'}</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-3">{hi ? 'प्रकाशित करें ताकि सभी देख सकें।' : 'Publish it to make it visible to everyone.'}</p>
            <button
              className="brutal-btn brutal-btn-primary"
              onClick={handlePublish}
              disabled={publishing}
              style={{ minHeight: '48px' }}
            >
              {publishing ? (hi ? 'प्रकाशित हो रहा...' : 'Publishing...') : (hi ? '📢 अभियान प्रकाशित करें' : '📢 Publish Campaign')}
            </button>
          </div>
        )}

        {/* Title */}
        <h1 className="heading-1 mb-6">{hi && c.title_hi ? c.title_hi : c.title}</h1>

        {/* ═══ THE DEMAND CARD ═══ */}
        <div className="brutal-card" style={{ borderTop: '6px solid var(--color-accent)', padding: '28px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'start' }}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">{hi ? 'लक्ष्य' : 'TARGET'}</p>
              <p className="heading-3 mb-4">→ {c.target_institution}</p>
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)] mb-1">{hi ? 'माँग' : 'DEMAND'}</p>
              <p className="text-base font-bold">{hi && c.primary_demand_hi ? c.primary_demand_hi : c.primary_demand}</p>
            </div>
            {/* Deadline Clock */}
            <div style={{ textAlign: 'center', minWidth: '80px' }}>
              <span className="font-mono font-black text-4xl block" style={{ color: daysLeft < 7 ? 'var(--color-red)' : 'var(--color-text)' }}>
                {daysLeft}
              </span>
              <span className="text-xs font-bold text-[var(--color-text-muted)]">{hi ? 'दिन शेष' : 'DAYS LEFT'}</span>
              <div style={{ height: '6px', borderRadius: '3px', background: 'var(--color-border-light)', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, (daysActive / (daysActive + daysLeft)) * 100)}%`, background: daysLeft < 7 ? 'var(--color-red)' : 'var(--color-accent)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Issue statement if available */}
        {(c.issue_statement || c.issue_statement_hi) && (
          <div className="brutal-card mb-6" style={{ padding: '20px' }}>
            <p className="text-xs font-bold uppercase text-[var(--color-text-muted)] mb-2">{hi ? 'समस्या विवरण' : 'Issue Statement'}</p>
            <p className="text-sm">{hi && c.issue_statement_hi ? c.issue_statement_hi : c.issue_statement}</p>
          </div>
        )}

        {/* ═══ TOOLS ═══ */}
        <h2 className="heading-2 mb-4">{hi ? '🔧 टूल्स' : '🔧 Campaign Tools'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          <Link href={`/rti?target=${encodeURIComponent(c.target_institution)}&campaign=${slug}`} className="brutal-btn brutal-btn-primary" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', height: 'auto', minHeight: '48px' }}>
            <span className="text-xl">📄</span>
            <span className="text-xs mt-1">{hi ? 'RTI दायर करो' : 'File RTI'}</span>
          </Link>
          <button className="brutal-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', height: 'auto', minHeight: '48px' }}>
            <span className="text-xl">📎</span>
            <span className="text-xs mt-1">{hi ? 'साक्ष्य जोड़ो' : 'Add Evidence'}</span>
          </button>
          <button className="brutal-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', height: 'auto', minHeight: '48px' }}>
            <span className="text-xl">📤</span>
            <span className="text-xs mt-1">{hi ? 'शेयर कार्ड' : 'Share Card'}</span>
          </button>
        </div>

        {/* ═══ ALIGNED GROUPS ═══ */}
        <h2 className="heading-2 mb-4">{hi ? '👥 जुड़े ग्रुप' : '👥 Aligned Groups'}</h2>
        {c.aligned_groups && c.aligned_groups.length > 0 ? (
          <div className="result-list mb-6">
            {c.aligned_groups.map((g) => (
              <div key={g.id} className="brutal-card-flat" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-bold">{g.name}</span>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">{g.members || 0} {hi ? 'सदस्य' : 'members'}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-text-muted)] mb-6">{hi ? 'अभी कोई ग्रुप नहीं जुड़ा।' : 'No groups aligned yet.'}</p>
        )}

        {/* ═══ EVIDENCE LOCKER ═══ */}
        {c.evidence && c.evidence.length > 0 && (
          <>
            <h2 className="heading-2 mb-4">{hi ? '📎 साक्ष्य' : '📎 Evidence Locker'}</h2>
            <div className="result-list mb-8">
              {c.evidence.map((e) => (
                <div key={e.id} className="brutal-card-flat" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="brutal-badge mr-2">{e.evidence_type}</span>
                    <span className="text-sm font-bold">{e.title}</span>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-text-muted)]">{new Date(e.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══ STATS ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
          <div className="brutal-stat"><span className="brutal-stat-number">{(c.supporter_count || 0).toLocaleString()}</span><span className="brutal-stat-label">{hi ? 'समर्थक' : 'Supporters'}</span></div>
          <div className="brutal-stat"><span className="brutal-stat-number">{c.filing_count || 0}</span><span className="brutal-stat-label">RTIs</span></div>
          <div className="brutal-stat"><span className="brutal-stat-number">{c.groups_aligned || 0}</span><span className="brutal-stat-label">{hi ? 'ग्रुप' : 'Groups'}</span></div>
          <div className="brutal-stat"><span className="brutal-stat-number">{daysActive}</span><span className="brutal-stat-label">{hi ? 'दिन' : 'Days'}</span></div>
        </div>

        {/* ═══ REPORT CARD LINK ═══ */}
        <div className="info-panel">
          <strong>{hi ? '📋 रिपोर्ट कार्ड' : '📋 Report Card'}</strong>
          <p className="text-sm mt-1 text-[var(--color-text-muted)]">
            {hi ? 'इस अभियान की माँग सार्वजनिक रिपोर्ट कार्ड पर ट्रैक हो रही है।' : "This campaign's demand is tracked on the public Report Card."}
            {' '}<span className="font-mono font-bold" style={{ color: 'var(--color-red)' }}>{daysActive} {hi ? 'दिन मौन' : 'days silent'}</span>
          </p>
          <Link href="/report-card" className="brutal-btn brutal-btn-sm mt-3">{hi ? 'रिपोर्ट कार्ड देखें →' : 'View Report Card →'}</Link>
        </div>

        {/* Support button */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <button
            className="brutal-btn brutal-btn-primary brutal-btn-lg"
            style={{ width: '100%', maxWidth: '400px', minHeight: '48px' }}
            onClick={handleSupport}
            disabled={supporting}
          >
            {supporting
              ? (hi ? 'दर्ज हो रहा...' : 'Registering...')
              : (hi ? `✊ इस अभियान का समर्थन करें (${(c.supporter_count || 0).toLocaleString()} लोग)` : `✊ Support this campaign (${(c.supporter_count || 0).toLocaleString()} people)`)}
          </button>
          {supportMsg && (
            <p className="text-sm mt-2" style={{ color: supportMsg.startsWith('✓') ? 'var(--color-accent)' : 'var(--color-red)' }}>{supportMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
}
