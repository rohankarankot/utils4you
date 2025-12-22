import React from "react";
import Link from "next/link";

const ALL_TOOLS = [
  { slug: "emi-calculator", name: "EMI Calculator India", desc: "Calculate monthly loan payments easily." },
  { slug: "gst-calculator", name: "Online GST Calculator", desc: "Fast GST calculations with inclusive/exclusive modes." },
  { slug: "sip-calculator", name: "Mutual Fund SIP Tool", desc: "Predict your future wealth with SIP investments." },
  { slug: "age-calculator", name: "Age & Longevity Tool", desc: "Calculate age precisely and predict lifestyle milestones." },
  { slug: "word-counter", name: "Free Word Counter", desc: "Count words, characters, and sentences instantly." },
  { slug: "slug-generator", name: "URL Slug Generator", desc: "Create SEO-friendly URL slugs for your blog." },
];

export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const related = ALL_TOOLS.filter((t) => t.slug !== currentSlug).slice(0, 3);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Other Useful Tools You Might Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group">
            <div className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-blue-500 hover:shadow-sm transition-all h-full flex flex-col">
              <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
              <p className="text-sm text-[var(--muted)] line-clamp-2">{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
