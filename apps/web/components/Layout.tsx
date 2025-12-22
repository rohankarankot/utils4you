import React from "react";
import Link from "next/link";
import Adsense from "./Adsense";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <div className="fixed inset-0 hero-gradient -z-10" />
      <header className="glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                aria-label="Home"
                className="text-2xl font-black text-gradient tracking-tight"
              >
                TOOLS
              </Link>
              <Link href="/tools" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                All Tools
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="hidden sm:block text-sm font-medium hover:text-[var(--primary)] transition-colors"
              >
                Privacy
              </Link>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <div className="flex-1 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <main className="flex-1">{children}</main>
          <aside className="hidden lg:block w-72">
            <div className="sticky top-28 space-y-6">
              <div className="card bg-slate-50/50 dark:bg-slate-900/20 border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Navigation</p>
                <nav className="flex flex-col gap-3">
                  <Link href="/tools/emi-calculator" className="text-sm font-medium hover:text-blue-500 transition-colors">EMI Calculator India</Link>
                  <Link href="/tools/gst-calculator" className="text-sm font-medium hover:text-blue-500 transition-colors">Online GST Calculator</Link>
                  <Link href="/tools/sip-calculator" className="text-sm font-medium hover:text-blue-500 transition-colors">Mutual Fund SIP Tool</Link>
                  <Link href="/tools/word-counter" className="text-sm font-medium hover:text-blue-500 transition-colors">Free Word Counter</Link>
                  <Link href="/tools/age-calculator" className="text-sm font-medium hover:text-blue-500 transition-colors">Age & Longevity Tool</Link>
                </nav>
              </div>

              <div className="card bg-indigo-50/30 border-indigo-100/50 dark:bg-indigo-950/10 dark:border-indigo-900/20">
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Featured</p>
                <Adsense className="mb-2" slot="9725471808" />
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Fast, accessible, and India-focused utilities.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer className="mt-auto py-12 border-t border-[var(--surface-border)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Tools. Made for efficiency.
          </p>
        </div>
      </footer>

      {/* Sticky mobile bottom ad */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40">
        <div className="max-w-6xl mx-auto p-2">
          <Adsense  slot="4473145127" responsive="true" />
        </div>
      </div>
    </div>
  );
}
