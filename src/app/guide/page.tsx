import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function GuidePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">
          {hi ? 'Sahayata कैसे इस्तेमाल करें' : 'How to Use Sahayata'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {hi ? 'हर सुविधा का पूरा वॉकथ्रू। 5 मिनट में सब समझें।' : 'Complete walkthrough of every feature. Understand everything in 5 minutes.'}
        </p>
      </div>


      {/* QUICK START */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'तुरंत शुरू करें' : 'Quick Start'}</h2>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li><strong>{hi ? 'कोई अकाउंट नहीं बनाना है।' : 'No account to create.'}</strong> {hi ? 'बस आएँ और इस्तेमाल करें। कोई साइन-अप, लॉगिन, या ईमेल नहीं।' : 'Just arrive and use. No sign-up, login, or email.'}</li>
          <li><strong>{hi ? 'भाषा चुनें।' : 'Choose your language.'}</strong> {hi ? 'ऊपर दाईं तरफ EN/हि बटन — अंग्रेज़ी या हिन्दी।' : 'Top right EN/हि button — English or Hindi.'}</li>
          <li><strong>{hi ? 'अपना रास्ता चुनें:' : 'Choose your path:'}</strong>
            <ul className="mt-2 ml-4 space-y-1">
              <li>• {hi ? 'मदद चाहिए → "मदद पाएँ" → पोस्ट बनाएँ' : 'Need help → "Get Help" → Create a post'}</li>
              <li>• {hi ? 'मदद दे सकते हैं → "मदद करें" → बोर्ड देखें → जवाब दें' : 'Can help → "Offer Help" → View board → Respond'}</li>
              <li>• {hi ? 'संगठित करना है → "ग्रुप" → ग्रुप बनाएँ' : 'Want to organize → "Groups" → Create a group'}</li>
              <li>• {hi ? 'संस्थागत कार्रवाई → "प्लेबुक" → RTI/FIR/पत्र' : 'Institutional action → "Playbook" → RTI/FIR/letters'}</li>
              <li>• {hi ? 'सबूत सुरक्षित करना → "एविडेंस वॉल्ट"' : 'Secure evidence → "Evidence Vault"'}</li>
            </ul>
          </li>
        </ol>
      </section>

      {/* FOR SOMEONE WHO NEEDS HELP */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-red mb-4">1</div>
        <h2 className="heading-2 mb-4">{hi ? 'अगर आपको मदद चाहिए' : 'If You Need Help'}</h2>
        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li>{hi ? '"मदद पाएँ" या "पोस्ट बनाएँ" पर जाएँ' : 'Go to "Get Help" or "Create Post"'}</li>
          <li>{hi ? 'स्पैम जाँच पास करें (5 सेकंड, आपके डिवाइस पर)' : 'Pass spam check (5 seconds, on your device)'}</li>
          <li>{hi ? 'चुनें: मुझे चाहिए / मैं दे सकता हूँ' : 'Choose: I need / I can offer'}</li>
          <li>{hi ? 'श्रेणी चुनें: कानूनी, चिकित्सा, भोजन, परिवहन, आश्रय...' : 'Pick category: Legal, Medical, Food, Transport, Shelter...'}</li>
          <li>{hi ? 'शहर और क्षेत्र चुनें (सटीक पता नहीं)' : 'Choose city and area (not exact address)'}</li>
          <li>{hi ? 'छोटा विवरण लिखें (500 अक्षर तक)' : 'Write short description (up to 500 characters)'}</li>
          <li>{hi ? 'भेजें → मॉडरेटर जाँचेगा → बोर्ड पर दिखेगा' : 'Submit → moderator reviews → appears on board'}</li>
          <li>{hi ? 'कोई जवाब दे → आपको निजी रूप से उनका संपर्क मिलेगा' : 'Someone responds → you receive their contact privately'}</li>
          <li>{hi ? '72 घंटे बाद पोस्ट गायब हो जाती है' : 'Post disappears after 72 hours'}</li>
        </ol>
        <p className="text-sm mt-3 text-[var(--color-text-muted)]">{hi ? '⚠️ सटीक पता, फोन नंबर, ID नंबर, या पूरा नाम कभी न लिखें।' : '⚠️ Never write exact address, phone number, ID number, or full name.'}</p>
      </section>

      {/* FOR SOMEONE WHO CAN HELP */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-lime mb-4">2</div>
        <h2 className="heading-2 mb-4">{hi ? 'अगर आप मदद कर सकते हैं' : 'If You Can Help'}</h2>
        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li>{hi ? '"बोर्ड" पर जाएँ' : 'Go to the "Board"'}</li>
          <li>{hi ? 'शहर, श्रेणी, प्रकार से फ़िल्टर करें' : 'Filter by city, category, type'}</li>
          <li>{hi ? 'पोस्ट पढ़ें → "सुरक्षित जवाब दें" दबाएँ' : 'Read a post → click "Respond safely"'}</li>
          <li>{hi ? 'अपना संपर्क दें (ईमेल या सिक्योर मैसेजिंग — फोन नंबर न दें)' : 'Give your contact (email or secure messaging — not phone number)'}</li>
          <li>{hi ? 'सहमति दें कि आप 18+ हैं या भरोसेमंद वयस्क के साथ' : 'Confirm you are 18+ or with a trusted adult'}</li>
          <li>{hi ? 'भेजें → सिर्फ पोस्ट करने वाले को दिखेगा' : 'Send → only the poster will see it'}</li>
        </ol>
        <p className="text-sm mt-3 text-[var(--color-text-muted)]">{hi ? '⚠️ अकेले किसी अजनबी से न मिलें। सार्वजनिक जगह चुनें।' : '⚠️ Never meet a stranger alone. Choose a public place.'}</p>
      </section>


      {/* FOR ORGANIZERS */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-sky mb-4">3</div>
        <h2 className="heading-2 mb-4">{hi ? 'अगर आप संगठित करना चाहते हैं' : 'If You Want to Organize'}</h2>
        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li>{hi ? '"ग्रुप" पर जाएँ → "ग्रुप बनाएँ"' : 'Go to "Groups" → "Create Group"'}</li>
          <li>{hi ? 'ग्रुप नाम और पासफ़्रेज़ चुनें (यह एन्क्रिप्शन की चाबी है)' : 'Choose group name and passphrase (this is the encryption key)'}</li>
          <li>{hi ? 'जॉइन लिंक + पासफ़्रेज़ साथियों को भेजें (Signal/WhatsApp/मिलकर)' : 'Share join link + passphrase with comrades (Signal/WhatsApp/in-person)'}</li>
          <li>{hi ? 'भूमिकाएँ बाँटें: समन्वयक, कानूनी, संचार, सुरक्षा, दस्तावेज़ीकरण' : 'Assign roles: coordinator, legal, comms, safety, documentation'}</li>
          <li>{hi ? 'कार्य बनाएँ, समय-सीमा दें, ट्रैक करें' : 'Create tasks, set deadlines, track progress'}</li>
          <li>{hi ? 'रियल-टाइम संदेश — एन्क्रिप्टेड, एफ़ेमरल (DB में स्टोर नहीं)' : 'Real-time messages — encrypted, ephemeral (not stored in DB)'}</li>
        </ol>
        <p className="text-sm mt-3 text-[var(--color-text-muted)]">{hi ? '🔒 सर्वर कुछ नहीं पढ़ सकता। सिर्फ पासफ़्रेज़ वाले सदस्य देख सकते हैं।' : '🔒 Server cannot read anything. Only members with the passphrase can see content.'}</p>
      </section>

      {/* FOR INSTITUTIONAL ACTION */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-yellow mb-4">4</div>
        <h2 className="heading-2 mb-4">{hi ? 'संस्थागत कार्रवाई (RTI, FIR, PIL)' : 'Institutional Action (RTI, FIR, PIL)'}</h2>
        <div className="space-y-4 text-sm">
          <div>
            <strong>{hi ? 'RTI जनरेटर:' : 'RTI Generator:'}</strong>
            <p>{hi ? 'फॉर्म भरें (क्या जानना है, कौन सा विभाग) → PDF डाउनलोड → rtionline.gov.in पर जमा करें या डाक से भेजें। 30-दिन टाइमर शुरू। जवाब नहीं आया → अपील जनरेटर।' : 'Fill form (what to know, which dept) → download PDF → submit on rtionline.gov.in or send by post. 30-day timer starts. No response → appeal generator.'}</p>
          </div>
          <div>
            <strong>{hi ? 'FIR असिस्टेंट:' : 'FIR Assistant:'}</strong>
            <p>{hi ? 'विज़ार्ड: क्या हुआ → कब → कहाँ → किसने → शिकायत तैयार। पुलिस मना करे → SP को पत्र। SP भी मना → मजिस्ट्रेट शिकायत (धारा 156(3))।' : 'Wizard: what → when → where → who → complaint ready. Police refuse → letter to SP. SP also refuses → magistrate complaint (Section 156(3)).'}</p>
          </div>
          <div>
            <strong>{hi ? 'डिमांड ट्रैकर:' : 'Demand Tracker:'}</strong>
            <p>{hi ? 'माँग बनाएँ → लक्ष्य संस्था → समय-सीमा → ट्रैक करें: जमा → स्वीकृत → कार्रवाई → समाधान। सार्वजनिक डैशबोर्ड पर दिखाएँ।' : 'Create demand → target institution → deadline → track: Submitted → Acknowledged → Action → Resolved. Show on public dashboard.'}</p>
          </div>
          <div>
            <strong>{hi ? 'जनप्रतिनिधि खोजें:' : 'Find Representatives:'}</strong>
            <p>{hi ? 'शहर/क्षेत्र डालें → MLA, MP, पार्षद दिखें → एक क्लिक में पत्र तैयार → पता, ईमेल शामिल।' : 'Enter city/area → MLA, MP, councillor shown → generate letter in one click → address, email included.'}</p>
          </div>
        </div>
        <p className="text-sm mt-3 text-[var(--color-text-muted)]">{hi ? '🔒 सब कुछ लोकल — RTI/FIR ड्राफ्ट सर्वर को कभी नहीं भेजे जाते।' : '🔒 Everything local — RTI/FIR drafts are never sent to server.'}</p>
      </section>

      {/* EVIDENCE VAULT */}
      <section className="brutal-card mb-8">
        <div className="brutal-badge brutal-badge-accent mb-4">5</div>
        <h2 className="heading-2 mb-4">{hi ? 'सबूत सुरक्षित करें (एविडेंस वॉल्ट)' : 'Secure Evidence (Evidence Vault)'}</h2>
        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li>{hi ? '"एविडेंस वॉल्ट" पर जाएँ' : 'Go to "Evidence Vault"'}</li>
          <li>{hi ? 'पासफ़्रेज़ चुनें (यही आपकी चाबी है — याद रखें!)' : 'Choose a passphrase (this is your key — remember it!)'}</li>
          <li>{hi ? 'फोटो/वीडियो/दस्तावेज़ अपलोड करें' : 'Upload photos/videos/documents'}</li>
          <li>{hi ? 'ब्राउज़र में एन्क्रिप्ट होता है → फिर सर्वर पर स्टोर (सिफरटेक्स्ट)' : 'Encrypted in browser → then stored on server (ciphertext)'}</li>
          <li>{hi ? 'SHA-256 हैश बनता है — छेड़छाड़-प्रमाण' : 'SHA-256 hash generated — tamper evidence'}</li>
          <li>{hi ? 'डाउनलोड: पासफ़्रेज़ डालें → डिक्रिप्ट → ओरिजिनल फाइल' : 'Download: enter passphrase → decrypt → original file'}</li>
        </ol>
        <p className="text-sm mt-3 text-[var(--color-text-muted)]">{hi ? '⚠️ पासफ़्रेज़ भूल गए तो कोई रिकवरी नहीं। कहीं सुरक्षित लिखकर रखें।' : '⚠️ If you forget the passphrase, there is no recovery. Write it down somewhere safe.'}</p>
      </section>


      {/* PRIVACY & SECURITY */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'गोपनीयता और सुरक्षा' : 'Privacy & Security'}</h2>
        <div className="space-y-2 text-sm">
          <p>✓ {hi ? 'कोई अकाउंट नहीं — सेशन कुकी (HttpOnly, Secure, 30 दिन)' : 'No account — session cookie (HttpOnly, Secure, 30 days)'}</p>
          <p>✓ {hi ? 'ग्रुप मैसेज AES-256-GCM से ब्राउज़र में एन्क्रिप्ट' : 'Group messages encrypted with AES-256-GCM in browser'}</p>
          <p>✓ {hi ? 'एविडेंस वॉल्ट: पासफ़्रेज़ से एन्क्रिप्ट, सर्वर अपठनीय' : 'Evidence vault: encrypted with passphrase, server unreadable'}</p>
          <p>✓ {hi ? 'RTI/FIR ड्राफ्ट: लोकल IndexedDB में, सर्वर पर कभी नहीं' : 'RTI/FIR drafts: local IndexedDB, never on server'}</p>
          <p>✓ {hi ? 'रियल-टाइम मैसेज: एफ़ेमरल (डेटाबेस में स्टोर नहीं)' : 'Real-time messages: ephemeral (not stored in database)'}</p>
          <p>✓ {hi ? 'पोस्ट 72 घंटे में ऑटो-एक्सपायर' : 'Posts auto-expire in 72 hours'}</p>
          <p>✓ {hi ? 'कोई ट्रैकिंग, एनालिटिक्स, फिंगरप्रिंटिंग, या थर्ड-पार्टी स्क्रिप्ट नहीं' : 'No tracking, analytics, fingerprinting, or third-party scripts'}</p>
          <p>✓ {hi ? 'ऑफलाइन काम करता है — सर्विस वर्कर कैश' : 'Works offline — service worker cache'}</p>
          <p>✓ {hi ? 'ओपन सोर्स — कोड देखें, ऑडिट करें' : 'Open source — inspect the code, audit it'}</p>
        </div>
      </section>

      {/* OFFLINE & MIRRORS */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'ऑफलाइन और मिरर' : 'Offline & Mirrors'}</h2>
        <div className="space-y-2 text-sm">
          <p>{hi ? 'एक बार साइट खोलें → सर्विस वर्कर सब कैश कर लेता है।' : 'Visit the site once → service worker caches everything.'}</p>
          <p>{hi ? 'इंटरनेट बंद हो जाए → गाइड, टूल, टेम्पलेट सब काम करते हैं।' : 'Internet goes down → guides, tools, templates all still work.'}</p>
          <p>{hi ? 'मुख्य साइट बंद हो → मिरर ऑटो-ट्राई। IPFS पर भी उपलब्ध।' : 'Main site goes down → mirrors auto-tried. Also available on IPFS.'}</p>
          <p>{hi ? 'ऑनलाइन आएँ → कतारबद्ध कार्रवाइयाँ ऑटो-सिंक।' : 'Come online → queued actions auto-sync.'}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'अक्सर पूछे जाने वाले सवाल' : 'FAQ'}</h2>
        <div className="space-y-4 text-sm">
          <div>
            <strong>{hi ? 'क्या यह सुरक्षित है?' : 'Is this safe?'}</strong>
            <p>{hi ? 'हमने हर संभव सावधानी बरती है — एन्क्रिप्शन, कोई अकाउंट, ऑटो-एक्सपायर। लेकिन कोई भी टूल 100% गारंटी नहीं दे सकता। अपनी परिस्थिति का आकलन करें।' : 'We have taken every precaution — encryption, no accounts, auto-expire. But no tool can guarantee 100% safety. Assess your own situation.'}</p>
          </div>
          <div>
            <strong>{hi ? 'मेरा डेटा कहाँ है?' : 'Where is my data?'}</strong>
            <p>{hi ? 'पोस्ट/ग्रुप: एन्क्रिप्टेड Supabase में। RTI/FIR ड्राफ्ट: आपके ब्राउज़र में (IndexedDB)। एविडेंस: एन्क्रिप्टेड Supabase Storage।' : 'Posts/groups: encrypted in Supabase. RTI/FIR drafts: in your browser (IndexedDB). Evidence: encrypted Supabase Storage.'}</p>
          </div>
          <div>
            <strong>{hi ? 'क्या सरकार इसे बंद कर सकती है?' : 'Can the government shut this down?'}</strong>
            <p>{hi ? 'एक मिरर बंद हो सकता है। सब बंद करना बहुत मुश्किल — IPFS, कई डोमेन, ओपन सोर्स। कोई भी रीडिप्लॉय कर सकता है।' : 'One mirror can be taken down. Taking all down is very hard — IPFS, multiple domains, open source. Anyone can redeploy.'}</p>
          </div>
          <div>
            <strong>{hi ? 'क्या मुझे पहचाना जा सकता है?' : 'Can I be identified?'}</strong>
            <p>{hi ? 'हम कोई पहचान जानकारी नहीं माँगते। VPN/Tor इस्तेमाल करें अतिरिक्त सुरक्षा के लिए। पोस्ट में निजी जानकारी न दें।' : 'We do not collect any identifying information. Use VPN/Tor for extra protection. Do not include personal info in posts.'}</p>
          </div>
        </div>
      </section>

      {/* ALL PAGES DIRECTORY */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'सभी पेज' : 'All Pages'}</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div>
            <strong className="block mb-2">{hi ? 'कार्रवाई' : 'Action'}</strong>
            <Link href="/create-post" className="block text-[var(--color-primary)] mb-1">{hi ? 'पोस्ट बनाएँ (मदद पाएँ/दें)' : 'Create Post (Get/Give Help)'}</Link>
            <Link href="/board" className="block text-[var(--color-primary)] mb-1">{hi ? 'लाइव बोर्ड' : 'Live Board'}</Link>
            <Link href="/groups" className="block text-[var(--color-primary)] mb-1">{hi ? 'एन्क्रिप्टेड ग्रुप' : 'Encrypted Groups'}</Link>
            <Link href="/demands" className="block text-[var(--color-primary)] mb-1">{hi ? 'डिमांड ट्रैकर' : 'Demand Tracker'}</Link>
            <Link href="/rti" className="block text-[var(--color-primary)] mb-1">{hi ? 'RTI जनरेटर' : 'RTI Generator'}</Link>
            <Link href="/fir" className="block text-[var(--color-primary)] mb-1">{hi ? 'FIR असिस्टेंट' : 'FIR Assistant'}</Link>
            <Link href="/vault" className="block text-[var(--color-primary)] mb-1">{hi ? 'एविडेंस वॉल्ट' : 'Evidence Vault'}</Link>
            <Link href="/representatives" className="block text-[var(--color-primary)] mb-1">{hi ? 'जनप्रतिनिधि + पत्र' : 'Representatives + Letters'}</Link>
          </div>
          <div>
            <strong className="block mb-2">{hi ? 'सीखें' : 'Learn'}</strong>
            <Link href="/safety" className="block text-[var(--color-primary)] mb-1">{hi ? 'अधिकार गाइड' : 'Know Your Rights'}</Link>
            <Link href="/resources" className="block text-[var(--color-primary)] mb-1">{hi ? 'हेल्पलाइन और संसाधन' : 'Helplines & Resources'}</Link>
            <Link href="/playbook" className="block text-[var(--color-primary)] mb-1">{hi ? 'विरोध → शक्ति प्लेबुक' : 'Protest → Power Playbook'}</Link>
            <Link href="/toolkit" className="block text-[var(--color-primary)] mb-1">{hi ? 'टेम्पलेट और टूल' : 'Templates & Tools'}</Link>
            <Link href="/communication" className="block text-[var(--color-primary)] mb-1">{hi ? 'सुरक्षित संचार गाइड' : 'Secure Comms Guide'}</Link>
            <Link href="/organize" className="block text-[var(--color-primary)] mb-1">{hi ? 'संगठन गाइड' : 'Organizing Guide'}</Link>
            <Link href="/alerts" className="block text-[var(--color-primary)] mb-1">{hi ? 'सूचना सत्यापन' : 'Info Verification'}</Link>
            <Link href="/manifesto" className="block text-[var(--color-primary)] mb-1">{hi ? 'घोषणापत्र' : 'Manifesto'}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
