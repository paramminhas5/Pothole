import { cookies } from 'next/headers';
import Link from 'next/link';
import { Locale } from '@/types';

export default async function ManifestoPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';
  const hi = locale === 'hi';

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <h1 className="heading-display mb-8">
        {hi ? 'हम यह क्यों बना रहे हैं' : 'Why We Build This'}
      </h1>

      <div className="space-y-8 text-base leading-relaxed">
        <section>
          <h2 className="heading-2 mb-3">{hi ? 'समस्या' : 'The Problem'}</h2>
          <p>{hi
            ? '60 करोड़ से ज़्यादा भारतीय 30 साल से कम उम्र के हैं। उनके पास गुस्सा है। उनके पास संख्या है। उनके पास फोन है। लेकिन उनके पास वह ढाँचा नहीं है जो गुस्से को संगठित शक्ति में बदले।'
            : 'Over 600 million Indians are under 30. They have anger. They have numbers. They have phones. But they lack the infrastructure to convert anger into organized power.'}</p>
          <p className="mt-3">{hi
            ? 'परिणाम: विरोध होता है → 3 दिन मीडिया कवरेज → भुला दिया जाता है → कुछ नहीं बदलता → अगली बार फिर गुस्सा।'
            : 'Result: protest happens → 3 days of media coverage → forgotten → nothing changes → next time, anger again.'}</p>
        </section>

        <section>
          <h2 className="heading-2 mb-3">{hi ? 'समाधान' : 'The Solution'}</h2>
          <p>{hi
            ? 'Sahayata वह ढाँचा है। यह गुस्से को संस्थागत दबाव में बदलता है:'
            : 'Sahayata is that infrastructure. It converts anger into institutional pressure:'}</p>
          <div className="mt-4 font-mono text-sm bg-[var(--color-surface-alt)] p-4 rounded">
            <p>{hi ? 'गुस्सा' : 'Anger'}</p>
            <p className="pl-4">→ {hi ? 'अधिकार जानना (गाइड, कार्ड)' : 'Know rights (guides, cards)'}</p>
            <p className="pl-8">→ {hi ? 'दस्तावेज़ + सबूत' : 'Document + evidence'}</p>
            <p className="pl-12">→ RTI (₹10, 30 {hi ? 'दिन' : 'days'})</p>
            <p className="pl-16">→ FIR ({hi ? 'पुलिस मना नहीं कर सकती' : 'police cannot refuse'})</p>
            <p className="pl-20">→ {hi ? 'अपील → CIC (₹250/दिन जुर्माना)' : 'Appeal → CIC (₹250/day penalty)'}</p>
            <p className="pl-24">→ PIL ({hi ? 'हाई कोर्ट / सुप्रीम कोर्ट' : 'High Court / Supreme Court'})</p>
            <p className="pl-28">→ {hi ? 'चुनाव → जनप्रतिनिधि जवाबदेही' : 'Elections → representative accountability'}</p>
            <p className="pl-32 font-bold">→ {hi ? 'बदलाव' : 'CHANGE'}</p>
          </div>
        </section>

        <section>
          <h2 className="heading-2 mb-3">{hi ? 'हम क्या हैं' : 'What We Are'}</h2>
          <ul className="space-y-2">
            <li><strong>{hi ? 'बुनियादी ढाँचा।' : 'Infrastructure.'}</strong> {hi ? 'सड़कों की तरह — कोई भी उपयोग कर सकता है, कोई मालिक नहीं।' : 'Like roads — anyone can use them, nobody owns them.'}</li>
            <li><strong>{hi ? 'ओपन सोर्स।' : 'Open source.'}</strong> {hi ? 'कोड सार्वजनिक है। कोई भी जाँच सकता है, सुधार सकता है, फोर्क कर सकता है।' : 'Code is public. Anyone can inspect, improve, or fork it.'}</li>
            <li><strong>{hi ? 'गैर-पक्षपाती।' : 'Non-partisan.'}</strong> {hi ? 'उपकरण सबके लिए — चाहे कोई भी पार्टी सत्ता में हो।' : 'Tools for everyone — regardless of which party is in power.'}</li>
            <li><strong>{hi ? 'सेंसरशिप-प्रतिरोधी।' : 'Censorship-resistant.'}</strong> {hi ? 'मिरर, IPFS, Tor, ऑफलाइन — एक लिंक बंद करो, दस और खुलेंगे।' : 'Mirrors, IPFS, Tor, offline — shut one link, ten more open.'}</li>
          </ul>
        </section>

        <section>
          <h2 className="heading-2 mb-3">{hi ? 'हम क्या नहीं हैं' : 'What We Are Not'}</h2>
          <ul className="space-y-2">
            <li><strong>{hi ? 'राजनीतिक दल नहीं।' : 'Not a political party.'}</strong> {hi ? 'कोई उम्मीदवार नहीं, कोई चुनाव नहीं लड़ रहे।' : 'No candidates, not contesting elections.'}</li>
            <li><strong>{hi ? 'सोशल नेटवर्क नहीं।' : 'Not a social network.'}</strong> {hi ? 'कोई लाइक, कोई फॉलोअर, कोई एंगेजमेंट मेट्रिक।' : 'No likes, no followers, no engagement metrics.'}</li>
            <li><strong>{hi ? 'स्टार्टअप नहीं।' : 'Not a startup.'}</strong> {hi ? 'कोई VC, कोई विज्ञापन, कोई डेटा बिक्री। ₹16/महीने पर चलता है।' : 'No VC, no ads, no data selling. Runs on ₹16/month.'}</li>
            <li><strong>{hi ? 'हिंसा का उपकरण नहीं।' : 'Not a tool for violence.'}</strong> {hi ? 'कानूनी, संस्थागत, शांतिपूर्ण — लेकिन अपमानजनक रूप से प्रभावी।' : 'Legal, institutional, peaceful — but insultingly effective.'}</li>
          </ul>
        </section>

        <section>
          <h2 className="heading-2 mb-3">{hi ? 'सिद्धांत' : 'Principles'}</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>{hi ? 'सुरक्षा > वृद्धि।' : 'Safety {">"} growth.'}</strong> {hi ? 'एंगेजमेंट के लिए किसी को खतरे में नहीं डालेंगे।' : 'We will never put someone at risk for engagement.'}</li>
            <li><strong>{hi ? 'ऑफलाइन पहले।' : 'Offline first.'}</strong> {hi ? 'इंटरनेट बंद होने पर भी मुख्य गाइड काम करें।' : 'Core guides must work even when internet is shut down.'}</li>
            <li><strong>{hi ? 'न्यूनतम डेटा।' : 'Minimal data.'}</strong> {hi ? 'जो नहीं रखते, वह लीक नहीं हो सकता। कोई फोन नंबर अनिवार्य नहीं।' : 'What we don\'t keep can\'t leak. No phone number required.'}</li>
            <li><strong>{hi ? 'परिणाम, दिखावा नहीं।' : 'Outcomes, not vanity.'}</strong> {hi ? 'RTI दाखिल = सफलता। हस्ताक्षर = कुछ नहीं।' : 'RTI filed = success. Signature = nothing.'}</li>
            <li><strong>{hi ? 'ईमानदारी।' : 'Honesty.'}</strong> {hi ? 'जो काम नहीं करता, वह नहीं दिखाएँगे। जो सत्यापित नहीं, वह नहीं कहेंगे।' : 'We show what doesn\'t work. We don\'t claim what isn\'t verified.'}</li>
            <li><strong>{hi ? 'कॉकरोच की तरह।' : 'Like a cockroach.'}</strong> {hi ? 'कुचलो — वापस आएँगे। ब्लॉक करो — दस मिरर। बंद करो — ऑफलाइन काम करता है।' : 'Crush us — we come back. Block us — ten mirrors. Shut us down — works offline.'}</li>
          </ol>
        </section>

        <section>
          <h2 className="heading-2 mb-3">{hi ? 'शामिल हों' : 'Join Us'}</h2>
          <p className="mb-4">{hi
            ? 'आपको कोडिंग आनी ज़रूरी नहीं। आप कर सकते हैं:'
            : 'You don\'t need to code. You can:'}</p>
          <ul className="space-y-1 text-sm mb-6">
            <li>→ {hi ? 'संसाधन जमा करें (वकील, हेल्पलाइन, संगठन)' : 'Submit resources (lawyers, helplines, organizations)'}</li>
            <li>→ {hi ? 'अनुवाद करें (हिंदी, तमिल, बंगाली, मराठी...)' : 'Translate (Hindi, Tamil, Bengali, Marathi...)'}</li>
            <li>→ {hi ? 'गलतियाँ बताएँ (यह नंबर बंद हो गया, यह जानकारी पुरानी है)' : 'Report errors (this number is disconnected, this info is outdated)'}</li>
            <li>→ {hi ? 'RTI दाखिल करें (प्लेटफॉर्म का उपयोग करें, डेटा बढ़ाएँ)' : 'File RTIs (use the platform, grow the data)'}</li>
            <li>→ {hi ? 'कोड लिखें (ओपन सोर्स, GitHub पर)' : 'Write code (open source, on GitHub)'}</li>
            <li>→ {hi ? 'डिज़ाइन करें (पोस्टर, सोशल मीडिया, प्रिंट)' : 'Design (posters, social media, print)'}</li>
            <li>→ {hi ? 'शेयर करें (WhatsApp, Signal, मुँह-ज़बानी)' : 'Share (WhatsApp, Signal, word of mouth)'}</li>
          </ul>
        </section>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Link href="/submit" className="brutal-btn brutal-btn-primary brutal-btn-lg text-center">{hi ? 'संसाधन जमा करें →' : 'Submit Resource →'}</Link>
        <Link href="/developers" className="brutal-btn brutal-btn-lg text-center">{hi ? 'कोड लिखें →' : 'Write Code →'}</Link>
        <Link href="/contribute" className="brutal-btn brutal-btn-lg text-center">{hi ? 'योगदान बोर्ड →' : 'Contribution Board →'}</Link>
      </div>
    </div>
  );
}
