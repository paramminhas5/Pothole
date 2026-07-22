'use client';

import { useState } from 'react';
import { Locale, Category, PostType, Urgency } from '@/types';
import { CITIES_AREAS, CATEGORIES, MAX_DESCRIPTION_LENGTH } from '@/lib/constants';
import { t } from '@/i18n';

interface CreatePostClientProps {
  locale: Locale;
}

export default function CreatePostClient({ locale }: CreatePostClientProps) {
  const [postType, setPostType] = useState<PostType>('need');
  const [category, setCategory] = useState<Category | ''>('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [urgency, setUrgency] = useState<Urgency>('routine');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate-limited'>('idle');

  const availableAreas = CITIES_AREAS.find((c) => c.city === city)?.areas || [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category || !city || !area || !description.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: postType,
          category,
          city,
          area,
          urgency,
          description: description.trim(),
        }),
      });

      if (res.status === 429) {
        setStatus('rate-limited');
        return;
      }

      if (res.ok) {
        setStatus('success');
        setDescription('');
        setCategory('');
        setCity('');
        setArea('');
        setUrgency('routine');
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
        <p className="text-sm">{t(locale, 'createPost.success') as string}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Post Type */}
      <div>
        <label className="block text-sm font-medium mb-2">{t(locale, 'createPost.typeLabel') as string}</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPostType('need')}
            className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
              postType === 'need'
                ? 'border-[var(--color-urgent)] bg-red-50 dark:bg-red-900/20 text-[var(--color-urgent)]'
                : 'border-[var(--color-border)]'
            }`}
          >
            🆘 {t(locale, 'createPost.typeNeed') as string}
          </button>
          <button
            type="button"
            onClick={() => setPostType('offer')}
            className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
              postType === 'offer'
                ? 'border-[var(--color-success)] bg-green-50 dark:bg-green-900/20 text-[var(--color-success)]'
                : 'border-[var(--color-border)]'
            }`}
          >
            🤝 {t(locale, 'createPost.typeOffer') as string}
          </button>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">{t(locale, 'createPost.categoryLabel') as string}</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          required
          className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm"
        >
          <option value="">{t(locale, 'common.allCategories') as string}</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {locale === 'hi' ? c.labelHi : c.labelEn}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium mb-1">{t(locale, 'createPost.cityLabel') as string}</label>
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
        <label className="block text-sm font-medium mb-1">{t(locale, 'createPost.areaLabel') as string}</label>
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

      {/* Urgency */}
      <div>
        <label className="block text-sm font-medium mb-2">{t(locale, 'createPost.urgencyLabel') as string}</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setUrgency('routine')}
            className={`flex-1 py-2 px-3 rounded border text-sm ${
              urgency === 'routine'
                ? 'border-[var(--color-primary)] bg-blue-50 dark:bg-blue-900/20'
                : 'border-[var(--color-border)]'
            }`}
          >
            {t(locale, 'createPost.urgencyRoutine') as string}
          </button>
          <button
            type="button"
            onClick={() => setUrgency('urgent')}
            className={`flex-1 py-2 px-3 rounded border text-sm ${
              urgency === 'urgent'
                ? 'border-[var(--color-urgent)] bg-red-50 dark:bg-red-900/20 text-[var(--color-urgent)]'
                : 'border-[var(--color-border)]'
            }`}
          >
            ⚡ {t(locale, 'createPost.urgencyUrgent') as string}
          </button>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">{t(locale, 'createPost.urgencyHelp') as string}</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">{t(locale, 'createPost.descriptionLabel') as string}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
          placeholder={t(locale, 'createPost.descriptionPlaceholder') as string}
          maxLength={MAX_DESCRIPTION_LENGTH}
          required
          rows={4}
          className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-sm resize-y"
        />
        <p className="text-xs text-[var(--color-text-muted)] text-right mt-1">
          {description.length}/{MAX_DESCRIPTION_LENGTH}
        </p>
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
        <p className="text-sm text-[var(--color-urgent)] text-center">{t(locale, 'createPost.error') as string}</p>
      )}
      {status === 'rate-limited' && (
        <p className="text-sm text-[var(--color-warning)] text-center">{t(locale, 'createPost.rateLimited') as string}</p>
      )}
    </form>
  );
}
