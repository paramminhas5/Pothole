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
  title_hi?: string;
  target_institution: string;
  primary_demand: string;
  primary_demand_hi?: string;
  city: string;
  status: string;
  deadline: string;
  days_active?: number;
  groups_aligned?: number;
  supporter_count?: number;
  filing_count?: number;
  created_at?: string;
  creator_id?: string;
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
        if (res.ok) {
          const d = await res.json();
          setCampaigns(d.campaigns || []);
        } else {
          setCampaigns([]);
        }
      } catch (e) {
        if (!(e instanceof DOMException && (e as DOMException).name === 'AbortError')) {
          setCampaigns([]);
        }
      }
      setLoading(false);
    }
    load();
    return () => controller.abort();
  }, [city, status]);

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
        ) : campaigns.length === 0 ? (
          <div className="brutal-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
            <p style={{ fontSize: '2rem', marginBottom: '12px' }}>📢</p>
            <h3 className="heading-3 mb-2">{hi ? 'कोई अभियान नहीं मिला' : 'No campaigns yet'}</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'पहला अभियान शुरू करें!' : 'Be the first to start one!'}</p>
            <Link href="/campaign/create" className="brutal-btn brutal-btn-primary">
              {hi ? 'अभियान शुरू करें →' : 'Start a Campaign →'}
            </Link>
          </div>
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
                <h3 className="heading-3 mb-1">{hi && c.title_hi ? c.title_hi : c.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-1">→ {c.target_institution}</p>
                <p className="text-sm mb-3">{hi && c.primary_demand_hi ? c.primary_demand_hi : c.primary_demand}</p>
                <div className="flex flex-wrap gap-4 text-xs text-[var(--color-text-muted)]">
                  <span className="font-mono font-bold text-[var(--color-text)]">{daysUntil(c.deadline)}d left</span>
                  <span>{c.groups_aligned || 0} {hi ? 'ग्रुप' : 'groups'}</span>
                  <span>{(c.supporter_count || 0).toLocaleString()} {hi ? 'समर्थक' : 'supporters'}</span>
                  <span>{c.filing_count || 0} RTIs</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
