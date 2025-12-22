import React from "react";
import Seo from "../../../../components/Seo";
import CharacterCounter from "../../../../components/CharacterCounter";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export default function CharacterCounterPage() {
  return (
    <main>
      <Seo
        title="Character Counter - Count Characters & Bytes"
        description="Character counter with options to exclude spaces and view UTF-8 byte size."
      />
      <h1>Character Counter</h1>
      <p className="text-[var(--muted)]">
        Count characters, bytes, and optionally exclude spaces. Great for social
        posts and SEO limits.
      </p>
      <Adsense className="my-4" />
      <CharacterCounter />

      <section className="mt-8 prose">
        <h2>About the Character Counter</h2>
        <p>
          This Character Counter helps you check exact character counts
          including or excluding spaces and calculates UTF-8 byte length (useful
          when you need to fit data within byte size limits). It runs entirely
          client-side for privacy and speed.
        </p>
      </section>
    </main>
  );
}
