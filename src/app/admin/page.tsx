import { cookies } from 'next/headers';
import { Locale } from '@/types';
import { t } from '@/i18n';
import AdminClient from './AdminClient';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{t(locale, 'admin.title') as string}</h1>
        <p className="text-[var(--color-text-muted)]">{t(locale, 'admin.subtitle') as string}</p>
      </div>
      <AdminClient locale={locale} />
    </div>
  );
}
