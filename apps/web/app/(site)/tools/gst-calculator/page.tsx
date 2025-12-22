import React from "react";
import { Metadata } from "next";
import GSTCalculator from "../../../../components/GSTCalculator";
import Adsense from "../../../../components/Adsense";
import FAQSchema from "../../../../components/FAQSchema";
import SocialShare from "../../../../components/SocialShare";
import RelatedTools from "../../../../components/RelatedTools";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "GST Calculator India – Instant Tax Calculation | OmniTools",
  description: "Accurately calculate GST for your business. Supports 5%, 12%, 18%, and 28% tax slabs. Fast, free, and private GST tool by OmniTools.",
  keywords: ["GST calculator", "GST India", "tax calculator", "OmniTools GST", "inclusive GST", "exclusive GST"],
};

const faqs = [
  {
    question: "What are the common GST slabs in India?",
    answer: "The primary GST slabs in India are 5%, 12%, 18%, and 28%. Most essential items fall under lower slabs, while luxury goods are in the 28% bracket.",
  },
  {
    question: "How do I calculate GST inclusive price?",
    answer: "To find the GST inside a total amount, use the formula: [Total Price - (Total Price / (1 + GST rate/100))]. Our calculator does this automatically when you select 'GST Inclusive'.",
  },
  {
    question: "What is CGST, SGST, and IGST?",
    answer: "CGST and SGST are applied for intra-state transactions (within the same state), while IGST is applied for inter-state transactions (between two different states).",
  },
  {
    question: "Can I claim Input Tax Credit (ITC) using these calculations?",
    answer: "Yes, knowing the exact GST paid as calculated by this tool helps you maintain accurate records for claiming Input Tax Credit during your GST returns filing.",
  },
];

export default function GSTCalculatorPage() {
  return (
    <main>
      <FAQSchema faqs={faqs} />
      <h1 className="text-3xl font-bold mb-4">Online GST Calculator</h1>
      <p className="text-lg text-[var(--muted)] mb-6">
        Calculate Goods and Services Tax (GST) for any product or service with ease. 
        Determine GST inclusive and exclusive amounts in seconds.
      </p>
      
      <Adsense className="my-4" />

      <GSTCalculator />

      <section className="mt-12 prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">How to Use the GST Calculator</h2>
        <p>
          Our online GST calculator is designed to simplify tax calculations for Indian business owners, accountants, and consumers. 
          Whether you need to find the total price including tax or the base price before tax, this tool handles all standard GST slabs including 5%, 12%, 18%, and 28%.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Difference Between GST Inclusive and Exclusive</h3>
        <p>
          Understanding the difference between inclusive and exclusive GST is crucial for accurate invoicing and budgeting:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>GST Exclusive:</strong> This is the base price of a product or service. When you calculate GST on an exclusive amount, the tax is added on top of the base price.</li>
          <li><strong>GST Inclusive:</strong> This is the final price that includes the tax. When you calculate GST from an inclusive amount, you are reverse-calculating to find how much tax is hidden inside that total.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Frequently Asked Questions</h3>
        <div className="space-y-4 mb-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h4>
              <p className="text-[var(--muted)]">{faq.answer}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Benefits of Using Our Online GST Tool</h3>
        <p>
          Using an automated tool like MyDailyTools ensures accuracy and saves significant time compared to manual calculations. 
          Manual math can lead to errors, especially when dealing with complex decimal points in reverse calculations. 
        </p>
      </section>

      <SocialShare 
        title="Online GST Calculator – Inclusive & Exclusive | MyDailyTools" 
        url="https://mydailytools-pi.vercel.app/tools/gst-calculator" 
      />
      
      <RelatedTools currentSlug="gst-calculator" />
    </main>
  );
}
