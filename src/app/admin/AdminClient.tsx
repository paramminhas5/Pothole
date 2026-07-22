'use client';

import { useState, useEffect } from 'react';
import { Chapter, Post, Locale, Category } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { t } from '@/i18n';

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

  useEffect(() => {
    // Check if admin secret is stored in sessionStorage
    const stored = sessionStorage.getItem('admin_secret');
    if (stored) {
      setAdminSecret(stored);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
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
      const res = await fetch(endpoint, {
        headers: { 'x-admin-secret': adminSecret },
      });

      if (res.status === 401) {
        setAuthenticated(false);
        sessionStorage.removeItem('admin_secret');
        return;
      }

      const data = await res.json();
      if (tab === 'chapters') {
        setChapters(data.chapters || []);
      } else {
        setPosts(data.posts || []);
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(type: 'chapters' | 'posts', id: string, action: 'approve' | 'reject') {
    const endpoint = type === 'chapters' ? '/api/admin/chapters' : '/api/admin/posts';
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': adminSecret,
      },
      body: JSON.stringify({ id, action }),
    });

    if (res.ok) {
      // Remove from list
      if (type === 'chapters') {
        setChapters((prev) => prev.filter((c) => c.id !== id));
      } else {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Admin Secret</label>
            <input
              type="password"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              placeholder="Enter admin secret..."
              required
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium"
          >
            Access Moderation Queue
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('chapters')}
          className={`px-4 py-2 rounded text-sm font-medium ${
            tab === 'chapters' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-card)] border border-[var(--color-border)]'
          }`}
        >
          {t(locale, 'admin.chapters') as string}
        </button>
        <button
          onClick={() => setTab('posts')}
          className={`px-4 py-2 rounded text-sm font-medium ${
            tab === 'posts' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-card)] border border-[var(--color-border)]'
          }`}
        >
          {t(locale, 'admin.posts') as string}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">{t(locale, 'common.loading') as string}</div>
      ) : tab === 'chapters' ? (
        chapters.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)]">{t(locale, 'admin.noItems') as string}</div>
        ) : (
          <div className="space-y-4">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-5">
                <h3 className="font-bold text-lg mb-1">{chapter.name}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">
                  📍 {chapter.city} — {chapter.area}
                </p>
                {chapter.description && <p className="text-sm mb-2">{chapter.description}</p>}
                <p className="text-xs text-[var(--color-text-muted)] mb-2">
                  Contact: {chapter.contact_method}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {chapter.categories.map((cat) => (
                    <span key={cat} className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-[var(--color-primary)] rounded-full">
                      {getCategoryLabel(cat as Category)}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction('chapters', chapter.id, 'approve')}
                    className="text-sm bg-[var(--color-success)] text-white px-4 py-1.5 rounded hover:opacity-90"
                  >
                    ✓ {t(locale, 'admin.approve') as string}
                  </button>
                  <button
                    onClick={() => handleAction('chapters', chapter.id, 'reject')}
                    className="text-sm bg-[var(--color-urgent)] text-white px-4 py-1.5 rounded hover:opacity-90"
                  >
                    ✗ {t(locale, 'admin.reject') as string}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">{t(locale, 'admin.noItems') as string}</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className={`bg-[var(--color-card)] border rounded-lg p-5 ${
              post.urgency === 'urgent' ? 'border-[var(--color-urgent)]' : 'border-[var(--color-border)]'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  post.type === 'need' ? 'bg-red-100 text-[var(--color-urgent)]' : 'bg-green-100 text-[var(--color-success)]'
                }`}>
                  {post.type.toUpperCase()}
                </span>
                {post.urgency === 'urgent' && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600 text-white">URGENT</span>
                )}
                <span className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-[var(--color-primary)] rounded-full">
                  {getCategoryLabel(post.category as Category)}
                </span>
              </div>
              <p className="text-sm mb-2">{post.description}</p>
              <p className="text-xs text-[var(--color-text-muted)] mb-3">
                📍 {post.city} — {post.area} | Session: {post.session_id?.slice(0, 8)}...
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction('posts', post.id, 'approve')}
                  className="text-sm bg-[var(--color-success)] text-white px-4 py-1.5 rounded hover:opacity-90"
                >
                  ✓ {t(locale, 'admin.approve') as string}
                </button>
                <button
                  onClick={() => handleAction('posts', post.id, 'reject')}
                  className="text-sm bg-[var(--color-urgent)] text-white px-4 py-1.5 rounded hover:opacity-90"
                >
                  ✗ {t(locale, 'admin.reject') as string}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
