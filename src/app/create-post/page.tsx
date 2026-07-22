import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import CreatePostClient from './CreatePostClient';

export default async function CreatePostPage() {
  const locale = ((await cookies()).get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';
  return <div className="page-shell form-page"><header className="page-heading"><p className="eyebrow">{hi ? 'मदद पाएँ या दें' : 'Get or offer help'}</p><h1>{hi ? 'छोटी पोस्ट बनाएँ' : 'Make a short post'}</h1><p>{hi ? 'केवल जरूरी जानकारी दें। सटीक पता, पूरा नाम, फोन या पहचान संख्या न लिखें।' : 'Share only what is needed. Do not include an exact address, full name, phone number, or ID number.'}</p></header><div className="info-panel" role="note"><strong>{hi ? 'आगे क्या होगा:' : 'What happens next:'}</strong>{' '}{hi ? 'मानव सत्यापन के बाद पोस्ट मॉडरेटर के पास जाएगी। स्वीकृत होने पर यह शहर और क्षेत्र के साथ बोर्ड पर दिखेगी और 72 घंटे बाद दिखना बंद हो जाएगी।' : 'After a quick spam check, a moderator reviews your post. If approved, it appears with your city and area, then stops showing after 72 hours.'}</div><CreatePostClient locale={locale} /><Link href="/" className="safe-exit-link">{hi ? 'रद्द करें और होम पर जाएँ' : 'Cancel and return home'}</Link></div>;
}
