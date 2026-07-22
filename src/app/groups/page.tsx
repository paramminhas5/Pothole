import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function GroupsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-yellow mb-4">
          {isHindi ? 'उपलब्ध नहीं' : 'NOT AVAILABLE'}
        </div>
        <h1 className="heading-1 mb-3">
          {isHindi ? 'समूह सुविधा बंद है' : 'Groups Are Disabled'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? 'यह प्रोटोटाइप अभी निजी समूहों या चेक-इन के लिए सुरक्षित संचालन उपलब्ध नहीं कराता।'
            : 'This prototype does not yet provide a safe operating workflow for private groups or check-ins.'}
        </p>
      </div>

      <section className="brutal-card mb-6 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">
          {isHindi ? 'इसे क्यों बंद किया गया है' : 'Why this is disabled'}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>→ {isHindi ? 'सदस्यता और आमंत्रण की पहुँच सुरक्षा अधूरी है।' : 'Membership and invitation access controls are incomplete.'}</li>
          <li>→ {isHindi ? 'चेक-इन, मदद की स्थिति और अलर्ट की निगरानी के लिए कोई उत्तरदायी ऑपरेटर नहीं है।' : 'No accountable operator monitors check-ins, help states, or alerts.'}</li>
          <li>→ {isHindi ? 'गोपनीयता, डेटा रखने की अवधि और घटना प्रतिक्रिया की समीक्षा बाकी है।' : 'Privacy, retention, and incident-response review is pending.'}</li>
        </ul>
      </section>

      <div className="brutal-banner text-center text-xs">
        {isHindi
          ? 'संवेदनशील सदस्यता, वास्तविक नाम, सटीक स्थान या आपातकालीन स्थिति यहाँ साझा न करें।'
          : 'DO NOT SHARE SENSITIVE MEMBERSHIP, REAL NAMES, PRECISE LOCATIONS, OR EMERGENCY STATUS HERE.'}
      </div>
    </div>
  );
}
