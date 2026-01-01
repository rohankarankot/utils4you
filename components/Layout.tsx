import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Github, Globe, Twitter, Star } from "lucide-react";
import Adsense from "./Adsense";
import ToolsDropdown from "./ToolsDropdown";
import ThemeToggle from "./ThemeToggle";
import { sanityClient, urlFor } from "../lib/sanityClient";

async function getQuickNav() {
  const query = `*[_type == "tool"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    category
  }`;
  return await sanityClient.fetch(query);
}

async function getDeveloperProfile() {
  const query = `*[_type == "developer"][0]`;
  return await sanityClient.fetch(query);
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const quickLinks = await getQuickNav();
  const developer = await getDeveloperProfile();

  const getSocialIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case "github": return <Github size={20} />;
      case "linkedin": return <Linkedin size={20} />;
      case "instagram": return <Instagram size={20} />;
      case "twitter": return <Twitter size={20} />;
      default: return <Globe size={20} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <div className="fixed inset-0 hero-gradient -z-10" />
      <header className="glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                aria-label="Utils4You Home"
                className="flex items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-[var(--surface-border)] shadow-sm group-hover:shadow-md transition-all">
                  <Image src="/logo.png" alt="Utils4You" className="w-full h-full object-cover" width={40} height={40} />
                </div>
                <span className="hidden sm:block text-2xl font-black text-gradient tracking-tight">Utils4You</span>
              </Link>
              <ToolsDropdown tools={quickLinks} />
              <Link href="/blog" className="hidden sm:block text-sm font-medium hover:text-[var(--primary)] transition-colors">
                Blog
              </Link>
              <Link href="/about" className="hidden sm:block text-sm font-medium hover:text-[var(--primary)] transition-colors">
                About
              </Link>

            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/developer"
                className="hidden sm:block text-sm font-medium hover:text-[var(--primary)] transition-colors"
              >
                Dev
              </Link>
              <Link
                href="/privacy-policy"
                className="hidden sm:block text-sm font-medium hover:text-[var(--primary)] transition-colors"
              >
                Privacy
              </Link>
              <a
                href="https://github.com/rohankarankot/utils4you"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:scale-105 transition-all shadow-sm group"
                aria-label="Star Utils4You on GitHub"
              >
                <Github size={16} />
                <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wider">Star</span>
                <Star size={14} className="fill-yellow-400 text-yellow-400 group-hover:rotate-12 transition-transform" />
              </a>
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
                  Fast, accessible, and India-focused utilities by Utils4You.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer className="mt-auto py-12 border-t border-[var(--surface-border)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4 flex-wrap">
            <Link href="/" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">Home</Link>
            <Link href="/tools" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">Tools</Link>
            <Link href="/blog" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">Blog</Link>
            <Link href="/about" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">About Us</Link>
            <Link href="/contact-us" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">Contact</Link>
            <Link href="/privacy-policy" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">Privacy</Link>
            <Link href="/terms-and-conditions" className="text-xs font-medium text-[var(--muted)] hover:text-[var(--primary)]">Terms</Link>
          </div>
          <div className="flex flex-col items-center gap-3 mb-8  border-[var(--surface-border)]">
            <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-widest">Developed by</p>
            <Link href="/developer" className="group flex items-center gap-3 bg-[var(--surface)] pl-2 pr-4 py-2 rounded-full border border-[var(--surface-border)] shadow-sm hover:shadow-md hover:border-[var(--primary)] transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 overflow-hidden flex items-center justify-center bg-slate-200 dark:bg-slate-800">
                {developer?.image ? (
                  <Image
                    src={urlFor(developer.image).width(64).height(64).url()}
                    alt={developer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    width={32}
                    height={32}
                  />
                ) : (
                  <span className="text-xs font-bold text-[var(--muted)]">{developer?.name?.charAt(0) || "R"}</span>
                )}
              </div>
              <span className="font-medium text-sm group-hover:text-[var(--primary)] transition-colors">{developer?.name || "Rohan"}</span>
            </Link>
            <div className="flex items-center gap-3 text-[var(--muted)] mt-1">
              {developer?.socialLinks && developer.socialLinks.map((link: any) => (
                <a
                  key={link._key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)] transition-colors"
                  aria-label={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
              {!developer?.socialLinks && (
                <span className="text-xs text-[var(--muted)]">Connect with me</span>
              )}
            </div>
          </div>

          <p className="text-sm text-[var(--muted)] mb-2">
            © {new Date().getFullYear()} Utils4You.
          </p>
          <p className="text-sm font-medium text-[var(--primary)] mb-2 flex items-center justify-center gap-2">
            <span>Proudly made in India</span>
            <span>🇮🇳</span>
          </p>
          <p className="text-xs text-[var(--muted)]">
            Contact: <a href="mailto:rohan.alwayscodes@gmail.com" className="hover:text-[var(--primary)]">rohan.alwayscodes@gmail.com</a>
          </p>
        </div>
      </footer>


    </div>
  );
}
