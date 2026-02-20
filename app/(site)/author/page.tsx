import React from "react";
import Image from "next/image";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { Metadata } from "next";
import { Mail, Github, Twitter, Linkedin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
    title: "About the Author | Utils4You",
    description: "Meet the creator behind Utils4You. Learn about our mission to provide high-quality, free online utility tools.",
    alternates: {
        canonical: "https://www.utils4you.in/author",
    },
};

export default function AuthorPage() {
    return (
        <main>
            <Breadcrumbs items={[{ label: "Author" }]} />

            <section className="max-w-4xl mx-auto py-12">
                <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
                    <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-xl bg-[var(--primary)] shrink-0 flex items-center justify-center">
                        <span className="text-6xl font-black text-white">U</span>
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold mb-4">Rohan Karankot</h1>
                        <p className="text-xl text-[var(--primary)] font-medium mb-6">Founder & lead Developer at Utils4You</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <a href="mailto:contact@utils4you.in" className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                <Mail size={18} />
                                <span>Email</span>
                            </a>
                            <a href="https://github.com/rohankarankot" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                <Github size={18} />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="prose dark:prose-invert max-w-none prose-lg">
                    <h2 className="text-3xl font-bold mb-6">About the Creator</h2>
                    <p>
                        Hello! I&apos;m Rohan, a passionate software engineer and the creator of <strong>Utils4You</strong>.
                        I started this platform with a simple mission: to build a collection of free, fast, and
                        reliable online tools that respect user privacy and provide a premium user experience.
                    </p>

                    <p>
                        With years of experience in web development and a keen interest in finance and productivity,
                        I noticed that many utility websites are either cluttered with intrusive ads, slow to load,
                        or difficult to use on mobile devices. Utils4You is my response to that—a clean, modern
                        interface that just works.
                    </p>

                    <h3 className="text-2xl font-bold mt-12 mb-4">Our Values</h3>
                    <ul className="space-y-4 list-none p-0">
                        <li className="flex gap-3">
                            <div className="shrink-0 mt-1 text-[var(--primary)] font-bold">✓</div>
                            <div><strong>Privacy First:</strong> Most of our tools process data right in your browser. We don&apos;t see your data, and we certainly don&apos;t store it.</div>
                        </li>
                        <li className="flex gap-3">
                            <div className="shrink-0 mt-1 text-[var(--primary)] font-bold">✓</div>
                            <div><strong>Speed & Efficiency:</strong> We optimize every tool to load instantly and provide results without unnecessary page refreshes.</div>
                        </li>
                        <li className="flex gap-3">
                            <div className="shrink-0 mt-1 text-[var(--primary)] font-bold">✓</div>
                            <div><strong>Accessibility:</strong> Our tools are designed to be fully responsive and easy to use for everyone, including on mobile and tablets.</div>
                        </li>
                    </ul>

                    <h3 className="text-2xl font-bold mt-12 mb-4">What&apos;s Next?</h3>
                    <p>
                        We are constantly adding new calculators, text tools, and developer utilities. Our goal is
                        to become the go-to resource for anyone looking to simplify their daily digital tasks.
                        If you have a tool request or feedback, feel free to reach out via our
                        <a href="/contact-us" className="text-[var(--primary)] font-bold ml-1">Contact Page</a>.
                    </p>
                </div>
            </section>
        </main>
    );
}
