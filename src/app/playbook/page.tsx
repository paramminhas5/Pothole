import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';

export default async function PlaybookPage() {
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
          <h1 className="heading-display mb-3">
            {isHindi ? 'नागरिक योजना प्लेबुक' : 'Civic Planning Playbook'}
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg">
            {isHindi
              ? 'शांतिपूर्ण नागरिक परियोजनाओं के लिए सामान्य योजना ढाँचा।'
              : 'A general planning framework for peaceful civic projects.'}
          </p>
        </div>
        <PrintButton locale={locale} />
      </div>

      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">
          {isHindi ? 'महत्वपूर्ण सीमा' : 'Important limit'}
        </h2>
        <p className="text-sm leading-relaxed">
          {isHindi
            ? 'यह सामान्य शैक्षिक सामग्री है, संचालन निर्देश या कानूनी, चिकित्सा या डिजिटल-सुरक्षा सलाह नहीं। योग्य भारत-विशिष्ट समीक्षा लंबित है। आपातकाल, हिरासत, चिकित्सा घटना, भीड़ नियंत्रण या संवेदनशील संचार के लिए इसका उपयोग न करें।'
            : 'This is general educational material, not operational instructions or legal, medical, or digital-security advice. Qualified India-specific review is pending. Do not use it for emergencies, detention, medical incidents, crowd control, or sensitive communications.'}
        </p>
      </section>

      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-lime mb-4">1</div>
        <h2 className="heading-2 mb-4">
          {isHindi ? 'समस्या और जिम्मेदारी' : 'Problem and accountability'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'समस्या को एक वाक्य में लिखें और प्रभावित लोगों से पुष्टि करें।' : 'Describe the problem in one sentence and confirm it with affected people.'}</li>
          <li>→ {isHindi ? 'उस संस्था या व्यक्ति की पहचान करें जिसके पास निर्णय का अधिकार है।' : 'Identify the institution or person with authority to decide.'}</li>
          <li>→ {isHindi ? 'एक स्पष्ट, शांतिपूर्ण, मापने योग्य अनुरोध तय करें।' : 'Set one clear, peaceful, measurable request.'}</li>
        </ul>
      </section>

      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-sky mb-4">2</div>
        <h2 className="heading-2 mb-4">
          {isHindi ? 'सहमति और न्यूनतम डेटा' : 'Consent and minimum data'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'भूमिकाएँ, निर्णय प्रक्रिया और रुकने का तरीका पहले लिखें।' : 'Document roles, decision rules, and how participation can stop.'}</li>
          <li>→ {isHindi ? 'केवल आवश्यक डेटा लें और संवेदनशील विवरण साझा न करें।' : 'Collect only necessary data and do not circulate sensitive details.'}</li>
          <li>→ {isHindi ? 'पेशेवर विषय योग्य पेशेवर को सौंपें।' : 'Refer professional matters to a qualified professional.'}</li>
        </ul>
      </section>

      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-accent mb-4">3</div>
        <h2 className="heading-2 mb-4">
          {isHindi ? 'स्रोत, सुधार और समीक्षा' : 'Sources, corrections, and review'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'अपडेट के साथ स्रोत और समय दर्ज करें।' : 'Record a source and timestamp with each update.'}</li>
          <li>→ {isHindi ? 'अनिश्चित जानकारी को तथ्य की तरह न लिखें।' : 'Do not present uncertain information as fact.'}</li>
          <li>→ {isHindi ? 'निर्धारित समय पर परिणाम, नुकसान और अगले कदम की समीक्षा करें।' : 'Review outcomes, harms, and next steps at a set time.'}</li>
        </ul>
      </section>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Link href="/toolkit" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">
          {isHindi ? 'योजना टूलकिट' : 'PLANNING TOOLKIT'} →
        </Link>
        <Link href="/guide" className="brutal-btn brutal-btn-lg text-center">
          {isHindi ? 'प्रोटोटाइप गाइड' : 'PROTOTYPE GUIDE'} →
        </Link>
      </div>

      <div className="brutal-card-flat text-xs space-y-1 mt-8">
        <p><strong>{isHindi ? 'समीक्षा स्थिति:' : 'Review state:'}</strong> {isHindi ? 'योग्य भारत-विशिष्ट समीक्षा लंबित' : 'Qualified India-specific review pending'}</p>
        <p><strong>{isHindi ? 'स्रोत:' : 'Sources:'}</strong> {isHindi ? 'आंतरिक ड्राफ्ट; कोई बाहरी स्रोत स्वीकृत नहीं' : 'Internal draft; no external sources approved'}</p>
        <p><strong>{isHindi ? 'अंतिम समीक्षा:' : 'Last review:'}</strong> {isHindi ? 'संपादकीय रोक, तारीख लागू नहीं' : 'Editorial containment, date not applicable'}</p>
        <p><strong>{isHindi ? 'ताज़गी:' : 'Freshness:'}</strong> {isHindi ? 'प्रकाशन से पहले पुनः समीक्षा आवश्यक' : 'Re-review required before publication'}</p>
      </div>
    </div>
  );
}
