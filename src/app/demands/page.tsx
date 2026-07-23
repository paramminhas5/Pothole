import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function DemandsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">{hi ? 'डिमांड ट्रैकर' : 'Demand Tracker'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'माँगें बनाएँ, ट्रैक करें, एस्केलेट करें। संस्थाओं को जवाबदेह बनाएँ।' : 'Create demands, track them, escalate. Hold institutions accountable.'}</p>
      </div>
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'यह कैसे काम करता है' : 'How This Works'}</h2>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li><strong>{hi ? 'माँग बनाएँ:' : 'Create demand:'}</strong> {hi ? 'क्या चाहिए, किससे, कब तक।' : 'What you want, from whom, by when.'}</li>
          <li><strong>{hi ? 'सबूत जोड़ें:' : 'Attach evidence:'}</strong> {hi ? 'RTI जवाब, मीडिया कवरेज, दस्तावेज़।' : 'RTI responses, media coverage, documents.'}</li>
          <li><strong>{hi ? 'ट्रैक करें:' : 'Track:'}</strong> {hi ? 'जमा → स्वीकृत → कार्रवाई → समाधान/एस्केलेट।' : 'Submitted → Acknowledged → Action → Resolved/Escalate.'}</li>
          <li><strong>{hi ? 'ऑटो-रिमाइंडर:' : 'Auto-reminders:'}</strong> {hi ? '"30 दिन हो गए, RTI का जवाब नहीं → प्रथम अपील दाखिल करें।"' : '"30 days passed, no RTI response → file First Appeal."'}</li>
          <li><strong>{hi ? 'सार्वजनिक स्कोरकार्ड:' : 'Public scorecard:'}</strong> {hi ? 'कौन सी संस्था ने जवाब दिया, किसने नहीं।' : 'Which institution responded, which did not.'}</li>
        </ol>
      </section>
      <section className="brutal-card mb-8 !border-[var(--color-primary)]">
        <h2 className="heading-2 mb-4">{hi ? 'फीचर विकास में है' : 'Feature Under Development'}</h2>
        <p className="text-sm">{hi ? 'डिमांड ट्रैकर का पूरा इंटरफेस जल्द आ रहा है। अभी टेम्पलेट उपयोग करें:' : 'Full Demand Tracker interface coming soon. For now use the template:'}</p>
        <Link href="/toolkit" className="text-link mt-3 inline-block">{hi ? 'माँग दस्तावेज़ टेम्पलेट →' : 'Demand Document Template →'}</Link>
      </section>
    </div>
  );
}
