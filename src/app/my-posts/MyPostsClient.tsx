'use client';

import { useState, useEffect } from 'react';
import { Post, Locale, Category } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { t } from '@/i18n';

interface MyPostsClientProps {
  locale: Locale;
  sessionId: string;
}

interface PostWithResponses extends Post {
  responses?: { id: string; responder_contact: string; responder_message: string; created_at: string }[];
}

export default function MyPostsClient({ locale, sessionId }: MyPostsClientProps) {
  const [posts, setPosts] = useState<PostWithResponses[]>([]);
  const [loading, setLoading] = useState(true);
  const isHindi = locale === 'hi';

  useEffect(() => {
    fetchMyPosts();
  }, []);

  async function fetchMyPosts() {
    setLoading(true);
    try {
      const res = await fetch(`/api/my-posts?session_id=${sessionId}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleExtend(postId: string) {
    const res = await fetch('/api/my-posts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: postId, action: 'extend' }),
    });
    if (res.ok) fetchMyPosts();
  }

  async function handleResolve(postId: string) {
    const res = await fetch('/api/my-posts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: postId, action: 'resolve' }),
    });
    if (res.ok) fetchMyPosts();
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

  if (loading) {
    return <div className="text-center py-16"><div className="brutal-badge">{t(locale, 'common.loading') as string}</div></div>;
  }

  if (posts.length === 0) {
    return (
      <div className="brutal-card text-center">
        <p className="text-[var(--color-text-muted)] mb-4">
          {isHindi ? 'कोई पोस्ट नहीं मिली।' : 'No posts found for your session.'}
        </p>
        <a href="/create-post" className="brutal-btn brutal-btn-primary">
          {isHindi ? 'पोस्ट बनाएं' : 'CREATE A POST'} →
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className={`brutal-card ${post.resolved ? 'opacity-60' : ''}`}>
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`brutal-badge ${post.type === 'need' ? 'brutal-badge-red' : 'brutal-badge-lime'}`}>
                {post.type === 'need' ? (isHindi ? 'ज़रूरत' : 'NEED') : (isHindi ? 'प्रस्ताव' : 'OFFER')}
              </span>
              <span className="brutal-badge brutal-badge-sky">{getCategoryLabel(post.category as Category)}</span>
              {post.status === 'pending' && <span className="brutal-badge brutal-badge-yellow">{isHindi ? 'समीक्षा लंबित' : 'PENDING'}</span>}
              {post.resolved && <span className="brutal-badge brutal-badge-lime">{isHindi ? 'हल किया गया' : 'RESOLVED'}</span>}
              {post.urgency === 'urgent' && !post.resolved && <span className="brutal-badge brutal-badge-red">⚡ {isHindi ? 'तत्काल' : 'URGENT'}</span>}
            </div>
          </div>

          {/* Content */}
          <p className="text-sm mb-3 leading-relaxed">{post.description}</p>
          <p className="text-xs text-[var(--color-text-muted)] font-medium mb-4">
            📍 {post.city} — {post.area} · ⏰ {getHoursRemaining(post.expires_at)}h {isHindi ? 'शेष' : 'left'}
          </p>

          {/* Actions */}
          {!post.resolved && (
            <div className="flex gap-2 mb-4">
              <button onClick={() => handleExtend(post.id)} className="brutal-btn brutal-btn-sm">
                ⏰ {isHindi ? '+72 घंटे' : '+72 HOURS'}
              </button>
              <button onClick={() => handleResolve(post.id)} className="brutal-btn brutal-btn-success brutal-btn-sm">
                ✓ {isHindi ? 'हल हो गया' : 'RESOLVED'}
              </button>
            </div>
          )}

          {/* Responses received */}
          {post.responses && post.responses.length > 0 && (
            <div className="border-t-[2.5px] border-[var(--color-border)] pt-4 mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3">
                {isHindi ? `${post.responses.length} जवाब प्राप्त` : `${post.responses.length} RESPONSE(S) RECEIVED`}
              </h4>
              <div className="space-y-3">
                {post.responses.map((resp) => (
                  <div key={resp.id} className="brutal-card-flat !p-3 !border-[var(--color-lime)]">
                    <p className="text-sm font-bold text-[var(--color-lime)] mb-1">{resp.responder_contact}</p>
                    {resp.responder_message && (
                      <p className="text-xs text-[var(--color-text-muted)]">{resp.responder_message}</p>
                    )}
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      {new Date(resp.created_at).toLocaleString(locale === 'hi' ? 'hi-IN' : 'en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
