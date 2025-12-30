import Link from "next/link";
import { toolsSlugs } from "./tools/slugRoutes";
import { Metadata } from "next";

import { generateSiteMetadata } from "../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata("/");
}

export default function Home() {
  return (
    <main>
      <section className="mb-12 py-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Free Online Tools for <span className="text-gradient">Modern Productivity</span>
          </h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            Fast, secure, and focused on Indian users. Tools for text processing
            and financial calculations at your fingertips.
          </p>
        </div>
      </section>

      <section className="mt-20 prose dark:prose-invert max-w-none border-t border-slate-100 dark:border-slate-800 pt-12">
        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Why Professionals Choose Utils4You</h2>
        <p className="text-lg leading-relaxed text-[var(--muted)]">
          Utils4You is designed for those who value speed and privacy. Our platform provides a curated collection
          of essential utilities that run entirely in your browser. This means your data never touches our
          servers, giving you 100% security for your financial and text-based tasks. Whether you are
          calculating complex loan EMIs or optimizing text for SEO, Utils4You is your reliable daily partner.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div className="card group">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold mb-3">Text Processing</h2>
          <p className="text-[var(--muted)] leading-relaxed mb-6">
            Everything you need for text: Word counter, slug generator,
            case converters, and character manipulation.
          </p>
          <div className="mt-auto">
            <Link
              href="/tools#text-tools"
              className="btn btn-primary w-full sm:w-auto"
            >
              Explore Text Tools
            </Link>
          </div>
        </div>

        <div className="card group">
          <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold mb-3">Financial Calculators for India (EMI, GST, SIP) within Online Productivity Tools</h2>
          <p className="text-[var(--muted)] leading-relaxed mb-6">
            Smart financial tools: EMI, SIP, and GST calculators
            specifically tuned for the Indian economy.
          </p>
          <div className="mt-auto">
            <Link
              href="/tools#financial-calculators"
              className="btn btn-primary w-full sm:w-auto"
            >
              Open Calculators
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-16 flex flex-col items-center">
        <Link
          href="/tools"
          className="group relative inline-flex items-center gap-3 text-lg font-semibold hover:text-[var(--primary)] transition-colors"
        >
          View All {Object.keys(toolsSlugs || {}).length || 'available'} Tools
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <section className="hidden">
        <div>
          <div className="mt-4">
          </div>
        </div>
      </section>
    </main>
  );
}
