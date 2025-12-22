import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { toolsSlugs } from "./slugRoutes";

export const metadata: Metadata = {
  title: "All Productivity & Financial Tools – MyDailyTools Utility Hub",
  description: "Browse our complete directory of free online utility tools. From GST and EMI calculators to word counters and slug generators, find everything you need for daily productivity.",
  keywords: ["online utility tools", "financial calculators", "text processing tools", "free online calculators", "productivity tools hub"],
};

export default function ToolsIndex() {
  const financialTools = ["emi-calculator", "gst-calculator", "sip-calculator"];
  const textTools = ["word-counter", "case-converter", "character-counter", "slug-generator"];
  const otherTools = toolsSlugs.filter(s => !financialTools.includes(s) && !textTools.includes(s));

  return (
    <main>
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
          All Productivity Tools & Calculators
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-3xl leading-relaxed">
          The central hub for all MyDailyTools utilities. Our collection is built for speed, privacy, 
          and precise calculations. Select a category below to explore our optimized tools.
        </p>
      </header>

      <div className="space-y-16">
        {/* Financial Tools Section */}
        <section>
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Financial & India Calculators</h2>
            <p className="text-[var(--muted)]">Smart calculators for loans, taxes, and investments in India.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {financialTools.map((s) => (
              <ToolCard key={s} slug={s} />
            ))}
          </div>
        </section>

        {/* Text Utilities Section */}
        <section>
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Text & Content Utilities</h2>
            <p className="text-[var(--muted)]">Fast tools for word counting, formatting, and SEO optimization.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {textTools.map((s) => (
              <ToolCard key={s} slug={s} />
            ))}
          </div>
        </section>

        {/* Other Tools Section */}
        {otherTools.length > 0 && (
          <section>
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">More Tools</h2>
              <p className="text-[var(--muted)]">Other specialized utilities for your daily needs.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherTools.map((s) => (
                <ToolCard key={s} slug={s} />
              ))}
            </div>
          </section>
        )}
      </div>

      <section className="mt-20 prose dark:prose-invert max-w-none border-t border-slate-100 dark:border-slate-800 pt-12">
        <h2 className="text-2xl font-bold mb-4">Why MyDailyTools is Your Daily Productivity Partner</h2>
        <p>
          In a world where digital privacy is often compromised, MyDailyTools offers a secure alternative. 
          All our tools are optimized for performance, ensuring they load instantly even on slow connections. 
          Whether you are an Indian professional calculating GST or a student counting words for an essay, 
          our tools provide browser-based processing, meaning your data never leaves your computer.
        </p>
      </section>
    </main>
  );
}

function ToolCard({ slug }: { slug: string }) {
  return (
    <Link href={`/tools/${slug}`} className="group">
      <div className="card h-full flex flex-col hover:border-blue-500 hover:shadow-md transition-all duration-300">
        <h3 className="font-bold text-xl mb-3 capitalize text-slate-900 dark:text-white">
          {slug.replace(/-/g, " ")}
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
          Advanced {slug.replace(/-/g, " ")} designed for high performance and accuracy. 
          100% free and private.
        </p>
        <div className="mt-auto pt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
          Open Tool
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
