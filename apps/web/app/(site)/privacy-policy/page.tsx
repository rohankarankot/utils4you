import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Lock, EyeOff, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – Your Data & Local Security | OmniTools",
  description: "Read our commitment to your privacy. Learn how OmniTools processes all calculator and text data locally in your browser for maximum security.",
};

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Lock className="text-blue-600" size={24} />,
      title: "Local-Only Processing",
      content: "Unlike traditional online tools, OmniTools utilizes modern browser-based technology. This means your text, loan details, and personal calculations are processed entirely on your device. We do not store, see, or transmit your calculation data to our servers.",
    },
    {
      icon: <ShieldCheck className="text-green-600" size={24} />,
      title: "Google AdSense & Cookies",
      content: "We use Google AdSense to serve ads. Google uses cookies to serve ads based on a user's prior visits to our website or other websites. You may opt out of personalized advertising by visiting Ads Settings.",
    },
    {
      icon: <EyeOff className="text-purple-600" size={24} />,
      title: "Information We Collect",
      content: "We collect only standard, non-personally identifiable server logs (IP address, browser type) to help us diagnose technical issues. We do not require account creation or personal information to use our tools.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto py-8">
      <header className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-lg text-[var(--muted)]">
          Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {sections.map((s, i) => (
          <div key={i} className="card p-6 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10">
            <div className="mb-4">{s.icon}</div>
            <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">{s.title}</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{s.content}</p>
          </div>
        ))}
      </section>

      <article className="prose dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Cookie className="text-blue-600" />
            Specific Disclosures for Google AdSense
          </h2>
          <p>
            This website uses Google AdSense, a service provided by Google Inc. 
            Google uses certain technologies (such as cookies or web beacons) when it serves ads on our site. 
            The information collected through these technologies is used to:
          </p>
          <ul>
            <li>Measure the effectiveness of advertising campaigns.</li>
            <li>Personalize the advertising content that you see.</li>
            <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Log Files</h2>
          <p>
            Like many other Web sites, OmniTools makes use of log files. 
            The information inside the log files includes internet protocol (IP) addresses, type of browser, 
            Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to 
            analyze trends, administer the site, track user’s movement around the site, and gather demographic information. 
            IP addresses and other such information are not linked to any information that is personally identifiable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Our Commitment to Security</h2>
          <p>
            We have put in place appropriate physical, electronic, and managerial procedures to safeguard 
            and help prevent unauthorized access, maintain data security, and correctly use the information 
            we collect online. However, please remember that no method of transmission over the Internet, 
            or method of electronic storage, is 100% secure.
          </p>
        </section>

        <section className="bg-slate-900 text-white p-8 rounded-3xl mt-12">
          <h2 className="text-2xl font-bold text-white mt-0">Contact Us</h2>
          <p className="text-slate-300">
            If you have any questions about this Privacy Policy, the practices of this site, or your 
            dealings with this web site, please contact us through our primary channels.
          </p>
        </section>
      </article>
    </main>
  );
}
