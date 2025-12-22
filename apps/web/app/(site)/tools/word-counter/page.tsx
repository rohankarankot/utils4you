import React from "react";
import { Metadata } from "next";
import WordCounter from "../../../../components/WordCounter";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Free Online Word Counter – Instant Text Analysis Tool | MyDailyTools",
  description: "Count words, characters, sentences, and paragraphs instantly with our free online word counter. Get reading time estimates and keyword density analysis for SEO.",
  keywords: ["word counter", "word count tool", "character counter", "essay word counter", "online word counter free"],
};

export default function WordCounterPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Online Word Counter & Text Analysis</h1>
      <p className="text-lg text-[var(--muted)] mb-6">
        Get instant insights into your writing. Perfect for bloggers, students, and SEO professionals 
        who need to meet specific length requirements.
      </p>

      <Adsense className="my-4" />
      
      <WordCounter />

      <section className="mt-12 prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Why Use an Online Word Count Tool?</h2>
        <p>
          Whether you are writing an essay, a blog post, or a social media update, maintaining the right word count is essential. 
          Our tool provides real-time character and word counts so you never have to guess. 
          Beyond simple counting, MyDailyTools provides structural insights like sentence and paragraph counts to help you improve readability.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Optimize for SEO and Social Media</h3>
        <p>
          Search engines like Google value comprehensive content, often favoring articles over 1,000 words. 
          Similarly, platforms like Twitter (X) and LinkedIn have strict character limits. 
          Our tool helps you balance these requirements by showing you exactly where you stand. 
          Use the **reading time estimate** to ensure your content is digestible and respects your audience's time.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Key Features of Our Tool</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Instant Analysis:</strong> Results update as you type.</li>
          <li><strong>Reading Time:</strong> Automatically calculates how long it takes to read your text (based on average speeds).</li>
          <li><strong>Keyword Density:</strong> Identifies the most frequently used words to help you avoid repetition and optimize for keywords.</li>
          <li><strong>Case Conversion:</strong> Access built-in shortcuts to toggle between ALL CAPS and lowercase instantly.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Privacy First</h3>
        <p>
          Your data is your business. This word counter runs completely in your browser. 
          Your text is never sent to our servers, ensuring your drafts and confidential documents remain private.
        </p>
      </section>
    </main>
  );
}
