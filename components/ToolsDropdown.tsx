"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Tool {
  title: string;
  slug: string;
}

interface ToolsDropdownProps {
  tools: Tool[];
}

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
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-64 bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="block px-4 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-border)] rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {tool.title}
              </Link>
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
