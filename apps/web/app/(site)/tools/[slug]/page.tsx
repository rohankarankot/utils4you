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
    keywords: tool.seo?.keywords || [],
    alternates: {
      canonical: tool.canonicalUrl || `https://mydailytools-pi.vercel.app/tools/${params.slug}`,
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

  const heroTitle = tool.heroTitle || tool.title;
  const heroSubtitle = tool.heroSubtitle || tool.shortDescription;

  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">{heroTitle}</h1>
      {heroSubtitle && <p className="text-lg text-[var(--muted)] mb-6">{heroSubtitle}</p>}
      
      {tool.showAdsense !== false && <Adsense className="mb-6" />}
      
      {/* Tool Component Placeholder - will be mapped below */}
      <ToolRenderer slug={slug} />

      {tool.longDescription && tool.longDescription.length > 0 && (
        <section className="prose dark:prose-invert max-w-none mt-12">
          <div>
            {(tool.longDescription || []).map((b: any, i: number) => (
              <div key={i}>
                {b._type === 'block' ? (
                  <p>{b.children?.map((c: any) => c.text).join("")}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}
      
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

// Map slug to the actual calculator component
import EMICalculator from "../../../../components/EMICalculator";
import GSTCalculator from "../../../../components/GSTCalculator";
import SIPCalculator from "../../../../components/SIPCalculator";
import AgeCalculator from "../../../../components/AgeCalculator";
import WordCounter from "../../../../components/WordCounter";
import CharacterCounter from "../../../../components/CharacterCounter";
import CaseConverter from "../../../../components/CaseConverter";
import SlugGenerator from "../../../../components/SlugGenerator";
import BMICalculator from "../../../../components/BMICalculator";
import HTMLMinifier from "../../../../components/HTMLMinifier";
import JSONFormatter from "../../../../components/JSONFormatter";

function ToolRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case "emi-calculator": return <EMICalculator />;
    case "gst-calculator": return <GSTCalculator />;
    case "sip-calculator": return <SIPCalculator />;
    case "age-calculator": return <AgeCalculator />;
    case "word-counter": return <WordCounter />;
    case "character-counter": return <CharacterCounter />;
    case "case-converter": return <CaseConverter />;
    case "slug-generator": return <SlugGenerator />;
    case "remove-extra-spaces": return <WordCounter />;
    case "bmi-calculator": return <BMICalculator />;
    case "html-minify": return <HTMLMinifier />;
    case "json-formatter": return <JSONFormatter />;
    // Fallback or other tools...
    default: return null;
  }
}
