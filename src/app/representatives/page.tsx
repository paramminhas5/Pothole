import { cookies } from 'next/headers';
import { Locale } from '@/types';
import RepClient from './RepClient';

export default async function RepresentativesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <RepClient locale={locale} />;
}
