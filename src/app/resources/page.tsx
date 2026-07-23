import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';
import PrintButton from '@/components/PrintButton';
import ShareButton from '@/components/ShareButton';
import CommunityResources from '@/components/CommunityResources';
import ReportError from '@/components/ReportError';

export default async function ResourcesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-10 flex justify-between items-start gap-4">
        <div>
          <h1 className="heading-display mb-3">{hi ? 'संसाधन निर्देशिका' : 'Resource Directory'}</h1>
          <p className="text-[var(--color-text-muted)] text-lg">{hi ? 'कानूनी सहायता, आश्रय, मानसिक स्वास्थ्य, सरकारी पोर्टल, नागरिक संगठन — सत्यापित स्रोतों के साथ।' : 'Legal aid, shelters, mental health, government portals, civic organizations — with verified sources.'}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <ShareButton locale={locale} title={hi ? 'संसाधन निर्देशिका — Sahayata' : 'Resource Directory — Sahayata'} />
          <PrintButton locale={locale} />
          <ReportError locale={locale} context="resources page" />
        </div>
      </div>

      {/* TABLE OF CONTENTS */}
      <nav className="brutal-card mb-8" aria-label="Table of contents">
        <h2 className="heading-3 mb-3">{hi ? 'इस पेज पर' : 'On This Page'}</h2>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#emergency" className="text-[var(--color-primary)]">1. {hi ? 'आपातकालीन नंबर' : 'Emergency Numbers'}</a>
          <a href="#legal" className="text-[var(--color-primary)]">2. {hi ? 'कानूनी सहायता' : 'Legal Aid'}</a>
          <a href="#shelters" className="text-[var(--color-primary)]">3. {hi ? 'आश्रय और सुरक्षित स्थान' : 'Shelters & Safe Spaces'}</a>
          <a href="#mental" className="text-[var(--color-primary)]">4. {hi ? 'मानसिक स्वास्थ्य' : 'Mental Health'}</a>
          <a href="#digital" className="text-[var(--color-primary)]">5. {hi ? 'डिजिटल अधिकार और सुरक्षा' : 'Digital Rights & Safety'}</a>
          <a href="#human-rights" className="text-[var(--color-primary)]">6. {hi ? 'मानवाधिकार संस्थाएँ' : 'Human Rights Bodies'}</a>
          <a href="#govt" className="text-[var(--color-primary)]">7. {hi ? 'सरकारी शिकायत पोर्टल' : 'Government Complaint Portals'}</a>
          <a href="#orgs" className="text-[var(--color-primary)]">8. {hi ? 'नागरिक संगठन' : 'Civic Organizations'}</a>
          <a href="#student" className="text-[var(--color-primary)]">9. {hi ? 'छात्र संगठन' : 'Student Organizations'}</a>
          <a href="#women" className="text-[var(--color-primary)]">10. {hi ? 'महिला सुरक्षा' : 'Women Safety'}</a>
          <a href="#media" className="text-[var(--color-primary)]">11. {hi ? 'मीडिया और प्रेस' : 'Media & Press'}</a>
          <a href="#tools" className="text-[var(--color-primary)]">12. {hi ? 'उपयोगी ऐप्स और उपकरण' : 'Useful Apps & Tools'}</a>
        </div>
      </nav>


      {/* 1. EMERGENCY */}
      <section id="emergency" className="brutal-card mb-8 !border-[var(--color-red)]">
        <h2 className="heading-2 mb-4">{hi ? '1. आपातकालीन नंबर' : '1. Emergency Numbers'}</h2>
        <p className="text-xs mb-4 text-[var(--color-text-muted)]">{hi ? 'स्रोत: 112.gov.in (भारत सरकार ERSS)' : 'Source: 112.gov.in (Government of India ERSS)'}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="tel:112" className="resource-card resource-card-emergency"><span className="resource-number">112</span><span className="resource-label">{hi ? 'एकीकृत आपातकालीन — पुलिस, एम्बुलेंस, फायर' : 'Unified Emergency — Police, Ambulance, Fire'}</span><span className="resource-meta">24/7 | {hi ? 'पूरे भारत में' : 'All India'}</span></a>
          <a href="tel:108" className="resource-card"><span className="resource-number">108</span><span className="resource-label">{hi ? 'एम्बुलेंस' : 'Ambulance'}</span><span className="resource-meta">24/7 | {hi ? 'अधिकांश राज्य' : 'Most states'}</span></a>
          <a href="tel:1516" className="resource-card"><span className="resource-number">1516</span><span className="resource-label">{hi ? 'DSLSA — मुफ्त कानूनी सहायता (दिल्ली)' : 'DSLSA — Free Legal Aid (Delhi)'}</span><span className="resource-meta">24/7 | dslsa.org</span></a>
          <a href="tel:15100" className="resource-card"><span className="resource-number">15100</span><span className="resource-label">{hi ? 'NALSA — मुफ्त कानूनी सहायता' : 'NALSA — Free Legal Aid'}</span><span className="resource-meta">{hi ? 'कुछ राज्यों में' : 'Select states'} | nalsa.gov.in</span></a>
          <a href="tel:181" className="resource-card"><span className="resource-number">181</span><span className="resource-label">{hi ? 'महिला हेल्पलाइन' : 'Women Helpline'}</span><span className="resource-meta">24/7 | {hi ? 'गोपनीय' : 'Confidential'}</span></a>
          <a href="tel:1098" className="resource-card"><span className="resource-number">1098</span><span className="resource-label">{hi ? 'चाइल्डलाइन (18 वर्ष से कम)' : 'Childline (Under 18)'}</span><span className="resource-meta">24/7 | childlineindia.org</span></a>
          <a href="tel:1930" className="resource-card"><span className="resource-number">1930</span><span className="resource-label">{hi ? 'साइबर अपराध' : 'Cyber Crime'}</span><span className="resource-meta">24/7 | cybercrime.gov.in</span></a>
          <a href="tel:8588833548" className="resource-card"><span className="resource-number">8588833548</span><span className="resource-label">{hi ? 'छात्र सहायता हेल्पलाइन (कानूनी + चिकित्सा)' : 'Student Support Helpline (Legal + Medical)'}</span><span className="resource-meta">{hi ? 'विपक्ष द्वारा, जुलाई 2026' : 'Opposition-run, July 2026'}</span></a>
        </div>
      </section>


      {/* 2. LEGAL AID */}
      <section id="legal" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '2. कानूनी सहायता — किसे बुलाएँ, कहाँ जाएँ' : '2. Legal Aid — Who to Call, Where to Go'}</h2>

        <div className="space-y-4">
          {/* NALSA/DLSA */}
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-2">{hi ? 'मुफ्त सरकारी कानूनी सहायता (आपका अधिकार)' : 'Free Government Legal Aid (Your Right)'}</h3>
            <p className="text-sm mb-2">{hi ? 'अनुच्छेद 39A के तहत: गरीबी रेखा से नीचे, SC/ST, महिला, बच्चे, विकलांग, आपदा पीड़ित, औद्योगिक श्रमिक — सभी को मुफ्त वकील मिलने का अधिकार है।' : 'Under Article 39A: BPL, SC/ST, women, children, disabled, disaster victims, industrial workers — all entitled to free legal representation.'}</p>
            <div className="grid md:grid-cols-2 gap-3 text-sm mt-3">
              <div>
                <strong>{hi ? 'राष्ट्रीय (NALSA)' : 'National (NALSA)'}</strong>
                <p>{hi ? 'वेबसाइट' : 'Website'}: <a href="https://nalsa.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">nalsa.gov.in ↗</a></p>
                <p>{hi ? 'हेल्पलाइन' : 'Helpline'}: 15100 ({hi ? 'कुछ राज्य' : 'select states'})</p>
              </div>
              <div>
                <strong>{hi ? 'दिल्ली (DSLSA)' : 'Delhi (DSLSA)'}</strong>
                <p>{hi ? 'हेल्पलाइन' : 'Helpline'}: <a href="tel:1516" className="text-[var(--color-primary)] font-bold">1516</a> (24/7)</p>
                <p>{hi ? 'पता' : 'Address'}: 3rd Floor, Rouse Avenue District Court Complex, New Delhi 110002</p>
                <p>{hi ? 'वेबसाइट' : 'Website'}: <a href="https://dslsa.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">dslsa.org ↗</a></p>
              </div>
            </div>
            <div className="mt-3 p-3 border border-dashed border-[var(--color-border)] rounded text-sm">
              <strong>{hi ? 'मुफ्त सहायता कैसे पाएँ (4 कदम):' : 'How to get free aid (4 steps):'}</strong>
              <ol className="mt-1 list-decimal list-inside space-y-1">
                <li>{hi ? 'नजदीकी जिला अदालत में DLSA कार्यालय जाएँ' : 'Visit DLSA office at nearest district court'}</li>
                <li>{hi ? 'आवेदन पत्र भरें (कोई शुल्क नहीं)' : 'Fill application form (no fee)'}</li>
                <li>{hi ? 'आय प्रमाण या श्रेणी प्रमाण (BPL कार्ड, जाति प्रमाणपत्र)' : 'Income proof or category proof (BPL card, caste certificate)'}</li>
                <li>{hi ? 'वकील 3 दिन में नियुक्त — पूरी तरह मुफ्त' : 'Lawyer assigned within 3 days — completely free'}</li>
              </ol>
            </div>
          </div>

          {/* HRLN */}
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">Human Rights Law Network (HRLN)</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">{hi ? 'स्थापित 1989 | 200+ वकील | 26 राज्य | pro-bono PIL और कानूनी सहायता' : 'Founded 1989 | 200+ lawyers | 26 states | Pro-bono PIL and legal aid'}</p>
            <p className="text-sm">{hi ? 'क्या करते हैं: मुफ्त कानूनी प्रतिनिधित्व, जनहित याचिका (PIL), हाशिए पर खड़े लोगों के अधिकार, पुलिस अत्याचार के मामले।' : 'What they do: Free legal representation, Public Interest Litigation (PIL), rights of marginalized, police brutality cases.'}</p>
            <p className="text-sm mt-1"><strong>{hi ? 'वेबसाइट' : 'Website'}:</strong> <a href="https://hrln.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">hrln.org ↗</a></p>
            <p className="text-sm"><strong>{hi ? 'संस्थापक' : 'Founder'}:</strong> Colin Gonsalves (Senior Advocate, Supreme Court)</p>
            <p className="text-xs mt-1 text-[var(--color-text-muted)]">{hi ? '✅ सत्यापित: MacArthur Award 2013 प्राप्तकर्ता' : '✅ Verified: MacArthur Award 2013 recipient'}</p>
          </div>

          {/* PUCL */}
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">{hi ? "People's Union for Civil Liberties (PUCL)" : "People's Union for Civil Liberties (PUCL)"}</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">{hi ? 'स्थापित 1976 जयप्रकाश नारायण द्वारा | अध्यक्ष: कविता श्रीवास्तव' : 'Founded 1976 by Jayaprakash Narayan | President: Kavita Srivastava'}</p>
            <p className="text-sm">{hi ? 'क्या करते हैं: नागरिक स्वतंत्रता की रक्षा, तथ्य-अन्वेषण, पुलिस जवाबदेही, अभिव्यक्ति की स्वतंत्रता।' : 'What they do: Civil liberties defense, fact-finding missions, police accountability, freedom of expression.'}</p>
            <p className="text-xs mt-1 text-[var(--color-text-muted)]">{hi ? '✅ सत्यापित: भारत का सबसे पुराना नागरिक स्वतंत्रता संगठन' : "✅ Verified: India's oldest civil liberties organization"}</p>
          </div>

          {/* PUDR */}
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">{hi ? "People's Union for Democratic Rights (PUDR)" : "People's Union for Democratic Rights (PUDR)"}</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">{hi ? 'स्थापित 1977 | दिल्ली-केंद्रित | तथ्य-अन्वेषण और रिपोर्ट' : 'Founded 1977 | Delhi-focused | Fact-finding and reports'}</p>
            <p className="text-sm">{hi ? 'क्या करते हैं: पुलिस कार्रवाई पर तथ्य-अन्वेषण रिपोर्ट, राजनीतिक बंदियों की रिहाई, लोकतांत्रिक अधिकार।' : 'What they do: Fact-finding reports on police action, release of political prisoners, democratic rights.'}</p>
            <p className="text-sm mt-1"><strong>{hi ? 'वेबसाइट' : 'Website'}:</strong> <a href="https://pudr.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">pudr.org ↗</a></p>
            <p className="text-xs mt-1 text-[var(--color-text-muted)]">{hi ? '✅ सत्यापित: जुलाई 2026 विरोध प्रदर्शन पर रिपोर्ट प्रकाशित' : '✅ Verified: Published reports on July 2026 protests'}</p>
          </div>

          {/* CLPR */}
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">Centre for Law & Policy Research (CLPR)</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">{hi ? 'बेंगलुरु | संवैधानिक कानून और नीति अनुसंधान' : 'Bengaluru | Constitutional law and policy research'}</p>
            <p className="text-sm">{hi ? 'क्या करते हैं: संवैधानिक याचिकाएँ, मौलिक अधिकार मुकदमे, नीति अनुसंधान।' : 'What they do: Constitutional petitions, fundamental rights litigation, policy research.'}</p>
            <p className="text-sm mt-1"><strong>{hi ? 'वेबसाइट' : 'Website'}:</strong> <a href="https://clpr.org.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">clpr.org.in ↗</a></p>
          </div>

          {/* SCBA */}
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">{hi ? 'सुप्रीम कोर्ट बार एसोसिएशन (SCBA)' : 'Supreme Court Bar Association (SCBA)'}</h3>
            <p className="text-sm">{hi ? 'जुलाई 2026: SCBA ने छात्रों और वकीलों पर पुलिस कार्रवाई की निंदा करते हुए निष्पक्ष जाँच की माँग की।' : 'July 2026: SCBA condemned police action against students and lawyers, demanded impartial inquiry.'}</p>
            <p className="text-xs mt-1 text-[var(--color-text-muted)]">{hi ? '✅ सत्यापित: The Hindu, 22 जुलाई 2026' : '✅ Verified: The Hindu, July 22, 2026'}</p>
          </div>

          {/* Nyaaya */}
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">Nyaaya.org</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-2">{hi ? 'कानूनी साक्षरता मंच — सरल भाषा में कानून' : 'Legal literacy platform — law in plain language'}</p>
            <p className="text-sm">{hi ? 'क्या करते हैं: हर कानून को सरल भाषा में समझाते हैं। विरोध प्रदर्शन गाइड, अधिकार, प्रक्रियाएँ।' : 'What they do: Explain every law in plain language. Protest guides, rights, procedures.'}</p>
            <p className="text-sm mt-1"><strong>{hi ? 'विरोध गाइड' : 'Protest Guide'}:</strong> <a href="https://nyaaya.org/guide/guide-to-lawful-protesting/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">nyaaya.org/guide/guide-to-lawful-protesting ↗</a></p>
          </div>
        </div>
      </section>


      {/* 3. SHELTERS */}
      <section id="shelters" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '3. आश्रय और सुरक्षित स्थान' : '3. Shelters & Safe Spaces'}</h2>
        <div className="space-y-4">
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-2">{hi ? 'दिल्ली' : 'Delhi'}</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>{hi ? 'निर्मल छाया कॉम्प्लेक्स (महिला)' : 'Nirmal Chhaya Complex (Women)'}</strong>
                <p>{hi ? 'पता' : 'Address'}: Jail Road, New Delhi 110064</p>
                <p>{hi ? 'फोन' : 'Phone'}: 011-28520348, 011-28520653</p>
                <p className="text-xs text-[var(--color-text-muted)]">{hi ? 'स्रोत: wcd.delhi.gov.in — महिला एवं बाल विकास विभाग' : 'Source: wcd.delhi.gov.in — Dept of Women & Child Development'}</p>
              </div>
              <div>
                <strong>{hi ? 'स्वाधार गृह योजना (महिला)' : 'Swadhar Greh Scheme (Women)'}</strong>
                <p>{hi ? 'बेसहारा, हिंसा पीड़ित, बेघर महिलाओं के लिए। नजदीकी केंद्र: WCD कार्यालय से पूछें।' : 'For destitute, violence survivors, homeless women. Nearest center: ask WCD office.'}</p>
                <p>{hi ? 'वेबसाइट' : 'Website'}: <a href="https://wcd.delhi.gov.in/wcd/women-welfare-institutions" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">wcd.delhi.gov.in ↗</a></p>
              </div>
              <div>
                <strong>{hi ? 'रैन बसेरा (रात्रि आश्रय — सभी के लिए)' : 'Rain Basera (Night Shelters — For All)'}</strong>
                <p>{hi ? 'दिल्ली शहरी आश्रय सुधार बोर्ड (DUSIB) द्वारा संचालित। पूरे दिल्ली में 200+ आश्रय।' : 'Run by Delhi Urban Shelter Improvement Board (DUSIB). 200+ shelters across Delhi.'}</p>
                <p>{hi ? 'वेबसाइट' : 'Website'}: <a href="https://dusib.delhi.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">dusib.delhi.gov.in ↗</a></p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-2">{hi ? 'राष्ट्रीय योजनाएँ' : 'National Schemes'}</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>DAY-NULM ({hi ? 'शहरी बेघरों के लिए आश्रय' : 'Shelters for Urban Homeless'})</strong>
                <p>{hi ? 'हर शहर में सरकारी रात्रि आश्रय। नगर निगम से पूछें या 112 कॉल करें।' : 'Government night shelters in every city. Ask municipal corporation or call 112.'}</p>
              </div>
              <div>
                <strong>{hi ? 'अन्य शहरों में कैसे खोजें:' : 'How to find in other cities:'}</strong>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                  <li>{hi ? 'अपने शहर का नगर निगम वेबसाइट खोजें' : 'Search your city municipal corporation website'}</li>
                  <li>{hi ? '"Night shelter" या "rain basera" + शहर का नाम Google करें' : 'Google "night shelter" or "rain basera" + city name'}</li>
                  <li>{hi ? '112 कॉल करें — वे नजदीकी आश्रय बता सकते हैं' : 'Call 112 — they can direct to nearest shelter'}</li>
                  <li>{hi ? '181 (महिला) — महिलाओं के लिए विशेष आश्रय जानकारी' : '181 (Women) — specific shelter info for women'}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MENTAL HEALTH */}
      <section id="mental" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '4. मानसिक स्वास्थ्य सहायता' : '4. Mental Health Support'}</h2>
        <p className="text-sm mb-4">{hi ? 'विरोध प्रदर्शन, हिरासत, हिंसा या तनाव के बाद — बात करना ठीक है। ये सब मुफ्त और गोपनीय हैं।' : 'After protests, detention, violence, or stress — it is OK to talk. These are all free and confidential.'}</p>
        <div className="grid md:grid-cols-2 gap-3">
          <a href="tel:9152987821" className="resource-card"><span className="resource-number">9152987821</span><span className="resource-label">iCall (TISS Mumbai)</span><span className="resource-meta">{hi ? 'सोम-शनि 8am-10pm | प्रशिक्षित काउंसलर' : 'Mon-Sat 8am-10pm | Trained counselors'}</span></a>
          <a href="tel:9999666555" className="resource-card"><span className="resource-number">9999 666 555</span><span className="resource-label">Vandrevala Foundation</span><span className="resource-meta">24/7 | {hi ? 'बहुभाषी, मुफ्त' : 'Multilingual, free'}</span></a>
          <a href="tel:08046110007" className="resource-card"><span className="resource-number">080-46110007</span><span className="resource-label">NIMHANS Helpline</span><span className="resource-meta">{hi ? 'सोम-शनि | राष्ट्रीय मानसिक स्वास्थ्य संस्थान' : 'Mon-Sat | National Institute of Mental Health'}</span></a>
          <a href="tel:04424640050" className="resource-card"><span className="resource-number">044-24640050</span><span className="resource-label">Snehi (Chennai)</span><span className="resource-meta">24/7</span></a>
          <a href="tel:9820466726" className="resource-card"><span className="resource-number">9820466726</span><span className="resource-label">AASRA (Mumbai)</span><span className="resource-meta">24/7</span></a>
          <a href="tel:08046110007" className="resource-card"><span className="resource-number">1800-599-0019</span><span className="resource-label">{hi ? 'किरण मानसिक स्वास्थ्य हेल्पलाइन' : 'Kiran Mental Health Helpline'}</span><span className="resource-meta">24/7 | {hi ? 'टोल-फ्री | सरकारी' : 'Toll-free | Government'}</span></a>
        </div>
      </section>


      {/* 5. DIGITAL RIGHTS */}
      <section id="digital" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '5. डिजिटल अधिकार और सुरक्षा' : '5. Digital Rights & Safety'}</h2>
        <div className="space-y-3">
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">Internet Freedom Foundation (IFF)</h3>
            <p className="text-sm">{hi ? 'इंटरनेट शटडाउन ट्रैकर, RTI अधिवक्ता, डिजिटल अधिकार मुकदमे, नीति विश्लेषण।' : 'Internet shutdown tracker, RTI advocacy, digital rights litigation, policy analysis.'}</p>
            <p className="text-sm mt-1"><a href="https://internetfreedom.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">internetfreedom.in ↗</a></p>
            <p className="text-xs text-[var(--color-text-muted)]">{hi ? '✅ सत्यापित: SaveTheInternet.in आंदोलन से जन्मा, Guidestar रेटेड' : '✅ Verified: Born from SaveTheInternet.in, Guidestar rated'}</p>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">Software Freedom Law Centre (SFLC.in)</h3>
            <p className="text-sm">{hi ? 'डिजिटल स्वतंत्रता, गोपनीयता, निगरानी सुधार पर कानूनी कार्य।' : 'Legal work on digital freedom, privacy, surveillance reform.'}</p>
            <p className="text-sm mt-1"><a href="https://sflc.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">sflc.in ↗</a></p>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-2">{hi ? 'इंटरनेट शटडाउन में क्या करें' : 'What to Do in Internet Shutdown'}</h3>
            <ul className="text-sm space-y-1">
              <li>→ <strong>VPN:</strong> ProtonVPN ({hi ? 'मुफ्त' : 'free'}), Psiphon, Mullvad</li>
              <li>→ <strong>Mesh:</strong> Briar App ({hi ? 'Bluetooth/WiFi Direct से बिना इंटरनेट मैसेजिंग' : 'Messaging via Bluetooth/WiFi Direct without internet'})</li>
              <li>→ <strong>Sahayata:</strong> {hi ? 'ऑफलाइन काम करता है — गाइड, टेम्पलेट कैश्ड' : 'Works offline — guides, templates cached'}</li>
              <li>→ <strong>SMS:</strong> {hi ? 'पूर्व-निर्धारित कोडवर्ड + भरोसेमंद नंबर' : 'Pre-set codewords + trusted numbers'}</li>
            </ul>
          </div>
        </div>
      </section>


      {/* 6. HUMAN RIGHTS BODIES */}
      <section id="human-rights" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '6. मानवाधिकार संस्थाएँ' : '6. Human Rights Bodies'}</h2>
        <div className="space-y-3">
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">NHRC ({hi ? 'राष्ट्रीय मानवाधिकार आयोग' : 'National Human Rights Commission'})</h3>
            <p className="text-sm">{hi ? 'पुलिस अत्याचार, हिरासत में मृत्यु, बल प्रयोग की शिकायत दर्ज करें।' : 'File complaints about police brutality, custodial death, use of force.'}</p>
            <p className="text-sm mt-1"><strong>{hi ? 'ऑनलाइन शिकायत' : 'Online complaint'}:</strong> <a href="https://nhrc.nic.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">nhrc.nic.in ↗</a></p>
            <p className="text-sm"><strong>{hi ? 'फोन' : 'Phone'}:</strong> <a href="tel:01124663333" className="text-[var(--color-primary)]">011-24663333</a></p>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">{hi ? 'राज्य मानवाधिकार आयोग (SHRC)' : 'State Human Rights Commissions (SHRC)'}</h3>
            <p className="text-sm">{hi ? 'राज्य-स्तरीय शिकायतें SHRC में दर्ज करें। हर राज्य का अपना आयोग है।' : 'File state-level complaints with SHRC. Every state has its own commission.'}</p>
            <p className="text-sm mt-1">{hi ? '"[राज्य] Human Rights Commission" Google करें अपने राज्य का पोर्टल खोजने के लिए।' : 'Google "[state] Human Rights Commission" to find your state portal.'}</p>
          </div>
          <div className="p-4 bg-[var(--color-surface-alt)] rounded">
            <h3 className="font-bold mb-1">Commonwealth Human Rights Initiative (CHRI)</h3>
            <p className="text-sm">{hi ? 'पुलिस सुधार, सूचना का अधिकार, जेल सुधार पर कार्य।' : 'Works on police reform, right to information, prison reform.'}</p>
            <p className="text-sm mt-1"><a href="https://humanrightsinitiative.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">humanrightsinitiative.org ↗</a></p>
          </div>
        </div>
      </section>

      {/* 7. GOVERNMENT COMPLAINT PORTALS */}
      <section id="govt" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '7. सरकारी शिकायत पोर्टल' : '7. Government Complaint Portals'}</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <a href="https://rtionline.gov.in" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block hover:border-[var(--color-primary)] border border-transparent"><strong>RTI Online</strong><br/>{hi ? '₹10, 30 दिन जवाब अनिवार्य' : '₹10, 30-day response mandatory'}<br/>rtionline.gov.in</a>
          <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block hover:border-[var(--color-primary)] border border-transparent"><strong>CPGRAMS</strong><br/>{hi ? 'सरकारी विभाग शिकायत' : 'Government department complaints'}<br/>pgportal.gov.in</a>
          <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block hover:border-[var(--color-primary)] border border-transparent"><strong>{hi ? 'साइबर अपराध' : 'Cyber Crime'}</strong><br/>{hi ? 'ऑनलाइन FIR, हैकिंग, फ्रॉड' : 'Online FIR, hacking, fraud'}<br/>cybercrime.gov.in</a>
          <a href="https://cvc.gov.in" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block hover:border-[var(--color-primary)] border border-transparent"><strong>CVC</strong><br/>{hi ? 'भ्रष्टाचार शिकायत (केंद्रीय)' : 'Corruption complaints (central)'}<br/>cvc.gov.in</a>
          <a href="https://lokpal.gov.in" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block hover:border-[var(--color-primary)] border border-transparent"><strong>{hi ? 'लोकपाल' : 'Lokpal'}</strong><br/>{hi ? 'उच्च-स्तरीय भ्रष्टाचार' : 'High-level corruption'}<br/>lokpal.gov.in</a>
          <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block hover:border-[var(--color-primary)] border border-transparent"><strong>{hi ? 'उपभोक्ता' : 'Consumer'}</strong><br/>1800-11-4000<br/>consumerhelpline.gov.in</a>
          <a href="https://nhrc.nic.in" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block hover:border-[var(--color-primary)] border border-transparent"><strong>NHRC</strong><br/>{hi ? 'मानवाधिकार उल्लंघन' : 'Human rights violations'}<br/>nhrc.nic.in</a>
          <a href="https://ecourts.gov.in" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-surface-alt)] rounded block hover:border-[var(--color-primary)] border border-transparent"><strong>e-Courts</strong><br/>{hi ? 'केस स्टेटस ट्रैक करें' : 'Track case status'}<br/>ecourts.gov.in</a>
        </div>
      </section>


      {/* 8. CIVIC ORGANIZATIONS */}
      <section id="orgs" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '8. नागरिक संगठन (सिद्ध कार्य)' : '8. Civic Organizations (Demonstrated Work)'}</h2>
        <p className="text-sm mb-4">{hi ? 'ये संगठन वर्षों/दशकों से वास्तविक कार्य कर रहे हैं। आधिकारिक वेबसाइट से सत्यापित।' : 'These organizations have done real work for years/decades. Verified from official websites.'}</p>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Praja Foundation</strong> — <a href="https://praja.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">praja.org ↗</a><br/>{hi ? 'शासन डेटा, नगर पार्षद स्कोरकार्ड, नागरिक भागीदारी (मुंबई/दिल्ली)' : 'Governance data, councillor scorecards, citizen participation (Mumbai/Delhi)'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Association for Democratic Reforms (ADR)</strong> — <a href="https://adrindia.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">adrindia.org ↗</a><br/>{hi ? 'चुनाव डेटा, उम्मीदवार अपराध/संपत्ति विश्लेषण, राजनीतिक जवाबदेही' : 'Election data, candidate criminal/asset analysis, political accountability'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Right to Food Campaign</strong><br/>{hi ? 'समन्वयक: कविता श्रीवास्तव (PUCL अध्यक्ष)। NREGA, मध्याह्न भोजन, PDS अधिकार।' : 'Convenor: Kavita Srivastava (PUCL President). NREGA, mid-day meal, PDS rights.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Jan Sarokar</strong> — {hi ? 'RTI सहायता, शासन पारदर्शिता, सूचना अधिकार प्रशिक्षण' : 'RTI assistance, governance transparency, right to information training'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Transparency International India</strong> — <a href="https://transparencyindia.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">transparencyindia.org ↗</a><br/>{hi ? 'भ्रष्टाचार विरोधी अधिवक्ता, नागरिक भागीदारी, शिकायत सहायता' : 'Anti-corruption advocacy, citizen participation, complaint assistance'}</div>
        </div>
      </section>

      {/* 9. STUDENT ORGANIZATIONS */}
      <section id="student" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '9. छात्र संगठन' : '9. Student Organizations'}</h2>
        <p className="text-sm mb-4">{hi ? 'राष्ट्रीय छात्र संगठन जो शिक्षा अधिकार, परीक्षा सुधार, और छात्र कल्याण पर काम करते हैं।' : 'National student organizations working on education rights, exam reform, and student welfare.'}</p>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Students Federation of India (SFI)</strong> — <a href="https://sficec.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">sficec.in ↗</a><br/>{hi ? 'भारत का सबसे बड़ा वाम छात्र संगठन। CPI(M) से संबद्ध। शिक्षा, रोज़गार, छात्र अधिकार।' : "India's largest left student org. CPI(M) affiliated. Education, employment, student rights."}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>All India Students Association (AISA)</strong><br/>{hi ? 'अध्यक्ष: नेहा | महासचिव: प्रसेनजीत कुमार। CPI(ML) से संबद्ध। JNU, DU, BHU में सक्रिय।' : 'President: Neha | Gen Sec: Prasenjeet Kumar. CPI(ML) affiliated. Active in JNU, DU, BHU.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>All India Students Federation (AISF)</strong><br/>{hi ? 'स्थापित 1936 — भारत का सबसे पुराना छात्र संगठन। CPI से संबद्ध।' : "Founded 1936 — India's oldest student organization. CPI affiliated."}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>National Students Union of India (NSUI)</strong><br/>{hi ? 'Congress छात्र विंग। स्थापित 1971। 27 वर्ष से कम छात्रों के लिए।' : 'Congress student wing. Founded 1971. For students under 27.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>ASAP (Association of Students for Alternative Politics)</strong><br/>{hi ? 'AAP छात्र विंग। 2025 में पुनर्गठित। DU, PU, गुजरात में सक्रिय।' : 'AAP student wing. Relaunched 2025. Active in DU, PU, Gujarat.'}</div>
        </div>
        <p className="text-xs mt-3 text-[var(--color-text-muted)]">{hi ? 'नोट: जुलाई 2026 में SFI, AISA, AISF, NSUI ने संयुक्त रूप से शिक्षा मंत्री इस्तीफे की माँग की।' : 'Note: In July 2026, SFI, AISA, AISF, NSUI jointly demanded Education Minister resignation.'}</p>
      </section>


      {/* 10. WOMEN SAFETY */}
      <section id="women" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '10. महिला सुरक्षा' : '10. Women Safety'}</h2>
        <div className="space-y-3">
          <a href="tel:181" className="resource-card"><span className="resource-number">181</span><span className="resource-label">{hi ? 'महिला हेल्पलाइन — घरेलू हिंसा, उत्पीड़न, तस्करी' : 'Women Helpline — Domestic violence, harassment, trafficking'}</span><span className="resource-meta">24/7 | {hi ? 'गोपनीय' : 'Confidential'}</span></a>
          <a href="tel:7827170170" className="resource-card"><span className="resource-number">7827-170-170</span><span className="resource-label">NCW ({hi ? 'राष्ट्रीय महिला आयोग' : 'National Commission for Women'})</span><span className="resource-meta">ncw.nic.in</span></a>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded text-sm">
            <strong>{hi ? 'सुरक्षा आदेश (Protection Order)' : 'Protection Order'}</strong>
            <p>{hi ? 'घरेलू हिंसा अधिनियम 2005 के तहत मजिस्ट्रेट से सुरक्षा आदेश पाएँ।' : 'Get protection order from Magistrate under Domestic Violence Act 2005.'}</p>
            <p>{hi ? 'कैसे: DLSA कार्यालय जाएँ → मुफ्त वकील → मजिस्ट्रेट में आवेदन → आदेश।' : 'How: Visit DLSA office → free lawyer → application to Magistrate → order.'}</p>
          </div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded text-sm">
            <strong>{hi ? 'महिला गिरफ्तारी नियम' : 'Women Arrest Rules'}</strong>
            <p>{hi ? 'सूर्यास्त के बाद, सूर्योदय से पहले गिरफ्तार नहीं किया जा सकता (विशेष परिस्थितियों को छोड़कर)। तलाशी केवल महिला अधिकारी द्वारा।' : 'Cannot be arrested after sunset, before sunrise (except exceptional circumstances). Search only by female officer.'}</p>
          </div>
        </div>
      </section>

      {/* 11. MEDIA */}
      <section id="media" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '11. मीडिया और प्रेस' : '11. Media & Press'}</h2>
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Press Council of India</strong> — presscouncil.nic.in — {hi ? 'प्रेस स्वतंत्रता शिकायत' : 'Press freedom complaints'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Editors Guild of India</strong> — editorsguild.in — {hi ? 'पत्रकार सुरक्षा, प्रेस स्वतंत्रता' : 'Journalist protection, press freedom'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>CPJ (Committee to Protect Journalists)</strong> — cpj.org — {hi ? 'खतरे में पत्रकारों के लिए अंतरराष्ट्रीय सहायता' : 'International support for journalists under threat'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>PIB (Press Information Bureau)</strong> — <a href="https://pib.gov.in" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)]">pib.gov.in ↗</a> — {hi ? 'सरकारी प्रेस रिलीज (तथ्य-जाँच के लिए)' : 'Government press releases (for fact-checking)'}</div>
        </div>
      </section>

      {/* 12. TOOLS */}
      <section id="tools" className="brutal-card mb-8">
        <h2 className="heading-2 mb-4">{hi ? '12. उपयोगी ऐप्स और उपकरण' : '12. Useful Apps & Tools'}</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Signal</strong> — signal.org<br/>{hi ? 'एन्क्रिप्टेड मैसेजिंग। सबसे सुरक्षित।' : 'Encrypted messaging. Most secure.'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Briar</strong> — briarproject.org<br/>{hi ? 'इंटरनेट बिना मैसेजिंग (Bluetooth/WiFi)' : 'Messaging without internet (Bluetooth/WiFi)'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>ProtonVPN</strong> — protonvpn.com<br/>{hi ? 'मुफ्त VPN (इंटरनेट शटडाउन में)' : 'Free VPN (during internet shutdowns)'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>Psiphon</strong> — psiphon.ca<br/>{hi ? 'सेंसरशिप बायपास, मुफ्त' : 'Censorship bypass, free'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>112 India App</strong><br/>{hi ? 'SOS बटन, लोकेशन शेयर' : 'SOS button, location share'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>DigiLocker</strong> — digilocker.gov.in<br/>{hi ? 'सरकारी दस्तावेज़ सुरक्षित' : 'Government documents stored safely'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>ProtonDrive</strong> — proton.me/drive<br/>{hi ? 'एन्क्रिप्टेड क्लाउड स्टोरेज (सबूत के लिए)' : 'Encrypted cloud storage (for evidence)'}</div>
          <div className="p-3 bg-[var(--color-surface-alt)] rounded"><strong>e-Courts</strong> — ecourts.gov.in<br/>{hi ? 'केस स्टेटस, कोर्ट ऑर्डर' : 'Case status, court orders'}</div>
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
