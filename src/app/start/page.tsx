import { cookies } from 'next/headers';
import { Locale } from '@/types';
import StartClient from './StartClient';

export default async function StartPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <StartClient locale={locale} />;
}
