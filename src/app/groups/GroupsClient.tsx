'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { CITIES_AREAS } from '@/lib/constants';

interface Props {
  locale: Locale;
}

type GroupType = 'protest' | 'mutual_aid' | 'campaign' | 'study' | 'chapter' | 'general';

interface Group {
  id: string;
  name: string;
  city: string;
  group_type: GroupType;
  member_count: number;
  action_count: number;
  purpose: string;
  description?: string;
  chat_link?: string;
}

const GROUP_TYPES: { value: GroupType | ''; labelEn: string; labelHi: string }[] = [
  { value: '', labelEn: 'All types', labelHi: 'सभी प्रकार' },
  { value: 'protest', labelEn: 'Protest', labelHi: 'विरोध' },
  { value: 'mutual_aid', labelEn: 'Mutual Aid', labelHi: 'पारस्परिक सहायता' },
  { value: 'campaign', labelEn: 'Campaign', labelHi: 'अभियान' },
  { value: 'study', labelEn: 'Study', labelHi: 'अध्ययन' },
  { value: 'chapter', labelEn: 'Chapter', labelHi: 'चैप्टर' },
  { value: 'general', labelEn: 'General', labelHi: 'सामान्य' },
];

function typeBadgeClass(type: string): string {
  switch (type) {
    case 'protest': return 'brutal-badge-red';
    case 'mutual_aid': return 'brutal-badge-lime';
    case 'campaign': return 'brutal-badge-accent';
    case 'study': return 'brutal-badge-sky';
    case 'chapter': return 'brutal-badge-purple';
    default: return '';
  }
}

export default function GroupsClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<GroupType | ''>('');

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (cityFilter) params.set('city', cityFilter);
        if (typeFilter) params.set('type', typeFilter);
        const res = await fetch(`/api/groups?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error('fail');
        const data = await res.json();
        setGroups(data.groups || []);
      } catch (e) {
        if (!(e instanceof DOMException && e.name === 'AbortError')) {
          setGroups([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [cityFilter, typeFilter]);

  return (
    <div className="content-page">
      <div className="page-shell">
        {/* Page Header */}
        <div className="page-heading">
          <h1>{hi ? 'ग्रुप' : 'Groups'}</h1>
          <p>
            {hi
              ? 'अपने लोग खोजो। संगठित हो। साथ मिलकर एक्शन लो।'
              : 'Find your people. Get organized. Take action together.'}
          </p>
        </div>

        {/* PUBLIC notice */}
        <div className="info-panel mb-6">
          <strong>{hi ? '📢 ग्रुप सार्वजनिक हैं' : '📢 Groups are PUBLIC'}</strong>
          <p className="text-sm mt-1 text-[var(--color-text-muted)]">
            {hi
              ? 'सभी ग्रुप डिफ़ॉल्ट रूप से सार्वजनिक हैं। पारदर्शिता = विश्वास।'
              : 'All groups are public by default. Transparency = trust.'}
          </p>
        </div>

        {/* Start a Group CTA */}
        <div className="button-row mb-8">
          <Link href="/groups/create" className="brutal-btn brutal-btn-primary brutal-btn-lg">
            {hi ? '➕ ग्रुप शुरू करें' : '➕ Start a Group'}
          </Link>
        </div>

        {/* Filters */}
        <div className="filter-panel">
          <h2 className="heading-3">{hi ? 'फ़िल्टर' : 'Filter'}</h2>
          <div className="filter-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
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
              <span className="field-label">{hi ? 'प्रकार' : 'Type'}</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as GroupType | '')}
                className="brutal-select"
              >
                {GROUP_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {hi ? t.labelHi : t.labelEn}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-dot" />
            <span>{hi ? 'लोड हो रहा...' : 'Loading groups...'}</span>
          </div>
        ) : groups.length === 0 ? (
          <div className="brutal-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
            <p style={{ fontSize: '2rem', marginBottom: '12px' }}>👥</p>
            <h3 className="heading-3 mb-2">{hi ? 'कोई ग्रुप नहीं मिला' : 'No groups found'}</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'फ़िल्टर बदलें या पहला ग्रुप बनाएँ!' : 'Change filters or start the first group!'}</p>
            <Link href="/groups/create" className="brutal-btn brutal-btn-primary">
              {hi ? 'ग्रुप शुरू करें' : 'Start a Group'}
            </Link>
          </div>
        ) : (
          <>
            <p className="results-count mb-4">
              {groups.length} {hi ? 'ग्रुप मिले' : `group${groups.length === 1 ? '' : 's'} found`}
            </p>
            <div className="result-list">
              {groups.map((g) => (
                <Link
                  key={g.id}
                  href={`/groups/${g.id}`}
                  className="brutal-card block"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="badge-row mb-2">
                        <span className={`brutal-badge ${typeBadgeClass(g.group_type)}`}>
                          {GROUP_TYPES.find((t) => t.value === g.group_type)?.[hi ? 'labelHi' : 'labelEn'] || g.group_type}
                        </span>
                        <span className="brutal-badge">{g.city}</span>
                      </div>
                      <h3 className="heading-3 mb-1">{g.name}</h3>
                      {(g.purpose || g.description) && (
                        <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">{g.purpose || g.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-[var(--color-text-muted)]">
                        <span>
                          <span className="font-mono font-bold text-[var(--color-text)]">{g.member_count || 0}</span>{' '}
                          {hi ? 'सदस्य' : 'members'}
                        </span>
                        <span>
                          <span className="font-mono font-bold text-[var(--color-text)]">{g.action_count || 0}</span>{' '}
                          {hi ? 'एक्शन' : 'actions'}
                        </span>
                        {g.chat_link && (
                          <span className="text-[var(--color-accent)] font-bold">
                            💬 {hi ? 'चैट उपलब्ध' : 'Chat available'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Bottom links */}
        <div className="mt-10 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          <Link href="/organize" className="brutal-btn brutal-btn-lg text-center">
            {hi ? '📖 संगठन गाइड' : '📖 Organizing Guide'}
          </Link>
          <Link href="/communication" className="brutal-btn brutal-btn-lg text-center">
            {hi ? '📱 संचार गाइड' : '📱 Comms Guide'}
          </Link>
        </div>
      </div>
    </div>
  );
}
