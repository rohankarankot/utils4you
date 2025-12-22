import React from "react";
import { Metadata } from "next";
import CaseConverter from "../../../../components/CaseConverter";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Online Case Converter – Uppercase, Lowercase & Title Case | MyDailyTools",
  description: "Convert text to uppercase, lowercase, title case, or sentence case instantly. Free online case conversion tool for writers, students, and developers.",
  keywords: ["case converter", "convert to uppercase", "title case generator", "lowercase converter", "text formatter"],
};

export default function CaseConverterPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Online Case Converter Tool</h1>
      <p className="text-lg text-[var(--muted)] mb-6">
        Transform your text format instantly. Switch between Sentence case, UPPERCASE, lowercase, 
        and Title Case with a single click.
      </p>

      <Adsense className="my-4" />

      <CaseConverter />

      <section className="mt-12 prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">A Versatile Text Formatting Tool</h2>
        <p>
          Accidentally left Caps Lock on? Need to format a long list of titles for a presentation? 
          Our online case converter is here to rescue your text without requiring you to retype a single word. 
          It supports standard conversions used in academic writing, professional emails, and creative projects.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Available Case Options</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Sentence case:</strong> Capitalizes the first letter of each sentence, perfect for long-form writing and drafts.</li>
          <li><strong>UPPERCASE:</strong> Converts every character to capital letters. Useful for emphasis, acronyms, and headings.</li>
          <li><strong>lowercase:</strong> Sets every character to small letters. Ideal for cleaning up messy formatting or data entry.</li>
          <li><strong>Title Case:</strong> Capitalizes the first letter of every significant word. Essential for book titles, headlines, and subheadings.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Why Developers and Writers Love This Tool</h3>
        <p>
          Efficiency is key in modern workflows. Writers use our **Title Case generator** to ensure consistency across their articles. 
          Developers use it to quickly clean up string labels or comments. 
          By handling the conversion in-browser, we ensure that your data is never uploaded, making it safe for sensitive notes and private logs.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">How to Use the Case Converter</h3>
        <p>
          Simply paste your text into the box above and click the button for the case you need. 
          The result is generated instantly. You can then use the <strong>Copy to Clipboard</strong> button to move the formatted text back into your document. 
          It works on all devices—mobile, tablet, and desktop.
        </p>
      </section>
    </main>
  );
}
