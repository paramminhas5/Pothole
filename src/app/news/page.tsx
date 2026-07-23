import { cookies } from 'next/headers';
import { Locale } from '@/types';
import NewsClient from './NewsClient';

export const metadata = {
  title: 'News & Evidence — Sahayata',
  description: 'Crowdsourced, timestamped news and evidence. Every post is evidence. Bills tracker, safety warnings, movement updates.',
};

export default async function NewsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <NewsClient locale={locale} />;
}
