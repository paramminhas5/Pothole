'use client';

import { useState, useEffect } from 'react';

type DirectoryEntry = {
  id: string;
  name: string;
  name_hi: string;
  type: string;
  city: string;
  area: string;
  contact_primary: string;
  website: string;
  description: string;
  description_hi: string;
  specializations: string[];
  languages: string[];
  reliability_score: number;
  upvotes: number;
  downvotes: number;
  feedback_count: number;
  verification_status: string;
  verified_what: string;
  last_confirmed_active: string;
};

const TYPE_LABELS: Record<string, { en: string; hi: string }> = {
  'ngo': { en: 'NGO', hi: 'NGO' },
  'legal-aid': { en: 'Legal Aid', hi: 'कानूनी सहायता' },
  'lawyer': { en: 'Lawyer', hi: 'वकील' },
  'helpline': { en: 'Helpline', hi: 'हेल्पलाइन' },
  'shelter': { en: 'Shelter', hi: 'आश्रय' },
  'hospital': { en: 'Hospital', hi: 'अस्पताल' },
  'mental-health': { en: 'Mental Health', hi: 'मानसिक स्वास्थ्य' },
  'student-union': { en: 'Student Union', hi: 'छात्र संघ' },
  'movement': { en: 'Movement', hi: 'आंदोलन' },
  'media': { en: 'Media', hi: 'मीडिया' },
  'journalist': { en: 'Journalist', hi: 'पत्रकार' },
  'government-office': { en: 'Govt Office', hi: 'सरकारी कार्यालय' },
  'volunteer-org': { en: 'Volunteer Org', hi: 'स्वयंसेवी संगठन' },
  'other': { en: 'Other', hi: 'अन्य' },
};

