import React from "react";
import Seo from "../../../../components/Seo";
import WordCounter from "../../../../components/WordCounter";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export default function WordCounterPage() {
  return (
    <main>
      <Seo
        title="Word Counter - Free Online Word Count Tool"
        description="Instant word count, character count, reading time and more. Accessible and fast."
      />
      <h1>Word Counter</h1>
      <p className="text-[var(--muted)]">
        Quickly count words, characters, sentences and paragraphs. Use remove
        extra spaces, case convert, copy, and download.
      </p>
      <Adsense className="my-4" />
      <WordCounter />

      <section className="mt-8 prose">
        <h2>About the Word Counter</h2>
        <p>
          This Word Counter is built for speed and accessibility. It runs 100%
          client-side and provides instant counts and useful actions such as
          removing extra spaces and converting case. It also estimates reading
          time and surfaces the most common words. If you want to use the
          results in URLs, use the slug generator that converts text to a clean
          URL-friendly slug.
        </p>
      </section>
    </main>
  );
}
