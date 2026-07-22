import { cookies } from 'next/headers';
import { Locale } from '@/types';
import { t } from '@/i18n';
import SubmitChapterClient from './SubmitChapterClient';

export default async function SubmitChapterPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{t(locale, 'submitChapter.title') as string}</h1>
        <p className="text-[var(--color-text-muted)]">{t(locale, 'submitChapter.subtitle') as string}</p>
      </div>
      <SubmitChapterClient locale={locale} />
    </div>
  );
}
