import { cookies } from 'next/headers';
import { Locale } from '@/types';

export default async function SafetyPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const isHindi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <div className="brutal-badge brutal-badge-purple mb-4">
          {isHindi ? 'सुरक्षा' : 'SAFETY'}
        </div>
        <h1 className="heading-1 mb-3">{isHindi ? 'अपने अधिकार जानें' : 'Know Your Rights'}</h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {isHindi
            ? 'यह जानकारी ऑफ़लाइन भी उपलब्ध है। इसे स्क्रीनशॉट या सेव करें।'
            : 'This information is available offline. Screenshot or save it.'}
        </p>
      </div>

      {/* Section: If Detained */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-red mb-4">{isHindi ? 'गिरफ्तारी / हिरासत' : 'IF DETAINED'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'अगर आपको हिरासत में लिया जाए' : 'If You Are Detained'}</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          {isHindi ? (
            <>
              <p><strong>1. शांत रहें।</strong> घबराएं नहीं। आपके पास अधिकार हैं।</p>
              <p><strong>2. गिरफ्तारी का कारण पूछें।</strong> पुलिस को आपको बताना होगा कि आपको क्यों गिरफ्तार किया जा रहा है (CrPC Section 50)।</p>
              <p><strong>3. आपको वकील का अधिकार है।</strong> अनुच्छेद 22(1) के तहत आपको गिरफ्तारी के तुरंत बाद वकील से मिलने का अधिकार है।</p>
              <p><strong>4. परिवार को सूचित करने का अधिकार।</strong> पुलिस को आपके परिवार या मित्र को सूचित करना होगा।</p>
              <p><strong>5. 24 घंटे के भीतर मजिस्ट्रेट के सामने पेश किया जाना चाहिए।</strong> यह संवैधानिक अधिकार है (अनुच्छेद 22(2))।</p>
              <p><strong>6. कोई बयान देने के लिए बाध्य नहीं हैं।</strong> आपको चुप रहने का अधिकार है। कोई भी बयान देने से पहले वकील से बात करें।</p>
              <p><strong>7. शारीरिक या मानसिक प्रताड़ना अवैध है।</strong> यदि कोई हिंसा हो, तो तुरंत नोट करें — समय, स्थान, अधिकारियों के नाम/बैज नंबर।</p>
              <p><strong>8. महिलाओं की गिरफ्तारी सूर्यास्त के बाद और सूर्योदय से पहले नहीं हो सकती</strong> (विशेष परिस्थितियों को छोड़कर, और तब भी महिला अधिकारी होनी चाहिए)।</p>
            </>
          ) : (
            <>
              <p><strong>1. Stay calm.</strong> Do not panic. You have rights.</p>
              <p><strong>2. Ask for the reason for arrest.</strong> Police must inform you why you are being arrested (CrPC Section 50).</p>
              <p><strong>3. You have the right to a lawyer.</strong> Under Article 22(1), you can consult a lawyer immediately after arrest.</p>
              <p><strong>4. Right to inform family.</strong> Police must inform your family member or friend of your arrest.</p>
              <p><strong>5. Must be produced before a magistrate within 24 hours.</strong> This is a constitutional right (Article 22(2)).</p>
              <p><strong>6. You are not obliged to give any statement.</strong> You have the right to remain silent. Speak to a lawyer before making any statement.</p>
              <p><strong>7. Physical or mental torture is illegal.</strong> If any violence occurs, note immediately — time, place, officers&apos; names/badge numbers.</p>
              <p><strong>8. Women cannot be arrested after sunset and before sunrise</strong> (except in exceptional circumstances, and even then a female officer must be present).</p>
            </>
          )}
        </div>
      </section>

      {/* Section: Digital Safety */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-sky mb-4">{isHindi ? 'डिजिटल सुरक्षा' : 'DIGITAL SAFETY'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'डिजिटल सुरक्षा सुझाव' : 'Digital Safety Tips'}</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          {isHindi ? (
            <>
              <p><strong>→ फ़ोटो से मेटाडेटा हटाएं।</strong> फ़ोटो शेयर करने से पहले EXIF डेटा (GPS स्थान, समय) हटाएं। Signal ऐप इसे स्वचालित रूप से करता है।</p>
              <p><strong>→ एंड-टू-एंड एन्क्रिप्टेड मैसेजिंग का उपयोग करें।</strong> Signal सबसे सुरक्षित है। WhatsApp E2E एन्क्रिप्टेड है लेकिन मेटाडेटा Meta के पास है।</p>
              <p><strong>→ अपने डिवाइस को लॉक करें।</strong> मजबूत पासकोड (बायोमेट्रिक नहीं — कानूनी रूप से आपको अंगूठा नहीं देना है, पासवर्ड नहीं)।</p>
              <p><strong>→ दूसरों को टैग या डॉक्स न करें।</strong> बिना सहमति के किसी की पहचान साझा न करें।</p>
              <p><strong>→ VPN का उपयोग करें।</strong> मुफ़्त VPN से बचें। ProtonVPN का मुफ़्त टियर विश्वसनीय है।</p>
              <p><strong>→ 2-Factor Authentication चालू करें</strong> सभी महत्वपूर्ण खातों पर।</p>
              <p><strong>→ संवेदनशील संचार के बाद ब्राउज़र इतिहास साफ़ करें।</strong></p>
            </>
          ) : (
            <>
              <p><strong>→ Strip metadata from photos.</strong> Remove EXIF data (GPS location, timestamps) before sharing photos. Signal does this automatically.</p>
              <p><strong>→ Use end-to-end encrypted messaging.</strong> Signal is safest. WhatsApp is E2E encrypted but Meta holds metadata.</p>
              <p><strong>→ Lock your device.</strong> Strong passcode (not biometric — legally you don&apos;t have to provide a fingerprint, but you can be compelled to provide... nothing).</p>
              <p><strong>→ Don&apos;t tag or doxx others.</strong> Never share someone&apos;s identity without their explicit consent.</p>
              <p><strong>→ Use a VPN.</strong> Avoid free VPNs. ProtonVPN free tier is trustworthy.</p>
              <p><strong>→ Enable 2-Factor Authentication</strong> on all important accounts.</p>
              <p><strong>→ Clear browser history after sensitive communications.</strong></p>
            </>
          )}
        </div>
      </section>

      {/* Section: Protest Safety */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-accent mb-4">{isHindi ? 'विरोध प्रदर्शन' : 'AT A PROTEST'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'विरोध प्रदर्शन में सुरक्षा' : 'Protest Safety'}</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          {isHindi ? (
            <>
              <p><strong>जाने से पहले:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>किसी विश्वसनीय व्यक्ति को बताएं कि आप कहाँ जा रहे हैं और कब तक वापस आएंगे</li>
                <li>आपातकालीन संपर्क नंबर अपनी बांह पर स्थायी मार्कर से लिखें</li>
                <li>पूरी चार्ज फ़ोन ले जाएं। पोर्टेबल चार्जर भी।</li>
                <li>पानी, स्नैक्स, ID (की फ़ोटो — मूल घर पर रखें)</li>
                <li>आँसू गैस के लिए: गीला कपड़ा, सादा पानी की बोतल (आँखें धोने के लिए)</li>
              </ul>
              <p><strong>वहाँ पहुँचकर:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>बाहर निकलने के रास्ते पहचानें</li>
                <li>एक दोस्त के साथ "buddy system" रखें</li>
                <li>शांत रहें। भड़काने वालों से दूर रहें।</li>
                <li>यदि लाठी चार्ज हो: सिर और पेट ढकें, बैठ जाएं, भीड़ के किनारे जाएं</li>
              </ul>
            </>
          ) : (
            <>
              <p><strong>Before you go:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Tell a trusted person where you&apos;re going and when you expect to be back</li>
                <li>Write emergency contact numbers on your arm in permanent marker</li>
                <li>Fully charged phone. Portable charger too.</li>
                <li>Water, snacks, ID (photo copy — leave originals at home)</li>
                <li>For tear gas: wet cloth, plain water bottle (to rinse eyes)</li>
              </ul>
              <p><strong>Once there:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Identify exits immediately</li>
                <li>Use a buddy system — stay with at least one friend</li>
                <li>Stay calm. Stay away from provocateurs.</li>
                <li>If lathi charge: cover head and stomach, sit down if trapped, move to the edges of the crowd</li>
              </ul>
            </>
          )}
        </div>
      </section>

      {/* Section: Emergency Contacts */}
      <section className="brutal-card mb-6">
        <div className="brutal-badge brutal-badge-yellow mb-4">{isHindi ? 'आपातकालीन' : 'EMERGENCY'}</div>
        <h2 className="heading-2 mb-4">{isHindi ? 'आपातकालीन हेल्पलाइन' : 'Emergency Helplines'}</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-2">{isHindi ? 'राष्ट्रीय' : 'National'}</h3>
            <ul className="space-y-2">
              <li><strong>Police:</strong> 100</li>
              <li><strong>Ambulance:</strong> 102 / 108</li>
              <li><strong>Women Helpline:</strong> 181</li>
              <li><strong>National Human Rights Commission:</strong> 011-23385368</li>
              <li><strong>Legal Aid (NALSA):</strong> 15100</li>
            </ul>
          </div>
          <div className="brutal-card-flat !p-4">
            <h3 className="font-bold mb-2">{isHindi ? 'डिजिटल अधिकार' : 'Digital Rights'}</h3>
            <ul className="space-y-2">
              <li><strong>Internet Freedom Foundation:</strong> iff.org.in</li>
              <li><strong>SFLC.in:</strong> sflc.in (digital rights legal aid)</li>
              <li><strong>Digital Patrakar:</strong> For journalist safety</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="brutal-banner text-center text-xs">
        {isHindi
          ? 'यह सामान्य जानकारी है, कानूनी सलाह नहीं। विशिष्ट स्थितियों के लिए हमेशा एक योग्य वकील से परामर्श करें।'
          : 'THIS IS GENERAL INFORMATION, NOT LEGAL ADVICE. ALWAYS CONSULT A QUALIFIED LAWYER FOR SPECIFIC SITUATIONS.'}
      </div>
    </div>
  );
}
