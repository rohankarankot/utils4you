import React from "react";

export interface FAQItem {
    question: string;
    answer: string;
}

export interface ExampleItem {
    scenario: string;
    explanation: string;
}

export interface ToolContentProps {
    toolName: string;
    toolDescription: string;
    howToUse: string[];
    formula?: string; // Optional for non-math tools
    examples: ExampleItem[];
    benefits: string[];
    faqs: FAQItem[];
}

export default function ToolContent({
    toolName,
    toolDescription,
    howToUse,
    formula,
    examples,
    benefits,
    faqs,
}: ToolContentProps) {
    // Generate FAQ Schema JSON-LD
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
            {/* Introduction */}
            <section className="mb-10 prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                    What is the {toolName}?
                </h2>
                <p className="text-[var(--muted)] leading-relaxed">{toolDescription}</p>
            </section>

            {/* How To Use */}
            <section className="mb-10">
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                    How to Use the {toolName}
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-[var(--muted)] ml-2">
                    {howToUse.map((step, index) => (
                        <li key={index} className="leading-relaxed">
                            {step}
                        </li>
                    ))}
                </ol>
            </section>

            {/* Formula / Logic (If applicable) */}
            {formula && (
                <section className="mb-10 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">
                        How It Works (Formula/Logic)
                    </h3>
                    <p className="font-mono text-[var(--primary)] bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg border border-blue-100 dark:border-blue-800/30 overflow-x-auto text-sm sm:text-base">
                        {formula}
                    </p>
                </section>
            )}

            {/* Examples */}
            <section className="mb-10">
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                    Examples
                </h3>
                <div className="space-y-4">
                    {examples.map((example, index) => (
                        <div
                            key={index}
                            className="border-l-4 border-[var(--primary)] pl-4 py-2 bg-slate-50 dark:bg-slate-800/30 rounded-r-lg"
                        >
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">
                                {example.scenario}
                            </h4>
                            <p className="text-sm text-[var(--muted)]">{example.explanation}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits */}
            <section className="mb-12">
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                    Benefits List
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--muted)] relative overflow-hidden">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <svg
                                className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span className="leading-snug">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* FAQ Section */}
            <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
                <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100 text-center">
                    Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/20"
                        >
                            <summary className="font-semibold text-slate-700 dark:text-slate-200 cursor-pointer list-none flex justify-between items-center text-[15px] sm:text-base">
                                {faq.question}
                                <span className="group-open:rotate-180 transition-transform text-[var(--primary)]">
                                    ↓
                                </span>
                            </summary>
                            <div className="mt-3 text-[14px] sm:text-[15px] text-[var(--muted)] leading-relaxed border-t border-slate-200 dark:border-slate-700/50 pt-3">
                                <p>{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            {/* Inject JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </div>
    );
}
