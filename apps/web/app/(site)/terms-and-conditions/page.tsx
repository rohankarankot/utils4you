import React from "react";
import { Metadata } from "next";
import { Scale, AlertTriangle, FileText, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions – Usage Guidelines | OmniTools",
  description: "Read the Terms and Conditions of OmniTools. Understand your rights, our liability disclaimers, and the guidelines for using our free online utility tools.",
};

export default function TermsPage() {
  const highlightSections = [
    {
      icon: <AlertTriangle className="text-amber-500" size={24} />,
      title: "Accuracy Disclaimer",
      content: "Calculations provided by our tools are estimates. We do not guarantee 100% accuracy and recommend consulting professional advisors for financial or legal decisions.",
    },
    {
      icon: <Scale className="text-blue-600" size={24} />,
      title: "Limitation of Liability",
      content: "OmniTools and its owners shall not be held liable for any direct or indirect damages arising from the use or inability to use our platform or its tools.",
    },
    {
      icon: <Globe className="text-green-600" size={24} />,
      title: "Governing Law",
      content: "These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto py-8">
      <header className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
          Terms and Conditions
        </h1>
        <p className="text-lg text-[var(--muted)]">
          Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {highlightSections.map((s, i) => (
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
            <FileText className="text-blue-600" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using [https://mydailytools-pi.vercel.app/](https://mydailytools-pi.vercel.app/), 
            you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, 
            you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Use License</h2>
          <p>
            Permission is granted to temporarily use the tools on OmniTools for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, 
            and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display;</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
            <li>Remove any copyright or other proprietary notations from the materials.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. Disclaimer for Financial Tools</h2>
          <p>
            The financial calculators (including EMI, GST, and SIP calculators) provided on this website 
            are for informational purposes only. The results are generated based on the inputs provided 
            and standard mathematical formulas. They do not constitute financial advice, and actual 
            figures from banks or financial institutions may vary due to specific terms, taxes, or 
            rounding methods. Always verify results with a qualified professional before making financial commitments.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Intellectual Property</h2>
          <p>
            The content, structure, design, and code of OmniTools are the intellectual property of its owners. 
            Unauthorized reproduction or distribution of any part of this website is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. Changes to Terms</h2>
          <p>
            OmniTools reserves the right to revise these terms of service for its website at any time without notice. 
            By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl mt-12">
          <p className="text-sm text-[var(--muted)] mb-0 italic">
            Your use of OmniTools constitutes your understanding that you use these tools at your own risk. 
            We strive for excellence but provide no absolute guarantee of functionality or accuracy.
          </p>
        </section>
      </article>
    </main>
  );
}
