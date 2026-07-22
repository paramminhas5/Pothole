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

  const isHindi = locale === 'hi';

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder={t(locale, 'common.search') as string}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="brutal-input flex-1"
          aria-label="Search chapters"
        />
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="brutal-select md:w-48"
          aria-label="Filter by city"
        >
          <option value="">{t(locale, 'common.allCities') as string}</option>
          {CITIES_AREAS.map((c) => (
            <option key={c.city} value={c.city}>{c.city}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="brutal-select md:w-48"
          aria-label="Filter by category"
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
      <div className="mb-8">
        <Link href="/submit-chapter" className="brutal-btn brutal-btn-primary brutal-btn-sm">
          + {t(locale, 'directory.registerNew') as string}
        </Link>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-16">
          <div className="brutal-badge">{t(locale, 'common.loading') as string}</div>
        </div>
      ) : filteredChapters.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--color-text-muted)] text-lg">{t(locale, 'directory.noChapters') as string}</p>
          <Link href="/submit-chapter" className="brutal-btn brutal-btn-primary mt-4">
            {isHindi ? 'पहला समूह जोड़ें' : 'ADD THE FIRST GROUP'} →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredChapters.map((chapter) => (
            <div key={chapter.id} className="brutal-card">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="heading-3 mb-1">{chapter.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-3 font-medium">
                    📍 {chapter.city} — {chapter.area}
                  </p>
                  {chapter.description && (
                    <p className="text-sm mb-4 leading-relaxed">{chapter.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {chapter.categories.map((cat) => (
                      <span key={cat} className="brutal-badge brutal-badge-sky">
                        {getCategoryLabel(cat as Category)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end shrink-0">
                  <a
                    href={chapter.contact_method}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn brutal-btn-primary brutal-btn-sm"
                  >
                    {t(locale, 'directory.contact') as string} →
                  </a>
                  <span className="text-xs text-[var(--color-text-muted)] font-medium">
                    {t(locale, 'directory.lastActive') as string}: {new Date(chapter.updated_at).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN')}
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
