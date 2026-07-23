import { cookies } from 'next/headers';
import { Locale } from '@/types';
import ContributeClient from './ContributeClient';

export default async function ContributePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <ContributeClient locale={locale} />;
}
