import React from "react";
import { Metadata } from "next";
import Adsense from "../../../../components/Adsense";
import { faqJsonLd } from "./faqJsonLd";
import { breadcrumbJsonLd } from "./breadcrumbJsonLd";
import { sanityClient } from "../../../../lib/sanityClient";
import SocialShare from "../../../../components/SocialShare";
import RelatedTools from "../../../../components/RelatedTools";

export const revalidate = 86400; // ISR

async function getToolBySlug(slug: string) {
  const query = `*[_type == "tool" && slug.current == $slug][0]`;
  const tool = await sanityClient.fetch(query, { slug });
  return tool;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tool = await getToolBySlug(params.slug);
  if (!tool) return { title: "Tool Not Found" };

  return {
    title: tool.seo?.title || tool.title,
    description: tool.seo?.description || tool.shortDescription,
    alternates: {
      canonical: tool.canonicalUrl || `./`,
    },
    openGraph: {
      title: tool.seo?.title || tool.title,
      description: tool.seo?.description || tool.shortDescription,
    },
  };
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
      <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
      <Adsense className="mb-6" />
      <section className="prose dark:prose-invert max-w-none">
        <div>
          {(tool.longDescription || []).map((b: any, i: number) => (
            <p key={i}>{b.children?.map((c: any) => c.text).join("")}</p>
          ))}
        </div>
      </section>
      
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {tool.faqs.map((f: any, i: number) => (
              <details key={i} className="group border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center capitalize">
                  {f.question}
                  <span className="group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-3 text-[var(--muted)] leading-relaxed">
                  {(f.answer || []).map((b: any, i2: number) => (
                    <p key={i2}>{b.children?.map((c: any) => c.text).join("")}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(tool)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(tool)) }}
      />

      <SocialShare 
        title={`${tool.title} | OmniTools`} 
        url={`https://mydailytools-pi.vercel.app/tools/${tool.slug.current}`} 
      />
      
      <RelatedTools currentSlug={tool.slug.current} />
    </main>
  );
}
