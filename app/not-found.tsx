import React from "react";
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[var(--bg)]">
            {/* Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="relative max-w-2xl w-full text-center space-y-8 z-10">
                <div className="space-y-4">
                    <div className="relative inline-block">
                        <h1 className="text-[12rem] font-black leading-none tracking-tighter opacity-10 select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-bold px-6 py-2 glass rounded-2xl shadow-2xl border border-white/20">
                                Oops! Lost in Space?
                            </span>
                        </div>
                    </div>

                    <h2 className="text-4xl font-black text-gradient mt-8">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-[var(--muted)] max-w-md mx-auto">
                        The tool or page you are looking for has either been moved or doesn't exist. Let's get you back on track.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link href="/" className="btn btn-primary w-full sm:w-auto min-w-[160px]">
                        <Home size={18} />
                        Go Home
                    </Link>
                    <Link href="/tools" className="btn btn-ghost glass w-full sm:w-auto min-w-[160px] border border-[var(--surface-border)]">
                        <Search size={18} />
                        Browse All Tools
                    </Link>
                </div>

                <div className="pt-8 flex items-center justify-center gap-2 text-sm text-[var(--muted)]">
                    <ArrowLeft size={16} />
                    <span>Or use the navigation above to find what you need</span>
                </div>
            </div>
        </div>
    );
}
