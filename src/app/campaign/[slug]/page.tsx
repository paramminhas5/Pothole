import { CampaignDetailClient } from './CampaignDetailClient';

export const metadata = { title: 'Campaign — Sahayata' };

export default async function CampaignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CampaignDetailClient slug={slug} />;
}
