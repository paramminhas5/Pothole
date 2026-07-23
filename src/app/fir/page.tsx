import { cookies } from 'next/headers';
import { Locale } from '@/types';
import FIRAssistantClient from './FIRAssistantClient';

export default async function FIRPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <FIRAssistantClient locale={locale} />;
}
