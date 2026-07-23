import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import DirectoryClient from './DirectoryClient';

export default async function DirectoryPage() {
  const locale = ((await cookies()).get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';
  return <div className="page-shell content-page"><header className="page-heading"><p className="eyebrow">{hi ? 'सहायता खोजें' : 'Find support'}</p><h1>{hi ? 'अपने पास का सहायता समूह खोजें' : 'Find a support group near you'}</h1><p>{hi ? 'शहर, क्षेत्र या सहायता के प्रकार से खोजें।' : 'Search by city, area, or type of help.'}</p></header><div className="info-panel" role="note"><strong>{hi ? 'याद रखें:' : 'Remember:'}</strong>{' '}{hi ? 'लिस्टिंग की समीक्षा होती है, लेकिन इसका मतलब गारंटी नहीं है। कानूनी, आश्रय, विरोध या व्यक्तिगत मुलाकात के लिए भरोसेमंद वयस्क को शामिल करें।' : 'Listings are reviewed, but review is not a guarantee. Involve a trusted adult for legal, shelter, protest, or in-person contact.'}{' '}<Link href="/safety">{hi ? 'सुरक्षा गाइड' : 'Safety guide'}</Link>.</div><DirectoryClient locale={locale} /></div>;
}
