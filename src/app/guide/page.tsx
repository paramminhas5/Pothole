import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function GuidePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-accent mb-4">{isHindi ? 'गाइड' : 'GUIDE'}</div>
        <h1 className="heading-1 mb-3">{isHindi ? 'सहायता का उपयोग कैसे करें' : 'How to Use Sahayata'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi ? '30 सेकंड में शुरू करें। कोई अकाउंट नहीं चाहिए।' : 'Get started in 30 seconds. No account needed.'}
        </p>
      </div>

      {/* Choose your path */}
      <h2 className="heading-2 mb-6">{isHindi ? 'आप कौन हैं?' : 'Who are you?'}</h2>

      {/* Path 1: I need help */}
      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🆘</span>
          <div>
            <h3 className="heading-3">{isHindi ? 'मुझे मदद चाहिए' : 'I Need Help'}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'कानूनी, चिकित्सा, भोजन, परिवहन, आश्रय' : 'Legal, medical, food, transport, shelter'}</p>
          </div>
        </div>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-red shrink-0">1</span>
            <div>
              <strong>{isHindi ? 'निर्देशिका देखें' : 'Check the Directory'}</strong>
              <p className="text-[var(--color-text-muted)]">{isHindi ? 'अपने शहर में सक्रिय समूह खोजें जो आपकी ज़रूरत पूरी कर सकते हैं।' : 'Find active groups in your city that match your need.'}</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-red shrink-0">2</span>
            <div>
              <strong>{isHindi ? 'ज़रूरत पोस्ट करें' : 'Post a Need'}</strong>
              <p className="text-[var(--color-text-muted)]">{isHindi ? '"पोस्ट बनाएं" पर जाएं → "ज़रूरत" चुनें → श्रेणी, शहर, विवरण भरें। 2-3 सेकंड का सत्यापन (स्वचालित)। मॉडरेटर समीक्षा के बाद बोर्ड पर दिखाई देगा।' : 'Go to "Create Post" → select "Need" → fill category, city, description. 2-3 second verification (automatic). Appears on board after moderator review.'}</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-red shrink-0">3</span>
            <div>
              <strong>{isHindi ? 'जवाब प्राप्त करें' : 'Receive Responses'}</strong>
              <p className="text-[var(--color-text-muted)]">{isHindi ? 'जो लोग मदद कर सकते हैं वे "जवाब दें" बटन दबाएंगे। उनकी संपर्क जानकारी "मेरी पोस्ट" पेज पर निजी रूप से दिखेगी।' : 'People who can help will hit "Respond." Their contact info appears privately on your "My Posts" page.'}</p>
            </div>
          </li>
        </ol>
        <Link href="/create-post" className="brutal-btn brutal-btn-danger brutal-btn-sm mt-4">
          {isHindi ? 'ज़रूरत पोस्ट करें' : 'POST A NEED'} →
        </Link>
      </section>

      {/* Path 2: I can help */}
      <section className="brutal-card mb-6 !border-[var(--color-lime)]">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🤝</span>
          <div>
            <h3 className="heading-3">{isHindi ? 'मैं मदद कर सकता/सकती हूँ' : 'I Can Help'}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'वकील, मेडिक, ड्राइवर, भोजन, आश्रय, अनुवाद' : 'Lawyer, medic, driver, food, shelter, translation'}</p>
          </div>
        </div>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-lime shrink-0">1</span>
            <div>
              <strong>{isHindi ? 'बोर्ड पर ज़रूरतें देखें' : 'Browse Needs on the Board'}</strong>
              <p className="text-[var(--color-text-muted)]">{isHindi ? 'अपने शहर और श्रेणी से फ़िल्टर करें। तत्काल ज़रूरतें सबसे ऊपर दिखती हैं।' : 'Filter by your city and category. Urgent needs appear at the top.'}</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-lime shrink-0">2</span>
            <div>
              <strong>{isHindi ? '"जवाब दें" दबाएं' : 'Hit "Respond"'}</strong>
              <p className="text-[var(--color-text-muted)]">{isHindi ? 'अपना ईमेल/मैसेजिंग हैंडल और छोटा संदेश दें। यह केवल पोस्टर को निजी रूप से जाता है — कभी सार्वजनिक नहीं।' : 'Enter your email/messaging handle and a short message. This goes ONLY to the poster privately — never public.'}</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-lime shrink-0">3</span>
            <div>
              <strong>{isHindi ? 'या प्रस्ताव पोस्ट करें' : 'Or Post an Offer'}</strong>
              <p className="text-[var(--color-text-muted)]">{isHindi ? 'अगर आप सक्रिय रूप से मदद दे रहे हैं, "प्रस्ताव" पोस्ट करें ताकि ज़रूरतमंद आपको खोज सकें।' : 'If you\'re actively offering help, post an "Offer" so people in need can find you.'}</p>
            </div>
          </li>
        </ol>
        <Link href="/board" className="brutal-btn brutal-btn-success brutal-btn-sm mt-4">
          {isHindi ? 'बोर्ड देखें' : 'BROWSE BOARD'} →
        </Link>
      </section>

      {/* Path 3: I run a group */}
      <section className="brutal-card mb-6 !border-[var(--color-accent-2)]">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">📋</span>
          <div>
            <h3 className="heading-3">{isHindi ? 'मैं एक समूह चलाता/चलाती हूँ' : 'I Run a Group'}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'कानूनी सहायता, मेडिक नेटवर्क, किचन, ट्रांसपोर्ट' : 'Legal aid, medic network, kitchen, transport collective'}</p>
          </div>
        </div>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-purple shrink-0">1</span>
            <div>
              <strong>{isHindi ? 'अपना समूह पंजीकृत करें' : 'Register Your Group'}</strong>
              <p className="text-[var(--color-text-muted)]">{isHindi ? 'नाम, शहर, श्रेणियाँ, और एक सार्वजनिक संपर्क (ग्रुप लिंक/ईमेल, कभी निजी नंबर नहीं)। मॉडरेटर समीक्षा के बाद निर्देशिका में दिखाई देगा।' : 'Name, city, categories, and a public contact (group link/email, never personal number). Appears in directory after moderator review.'}</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-purple shrink-0">2</span>
            <div>
              <strong>{isHindi ? 'विश्वास बनाएं' : 'Build Trust'}</strong>
              <p className="text-[var(--color-text-muted)]">{isHindi ? 'अन्य सत्यापित समूह आपकी पुष्टि कर सकते हैं। 3+ पुष्टि = "समुदाय-सत्यापित" बैज। ज्ञात संगठन (PUCL, CJP) पुष्टि = "संगठन-सत्यापित"।' : 'Other verified groups can vouch for you. 3+ vouches = "community-vouched" badge. Known org (PUCL, CJP) vouch = "org-verified".'}</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-purple shrink-0">3</span>
            <div>
              <strong>{isHindi ? 'सक्रिय रहें' : 'Stay Active'}</strong>
              <p className="text-[var(--color-text-muted)]">{isHindi ? 'महीने में एक बार "सक्रिय" ping करें ताकि आपकी लिस्टिंग ताज़ा रहे। निष्क्रिय लिस्टिंग फ़ेड हो जाती हैं।' : 'Ping "active" once a month to keep your listing fresh. Inactive listings fade out.'}</p>
            </div>
          </li>
        </ol>
        <Link href="/submit-chapter" className="brutal-btn brutal-btn-sm mt-4" style={{ borderColor: 'var(--color-accent-2)' }}>
          {isHindi ? 'समूह पंजीकृत करें' : 'REGISTER GROUP'} →
        </Link>
      </section>

      {/* Key Concepts */}
      <h2 className="heading-2 mb-6 mt-12">{isHindi ? 'मुख्य अवधारणाएं' : 'Key Concepts'}</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="brutal-card-flat">
          <h3 className="font-bold text-sm mb-1">🔒 {isHindi ? 'संपर्क रिले' : 'Contact Relay'}</h3>
          <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'फ़ोन नंबर कभी सार्वजनिक नहीं होते। जब कोई "जवाब दें" दबाता है, उनकी जानकारी केवल आपको मिलती है।' : 'Phone numbers are never public. When someone hits "Respond," their info goes only to you.'}</p>
        </div>
        <div className="brutal-card-flat">
          <h3 className="font-bold text-sm mb-1">⏰ {isHindi ? '72 घंटे की समाप्ति' : '72h Auto-Expiry'}</h3>
          <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'सभी पोस्ट 72 घंटे बाद स्वचालित रूप से हट जाती हैं। "मेरी पोस्ट" से +72 घंटे बढ़ा सकते हैं।' : 'All posts auto-remove after 72 hours. You can extend +72h from "My Posts."'}</p>
        </div>
        <div className="brutal-card-flat">
          <h3 className="font-bold text-sm mb-1">🛡️ {isHindi ? 'मॉडरेशन' : 'Moderation'}</h3>
          <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'हर पोस्ट और लिस्टिंग मॉडरेटर समीक्षा से गुज़रती है। व्यक्तिगत डेटा, हिंसा, अफवाहें स्वचालित रूप से फ़्लैग होती हैं।' : 'Every post and listing goes through moderator review. Personal data, violence, rumors are auto-flagged.'}</p>
        </div>
        <div className="brutal-card-flat">
          <h3 className="font-bold text-sm mb-1">📡 {isHindi ? 'ऑफ़लाइन काम करता है' : 'Works Offline'}</h3>
          <p className="text-xs text-[var(--color-text-muted)]">{isHindi ? 'निर्देशिका, अधिकार, और टूलकिट ऑफ़लाइन उपलब्ध हैं। इंटरनेट बंद होने पर भी।' : 'Directory, rights, and toolkit are available offline. Even during internet shutdowns.'}</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="brutal-banner text-center">
        <span className="mr-4">
          <Link href="/safety" className="underline">{isHindi ? 'अधिकार जानें' : 'Know Your Rights'}</Link>
        </span>
        <span className="mr-4">
          <Link href="/toolkit" className="underline">{isHindi ? 'संगठन टूलकिट' : 'Organizing Toolkit'}</Link>
        </span>
        <span>
          <Link href="/board" className="underline">{isHindi ? 'बोर्ड' : 'Board'}</Link>
        </span>
      </div>
    </div>
  );
}
