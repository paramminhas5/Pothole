import { cookies } from 'next/headers';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';

export default async function ToolkitPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10 flex justify-between items-start gap-4">
        <div>
          <div className="brutal-badge brutal-badge-yellow mb-4">
            {isHindi ? 'ड्राफ्ट' : 'DRAFT'}
          </div>
          <h1 className="heading-1 mb-3">
            {isHindi ? 'न्यूनतम-जोखिम योजना टूलकिट' : 'Low-Risk Planning Toolkit'}
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg">
            {isHindi
              ? 'सामान्य शैक्षिक योजना सामग्री। कानूनी, चिकित्सा या डिजिटल-सुरक्षा सलाह नहीं।'
              : 'General educational planning material. Not legal, medical, or digital-security advice.'}
          </p>
        </div>
        <PrintButton locale={locale} />
      </div>

      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <h2 className="heading-3 mb-3">
          {isHindi ? 'समीक्षा चेतावनी' : 'Review warning'}
        </h2>
        <p className="text-sm">
          {isHindi
            ? 'भारत-विशिष्ट योग्य समीक्षकों ने इस ड्राफ्ट को मंज़ूरी नहीं दी है। आपातकाल, गिरफ्तारी, चिकित्सा घटना, भीड़ सुरक्षा या संवेदनशील संचार के लिए इसका उपयोग न करें।'
            : 'Qualified India-specific reviewers have not approved this draft. Do not use it for emergencies, arrest, medical incidents, crowd safety, or sensitive communications.'}
        </p>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">
          {isHindi ? '1. उद्देश्य स्पष्ट करें' : '1. Define the purpose'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'एक स्पष्ट, शांतिपूर्ण और कानूनी उद्देश्य लिखें।' : 'Write one clear, peaceful, lawful objective.'}</li>
          <li>→ {isHindi ? 'जिम्मेदार निर्णयकर्ता और समय सीमा तय करें।' : 'Name the accountable decision-maker and a deadline.'}</li>
          <li>→ {isHindi ? 'सफलता, रोकने की शर्त और समीक्षा बिंदु तय करें।' : 'Define success, stop conditions, and a review point.'}</li>
        </ul>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">
          {isHindi ? '2. लोगों और डेटा की सुरक्षा करें' : '2. Protect people and data'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'भागीदारी स्वैच्छिक रखें और स्पष्ट सहमति लें।' : 'Keep participation voluntary and obtain clear consent.'}</li>
          <li>→ {isHindi ? 'केवल आवश्यक जानकारी लें; सटीक स्थान और संवेदनशील पहचान से बचें।' : 'Collect only what is needed; avoid precise locations and sensitive identity data.'}</li>
          <li>→ {isHindi ? 'डेटा कौन देख सकता है और कब हटेगा, पहले तय करें।' : 'Decide who can access data and when it will be removed before collecting it.'}</li>
        </ul>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">
          {isHindi ? '3. जानकारी का रिकॉर्ड रखें' : '3. Keep an information record'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'हर तथ्य के साथ स्रोत, समय और जिम्मेदार व्यक्ति लिखें।' : 'Record the source, time, and accountable person for each factual update.'}</li>
          <li>→ {isHindi ? 'अपुष्ट जानकारी को स्पष्ट रूप से अपुष्ट लिखें और साझा न करें।' : 'Label unconfirmed information clearly and do not circulate it as fact.'}</li>
          <li>→ {isHindi ? 'गलती होने पर उसी जगह स्पष्ट सुधार प्रकाशित करें।' : 'Publish a clear correction in the same place when something is wrong.'}</li>
        </ul>
      </section>

      <div className="brutal-card-flat text-xs space-y-1">
        <p><strong>{isHindi ? 'समीक्षा स्थिति:' : 'Review state:'}</strong> {isHindi ? 'योग्य भारत-विशिष्ट समीक्षा लंबित' : 'Qualified India-specific review pending'}</p>
        <p><strong>{isHindi ? 'स्रोत:' : 'Sources:'}</strong> {isHindi ? 'आंतरिक ड्राफ्ट; कोई बाहरी स्रोत स्वीकृत नहीं' : 'Internal draft; no external sources approved'}</p>
        <p><strong>{isHindi ? 'अंतिम समीक्षा:' : 'Last review:'}</strong> {isHindi ? 'संपादकीय रोक, तारीख लागू नहीं' : 'Editorial containment, date not applicable'}</p>
        <p><strong>{isHindi ? 'ताज़गी:' : 'Freshness:'}</strong> {isHindi ? 'प्रकाशन से पहले पुनः समीक्षा आवश्यक' : 'Re-review required before publication'}</p>
      </div>
    </div>
  );
}
