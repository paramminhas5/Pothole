'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { CITIES_AREAS } from '@/lib/constants';

interface Demand {
  id: string;
  title: string;
  target: string;
  city: string;
  category: string;
  status: string;
  deadline: string;
  filed_by: string;
  rtis_filed: number;
  days_elapsed: number;
  escalation_level: string;
  created_at: string;
}

type Tab = 'browse' | 'create';

const STATUS_CONFIG: Record<string, { label: string; labelHi: string; color: string }> = {
  submitted: { label: 'Submitted', labelHi: 'जमा', color: 'bg-gray-200 text-gray-800' },
  acknowledged: { label: 'Acknowledged', labelHi: 'स्वीकृत', color: 'bg-blue-100 text-blue-800' },
  action: { label: 'Action Taken', labelHi: 'कार्रवाई', color: 'bg-yellow-100 text-yellow-800' },
  resolved: { label: 'Resolved', labelHi: 'समाधान', color: 'bg-green-100 text-green-800' },
  escalated: { label: 'Escalated', labelHi: 'एस्केलेट', color: 'bg-red-100 text-red-800' },
  expired: { label: 'Expired', labelHi: 'समाप्त', color: 'bg-gray-100 text-gray-500' },
};

const DEMAND_CATEGORIES = [
  { value: 'education', en: 'Education', hi: 'शिक्षा' },
  { value: 'governance', en: 'Governance', hi: 'शासन' },
  { value: 'rights', en: 'Rights', hi: 'अधिकार' },
  { value: 'environment', en: 'Environment', hi: 'पर्यावरण' },
  { value: 'labor', en: 'Labor', hi: 'श्रम' },
  { value: 'health', en: 'Health', hi: 'स्वास्थ्य' },
  { value: 'infrastructure', en: 'Infrastructure', hi: 'बुनियादी ढाँचा' },
  { value: 'housing', en: 'Housing', hi: 'आवास' },
  { value: 'digital', en: 'Digital Rights', hi: 'डिजिटल अधिकार' },
  { value: 'other', en: 'Other', hi: 'अन्य' },
];

