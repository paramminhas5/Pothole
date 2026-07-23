import { cookies } from 'next/headers';
import { Locale } from '@/types';
import CampaignHubClient from './CampaignHubClient';

export const metadata = { title: 'Campaign — Sahayata' };

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <CampaignHubClient slug={slug} locale={locale} />;
}
