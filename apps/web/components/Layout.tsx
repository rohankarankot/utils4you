import React from "react";
import Link from "next/link";
import Adsense from "./Adsense";
import ThemeToggle from "./ThemeToggle";
import { sanityClient } from "../lib/sanityClient";

async function getQuickNav() {
  const query = `*[_type == "tool"] | order(_createdAt desc)[0...5] {
    title,
    "slug": slug.current
  }`;
  return await sanityClient.fetch(query);
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const quickLinks = await getQuickNav();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <div className="fixed inset-0 hero-gradient -z-10" />
      <header className="glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                aria-label="OmniTools Home"
                className="text-2xl font-black text-gradient tracking-tight"
              >
                OmniTools
              </Link>
              <Link href="/tools" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                All Tools
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                About
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
                  {quickLinks.map((link: any) => (
                    <Link 
                      key={link.slug} 
                      href={`/tools/${link.slug}`} 
                      className="text-sm font-medium hover:text-blue-500 transition-colors line-clamp-1"
                    >
                      {link.title}
                    </Link>
                  ))}
                  {quickLinks.length === 0 && (
                    <>
                      <Link href="/tools/emi-calculator" className="text-sm font-medium hover:text-blue-500 transition-colors">EMI Calculator India</Link>
                      <Link href="/tools/gst-calculator" className="text-sm font-medium hover:text-blue-500 transition-colors">Online GST Calculator</Link>
                    </>
                  )}
                </nav>
              </div>

              <div className="card bg-indigo-50/30 border-indigo-100/50 dark:bg-indigo-950/10 dark:border-indigo-900/20">
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Featured</p>
                <Adsense className="mb-2" slot="9725471808" />
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Fast, accessible, and India-focused utilities by OmniTools.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer className="mt-auto py-12 border-t border-[var(--surface-border)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">Home</Link>
            <Link href="/tools" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">Tools</Link>
            <Link href="/about" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">About Us</Link>
            <Link href="/privacy-policy" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">Privacy</Link>
            <Link href="/terms-and-conditions" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">Terms</Link>
          </div>
          <p className="text-sm text-[var(--muted)] mb-2">
            © {new Date().getFullYear()} OmniTools.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Contact: <a href="mailto:support@mydailytools.com" className="hover:text-[var(--primary)]">support@mydailytools.com</a>
          </p>
        </div>
      </footer>

     
    </div>
  );
}