export default function DemandsClient({ locale }: { locale: Locale }) {
  const hi = locale === 'hi';
  const [tab, setTab] = useState<Tab>('browse');
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Create form state
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [filedBy, setFiledBy] = useState('');
  const [evidence, setEvidence] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const params = new URLSearchParams();
        if (cityFilter) params.set('city', cityFilter);
        if (statusFilter) params.set('status', statusFilter);
        const res = await fetch(`/api/demands?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error('fail');
        const data = await res.json();
        setDemands(data.demands || []);
      } catch (e) {
        if (!(e instanceof DOMException && e.name === 'AbortError')) {
          setDemands([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [cityFilter, statusFilter]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, target, city, category, deadline, description, filed_by: filedBy, evidence }),
      });
      if (res.status === 429) { setError(hi ? 'बहुत अधिक प्रयास। एक दिन में अधिकतम 3 माँगें।' : 'Too many attempts. Max 3 demands per day.'); return; }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || (hi ? 'जमा नहीं हुआ।' : 'Failed to submit.'));
        return;
      }
      setSubmitted(true);
    } catch {
      setError(hi ? 'नेटवर्क त्रुटि। कनेक्शन जाँचें।' : 'Network error. Check connection.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 text-center">
        <div className="brutal-card !max-w-md mx-auto">
          <p className="text-4xl mb-4">✓</p>
          <h2 className="heading-2 mb-2">{hi ? 'माँग दर्ज हुई!' : 'Demand Filed!'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'अब RTI दाखिल करें और ट्रैक करें। 30 दिन में जवाब न आए → एस्केलेट।' : 'Now file an RTI and track it. No response in 30 days → escalate.'}</p>
          <div className="flex gap-2 justify-center">
            <button type="button" onClick={() => { setSubmitted(false); setTab('browse'); }} className="brutal-btn brutal-btn-primary">{hi ? 'माँगें देखें' : 'View Demands'}</button>
            <Link href="/rti" className="brutal-btn">{hi ? 'RTI दाखिल करें' : 'File RTI'}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'डिमांड ट्रैकर' : 'Demand Tracker'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'माँगें बनाएँ, ट्रैक करें, एस्केलेट करें। संस्थाओं को जवाबदेह बनाएँ।' : 'Create demands, track them, escalate. Hold institutions accountable.'}</p>
      </div>

      {/* HOW IT WORKS */}
      <div className="brutal-card mb-6">
        <h2 className="heading-3 mb-3">{hi ? 'कैसे काम करता है' : 'How It Works'}</h2>
        <div className="flex flex-wrap gap-2 text-xs items-center">
          <span className="px-2 py-1 bg-gray-200 rounded font-bold">{hi ? 'माँग लिखें' : 'Write Demand'}</span><span>→</span>
          <span className="px-2 py-1 bg-blue-100 rounded font-bold">RTI {hi ? 'दाखिल' : 'Filed'}</span><span>→</span>
          <span className="px-2 py-1 bg-yellow-100 rounded font-bold">30 {hi ? 'दिन' : 'days'}</span><span>→</span>
          <span className="px-2 py-1 bg-orange-100 rounded font-bold">{hi ? 'अपील' : 'Appeal'}</span><span>→</span>
          <span className="px-2 py-1 bg-red-100 rounded font-bold">{hi ? 'एस्केलेट' : 'Escalate'}</span><span>→</span>
          <span className="px-2 py-1 bg-green-100 rounded font-bold">{hi ? 'समाधान' : 'Resolved'}</span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        <button type="button" onClick={() => setTab('browse')} className={`brutal-btn ${tab === 'browse' ? 'brutal-btn-primary' : ''}`}>{hi ? '📋 माँगें देखें' : '📋 Browse Demands'}</button>
        <button type="button" onClick={() => setTab('create')} className={`brutal-btn ${tab === 'create' ? 'brutal-btn-primary' : ''}`}>{hi ? '➕ माँग दर्ज करें' : '➕ File Demand'}</button>
      </div>

      {/* BROWSE TAB */}
      {tab === 'browse' && (
        <div>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <select value={cityFilter} onChange={(e) => { setLoading(true); setCityFilter(e.target.value); }} className="brutal-select">
              <option value="">{hi ? 'सभी शहर' : 'All Cities'}</option>
              {CITIES_AREAS.map(c => <option key={c.city}>{c.city}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => { setLoading(true); setStatusFilter(e.target.value); }} className="brutal-select">
              <option value="">{hi ? 'सभी स्थिति' : 'All Status'}</option>
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <option key={key} value={key}>{hi ? cfg.labelHi : cfg.label}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12 text-[var(--color-text-muted)]">{hi ? 'लोड हो रहा...' : 'Loading...'}</div>
          ) : demands.length === 0 ? (
            <div className="brutal-card text-center">
              <h3 className="heading-3 mb-2">{hi ? 'कोई माँग नहीं मिली' : 'No demands found'}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'पहली माँग दर्ज करें!' : 'File the first demand!'}</p>
              <button type="button" onClick={() => setTab('create')} className="brutal-btn brutal-btn-primary">{hi ? 'माँग दर्ज करें' : 'File Demand'}</button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[var(--color-text-muted)]">{demands.length} {hi ? 'माँगें' : 'demands'}</p>
              {demands.map((demand) => (
                <article key={demand.id} className="brutal-card">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-bold flex-1">{demand.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded font-bold whitespace-nowrap ${STATUS_CONFIG[demand.status]?.color || 'bg-gray-200'}`}>
                      {hi ? STATUS_CONFIG[demand.status]?.labelHi : STATUS_CONFIG[demand.status]?.label || demand.status}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-2">{hi ? 'लक्ष्य:' : 'Target:'} {demand.target} · {demand.city}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <span><strong>{hi ? 'समयसीमा:' : 'Deadline:'}</strong> {new Date(demand.deadline).toLocaleDateString()}</span>
                    <span><strong>{hi ? 'दिन:' : 'Days:'}</strong> {demand.days_elapsed}</span>
                    <span><strong>RTIs:</strong> {demand.rtis_filed}</span>
                    <span><strong>{hi ? 'स्तर:' : 'Level:'}</strong> {demand.escalation_level}</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? 'दाखिलकर्ता:' : 'Filed by:'} {demand.filed_by}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CREATE TAB */}
      {tab === 'create' && (
        <div>
          <div className="brutal-card mb-6 !border-[var(--color-primary)]">
            <h2 className="heading-3 mb-2">{hi ? 'माँग का फॉर्मूला' : 'Demand Formula'}</h2>
            <p className="font-mono text-sm bg-[var(--color-surface-alt)] p-3 rounded">[{hi ? 'कौन' : 'WHO'}] + [{hi ? 'क्या करे' : 'does WHAT'}] + [{hi ? 'कब तक' : 'by WHEN'}]</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? 'उदाहरण: "NTA प्रमुख 30 जुलाई तक सभी लीक परीक्षाओं की जाँच रिपोर्ट सार्वजनिक करें।"' : 'Example: "NTA chief publicly release investigation report of all leaked exams by July 30."'}</p>
          </div>

          <form onSubmit={handleCreate} className="space-y-4">
            <label className="block">
              <span className="field-label">{hi ? 'माँग (स्पष्ट, एक वाक्य)' : 'Demand (clear, one sentence)'} *</span>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={300} className="brutal-input" placeholder={hi ? 'जैसे: NTA अध्यक्ष इस्तीफा दें' : 'e.g. NTA Chairman must resign'} />
            </label>

            <label className="block">
              <span className="field-label">{hi ? 'लक्ष्य (किससे माँग)' : 'Target (from whom)'} *</span>
              <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} required maxLength={200} className="brutal-input" placeholder={hi ? 'जैसे: शिक्षा मंत्री' : 'e.g. Education Minister'} />
            </label>

            <div className="grid md:grid-cols-3 gap-3">
              <label className="block">
                <span className="field-label">{hi ? 'शहर' : 'City'} *</span>
                <select value={city} onChange={(e) => setCity(e.target.value)} required className="brutal-select">
                  <option value="">{hi ? 'चुनें' : 'Select'}</option>
                  {CITIES_AREAS.map(c => <option key={c.city}>{c.city}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="field-label">{hi ? 'श्रेणी' : 'Category'} *</span>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required className="brutal-select">
                  <option value="">{hi ? 'चुनें' : 'Select'}</option>
                  {DEMAND_CATEGORIES.map(c => <option key={c.value} value={c.value}>{hi ? c.hi : c.en}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="field-label">{hi ? 'समयसीमा' : 'Deadline'} *</span>
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required min={new Date().toISOString().split('T')[0]} className="brutal-input" />
              </label>
            </div>

            <label className="block">
              <span className="field-label">{hi ? 'दाखिलकर्ता (वैकल्पिक)' : 'Filed by (optional)'}</span>
              <input type="text" value={filedBy} onChange={(e) => setFiledBy(e.target.value)} maxLength={100} className="brutal-input" placeholder={hi ? 'ग्रुप या व्यक्ति नाम' : 'Group or individual name'} />
            </label>

            <label className="block">
              <span className="field-label">{hi ? 'विवरण (वैकल्पिक)' : 'Description (optional)'}</span>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={1000} rows={3} className="brutal-textarea" placeholder={hi ? 'संदर्भ, पृष्ठभूमि, क्यों ज़रूरी...' : 'Context, background, why it matters...'} />
            </label>

            <label className="block">
              <span className="field-label">{hi ? 'सबूत / RTI संदर्भ (वैकल्पिक)' : 'Evidence / RTI references (optional)'}</span>
              <textarea value={evidence} onChange={(e) => setEvidence(e.target.value)} maxLength={2000} rows={2} className="brutal-textarea" placeholder={hi ? 'RTI नंबर, मीडिया लिंक, दस्तावेज़...' : 'RTI numbers, media links, documents...'} />
            </label>

            {error && <p className="error-message" role="alert">{error}</p>}

            <button type="submit" disabled={submitting || !title || !target || !city || !category || !deadline} className="brutal-btn brutal-btn-primary brutal-btn-lg w-full">
              {submitting ? (hi ? 'जमा हो रहा...' : 'Submitting...') : (hi ? 'माँग दर्ज करें' : 'File Demand')}
            </button>
          </form>

          <div className="brutal-card mt-6 text-sm">
            <strong>{hi ? 'अगला कदम:' : 'Next steps:'}</strong>
            <ol className="mt-2 list-decimal list-inside space-y-1">
              <li>{hi ? 'माँग दर्ज करें' : 'File the demand'}</li>
              <li>{hi ? 'RTI दाखिल करें (Sahayata RTI जनरेटर से)' : 'File RTI (using Sahayata RTI Generator)'}</li>
              <li>{hi ? '30 दिन इंतज़ार → जवाब नहीं → प्रथम अपील' : '30 days wait → no response → First Appeal'}</li>
              <li>{hi ? 'CIC शिकायत → ₹250/दिन जुर्माना' : 'CIC complaint → ₹250/day penalty'}</li>
              <li>{hi ? 'संसदीय प्रश्न / PIL' : 'Parliamentary question / PIL'}</li>
            </ol>
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/rti" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'RTI दाखिल →' : 'FILE RTI →'}</Link>
        <Link href="/governance" className="brutal-btn brutal-btn-lg text-center">{hi ? 'स्कोरकार्ड →' : 'SCORECARD →'}</Link>
        <Link href="/playbook" className="brutal-btn brutal-btn-lg text-center">{hi ? 'प्लेबुक →' : 'PLAYBOOK →'}</Link>
      </div>
    </div>
  );
}
