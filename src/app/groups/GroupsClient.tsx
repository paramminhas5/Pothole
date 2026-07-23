'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PublicChapter, Locale, Category } from '@/types';
import { CITIES_AREAS, CATEGORIES } from '@/lib/constants';

interface Props { locale: Locale }
type Tab = 'browse' | 'create';

export default function GroupsClient({ locale }: Props) {
  const hi = locale === 'hi';
  const [tab, setTab] = useState<Tab>('browse');
  const [groups, setGroups] = useState<PublicChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [search, setSearch] = useState('');

  // Create form
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const areas = CITIES_AREAS.find((c) => c.city === city)?.areas || [];

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const params = new URLSearchParams();
        if (cityFilter) params.set('city', cityFilter);
        if (catFilter) params.set('category', catFilter);
        const res = await fetch(`/api/chapters?${params}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('fail');
        const data = await res.json();
        setGroups(data.chapters || []);
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
  }, [cityFilter, catFilter]);

  const query = search.trim().toLowerCase();
  const filtered = groups.filter(
    (g) =>
      !query ||
      g.name.toLowerCase().includes(query) ||
      g.description?.toLowerCase().includes(query) ||
      g.area.toLowerCase().includes(query)
  );

  function catLabel(v: Category) {
    const c = CATEGORIES.find((x) => x.value === v);
    return c ? (hi ? c.labelHi : c.labelEn) : v;
  }


  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, city, area, categories,
          contact_method: contact,
          description,
        }),
      });
      if (res.status === 429) { setError(hi ? 'बहुत अधिक प्रयास। कुछ देर बाद।' : 'Too many attempts. Wait a bit.'); return; }
      if (!res.ok) throw new Error('fail');
      setSubmitted(true);
    } catch {
      setError(hi ? 'सबमिट नहीं हुआ। कनेक्शन जाँचें।' : 'Did not submit. Check connection.');
    } finally {
      setSubmitting(false);
    }
  }

  function toggleCat(value: string) {
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  // ─── RENDER ───

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 text-center">
        <div className="brutal-card !max-w-md mx-auto">
          <p className="text-4xl mb-4">✓</p>
          <h2 className="heading-2 mb-2">{hi ? 'ग्रुप जमा हुआ!' : 'Group Submitted!'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'मॉडरेटर जाँचेगा। स्वीकृत होने पर डायरेक्टरी में दिखेगा।' : 'A moderator will review it. It will appear in the directory once approved.'}</p>
          <button type="button" onClick={() => { setSubmitted(false); setTab('browse'); }} className="brutal-btn brutal-btn-primary">{hi ? 'ग्रुप देखें' : 'Browse Groups'}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="heading-display mb-2">{hi ? 'ग्रुप' : 'Groups'}</h1>
        <p className="text-[var(--color-text-muted)]">{hi ? 'मौजूदा ग्रुप खोजें या अपना बनाएँ। मॉडरेट, पारदर्शी, सत्यापित।' : 'Find existing groups or create your own. Moderated, transparent, verified.'}</p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        <button type="button" onClick={() => setTab('browse')} className={`brutal-btn ${tab === 'browse' ? 'brutal-btn-primary' : ''}`}>{hi ? '🔍 ग्रुप खोजें' : '🔍 Browse Groups'}</button>
        <button type="button" onClick={() => setTab('create')} className={`brutal-btn ${tab === 'create' ? 'brutal-btn-primary' : ''}`}>{hi ? '➕ ग्रुप बनाएँ' : '➕ Create Group'}</button>
      </div>


      {/* BROWSE TAB */}
      {tab === 'browse' && (
        <div>
          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-3 mb-6">
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={hi ? 'नाम या क्षेत्र खोजें...' : 'Search name or area...'} className="brutal-input" />
            <select value={cityFilter} onChange={(e) => { setLoading(true); setCityFilter(e.target.value); }} className="brutal-select">
              <option value="">{hi ? 'सभी शहर' : 'All cities'}</option>
              {CITIES_AREAS.map((c) => <option key={c.city}>{c.city}</option>)}
            </select>
            <select value={catFilter} onChange={(e) => { setLoading(true); setCatFilter(e.target.value); }} className="brutal-select">
              <option value="">{hi ? 'सभी प्रकार' : 'All types'}</option>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{hi ? c.labelHi : c.labelEn}</option>)}
            </select>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12 text-[var(--color-text-muted)]">{hi ? 'लोड हो रहा...' : 'Loading...'}</div>
          ) : filtered.length === 0 ? (
            <div className="brutal-card text-center">
              <h3 className="heading-3 mb-2">{hi ? 'कोई ग्रुप नहीं मिला' : 'No groups found'}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">{hi ? 'फ़िल्टर बदलें या अपना ग्रुप बनाएँ।' : 'Change filters or create your own group.'}</p>
              <button type="button" onClick={() => setTab('create')} className="brutal-btn brutal-btn-primary">{hi ? 'ग्रुप बनाएँ' : 'Create Group'}</button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[var(--color-text-muted)]">{filtered.length} {hi ? 'ग्रुप मिले' : `group${filtered.length === 1 ? '' : 's'} found`}</p>
              {filtered.map((g) => (
                <article key={g.id} className="brutal-card">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{g.name}</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">{g.city} · {g.area}</p>
                      {g.description && <p className="text-sm mt-2">{g.description}</p>}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {g.categories.map((c) => (
                          <span key={c} className="brutal-badge brutal-badge-sky text-xs">{catLabel(c as Category)}</span>
                        ))}
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-2">{hi ? 'अपडेट:' : 'Updated:'} {new Intl.DateTimeFormat(hi ? 'hi-IN' : 'en-IN', { dateStyle: 'medium' }).format(new Date(g.updated_at))}</p>
                    </div>
                    {g.contact_method && (
                      <a href={g.contact_method} target="_blank" rel="noopener noreferrer" className="brutal-btn brutal-btn-primary text-sm whitespace-nowrap">{hi ? 'जुड़ें ↗' : 'Join ↗'}</a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-8 brutal-card text-center">
            <p className="text-sm mb-3">{hi ? 'अपना ग्रुप यहाँ नहीं है?' : "Your group isn't here?"}</p>
            <button type="button" onClick={() => setTab('create')} className="brutal-btn brutal-btn-primary">{hi ? 'ग्रुप रजिस्टर करें' : 'Register Your Group'}</button>
          </div>
        </div>
      )}


      {/* CREATE TAB */}
      {tab === 'create' && (
        <div>
          <div className="brutal-card mb-6">
            <h2 className="heading-3 mb-2">{hi ? 'ग्रुप रजिस्टर करें' : 'Register Your Group'}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{hi ? 'मॉडरेटर जाँचेगा। स्वीकृत होने पर सबको दिखेगा। कोई निजी फोन नंबर न दें।' : 'A moderator will review. Once approved, it will be visible to everyone. Do not give personal phone numbers.'}</p>
          </div>

          <form onSubmit={handleCreate} className="space-y-4">
            <label className="block">
              <span className="field-label">{hi ? 'ग्रुप का नाम' : 'Group Name'} *</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength={200} className="brutal-input" placeholder={hi ? 'जैसे: दिल्ली छात्र एकता नेटवर्क' : 'e.g. Delhi Student Unity Network'} />
            </label>

            <div className="grid md:grid-cols-2 gap-3">
              <label className="block">
                <span className="field-label">{hi ? 'शहर' : 'City'} *</span>
                <select value={city} onChange={(e) => { setCity(e.target.value); setArea(''); }} required className="brutal-select">
                  <option value="">{hi ? 'चुनें' : 'Select'}</option>
                  {CITIES_AREAS.map((c) => <option key={c.city}>{c.city}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="field-label">{hi ? 'क्षेत्र' : 'Area'} *</span>
                <select value={area} onChange={(e) => setArea(e.target.value)} required disabled={!city} className="brutal-select">
                  <option value="">{hi ? 'चुनें' : 'Select'}</option>
                  {areas.map((a) => <option key={a}>{a}</option>)}
                </select>
              </label>
            </div>

            <fieldset>
              <legend className="field-label mb-2">{hi ? 'क्या करते हैं? (सभी चुनें जो लागू)' : 'What do you do? (select all that apply)'} *</legend>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {CATEGORIES.map((c) => (
                  <label key={c.value} className={`p-2 border rounded text-xs cursor-pointer ${categories.includes(c.value) ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
                    <input type="checkbox" checked={categories.includes(c.value)} onChange={() => toggleCat(c.value)} className="sr-only" />
                    {hi ? c.labelHi : c.labelEn}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="field-label">{hi ? 'सार्वजनिक संपर्क (लिंक)' : 'Public Contact (link)'} *</span>
              <input type="url" value={contact} onChange={(e) => setContact(e.target.value)} required className="brutal-input" placeholder={hi ? 'Signal/Telegram/WhatsApp ग्रुप लिंक या ईमेल' : 'Signal/Telegram/WhatsApp group link or email'} />
              <span className="text-xs text-[var(--color-text-muted)]">{hi ? '⚠️ व्यक्तिगत फोन नंबर न दें। ग्रुप लिंक या dedicated ईमेल दें।' : '⚠️ Do not give personal phone number. Give group link or dedicated email.'}</span>
            </label>

            <label className="block">
              <span className="field-label">{hi ? 'विवरण (वैकल्पिक)' : 'Description (optional)'}</span>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} rows={3} className="brutal-textarea" placeholder={hi ? 'ग्रुप क्या करता है, कैसे मदद करता है...' : 'What the group does, how it helps...'} />
            </label>

            {error && <p className="error-message" role="alert">{error}</p>}

            <button type="submit" disabled={submitting || !name || !city || !area || categories.length === 0 || !contact} className="brutal-btn brutal-btn-primary brutal-btn-lg w-full">
              {submitting ? (hi ? 'भेज रहे...' : 'Submitting...') : (hi ? 'ग्रुप रजिस्टर करें' : 'Register Group')}
            </button>
          </form>

          <div className="brutal-card mt-6 text-sm">
            <strong>{hi ? 'मॉडरेशन:' : 'Moderation:'}</strong>
            <ul className="mt-2 space-y-1">
              <li>✓ {hi ? 'ग्रुप नाम और विवरण उचित हो' : 'Group name and description appropriate'}</li>
              <li>✓ {hi ? 'संपर्क लिंक काम करता हो' : 'Contact link works'}</li>
              <li>✓ {hi ? 'कोई हिंसा, घृणा, या अवैध गतिविधि नहीं' : 'No violence, hate, or illegal activity'}</li>
              <li>✓ {hi ? 'व्यक्तिगत फोन नंबर नहीं' : 'No personal phone numbers'}</li>
            </ul>
          </div>
        </div>
      )}

      {/* GUIDE LINK */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Link href="/organize" className="brutal-btn brutal-btn-lg text-center">{hi ? '📖 संगठन गाइड' : '📖 Organizing Guide'}</Link>
        <Link href="/communication" className="brutal-btn brutal-btn-lg text-center">{hi ? '📱 संचार गाइड' : '📱 Comms Guide'}</Link>
      </div>
    </div>
  );
}
