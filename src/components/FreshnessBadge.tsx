'use client';

interface FreshnessBadgeProps {
  lastActivity: string;
  locale: 'en' | 'hi';
}

export default function FreshnessBadge({ lastActivity, locale }: FreshnessBadgeProps) {
  const isHindi = locale === 'hi';
  const now = Date.now();
  const activityTime = new Date(lastActivity).getTime();
  const diffMs = now - activityTime;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  let label: string;
  let color: string;

  if (diffHours < 1) {
    label = isHindi ? 'अभी सक्रिय' : 'Active now';
    color = 'text-[var(--color-lime)]';
  } else if (diffHours < 24) {
    label = isHindi ? `${diffHours} घंटे पहले` : `${diffHours}h ago`;
    color = 'text-[var(--color-lime)]';
  } else if (diffDays < 3) {
    label = isHindi ? `${diffDays} दिन पहले` : `${diffDays}d ago`;
    color = 'text-[var(--color-sky)]';
  } else if (diffDays < 7) {
    label = isHindi ? `${diffDays} दिन पहले` : `${diffDays}d ago`;
    color = 'text-[var(--color-warning)]';
  } else {
    label = isHindi ? `${diffDays} दिन पहले` : `${diffDays}d ago`;
    color = 'text-[var(--color-text-muted)]';
  }

  return (
    <span className={`text-xs font-bold ${color}`} title={new Date(lastActivity).toLocaleString()}>
      ● {label}
    </span>
  );
}
