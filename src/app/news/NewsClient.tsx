'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { CITIES_AREAS } from '@/lib/constants';

interface Props {
  locale: Locale;
}

type NewsType = 'news' | 'alert' | 'law_update' | 'movement' | 'event' | 'evidence' | 'safety_warning';
type Urgency = 'routine' | 'urgent' | 'critical';

interface NewsItem {
  id: string;
  type: NewsType;
  title: string;
  body: string;
  source?: string;
  timestamp: string;
  upvotes: number;
  verified: boolean;
  city?: string;
  urgency: Urgency;
}

interface Bill {
  id: string;
  title: string;
  status: 'introduced' | 'committee' | 'passed' | 'enacted';
  last_update: string;
}

const NEWS_TYPES: { value: NewsType | ''; labelEn: string; labelHi: string }[] = [
  { value: '', labelEn: 'All types', labelHi: 'सभी प्रकार' },
  { value: 'news', labelEn: 'News', labelHi: 'समाचार' },
  { value: 'alert', labelEn: 'Alert', labelHi: 'अलर्ट' },
  { value: 'law_update', labelEn: 'Law Update', labelHi: 'कानून अपडेट' },
  { value: 'movement', labelEn: 'Movement', labelHi: 'आंदोलन' },
  { value: 'event', labelEn: 'Event', labelHi: 'इवेंट' },
  { value: 'evidence', labelEn: 'Evidence', labelHi: 'साक्ष्य' },
  { value: 'safety_warning', labelEn: 'Safety Warning', labelHi: 'सुरक्षा चेतावनी' },
];

const URGENCY_OPTIONS: { value: Urgency | ''; labelEn: string; labelHi: string }[] = [
  { value: '', labelEn: 'All urgency', labelHi: 'सभी' },
  { value: 'routine', labelEn: 'Routine', labelHi: 'सामान्य' },
  { value: 'urgent', labelEn: 'Urgent', labelHi: 'जरूरी' },
  { value: 'critical', labelEn: 'Critical', labelHi: 'गंभीर' },
];

function typeBadgeClass(type: NewsType): string {
  switch (type) {
    case 'news': return 'brutal-badge-sky';
    case 'alert': return 'brutal-badge-yellow';
    case 'law_update': return 'brutal-badge-purple';
    case 'movement': return 'brutal-badge-accent';
    case 'event': return 'brutal-badge-lime';
    case 'evidence': return 'brutal-badge-sky';
    case 'safety_warning': return 'brutal-badge-red';
    default: return '';
  }
}

function billStatusBadgeClass(status: Bill['status']): string {
  switch (status) {
    case 'introduced': return 'brutal-badge-sky';
    case 'committee': return 'brutal-badge-yellow';
    case 'passed': return 'brutal-badge-accent';
    case 'enacted': return 'brutal-badge-lime';
    default: return '';
  }
}

function billStatusLabel(status: Bill['status'], hi: boolean): string {
  switch (status) {
    case 'introduced': return hi ? 'पेश' : 'Introduced';
    case 'committee': return hi ? 'समिति' : 'Committee';
    case 'passed': return hi ? 'पारित' : 'Passed';
    case 'enacted': return hi ? 'लागू' : 'Enacted';
    default: return status;
  }
}

