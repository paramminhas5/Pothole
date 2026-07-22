'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Post, Locale, Category, PostType } from '@/types';
import { CITIES_AREAS, CATEGORIES } from '@/lib/constants';
import { t } from '@/i18n';

interface BoardClientProps {
  locale: Locale;
}

export default function BoardClient({ locale }: BoardClientProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<PostType | ''>('');
  const [cityFilter, setCityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseContact, setResponseContact] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [responseSent, setResponseSent] = useState<string | null>(null);

  const isHindi = locale === 'hi';

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter) params.set('type', typeFilter);
      if (cityFilter) params.set('city', cityFilter);
      if (categoryFilter) params.set('category', categoryFilter);
      const res = await fetch(`/api/posts?${params.toString()}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [typeFilter, cityFilter, categoryFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleRespond(postId: string) {
    if (!responseContact.trim()) return;
    try {
      const res = await fetch('/api/posts/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          responder_contact: responseContact,
          responder_message: responseMessage,
        }),
      });
      if (res.ok) {
        setResponseSent(postId);
        setRespondingTo(null);
        setResponseContact('');
        setResponseMessage('');
        setTimeout(() => setResponseSent(null), 5000);
      }
    } catch { /* silent */ }
  }

  async function handleReport(postId: string) {
    const reason = prompt(isHindi ? 'रिपोर्ट का कारण:' : 'Reason for report:');
    if (!reason) return;
    await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target_type: 'post', target_id: postId, reason }),
    });
  }

  const getCategoryLabel = (cat: Category) => {
    const found = CATEGORIES.find((c) => c.value === cat);
    if (!found) return cat;
    return locale === 'hi' ? found.labelHi : found.labelEn;
  };

  const getHoursRemaining = (expiresAt: string) => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    return Math.max(0, Math.round(diff / (1000 * 60 * 60)));
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {(['', 'need', 'offer'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`brutal-btn brutal-btn-sm ${
                typeFilter === type
                  ? type === 'need' ? 'brutal-btn-danger' : type === 'offer' ? 'brutal-btn-success' : 'brutal-btn-dark'
                  : ''
              }`}
            >
              {type === '' ? (t(locale, 'board.all') as string) : type === 'need' ? (t(locale, 'board.needs') as string) : (t(locale, 'board.offers') as string)}
            </button>
          ))}
        </div>
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="brutal-select md:w-48"
          aria-label="Filter by city"
        >
          <option value="">{t(locale, 'common.allCities') as string}</option>
          {CITIES_AREAS.map((c) => (
            <option key={c.city} value={c.city}>{c.city}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="brutal-select md:w-48"
          aria-label="Filter by category"
        >
          <option value="">{t(locale, 'common.allCategories') as string}</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {locale === 'hi' ? c.labelHi : c.labelEn}
            </option>
          ))}
        </select>
      </div>

      {/* Create Post CTA */}
      <div className="mb-8">
        <Link href="/create-post" className="brutal-btn brutal-btn-primary brutal-btn-sm">
          + {t(locale, 'board.createPost') as string}
        </Link>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="text-center py-16">
          <div className="brutal-badge">{t(locale, 'common.loading') as string}</div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--color-text-muted)] text-lg mb-4">{t(locale, 'board.noPosts') as string}</p>
          <Link href="/create-post" className="brutal-btn brutal-btn-primary">
            {isHindi ? 'पहली पोस्ट बनाएं' : 'CREATE THE FIRST POST'} →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className={`brutal-card ${post.urgency === 'urgent' ? '!border-[var(--color-red)] !shadow-[5px_5px_0px_var(--color-red)]' : ''}`}
              aria-label={`${post.type} post: ${post.description.slice(0, 50)}`}
            >
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`brutal-badge ${post.type === 'need' ? 'brutal-badge-red' : 'brutal-badge-lime'}`}>
                      {post.type === 'need' ? (isHindi ? 'ज़रूरत' : 'NEED') : (isHindi ? 'प्रस्ताव' : 'OFFER')}
                    </span>
                    {post.urgency === 'urgent' && (
                      <span className="brutal-badge brutal-badge-red animate-urgent">
                        ⚡ {t(locale, 'board.urgentTag') as string}
                      </span>
                    )}
                    <span className="brutal-badge brutal-badge-sky">
                      {getCategoryLabel(post.category as Category)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleReport(post.id)}
                    className="text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-red)] transition-colors px-2 py-1 border-[2px] border-transparent hover:border-[var(--color-red)]"
                    title={t(locale, 'common.report') as string}
                    aria-label="Report this post"
                  >
                    🚩
                  </button>
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed">{post.description}</p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs font-medium text-[var(--color-text-muted)]">
                  <span>📍 {post.city} — {post.area}</span>
                  <span>⏰ {getHoursRemaining(post.expires_at)}h {isHindi ? 'शेष' : 'left'}</span>
                </div>

                {/* Respond */}
                {responseSent === post.id ? (
                  <div className="brutal-badge brutal-badge-lime animate-slide-in">
                    ✓ {t(locale, 'board.responseSent') as string}
                  </div>
                ) : respondingTo === post.id ? (
                  <div className="border-t-[2.5px] border-[var(--color-border)] pt-4 mt-2 space-y-3 animate-slide-in">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide">
                      {t(locale, 'board.respondDesc') as string}
                    </p>
                    <input
                      type="text"
                      placeholder={t(locale, 'board.contactPlaceholder') as string}
                      value={responseContact}
                      onChange={(e) => setResponseContact(e.target.value)}
                      className="brutal-input"
                      aria-label="Your contact info"
                    />
                    <input
                      type="text"
                      placeholder={t(locale, 'board.messagePlaceholder') as string}
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className="brutal-input"
                      aria-label="Optional message"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleRespond(post.id)} className="brutal-btn brutal-btn-primary brutal-btn-sm">
                        {t(locale, 'board.sendResponse') as string}
                      </button>
                      <button onClick={() => setRespondingTo(null)} className="brutal-btn brutal-btn-sm">
                        {t(locale, 'common.cancel') as string}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setRespondingTo(post.id)}
                    className="brutal-btn brutal-btn-primary brutal-btn-sm self-start"
                  >
                    {t(locale, 'board.respond') as string} →
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
