import { cookies } from 'next/headers';
import { Locale } from '@/types';
import CampaignListClient from './CampaignListClient';

export const metadata = {
  title: 'Campaigns — Sahayata',
  description: 'Active civic campaigns. Named targets, clear demands, public deadlines. Join or start yours.',
};

export default async function CampaignsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <CampaignListClient locale={locale} />;
}
