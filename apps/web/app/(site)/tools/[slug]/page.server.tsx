import React from "react";
import Seo from "../../../../components/Seo";
import Adsense from "../../../../components/Adsense";
import { faqJsonLd } from "./faqJsonLd";
import { breadcrumbJsonLd } from "./breadcrumbJsonLd";
import { sanityClient } from "../../../../lib/sanityClient";

export const revalidate = 86400; // ISR

async function getToolBySlug(slug: string) {
  const query = `*[_type == "tool" && slug.current == $slug][0]`;
  const tool = await sanityClient.fetch(query, { slug });
  return tool;
}

export default async function ToolPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const tool = await getToolBySlug(slug);
  if (!tool)
    return (
      <main>
        <h1>Tool not found</h1>
      </main>
    );

  return (
    <main>
      <Seo
        title={tool.seo?.title || tool.title}
        description={tool.seo?.description || tool.shortDescription}
        canonical={tool.canonicalUrl}
      />
      <h1>{tool.title}</h1>
      <Adsense className="mb-6" />
      <section>
        <div>
          {(tool.longDescription || []).map((b: any, i: number) => (
            <p key={i}>{b.children?.map((c: any) => c.text).join("")}</p>
          ))}
        </div>
      </section>
      <section>
        <h2>FAQ</h2>
        {tool.faqs?.map((f: any, i: number) => (
          <details key={i}>
            <summary>{f.question}</summary>
            <div>
              {(f.answer || []).map((b: any, i2: number) => (
                <p key={i2}>{b.children?.map((c: any) => c.text).join("")}</p>
              ))}
            </div>
          </details>
        ))}
      </section>
      <script type="application/ld+json">
        {JSON.stringify(faqJsonLd(tool))}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd(tool))}
      </script>
      {/* canonical + breadcrumbs JSON-LD included above; add meta image for social */}
      <meta name="robots" content="index,follow" />
    </main>
  );
}
