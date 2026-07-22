import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function ResourcesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-yellow mb-4">
          {isHindi ? 'निर्देशिका रोकी गई' : 'DIRECTORY WITHHELD'}
        </div>
        <h1 className="heading-1 mb-3">
          {isHindi ? 'आपातकालीन और सहायता संसाधन' : 'Emergency and Support Resources'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? 'पहले सूचीबद्ध नंबर और संगठन सीधे पुष्टि न होने के कारण हटा दिए गए हैं।'
            : 'Previously listed numbers and organizations were removed because they had not been directly confirmed.'}
        </p>
      </div>

      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">
          {isHindi ? 'तत्काल सहायता' : 'Immediate help'}
        </h2>
        <p className="text-sm leading-relaxed">
          {isHindi
            ? 'तत्काल खतरे में इस प्रोटोटाइप पर भरोसा न करें। अपने फ़ोन की आपातकालीन सुविधा, वर्तमान आधिकारिक सरकारी जानकारी या स्थानीय आपातकालीन सेवा का उपयोग करें। कानूनी, चिकित्सा या मानसिक-स्वास्थ्य सहायता के लिए योग्य स्थानीय पेशेवर से संपर्क करें।'
            : 'Do not rely on this prototype in immediate danger. Use your phone’s emergency function, current official government information, or local emergency services. Contact a qualified local professional for legal, medical, or mental-health support.'}
        </p>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-3 mb-3">
          {isHindi ? 'सूची दोबारा प्रकाशित करने की शर्तें' : 'Requirements before republishing listings'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'संगठन या सेवा से सीधी पुष्टि।' : 'Direct confirmation from the organization or service.'}</li>
          <li>→ {isHindi ? 'प्राथमिक आधिकारिक स्रोत और पुष्टि का रिकॉर्ड।' : 'A primary official source and confirmation record.'}</li>
          <li>→ {isHindi ? 'पुष्टि की तारीख, जिम्मेदार समीक्षक और अगली समीक्षा तिथि।' : 'Confirmation date, accountable reviewer, and next-review date.'}</li>
          <li>→ {isHindi ? 'गलती रिपोर्ट करने और तुरंत हटाने की प्रक्रिया।' : 'An error-reporting and emergency-unpublish process.'}</li>
        </ul>
      </section>

      <div className="brutal-card-flat text-xs space-y-1">
        <p><strong>{isHindi ? 'समीक्षा स्थिति:' : 'Review state:'}</strong> {isHindi ? 'योग्य भारत-विशिष्ट समीक्षा लंबित' : 'Qualified India-specific review pending'}</p>
        <p><strong>{isHindi ? 'स्वीकृत स्रोत:' : 'Approved sources:'}</strong> {isHindi ? 'कोई नहीं' : 'None'}</p>
        <p><strong>{isHindi ? 'अंतिम संपर्क पुष्टि:' : 'Last contact confirmation:'}</strong> {isHindi ? 'अभी तक नहीं हुई' : 'Not yet completed'}</p>
        <p><strong>{isHindi ? 'ताज़गी:' : 'Freshness:'}</strong> {isHindi ? 'वर्तमान नहीं; कोई नंबर प्रकाशित नहीं' : 'Not current; no numbers published'}</p>
      </div>
    </div>
  );
}
