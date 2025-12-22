import React from "react";
import Seo from "../../../../components/Seo";
import AgeCalculator from "../../../../components/AgeCalculator";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export default function AgeCalculatorPage() {
  return (
    <main>
      <Seo
        title="Age Calculator - Calculate Exact Age"
        description="Find years, months, and days since your birth date. Also shows next birthday countdown."
      />
      <h1>Age Calculator</h1>
      <p className="text-[var(--muted)]">
        Calculate your exact age and see your next birthday countdown.
      </p>
      <Adsense className="my-4" />
      <AgeCalculator />

      <section className="mt-8 prose">
        <h2>How it works</h2>
        <p>
          Enter your birthdate and the calculator will compute years, months,
          and days relative to today. It uses local time in your browser and
          runs completely client-side for privacy.
        </p>
      </section>
    </main>
  );
}
