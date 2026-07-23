import { cookies } from 'next/headers';
import { Locale } from '@/types';
import GovernanceClient from './GovernanceClient';

export default async function GovernancePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <GovernanceClient locale={locale} />;
}
