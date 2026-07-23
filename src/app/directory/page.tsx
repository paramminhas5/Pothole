import { cookies } from 'next/headers';
import { Locale } from '@/types';
import { DirectoryClient } from './DirectoryClient';

export const metadata = {
  title: 'Directory — Sahayata',
  description: "India's most trusted civic directory. Crowdsourced, vetted, feedback-driven. Only active and proven.",
};

export default async function DirectoryPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <DirectoryClient locale={locale} />;
}
