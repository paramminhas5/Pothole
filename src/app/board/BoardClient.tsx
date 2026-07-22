'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PublicPost, Locale, Category, PostType } from '@/types';
import { CITIES_AREAS, CATEGORIES } from '@/lib/constants';

interface BoardClientProps { locale: Locale }
type AsyncState = 'idle' | 'sending' | 'sent' | 'error';

export default function BoardClient({ locale }: BoardClientProps) {
  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [typeFilter, setTypeFilter] = useState<PostType | ''>('');
  const [cityFilter, setCityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [sendState, setSendState] = useState<AsyncState>('idle');
  const [reportingPost, setReportingPost] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportState, setReportState] = useState<AsyncState>('idle');
  const hi = locale === 'hi';

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const params = new URLSearchParams();
        if (typeFilter) params.set('type', typeFilter);
        if (cityFilter) params.set('city', cityFilter);
        if (categoryFilter) params.set('category', categoryFilter);
        const response = await fetch(`/api/posts?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error('load failed');
        const data = await response.json();
        setPosts(data.posts || []);
        setLoadError(false);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setPosts([]);
          setLoadError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [typeFilter, cityFilter, categoryFilter]);

  function startResponse(id: string) {
    setRespondingTo(id); setContact(''); setMessage(''); setConsent(false); setSendState('idle');
  }

  async function submitResponse(event: React.FormEvent, id: string) {
    event.preventDefault();
    if (!contact.trim() || !consent || sendState === 'sending') return;
    setSendState('sending');
    try {
      const response = await fetch('/api/posts/respond', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: id, responder_contact: contact.trim(), responder_message: message.trim(), safety_attested: consent }),
      });
      if (!response.ok) throw new Error('send failed');
      setSendState('sent');
    } catch { setSendState('error'); }
  }

  async function submitReport(event: React.FormEvent, id: string) {
    event.preventDefault();
    if (!reportReason.trim() || reportState === 'sending') return;
    setReportState('sending');
    try {
      const response = await fetch('/api/reports', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_type: 'post', target_id: id, reason: reportReason.trim() }),
      });
      if (!response.ok) throw new Error('report failed');
      setReportState('sent');
    } catch { setReportState('error'); }
  }

  function categoryLabel(category: Category) {
    const item = CATEGORIES.find((entry) => entry.value === category);
    return item ? (hi ? item.labelHi : item.labelEn) : category;
  }

  function visibleUntil(date: string) {
    return new Intl.DateTimeFormat(hi ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(date));
  }

  return (
    <section aria-labelledby="board-results-title">
      <div className="filter-panel">
        <h2 id="board-results-title" className="heading-3">{hi ? 'पोस्ट खोजें' : 'Find a post'}</h2>
        <div className="segmented-control" aria-label={hi ? 'पोस्ट का प्रकार' : 'Post type'}>
          {([['', hi ? 'सभी' : 'All'], ['need', hi ? 'ज़रूरतें' : 'Needs'], ['offer', hi ? 'प्रस्ताव' : 'Offers']] as const).map(([value, label]) => (
            <button key={value} type="button" onClick={() => { setLoading(true); setTypeFilter(value); }} aria-pressed={typeFilter === value}>{label}</button>
          ))}
        </div>
        <div className="filter-grid">
          <label><span>{hi ? 'शहर' : 'City'}</span><select value={cityFilter} onChange={(event) => { setLoading(true); setCityFilter(event.target.value); }} className="brutal-select"><option value="">{hi ? 'सभी शहर' : 'All cities'}</option>{CITIES_AREAS.map((item) => <option key={item.city}>{item.city}</option>)}</select></label>
          <label><span>{hi ? 'सहायता का प्रकार' : 'Type of help'}</span><select value={categoryFilter} onChange={(event) => { setLoading(true); setCategoryFilter(event.target.value); }} className="brutal-select"><option value="">{hi ? 'सभी प्रकार' : 'All types'}</option>{CATEGORIES.map((item) => <option key={item.value} value={item.value}>{hi ? item.labelHi : item.labelEn}</option>)}</select></label>
        </div>
      </div>

      {loading ? <div className="loading-state" role="status"><span className="loading-dot" aria-hidden="true" />{hi ? 'पोस्ट लोड हो रही हैं…' : 'Loading posts…'}</div>
        : loadError ? <div className="error-state" role="alert"><h2>{hi ? 'पोस्ट लोड नहीं हुईं' : 'Posts did not load'}</h2><p>{hi ? 'अपना कनेक्शन देखें और पेज फिर से लोड करें।' : 'Check your connection and reload the page.'}</p><button type="button" onClick={() => window.location.reload()} className="brutal-btn brutal-btn-primary">{hi ? 'फिर लोड करें' : 'Reload'}</button></div>
        : posts.length === 0 ? <div className="empty-state"><h2>{hi ? 'कोई मिलती पोस्ट नहीं' : 'No matching posts'}</h2><p>{hi ? 'फ़िल्टर बदलें या अपनी जरूरत बताएँ।' : 'Change the filters or describe what you need.'}</p><Link href="/create-post" className="brutal-btn brutal-btn-primary">{hi ? 'पोस्ट बनाएँ' : 'Create a post'}</Link></div>
        : <div className="result-list" aria-live="polite">
          <p className="results-count">{hi ? `${posts.length} पोस्ट मिलीं` : `${posts.length} post${posts.length === 1 ? '' : 's'} found`}</p>
          {posts.map((post) => (
            <article key={post.id} className={`result-card ${post.urgency === 'urgent' ? 'result-card-urgent' : ''}`}>
              <div className="result-card-header"><div className="badge-row"><span className={`brutal-badge ${post.type === 'need' ? 'brutal-badge-red' : 'brutal-badge-lime'}`}>{post.type === 'need' ? (hi ? 'ज़रूरत' : 'Need') : (hi ? 'प्रस्ताव' : 'Offer')}</span><span className="brutal-badge brutal-badge-sky">{categoryLabel(post.category as Category)}</span>{post.urgency === 'urgent' && <span className="brutal-badge brutal-badge-yellow">{hi ? 'समय-संवेदनशील' : 'Time-sensitive'}</span>}</div><button type="button" onClick={() => { setReportingPost(post.id); setReportReason(''); setReportState('idle'); }} className="quiet-button">{hi ? 'रिपोर्ट' : 'Report'}</button></div>
              <p className="result-description">{post.description}</p>
              <dl className="result-meta"><div><dt>{hi ? 'स्थान' : 'Area'}</dt><dd>{post.city} · {post.area}</dd></div><div><dt>{hi ? 'दिखेगी' : 'Visible until'}</dt><dd>{visibleUntil(post.expires_at)}</dd></div></dl>

              {reportingPost === post.id && <form onSubmit={(event) => submitReport(event, post.id)} className="inline-form" aria-label={hi ? 'पोस्ट रिपोर्ट करें' : 'Report post'}>
                {reportState === 'sent' ? <><p className="success-message" role="status">{hi ? 'रिपोर्ट भेजी गई। धन्यवाद।' : 'Report sent. Thank you.'}</p><button type="button" onClick={() => setReportingPost(null)} className="quiet-button">{hi ? 'बंद करें' : 'Close'}</button></> : <><label htmlFor={`report-${post.id}`} className="field-label">{hi ? 'क्या गलत है?' : 'What is wrong?'}</label><textarea id={`report-${post.id}`} value={reportReason} onChange={(event) => setReportReason(event.target.value)} required maxLength={300} rows={3} className="brutal-textarea" />{reportState === 'error' && <p className="error-message" role="alert">{hi ? 'रिपोर्ट नहीं गई। फिर कोशिश करें।' : 'The report was not sent. Try again.'}</p>}<div className="button-row"><button type="submit" disabled={reportState === 'sending'} className="brutal-btn brutal-btn-dark">{reportState === 'sending' ? (hi ? 'भेज रहे हैं…' : 'Sending…') : (hi ? 'रिपोर्ट भेजें' : 'Send report')}</button><button type="button" onClick={() => setReportingPost(null)} className="brutal-btn">{hi ? 'रद्द करें' : 'Cancel'}</button></div></>}
              </form>}

              {respondingTo === post.id ? <form onSubmit={(event) => submitResponse(event, post.id)} className="inline-form" aria-label={hi ? 'पोस्ट का जवाब दें' : 'Respond to post'}>
                {sendState === 'sent' ? <div className="success-message" role="status"><strong>{hi ? 'जवाब भेजा गया।' : 'Response sent.'}</strong><p>{hi ? 'पोस्ट करने वाले को आपका संपर्क और संदेश मिलेगा। जवाब का इंतज़ार करें।' : 'The poster will receive your contact and message. Wait for a reply.'}</p><button type="button" onClick={() => setRespondingTo(null)} className="quiet-button">{hi ? 'बंद करें' : 'Close'}</button></div> : <>
                  <div className="warning-panel"><strong>{hi ? 'सुरक्षा जाँच' : 'Safety check'}</strong><p>{hi ? '18 वर्ष से कम हैं तो भरोसेमंद वयस्क से यह जवाब भेजने को कहें। निजी संपर्क देने से पहले जोखिम समझें। अकेले न मिलें।' : 'If you are under 18, ask a trusted adult to send this response. Understand the risk before sharing contact details. Never meet alone.'}</p></div>
                  <label htmlFor={`contact-${post.id}`} className="field-label">{hi ? 'आपसे कैसे संपर्क करें' : 'How to contact you'}</label><input id={`contact-${post.id}`} type="text" value={contact} onChange={(event) => setContact(event.target.value)} required autoComplete="off" className="brutal-input" placeholder={hi ? 'अलग ईमेल या HTTPS मैसेजिंग प्रोफ़ाइल' : 'Dedicated email or HTTPS messaging profile'} /><p className="field-help">{hi ? 'यह सार्वजनिक नहीं होगा। यह केवल पोस्ट करने वाले को भेजा जाएगा। व्यक्तिगत फोन नंबर न दें।' : 'This is not public. It is sent only to the poster. Avoid a personal phone number.'}</p>
                  <label htmlFor={`message-${post.id}`} className="field-label">{hi ? 'छोटा संदेश (वैकल्पिक)' : 'Short message (optional)'}</label><textarea id={`message-${post.id}`} value={message} onChange={(event) => setMessage(event.target.value)} maxLength={300} rows={3} className="brutal-textarea" />
                  <label className="check-row"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><span>{hi ? 'मैं समझता/समझती हूँ कि मेरा संपर्क पोस्ट करने वाले को भेजा जाएगा। मैं 18+ हूँ या भरोसेमंद वयस्क के साथ हूँ।' : 'I understand my contact will be sent to the poster. I am 18+ or I am doing this with a trusted adult.'}</span></label>
                  {sendState === 'error' && <p className="error-message" role="alert">{hi ? 'जवाब नहीं गया। अपना कनेक्शन देखें और फिर कोशिश करें।' : 'Your response was not sent. Check your connection and try again.'}</p>}
                  <div className="button-row"><button type="submit" disabled={sendState === 'sending' || !consent} className="brutal-btn brutal-btn-primary">{sendState === 'sending' ? (hi ? 'भेज रहे हैं…' : 'Sending…') : (hi ? 'जवाब भेजें' : 'Send response')}</button><button type="button" onClick={() => setRespondingTo(null)} className="brutal-btn">{hi ? 'रद्द करें' : 'Cancel'}</button></div>
                </>}
              </form> : <button type="button" onClick={() => startResponse(post.id)} className="brutal-btn brutal-btn-primary result-primary-action">{hi ? 'सुरक्षित जवाब दें' : 'Respond safely'}</button>}
            </article>
          ))}
        </div>}
    </section>
  );
}
