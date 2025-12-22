import React from "react";
import { Metadata } from "next";
import EMICalculator from "../../../../components/EMICalculator";
import Adsense from "../../../../components/Adsense";
import FAQSchema from "../../../../components/FAQSchema";
import SocialShare from "../../../../components/SocialShare";
import RelatedTools from "../../../../components/RelatedTools";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "EMI Calculator India – Precise Loan & Interest Calculator | MyDailyTools",
  description: "Calculate accurate EMI for Car, Personal, and Education loans with our India-focused EMI calculator. View total interest and payment breakups instantly.",
  keywords: ["EMI calculator", "loan calculator India", "personal loan EMI", "car loan EMI", "home loan calculator"],
};

const faqs = [
  {
    question: "How is EMI calculated?",
    answer: "EMI is calculated using the formula: [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal loan amount, R is rate of interest per month, and N is number of monthly installments.",
  },
  {
    question: "What is a good EMI-to-income ratio?",
    answer: "Generally, lenders recommend keeping your total EMIs below 40-50% of your net monthly income for financial stability.",
  },
  {
    question: "Does reducing the tenure decrease total interest?",
    answer: "Yes, choosing a shorter tenure increases your monthly EMI but significantly reduces the total interest paid over the life of the loan.",
  },
  {
    question: "Can I use this for home loans in India?",
    answer: "Absolutely. While specifically tuned for personal, car, and education loans, it works perfectly for home loans as well. Simply input your principal, fixed interest rate, and tenure.",
  },
];

export default function EmiPage() {
  return (
    <main>
      <FAQSchema faqs={faqs} />
      <h1 className="text-3xl font-bold mb-4">India EMI Calculator – Personal, Car & Education Loans</h1>
      <p className="text-lg text-[var(--muted)] mb-6">
        Calculate your monthly loan payments instantly. Get a clear breakdown of principal vs interest 
        to make smarter financial decisions.
      </p>

      <Adsense className="my-4" />
      
      <EMICalculator />

      <section className="mt-12 prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">What is an EMI?</h2>
        <p>
          Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. 
          Equated monthly installments are applied to both interest and principal each month so that over a specified number of years, the loan is paid off in full.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Tips for Borrowers in India</h3>
        <p>
          Choosing the right loan structure can save you lakhs of rupees in interest. 
          Always compare the **Reducing Balance Rate** vs the **Flat Rate** offered by banks. 
          Our EMI calculator uses the standard reducing balance method used by major Indian banks like SBI, HDFC, and ICICI.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h4>
              <p className="text-[var(--muted)]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <SocialShare 
        title="EMI Calculator India – Loans & Interest | MyDailyTools" 
        url="https://mydailytools-pi.vercel.app/tools/emi-calculator" 
      />
      
      <RelatedTools currentSlug="emi-calculator" />
    </main>
  );
}
