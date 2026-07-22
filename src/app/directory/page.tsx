import { cookies } from 'next/headers';
import { Locale } from '@/types';
import { t } from '@/i18n';
import DirectoryClient from './DirectoryClient';

export default async function DirectoryPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{t(locale, 'directory.title') as string}</h1>
        <p className="text-[var(--color-text-muted)]">{t(locale, 'directory.subtitle') as string}</p>
      </div>
      <DirectoryClient locale={locale} />
    </div>
  );
}
