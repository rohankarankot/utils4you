"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Tool {
  title: string;
  slug: string;
  category?: string;
}

interface ToolsDropdownProps {
  tools: Tool[];
}

const CATEGORY_LABELS: Record<string, string> = {
  "text-tools": "Text Tools",
  "financial-calculators": "Finance",
  "health-calculators": "Health",
  "developer-tools": "Dev",
  "image-tools": "Images",
};

export default function ToolsDropdown({ tools }: ToolsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const groupedTools = tools.reduce((acc: any, tool) => {
    const cat = tool.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tool);
    return acc;
  }, {});

  const categories = Object.keys(groupedTools).sort();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium hover:text-[var(--primary)] transition-colors group"
        aria-expanded={isOpen}
      >
        Tools
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "group-hover:translate-y-0.5"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-[70vh] overflow-y-auto custom-scrollbar p-2">
            {categories.map((cat) => (
              <div key={cat} className="mb-4 last:mb-0">
                <Link
                  href={`/tools#${cat}`}
                  className="block px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--primary)] hover:underline mb-1"
                  onClick={() => setIsOpen(false)}
                >
                  {CATEGORY_LABELS[cat] || cat.replace(/-/g, ' ')}
                </Link>
                <div className="space-y-1">
                  {groupedTools[cat].map((tool: Tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="block px-2 py-1.5 text-sm text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-border)] rounded-lg transition-colors line-clamp-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {tool.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--surface-border)] mt-2 pt-2">
            <Link
              href="/tools"
              className="block px-4 py-2 text-xs font-semibold text-center text-[var(--primary)] hover:underline"
              onClick={() => setIsOpen(false)}
            >
              View All Tools
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
