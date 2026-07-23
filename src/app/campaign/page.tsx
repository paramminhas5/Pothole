import { CampaignListClient } from './CampaignListClient';

export const metadata = {
  title: 'Campaigns — Sahayata',
  description: 'Active civic campaigns with named targets, deadlines, and tracked outcomes.',
};

export default function CampaignsPage() {
  return <CampaignListClient />;
}
