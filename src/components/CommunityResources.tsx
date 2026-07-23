'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';

interface Resource {
  id: string;
  type: string;
  name: string;
  city: string;
  state: string;
  contact: string;
  description: string;
  source: string;
  created_at: string;
}

interface Props {
  locale: Locale;
  type?: string;
  title?: string;
  titleHi?: string;
}

export default function CommunityResources({ locale, type, title, titleHi }: Props) {
  const hi = locale === 'hi';
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    fetch(`/api/community-resources?${params}`)
      .then(r => r.json())
      .then(data => setResources(data.resources || []))
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
  }, [type]);

  if (loading) return <div className="text-sm text-[var(--color-text-muted)] py-4">{hi ? 'लोड हो रहा...' : 'Loading...'}</div>;

  return (
    <div>
      {(title || titleHi) && <h3 className="font-bold mb-3">{hi ? titleHi : title}</h3>}
      {resources.length > 0 ? (
        <div className="space-y-2">
          {resources.map(r => (
            <div key={r.id} className="p-3 bg-[var(--color-surface-alt)] rounded text-sm">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <strong>{r.name}</strong>{r.city !== 'National' && <span className="text-[var(--color-text-muted)]"> · {r.city}</span>}
                  <p className="text-[var(--color-text-muted)] mt-1">{r.description}</p>
                </div>
                {r.contact && (
                  <a href={r.contact.startsWith('http') ? r.contact : r.contact.match(/^\d/) ? `tel:${r.contact}` : r.contact} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] font-bold text-xs whitespace-nowrap">{hi ? 'संपर्क ↗' : 'Contact ↗'}</a>
                )}
              </div>
              {r.source && <p className="text-xs text-[var(--color-text-muted)] mt-1">{hi ? 'स्रोत:' : 'Source:'} {r.source}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--color-text-muted)]">{hi ? 'अभी कोई सामुदायिक संसाधन नहीं।' : 'No community resources yet.'}</p>
      )}
      <Link href={`/submit${type ? `?type=${type}` : ''}`} className="text-sm font-bold text-[var(--color-accent)] mt-3 inline-block">
        + {hi ? 'अपना जोड़ें →' : 'Add yours →'}
      </Link>
    </div>
  );
}
