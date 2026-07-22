import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';
  return (
    <div>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="page-shell home-hero-inner">
          <p className="eyebrow">{hi ? 'स्थानीय मदद, सरल तरीके से' : 'Local help, made simple'}</p>
          <h1 id="home-title" className="home-title">{hi ? 'आपको आज क्या चाहिए?' : 'What do you need today?'}</h1>
          <p className="home-intro">{hi ? 'मदद माँगें, मदद दें, या अपने पास का भरोसेमंद सहायता समूह खोजें।' : 'Ask for help, offer help, or find a support group near you.'}</p>
          <Link href="/create-post" className="brutal-btn brutal-btn-primary brutal-btn-lg home-primary-action">{hi ? 'मदद पाएँ' : 'Get help'}</Link>
          <p className="action-note">{hi ? 'पोस्ट करने में कुछ मिनट लगते हैं। सार्वजनिक होने से पहले इसकी समीक्षा होगी।' : 'It takes a few minutes. Your post is reviewed before it becomes public.'}</p>
        </div>
      </section>
      <section className="page-shell home-choices" aria-labelledby="choose-title">
        <h2 id="choose-title" className="section-title">{hi ? 'एक रास्ता चुनें' : 'Choose one path'}</h2>
        <div className="choice-grid">
          <article className="choice-card choice-card-primary"><p className="choice-number" aria-hidden="true">1</p><h3>{hi ? 'मदद पाएँ' : 'Get help'}</h3><p>{hi ? 'भोजन, यात्रा, चिकित्सा या दूसरी जरूरत के लिए छोटी पोस्ट बनाएँ।' : 'Make a short post for food, transport, medical, or other help.'}</p><Link href="/create-post" className="choice-link">{hi ? 'मदद माँगें' : 'Ask for help'} <span aria-hidden="true">→</span></Link></article>
          <article className="choice-card"><p className="choice-number" aria-hidden="true">2</p><h3>{hi ? 'मदद करें' : 'Offer help'}</h3><p>{hi ? 'देखें कि लोगों को क्या चाहिए और सुरक्षित रूप से जवाब दें।' : 'See what people need and respond safely.'}</p><Link href="/board" className="choice-link">{hi ? 'जरूरतें देखें' : 'View needs'} <span aria-hidden="true">→</span></Link></article>
          <article className="choice-card"><p className="choice-number" aria-hidden="true">3</p><h3>{hi ? 'सहायता खोजें' : 'Find support'}</h3><p>{hi ? 'अपने शहर में जमा की गई सहायता लिस्टिंग खोजें।' : 'Find submitted support listings in your city.'}</p><Link href="/directory" className="choice-link">{hi ? 'समूह खोजें' : 'Find a group'} <span aria-hidden="true">→</span></Link></article>
        </div>
      </section>
      <section className="safety-strip" aria-labelledby="before-title"><div className="page-shell safety-strip-inner"><div><p className="eyebrow">{hi ? 'शुरू करने से पहले' : 'Before you start'}</p><h2 id="before-title" className="section-title">{hi ? 'अपनी निजी जानकारी सुरक्षित रखें' : 'Keep your private details safe'}</h2></div><ul className="plain-list"><li>{hi ? 'सटीक पता, पूरा नाम या पहचान संख्या पोस्ट न करें।' : 'Do not post your exact address, full name, or ID number.'}</li><li>{hi ? 'किसी अजनबी से अकेले न मिलें।' : 'Do not meet a stranger alone.'}</li><li>{hi ? '18 वर्ष से कम हैं तो भरोसेमंद वयस्क से मदद लें।' : 'If you are under 18, ask a trusted adult to help.'}</li></ul><Link href="/safety" className="text-link">{hi ? 'पूरी सुरक्षा गाइड पढ़ें' : 'Read the full safety guide'} <span aria-hidden="true">→</span></Link></div></section>
      <section className="page-shell how-it-works" aria-labelledby="next-title"><h2 id="next-title" className="section-title">{hi ? 'आगे क्या होगा' : 'What happens next'}</h2><ol className="steps-list"><li><strong>{hi ? 'आप कम जानकारी साझा करते हैं।' : 'You share only what is needed.'}</strong><span>{hi ? 'शहर और क्षेत्र चुनें; सटीक स्थान नहीं।' : 'Choose a city and area, not a precise location.'}</span></li><li><strong>{hi ? 'एक मॉडरेटर जाँचता है।' : 'A moderator checks it.'}</strong><span>{hi ? 'मॉडरेटर हानिकारक सामग्री और साफ़ दिखने वाली निजी जानकारी खोजता है, लेकिन कुछ छूट सकता है।' : 'A moderator checks submissions for harmful content and obvious private details, but some content may be missed.'}</span></li><li><strong>{hi ? 'आप तय करते हैं कि जवाब देना है या नहीं।' : 'You choose whether to reply.'}</strong><span>{hi ? 'पहले सुरक्षा जाँचें। किसी पर भरोसा करना जरूरी नहीं है।' : 'Check safety first. You never have to trust or meet anyone.'}</span></li></ol></section>
      <aside className="emergency-note" aria-label={hi ? 'आपातकालीन सूचना' : 'Emergency notice'}><div className="page-shell"><strong>{hi ? 'तुरंत खतरा है?' : 'In immediate danger?'}</strong>{' '}{hi ? 'इस साइट का इंतज़ार न करें। अपने स्थानीय आपातकालीन सेवा या भरोसेमंद वयस्क से अभी संपर्क करें।' : 'Do not wait for this site. Contact local emergency services or a trusted adult now.'}</div></aside>
    </div>
  );
}
