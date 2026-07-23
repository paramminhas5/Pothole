import { ProfileDetailClient } from './ProfileDetailClient';

export const metadata = { title: 'Civic Profile — Sahayata' };

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProfileDetailClient slug={slug} />;
}
