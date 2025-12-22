import React from "react";
import Link from "next/link";
import Seo from "../../../components/Seo";
import { toolsSlugs } from "./slugRoutes";

export default function ToolsIndex() {
  return (
    <main>
      <Seo title="All Tools" description="List of all tools" />
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">All Productivity Tools</h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
          Browse our full collection of text utilities and financial calculators, 
          designed to be fast, private, and easy to use.
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsSlugs.map((s) => (
          <Link href={`/tools/${s}`} key={s} className="group">
            <div className="card h-full flex flex-col group-hover:border-[var(--primary)] transition-colors">
              <h3 className="font-bold text-xl mb-3 capitalize">{s.replace(/-/g, " ")}</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
                Professional grade {s.replace(/-/g, " ")} for your daily workflows. Fast and accessible.
              </p>
              <div className="mt-auto pt-4 flex items-center gap-2 text-[var(--primary)] font-semibold text-sm">
                Open Tool
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
