import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import { t } from '@/i18n';

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--color-primary)]">
          {t(locale, 'home.heroTitle') as string}
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-3xl mx-auto mb-8">
          {t(locale, 'home.heroSubtitle') as string}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/directory"
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            {t(locale, 'nav.directory') as string} →
          </Link>
          <Link
            href="/board"
            className="px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            {t(locale, 'nav.board') as string} →
          </Link>
        </div>
      </section>

      {/* Safety Note Banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-12 text-center">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          ⚠️ {t(locale, 'common.safetyNote') as string}
        </p>
      </div>

      {/* What this is / What this isn't */}
      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3 text-[var(--color-success)]">
            ✓ {t(locale, 'home.whatIsThis') as string}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {t(locale, 'home.whatIsThisText') as string}
          </p>
        </div>
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3 text-[var(--color-urgent)]">
            ✗ {t(locale, 'home.whatIsNotThis') as string}
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {t(locale, 'home.whatIsNotThisText') as string}
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <Link href="/directory" className="block bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-primary)] transition-colors">
          <h3 className="text-lg font-bold mb-2">📋 {t(locale, 'directory.title') as string}</h3>
          <p className="text-sm text-[var(--color-text-muted)]">{t(locale, 'home.directoryDesc') as string}</p>
        </Link>
        <Link href="/board" className="block bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-primary)] transition-colors">
          <h3 className="text-lg font-bold mb-2">🔄 {t(locale, 'board.title') as string}</h3>
          <p className="text-sm text-[var(--color-text-muted)]">{t(locale, 'home.boardDesc') as string}</p>
        </Link>
      </section>

      {/* Trust Pillars */}
      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">🔒 {t(locale, 'home.privacyTitle') as string}</h3>
          <p className="text-sm text-[var(--color-text-muted)]">{t(locale, 'home.privacyText') as string}</p>
        </div>
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">✅ {t(locale, 'home.moderationTitle') as string}</h3>
          <p className="text-sm text-[var(--color-text-muted)]">{t(locale, 'home.moderationText') as string}</p>
        </div>
      </section>

      {/* Moderation Policy */}
      <section className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
        <h3 className="text-lg font-bold mb-3">{t(locale, 'moderation.policyTitle') as string}</h3>
        <p className="text-sm text-[var(--color-text-muted)] mb-3">{t(locale, 'moderation.policyIntro') as string}</p>
        <ul className="list-disc list-inside text-sm text-[var(--color-text-muted)] space-y-1">
          {(t(locale, 'moderation.policyItems') as string[]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
