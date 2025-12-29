"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto no-scrollbar">
            <ol className="flex items-center gap-2 text-sm whitespace-nowrap">
                <li>
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                    >
                        <Home size={14} />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-slate-400 shrink-0" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-semibold text-slate-900 dark:text-white">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
