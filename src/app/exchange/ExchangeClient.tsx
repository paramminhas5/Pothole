'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { CITIES_AREAS } from '@/lib/constants';

interface Props { locale: Locale; }

interface Volunteer {
  id: string;
  display_name: string;
  skills: string[];
  city: string;
  availability: string;
  hours_per_week: number;
  bio: string;
  tasks_completed: number;
}

interface HelpRequest {
  id: string;
  title: string;
  description: string;
  skill_needed: string;
  city: string;
  urgency: string;
  status: string;
  group_name?: string;
}

const SKILLS = [
  { value: 'legal', en: 'Legal', hi: 'कानूनी', icon: '⚖️' },
  { value: 'medical', en: 'Medical', hi: 'चिकित्सा', icon: '🏥' },
  { value: 'translation', en: 'Translation', hi: 'अनुवाद', icon: '🌐' },
  { value: 'photography', en: 'Photo/Video', hi: 'फोटो/वीडियो', icon: '📷' },
  { value: 'writing', en: 'Writing', hi: 'लेखन', icon: '✍️' },
  { value: 'tech', en: 'Tech', hi: 'तकनीक', icon: '💻' },
  { value: 'design', en: 'Design', hi: 'डिज़ाइन', icon: '🎨' },
  { value: 'transport', en: 'Transport', hi: 'परिवहन', icon: '🚗' },
  { value: 'field', en: 'Field Work', hi: 'फील्ड', icon: '🏃' },
  { value: 'supplies', en: 'Supplies', hi: 'आपूर्ति', icon: '📦' },
  { value: 'training', en: 'Training', hi: 'प्रशिक्षण', icon: '🎓' },
  { value: 'media', en: 'Media', hi: 'मीडिया', icon: '📰' },
];

