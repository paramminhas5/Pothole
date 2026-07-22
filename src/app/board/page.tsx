import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import BoardClient from './BoardClient';

export default async function BoardPage() {
  const locale = ((await cookies()).get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';
  return <div className="page-shell content-page"><header className="page-heading"><p className="eyebrow">{hi ? 'मदद करें' : 'Offer help'}</p><h1>{hi ? 'देखें कि लोगों को क्या चाहिए' : 'See what people need'}</h1><p>{hi ? 'स्थान और जरूरत के अनुसार खोजें। जवाब देने से पहले सुरक्षा संदेश पढ़ें।' : 'Search by place and need. Read the safety message before you respond.'}</p></header><div className="info-panel" role="note"><strong>{hi ? 'संपर्क करने से पहले:' : 'Before you contact anyone:'}</strong>{' '}{hi ? 'निजी जानकारी कम रखें और अकेले न मिलें। 18 वर्ष से कम हैं तो भरोसेमंद वयस्क के साथ आगे बढ़ें।' : 'Share as little private information as possible and never meet alone. If you are under 18, continue with a trusted adult.'}{' '}<Link href="/safety">{hi ? 'सुरक्षा पढ़ें' : 'Read safety guidance'}</Link>.</div><BoardClient locale={locale} /></div>;
}
