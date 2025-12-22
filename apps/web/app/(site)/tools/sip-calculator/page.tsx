import React from "react";
import Seo from "../../../../components/Seo";
import SIPCalculator from "../../../../components/SIPCalculator";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export default function SIPCalculatorPage() {
  return (
    <main>
      <Seo
        title="SIP Calculator - Mutual Fund SIP Calculator"
        description="Estimate returns from monthly SIP investments."
      />
      <h1>SIP Calculator</h1>
      <p className="text-[var(--muted)]">
        Estimate future value of monthly SIP investments with compounding
        returns.
      </p>
      <Adsense className="my-4" />
      <SIPCalculator />

      <section className="mt-8 prose">
        <h2>About SIP Calculator</h2>
        <p>
          Use this SIP calculator to estimate returns for systematic investment
          plans in mutual funds. It assumes monthly contributions and a fixed
          annual rate compounded monthly.
        </p>
      </section>
    </main>
  );
}
