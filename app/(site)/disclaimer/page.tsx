import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer | Utils4You",
    description: "Disclaimer and usage terms for the tools and information provided by Utils4You.",
    alternates: {
        canonical: "https://www.utils4you.in/disclaimer",
    },
};

export default function DisclaimerPage() {
    return (
        <main>
            <Breadcrumbs items={[{ label: "Disclaimer" }]} />

            <section className="max-w-4xl mx-auto py-12">
                <h1 className="text-4xl font-extrabold mb-8">Disclaimer</h1>

                <div className="prose dark:prose-invert max-w-none prose-lg space-y-8">
                    <p className="text-sm text-[var(--muted)] italic">Last updated: February 20, 2026</p>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. General Information</h2>
                        <p>
                            The information and tools provided on <strong>Utils4You</strong> (Accessible via https://www.utils4you.in)
                            are for general informational and educational purposes only. All tools are provided
                            &quot;as is&quot; without any warranty of accuracy, reliability, or completeness.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Financial & Professional Disclaimer</h2>
                        <p>
                            Our calculators (such as EMI, GST, SIP, and Income Tax calculators) are designed to
                            provide estimates based on user inputs. They should not be considered as professional
                            financial or legal advice. Financial decisions should be made in consultation with
                            a certified financial advisor.
                        </p>
                        <p>
                            Utils4You shall not be held liable for any financial losses or discrepancies
                            alleged to have been caused by the use of our calculators.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. External Links</h2>
                        <p>
                            Utils4You may contain links to external websites that are not provided or
                            maintained by or in any way affiliated with us. Please note that we do not
                            guarantee the accuracy, relevance, timeliness, or completeness of any
                            information on these external websites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. &quot;Use at Your Own Risk&quot;</h2>
                        <p>
                            The use of any information or tools on this website is entirely at your
                            own risk, for which we shall not be liable. It shall be your own responsibility
                            to ensure that any products, services, or information available through this
                            website meet your specific requirements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Errors and Omissions</h2>
                        <p>
                            While we strive to keep our tools error-free and up-to-date, technology and
                            regulations (like tax laws) change frequently. We assume no responsibility
                            for errors or omissions in the contents of the Service.
                        </p>
                    </section>
                </div>
            </section>
        </main>
    );
}
