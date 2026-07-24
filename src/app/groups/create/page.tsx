import { cookies } from 'next/headers';
import { Locale } from '@/types';
import CreateGroupClient from './CreateGroupClient';

export default async function CreateGroupPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <CreateGroupClient locale={locale} />;
}
