'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Chapter, Locale, Category } from '@/types';
import { CITIES_AREAS, CATEGORIES } from '@/lib/constants';
import { t } from '@/i18n';

interface DirectoryClientProps {
  locale: Locale;
}

export default function DirectoryClient({ locale }: DirectoryClientProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchChapters();
  }, [cityFilter, categoryFilter]);

  async function fetchChapters() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cityFilter) params.set('city', cityFilter);
      if (categoryFilter) params.set('category', categoryFilter);

      const res = await fetch(`/api/chapters?${params.toString()}`);
      const data = await res.json();
      setChapters(data.chapters || []);
    } catch {
      setChapters([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredChapters = chapters.filter((ch) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      ch.name.toLowerCase().includes(q) ||
      ch.description.toLowerCase().includes(q) ||
      ch.area.toLowerCase().includes(q)
    );
  });

  const getCategoryLabel = (cat: Category) => {
    const found = CATEGORIES.find((c) => c.value === cat);
    if (!found) return cat;
    return locale === 'hi' ? found.labelHi : found.labelEn;
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder={t(locale, 'common.search') as string}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm"
        />
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm"
        >
          <option value="">{t(locale, 'common.allCities') as string}</option>
          {CITIES_AREAS.map((c) => (
            <option key={c.city} value={c.city}>{c.city}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm"
        >
          <option value="">{t(locale, 'common.allCategories') as string}</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {locale === 'hi' ? c.labelHi : c.labelEn}
            </option>
          ))}
        </select>
      </div>

      {/* Register CTA */}
      <div className="mb-6">
        <Link
          href="/submit-chapter"
          className="inline-block text-sm bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          + {t(locale, 'directory.registerNew') as string}
        </Link>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">{t(locale, 'common.loading') as string}</div>
      ) : filteredChapters.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">{t(locale, 'directory.noChapters') as string}</div>
      ) : (
        <div className="grid gap-4">
          {filteredChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-5 hover:border-[var(--color-primary)] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{chapter.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-2">
                    📍 {chapter.city} — {chapter.area}
                  </p>
                  {chapter.description && (
                    <p className="text-sm mb-3">{chapter.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {chapter.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-[var(--color-primary)] rounded-full"
                      >
                        {getCategoryLabel(cat as Category)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <a
                    href={chapter.contact_method}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-[var(--color-primary)] text-white px-3 py-1.5 rounded hover:bg-[var(--color-primary-dark)] transition-colors"
                  >
                    {t(locale, 'directory.contact') as string} →
                  </a>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {t(locale, 'directory.lastActive') as string}: {new Date(chapter.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