export function DirectoryClient({ locale = 'en' }: { locale?: string }) {
  const hi = locale === 'hi';
  const [entries, setEntries] = useState<DirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  useEffect(() => { loadDirectory(); }, [city, type]);

  async function loadDirectory() {
    setLoading(true);
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (type) params.set('type', type);
    if (search) params.set('search', search);
    const res = await fetch(`/api/directory?${params}`);
    if (res.ok) { const d = await res.json(); setEntries(d.entries || []); }
    setLoading(false);
  }

  async function submitFeedback(entryId: string, feedbackType: 'upvote' | 'confirm_active' | 'report_inactive') {
    await fetch('/api/directory/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId, type: feedbackType }),
    });
    loadDirectory();
  }

  const verificationBadge = (status: string) => {
    const styles: Record<string, string> = {
      proven_active: 'brutal-badge brutal-badge-lime',
      staff_verified: 'brutal-badge brutal-badge-purple',
      community_vetted: 'brutal-badge brutal-badge-accent',
      unverified: 'brutal-badge',
    };
    const labels: Record<string, { en: string; hi: string }> = {
      proven_active: { en: 'PROVEN ACTIVE', hi: 'सक्रिय प्रमाणित' },
      staff_verified: { en: 'STAFF VERIFIED', hi: 'स्टाफ सत्यापित' },
      community_vetted: { en: 'COMMUNITY VETTED', hi: 'समुदाय सत्यापित' },
      unverified: { en: 'UNVERIFIED', hi: 'असत्यापित' },
    };
    return <span className={styles[status] || 'brutal-badge'}>{hi ? labels[status]?.hi : labels[status]?.en}</span>;
  };

  const freshnessLabel = (lastActive: string) => {
    const days = Math.floor((Date.now() - new Date(lastActive).getTime()) / 86_400_000);
    if (days < 7) return { text: hi ? 'इस हफ्ते सक्रिय' : 'Active this week', color: 'var(--color-lime)' };
    if (days < 30) return { text: hi ? 'इस महीने सक्रिय' : 'Active this month', color: 'var(--color-accent)' };
    if (days < 90) return { text: hi ? `${days} दिन पहले` : `${days} days ago`, color: 'var(--color-yellow)' };
    return { text: hi ? 'पुरानी प्रविष्टि' : 'Stale entry', color: 'var(--color-red)' };
  };

  return (
    <div className="content-page page-shell">
      {/* Header */}
      <div className="page-heading">
        <h1>{hi ? 'निर्देशिका' : 'Directory'}</h1>
        <p>{hi ? 'भारत की सबसे विश्वसनीय नागरिक निर्देशिका। कोई भी जोड़ सकता है। समुदाय सत्यापित करता है। सिर्फ सक्रिय और प्रमाणित।' : "India's most trusted civic directory. Anyone can add. Community vets. Only active and proven."}</p>
      </div>

      {/* Add entry button */}
      <div className="button-row" style={{ marginBottom: '24px' }}>
        <button className="brutal-btn brutal-btn-primary" onClick={() => setShowSubmitForm(!showSubmitForm)}>
          {hi ? '+ प्रविष्टि जोड़ें' : '+ Add Entry'}
        </button>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', alignSelf: 'center' }}>
          {hi ? `${entries.length} प्रविष्टियाँ` : `${entries.length} entries`}
        </span>
      </div>

      {/* Filters */}
      <div className="filter-panel" style={{ marginBottom: '24px' }}>
        <div className="filter-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
          <label>
            <span className="field-label">{hi ? 'खोजें' : 'Search'}</span>
            <input className="brutal-input" type="text" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && loadDirectory()} placeholder={hi ? 'नाम या विवरण...' : 'Name or description...'} />
          </label>
          <label>
            <span className="field-label">{hi ? 'शहर' : 'City'}</span>
            <select className="brutal-select" value={city} onChange={e => setCity(e.target.value)}>
              <option value="">{hi ? 'सभी शहर' : 'All Cities'}</option>
              {['Delhi','Mumbai','Bengaluru','Pune','Chennai','Hyderabad','Kolkata','Jaipur','Lucknow','National'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label>
            <span className="field-label">{hi ? 'प्रकार' : 'Type'}</span>
            <select className="brutal-select" value={type} onChange={e => setType(e.target.value)}>
              <option value="">{hi ? 'सभी प्रकार' : 'All Types'}</option>
              {Object.entries(TYPE_LABELS).map(([val, label]) => <option key={val} value={val}>{hi ? label.hi : label.en}</option>)}
            </select>
          </label>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="loading-state"><div className="loading-dot" /><span>{hi ? 'लोड हो रहा है...' : 'Loading...'}</span></div>
      ) : entries.length === 0 ? (
        <div className="empty-state">
          <h2>{hi ? 'कोई प्रविष्टि नहीं मिली' : 'No entries found'}</h2>
          <p>{hi ? 'फ़िल्टर बदलें या नई प्रविष्टि जोड़ें।' : 'Try different filters or add a new entry.'}</p>
        </div>
      ) : (
        <div className="result-list">
          {entries.map(entry => {
            const freshness = freshnessLabel(entry.last_confirmed_active);
            return (
              <article key={entry.id} className="brutal-card" style={{ padding: '20px' }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 800 }}>
                      {hi && entry.name_hi ? entry.name_hi : entry.name}
                    </h3>
                    <div className="badge-row">
                      <span className="brutal-badge">{hi ? TYPE_LABELS[entry.type]?.hi : TYPE_LABELS[entry.type]?.en || entry.type}</span>
                      <span className="brutal-badge">{entry.city}</span>
                      {entry.specializations.slice(0, 2).map(s => <span key={s} className="brutal-badge brutal-badge-purple">{s}</span>)}
                    </div>
                  </div>
                  {verificationBadge(entry.verification_status)}
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '12px', lineClamp: 3 }}>
                  {hi && entry.description_hi ? entry.description_hi : entry.description}
                </p>

                {/* Reliability & freshness */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.78rem', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>
                    👍 {entry.upvotes} · 👎 {entry.downvotes}
                  </span>
                  <span style={{ fontWeight: 700 }}>
                    Score: <span style={{ color: entry.reliability_score > 5 ? 'var(--color-lime)' : entry.reliability_score < 0 ? 'var(--color-red)' : 'var(--color-text-muted)' }}>{entry.reliability_score}</span>
                  </span>
                  <span style={{ color: freshness.color, fontWeight: 700 }}>{freshness.text}</span>
                </div>

                {/* Verified what */}
                {entry.verified_what && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-accent-2)', fontWeight: 700, marginBottom: '12px' }}>
                    ✓ {entry.verified_what}
                  </p>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px dashed var(--color-border-light)', paddingTop: '12px' }}>
                  {entry.contact_primary && (
                    <a href={entry.contact_primary} className="brutal-btn brutal-btn-sm brutal-btn-primary" target="_blank" rel="noopener">
                      {hi ? 'संपर्क →' : 'Contact →'}
                    </a>
                  )}
                  {entry.website && (
                    <a href={entry.website} className="brutal-btn brutal-btn-sm" target="_blank" rel="noopener">
                      {hi ? 'वेबसाइट' : 'Website'}
                    </a>
                  )}
                  <button className="brutal-btn brutal-btn-sm" onClick={() => submitFeedback(entry.id, 'upvote')}>👍</button>
                  <button className="brutal-btn brutal-btn-sm" onClick={() => submitFeedback(entry.id, 'confirm_active')}>✓ {hi ? 'सक्रिय' : 'Active'}</button>
                  <button className="brutal-btn brutal-btn-sm" onClick={() => submitFeedback(entry.id, 'report_inactive')}>⚠️ {hi ? 'निष्क्रिय' : 'Inactive'}</button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
