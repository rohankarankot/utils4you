import React from 'react';

export default function AuthorBox({ authorName }: { authorName?: string }) {
    const name = authorName || "Utils4You Team";

    return (
        <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xl font-bold text-[var(--primary)]">
                    {name.charAt(0)}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Written by {name}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                        Passionate about making daily productivity and utility tools accessible, fast, and easy to use for everyone.
                    </p>
                </div>
            </div>
        </section>
    );
}
