import { cookies } from 'next/headers';
import { Locale } from '@/types';
import RTITrackClient from './RTITrackClient';

export default async function RTITrackPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <RTITrackClient locale={locale} />;
}
