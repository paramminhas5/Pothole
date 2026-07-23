import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function TelegramGuidePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-yellow mb-4">
          {isHindi ? 'इंटीग्रेशन उपलब्ध नहीं' : 'INTEGRATION UNAVAILABLE'}
        </div>
        <h1 className="heading-1 mb-3">
          {isHindi ? 'Telegram ड्राफ्ट नोट्स' : 'Telegram Draft Notes'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? 'Sahayata का कोई आधिकारिक Telegram बॉट, चैनल या स्वचालित पोस्टिंग सेवा नहीं है।'
            : 'Sahayata has no official Telegram bot, channel, or automated posting service.'}
        </p>
      </div>

      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">
          {isHindi ? 'सुरक्षा सीमा' : 'Safety limit'}
        </h2>
        <p className="text-sm leading-relaxed">
          {isHindi
            ? 'यह सामान्य शैक्षिक सामग्री है, डिजिटल-सुरक्षा सलाह नहीं। Telegram की गोपनीयता और सुरक्षा उसके वर्तमान उत्पाद, सेटिंग और उपयोग के तरीके पर निर्भर करती है। कोई सेटिंग गुमनामी, एन्क्रिप्शन या सुरक्षित पहचान की गारंटी नहीं देती। योग्य भारत-विशिष्ट डिजिटल-सुरक्षा समीक्षा लंबित है।'
            : 'This is general educational information, not digital-security advice. Telegram privacy and security depend on the current product, settings, and how it is used. No setting here guarantees anonymity, encryption, or protected identity. Qualified India-specific digital-security review is pending.'}
        </p>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-3 mb-3">
          {isHindi ? 'भविष्य के परीक्षण के लिए न्यूनतम नियम' : 'Minimum rules for future testing'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'केवल सिंथेटिक, गैर-संवेदनशील डेटा का उपयोग करें।' : 'Use synthetic, non-sensitive data only.'}</li>
          <li>→ {isHindi ? 'निजी संपर्क, सदस्य सूची, सटीक स्थान या आपातकालीन विवरण न भेजें।' : 'Do not send private contacts, member lists, precise locations, or emergency details.'}</li>
          <li>→ {isHindi ? 'स्वचालित पोस्टिंग से पहले सहमति, मॉडरेशन, सुधार और रोकने की प्रक्रिया बनाएं।' : 'Define consent, moderation, correction, and shutdown processes before automation.'}</li>
          <li>→ {isHindi ? 'वर्तमान आधिकारिक Telegram दस्तावेज़ और योग्य विशेषज्ञ समीक्षा का उपयोग करें।' : 'Use current official Telegram documentation and qualified expert review.'}</li>
        </ul>
      </section>

      <div className="brutal-card-flat text-xs space-y-1">
        <p><strong>{isHindi ? 'समीक्षा स्थिति:' : 'Review state:'}</strong> {isHindi ? 'भारत-विशिष्ट डिजिटल-सुरक्षा समीक्षा लंबित' : 'India-specific digital-security review pending'}</p>
        <p><strong>{isHindi ? 'स्रोत स्थिति:' : 'Source state:'}</strong> {isHindi ? 'आधिकारिक दस्तावेज़ की वर्तमान समीक्षा बाकी' : 'Current official documentation not yet reviewed'}</p>
        <p><strong>{isHindi ? 'अंतिम समीक्षा:' : 'Last review:'}</strong> {isHindi ? 'अभी तक नहीं हुई' : 'Not yet completed'}</p>
        <p><strong>{isHindi ? 'ताज़गी:' : 'Freshness:'}</strong> {isHindi ? 'वर्तमान मार्गदर्शन के रूप में उपयोग न करें' : 'Do not use as current guidance'}</p>
      </div>
    </div>
  );
}
