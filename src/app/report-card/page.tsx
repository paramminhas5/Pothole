import { cookies } from 'next/headers';
import { Locale } from '@/types';
import ReportCardClient from './ReportCardClient';

export const metadata = {
  title: 'Report Card — Sahayata',
  description: 'Public institutional silence tracker. Demands, deadlines, and days of silence. No login needed.',
};

export default async function ReportCardPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  return <ReportCardClient locale={locale} />;
}
