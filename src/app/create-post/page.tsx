import { cookies } from 'next/headers';
import { Locale } from '@/types';
import { t } from '@/i18n';
import CreatePostClient from './CreatePostClient';

export default async function CreatePostPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-accent mb-4">
          {locale === 'hi' ? 'नई पोस्ट' : 'NEW POST'}
        </div>
        <h1 className="heading-1 mb-3">{t(locale, 'createPost.title') as string}</h1>
        <p className="text-[var(--color-text-muted)]">{t(locale, 'createPost.subtitle') as string}</p>
      </div>
      {/* Safety note */}
      <div className="brutal-banner mb-8">
        ⚠️ {t(locale, 'common.safetyNote') as string}
      </div>
      <CreatePostClient locale={locale} />
    </div>
  );
}