export default function NewsClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [items, setItems] = useState<NewsItem[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<NewsType | ''>('');
  const [cityFilter, setCityFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<Urgency | ''>('');

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (typeFilter) params.set('type', typeFilter);
        if (cityFilter) params.set('city', cityFilter);
        if (urgencyFilter) params.set('urgency', urgencyFilter);
        const res = await fetch(`/api/news?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error('fail');
        const data = await res.json();
        setItems(data.items || []);
        setBills(data.bills || []);
      } catch (e) {
        if (!(e instanceof DOMException && e.name === 'AbortError')) {
          // Fallback static data
          setItems([
            {
              id: '1',
              type: 'movement',
              title: hi ? 'जंतर मंतर धरना — दिन 34' : 'Jantar Mantar Sit-In — Day 34',
              body: hi ? 'CJP + छात्र संगठन शिक्षा सुधार और NTA भंग की माँग पर डटे।' : 'CJP + student orgs hold firm on education reform and dissolve NTA demands.',
              source: 'Reuters',
              timestamp: '2026-07-23T10:00:00Z',
              upvotes: 342,
              verified: true,
              city: 'Delhi',
              urgency: 'urgent',
            },
            {
              id: '2',
              type: 'safety_warning',
              title: hi ? 'धारा 163 BNSS — मध्य दिल्ली' : 'Section 163 BNSS — Central Delhi',
              body: hi ? '5+ व्यक्ति एकत्रित नहीं हो सकते। भारी पुलिस बल तैनात।' : '5+ persons cannot gather. Heavy police deployment.',
              timestamp: '2026-07-22T18:00:00Z',
              upvotes: 156,
              verified: true,
              city: 'Delhi',
              urgency: 'critical',
            },
            {
              id: '3',
              type: 'law_update',
              title: hi ? 'शिक्षा सुधार विधेयक — समिति चरण' : 'Education Reform Bill — Committee Stage',
              body: hi ? 'संसदीय समिति ने विधेयक पर विचार शुरू किया।' : 'Parliamentary committee begins deliberation on the bill.',
              source: 'PRS Legislative',
              timestamp: '2026-07-01T12:00:00Z',
              upvotes: 89,
              verified: true,
              urgency: 'routine',
            },
            {
              id: '4',
              type: 'evidence',
              title: hi ? 'चलो संसद — वीडियो साक्ष्य' : 'Chalo Sansad — Video Evidence',
              body: hi ? '180+ घायल। लाठी और आँसू गैस के वीडियो प्रमाण।' : '180+ injured. Video evidence of lathi and tear gas.',
              source: 'Citizen Journalism',
              timestamp: '2026-07-20T15:00:00Z',
              upvotes: 567,
              verified: true,
              city: 'Delhi',
              urgency: 'critical',
            },
          ]);
          setBills([
            { id: 'b1', title: hi ? 'शिक्षा सुधार विधेयक 2026' : 'Education Reform Bill 2026', status: 'committee', last_update: '2026-07-01' },
            { id: 'b2', title: hi ? 'NTA (भंग) विधेयक' : 'NTA (Dissolution) Bill', status: 'introduced', last_update: '2026-06-15' },
            { id: 'b3', title: hi ? 'बेरोज़गारी भत्ता विधेयक' : 'Unemployment Allowance Bill', status: 'introduced', last_update: '2026-05-20' },
          ]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [typeFilter, cityFilter, urgencyFilter, hi]);

  const isCritical = (item: NewsItem) =>
    item.urgency === 'critical' || item.type === 'safety_warning';

  return (
    <div className="content-page">
      <div className="page-shell">
        {/* Page Header */}
        <div className="page-heading">
          <h1>{hi ? 'समाचार और साक्ष्य' : 'News & Evidence'}</h1>
          <p>
            {hi
              ? 'क्राउडसोर्स्ड, टाइमस्टैम्प्ड। हर पोस्ट साक्ष्य है।'
              : 'Crowdsourced, timestamped. Every post is evidence.'}
          </p>
        </div>

        {/* Submit News CTA */}
        <div className="button-row mb-8">
          <Link href="/news/submit" className="brutal-btn brutal-btn-primary brutal-btn-lg">
            {hi ? '📝 समाचार सबमिट करें' : '📝 Submit News'}
          </Link>
        </div>

        {/* Filters */}
        <div className="filter-panel">
          <h2 className="heading-3">{hi ? 'फ़िल्टर' : 'Filter'}</h2>
          <div className="filter-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
            <label>
              <span className="field-label">{hi ? 'प्रकार' : 'Type'}</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as NewsType | '')}
                className="brutal-select"
              >
                {NEWS_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {hi ? t.labelHi : t.labelEn}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="field-label">{hi ? 'शहर' : 'City'}</span>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="brutal-select"
              >
                <option value="">{hi ? 'सभी शहर' : 'All cities'}</option>
                {CITIES_AREAS.map((c) => (
                  <option key={c.city} value={c.city}>{c.city}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="field-label">{hi ? 'जरूरत' : 'Urgency'}</span>
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value as Urgency | '')}
                className="brutal-select"
              >
                {URGENCY_OPTIONS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {hi ? u.labelHi : u.labelEn}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* News items */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-dot" />
            <span>{hi ? 'लोड हो रहा...' : 'Loading news...'}</span>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <h2>{hi ? 'कोई समाचार नहीं मिला' : 'No news found'}</h2>
            <p>{hi ? 'फ़िल्टर बदलें या नया सबमिट करें।' : 'Change filters or submit new.'}</p>
          </div>
        ) : (
          <div className="result-list">
            {items.map((item) => (
              <article
                key={item.id}
                className={`brutal-card ${isCritical(item) ? 'border-l-8 border-l-[var(--color-red)]' : ''}`}
              >
                {/* Header badges */}
                <div className="badge-row mb-3">
                  <span className={`brutal-badge ${typeBadgeClass(item.type)}`}>
                    {NEWS_TYPES.find((t) => t.value === item.type)?.[hi ? 'labelHi' : 'labelEn'] || item.type}
                  </span>
                  {item.city && <span className="brutal-badge">{item.city}</span>}
                  {item.verified && (
                    <span className="brutal-badge brutal-badge-purple">
                      {hi ? '✓ सत्यापित' : '✓ Verified'}
                    </span>
                  )}
                  {item.urgency === 'critical' && (
                    <span className="brutal-badge brutal-badge-red animate-urgent">
                      {hi ? '🚨 गंभीर' : '🚨 Critical'}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="heading-3 mb-2">{item.title}</h3>

                {/* Body preview */}
                <p className="text-sm text-[var(--color-text-muted)] mb-3 line-clamp-3">
                  {item.body}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)]">
                  <time className="font-mono">
                    {new Intl.DateTimeFormat(hi ? 'hi-IN' : 'en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    }).format(new Date(item.timestamp))}
                  </time>
                  {item.source && (
                    <span className="font-bold">
                      {hi ? 'स्रोत:' : 'Source:'} {item.source}
                    </span>
                  )}
                  <span className="font-mono font-bold text-[var(--color-text)]">
                    ▲ {item.upvotes}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* BILLS TO WATCH */}
        {bills.length > 0 && (
          <section className="mt-12" aria-labelledby="bills-title">
            <h2 id="bills-title" className="section-title">
              {hi ? 'विधेयक नजर में' : 'Bills to Watch'}
            </h2>
            <div className="result-list">
              {bills.map((bill) => (
                <article key={bill.id} className="brutal-card-flat flex items-center justify-between gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{bill.title}</h3>
                    <time className="font-mono text-xs text-[var(--color-text-muted)]">
                      {hi ? 'अपडेट:' : 'Updated:'} {bill.last_update}
                    </time>
                  </div>
                  <span className={`brutal-badge ${billStatusBadgeClass(bill.status)}`}>
                    {billStatusLabel(bill.status, hi)}
                  </span>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Evidence links */}
        <div className="info-panel mt-10">
          <strong>{hi ? '📎 साक्ष्य लिंक' : '📎 Evidence Links'}</strong>
          <p className="text-sm mt-1 text-[var(--color-text-muted)]">
            {hi
              ? 'हर पोस्ट टाइमस्टैम्प्ड है। वीडियो, फ़ोटो, दस्तावेज़ — सब रिकॉर्ड में है। कोर्ट में स्वीकार्य।'
              : 'Every post is timestamped. Videos, photos, documents — all on record. Admissible in court.'}
          </p>
          <div className="button-row mt-3">
            <Link href="/news/submit" className="brutal-btn brutal-btn-sm">
              {hi ? 'साक्ष्य सबमिट करें' : 'Submit Evidence'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
