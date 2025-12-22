import React from "react";
import Seo from "../../../../components/Seo";
import SlugGenerator from "../../../../components/SlugGenerator";
import Adsense from "../../../../components/Adsense";

export const revalidate = 86400;

export default function SlugGeneratorPage() {
  return (
    <main>
      <Seo
        title="Slug Generator - Create URL-friendly slugs"
        description="Generate URL-friendly slugs from text. Remove accents, control length, and copy results."
      />
      <h1>Slug Generator</h1>
      <p className="text-[var(--muted)]">
        Generate clean, SEO-friendly slugs for URLs and permalinks.
      </p>
      <Adsense className="my-4" />
      <SlugGenerator />

      <section className="mt-8 prose">
        <h2>Best practices</h2>
        <p>
          Use hyphen-separated, lowercase slugs under 100 characters for best
          SEO compatibility. Avoid stopwords if you want shorter slugs.
        </p>
      </section>
    </main>
  );
}
