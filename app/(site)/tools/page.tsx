import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { sanityClient } from "../../../lib/sanityClient";

import { generateSiteMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata("/tools");
}

const CATEGORY_LABELS: Record<string, string> = {
  "text-tools": "Text Processing Tools",
  "financial-calculators": "Financial Calculators",
  "health-calculators": "Health & Fitness Calculators",
  "developer-tools": "Developer Utilities",
  "image-tools": "Image Processing Tools",
};

async function getAllTools() {
  const query = `*[_type == "tool"] | order(title asc) {
    title,
    "slug": slug.current,
    category,
    shortDescription
  }`;
  return await sanityClient.fetch(query);
}

export default async function ToolsIndex() {
  const tools = await getAllTools();
  const groupedTools = tools.reduce((acc: any, tool: any) => {
    const category = tool.category || "General Utilities";
    if (!acc[category]) acc[category] = [];
    acc[category].push(tool);
    return acc;
  }, {});

  const categories = Object.keys(groupedTools).sort();

  return (
    <main>
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
          All Productivity Tools & Calculators
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-3xl leading-relaxed">
          The central hub for all Utils4You utilities. Our collection is built for speed, privacy,
          and precise calculations. Select a category below to explore our optimized tools.
        </p>
      </header>

      <div className="space-y-16">
        {categories.map((cat) => (
          <section key={cat}>
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
                {CATEGORY_LABELS[cat] || cat.replace(/-/g, ' ')}
              </h2>
              <p className="text-[var(--muted)]">Highly optimized digital tools for {cat.toLowerCase()}.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedTools[cat].map((tool: any) => (
                <ToolCard
                  key={tool.slug}
                  slug={tool.slug}
                  title={tool.title}
                  description={tool.shortDescription}
                  category={tool.category}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-20 prose dark:prose-invert max-w-none border-t border-slate-100 dark:border-slate-800 pt-12">
        <h2 className="text-2xl font-bold mb-4">Why Utils4You is Your Daily Productivity Partner</h2>
        <p>
          In a world where digital privacy is often compromised, Utils4You offers a secure alternative.
          All our tools are optimized for performance, ensuring they load instantly even on slow connections.
          Whether you are an Indian professional calculating GST or a student counting words for an essay,
          our tools provide browser-based processing, meaning your data never leaves your computer.
        </p>
      </section>
    </main>
  );
}

function ToolCard({ slug, title, description, category }: { slug: string; title: string; description?: string; category?: string }) {
  return (
    <Link href={`/tools/${slug}`} className="group">
      <div className="card h-full flex flex-col hover:border-blue-500 hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-2 mb-3">
          {category && (
            <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md border border-blue-100 dark:border-blue-800">
              {CATEGORY_LABELS[category] || category.replace(/-/g, ' ')}
            </span>
          )}
        </div>
        <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
          {description || `Advanced online utility designed for high performance and accuracy. 100% free and private.`}
        </p>
        <div className="mt-auto pt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
          Open Tool
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
