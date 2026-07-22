'use client';

import { useState } from 'react';
import { Locale, Category } from '@/types';
import { CITIES_AREAS, CATEGORIES } from '@/lib/constants';
import { t } from '@/i18n';

interface SubmitChapterClientProps {
  locale: Locale;
}

export default function SubmitChapterClient({ locale }: SubmitChapterClientProps) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [contactMethod, setContactMethod] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const availableAreas = CITIES_AREAS.find((c) => c.city === city)?.areas || [];

  const toggleCategory = (cat: Category) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !city || !area || categories.length === 0 || !contactMethod) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, city, area, categories, contact_method: contactMethod, description }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setCity('');
        setArea('');
        setCategories([]);
        setContactMethod('');
        setDescription('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <p className="text-[var(--color-success)] font-medium text-lg mb-2">✓</p>
        <p className="text-sm">{t(locale, 'submitChapter.success') as string}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">{t(locale, 'submitChapter.nameLabel') as string}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t(locale, 'submitChapter.namePlaceholder') as string}
          required
          className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm"
        />
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium mb-1">{t(locale, 'submitChapter.cityLabel') as string}</label>
        <select
          value={city}
          onChange={(e) => { setCity(e.target.value); setArea(''); }}
          required
          className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm"
        >
          <option value="">{t(locale, 'common.allCities') as string}</option>
          {CITIES_AREAS.map((c) => (
            <option key={c.city} value={c.city}>{c.city}</option>
          ))}
        </select>
      </div>

      {/* Area */}
      <div>
        <label className="block text-sm font-medium mb-1">{t(locale, 'submitChapter.areaLabel') as string}</label>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          disabled={!city}
          className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm disabled:opacity-50"
        >
          <option value="">{t(locale, 'common.allAreas') as string}</option>
          {availableAreas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium mb-2">{t(locale, 'submitChapter.categoriesLabel') as string}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => toggleCategory(cat.value)}
              className={`text-xs px-3 py-2 rounded border transition-colors ${
                categories.includes(cat.value)
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
              }`}
            >
              {locale === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Method */}
      <div>
        <label className="block text-sm font-medium mb-1">{t(locale, 'submitChapter.contactLabel') as string}</label>
        <input
          type="text"
          value={contactMethod}
          onChange={(e) => setContactMethod(e.target.value)}
          placeholder={t(locale, 'submitChapter.contactPlaceholder') as string}
          required
          className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm"
        />
        <p className="text-xs text-[var(--color-text-muted)] mt-1">{t(locale, 'submitChapter.contactHelp') as string}</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">{t(locale, 'submitChapter.descriptionLabel') as string}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t(locale, 'submitChapter.descriptionPlaceholder') as string}
          maxLength={500}
          rows={3}
          className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm resize-y"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-dark)] disabled:opacity-50 transition-colors"
      >
        {status === 'loading' ? (t(locale, 'common.loading') as string) : (t(locale, 'common.submit') as string)}
      </button>

      {status === 'error' && (
        <p className="text-sm text-[var(--color-urgent)] text-center">{t(locale, 'submitChapter.error') as string}</p>
      )}
    </form>
  );
}
