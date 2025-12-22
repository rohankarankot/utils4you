import React from "react";
import Seo from "../../../../components/Seo";
import CaseConverter from "../../../../components/CaseConverter";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export default function CaseConverterPage() {
  return (
    <main>
      <Seo
        title="Case Converter - Upper, Lower, Title, Sentence"
        description="Convert text to uppercase, lowercase, title case or sentence case instantly."
      />
      <h1>Case Converter</h1>
      <p className="text-[var(--muted)]">
        Easily convert text between cases for social posts, headings or content
        editing.
      </p>
      <Adsense className="my-4" />
      <CaseConverter />

      <section className="mt-8 prose">
        <h2>How to use</h2>
        <p>
          Paste your text, then choose a case option. You can copy the result or
          clear the input to start again. All conversion happens locally in your
          browser for privacy.
        </p>
      </section>
    </main>
  );
}
