import { cookies } from 'next/headers';
import { Locale } from '@/types';
import SearchClient from './SearchClient';

export default async function SearchPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <SearchClient locale={locale} />;
}
