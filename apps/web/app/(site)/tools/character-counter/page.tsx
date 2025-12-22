import React from "react";
import { Metadata } from "next";
import CharacterCounter from "../../../../components/CharacterCounter";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Online Character Counter – Accurate Text Length Tool | MyDailyTools",
  description: "Count characters and bytes with or without spaces. Free tool for social media limits, SEO meta descriptions, and developer data-size checks.",
  keywords: ["character counter", "count characters online", "text length checker", "byte counter", "social media character limit"],
};

export default function CharacterCounterPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Accurate Character & Byte Counter</h1>
      <p className="text-lg text-[var(--muted)] mb-6">
        Check the exact length of your text. Perfect for social media posts, Meta tags, 
        and technical byte-limit requirements.
      </p>

      <Adsense className="my-4" />

      <CharacterCounter />

      <section className="mt-12 prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Why Character Counting Matters</h2>
        <p>
          In a world of limits, knowing your exact character count is vital. 
          Social media platforms like X (Twitter) have strict 280-character maximums, while Instagram captions often perform better when kept under specific lengths. 
          Additionally, SEO specialists use character counters to ensure that meta titles and descriptions are not truncated in Google search results.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Characters vs. Bytes</h3>
        <p>
          While most users only care about the number of characters, developers and database admins often need to know the **byte size**. 
          Standard English characters usually take up 1 byte in UTF-8, but emojis and special symbols can take up to 4 bytes. 
          Our tool shows you both metrics so you can ensure your data fits within storage limits.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Optimize Social Media Posts</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>X (Twitter):</strong> 280 characters.</li>
          <li><strong>LinkedIn:</strong> ~3000 characters for posts, but the "See More" break happens much earlier.</li>
          <li><strong>Instagram:</strong> Up to 2200 characters.</li>
          <li><strong>Meta Descriptions:</strong> Ideally between 140–160 characters for best display.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Fast, Real-time results</h3>
        <p>
          There is no need to click "submit." As you type or paste your text into the box above, the counters update instantly. 
          You can toggle the **"Exclude spaces"** option to see the net character count—useful for academic word limits that exclude whitespace. 
          All processing is done on your device, ensuring speed and absolute privacy.
        </p>
      </section>
    </main>
  );
}
