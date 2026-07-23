import { cookies } from 'next/headers';
import { Locale } from '@/types';
import CreateCampaignClient from './CreateCampaignClient';

export const metadata = {
  title: 'Start a Campaign — Sahayata',
  description: 'Name the target. State the demand. Set the deadline. Anyone can start — individual or group.',
};

export default async function CreateCampaignPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <CreateCampaignClient locale={locale} />;
}
