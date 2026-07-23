import { cookies } from 'next/headers';
import { Locale } from '@/types';
import RTIGeneratorClient from './RTIGeneratorClient';

export default async function RTIPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <RTIGeneratorClient locale={locale} />;
}
