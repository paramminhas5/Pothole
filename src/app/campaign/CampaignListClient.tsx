'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { CITIES_AREAS } from '@/lib/constants';

interface Props { locale: Locale; }

interface Campaign {
  id: string;
  slug: string;
  title: string;
  target_institution: string;
  primary_demand: string;
  city: string;
  status: string;
  deadline: string;
  days_active: number;
  groups_aligned: number;
  supporter_count: number;
  filing_count: number;
  started_by: string;
  started_by_type: 'individual' | 'group';
}


export default function CampaignListClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (city) params.set('city', city);
        if (status) params.set('status', status);
        const res = await fetch(`/api/campaign?${params}`, { signal: controller.signal });
        if (res.ok) { const d = await res.json(); setCampaigns(d.campaigns || []); }
      } catch { /* fallback */ }
      setLoading(false);
    }
    load();
    return () => controller.abort();
  }, [city, status]);

  // Fallback data
  useEffect(() => {
    if (!loading && campaigns.length === 0) {
      setCampaigns([
        { id: '1', slug: 'dissolve-nta', title: hi ? 'NTA भंग करो' : 'Dissolve NTA', target_institution: hi ? 'शिक्षा मंत्रालय' : 'Ministry of Education', primary_demand: hi ? 'NTA भंग करो, पारदर्शी निकाय बनाओ' : 'Dissolve NTA, create transparent body', city: 'Delhi', status: 'escalating', deadline: '2026-08-19', days_active: 34, groups_aligned: 5, supporter_count: 4200, filing_count: 47, started_by: 'CJP Delhi', started_by_type: 'group' },
        { id: '2', slug: 'investigate-jul20', title: hi ? '20 जुलाई जाँच' : 'Jul 20 Investigation', target_institution: hi ? 'गृह मंत्रालय' : 'MHA', primary_demand: hi ? 'स्वतंत्र जाँच' : 'Independent inquiry', city: 'Delhi', status: 'live', deadline: '2026-08-20', days_active: 3, groups_aligned: 8, supporter_count: 1800, filing_count: 12, started_by: hi ? 'दिल्ली छात्र नेटवर्क' : 'Delhi Student Network', started_by_type: 'group' },
        { id: '3', slug: 'pune-roads', title: hi ? 'पुणे सड़कें ठीक करो' : 'Fix Pune Roads', target_institution: hi ? 'PMC' : 'PMC', primary_demand: hi ? '30 दिन में गड्ढे ठीक' : 'Fix potholes in 30 days', city: 'Pune', status: 'live', deadline: '2026-08-10', days_active: 15, groups_aligned: 2, supporter_count: 340, filing_count: 3, started_by: 'Rahul M.', started_by_type: 'individual' },
      ]);
    }
  }, [loading, campaigns.length, hi]);

  const daysUntil = (d: string) => Math.max(0, Math.ceil((new Date(d).getTime() - Date.now()) / 86_400_000));

  return (
    <div className="content-page">
      <div className="page-shell">
        <div className="page-heading">
          <h1>{hi ? 'अभियान' : 'Campaigns'}</h1>
          <p>{hi ? 'सक्रिय अभियान — नामित लक्ष्य, स्पष्ट माँग, सार्वजनिक समय सीमा। जुड़ो या अपना शुरू करो।' : 'Active campaigns — named targets, clear demands, public deadlines. Join or start yours.'}</p>
        </div>

        {/* CTA */}
        <div className="button-row mb-8">
          <Link href="/campaign/create" className="brutal-btn brutal-btn-primary brutal-btn-lg">
            {hi ? '📢 अभियान शुरू करें' : '📢 Start a Campaign'}
          </Link>
        </div>

        {/* Filters */}
        <div className="filter-panel mb-6">
          <div className="filter-grid">
            <label>
              <span className="field-label">{hi ? 'शहर' : 'City'}</span>
              <select className="brutal-select" value={city} onChange={e => setCity(e.target.value)}>
                <option value="">{hi ? 'सभी' : 'All'}</option>
                {CITIES_AREAS.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}
              </select>
            </label>
            <label>
              <span className="field-label">{hi ? 'स्थिति' : 'Status'}</span>
              <select className="brutal-select" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="">{hi ? 'सभी' : 'All'}</option>
                <option value="live">{hi ? 'चालू' : 'Live'}</option>
                <option value="escalating">{hi ? 'बढ़ रहा' : 'Escalating'}</option>
                <option value="won">{hi ? 'जीत' : 'Won'}</option>
                <option value="refused">{hi ? 'मना' : 'Refused'}</option>
              </select>
            </label>
          </div>
        </div>

        {/* Campaign list */}
        {loading ? (
          <div className="loading-state"><div className="loading-dot" /><span>{hi ? 'लोड हो रहा...' : 'Loading...'}</span></div>
        ) : (
          <div className="result-list">
            {campaigns.map(c => (
              <Link key={c.id} href={`/campaign/${c.slug}`} className="brutal-card block" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="badge-row mb-2">
                  <span className={`brutal-badge ${c.status === 'escalating' ? 'brutal-badge-red animate-urgent' : c.status === 'won' ? 'brutal-badge-lime' : 'brutal-badge-accent'}`}>
                    {c.status === 'escalating' ? '🔺 ESCALATING' : c.status === 'won' ? '✓ WON' : '● LIVE'}
                  </span>
                  <span className="brutal-badge">{c.city}</span>
                </div>
                <h3 className="heading-3 mb-1">{c.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-1">→ {c.target_institution}</p>
                <p className="text-sm mb-3">{c.primary_demand}</p>
                <div className="flex flex-wrap gap-4 text-xs text-[var(--color-text-muted)]">
                  <span className="font-mono font-bold text-[var(--color-text)]">{daysUntil(c.deadline)}d left</span>
                  <span>{c.groups_aligned} {hi ? 'ग्रुप' : 'groups'}</span>
                  <span>{c.supporter_count.toLocaleString()} {hi ? 'समर्थक' : 'supporters'}</span>
                  <span>{c.filing_count} RTIs</span>
                  <span className="text-[var(--color-accent)]">{hi ? 'द्वारा:' : 'by:'} {c.started_by}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
