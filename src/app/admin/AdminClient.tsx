'use client';

import { useState, useEffect } from 'react';
import { Chapter, Post, Locale, Category } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { t } from '@/i18n';
import { detectPII } from '@/lib/moderation';

interface AdminClientProps {
  locale: Locale;
}

export default function AdminClient({ locale }: AdminClientProps) {
  const [adminSecret, setAdminSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<'chapters' | 'posts'>('chapters');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const isHindi = locale === 'hi';

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_secret');
    if (stored) { setAdminSecret(stored); setAuthenticated(true); }
  }, []);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, tab]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem('admin_secret', adminSecret);
    setAuthenticated(true);
  }

  async function fetchData() {
    setLoading(true);
    try {
      const endpoint = tab === 'chapters' ? '/api/admin/chapters' : '/api/admin/posts';
      const res = await fetch(endpoint, { headers: { 'x-admin-secret': adminSecret } });
      if (res.status === 401) { setAuthenticated(false); sessionStorage.removeItem('admin_secret'); return; }
      const data = await res.json();
      if (tab === 'chapters') setChapters(data.chapters || []);
      else setPosts(data.posts || []);
    } catch { /* silent */ } finally { setLoading(false); }
  }

  async function handleAction(type: 'chapters' | 'posts', id: string, action: 'approve' | 'reject') {
    const endpoint = type === 'chapters' ? '/api/admin/chapters' : '/api/admin/posts';
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminSecret },
      body: JSON.stringify({ id, action }),
    });
    if (res.ok) {
      if (type === 'chapters') setChapters((prev) => prev.filter((c) => c.id !== id));
      else setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  async function handleBulkApprove() {
    const items = tab === 'chapters' ? chapters : posts;
    for (const item of items) {
      await handleAction(tab, item.id, 'approve');
    }
  }

  const getCategoryLabel = (cat: Category) => {
    const found = CATEGORIES.find((c) => c.value === cat);
    if (!found) return cat;
    return locale === 'hi' ? found.labelHi : found.labelEn;
  };

  if (!authenticated) {
    return (
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <div className="brutal-card">
          <h2 className="heading-3 mb-4">{isHindi ? 'मॉडरेशन एक्सेस' : 'Moderation Access'}</h2>
          <input
            type="password"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
            placeholder={isHindi ? 'एडमिन सीक्रेट दर्ज करें...' : 'Enter admin secret...'}
            required
            className="brutal-input mb-4"
          />
          <button type="submit" className="brutal-btn brutal-btn-dark w-full">
            {isHindi ? 'एक्सेस करें' : 'ACCESS QUEUE'}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      {/* Tabs + Bulk Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <button onClick={() => setTab('chapters')} className={`brutal-btn brutal-btn-sm ${tab === 'chapters' ? 'brutal-btn-dark' : ''}`}>
            {t(locale, 'admin.chapters') as string} ({chapters.length})
          </button>
          <button onClick={() => setTab('posts')} className={`brutal-btn brutal-btn-sm ${tab === 'posts' ? 'brutal-btn-dark' : ''}`}>
            {t(locale, 'admin.posts') as string} ({posts.length})
          </button>
        </div>
        <button onClick={handleBulkApprove} className="brutal-btn brutal-btn-success brutal-btn-sm">
          ✓ {isHindi ? 'सभी स्वीकृत करें' : 'APPROVE ALL'}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16"><div className="brutal-badge">{t(locale, 'common.loading') as string}</div></div>
      ) : tab === 'chapters' ? (
        chapters.length === 0 ? (
          <div className="brutal-card text-center"><p className="text-[var(--color-text-muted)]">{t(locale, 'admin.noItems') as string}</p></div>
        ) : (
          <div className="space-y-4">
            {chapters.map((chapter) => {
              const pii = detectPII(`${chapter.name} ${chapter.description} ${chapter.contact_method}`);
              return (
                <div key={chapter.id} className={`brutal-card ${pii.hasPII ? '!border-[var(--color-red)]' : ''}`}>
                  {pii.hasPII && (
                    <div className="brutal-badge brutal-badge-red mb-3">
                      ⚠️ PII DETECTED: {pii.flags.join(', ')}
                    </div>
                  )}
                  <h3 className="heading-3 mb-1">{chapter.name}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mb-2 font-medium">📍 {chapter.city} — {chapter.area}</p>
                  {chapter.description && <p className="text-sm mb-2">{chapter.description}</p>}
                  <p className="text-xs text-[var(--color-text-muted)] mb-3">Contact: {chapter.contact_method}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {chapter.categories.map((cat) => (
                      <span key={cat} className="brutal-badge brutal-badge-sky">{getCategoryLabel(cat as Category)}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleAction('chapters', chapter.id, 'approve')} className="brutal-btn brutal-btn-success brutal-btn-sm">
                      ✓ {t(locale, 'admin.approve') as string}
                    </button>
                    <button onClick={() => handleAction('chapters', chapter.id, 'reject')} className="brutal-btn brutal-btn-danger brutal-btn-sm">
                      ✗ {t(locale, 'admin.reject') as string}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : posts.length === 0 ? (
        <div className="brutal-card text-center"><p className="text-[var(--color-text-muted)]">{t(locale, 'admin.noItems') as string}</p></div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            const pii = detectPII(post.description);
            return (
              <div key={post.id} className={`brutal-card ${pii.hasPII ? '!border-[var(--color-red)]' : post.urgency === 'urgent' ? '!border-[var(--color-accent)]' : ''}`}>
                {pii.hasPII && (
                  <div className="brutal-badge brutal-badge-red mb-3">
                    ⚠️ PII DETECTED: {pii.flags.join(', ')}
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`brutal-badge ${post.type === 'need' ? 'brutal-badge-red' : 'brutal-badge-lime'}`}>
                    {post.type.toUpperCase()}
                  </span>
                  {post.urgency === 'urgent' && <span className="brutal-badge brutal-badge-red">⚡ URGENT</span>}
                  <span className="brutal-badge brutal-badge-sky">{getCategoryLabel(post.category as Category)}</span>
                </div>
                <p className="text-sm mb-2">{post.description}</p>
                <p className="text-xs text-[var(--color-text-muted)] mb-4">
                  📍 {post.city} — {post.area} · Session: {post.session_id?.slice(0, 8)}...
                </p>
                <div className="flex gap-2">
                  <button onClick={() => handleAction('posts', post.id, 'approve')} className="brutal-btn brutal-btn-success brutal-btn-sm">
                    ✓ {t(locale, 'admin.approve') as string}
                  </button>
                  <button onClick={() => handleAction('posts', post.id, 'reject')} className="brutal-btn brutal-btn-danger brutal-btn-sm">
                    ✗ {t(locale, 'admin.reject') as string}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
