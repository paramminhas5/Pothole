import { cookies } from 'next/headers';
import { Locale } from '@/types';
import BuddyClient from './BuddyClient';

export default async function BuddyPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <BuddyClient locale={locale} />;
}
