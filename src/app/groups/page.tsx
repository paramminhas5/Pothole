import { cookies } from 'next/headers';
import { Locale } from '@/types';
import GroupsClient from './GroupsClient';

export const metadata = {
  title: 'Groups — Sahayata',
  description: 'Find your people. Get organized. Take action together. Public groups for civic action across India.',
};

export default async function GroupsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <GroupsClient locale={locale} />;
}
