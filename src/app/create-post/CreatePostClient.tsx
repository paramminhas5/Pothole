'use client';

import { useState, useCallback } from 'react';
import { Locale, Category, PostType, Urgency } from '@/types';
import { CITIES_AREAS, CATEGORIES, MAX_DESCRIPTION_LENGTH } from '@/lib/constants';
import { t } from '@/i18n';
import EmailVerification from '@/components/EmailVerification';

interface CreatePostClientProps {
  locale: Locale;
}

export default function CreatePostClient({ locale }: CreatePostClientProps) {
  const [verified, setVerified] = useState(false);
  const [postType, setPostType] = useState<PostType>('need');
  const [category, setCategory] = useState<Category | ''>('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [urgency, setUrgency] = useState<Urgency>('routine');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate-limited' | 'pii-blocked'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isHindi = locale === 'hi';
  const availableAreas = CITIES_AREAS.find((c) => c.city === city)?.areas || [];

  const handleVerified = useCallback(() => {
    setVerified(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category || !city || !area || !description.trim()) return;

    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: postType, category, city, area, urgency, description: description.trim() }),
      });
      if (res.status === 429) { setStatus('rate-limited'); return; }
      if (res.status === 422) {
        const data = await res.json();
        setErrorMessage(data.error || '');
        setStatus('pii-blocked');
        return;
      }
      if (res.ok) { setStatus('success'); } else { setStatus('error'); }
    } catch { setStatus('error'); }
  }

  if (status === 'success') {
    return (
      <div className="brutal-card !border-[var(--color-lime)] !shadow-[5px_5px_0px_var(--color-lime)] text-center animate-slide-in">
        <div className="text-4xl mb-4">✓</div>
        <p className="heading-3 mb-2">{t(locale, 'createPost.success') as string}</p>
        <a href="/board" className="brutal-btn brutal-btn-primary brutal-btn-sm mt-4">
          {isHindi ? 'बोर्ड देखें' : 'VIEW BOARD'} →
        </a>
      </div>
    );
  }

  return (
    <EmailVerification locale={locale} onVerified={handleVerified}>
      {verified && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Type — big toggle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-3">{t(locale, 'createPost.typeLabel') as string}</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPostType('need')}
                className={`brutal-btn brutal-btn-lg text-left ${postType === 'need' ? 'brutal-btn-danger' : ''}`}
              >
                <span className="text-xl mr-2">🆘</span>
                {t(locale, 'createPost.typeNeed') as string}
              </button>
              <button
                type="button"
                onClick={() => setPostType('offer')}
                className={`brutal-btn brutal-btn-lg text-left ${postType === 'offer' ? 'brutal-btn-success' : ''}`}
              >
                <span className="text-xl mr-2">🤝</span>
                {t(locale, 'createPost.typeOffer') as string}
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">{t(locale, 'createPost.categoryLabel') as string}</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as Category)} required className="brutal-select">
              <option value="">{t(locale, 'common.allCategories') as string}</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{locale === 'hi' ? c.labelHi : c.labelEn}</option>
              ))}
            </select>
          </div>

          {/* City + Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">{t(locale, 'createPost.cityLabel') as string}</label>
              <select value={city} onChange={(e) => { setCity(e.target.value); setArea(''); }} required className="brutal-select">
                <option value="">{t(locale, 'common.allCities') as string}</option>
                {CITIES_AREAS.map((c) => (
                  <option key={c.city} value={c.city}>{c.city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">{t(locale, 'createPost.areaLabel') as string}</label>
              <select value={area} onChange={(e) => setArea(e.target.value)} required disabled={!city} className="brutal-select">
                <option value="">{t(locale, 'common.allAreas') as string}</option>
                {availableAreas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-3">{t(locale, 'createPost.urgencyLabel') as string}</label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setUrgency('routine')} className={`brutal-btn brutal-btn-sm flex-1 ${urgency === 'routine' ? 'brutal-btn-dark' : ''}`}>
                {t(locale, 'createPost.urgencyRoutine') as string}
              </button>
              <button type="button" onClick={() => setUrgency('urgent')} className={`brutal-btn brutal-btn-sm flex-1 ${urgency === 'urgent' ? 'brutal-btn-danger' : ''}`}>
                ⚡ {t(locale, 'createPost.urgencyUrgent') as string}
              </button>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-2 font-medium">{t(locale, 'createPost.urgencyHelp') as string}</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">{t(locale, 'createPost.descriptionLabel') as string}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
              placeholder={t(locale, 'createPost.descriptionPlaceholder') as string}
              maxLength={MAX_DESCRIPTION_LENGTH}
              required
              rows={4}
              className="brutal-textarea"
            />
            <p className="text-xs text-[var(--color-text-muted)] text-right mt-1 font-mono">
              {description.length}/{MAX_DESCRIPTION_LENGTH}
            </p>
          </div>

          {/* Submit */}
          <button type="submit" disabled={status === 'loading'} className="brutal-btn brutal-btn-primary brutal-btn-lg w-full">
            {status === 'loading' ? (t(locale, 'common.loading') as string) : (t(locale, 'common.submit') as string)}
          </button>

          {status === 'error' && <div className="brutal-badge brutal-badge-red">{t(locale, 'createPost.error') as string}</div>}
          {status === 'rate-limited' && <div className="brutal-badge brutal-badge-yellow">{t(locale, 'createPost.rateLimited') as string}</div>}
          {status === 'pii-blocked' && (
            <div className="brutal-card-flat !border-[var(--color-red)] !p-4">
              <p className="text-sm text-[var(--color-red)] font-bold">
                {errorMessage || (isHindi
                  ? 'आपकी पोस्ट में व्यक्तिगत जानकारी है। कृपया फ़ोन नंबर, आधार या ID नंबर हटाएं।'
                  : 'Your post contains personal information. Please remove phone numbers, Aadhaar, or ID numbers.')}
              </p>
            </div>
          )}
        </form>
      )}
    </EmailVerification>
  );
}
