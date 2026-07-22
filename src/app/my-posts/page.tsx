import { cookies } from 'next/headers';
import { Locale } from '@/types';
import MyPostsClient from './MyPostsClient';

export default async function MyPostsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const sessionId = cookieStore.get('session_id')?.value || '';

  const isHindi = locale === 'hi';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-purple mb-4">
          {isHindi ? 'डैशबोर्ड' : 'DASHBOARD'}
        </div>
        <h1 className="heading-1 mb-3">{isHindi ? 'मेरी पोस्ट और जवाब' : 'My Posts & Responses'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">
          {isHindi
            ? 'आपकी पोस्ट और उन पर प्राप्त जवाब देखें। समय बढ़ाएं या हल किया गया चिह्नित करें।'
            : 'View your posts and responses received. Extend expiry or mark as resolved.'}
        </p>
      </div>
      {sessionId ? (
        <MyPostsClient locale={locale} sessionId={sessionId} />
      ) : (
        <div className="brutal-card text-center">
          <p className="text-[var(--color-text-muted)] mb-4">
            {isHindi
              ? 'आपकी कोई सत्र-आधारित पोस्ट नहीं मिली। जब आप कोई पोस्ट बनाते हैं, तो वह यहाँ दिखाई देगी।'
              : 'No session-based posts found. When you create a post, it will appear here.'}
          </p>
          <a href="/create-post" className="brutal-btn brutal-btn-primary">
            {isHindi ? 'पहली पोस्ट बनाएं' : 'CREATE YOUR FIRST POST'} →
          </a>
        </div>
      )}
    </div>
  );
}
