'use client';

import { useEffect, useState } from 'react';
import { Post, Locale, Category } from '@/types';
import { CATEGORIES } from '@/lib/constants';

interface Props { locale: Locale }
interface PostWithResponses extends Post { responses?: { id: string; responder_contact: string; responder_message: string; created_at: string }[] }

export default function MyPostsClient({ locale }: Props) {
  const [posts, setPosts] = useState<PostWithResponses[]>([]); const [loading, setLoading] = useState(true); const [loadError, setLoadError] = useState(false); const [updating, setUpdating] = useState<string | null>(null); const [actionError, setActionError] = useState('');
  const hi = locale === 'hi';
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try { const response = await fetch('/api/my-posts', { signal: controller.signal, cache: 'no-store' }); if (!response.ok) throw new Error('failed'); const data = await response.json(); setPosts(data.posts || []); setLoadError(false); }
      catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) setLoadError(true); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    load(); return () => controller.abort();
  }, []);

  async function update(id: string, action: 'extend' | 'resolve') {
    if (updating) return; setUpdating(id); setActionError('');
    try { const response = await fetch('/api/my-posts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, action }) }); if (!response.ok) throw new Error('failed'); const refresh = await fetch('/api/my-posts', { cache: 'no-store' }); if (!refresh.ok) throw new Error('failed'); const data = await refresh.json(); setPosts(data.posts || []); }
    catch { setActionError(hi ? 'बदलाव सेव नहीं हुआ। फिर कोशिश करें।' : 'The change was not saved. Try again.'); }
    finally { setUpdating(null); }
  }
  function label(category: Category) { const item = CATEGORIES.find((entry) => entry.value === category); return item ? (hi ? item.labelHi : item.labelEn) : category; }
  function date(value: string) { return new Intl.DateTimeFormat(hi ? 'hi-IN' : 'en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); }

  if (loading) return <div className="loading-state" role="status"><span className="loading-dot" aria-hidden="true" />{hi ? 'आपकी पोस्ट लोड हो रही हैं…' : 'Loading your posts…'}</div>;
  if (loadError) return <div className="error-state" role="alert"><h2>{hi ? 'पोस्ट लोड नहीं हुईं' : 'Posts did not load'}</h2><p>{hi ? 'अपना कनेक्शन देखें और पेज फिर से लोड करें।' : 'Check your connection and reload the page.'}</p><button type="button" onClick={() => window.location.reload()} className="brutal-btn brutal-btn-primary">{hi ? 'फिर लोड करें' : 'Reload'}</button></div>;
  if (!posts.length) return <div className="empty-state"><h2>{hi ? 'अभी कोई पोस्ट नहीं' : 'No posts yet'}</h2><p>{hi ? 'इस डिवाइस पर पोस्ट बनाने के बाद वह यहाँ दिखेगी।' : 'After you create a post on this device, it will appear here.'}</p><a href="/create-post" className="brutal-btn brutal-btn-primary">{hi ? 'पोस्ट बनाएँ' : 'Create a post'}</a></div>;

  return <div className="result-list">{actionError && <p className="error-message" role="alert">{actionError}</p>}{posts.map((post) => <article key={post.id} className={`result-card ${post.resolved ? 'result-card-resolved' : ''}`}>
    <div className="badge-row"><span className={`brutal-badge ${post.type === 'need' ? 'brutal-badge-red' : 'brutal-badge-lime'}`}>{post.type === 'need' ? (hi ? 'ज़रूरत' : 'Need') : (hi ? 'प्रस्ताव' : 'Offer')}</span><span className="brutal-badge brutal-badge-sky">{label(post.category as Category)}</span>{post.status === 'pending' && <span className="brutal-badge brutal-badge-yellow">{hi ? 'समीक्षा में' : 'In review'}</span>}{post.resolved && <span className="brutal-badge brutal-badge-lime">{hi ? 'बंद' : 'Closed'}</span>}</div>
    <p className="result-description">{post.description}</p><dl className="result-meta"><div><dt>{hi ? 'स्थान' : 'Area'}</dt><dd>{post.city} · {post.area}</dd></div><div><dt>{hi ? 'दिखेगी' : 'Visible until'}</dt><dd>{date(post.expires_at)}</dd></div></dl>
    {!post.resolved && <div className="button-row"><button type="button" onClick={() => update(post.id, 'resolve')} disabled={updating === post.id} className="brutal-btn brutal-btn-success">{hi ? 'मदद मिल गई — बंद करें' : 'Help received — close'}</button><button type="button" onClick={() => update(post.id, 'extend')} disabled={updating === post.id} className="brutal-btn">{hi ? '72 घंटे बढ़ाएँ' : 'Add 72 hours'}</button></div>}
    <section className="responses-section" aria-labelledby={`responses-${post.id}`}><h2 id={`responses-${post.id}`} className="heading-3">{hi ? 'निजी जवाब' : 'Private replies'} ({post.responses?.length || 0})</h2>{!post.responses?.length ? <p className="field-help">{hi ? 'अभी कोई जवाब नहीं।' : 'No replies yet.'}</p> : <div className="response-list">{post.responses.map((response) => <article key={response.id} className="response-card"><p><strong>{hi ? 'संपर्क:' : 'Contact:'}</strong> {response.responder_contact}</p>{response.responder_message && <p>{response.responder_message}</p>}<p className="updated-text">{date(response.created_at)}</p><p className="field-help">{hi ? 'पहचान सत्यापित नहीं है। निजी जानकारी देने या मिलने से पहले भरोसेमंद वयस्क को शामिल करें।' : 'Identity is not verified. Involve a trusted adult before sharing private details or meeting.'}</p></article>)}</div>}</section>
  </article>)}</div>;
}
