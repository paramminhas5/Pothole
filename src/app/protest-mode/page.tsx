import { cookies } from 'next/headers';
import { Locale } from '@/types';
import ProtestModeClient from './ProtestModeClient';

export default async function ProtestModePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <ProtestModeClient locale={locale} />;
}