export default function ExchangeClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [tab, setTab] = useState<'help' | 'volunteers'>('help');
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [skillFilter, setSkillFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => { loadData(); }, [tab, skillFilter, cityFilter]);

  async function loadData() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (skillFilter) params.set('skill', skillFilter);
      if (cityFilter) params.set('city', cityFilter);

      if (tab === 'volunteers') {
        const res = await fetch(`/api/exchange/volunteers?${params}`);
        if (res.ok) { const d = await res.json(); setVolunteers(d.volunteers || []); }
      } else {
        const res = await fetch(`/api/exchange/requests?${params}`);
        if (res.ok) { const d = await res.json(); setRequests(d.requests || []); }
      }
    } catch { /* fallback */ }
    setLoading(false);
  }

  // Fallback data
  useEffect(() => {
    if (!loading && tab === 'help' && requests.length === 0) {
      setRequests([
        { id: '1', title: hi ? 'RTI अपील में कानूनी मदद चाहिए' : 'Need legal help with RTI appeal', description: 'First appeal to Information Commission, need lawyer review', skill_needed: 'legal', city: 'Delhi', urgency: 'this_week', status: 'open', group_name: 'CJP Delhi' },
        { id: '2', title: hi ? 'हिंदी अनुवाद — सुरक्षा गाइड' : 'Hindi translation — safety guide', description: '2-page safety guide needs translation to Hindi', skill_needed: 'translation', city: 'National', urgency: 'flexible', status: 'open' },
        { id: '3', title: hi ? 'प्रोटेस्ट डॉक्यूमेंटेशन — वीडियोग्राफर' : 'Protest documentation — videographer', description: 'Need someone to document tomorrow at Jantar Mantar', skill_needed: 'photography', city: 'Delhi', urgency: 'immediate', status: 'open' },
      ]);
    }
    if (!loading && tab === 'volunteers' && volunteers.length === 0) {
      setVolunteers([
        { id: '1', display_name: 'Anon Lawyer', skills: ['legal'], city: 'Delhi', availability: 'weekends_only', hours_per_week: 4, bio: 'Criminal law. Available for RTI and FIR assistance.', tasks_completed: 12 },
        { id: '2', display_name: 'Design Volunteer', skills: ['design', 'tech'], city: 'Bengaluru', availability: 'flexible', hours_per_week: 3, bio: 'UI/UX designer. Can help with posters and social media.', tasks_completed: 5 },
        { id: '3', display_name: 'Field Worker Pune', skills: ['field', 'photography'], city: 'Pune', availability: 'this_week', hours_per_week: 8, bio: 'Ground documentation and evidence gathering.', tasks_completed: 23 },
      ]);
    }
  }, [loading, tab, requests.length, volunteers.length, hi]);

  return (
    <div className="content-page">
      <div className="page-shell">
        {/* Header */}
        <div className="page-heading">
          <h1>{hi ? 'कौशल एक्सचेंज' : 'Skill Exchange'}</h1>
          <p>{hi ? 'कोई भी मदद कर सकता है। कोई अभियान ज़रूरी नहीं। बस दिखाओ।' : 'Anyone can help. No campaign required. Just show up.'}</p>
        </div>

        {/* CTAs */}
        <div className="button-row mb-8">
          <Link href="/exchange/offer" className="brutal-btn brutal-btn-primary brutal-btn-lg">
            {hi ? '🤝 मेरा कौशल दें' : '🤝 Offer My Skills'}
          </Link>
          <Link href="/exchange/request" className="brutal-btn brutal-btn-lg">
            {hi ? '🆘 मदद माँगें' : '🆘 Ask for Help'}
          </Link>
        </div>

        {/* Tab toggle */}
        <div className="segmented-control mb-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <button aria-pressed={tab === 'help'} onClick={() => setTab('help')}>
            {hi ? '🆘 मदद चाहिए' : '🆘 Help Needed'}
          </button>
          <button aria-pressed={tab === 'volunteers'} onClick={() => setTab('volunteers')}>
            {hi ? '🤝 उपलब्ध लोग' : '🤝 Available People'}
          </button>
        </div>

        {/* Skill filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`brutal-btn brutal-btn-sm ${!skillFilter ? 'brutal-btn-dark' : ''}`}
            onClick={() => setSkillFilter('')}
          >{hi ? 'सभी' : 'All'}</button>
          {SKILLS.map(s => (
            <button
              key={s.value}
              className={`brutal-btn brutal-btn-sm ${skillFilter === s.value ? 'brutal-btn-primary' : ''}`}
              onClick={() => setSkillFilter(s.value === skillFilter ? '' : s.value)}
            >{s.icon} {hi ? s.hi : s.en}</button>
          ))}
        </div>

        {/* City filter */}
        <div className="filter-panel mb-6">
          <label>
            <span className="field-label">{hi ? 'शहर' : 'City'}</span>
            <select className="brutal-select" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
              <option value="">{hi ? 'सभी शहर' : 'All cities'}</option>
              {CITIES_AREAS.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}
            </select>
          </label>
        </div>

        {/* Content */}
        {loading ? (
          <div className="loading-state"><div className="loading-dot" /><span>{hi ? 'लोड हो रहा...' : 'Loading...'}</span></div>
        ) : tab === 'help' ? (
          <div className="result-list">
            {requests.length === 0 ? (
              <div className="empty-state">
                <h2>{hi ? 'कोई अनुरोध नहीं' : 'No requests yet'}</h2>
                <p>{hi ? 'कोई मदद नहीं माँगी गई। पहला अनुरोध बनाएं!' : 'No help requested. Create the first request!'}</p>
              </div>
            ) : requests.map(req => (
              <article key={req.id} className={`brutal-card ${req.urgency === 'immediate' ? 'border-l-8 border-l-[var(--color-red)]' : ''}`}>
                <div className="badge-row mb-2">
                  <span className={`brutal-badge ${req.urgency === 'immediate' ? 'brutal-badge-red' : req.urgency === 'today' ? 'brutal-badge-yellow' : 'brutal-badge-sky'}`}>
                    {req.urgency === 'immediate' ? (hi ? '🚨 तुरंत' : '🚨 Immediate') : req.urgency === 'today' ? (hi ? 'आज' : 'Today') : (hi ? 'लचीला' : 'Flexible')}
                  </span>
                  <span className="brutal-badge">{SKILLS.find(s => s.value === req.skill_needed)?.[hi ? 'hi' : 'en'] || req.skill_needed}</span>
                  <span className="brutal-badge">{req.city}</span>
                </div>
                <h3 className="heading-3 mb-1">{req.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">{req.description}</p>
                {req.group_name && <p className="text-xs font-bold text-[var(--color-accent)]">👥 {req.group_name}</p>}
                <button className="brutal-btn brutal-btn-sm brutal-btn-primary mt-3">
                  {hi ? 'मैं मदद कर सकता/सकती हूँ' : 'I can help'}
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="result-list">
            {volunteers.length === 0 ? (
              <div className="empty-state">
                <h2>{hi ? 'कोई वॉलंटियर नहीं' : 'No volunteers yet'}</h2>
                <p>{hi ? 'पहले बनो!' : 'Be the first!'}</p>
              </div>
            ) : volunteers.map(vol => (
              <article key={vol.id} className="brutal-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="heading-3 mb-1">{vol.display_name}</h3>
                    <div className="badge-row mb-2">
                      {vol.skills.map(s => <span key={s} className="brutal-badge brutal-badge-accent">{SKILLS.find(sk => sk.value === s)?.[hi ? 'hi' : 'en'] || s}</span>)}
                      <span className="brutal-badge">{vol.city}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">{vol.bio}</p>
                    <div className="flex gap-4 mt-2 text-xs text-[var(--color-text-muted)]">
                      <span className="font-mono">{vol.hours_per_week}h/{hi ? 'हफ्ता' : 'week'}</span>
                      <span className="font-bold">{vol.tasks_completed} {hi ? 'पूर्ण' : 'completed'}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
