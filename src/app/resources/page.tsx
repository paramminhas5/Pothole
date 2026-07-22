import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function ResourcesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10">
        <h1 className="heading-display mb-3">
          {hi ? 'आपातकालीन संपर्क और संसाधन' : 'Emergency Contacts & Resources'}
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg">
          {hi ? 'सभी महत्वपूर्ण हेल्पलाइन, संगठन, और सरकारी पोर्टल — एक जगह।' : 'All critical helplines, organizations, and government portals — in one place.'}
        </p>
      </div>


      {/* NATIONAL EMERGENCY */}
      <section className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">{hi ? 'राष्ट्रीय आपातकालीन नंबर' : 'National Emergency Numbers'}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left border-b"><th className="pb-2 pr-4">{hi ? 'नंबर' : 'Number'}</th><th className="pb-2 pr-4">{hi ? 'सेवा' : 'Service'}</th><th className="pb-2">{hi ? 'समय' : 'Hours'}</th></tr></thead>
            <tbody className="space-y-1">
              <tr><td className="py-2 pr-4 font-bold text-lg">112</td><td className="py-2 pr-4">{hi ? 'एकीकृत आपातकालीन (पुलिस, एम्बुलेंस, फायर)' : 'Unified Emergency (Police, Ambulance, Fire)'}</td><td className="py-2">24/7</td></tr>
              <tr><td className="py-2 pr-4 font-bold">100</td><td className="py-2 pr-4">{hi ? 'पुलिस' : 'Police'}</td><td className="py-2">24/7</td></tr>
              <tr><td className="py-2 pr-4 font-bold">101</td><td className="py-2 pr-4">{hi ? 'अग्निशमन' : 'Fire Brigade'}</td><td className="py-2">24/7</td></tr>
              <tr><td className="py-2 pr-4 font-bold">108</td><td className="py-2 pr-4">{hi ? 'एम्बुलेंस' : 'Ambulance'}</td><td className="py-2">24/7</td></tr>
              <tr><td className="py-2 pr-4 font-bold">181</td><td className="py-2 pr-4">{hi ? 'महिला हेल्पलाइन' : 'Women Helpline'}</td><td className="py-2">24/7</td></tr>
              <tr><td className="py-2 pr-4 font-bold">1098</td><td className="py-2 pr-4">{hi ? 'चाइल्डलाइन (18 वर्ष से कम)' : 'Childline (Under 18)'}</td><td className="py-2">24/7</td></tr>
              <tr><td className="py-2 pr-4 font-bold">1930</td><td className="py-2 pr-4">{hi ? 'साइबर अपराध हेल्पलाइन' : 'Cyber Crime Helpline'}</td><td className="py-2">24/7</td></tr>
              <tr><td className="py-2 pr-4 font-bold">14461</td><td className="py-2 pr-4">{hi ? 'वरिष्ठ नागरिक हेल्पलाइन' : 'Senior Citizen Helpline'}</td><td className="py-2">24/7</td></tr>
              <tr><td className="py-2 pr-4 font-bold">1800-11-4000</td><td className="py-2 pr-4">{hi ? 'उपभोक्ता हेल्पलाइन' : 'Consumer Helpline'}</td><td className="py-2">{hi ? 'सोम-शनि 9:30-5:30' : 'Mon-Sat 9:30-5:30'}</td></tr>
              <tr><td className="py-2 pr-4 font-bold">1800-599-0019</td><td className="py-2 pr-4">{hi ? 'किसान कॉल सेंटर' : 'Kisan Call Center'}</td><td className="py-2">6am-10pm</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3 text-[var(--color-text-muted)]">{hi ? 'स्रोत: 112.gov.in — भारत सरकार ERSS' : 'Source: 112.gov.in — Government of India ERSS'}</p>
      </section>

      {/* MENTAL HEALTH */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'मानसिक स्वास्थ्य सहायता' : 'Mental Health Support'}</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-start gap-4 p-3 bg-[var(--color-surface-alt)] rounded">
            <div><strong>iCall (TISS Mumbai)</strong><p className="text-[var(--color-text-muted)]">{hi ? 'प्रशिक्षित काउंसलर' : 'Trained counselors'}</p></div>
            <div className="text-right"><strong>9152987821</strong><br /><span className="text-xs">{hi ? 'सोम-शनि 8am-10pm' : 'Mon-Sat 8am-10pm'}</span></div>
          </div>
          <div className="flex justify-between items-start gap-4 p-3 bg-[var(--color-surface-alt)] rounded">
            <div><strong>Vandrevala Foundation</strong><p className="text-[var(--color-text-muted)]">{hi ? 'बहुभाषी, मुफ्त' : 'Multilingual, free'}</p></div>
            <div className="text-right"><strong>9999 666 555</strong><br /><span className="text-xs">24/7</span></div>
          </div>
          <div className="flex justify-between items-start gap-4 p-3 bg-[var(--color-surface-alt)] rounded">
            <div><strong>NIMHANS</strong><p className="text-[var(--color-text-muted)]">{hi ? 'राष्ट्रीय मानसिक स्वास्थ्य संस्थान' : 'National Institute of Mental Health'}</p></div>
            <div className="text-right"><strong>080-46110007</strong><br /><span className="text-xs">{hi ? 'सोम-शनि' : 'Mon-Sat'}</span></div>
          </div>
          <div className="flex justify-between items-start gap-4 p-3 bg-[var(--color-surface-alt)] rounded">
            <div><strong>Snehi</strong><p className="text-[var(--color-text-muted)]">Chennai</p></div>
            <div className="text-right"><strong>044-24640050</strong><br /><span className="text-xs">24/7</span></div>
          </div>
          <div className="flex justify-between items-start gap-4 p-3 bg-[var(--color-surface-alt)] rounded">
            <div><strong>AASRA</strong><p className="text-[var(--color-text-muted)]">Mumbai</p></div>
            <div className="text-right"><strong>9820466726</strong><br /><span className="text-xs">24/7</span></div>
          </div>
        </div>
      </section>


      {/* LEGAL AID */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'कानूनी सहायता' : 'Legal Aid'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>NALSA — {hi ? 'राष्ट्रीय कानूनी सेवा प्राधिकरण' : 'National Legal Services Authority'}</strong>
            <p>{hi ? 'मुफ्त कानूनी सहायता का अधिकार (गरीबी रेखा से नीचे, SC/ST, महिला, बच्चे, विकलांग, आपदा पीड़ित, औद्योगिक श्रमिक)' : 'Right to free legal aid (BPL, SC/ST, women, children, disabled, disaster victims, industrial workers)'}</p>
            <p className="mt-1"><strong>{hi ? 'वेबसाइट:' : 'Website:'}</strong> nalsa.gov.in</p>
            <p><strong>{hi ? 'हेल्पलाइन:' : 'Helpline:'}</strong> 15100 ({hi ? 'कुछ राज्यों में' : 'in some states'})</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'जिला कानूनी सेवा प्राधिकरण (DLSA)' : 'District Legal Services Authority (DLSA)'}</strong>
            <p>{hi ? 'हर जिले में DLSA कार्यालय होता है। नजदीकी कोर्ट में पूछें या nalsa.gov.in पर खोजें।' : 'Every district has a DLSA office. Ask at your nearest court or search on nalsa.gov.in.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'मुफ्त कानूनी सहायता कैसे पाएँ:' : 'How to get free legal aid:'}</strong>
            <ol className="mt-1 list-decimal list-inside space-y-1">
              <li>{hi ? 'नजदीकी DLSA कार्यालय जाएँ (जिला अदालत में)' : 'Visit nearest DLSA office (in district court)'}</li>
              <li>{hi ? 'आवेदन पत्र भरें (कोई शुल्क नहीं)' : 'Fill application form (no fee)'}</li>
              <li>{hi ? 'आय प्रमाण (BPL कार्ड) या श्रेणी प्रमाण दें' : 'Provide income proof (BPL card) or category proof'}</li>
              <li>{hi ? 'वकील नियुक्त किया जाएगा — मुफ्त' : 'Lawyer will be assigned — free of charge'}</li>
            </ol>
          </div>
        </div>
      </section>

      {/* HUMAN RIGHTS BODIES */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'मानवाधिकार संस्थाएँ' : 'Human Rights Bodies'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>NHRC — {hi ? 'राष्ट्रीय मानवाधिकार आयोग' : 'National Human Rights Commission'}</strong>
            <p>{hi ? 'पुलिस अत्याचार, हिरासत में मृत्यु, बल प्रयोग की शिकायत' : 'Police brutality, custodial death, use of force complaints'}</p>
            <p className="mt-1"><strong>{hi ? 'ऑनलाइन शिकायत:' : 'Online complaint:'}</strong> nhrc.nic.in → "{hi ? 'शिकायत दर्ज करें' : 'Lodge Complaint'}"</p>
            <p><strong>{hi ? 'फोन:' : 'Phone:'}</strong> 011-24663333</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'राज्य मानवाधिकार आयोग (SHRC)' : 'State Human Rights Commission (SHRC)'}</strong>
            <p>{hi ? 'हर राज्य का अपना SHRC है। राज्य-स्तरीय शिकायतों के लिए SHRC में जाएँ।' : 'Every state has its own SHRC. For state-level complaints, approach your SHRC.'}</p>
          </div>
        </div>
      </section>

      {/* RTI & GOVERNANCE PORTALS */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'RTI और शासन पोर्टल' : 'RTI & Governance Portals'}</h2>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'RTI ऑनलाइन (केंद्र सरकार)' : 'RTI Online (Central Government)'}</strong>
            <p>rtionline.gov.in — {hi ? '₹10 शुल्क, 30 दिन में जवाब अनिवार्य' : '₹10 fee, 30-day response mandatory'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'केंद्रीय सूचना आयोग (CIC)' : 'Central Information Commission (CIC)'}</strong>
            <p>cic.gov.in — {hi ? 'दूसरी अपील और शिकायतें' : 'Second appeals and complaints'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'CPGRAMS — केंद्रीय शिकायत निवारण' : 'CPGRAMS — Central Grievance Redressal'}</strong>
            <p>pgportal.gov.in — {hi ? 'किसी भी केंद्रीय मंत्रालय/विभाग के खिलाफ शिकायत' : 'Complaints against any central ministry/department'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'साइबर अपराध पोर्टल' : 'Cyber Crime Portal'}</strong>
            <p>cybercrime.gov.in — {hi ? 'ऑनलाइन FIR, साइबर बुलिंग, हैकिंग, फ्रॉड' : 'Online FIR, cyber bullying, hacking, fraud'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'लोकपाल / लोकायुक्त' : 'Lokpal / Lokayukta'}</strong>
            <p>{hi ? 'भ्रष्टाचार शिकायत — lokpal.gov.in (केंद्र), राज्य लोकायुक्त (राज्य)' : 'Corruption complaints — lokpal.gov.in (central), state Lokayukta (state level)'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'केंद्रीय सतर्कता आयोग (CVC)' : 'Central Vigilance Commission (CVC)'}</strong>
            <p>cvc.gov.in — {hi ? 'भ्रष्टाचार विरोधी शिकायत (केंद्रीय कर्मचारी)' : 'Anti-corruption complaints (central government employees)'}</p>
          </div>
        </div>
      </section>


      {/* JOURNALIST & MEDIA */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'पत्रकार और मीडिया संसाधन' : 'Journalist & Media Resources'}</h2>
        <div className="space-y-2 text-sm">
          <p>→ <strong>{hi ? 'प्रेस काउंसिल ऑफ इंडिया:' : 'Press Council of India:'}</strong> presscouncil.nic.in — {hi ? 'प्रेस स्वतंत्रता शिकायत' : 'Press freedom complaints'}</p>
          <p>→ <strong>{hi ? 'एडिटर्स गिल्ड ऑफ इंडिया:' : 'Editors Guild of India:'}</strong> editorsguild.in</p>
          <p>→ <strong>CPJ ({hi ? 'पत्रकार सुरक्षा समिति' : 'Committee to Protect Journalists'}):</strong> cpj.org — {hi ? 'खतरे में पत्रकारों के लिए' : 'For journalists under threat'}</p>
          <p>→ <strong>RSF ({hi ? 'रिपोर्टर्स विदाउट बॉर्डर्स' : 'Reporters Without Borders'}):</strong> rsf.org</p>
          <p>→ <strong>PIB ({hi ? 'प्रेस सूचना ब्यूरो' : 'Press Information Bureau'}):</strong> pib.gov.in — {hi ? 'सरकारी प्रेस रिलीज' : 'Government press releases'}</p>
        </div>
      </section>

      {/* STUDENT ORGANIZATIONS */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'छात्र और युवा संसाधन' : 'Student & Youth Resources'}</h2>
        <div className="space-y-2 text-sm">
          <p>→ <strong>UGC ({hi ? 'विश्वविद्यालय अनुदान आयोग' : 'University Grants Commission'}):</strong> ugc.gov.in — {hi ? 'शिकायत पोर्टल' : 'Grievance portal'}</p>
          <p>→ <strong>NTA ({hi ? 'राष्ट्रीय परीक्षा एजेंसी' : 'National Testing Agency'}):</strong> nta.ac.in — {hi ? 'परीक्षा संबंधी शिकायत' : 'Exam-related grievances'}</p>
          <p>→ <strong>{hi ? 'विश्वविद्यालय छात्र परिषद:' : 'University Student Council:'}</strong> {hi ? 'अपने विश्वविद्यालय की वेबसाइट पर देखें' : 'Check your university website'}</p>
          <p>→ <strong>{hi ? 'शिक्षा मंत्रालय शिकायत:' : 'Education Ministry Grievance:'}</strong> pgportal.gov.in → {hi ? 'शिक्षा मंत्रालय चुनें' : 'Select Ministry of Education'}</p>
        </div>
      </section>

      {/* WOMEN SPECIFIC */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'महिला सुरक्षा' : 'Women Safety'}</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-start gap-4 p-3 bg-[var(--color-surface-alt)] rounded">
            <div><strong>{hi ? 'महिला हेल्पलाइन' : 'Women Helpline'}</strong><p className="text-[var(--color-text-muted)]">{hi ? 'घरेलू हिंसा, उत्पीड़न, तस्करी' : 'Domestic violence, harassment, trafficking'}</p></div>
            <div className="text-right"><strong>181</strong><br /><span className="text-xs">24/7</span></div>
          </div>
          <div className="flex justify-between items-start gap-4 p-3 bg-[var(--color-surface-alt)] rounded">
            <div><strong>NCW — {hi ? 'राष्ट्रीय महिला आयोग' : 'National Commission for Women'}</strong></div>
            <div className="text-right"><strong>7827-170-170</strong><br /><span className="text-xs">ncw.nic.in</span></div>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded">
            <strong>{hi ? 'सुरक्षा आदेश (Protection Order):' : 'Protection Order:'}</strong>
            <p>{hi ? 'घरेलू हिंसा अधिनियम 2005 के तहत मजिस्ट्रेट से सुरक्षा आदेश — मुफ्त कानूनी सहायता उपलब्ध।' : 'Protection order from Magistrate under Domestic Violence Act 2005 — free legal aid available.'}</p>
          </div>
        </div>
      </section>

      {/* USEFUL APPS & TOOLS */}
      <section className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? 'उपयोगी ऐप्स और पोर्टल' : 'Useful Apps & Portals'}</h2>
        <div className="space-y-2 text-sm">
          <p>→ <strong>112 India App</strong> — {hi ? 'SOS बटन, लोकेशन शेयर, एम्बुलेंस/पुलिस/फायर' : 'SOS button, location sharing, ambulance/police/fire'}</p>
          <p>→ <strong>DigiLocker</strong> — digilocker.gov.in — {hi ? 'सरकारी दस्तावेज़ सुरक्षित' : 'Government documents stored safely'}</p>
          <p>→ <strong>UMANG</strong> — {hi ? 'सभी सरकारी सेवाएँ एक ऐप में' : 'All government services in one app'}</p>
          <p>→ <strong>e-Courts</strong> — ecourts.gov.in — {hi ? 'केस स्टेटस, कोर्ट ऑर्डर' : 'Case status, court orders'}</p>
          <p>→ <strong>Signal</strong> — signal.org — {hi ? 'एन्क्रिप्टेड मैसेजिंग (अनुशंसित)' : 'Encrypted messaging (recommended)'}</p>
          <p>→ <strong>ProtonVPN</strong> — protonvpn.com — {hi ? 'मुफ्त VPN (इंटरनेट शटडाउन के दौरान)' : 'Free VPN (during internet shutdowns)'}</p>
        </div>
      </section>

      {/* CTA */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/safety" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'अधिकार गाइड →' : 'RIGHTS GUIDE →'}</Link>
        <Link href="/rti" className="brutal-btn brutal-btn-lg text-center">{hi ? 'RTI जनरेटर →' : 'RTI GENERATOR →'}</Link>
        <Link href="/fir" className="brutal-btn brutal-btn-lg text-center">{hi ? 'FIR असिस्टेंट →' : 'FIR ASSISTANT →'}</Link>
      </div>
    </div>
  );
}
