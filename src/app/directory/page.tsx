import { cookies } from 'next/headers';
import { Locale } from '@/types';
import { t } from '@/i18n';
import DirectoryClient from './DirectoryClient';

export default async function DirectoryPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-sky mb-4">
          {locale === 'hi' ? 'निर्देशिका' : 'DIRECTORY'}
        </div>
        <h1 className="heading-1 mb-3">{t(locale, 'directory.title') as string}</h1>
        <p className="text-[var(--color-text-muted)] text-lg max-w-2xl">
          {t(locale, 'directory.subtitle') as string}
        </p>
      </div>
      <DirectoryClient locale={locale} />
    </div>
  );
}
