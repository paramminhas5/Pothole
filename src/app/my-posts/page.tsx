import { cookies } from 'next/headers';
import { Locale } from '@/types';
import MyPostsClient from './MyPostsClient';
import EmailVerification from '@/components/EmailVerification';

export default async function MyPostsPage() {
  const store = await cookies();
  const locale = (store.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="page-shell content-page">
      <header className="page-heading">
        <p className="eyebrow">{hi ? 'मेरी गतिविधि' : 'My activity'}</p>
        <h1>{hi ? 'मेरी पोस्ट और जवाब' : 'My posts and replies'}</h1>
        <p>{hi ? 'इस डिवाइस पर बनाई पोस्ट बंद करें, समय बढ़ाएँ और निजी जवाब देखें।' : 'Close or extend posts made on this device and review private replies.'}</p>
      </header>
      <div className="info-panel" role="note">
        {hi ? 'जवाब देने वाले की पहचान की पुष्टि नहीं हुई है। निजी जानकारी साझा करने या मिलने से पहले भरोसेमंद वयस्क को शामिल करें।' : 'A responder’s identity is not verified. Involve a trusted adult before sharing private details or meeting.'}
      </div>
      <section className="brutal-card-flat mb-6" aria-labelledby="email-updates-title">
        <h2 id="email-updates-title" className="heading-3 mb-2">{hi ? 'ईमेल सूचना (वैकल्पिक)' : 'Email updates (optional)'}</h2>
        <p className="field-help mb-4">{hi ? 'नई निजी प्रतिक्रिया आने पर सामान्य सूचना पाएँ। ईमेल में पोस्ट या संपर्क विवरण नहीं भेजे जाते।' : 'Get a general notice when a private response arrives. Post and contact details are not included in email.'}</p>
        <EmailVerification locale={locale} />
      </section>
      <MyPostsClient locale={locale} />
    </div>
  );
}
