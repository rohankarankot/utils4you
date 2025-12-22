import React from "react";
import { Metadata } from "next";
import AgeCalculator from "../../../../components/AgeCalculator";
import Adsense from "../../../../components/Adsense";
import FAQSchema from "../../../../components/FAQSchema";
import SocialShare from "../../../../components/SocialShare";
import RelatedTools from "../../../../components/RelatedTools";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Age Calculator & Life Expectancy Predictor | MyDailyTools",
  description: "Calculate your exact age in years, months, and days. Use our life span predictor to estimate your longevity based on lifestyle factors like diet and exercise.",
  keywords: ["age calculator", "calculate age online", "life expectancy predictor", "how long will I live", "chronological age calculator"],
};

const faqs = [
  {
    question: "How accurate is this age calculator?",
    answer: "Our calculator is 100% accurate as it accounts for leap years and the different number of days in each month of the Gregorian calendar.",
  },
  {
    question: "What is the difference between chronological and biological age?",
    answer: "Chronological age is the total time since your birth, while biological age refers to how old your cells and systems appear to be based on lifestyle, genetics, and health markers.",
  },
  {
    question: "How does the Life Span Predictor work?",
    answer: "The predictor uses statistical data on longevity, adjustments based on smoking habits, exercise frequency, diet quality, and stress levels to give a rough estimate of potential lifespan.",
  },
  {
    question: "Can I use this for official age verification?",
    answer: "This is a utility tool for personal use and informational purposes. While accurate, official age verification should always be done using government-issued documents like a birth certificate or passport.",
  },
];

export default function AgeCalculatorPage() {
  return (
    <main>
      <FAQSchema faqs={faqs} />
      <h1 className="text-3xl font-bold mb-4">Age Calculator & Longevity Predictor</h1>
      <p className="text-lg text-[var(--muted)] mb-6">
        Discover your exact age down to the second and explore how your lifestyle choices might impact your total life span.
      </p>

      <Adsense className="my-4" />

      <AgeCalculator />

      <section className="mt-12 prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">More Than Just a Birthday Counter</h2>
        <p>
          While most age calculators just tell you how many years have passed since your birth, MyDailyTools provides a deeper look. 
          Our tool calculates your age in years, months, days, and even displays a real-time counter in seconds. 
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

        <h3 className="text-xl font-semibold mt-6 mb-3">Biological vs. Chronological Age</h3>
        <p>
          Your chronological age is the number of years you've been alive. 
          However, your biological age can be much younger or older depending on your lifestyle. 
        </p>
      </section>

      <SocialShare 
        title="Age Calculator & Longevity Predictor | MyDailyTools" 
        url="https://mydailytools-pi.vercel.app/tools/age-calculator" 
      />
      
      <RelatedTools currentSlug="age-calculator" />
    </main>
  );
}
