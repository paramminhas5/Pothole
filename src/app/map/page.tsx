import { cookies } from 'next/headers';
import { Locale } from '@/types';
import MapClient from './MapClient';

export default async function MapPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <MapClient locale={locale} />;
}
