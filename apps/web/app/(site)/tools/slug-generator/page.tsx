import React from "react";
import { Metadata } from "next";
import SlugGenerator from "../../../../components/SlugGenerator";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "URL Slug Generator – Create SEO Friendly URLs | OmniTools",
  description: "Transform your titles into clean, SEO-friendly URL slugs instantly. Free, fast, and private URL optimization tool by OmniTools.",
  keywords: ["slug generator", "URL slugger", "SEO friendly URL", "OmniTools SEO", "clean URL creator"],
};

export default function SlugGeneratorPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Clean SEO Slug Generator</h1>
      <p className="text-lg text-[var(--muted)] mb-6">
        Turn complex titles into clean, URL-friendly slugs instantly. 
        Optimize your website permalinks for users and search engines.
      </p>

      <Adsense className="my-4" />

      <SlugGenerator />

      <section className="mt-12 prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">What is a URL Slug?</h2>
        <p>
          A slug is the part of a URL that identifies a particular page in a human-readable format. 
          For example, instead of a messy URL like `example.com/?p=123`, a slug-based URL looks like `example.com/clean-seo-slug-generator`. 
          Slugs are vital for SEO as they give search engines keywords to index and help users understand what they are about to click on.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Best Practices for Great Slugs</h3>
        <p>
          To get the most out of your permalinks, follow these industry-standard rules:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Use Hyphens:</strong> Always use hyphens (-) to separate words. Underscores and spaces are not recommended by Google.</li>
          <li><strong>Stay Lowercase:</strong> Keep all characters lowercase to avoid confusion on case-sensitive servers.</li>
          <li><strong>Remove Stopwords:</strong> Words like "a", "the", and "of" can often be removed to keep slugs short and punchy.</li>
          <li><strong>Avoid Special Characters:</strong> Symbols like ?, !, and & can break URL structures and should always be removed.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Why Use our Slug Generator?</h3>
        <p>
          Our tool automates the tedious parts of slug creation:
        </p>
        <p>
          It handles **accented characters** (converting "é" to "e"), removes punctuation, and trims excess whitespace. 
          It even allows you to control the exact separator used. 
          Whether you are a developer building a CMS or a blogger preparing an article, this tool ensures your URLs are professional and optimized.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Save Time, Improve SEO</h3>
        <p>
          Manual slug creation is prone to errors. Using a dedicated generator ensures consistent formatting across your entire site. 
          Consistent, readable URLs lead to higher click-through rates and better user experience. 
          Our tool runs entirely on your device, ensuring that your draft titles never leave your browser.
        </p>
      </section>
    </main>
  );
}
