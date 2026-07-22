'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchPosts();
  }, [typeFilter, cityFilter, categoryFilter]);

  async function fetchPosts() {
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
  }

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
    } catch {
      // Silent fail
    }
  }

  async function handleReport(postId: string) {
    const reason = prompt(locale === 'hi' ? 'रिपोर्ट का कारण:' : 'Reason for report:');
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
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setTypeFilter('')}
            className={`px-3 py-1.5 rounded text-sm font-medium ${typeFilter === '' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-card)] border border-[var(--color-border)]'}`}
          >
            {t(locale, 'board.all') as string}
          </button>
          <button
            onClick={() => setTypeFilter('need')}
            className={`px-3 py-1.5 rounded text-sm font-medium ${typeFilter === 'need' ? 'bg-[var(--color-urgent)] text-white' : 'bg-[var(--color-card)] border border-[var(--color-border)]'}`}
          >
            {t(locale, 'board.needs') as string}
          </button>
          <button
            onClick={() => setTypeFilter('offer')}
            className={`px-3 py-1.5 rounded text-sm font-medium ${typeFilter === 'offer' ? 'bg-[var(--color-success)] text-white' : 'bg-[var(--color-card)] border border-[var(--color-border)]'}`}
          >
            {t(locale, 'board.offers') as string}
          </button>
        </div>
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm"
        >
          <option value="">{t(locale, 'common.allCities') as string}</option>
          {CITIES_AREAS.map((c) => (
            <option key={c.city} value={c.city}>{c.city}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm"
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
      <div className="mb-6">
        <Link
          href="/create-post"
          className="inline-block text-sm bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          + {t(locale, 'board.createPost') as string}
        </Link>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">{t(locale, 'common.loading') as string}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">{t(locale, 'board.noPosts') as string}</div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`bg-[var(--color-card)] border rounded-lg p-5 ${
                post.urgency === 'urgent'
                  ? 'border-[var(--color-urgent)]'
                  : 'border-[var(--color-border)]'
              }`}
            >
              <div className="flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        post.type === 'need'
                          ? 'bg-red-100 dark:bg-red-900/30 text-[var(--color-urgent)]'
                          : 'bg-green-100 dark:bg-green-900/30 text-[var(--color-success)]'
                      }`}
                    >
                      {post.type === 'need' ? (locale === 'hi' ? 'ज़रूरत' : 'NEED') : (locale === 'hi' ? 'प्रस्ताव' : 'OFFER')}
                    </span>
                    {post.urgency === 'urgent' && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">
                        {t(locale, 'board.urgentTag') as string}
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-[var(--color-primary)] rounded-full">
                      {getCategoryLabel(post.category as Category)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleReport(post.id)}
                    className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-urgent)]"
                    title={t(locale, 'common.report') as string}
                  >
                    🚩
                  </button>
                </div>

                {/* Content */}
                <p className="text-sm">{post.description}</p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span>📍 {post.city} — {post.area}</span>
                  <span>{t(locale, 'board.expiresIn') as string}: {getHoursRemaining(post.expires_at)} {t(locale, 'board.hours') as string}</span>
                </div>

                {/* Respond button */}
                {responseSent === post.id ? (
                  <div className="text-sm text-[var(--color-success)] font-medium">
                    ✓ {t(locale, 'board.responseSent') as string}
                  </div>
                ) : respondingTo === post.id ? (
                  <div className="border-t border-[var(--color-border)] pt-3 mt-2 space-y-2">
                    <p className="text-xs text-[var(--color-text-muted)]">{t(locale, 'board.respondDesc') as string}</p>
                    <input
                      type="text"
                      placeholder={t(locale, 'board.contactPlaceholder') as string}
                      value={responseContact}
                      onChange={(e) => setResponseContact(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-sm"
                    />
                    <input
                      type="text"
                      placeholder={t(locale, 'board.messagePlaceholder') as string}
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRespond(post.id)}
                        className="text-sm bg-[var(--color-primary)] text-white px-3 py-1.5 rounded hover:bg-[var(--color-primary-dark)]"
                      >
                        {t(locale, 'board.sendResponse') as string}
                      </button>
                      <button
                        onClick={() => setRespondingTo(null)}
                        className="text-sm px-3 py-1.5 border border-[var(--color-border)] rounded"
                      >
                        {t(locale, 'common.cancel') as string}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setRespondingTo(post.id)}
                    className="self-start text-sm bg-[var(--color-primary)] text-white px-3 py-1.5 rounded hover:bg-[var(--color-primary-dark)] transition-colors"
                  >
                    {t(locale, 'board.respond') as string} →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
