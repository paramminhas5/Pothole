import { cookies } from 'next/headers';
import { Locale } from '@/types';
import ExchangeClient from './ExchangeClient';

export const metadata = {
  title: 'Skill Exchange — Sahayata',
  description: 'I have skills to offer. What needs doing? Standalone volunteer pool + help requests.',
};

export default async function ExchangePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <ExchangeClient locale={locale} />;
}
