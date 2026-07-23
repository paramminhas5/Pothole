import { cookies } from 'next/headers';
import { Locale } from '@/types';
import KnowTheSystemClient from './KnowTheSystemClient';

export const metadata = {
  title: 'Know the System — Sahayata',
  description: 'Arm yourself. How power works. Laws to know. The playbook for taking power.',
};

export default async function KnowTheSystemPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <KnowTheSystemClient locale={locale} />;
}
