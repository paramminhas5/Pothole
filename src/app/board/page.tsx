import { cookies } from 'next/headers';
import { Locale } from '@/types';
import { t } from '@/i18n';
import BoardClient from './BoardClient';

export default async function BoardPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-accent mb-4">
          {locale === 'hi' ? 'बोर्ड' : 'BOARD'}
        </div>
        <h1 className="heading-1 mb-3">{t(locale, 'board.title') as string}</h1>
        <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">
          {t(locale, 'board.subtitle') as string}
        </p>
      </div>
      {/* Safety note */}
      <div className="brutal-banner mb-8">
        ⚠️ {t(locale, 'common.safetyNote') as string}
      </div>
      <BoardClient locale={locale} />
    </div>
  );
}
