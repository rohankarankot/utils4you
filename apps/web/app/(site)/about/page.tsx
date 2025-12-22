import React from "react";
import { Metadata } from "next";
import { Shield, Zap, Heart, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us – Our Mission & Values | OmniTools",
  description: "Learn about OmniTools, our commitment to privacy, speed, and providing high-quality free online utility tools for Indian users.",
};

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="text-blue-600" size={32} />,
      title: "Privacy First",
      desc: "Your data never leaves your browser. All calculations and text processing happen locally on your device.",
    },
    {
      icon: <Zap className="text-yellow-500" size={32} />,
      title: "Blazing Fast",
      desc: "Optimized for performance. Our tools load instantly and provide real-time results as you type.",
    },
    {
      icon: <Heart className="text-red-500" size={32} />,
      title: "Simple & Free",
      desc: "No hidden costs, no subscriptions. Just clean, useful tools designed for everyday productivity.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-black tracking-tight mb-6 text-slate-900 dark:text-white leading-tight">
          Empowering Your Daily <br /> <span className="text-gradient">Productivity</span>
        </h1>
        <p className="text-xl text-[var(--muted)] leading-relaxed max-w-2xl mx-auto">
          At OmniTools, we believe that high-quality utility tools should be accessible to everyone, 
          everywhere—without compromising on privacy or speed.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {values.map((v, i) => (
          <div key={i} className="card p-8 flex flex-col gap-4 hover:shadow-lg transition-all border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner">
              {v.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{v.title}</h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="prose dark:prose-invert max-w-none mb-20 space-y-8">
        <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/20 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-blue-100 mt-0">Our Story</h2>
          <p className="text-lg leading-relaxed">
            OmniTools started as a response to the cluttered and often intrusive landscape of online utility tools. 
            We noticed that many existing calculators and text processors were slow, loaded with intrusive ads, and, 
            most importantly, often lacked transparent privacy practices.
          </p>
          <p className="text-lg leading-relaxed">
            We set out to build a platform that focused on three pillars: <strong>India-centric features</strong>, 
            <strong>Browser-based processing</strong>, and <strong>Minimalist design</strong>. Today, we serve thousands 
            of Indian users every day—from small business owners calculating GST to students counting words for their next big assignment.
          </p>
        </div>

        <div className="p-4 md:p-8">
          <h2 className="text-3xl font-bold mb-8">Why Use OmniTools?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-lg mb-1">Security by Design</h4>
                <p className="text-[var(--muted)]">Unlike other platforms that send your inputs to a server, we use modern Javascript APIs to process everything locally. Your sensitive financial and personal data stays with you.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-lg mb-1">Tailored for India</h4>
                <p className="text-[var(--muted)]">Our calculators are specifically tuned for Indian financial standards, including GST slabs, ROI-based EMI calculations, and traditional Age counting methods.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-lg mb-1">Zero Cost forever</h4>
                <p className="text-[var(--muted)]">We fund our platform through non-intrusive sponsorships and ads, ensuring that the heavy-lifting tools you need every day remain 100% free for everyone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center bg-slate-900 dark:bg-blue-600 rounded-3xl p-12 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Start Being More Productive</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">Join thousands of users who trust OmniTools for their daily utility needs.</p>
          <a href="/tools" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-slate-900 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 shadow-lg">
            Explore All Tools
          </a>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
      </footer>
    </main>
  );
}
