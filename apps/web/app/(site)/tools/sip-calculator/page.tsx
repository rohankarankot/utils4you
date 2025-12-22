import React from "react";
import { Metadata } from "next";
import SIPCalculator from "../../../../components/SIPCalculator";
import Adsense from "../../../../components/Adsense";
import FAQSchema from "../../../../components/FAQSchema";
import SocialShare from "../../../../components/SocialShare";
import RelatedTools from "../../../../components/RelatedTools";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "SIP Calculator – Systematic Investment Plan Returns Calculator | MyDailyTools",
  description: "Calculate your future mutual fund returns with our free SIP calculator. Plan your financial goals by estimating the power of compounding on monthly investments.",
  keywords: ["SIP calculator", "mutual fund calculator", "investment calculator", "wealth calculator India", "SIP returns calculator"],
};

const faqs = [
  {
    question: "How does an SIP calculator work?",
    answer: "An SIP calculator uses a compounding interest formula. It takes your monthly investment, estimated return rate, and tenure to calculate the total matured amount at the end of the period.",
  },
  {
    question: "Is SIP better than a lump sum investment?",
    answer: "SIP is generally considered better for long-term investors as it averages out the cost of purchase (rupee cost averaging) and reduces the risk of timing the market incorrectly.",
  },
  {
    question: "What is the minimum amount for an SIP?",
    answer: "In India, several mutual funds allow you to start an SIP with as little as ₹100 to ₹500 per month.",
  },
  {
    question: "Are SIP returns taxable in India?",
    answer: "Yes, returns are subject to Capital Gains Tax. Short-term or long-term tax rates apply depending on the type of mutual fund (equity or debt) and the holding period.",
  },
];

export default function SIPCalculatorPage() {
  return (
    <main>
      <FAQSchema faqs={faqs} />
      <h1 className="text-3xl font-bold mb-4">SIP Calculator – Plan Your Mutual Fund Investments</h1>
      <p className="text-lg text-[var(--muted)] mb-6">
        Estimate the future value of your monthly SIP investments based on expected annual returns and tenure.
      </p>

      <Adsense className="my-4" />

      <SIPCalculator />

      <section className="mt-12 prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">What is an SIP?</h2>
        <p>
          A Systematic Investment Plan (SIP) is a method of investing in mutual funds where you invest a fixed amount regularly (monthly or quarterly) instead of making a one-time lump sum payment. 
          It is one of the most popular ways to build wealth in India due to its discipline and the power of compounding.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Frequently Asked Questions</h3>
        <div className="space-y-4 mb-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h4>
              <p className="text-[var(--muted)]">{faq.answer}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">The Power of Compounding</h3>
        <p>
          Compounding is the process where the returns on your investment start earning their own returns. 
          When you invest through an SIP, your money grows exponentially over time. 
        </p>
      </section>

      <SocialShare 
        title="SIP Calculator – Plan Your Mutual Fund Investments | MyDailyTools" 
        url="https://mydailytools-pi.vercel.app/tools/sip-calculator" 
      />
      
      <RelatedTools currentSlug="sip-calculator" />
    </main>
  );
}
