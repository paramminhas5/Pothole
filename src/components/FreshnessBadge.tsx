interface FreshnessBadgeProps {
  lastActivity: string;
  locale: 'en' | 'hi';
}

export default function FreshnessBadge({ lastActivity, locale }: FreshnessBadgeProps) {
  const label = locale === 'hi' ? 'रिकॉर्ड किया गया समय' : 'Recorded timestamp';

  return (
    <time
      className="text-xs font-bold text-[var(--color-text-muted)]"
      dateTime={lastActivity}
      title={locale === 'hi' ? 'यह सत्यापन या वर्तमान गतिविधि का प्रमाण नहीं है।' : 'This is not evidence of verification or current activity.'}
    >
      ● {label}: {lastActivity}
    </time>
  );
}
