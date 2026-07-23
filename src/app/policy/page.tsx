import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function PolicyPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <h1 className="heading-display mb-6">{hi ? 'सामग्री नीति और पारदर्शिता' : 'Content Policy & Transparency'}</h1>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">{hi ? '✅ अनुमत' : '✅ Allowed'}</h2>
        <ul className="space-y-2 text-sm">
          <li>✓ {hi ? 'पारस्परिक सहायता: भोजन, आश्रय, परिवहन, कानूनी, चिकित्सा' : 'Mutual aid: food, shelter, transport, legal, medical'}</li>
          <li>✓ {hi ? 'शांतिपूर्ण, कानूनी नागरिक संगठन' : 'Peaceful, lawful civic organizing'}</li>
          <li>✓ {hi ? 'सूचना साझा करना (सत्यापित या स्पष्ट रूप से अपुष्ट चिह्नित)' : 'Information sharing (verified or clearly marked unverified)'}</li>
          <li>✓ {hi ? 'RTI/FIR/PIL/शिकायत — संस्थागत कार्रवाई' : 'RTI/FIR/PIL/complaints — institutional action'}</li>
          <li>✓ {hi ? 'सहायता समूह बनाना और उनमें शामिल होना' : 'Creating and joining support groups'}</li>
          <li>✓ {hi ? 'दस्तावेज़ीकरण और सबूत संरक्षण' : 'Documentation and evidence preservation'}</li>
        </ul>
      </section>

      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">{hi ? '❌ प्रतिबंधित' : '❌ Prohibited'}</h2>
        <ul className="space-y-2 text-sm">
          <li>✗ {hi ? 'हिंसा का आह्वान या उकसावा' : 'Calls for or incitement of violence'}</li>
          <li>✗ {hi ? 'घृणा भाषण — जाति, धर्म, लिंग, यौन अभिविन्यास पर हमला' : 'Hate speech — attacks based on caste, religion, gender, sexual orientation'}</li>
          <li>✗ {hi ? 'डॉक्सिंग — किसी की निजी जानकारी बिना सहमति' : 'Doxxing — publishing someone`s private info without consent'}</li>
          <li>✗ {hi ? 'झूठी रिपोर्ट — दूसरों को नुकसान पहुँचाने के लिए' : 'False reports — designed to harm others'}</li>
          <li>✗ {hi ? 'अवैध गतिविधि — ड्रग्स, हथियार, तस्करी' : 'Illegal activity — drugs, weapons, trafficking'}</li>
          <li>✗ {hi ? 'प्रतिरूपण — किसी और का होने का दावा' : 'Impersonation — claiming to be someone else'}</li>
          <li>✗ {hi ? 'स्पैम, घोटाले, या वाणिज्यिक प्रचार' : 'Spam, scams, or commercial promotion'}</li>
          <li>✗ {hi ? 'निजी जानकारी — फोन नंबर, पूरा पता, ID' : 'Personal info — phone numbers, full addresses, IDs'}</li>
          <li>✗ {hi ? 'अपुष्ट अफवाह को तथ्य के रूप में प्रस्तुत करना' : 'Presenting unverified rumor as fact'}</li>
        </ul>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">{hi ? '🔍 मॉडरेशन कैसे काम करता है' : '🔍 How Moderation Works'}</h2>
        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li>{hi ? 'हर पोस्ट/ग्रुप सबमिशन एक मॉडरेटर द्वारा जाँचा जाता है।' : 'Every post/group submission is reviewed by a human moderator.'}</li>
          <li>{hi ? 'PII (निजी पहचान जानकारी) ऑटो-डिटेक्ट होती है।' : 'PII (personal identifying information) is auto-detected.'}</li>
          <li>{hi ? 'स्वीकृत सामग्री सार्वजनिक होती है। अस्वीकृत हटा दी जाती है।' : 'Approved content goes public. Rejected content is removed.'}</li>
          <li>{hi ? 'कोई भी "रिपोर्ट" बटन से सामग्री फ्लैग कर सकता है।' : 'Anyone can flag content using the "Report" button.'}</li>
          <li>{hi ? 'पोस्ट 72 घंटे में ऑटो-एक्सपायर।' : 'Posts auto-expire in 72 hours.'}</li>
        </ol>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">{hi ? '✓ सत्यापन' : '✓ Verification'}</h2>
        <div className="text-sm space-y-2">
          <p>{hi ? 'संसाधन पेज पर हर जानकारी के साथ:' : 'Every item on the resources page includes:'}</p>
          <ul className="space-y-1 ml-4">
            <li>→ <strong>{hi ? 'स्रोत' : 'Source'}</strong> {hi ? '(आधिकारिक वेबसाइट लिंक)' : '(official website link)'}</li>
            <li>→ <strong>{hi ? 'सत्यापन स्थिति' : 'Verification status'}</strong> {hi ? '(✅ सत्यापित / ⚠️ समुदाय-प्रस्तुत)' : '(✅ Verified / ⚠️ Community-submitted)'}</li>
            <li>→ <strong>{hi ? 'गलती रिपोर्ट करें' : 'Report error'}</strong> {hi ? 'बटन हर आइटम पर' : 'button on every item'}</li>
          </ul>
          <p className="mt-3">{hi ? 'ग्रुप: मॉडरेटर जाँचता है कि संपर्क लिंक काम करता है और विवरण उचित है।' : 'Groups: moderator verifies contact link works and description is appropriate.'}</p>
        </div>
      </section>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">{hi ? '🏗️ ओपन सोर्स और पारदर्शिता' : '🏗️ Open Source & Transparency'}</h2>
        <div className="text-sm space-y-2">
          <p>→ {hi ? 'कोड सार्वजनिक है:' : 'Code is public:'} <a href="https://github.com/paramminhas5/Pothole" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">github.com/paramminhas5/Pothole ↗</a></p>
          <p>→ {hi ? 'कोई भी कोड ऑडिट कर सकता है।' : 'Anyone can audit the code.'}</p>
          <p>→ {hi ? 'कोई ट्रैकिंग, एनालिटिक्स, या तीसरी-पार्टी स्क्रिप्ट नहीं।' : 'No tracking, analytics, or third-party scripts.'}</p>
          <p>→ {hi ? 'RTI/FIR जनरेटर: सब ब्राउज़र में — कुछ भी सर्वर को नहीं भेजा।' : 'RTI/FIR generators: all in browser — nothing sent to server.'}</p>
        </div>
      </section>

      <div className="text-center mt-8">
        <Link href="/" className="brutal-btn brutal-btn-primary">{hi ? '← होम' : '← Home'}</Link>
      </div>
    </div>
  );
}
