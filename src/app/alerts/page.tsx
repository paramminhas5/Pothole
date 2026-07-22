import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function AlertsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-yellow mb-4">
          {isHindi ? 'उपलब्ध नहीं' : 'NOT AVAILABLE'}
        </div>
        <h1 className="heading-1 mb-3">
          {isHindi ? 'अलर्ट सेवा बंद है' : 'Alerts Are Disabled'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? 'Sahayata अभी अलर्ट प्रकाशित, जाँच या वितरित नहीं करता।'
            : 'Sahayata does not currently publish, verify, or deliver alerts.'}
        </p>
      </div>

      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">
          {isHindi ? 'इस पेज पर भरोसा न करें' : 'Do not rely on this page'}
        </h2>
        <p className="text-sm mb-3">
          {isHindi
            ? 'यहाँ कोई रियलटाइम अपडेट, पुश सूचना, समन्वयक सत्यापन या आपातकालीन निगरानी नहीं है।'
            : 'There are no realtime updates, push notifications, coordinator checks, or emergency monitoring here.'}
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">
          {isHindi
            ? 'तत्काल खतरे में अपने स्थानीय आपातकालीन साधनों और आधिकारिक स्थानीय सूचनाओं का उपयोग करें।'
            : 'If there is immediate danger, use local emergency services and current official local information.'}
        </p>
      </section>

      <div className="brutal-banner text-center text-xs">
        {isHindi
          ? 'स्थिति: संचालन और सुरक्षा समीक्षा लंबित · कोई सक्रिय अलर्ट नहीं'
          : 'STATUS: OPERATIONS AND SAFETY REVIEW PENDING · NO ACTIVE ALERTS'}
      </div>
    </div>
  );
}
