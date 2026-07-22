import { cookies } from 'next/headers';
import { Locale } from '@/types';
import { t } from '@/i18n';
import CreatePostClient from './CreatePostClient';

export default async function CreatePostPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{t(locale, 'createPost.title') as string}</h1>
        <p className="text-[var(--color-text-muted)]">{t(locale, 'createPost.subtitle') as string}</p>
      </div>
      {/* Safety note */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-6">
        <p className="text-xs text-yellow-800 dark:text-yellow-200">
          ⚠️ {t(locale, 'common.safetyNote') as string}
        </p>
      </div>
      <CreatePostClient locale={locale} />
    </div>
  );
}
