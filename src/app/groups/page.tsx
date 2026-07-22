import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function GroupsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-lime mb-4">
          {isHindi ? 'इकाइयाँ' : 'UNITS'}
        </div>
        <h1 className="heading-1 mb-3">
          {isHindi ? 'अपनी इकाई बनाएं' : 'Form Your Unit'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? '5-15 लोगों का एक विश्वसनीय समूह बनाएं। भूमिकाएं तय करें। एक-दूसरे की सुरक्षा सुनिश्चित करें।'
            : 'Create a trusted group of 5-15 people. Define roles. Keep each other safe.'}
        </p>
      </div>

      {/* How it works */}
      <section className="brutal-card mb-6">
        <h2 className="heading-2 mb-4">
          {isHindi ? 'यह कैसे काम करता है' : 'How It Works'}
        </h2>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-accent shrink-0">1</span>
            <div>
              <strong>{isHindi ? 'इकाई बनाएं' : 'Create a Unit'}</strong>
              <p className="text-xs text-[var(--color-text-muted)]">
                {isHindi ? 'नाम, शहर, क्षेत्र दें। एक गुप्त invite code मिलेगा।' : 'Give it a name, city, area. You\'ll get a secret invite code.'}
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-accent shrink-0">2</span>
            <div>
              <strong>{isHindi ? 'सदस्य जोड़ें' : 'Add Members'}</strong>
              <p className="text-xs text-[var(--color-text-muted)]">
                {isHindi ? 'Invite code शेयर करें। सदस्य अपना नाम (alias) और भूमिका चुनकर जुड़ें।' : 'Share the invite code. Members join by choosing a name (alias) and role.'}
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-accent shrink-0">3</span>
            <div>
              <strong>{isHindi ? 'Check-in सेट करें' : 'Set Check-ins'}</strong>
              <p className="text-xs text-[var(--color-text-muted)]">
                {isHindi ? 'हर X मिनट में सभी "safe" mark करें। मिस = अलर्ट।' : 'Every X minutes, everyone marks "safe." Missed = alert.'}
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="brutal-badge brutal-badge-accent shrink-0">4</span>
            <div>
              <strong>{isHindi ? 'ज़मीन पर इस्तेमाल करें' : 'Use On The Ground'}</strong>
              <p className="text-xs text-[var(--color-text-muted)]">
                {isHindi ? 'Status board: safe / need help / offline। सभी एक-दूसरे की स्थिति देख सकते हैं।' : 'Status board: safe / need help / offline. Everyone can see each other\'s status.'}
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* Roles reminder */}
      <section className="brutal-card mb-6">
        <h2 className="heading-3 mb-3">{isHindi ? 'भूमिकाएं' : 'Roles'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div className="brutal-card-flat !p-2"><strong>🏥</strong> {isHindi ? 'मेडिक' : 'Medic'}</div>
          <div className="brutal-card-flat !p-2"><strong>⚖️</strong> {isHindi ? 'कानूनी' : 'Legal'}</div>
          <div className="brutal-card-flat !p-2"><strong>📡</strong> {isHindi ? 'संचार' : 'Comms'}</div>
          <div className="brutal-card-flat !p-2"><strong>🚗</strong> {isHindi ? 'परिवहन' : 'Transport'}</div>
          <div className="brutal-card-flat !p-2"><strong>🍲</strong> {isHindi ? 'आपूर्ति' : 'Supply'}</div>
          <div className="brutal-card-flat !p-2"><strong>📋</strong> {isHindi ? 'दस्तावेज़' : 'Document'}</div>
        </div>
      </section>

      {/* Privacy note */}
      <div className="brutal-banner mb-6">
        {isHindi
          ? '🔒 कोई असली नाम ज़रूरी नहीं। Alias इस्तेमाल करें। Group data 30 दिन बाद auto-delete।'
          : '🔒 NO REAL NAMES REQUIRED. USE AN ALIAS. GROUP DATA AUTO-DELETES AFTER 30 DAYS.'}
      </div>

      {/* CTA */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/submit-chapter" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">
          {isHindi ? 'नई इकाई बनाएं' : 'CREATE A NEW UNIT'} →
        </Link>
        <Link href="/playbook" className="brutal-btn brutal-btn-lg text-center">
          {isHindi ? 'प्लेबुक पढ़ें' : 'READ THE PLAYBOOK'} →
        </Link>
      </div>
    </div>
  );
}
