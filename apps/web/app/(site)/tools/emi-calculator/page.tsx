import React from "react";
import Seo from "../../../../components/Seo";
import EMICalculator from "../../../../components/EMICalculator";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export default function EmiPage() {
  return (
    <main>
      <Seo
        title="EMI Calculator - Car, Personal, Education Loans"
        description="Calculate EMI, total payment and interest for car, personal, education or home loans. India-focused defaults included."
      />
      <h1>EMI Calculator</h1>
      <p className="text-[var(--muted)]">
        Calculate your monthly EMI with presets for Car, Personal and Education
        loans.
      </p>
      <Adsense className="my-4" />
      <EMICalculator />

      <section className="mt-8 prose">
        <h2>Tips for borrowers in India</h2>
        <p>
          Choose tenure and loan type carefully; shorter tenure reduces interest
          but increases EMI. These numbers are indicative and do not replace
          lender quotes.
        </p>
      </section>
    </main>
  );
}
