import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function AlertsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-red mb-4">
          {isHindi ? 'अलर्ट' : 'ALERTS'}
        </div>
        <h1 className="heading-1 mb-3">
          {isHindi ? 'सत्यापित अलर्ट' : 'Verified Alerts'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? 'केवल सत्यापित समन्वयक ही यहाँ पोस्ट कर सकते हैं। हर अलर्ट timestamped और area-tagged है।'
            : 'Only verified coordinators can post here. Every alert is timestamped and area-tagged.'}
        </p>
      </div>

      {/* Trust explanation */}
      <div className="brutal-card-flat !border-[var(--color-lime)] mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="brutal-badge brutal-badge-lime">✓✓ VERIFIED</span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {isHindi ? 'इस पेज पर सब कुछ सत्यापित समन्वयकों द्वारा पोस्ट है।' : 'Everything on this page is posted by verified coordinators.'}
          </span>
        </div>
        <p className="text-xs text-[var(--color-text-muted)]">
          {isHindi
            ? 'अलर्ट 6 घंटे बाद auto-archive होते हैं। पुराने अलर्ट = पुरानी जानकारी।'
            : 'Alerts auto-archive after 6 hours. Old alerts = old information.'}
        </p>
      </div>

      {/* Placeholder for when no alerts */}
      <div className="brutal-card text-center py-12">
        <div className="text-4xl mb-4">📡</div>
        <h3 className="heading-3 mb-2">
          {isHindi ? 'अभी कोई सक्रिय अलर्ट नहीं' : 'No Active Alerts Right Now'}
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
          {isHindi
            ? 'जब सत्यापित समन्वयक कोई अलर्ट पोस्ट करेंगे, वह यहाँ दिखाई देगा। अलर्ट realtime में अपडेट होते हैं।'
            : 'When verified coordinators post an alert, it will appear here. Alerts update in realtime.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/board" className="brutal-btn brutal-btn-primary brutal-btn-sm">
            {isHindi ? 'बोर्ड देखें' : 'VIEW BOARD'} →
          </Link>
          <Link href="/directory" className="brutal-btn brutal-btn-sm">
            {isHindi ? 'निर्देशिका' : 'DIRECTORY'} →
          </Link>
        </div>
      </div>

      {/* How alerts work */}
      <section className="brutal-card mt-8">
        <h2 className="heading-3 mb-3">
          {isHindi ? 'अलर्ट कैसे काम करते हैं' : 'How Alerts Work'}
        </h2>
        <div className="space-y-2 text-sm">
          <p>→ {isHindi ? 'केवल org-verified या community-vouched अध्यायों के समन्वयक पोस्ट कर सकते हैं' : 'Only coordinators of org-verified or community-vouched chapters can post'}</p>
          <p>→ {isHindi ? 'हर अलर्ट में समय, शहर/क्षेत्र, और तत्कालता स्तर होता है' : 'Every alert has timestamp, city/area, and urgency level'}</p>
          <p>→ {isHindi ? '6 घंटे बाद auto-archive (पुरानी जानकारी खतरनाक है)' : '6 hours auto-archive (old info is dangerous)'}</p>
          <p>→ {isHindi ? 'PWA push notification (अगर आपने Sahayata install किया है)' : 'PWA push notification (if you have Sahayata installed)'}</p>
          <p>→ {isHindi ? 'यह user posts से पूरी तरह अलग है — यहाँ सब कुछ सत्यापित है' : 'Completely separate from user posts — everything here is verified'}</p>
        </div>
      </section>
    </div>
  );
}
