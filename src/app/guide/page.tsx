import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function GuidePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-yellow mb-4">
          {isHindi ? 'प्रोटोटाइप' : 'PROTOTYPE'}
        </div>
        <h1 className="heading-1 mb-3">
          {isHindi ? 'Sahayata का सुरक्षित परीक्षण' : 'Testing Sahayata Safely'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? 'यह सेवा सार्वजनिक या आपातकालीन उपयोग के लिए तैयार नहीं है।'
            : 'This service is not ready for public or emergency use.'}
        </p>
      </div>

      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">
          {isHindi ? 'आप क्या देख सकते हैं' : 'What you can review'}
        </h2>
        <ul className="space-y-3 text-sm">
          <li>→ {isHindi ? 'निर्देशिका और बोर्ड के इंटरफ़ेस, जिनमें असत्यापित या सिंथेटिक रिकॉर्ड हो सकते हैं।' : 'Directory and board interfaces, which may contain unverified submissions or synthetic records.'}</li>
          <li>→ {isHindi ? 'पोस्ट और समूह जमा करने के फ़ॉर्म, केवल गैर-संवेदनशील परीक्षण डेटा के साथ।' : 'Post and group submission forms, using non-sensitive test data only.'}</li>
          <li>→ {isHindi ? 'मॉडरेशन इंटरफ़ेस, जो अभी पूर्ण संचालन या सत्यापन सेवा नहीं है।' : 'A moderation interface that is not yet a complete operating or verification service.'}</li>
        </ul>
      </section>

      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">
          {isHindi ? 'क्या साझा न करें' : 'What not to share'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'आपातकालीन अनुरोध या समय-संवेदी सहायता।' : 'Emergency requests or time-sensitive support needs.'}</li>
          <li>→ {isHindi ? 'असली नाम, निजी संपर्क, सटीक स्थान या पहचान दस्तावेज़।' : 'Real names, private contacts, precise locations, or identity documents.'}</li>
          <li>→ {isHindi ? 'स्वास्थ्य, कानूनी स्थिति या संवेदनशील समूह सदस्यता।' : 'Health details, legal circumstances, or sensitive group membership.'}</li>
        </ul>
      </section>

      <div className="brutal-card-flat text-xs space-y-1">
        <p><strong>{isHindi ? 'उत्पाद स्थिति:' : 'Product state:'}</strong> {isHindi ? 'निजी प्रोटोटाइप' : 'Private prototype'}</p>
        <p><strong>{isHindi ? 'सामग्री समीक्षा:' : 'Content review:'}</strong> {isHindi ? 'भारत-विशिष्ट योग्य समीक्षा लंबित' : 'Qualified India-specific review pending'}</p>
        <p><strong>{isHindi ? 'ताज़गी:' : 'Freshness:'}</strong> {isHindi ? 'कोई वर्तमान सेवा गारंटी नहीं' : 'No current-service guarantee'}</p>
      </div>
    </div>
  );
}
