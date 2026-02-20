import React from 'react';
import Link from 'next/link';

export default function TableOfContents({ blocks }: { blocks: any[] }) {
    if (!blocks || !Array.isArray(blocks)) return null;

    const outline = blocks
        .filter(
            (block) =>
                block._type === 'block' &&
                (block.style === 'h2' || block.style === 'h3')
        )
        .map((block) => {
            const text =
                block.children?.map((child: any) => child.text).join('') || '';
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            return {
                text,
                id,
                level: block.style,
            };
        })
        .filter((item) => item.text && item.id);

    if (outline.length === 0) return null;

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl mb-8 border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <ul className="space-y-3">
                {outline.map((item, idx) => (
                    <li
                        key={idx}
                        className={`${item.level === 'h3' ? 'ml-6 list-[circle]' : 'ml-4 list-disc'}`}
                    >
                        <Link
                            href={`#${item.id}`}
                            className="text-[var(--primary)] hover:underline text-[15px] font-medium"
                        >
                            {item.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
