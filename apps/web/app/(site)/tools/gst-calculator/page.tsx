import React from "react";
import Seo from "../../../../components/Seo";
import GSTCalculator from "../../../../components/GSTCalculator";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export default function GSTCalculatorPage() {
  return (
    <main>
      <Seo
        title="GST Calculator - Calculate GST inclusive or exclusive"
        description="Quickly compute GST (inclusive or exclusive) with breakdown of base, tax and total amounts."
      />
      <h1>GST Calculator</h1>
      <p className="text-[var(--muted)]">
        Calculate GST inclusive or exclusive of price.
      </p>
      <Adsense className="my-4" />

      <GSTCalculator />

      <section className="mt-8 prose">
        <h2>About GST</h2>
        <p>
          Use this calculator to convert between inclusive and exclusive prices
          for GST. Enter an amount and the GST rate to get the tax and total.
        </p>
      </section>
    </main>
  );
}
