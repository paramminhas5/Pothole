import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import SubmitChapterClient from './SubmitChapterClient';

export default async function SubmitChapterPage() {
  const locale = ((await cookies()).get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';
  return <div className="page-shell form-page"><header className="page-heading"><p className="eyebrow">{hi ? 'समूह जोड़ें' : 'Add a group'}</p><h1>{hi ? 'सहायता समूह जमा करें' : 'Submit a support group'}</h1><p>{hi ? 'केवल ऐसे समूह को जोड़ें जिसका सार्वजनिक संपर्क साझा करने की आपको अनुमति है।' : 'Only add a group when you have permission to share its public contact.'}</p></header><div className="info-panel" role="note"><strong>{hi ? 'सार्वजनिक जानकारी:' : 'Public information:'}</strong>{' '}{hi ? 'समूह का नाम, शहर, क्षेत्र, सेवाएँ, विवरण और संपर्क स्वीकृति के बाद सभी को दिखेंगे। 18 वर्ष से कम हैं तो भरोसेमंद वयस्क से इसे जमा करवाएँ।' : 'The group name, city, area, services, description, and contact will be visible to everyone after approval. If you are under 18, ask a trusted adult to submit it.'}</div><SubmitChapterClient locale={locale} /><Link href="/directory" className="safe-exit-link">{hi ? 'रद्द करें और निर्देशिका पर जाएँ' : 'Cancel and return to directory'}</Link></div>;
}
