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
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="brutal-card !border-[var(--color-lime)] !shadow-[5px_5px_0px_var(--color-lime)] text-center animate-slide-in">
        <div className="text-4xl mb-4">✓</div>
        <p className="heading-3 mb-2">{t(locale, 'submitChapter.success') as string}</p>
        <p className="text-sm text-[var(--color-text-muted)]">
          {locale === 'hi' ? 'मॉडरेटर आपकी लिस्टिंग की जल्द समीक्षा करेंगे।' : 'A moderator will review your listing shortly.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-2">{t(locale, 'submitChapter.nameLabel') as string}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t(locale, 'submitChapter.namePlaceholder') as string}
          required
          className="brutal-input"
        />
      </div>

      {/* City + Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">{t(locale, 'submitChapter.cityLabel') as string}</label>
          <select
            value={city}
            onChange={(e) => { setCity(e.target.value); setArea(''); }}
            required
            className="brutal-select"
          >
            <option value="">{t(locale, 'common.allCities') as string}</option>
            {CITIES_AREAS.map((c) => (
              <option key={c.city} value={c.city}>{c.city}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">{t(locale, 'submitChapter.areaLabel') as string}</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
            disabled={!city}
            className="brutal-select"
          >
            <option value="">{t(locale, 'common.allAreas') as string}</option>
            {availableAreas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-3">{t(locale, 'submitChapter.categoriesLabel') as string}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => toggleCategory(cat.value)}
              className={`brutal-btn brutal-btn-sm text-left ${
                categories.includes(cat.value) ? 'brutal-btn-primary' : ''
              }`}
            >
              {locale === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Method */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-2">{t(locale, 'submitChapter.contactLabel') as string}</label>
        <input
          type="text"
          value={contactMethod}
          onChange={(e) => setContactMethod(e.target.value)}
          placeholder={t(locale, 'submitChapter.contactPlaceholder') as string}
          required
          className="brutal-input"
        />
        <p className="text-xs text-[var(--color-text-muted)] mt-2 font-medium">{t(locale, 'submitChapter.contactHelp') as string}</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-2">{t(locale, 'submitChapter.descriptionLabel') as string}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t(locale, 'submitChapter.descriptionPlaceholder') as string}
          maxLength={500}
          rows={3}
          className="brutal-textarea"
        />
      </div>

      {/* Submit */}
      <button type="submit" disabled={status === 'loading'} className="brutal-btn brutal-btn-dark brutal-btn-lg w-full">
        {status === 'loading' ? (t(locale, 'common.loading') as string) : (t(locale, 'common.submit') as string)}
      </button>

      {status === 'error' && (
        <div className="brutal-badge brutal-badge-red">{t(locale, 'submitChapter.error') as string}</div>
      )}
    </form>
  );
}
