import React from "react";
import Link from "next/link";
import { sanityClient } from "../../../lib/sanityClient";

async function getTools() {
    const query = `*[_type == "tool"] | order(_createdAt desc) {
    title,
    "slug": slug.current
  }`;
    return await sanityClient.fetch(query);
}

export default async function DefaultSidebar() {
    const tools = await getTools();

    return (
        <div className="card bg-slate-50/50 dark:bg-slate-900/20 border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Navigation</p>
            <nav className="flex flex-col gap-3">
                {tools.map((tool: any) => (
                    <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="text-sm font-medium hover:text-blue-500 transition-colors line-clamp-1"
                    >
                        {tool.title}
                    </Link>
                ))}
                {tools.length === 0 && (
                    <>
                        <Link href="/tools/emi-calculator" className="text-sm font-medium hover:text-blue-500 transition-colors">EMI Calculator India</Link>
                        <Link href="/tools/gst-calculator" className="text-sm font-medium hover:text-blue-500 transition-colors">Online GST Calculator</Link>
                    </>
                )}
            </nav>
        </div>
    );
}
