import { cookies } from 'next/headers';
import { Locale } from '@/types';
import SubmitClient from './SubmitClient';

export default async function SubmitPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <SubmitClient locale={locale} />;
}
