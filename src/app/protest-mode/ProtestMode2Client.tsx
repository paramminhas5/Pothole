'use client';

import { useState } from 'react';
import { PageShell } from '@/components/ui/PageShell';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { RightsCard } from '@/components/ui/RightsCard';
import { BigRed, BigRedButton } from '@/components/ui/BigRed';

type Section = 'home' | 'checklist' | 'rights' | 'buddy' | 'detained' | 'aftermath';

/**
 * Protest Mode 2.0 — The Street Layer Wedge
 * 
 * Rules:
 * - ZERO server communication
 * - ZERO analytics
 * - Works fully offline after first load
 * - No account, no phone number, no location
 * - Must pass the test: "Would an organizer paste this into a 500-person Telegram group?"
 */
export function ProtestMode2Client() {
  const [section, setSection] = useState<Section>('home');
  const [detained, setDetained] = useState(false);
  const [locale, setLocale] = useState<'en' | 'hi'>('en');

  // Buddy timer state (client-only)
  const [buddyActive, setBuddyActive] = useState(false);
  const [buddyInterval, setBuddyInterval] = useState(30); // minutes
  const [lastCheckin, setLastCheckin] = useState<number | null>(null);

  function startBuddy() {
    setBuddyActive(true);
    setLastCheckin(Date.now());
  }

  function checkin() {
    setLastCheckin(Date.now());
  }

  function triggerSOS() {
    // Open SMS app with pre-written message (no server involved)
    const message = locale === 'hi'
      ? 'SOS: मुझे तुरंत मदद चाहिए। मेरी आखिरी ज्ञात लोकेशन पर आएं। यह Sahayata Protest Mode से भेजा गया है।'
      : 'SOS: I need immediate help. Come to my last known location. Sent via Sahayata Protest Mode.';
    window.open(`sms:?body=${encodeURIComponent(message)}`, '_self');
  }

  // Detention mode — full screen BigRed
  if (detained) {
    return (
      <BigRed
        title={locale === 'hi' ? 'मुझे हिरासत में लिया जा रहा है' : "I'M BEING DETAINED"}
        subtitle={locale === 'hi' ? 'ये 3 बातें बोलें:' : 'Say these 3 things:'}
      >
        <div className="space-y-3 text-left w-full">
          <div className="bg-white/20 rounded-[var(--radius-md)] p-4">
            <p className="text-lg font-bold">
              {locale === 'hi'
                ? '1. "मैं अपनी हिरासत का कारण जानना चाहता/चाहती हूँ"'
                : '1. "I want to know the reason for my detention"'}
            </p>
          </div>
          <div className="bg-white/20 rounded-[var(--radius-md)] p-4">
            <p className="text-lg font-bold">
              {locale === 'hi'
                ? '2. "मुझे अपने वकील से बात करनी है"'
                : '2. "I want to speak to my lawyer"'}
            </p>
          </div>
          <div className="bg-white/20 rounded-[var(--radius-md)] p-4">
            <p className="text-lg font-bold">
              {locale === 'hi'
                ? '3. "मैं कोई बयान नहीं दूँगा/दूँगी बिना वकील के"'
                : '3. "I will not give any statement without my lawyer"'}
            </p>
          </div>
        </div>

        <BigRedButton onClick={triggerSOS}>
          {locale === 'hi' ? 'SOS भेजें' : 'SEND SOS'}
        </BigRedButton>
        <button
          onClick={() => setDetained(false)}
          className="text-white/70 text-sm underline mt-4"
        >
          {locale === 'hi' ? 'वापस जाएं' : 'Go back'}
        </button>
      </BigRed>
    );
  }

  return (
    <PageShell size="sm">
      <div className="pt-6 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-[var(--font-display)] text-2xl font-black">
            {locale === 'hi' ? 'प्रोटेस्ट मोड' : 'Protest Mode'}
          </h1>
          <button
            onClick={() => setLocale(l => l === 'en' ? 'hi' : 'en')}
            className="px-3 py-1.5 text-sm font-bold border-2 border-[var(--ink)] rounded-[var(--radius-md)] min-h-[var(--touch-min)] flex items-center"
          >
            {locale === 'hi' ? 'EN' : 'हि'}
          </button>
        </div>

        {/* Offline indicator */}
        <Card variant="flat" padding="sm">
          <p className="text-xs text-center font-bold text-[var(--ink-muted)]">
            {locale === 'hi'
              ? '⚡ यह पेज पूरी तरह ऑफलाइन काम करता है। कोई डेटा सर्वर को नहीं जाता।'
              : '⚡ This page works fully offline. No data is sent to any server.'}
          </p>
        </Card>

        {/* Navigation */}
        {section === 'home' && (
          <div className="space-y-3 mt-6">
            {/* Tonight Checklist */}
            <button onClick={() => setSection('checklist')} className="w-full text-left p-5 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] hover:shadow-[var(--shadow-sm)] transition-shadow">
              <p className="text-lg font-bold">{locale === 'hi' ? '📋 आज रात की चेकलिस्ट' : '📋 Tonight Checklist'}</p>
              <p className="text-sm text-[var(--ink-muted)] mt-1">
                {locale === 'hi' ? 'क्या पहनें, क्या लेकर जाएं, फोन सेटिंग्स' : 'What to wear, carry, phone settings'}
              </p>
            </button>

            {/* Know Your Rights */}
            <button onClick={() => setSection('rights')} className="w-full text-left p-5 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] hover:shadow-[var(--shadow-sm)] transition-shadow">
              <p className="text-lg font-bold">{locale === 'hi' ? '⚖️ अपने अधिकार जानें' : '⚖️ Know Your Rights'}</p>
              <p className="text-sm text-[var(--ink-muted)] mt-1">
                {locale === 'hi' ? 'पुलिस क्या कर सकती है, क्या नहीं' : 'What police can and cannot do'}
              </p>
            </button>

            {/* Buddy System */}
            <button onClick={() => setSection('buddy')} className="w-full text-left p-5 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] hover:shadow-[var(--shadow-sm)] transition-shadow">
              <p className="text-lg font-bold">{locale === 'hi' ? '👥 बडी सिस्टम' : '👥 Buddy System'}</p>
              <p className="text-sm text-[var(--ink-muted)] mt-1">
                {locale === 'hi' ? 'चेक-इन टाइमर और SOS' : 'Check-in timer & SOS'}
              </p>
            </button>

            {/* DETAINED - Big Red Button */}
            <button
              onClick={() => setDetained(true)}
              className="w-full p-6 bg-[var(--red)] text-white border-2 border-[var(--ink)] rounded-[var(--radius-md)] text-center hover:opacity-90 transition-opacity min-h-[var(--touch-xl)]"
            >
              <p className="text-xl font-black uppercase">
                {locale === 'hi' ? '🚨 मुझे हिरासत में लिया जा रहा है' : "🚨 I'M BEING DETAINED"}
              </p>
            </button>

            {/* Aftermath */}
            <button onClick={() => setSection('aftermath')} className="w-full text-left p-5 border-2 border-[var(--ink)] rounded-[var(--radius-md)] bg-[var(--paper-alt)] hover:shadow-[var(--shadow-sm)] transition-shadow">
              <p className="text-lg font-bold">{locale === 'hi' ? '🏥 प्रोटेस्ट के बाद' : '🏥 After the Protest'}</p>
              <p className="text-sm text-[var(--ink-muted)] mt-1">
                {locale === 'hi' ? '24 घंटे में क्या करें — मेडिकल, कानूनी, साक्ष्य' : '24h actions — medical, legal, evidence'}
              </p>
            </button>
          </div>
        )}

        {/* Tonight Checklist */}
        {section === 'checklist' && (
          <div className="mt-6 space-y-4">
            <button onClick={() => setSection('home')} className="text-sm font-bold text-[var(--saffron)]">← {locale === 'hi' ? 'वापस' : 'Back'}</button>
            <h2 className="text-xl font-bold">{locale === 'hi' ? 'आज रात की चेकलिस्ट' : 'Tonight Checklist'}</h2>

            <ChecklistSection title={locale === 'hi' ? 'पहनें' : 'Wear'} items={[
              { en: 'Full sleeves, long pants (protection from tear gas)', hi: 'पूरी बाजू, लंबी पैंट (आंसू गैस से बचाव)' },
              { en: 'Comfortable closed shoes you can run in', hi: 'आरामदायक बंद जूते जिनमें भाग सकें' },
              { en: 'No jewelry, no contact lenses', hi: 'कोई गहने नहीं, कॉन्टैक्ट लेंस नहीं' },
              { en: 'Cover identifying tattoos/marks', hi: 'पहचान वाले टैटू/निशान ढकें' },
            ]} locale={locale} />

            <ChecklistSection title={locale === 'hi' ? 'लेकर जाएं' : 'Carry'} items={[
              { en: 'Water bottle (also for tear gas)', hi: 'पानी की बोतल (आंसू गैस के लिए भी)' },
              { en: 'Emergency contacts written on paper/arm', hi: 'इमरजेंसी नंबर कागज/बाजू पर लिखे' },
              { en: 'Small first aid: bandage, antiseptic', hi: 'छोटी प्राथमिक चिकित्सा: पट्टी, एंटीसेप्टिक' },
              { en: 'Cash (no digital wallets if phone seized)', hi: 'नकद (फोन जब्त हो तो डिजिटल वॉलेट काम नहीं करेगा)' },
              { en: 'Mask and sunglasses', hi: 'मास्क और सनग्लास' },
            ]} locale={locale} />

            <ChecklistSection title={locale === 'hi' ? 'फोन सेटिंग्स' : 'Phone Settings'} items={[
              { en: 'Disable Face ID / fingerprint (use PIN only)', hi: 'Face ID / उंगली का निशान बंद करें (सिर्फ PIN)' },
              { en: 'Turn off location services', hi: 'लोकेशन सर्विसेज बंद करें' },
              { en: 'Enable airplane mode at the protest', hi: 'प्रोटेस्ट पर एयरप्लेन मोड चालू करें' },
              { en: 'Backup photos to cloud before going', hi: 'जाने से पहले फोटो क्लाउड पर बैकअप करें' },
              { en: 'Set lockscreen to auto-lock in 30 seconds', hi: 'लॉक स्क्रीन 30 सेकंड पर सेट करें' },
            ]} locale={locale} />

            <ChecklistSection title={locale === 'hi' ? 'घर पर छोड़ दें' : 'Leave Behind'} items={[
              { en: 'Aadhaar card and other IDs', hi: 'आधार कार्ड और अन्य ID' },
              { en: 'Expensive electronics', hi: 'महंगे इलेक्ट्रॉनिक्स' },
              { en: 'Anything you cannot afford to lose', hi: 'कुछ भी जो खोने की कीमत न दे सकें' },
            ]} locale={locale} />
          </div>
        )}

        {/* Rights Cards */}
        {section === 'rights' && (
          <div className="mt-6 space-y-4">
            <button onClick={() => setSection('home')} className="text-sm font-bold text-[var(--saffron)]">← {locale === 'hi' ? 'वापस' : 'Back'}</button>

            <RightsCard
              title="If Police Stop You"
              titleHi="अगर पुलिस रोके"
              variant="march"
              locale={locale}
              rights={[
                { text: 'You have the right to know the reason for being stopped', textHi: 'आपको रोकने का कारण जानने का अधिकार है', source: 'Article 22(1), Constitution' },
                { text: 'Police CANNOT search you without a reason. Ask for the reason.', textHi: 'पुलिस बिना कारण तलाशी नहीं ले सकती। कारण पूछें।', source: 'Section 53, BNSS' },
                { text: 'You do NOT have to give your phone password', textHi: 'आपको अपना फोन पासवर्ड देने की ज़रूरत नहीं', source: 'Article 20(3), Constitution' },
                { text: 'Ask for the officer\'s name and badge number', textHi: 'अधिकारी का नाम और बैज नंबर पूछें', source: 'Police Act' },
                { text: 'You can be detained only for 24 hours without a magistrate order', textHi: 'बिना मजिस्ट्रेट आदेश के सिर्फ 24 घंटे हिरासत में रख सकते हैं', source: 'Article 22(2), Constitution' },
              ]}
            />

            <RightsCard
              title="If Detained"
              titleHi="अगर हिरासत में लिया जाए"
              variant="detention"
              locale={locale}
              rights={[
                { text: 'You MUST be told the reason for arrest', textHi: 'गिरफ्तारी का कारण बताना ज़रूरी है', source: 'Article 22(1)' },
                { text: 'You have the right to a lawyer immediately', textHi: 'तुरंत वकील का अधिकार है', source: 'Article 22(1)' },
                { text: 'You cannot be forced to sign anything', textHi: 'कुछ भी साइन करने के लिए मजबूर नहीं कर सकते', source: 'Article 20(3)' },
                { text: 'Female persons can only be arrested by a female officer', textHi: 'महिलाओं को सिर्फ महिला अधिकारी गिरफ्तार कर सकती है', source: 'Section 46(4), BNSS' },
                { text: 'Medical examination is your RIGHT if injured in custody', textHi: 'हिरासत में चोट लगे तो मेडिकल जांच आपका अधिकार', source: 'DK Basu guidelines' },
              ]}
            />
          </div>
        )}

        {/* Buddy System */}
        {section === 'buddy' && (
          <div className="mt-6 space-y-4">
            <button onClick={() => setSection('home')} className="text-sm font-bold text-[var(--saffron)]">← {locale === 'hi' ? 'वापस' : 'Back'}</button>
            <h2 className="text-xl font-bold">{locale === 'hi' ? 'बडी सिस्टम' : 'Buddy System'}</h2>

            {!buddyActive ? (
              <Card variant="accent" padding="lg">
                <p className="text-sm mb-4">
                  {locale === 'hi'
                    ? 'एक विश्वसनीय व्यक्ति को बताएं कि आप प्रोटेस्ट पर जा रहे हैं। हर X मिनट में चेक-इन करें। अगर चेक-इन मिस हो, वो SOS भेजें।'
                    : 'Tell a trusted person you are going to a protest. Check in every X minutes. If you miss a check-in, they send help.'}
                </p>
                <div className="mb-4">
                  <label className="text-xs font-bold uppercase text-[var(--ink-muted)] block mb-1">
                    {locale === 'hi' ? 'चेक-इन अंतराल (मिनट)' : 'Check-in interval (minutes)'}
                  </label>
                  <div className="flex gap-2">
                    {[15, 30, 45, 60].map(m => (
                      <button
                        key={m}
                        onClick={() => setBuddyInterval(m)}
                        className={[
                          'flex-1 py-2 text-sm font-bold border-2 rounded-[var(--radius-md)] min-h-[var(--touch-min)]',
                          buddyInterval === m ? 'bg-[var(--saffron)] text-[#0F0F0F] border-[var(--ink)]' : 'border-[var(--ink)] bg-[var(--paper-alt)]',
                        ].join(' ')}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                </div>
                <Button variant="primary" fullWidth size="lg" onClick={startBuddy}>
                  {locale === 'hi' ? 'बडी टाइमर शुरू करें' : 'Start Buddy Timer'}
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                <Card variant="accent" padding="lg">
                  <div className="text-center">
                    <p className="text-xs font-bold uppercase text-[var(--ink-muted)]">
                      {locale === 'hi' ? 'अगला चेक-इन' : 'Next check-in in'}
                    </p>
                    <p className="text-4xl font-[var(--font-mono)] font-black mt-2">
                      {buddyInterval}:00
                    </p>
                    <p className="text-xs text-[var(--ink-muted)] mt-2">
                      {locale === 'hi' ? `आखिरी चेक-इन: ${lastCheckin ? new Date(lastCheckin).toLocaleTimeString() : '—'}` : `Last check-in: ${lastCheckin ? new Date(lastCheckin).toLocaleTimeString() : '—'}`}
                    </p>
                  </div>
                </Card>
                <Button variant="primary" fullWidth size="lg" onClick={checkin}>
                  {locale === 'hi' ? '✓ चेक-इन — मैं ठीक हूँ' : '✓ Check in — I am safe'}
                </Button>
                <Button variant="danger" fullWidth size="lg" onClick={triggerSOS}>
                  {locale === 'hi' ? '🚨 SOS भेजें' : '🚨 Send SOS'}
                </Button>
                <Button variant="ghost" fullWidth onClick={() => setBuddyActive(false)}>
                  {locale === 'hi' ? 'टाइमर बंद करें' : 'Stop timer'}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Aftermath */}
        {section === 'aftermath' && (
          <div className="mt-6 space-y-4">
            <button onClick={() => setSection('home')} className="text-sm font-bold text-[var(--saffron)]">← {locale === 'hi' ? 'वापस' : 'Back'}</button>
            <h2 className="text-xl font-bold">{locale === 'hi' ? 'प्रोटेस्ट के बाद (24 घंटे)' : 'After the Protest (24 hours)'}</h2>

            <ChecklistSection title={locale === 'hi' ? 'तुरंत करें' : 'Immediately'} items={[
              { en: 'Check yourself for injuries. Get medical help if needed.', hi: 'चोट की जांच करें। ज़रूरत हो तो मेडिकल मदद लें।' },
              { en: 'Drink water, eat food, rest.', hi: 'पानी पिएं, खाना खाएं, आराम करें।' },
              { en: 'Let your buddy/family know you are safe.', hi: 'अपने बडी/परिवार को बताएं कि आप सुरक्षित हैं।' },
            ]} locale={locale} />

            <ChecklistSection title={locale === 'hi' ? 'साक्ष्य सुरक्षित करें' : 'Preserve Evidence'} items={[
              { en: 'Save all photos/videos to cloud immediately', hi: 'सभी फोटो/वीडियो तुरंत क्लाउड पर सेव करें' },
              { en: 'Write down what happened while memory is fresh', hi: 'जब तक याद ताज़ा है, लिख लें कि क्या हुआ' },
              { en: 'Note badge numbers, vehicle numbers, locations', hi: 'बैज नंबर, गाड़ी नंबर, लोकेशन नोट करें' },
              { en: 'If injured: photograph injuries BEFORE treatment', hi: 'अगर चोट है: इलाज से पहले फोटो लें' },
            ]} locale={locale} />

            <ChecklistSection title={locale === 'hi' ? 'कानूनी कदम' : 'Legal Steps'} items={[
              { en: 'If detained: file a complaint about unlawful detention', hi: 'अगर हिरासत में थे: गैरकानूनी हिरासत की शिकायत दर्ज करें' },
              { en: 'If injured by police: get a medico-legal certificate (MLC)', hi: 'पुलिस से चोट लगी: मेडिको-लीगल सर्टिफिकेट (MLC) लें' },
              { en: 'Contact legal aid from our directory', hi: 'हमारी निर्देशिका से कानूनी सहायता संपर्क करें' },
            ]} locale={locale} />

            <Card variant="accent" padding="md">
              <p className="text-sm font-bold text-center">
                {locale === 'hi'
                  ? 'यह एक अभियान की शुरुआत हो सकती है। अपना अनुभव एक अभियान में बदलें →'
                  : 'This could be the start of a campaign. Turn your experience into organized action →'}
              </p>
              <div className="mt-3 text-center">
                <a href="/campaign/create" className="text-sm font-bold text-[var(--saffron)] underline">
                  {locale === 'hi' ? 'अभियान शुरू करें' : 'Start a Campaign'}
                </a>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PageShell>
  );
}

// Helper component for checklists
function ChecklistSection({ title, items, locale }: { title: string; items: Array<{ en: string; hi: string }>; locale: 'en' | 'hi' }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  return (
    <div className="border-2 border-[var(--ink)] rounded-[var(--radius-md)] overflow-hidden">
      <div className="px-4 py-2 bg-[var(--paper-dark)] border-b border-[var(--ink)]">
        <h3 className="text-sm font-bold uppercase tracking-wide">{title}</h3>
      </div>
      <div className="divide-y divide-[var(--border-light)]">
        {items.map((item, i) => (
          <label key={i} className="flex items-start gap-3 p-3 cursor-pointer hover:bg-[var(--paper-dark)]">
            <input
              type="checkbox"
              checked={checked.has(i)}
              onChange={() => setChecked(prev => {
                const next = new Set(prev);
                next.has(i) ? next.delete(i) : next.add(i);
                return next;
              })}
              className="w-5 h-5 mt-0.5 accent-[var(--saffron)] flex-shrink-0"
            />
            <span className={['text-sm', checked.has(i) ? 'line-through text-[var(--ink-muted)]' : ''].join(' ')}>
              {locale === 'hi' ? item.hi : item.en}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
