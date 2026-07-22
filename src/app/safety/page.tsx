import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function SafetyPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-yellow mb-4">
          {isHindi ? 'समीक्षा लंबित' : 'REVIEW PENDING'}
        </div>
        <h1 className="heading-1 mb-3">
          {isHindi ? 'सुरक्षा और अधिकार सामग्री' : 'Safety and Rights Material'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? 'पहले प्रकाशित कानूनी, चिकित्सा और डिजिटल-सुरक्षा निर्देश सार्वजनिक उपयोग से हटा दिए गए हैं।'
            : 'Previously published legal, medical, and digital-security instructions have been withdrawn from public use.'}
        </p>
      </div>

      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">
          {isHindi ? 'अभी इस सामग्री पर भरोसा न करें' : 'Do not rely on this material yet'}
        </h2>
        <p className="text-sm leading-relaxed">
          {isHindi
            ? 'यह केवल सामान्य शैक्षिक सामग्री का स्थान है, कानूनी या चिकित्सा सलाह नहीं। भारत-विशिष्ट योग्य कानूनी, चिकित्सा और डिजिटल-सुरक्षा समीक्षकों ने इसे मंज़ूरी नहीं दी है। तत्काल खतरे में स्थानीय आपातकालीन सेवाओं से संपर्क करें। अपनी स्थिति के लिए योग्य पेशेवर से सलाह लें।'
            : 'This is a placeholder for general educational information, not legal or medical advice. It has not been approved by qualified India-specific legal, medical, and digital-security reviewers. For immediate danger, contact local emergency services. Ask a qualified professional about your circumstances.'}
        </p>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-3 mb-3">
          {isHindi ? 'प्रकाशन से पहले आवश्यक समीक्षा' : 'Review required before publication'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'हर दावे के लिए प्राथमिक स्रोत और भारतीय क्षेत्राधिकार।' : 'A primary source and Indian jurisdiction for every claim.'}</li>
          <li>→ {isHindi ? 'नामित योग्य समीक्षक और समीक्षा तिथि।' : 'A named qualified reviewer and review date.'}</li>
          <li>→ {isHindi ? 'अगली समीक्षा या समाप्ति तिथि और सुधार इतिहास।' : 'A next-review or expiry date and correction history.'}</li>
          <li>→ {isHindi ? 'संगठनों और संपर्क विवरण की सीधी पुष्टि।' : 'Direct confirmation of organizations and contact details.'}</li>
        </ul>
      </section>

      <div className="brutal-card-flat text-xs space-y-1">
        <p><strong>{isHindi ? 'समीक्षा स्थिति:' : 'Review state:'}</strong> {isHindi ? 'योग्य भारत-विशिष्ट समीक्षा लंबित' : 'Qualified India-specific review pending'}</p>
        <p><strong>{isHindi ? 'स्वीकृत स्रोत:' : 'Approved sources:'}</strong> {isHindi ? 'कोई नहीं' : 'None'}</p>
        <p><strong>{isHindi ? 'अंतिम योग्य समीक्षा:' : 'Last qualified review:'}</strong> {isHindi ? 'अभी तक नहीं हुई' : 'Not yet completed'}</p>
        <p><strong>{isHindi ? 'ताज़गी:' : 'Freshness:'}</strong> {isHindi ? 'वर्तमान नहीं; प्रकाशन से पहले दोबारा जाँच आवश्यक' : 'Not current; re-check required before publication'}</p>
      </div>
    </div>
  );
}
