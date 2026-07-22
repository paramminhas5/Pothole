'use client';

import { useCallback, useEffect, useState } from 'react';
import { Chapter, Post, Locale, Category } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { detectPII } from '@/lib/moderation';

interface AdminClientProps { locale: Locale }
type Tab = 'chapters' | 'posts';
type AuthState = 'checking' | 'signed-out' | 'signed-in';

export default function AdminClient({ locale }: AdminClientProps) {
  const [secret, setSecret] = useState('');
  const [authState, setAuthState] = useState<AuthState>('checking');
  const [tab, setTab] = useState<Tab>('chapters');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isHindi = locale === 'hi';

  const fetchData = useCallback(async (currentTab: Tab) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/${currentTab}`, { cache: 'no-store' });
      if (response.status === 401) {
        setAuthState('signed-out');
        return;
      }
      if (!response.ok) throw new Error('load failed');
      const data = await response.json();
      if (currentTab === 'chapters') setChapters(data.chapters || []);
      else setPosts(data.posts || []);
    } catch {
      setError(isHindi ? 'मॉडरेशन कतार लोड नहीं हुई।' : 'The moderation queue did not load.');
    } finally {
      setLoading(false);
    }
  }, [isHindi]);

  useEffect(() => {
    const controller = new AbortController();
    async function checkSession() {
      try {
        const response = await fetch('/api/admin/session', { cache: 'no-store', signal: controller.signal });
        const data = response.ok ? await response.json() : { authenticated: false };
        if (!controller.signal.aborted) {
          const authenticated = data.authenticated === true;
          setAuthState(authenticated ? 'signed-in' : 'signed-out');
          if (authenticated) await fetchData('chapters');
        }
      } catch {
        if (!controller.signal.aborted) setAuthState('signed-out');
      }
    }
    void checkSession();
    return () => controller.abort();
  }, [fetchData]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });
      if (!response.ok) throw new Error('login failed');
      setSecret('');
      setAuthState('signed-in');
      await fetchData(tab);
    } catch {
      setError(isHindi ? 'लॉग इन नहीं हुआ। जानकारी जाँचें और फिर कोशिश करें।' : 'Sign-in failed. Check the details and try again.');
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/session', { method: 'DELETE' });
    setAuthState('signed-out');
    setChapters([]);
    setPosts([]);
  }

  async function handleAction(type: Tab, id: string, action: 'approve' | 'reject') {
    setError('');
    try {
      const response = await fetch(`/api/admin/${type}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });
      if (response.status === 401) {
        setAuthState('signed-out');
        return;
      }
      if (!response.ok) throw new Error('action failed');
      if (type === 'chapters') setChapters((items) => items.filter((item) => item.id !== id));
      else setPosts((items) => items.filter((item) => item.id !== id));
    } catch {
      setError(isHindi ? 'फैसला सेव नहीं हुआ। फिर कोशिश करें।' : 'The decision was not saved. Try again.');
    }
  }

  function categoryLabel(category: Category) {
    const found = CATEGORIES.find((item) => item.value === category);
    return found ? (isHindi ? found.labelHi : found.labelEn) : category;
  }

  if (authState === 'checking') {
    return <div className="loading-state" role="status"><span className="loading-dot" aria-hidden="true" />{isHindi ? 'सुरक्षित सत्र जाँच रहे हैं…' : 'Checking secure session…'}</div>;
  }

  if (authState === 'signed-out') {
    return (
      <form onSubmit={handleLogin} className="stack-form max-w-md mx-auto">
        <div className="brutal-card-flat">
          <h2 className="heading-3 mb-4">{isHindi ? 'मॉडरेशन लॉग इन' : 'Moderator sign in'}</h2>
          <label htmlFor="admin-secret" className="field-label">{isHindi ? 'मॉडरेशन पासवर्ड' : 'Moderation password'}</label>
          <input id="admin-secret" type="password" value={secret} onChange={(event) => setSecret(event.target.value)} required minLength={24} autoComplete="current-password" className="brutal-input mt-2" />
          <p className="field-help mt-2">{isHindi ? 'पासवर्ड इस ब्राउज़र स्टोरेज में सेव नहीं होगा।' : 'The password is not saved in browser storage.'}</p>
          {error && <p className="error-message mt-4" role="alert">{error}</p>}
          <button type="submit" disabled={loading} className="brutal-btn brutal-btn-dark w-full mt-4">{loading ? (isHindi ? 'जाँच रहे हैं…' : 'Checking…') : (isHindi ? 'लॉग इन करें' : 'Sign in')}</button>
        </div>
      </form>
    );
  }

  const items = tab === 'chapters' ? chapters : posts;
  return (
    <section aria-label={isHindi ? 'मॉडरेशन कतार' : 'Moderation queue'}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="button-row" role="tablist" aria-label={isHindi ? 'कतार चुनें' : 'Choose queue'}>
          <button type="button" role="tab" aria-selected={tab === 'chapters'} onClick={() => { setTab('chapters'); void fetchData('chapters'); }} className={`brutal-btn ${tab === 'chapters' ? 'brutal-btn-dark' : ''}`}>{isHindi ? 'समूह' : 'Groups'} ({chapters.length})</button>
          <button type="button" role="tab" aria-selected={tab === 'posts'} onClick={() => { setTab('posts'); void fetchData('posts'); }} className={`brutal-btn ${tab === 'posts' ? 'brutal-btn-dark' : ''}`}>{isHindi ? 'पोस्ट' : 'Posts'} ({posts.length})</button>
        </div>
        <button type="button" onClick={handleLogout} className="brutal-btn">{isHindi ? 'लॉग आउट' : 'Sign out'}</button>
      </div>

      <div className="warning-panel mb-6" role="note"><strong>{isHindi ? 'हर आइटम अलग से जाँचें।' : 'Review every item individually.'}</strong><p>{isHindi ? 'स्वीकृति का अर्थ पहचान या सुरक्षा सत्यापन नहीं है। निजी जानकारी और हानिकारक सामग्री जाँचें।' : 'Approval is not identity or safety verification. Check for private information and harmful content.'}</p></div>
      {error && <p className="error-message mb-4" role="alert">{error}</p>}
      {loading ? <div className="loading-state" role="status"><span className="loading-dot" aria-hidden="true" />{isHindi ? 'कतार लोड हो रही है…' : 'Loading queue…'}</div>
        : items.length === 0 ? <div className="empty-state"><h2>{isHindi ? 'कतार खाली है' : 'Queue is empty'}</h2><p>{isHindi ? 'अभी समीक्षा के लिए कुछ नहीं है।' : 'There is nothing to review right now.'}</p></div>
        : tab === 'chapters' ? <div className="result-list">{chapters.map((chapter) => {
          const pii = detectPII(`${chapter.name} ${chapter.description} ${chapter.contact_method}`);
          return <article key={chapter.id} className="result-card"><div className="badge-row">{pii.hasPII && <span className="brutal-badge brutal-badge-red">{isHindi ? 'निजी जानकारी मिली' : 'Private data detected'}</span>}</div><h2 className="result-title">{chapter.name}</h2><p className="result-location">{chapter.city} · {chapter.area}</p><p className="result-description">{chapter.description}</p><p className="field-help">{isHindi ? 'सार्वजनिक संपर्क:' : 'Public contact:'} {chapter.contact_method}</p><div className="badge-row">{chapter.categories.map((category) => <span key={category} className="brutal-badge brutal-badge-sky">{categoryLabel(category as Category)}</span>)}</div><div className="button-row mt-6"><button type="button" onClick={() => handleAction('chapters', chapter.id, 'approve')} className="brutal-btn brutal-btn-success">{isHindi ? 'स्वीकृत करें' : 'Approve'}</button><button type="button" onClick={() => handleAction('chapters', chapter.id, 'reject')} className="brutal-btn brutal-btn-danger">{isHindi ? 'अस्वीकार करें' : 'Reject'}</button></div></article>;
        })}</div>
          : <div className="result-list">{posts.map((post) => {
            const pii = detectPII(post.description);
            return <article key={post.id} className="result-card"><div className="badge-row"><span className={`brutal-badge ${post.type === 'need' ? 'brutal-badge-red' : 'brutal-badge-lime'}`}>{post.type}</span>{pii.hasPII && <span className="brutal-badge brutal-badge-red">{isHindi ? 'निजी जानकारी मिली' : 'Private data detected'}</span>}<span className="brutal-badge brutal-badge-sky">{categoryLabel(post.category as Category)}</span></div><p className="result-description">{post.description}</p><p className="result-location">{post.city} · {post.area}</p><div className="button-row mt-6"><button type="button" onClick={() => handleAction('posts', post.id, 'approve')} className="brutal-btn brutal-btn-success">{isHindi ? 'स्वीकृत करें' : 'Approve'}</button><button type="button" onClick={() => handleAction('posts', post.id, 'reject')} className="brutal-btn brutal-btn-danger">{isHindi ? 'अस्वीकार करें' : 'Reject'}</button></div></article>;
          })}</div>}
    </section>
  );
}
