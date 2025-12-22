import React from "react";
import Seo from "../../../../components/Seo";
import Adsense from "../../../../components/Adsense";

export default function ToolPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  // Placeholder content — to be fetched from Sanity
  const seoTitle = `${slug.replace(/-/g, " ")} - Free Tool`;
  const description = `Use the ${seoTitle} online for free.`;

  return (
    <main>
      <Seo
        title={seoTitle}
        description={description}
        canonical={`https://example.com/tools/${slug}`}
      />
      <h1>{seoTitle}</h1>
      <Adsense className="mb-6" />
      <section>
        <p>Tool UI goes here (client-side only)</p>
      </section>
      <section>
        <h2>FAQ</h2>
      </section>
    </main>
  );
}
