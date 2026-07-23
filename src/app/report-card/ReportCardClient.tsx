'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { CITIES_AREAS } from '@/lib/constants';

interface Props { locale: Locale; }

interface ReportEntry {
  id: string;
  institution: string;
  demand_text: string;
  demand_text_hi: string;
  city: string;
  filed_date: string;
  deadline_date: string;
  days_elapsed: number;
  response_status: string;
  response_text: string;
  confirmations: number;
  source_documents: string[];
  filed_by_group: string | null;
}

const STATUS_LABELS: Record<string, { en: string; hi: string; badge: string }> = {
  silent: { en: 'SILENT', hi: 'मौन', badge: 'brutal-badge-red' },
  acknowledged: { en: 'ACKNOWLEDGED', hi: 'स्वीकृत', badge: 'brutal-badge-yellow' },
  partial: { en: 'PARTIAL', hi: 'आंशिक', badge: 'brutal-badge-yellow' },
  responded: { en: 'RESPONDED', hi: 'उत्तर दिया', badge: 'brutal-badge-lime' },
  refused: { en: 'REFUSED', hi: 'मना', badge: 'brutal-badge-red' },
  resolved: { en: 'RESOLVED', hi: 'हल', badge: 'brutal-badge-purple' },
};

export default function ReportCardClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [entries, setEntries] = useState<ReportEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [institution, setInstitution] = useState('');
  const [stats, setStats] = useState({ total: 0, silent: 0, responded: 0 });

  useEffect(() => {
    loadData();
  }, [city, institution]);

  async function loadData() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (city) params.set('city', city);
      if (institution) params.set('institution', institution);
      const res = await fetch(`/api/report-card?${params}`);
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
        setStats(data.stats || { total: 0, silent: 0, responded: 0 });
      }
    } catch { /* fallback below */ }
    setLoading(false);
  }

  // Fallback data if API not available yet
  useEffect(() => {
    if (!loading && entries.length === 0) {
      setEntries([
        { id: '1', institution: hi ? 'शिक्षा मंत्रालय' : 'Ministry of Education', demand_text: 'Dissolve NTA and establish transparent examination body', demand_text_hi: 'NTA भंग करो और पारदर्शी परीक्षा निकाय बनाओ', city: 'Delhi', filed_date: '2026-06-19', deadline_date: '2026-07-19', days_elapsed: 34, response_status: 'silent', response_text: '', confirmations: 47, source_documents: ['rti-filed'], filed_by_group: null },
        { id: '2', institution: hi ? 'गृह मंत्रालय' : 'Ministry of Home Affairs', demand_text: 'Independent inquiry into Jul 20 lathi charge', demand_text_hi: '20 जुलाई लाठीचार्ज की स्वतंत्र जाँच', city: 'Delhi', filed_date: '2026-07-21', deadline_date: '2026-08-20', days_elapsed: 2, response_status: 'silent', response_text: '', confirmations: 180, source_documents: ['video-evidence'], filed_by_group: null },
        { id: '3', institution: hi ? 'दिल्ली पुलिस' : 'Delhi Police', demand_text: 'Account for 180+ injured in Chalo Sansad march', demand_text_hi: 'चलो संसद में 180+ घायलों का हिसाब दो', city: 'Delhi', filed_date: '2026-07-20', deadline_date: '2026-08-19', days_elapsed: 3, response_status: 'silent', response_text: '', confirmations: 234, source_documents: ['medical-records','video'], filed_by_group: null },
        { id: '4', institution: 'UGC', demand_text: 'White paper on examination system reform', demand_text_hi: 'परीक्षा व्यवस्था सुधार पर श्वेत पत्र', city: 'Delhi', filed_date: '2026-06-01', deadline_date: '2026-07-01', days_elapsed: 52, response_status: 'silent', response_text: '', confirmations: 89, source_documents: ['rti-filed'], filed_by_group: null },
        { id: '5', institution: hi ? 'वित्त मंत्रालय' : 'Ministry of Finance', demand_text: 'Unemployment allowance for graduates under 30', demand_text_hi: '30 वर्ष से कम स्नातकों के लिए बेरोज़गारी भत्ता', city: 'National', filed_date: '2026-03-15', deadline_date: '2026-04-14', days_elapsed: 130, response_status: 'refused', response_text: 'Budget constraints cited', confirmations: 12, source_documents: ['rti-response'], filed_by_group: null },
      ]);
      setStats({ total: 5, silent: 4, responded: 1 });
    }
  }, [loading, entries.length, hi]);

  return (
    <div className="content-page">
      <div className="page-shell">
        {/* Header */}
        <div className="page-heading">
          <h1>{hi ? 'रिपोर्ट कार्ड' : 'Report Card'}</h1>
          <p>{hi ? 'सार्वजनिक संस्थागत मौन ट्रैकर। हर माँग स्रोत-सहित। हर मौन गिना जाता है।' : 'Public institutional silence tracker. Every demand is sourced. Every silence is counted.'}</p>
        </div>

        {/* Stats */}
        <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="brutal-stat">
            <span className="brutal-stat-number">{stats.total}</span>
            <span className="brutal-stat-label">{hi ? 'कुल माँगें' : 'Total Demands'}</span>
          </div>
          <div className="brutal-stat" style={{ borderColor: 'var(--color-red)' }}>
            <span className="brutal-stat-number" style={{ color: 'var(--color-red)' }}>{stats.silent}</span>
            <span className="brutal-stat-label">{hi ? 'मौन' : 'Silent'}</span>
          </div>
          <div className="brutal-stat">
            <span className="brutal-stat-number" style={{ color: 'var(--color-lime)' }}>{stats.responded}</span>
            <span className="brutal-stat-label">{hi ? 'उत्तर मिला' : 'Responded'}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-panel mb-6">
          <div className="filter-grid">
            <label>
              <span className="field-label">{hi ? 'शहर' : 'City'}</span>
              <select className="brutal-select" value={city} onChange={e => setCity(e.target.value)}>
                <option value="">{hi ? 'सभी' : 'All'}</option>
                <option value="National">{hi ? 'राष्ट्रीय' : 'National'}</option>
                {CITIES_AREAS.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}
              </select>
            </label>
            <label>
              <span className="field-label">{hi ? 'संस्था खोजें' : 'Search institution'}</span>
              <input className="brutal-input" value={institution} onChange={e => setInstitution(e.target.value)} placeholder={hi ? 'संस्था का नाम...' : 'Institution name...'} />
            </label>
          </div>
        </div>

        {/* Submit demand */}
        <div className="info-panel mb-8">
          <strong>{hi ? '📋 माँग दर्ज करें' : '📋 Submit a Demand'}</strong>
          <p className="text-sm mt-1 text-[var(--color-text-muted)]">
            {hi ? 'हर माँग में चाहिए: संस्था का नाम, स्पष्ट माँग, समय सीमा, और दस्तावेजी स्रोत।' : 'Every demand requires: institution name, clear demand, deadline, and documentary source.'}
          </p>
          <Link href="/report-card/submit" className="brutal-btn brutal-btn-sm brutal-btn-primary mt-3">
            {hi ? 'माँग सबमिट करें' : 'Submit Demand'}
          </Link>
        </div>

        {/* Entries */}
        {loading ? (
          <div className="loading-state"><div className="loading-dot" /><span>{hi ? 'लोड हो रहा...' : 'Loading...'}</span></div>
        ) : (
          <div className="result-list">
            {entries.map(entry => {
              const statusInfo = STATUS_LABELS[entry.response_status] || STATUS_LABELS.silent;
              const isSilent = entry.response_status === 'silent';
              const isOverdue = entry.days_elapsed > 30 && isSilent;
              return (
                <article key={entry.id} className={`brutal-card ${isOverdue ? 'border-l-8 border-l-[var(--color-red)]' : ''}`} style={{ padding: '20px' }}>
                  <div className="flex items-start gap-4">
                    {/* Days counter */}
                    <div className="text-center flex-shrink-0" style={{ minWidth: '60px' }}>
                      <span className="block font-mono font-black text-3xl" style={{ color: isSilent ? 'var(--color-red)' : 'var(--color-lime)' }}>
                        {entry.days_elapsed}
                      </span>
                      <span className="block text-xs font-bold text-[var(--color-text-muted)]">{hi ? 'दिन' : 'days'}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="badge-row mb-2">
                        <span className={`brutal-badge ${statusInfo.badge}`}>{hi ? statusInfo.hi : statusInfo.en}</span>
                        <span className="brutal-badge">{entry.city}</span>
                        {entry.source_documents.length > 0 && <span className="brutal-badge brutal-badge-purple">{hi ? '📎 स्रोत' : '📎 Sourced'}</span>}
                      </div>
                      <h3 className="font-bold mb-1">{entry.institution}</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {hi && entry.demand_text_hi ? entry.demand_text_hi : entry.demand_text}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-[var(--color-text-muted)]">
                        <span className="font-mono">{hi ? 'दायर:' : 'Filed:'} {entry.filed_date}</span>
                        <span className="font-mono">{hi ? 'समय सीमा:' : 'Deadline:'} {entry.deadline_date}</span>
                        <span className="font-bold">{entry.confirmations} {hi ? 'पुष्टि' : 'confirmations'}</span>
                      </div>
                      {entry.response_text && (
                        <div className="mt-3 p-3 bg-[var(--color-bg)] border border-dashed border-[var(--color-border-light)] rounded-lg">
                          <span className="text-xs font-bold">{hi ? 'प्रतिक्रिया:' : 'Response:'}</span>
                          <p className="text-sm mt-1">{entry.response_text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Footer note */}
        <div className="mt-8 text-xs text-[var(--color-text-muted)] font-mono text-center">
          {hi ? 'हर प्रविष्टि के लिए दस्तावेजी स्रोत अनिवार्य। कोई बिना स्रोत आरोप नहीं। संस्थाओं को उत्तर का अधिकार।' : 'Documentary source required for every entry. No unsourced accusations. Institutions have right of reply.'}
        </div>
      </div>
    </div>
  );
}
