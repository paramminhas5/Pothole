import { cookies } from 'next/headers';
import { Locale } from '@/types';
import { t } from '@/i18n';
import AdminClient from './AdminClient';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-yellow mb-4">
          {isHindi ? 'मॉडरेशन' : 'MODERATION'}
        </div>
        <h1 className="heading-1 mb-3">{t(locale, 'admin.title') as string}</h1>
        <p className="text-[var(--color-text-muted)]">{t(locale, 'admin.subtitle') as string}</p>
      </div>
      <AdminClient locale={locale} />
    </div>
  );
}
