'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PublicChapter, Locale, Category } from '@/types';
import { CITIES_AREAS, CATEGORIES } from '@/lib/constants';

interface DirectoryClientProps { locale: Locale }

export default function DirectoryClient({ locale }: DirectoryClientProps) {
  const [chapters, setChapters] = useState<PublicChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [contacting, setContacting] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const hi = locale === 'hi';

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const params = new URLSearchParams();
        if (city) params.set('city', city);
        if (category) params.set('category', category);
        const response = await fetch(`/api/chapters?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error('load failed');
        const data = await response.json();
        setChapters(data.chapters || []); setLoadError(false);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) { setChapters([]); setLoadError(true); }
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }
    load();
    return () => controller.abort();
  }, [city, category]);

  const query = search.trim().toLocaleLowerCase(hi ? 'hi-IN' : 'en-IN');
  const shown = chapters.filter((chapter) => !query || [chapter.name, chapter.description, chapter.area].some((value) => value?.toLocaleLowerCase(hi ? 'hi-IN' : 'en-IN').includes(query)));
  function categoryLabel(value: Category) { const item = CATEGORIES.find((entry) => entry.value === value); return item ? (hi ? item.labelHi : item.labelEn) : value; }

  return <section aria-labelledby="directory-search-title">
    <div className="filter-panel"><h2 id="directory-search-title" className="heading-3">{hi ? 'समूह खोजें' : 'Search groups'}</h2><div className="filter-grid filter-grid-three">
      <label><span>{hi ? 'नाम या क्षेत्र' : 'Name or area'}</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} className="brutal-input" placeholder={hi ? 'खोजें' : 'Search'} /></label>
      <label><span>{hi ? 'शहर' : 'City'}</span><select value={city} onChange={(event) => { setLoading(true); setCity(event.target.value); }} className="brutal-select"><option value="">{hi ? 'सभी शहर' : 'All cities'}</option>{CITIES_AREAS.map((item) => <option key={item.city}>{item.city}</option>)}</select></label>
      <label><span>{hi ? 'सहायता का प्रकार' : 'Type of help'}</span><select value={category} onChange={(event) => { setLoading(true); setCategory(event.target.value); }} className="brutal-select"><option value="">{hi ? 'सभी प्रकार' : 'All types'}</option>{CATEGORIES.map((item) => <option key={item.value} value={item.value}>{hi ? item.labelHi : item.labelEn}</option>)}</select></label>
    </div></div>
    {loading ? <div className="loading-state" role="status"><span className="loading-dot" aria-hidden="true" />{hi ? 'समूह लोड हो रहे हैं…' : 'Loading groups…'}</div>
      : loadError ? <div className="error-state" role="alert"><h2>{hi ? 'समूह लोड नहीं हुए' : 'Groups did not load'}</h2><p>{hi ? 'अपना कनेक्शन देखें और पेज फिर से लोड करें।' : 'Check your connection and reload the page.'}</p><button type="button" onClick={() => window.location.reload()} className="brutal-btn brutal-btn-primary">{hi ? 'फिर लोड करें' : 'Reload'}</button></div>
      : shown.length === 0 ? <div className="empty-state"><h2>{hi ? 'कोई समूह नहीं मिला' : 'No groups found'}</h2><p>{hi ? 'खोज या फ़िल्टर बदलें। अगर कोई समूह गायब है, तो अधिकृत वयस्क उसे जमा कर सकता है।' : 'Change your search or filters. If a group is missing, an authorized adult can submit it.'}</p><Link href="/submit-chapter" className="brutal-btn">{hi ? 'समूह जोड़ें' : 'Add a group'}</Link></div>
      : <div className="result-list" aria-live="polite"><p className="results-count">{hi ? `${shown.length} समूह मिले` : `${shown.length} group${shown.length === 1 ? '' : 's'} found`}</p>{shown.map((chapter) => <article key={chapter.id} className="result-card">
        <h2 className="result-title">{chapter.name}</h2><p className="result-location">{chapter.city} · {chapter.area}</p>{chapter.description && <p className="result-description">{chapter.description}</p>}<div className="badge-row" aria-label={hi ? 'सेवाएँ' : 'Services'}>{chapter.categories.map((item) => <span key={item} className="brutal-badge brutal-badge-sky">{categoryLabel(item as Category)}</span>)}</div><p className="updated-text">{hi ? 'लिस्टिंग अपडेट:' : 'Listing updated:'} {new Intl.DateTimeFormat(hi ? 'hi-IN' : 'en-IN', { dateStyle: 'medium' }).format(new Date(chapter.updated_at))}</p>
        {chapter.contact_method ? (contacting === chapter.id ? <div className="inline-form"><div className="warning-panel"><strong>{hi ? 'साइट छोड़ने से पहले' : 'Before you leave this site'}</strong><p>{hi ? 'यह बाहरी संपर्क है। सहायता या सुरक्षा की गारंटी नहीं है। निजी जानकारी कम दें, अकेले न मिलें, और 18 वर्ष से कम हैं तो भरोसेमंद वयस्क के साथ आगे बढ़ें।' : 'This is an external contact. Help and safety are not guaranteed. Share little private information, never meet alone, and continue with a trusted adult if you are under 18.'}</p></div><label className="check-row"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /><span>{hi ? 'मैंने सुरक्षा संदेश पढ़ा है और मैं 18+ हूँ या भरोसेमंद वयस्क के साथ हूँ।' : 'I read the safety message, and I am 18+ or with a trusted adult.'}</span></label><div className="button-row"><a href={chapter.contact_method} target="_blank" rel="noopener noreferrer" aria-disabled={!confirmed} onClick={(event) => { if (!confirmed) event.preventDefault(); }} className={`brutal-btn brutal-btn-primary ${!confirmed ? 'is-disabled' : ''}`}>{hi ? 'बाहरी संपर्क खोलें' : 'Open external contact'} <span aria-hidden="true">↗</span></a><button type="button" onClick={() => setContacting(null)} className="brutal-btn">{hi ? 'रद्द करें' : 'Cancel'}</button></div></div>
          : <button type="button" onClick={() => { setContacting(chapter.id); setConfirmed(false); }} className="brutal-btn brutal-btn-primary result-primary-action">{hi ? 'सुरक्षित संपर्क करें' : 'Contact safely'}</button>) : <p className="field-help">{hi ? 'इस लिस्टिंग का सुरक्षित सार्वजनिक संपर्क उपलब्ध नहीं है।' : 'This listing has no safe public contact available.'}</p>}
      </article>)}</div>}
  </section>;
}
