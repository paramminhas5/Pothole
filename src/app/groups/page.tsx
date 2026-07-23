import { cookies } from 'next/headers';
import { Locale } from '@/types';
import GroupsClient from './GroupsClient';

export default async function GroupsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <GroupsClient locale={locale} />;
}
