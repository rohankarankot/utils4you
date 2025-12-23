import React from "react";
import Link from "next/link";
import { sanityClient } from "../lib/sanityClient";

async function getRelatedTools(currentSlug: string) {
  // Fetch up to 10 tools to ensure we have enough to filter and slice
  const query = `*[_type == "tool" && slug.current != $currentSlug] | order(_createdAt desc)[0...6] {
    title,
    "slug": slug.current,
    shortDescription
  }`;
  return await sanityClient.fetch(query, { currentSlug });
}

export default async function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const tools = await getRelatedTools(currentSlug);
  const related = tools.slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Other Useful Tools You Might Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((tool: any) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group">
            <div className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-blue-500 hover:shadow-sm transition-all h-full flex flex-col">
              <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{tool.title}</h3>
              <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                {tool.shortDescription || `Fast and reliable tool for your daily needs.`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
