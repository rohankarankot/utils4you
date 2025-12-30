import React from "react";
import { Metadata } from "next";
import Adsense from "../../../../components/Adsense";
import { faqJsonLd } from "./faqJsonLd";
import { breadcrumbJsonLd } from "./breadcrumbJsonLd";
import { sanityClient } from "../../../../lib/sanityClient";
import SocialShare from "../../../../components/SocialShare";
import RelatedTools from "../../../../components/RelatedTools";
import Breadcrumbs from "../../../../components/Breadcrumbs";

const CATEGORY_LABELS: Record<string, string> = {
  "text-tools": "Text Tools",
  "financial-calculators": "Financial Calculators",
  "health-calculators": "Health Tools",
  "developer-tools": "Dev Tools",
  "image-tools": "Image Tools",
};

export const revalidate = 86400; // ISR

export async function generateStaticParams() {
  const query = `*[_type == "tool"] { "slug": slug.current }`;
  const tools = await sanityClient.fetch(query);
  return tools.map((tool: { slug: string }) => ({
    slug: tool.slug,
  }));
}

async function getToolBySlug(slug: string) {
  const query = `*[_type == "tool" && slug.current == $slug][0] {
    ...,
    "ogImage": seo.ogImage.asset->url
  }`;
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
      canonical: tool.canonicalUrl || `https://www.utils4you.in/tools/${params.slug}`,
    },
    openGraph: {
      title: tool.seo?.title || tool.title,
      description: tool.seo?.description || tool.shortDescription,
      images: tool.ogImage ? [{ url: tool.ogImage }] : [{ url: "/logo.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seo?.title || tool.title,
      description: tool.seo?.description || tool.shortDescription,
      images: tool.ogImage ? [tool.ogImage] : ["/logo.png"],
    }
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

  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: "Tools", href: "/tools" },
  ];

  if (tool.category) {
    breadcrumbItems.push({
      label: CATEGORY_LABELS[tool.category] || tool.category.replace(/-/g, ' '),
      href: `/tools#${tool.category}`
    });
  }

  breadcrumbItems.push({ label: tool.title });

  return (
    <main>
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-3xl font-bold mb-4">{heroTitle}</h1>
      {heroSubtitle && <p className="text-lg text-[var(--muted)] mb-6">{heroSubtitle}</p>}

      {tool.showAdsense !== false && <Adsense className="mb-6" slot="8795533518" />}

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
        title={`${tool.title} | Utils4You`}
        url={`https://www.utils4you.in/tools/${tool.slug.current}`}
      />

      <RelatedTools currentSlug={tool.slug.current} />
    </main>
  );
}

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const Loading = () => (
  <div className="flex items-center justify-center p-12">
    <Loader2 className="animate-spin text-[var(--primary)]" size={32} />
  </div>
);

// Dynamic imports for heavy tool components
const EMICalculator = dynamic(() => import("../../../../components/EMICalculator"), { loading: () => <Loading /> });
const GSTCalculator = dynamic(() => import("../../../../components/GSTCalculator"), { loading: () => <Loading /> });
const SIPCalculator = dynamic(() => import("../../../../components/SIPCalculator"), { loading: () => <Loading /> });
const AgeCalculator = dynamic(() => import("../../../../components/AgeCalculator"), { loading: () => <Loading /> });
const WordCounter = dynamic(() => import("../../../../components/WordCounter"), { loading: () => <Loading /> });
const CharacterCounter = dynamic(() => import("../../../../components/CharacterCounter"), { loading: () => <Loading /> });
const CaseConverter = dynamic(() => import("../../../../components/CaseConverter"), { loading: () => <Loading /> });
const SlugGenerator = dynamic(() => import("../../../../components/SlugGenerator"), { loading: () => <Loading /> });
const BMICalculator = dynamic(() => import("../../../../components/BMICalculator"), { loading: () => <Loading /> });
const HTMLMinifier = dynamic(() => import("../../../../components/HTMLMinifier"), { loading: () => <Loading /> });
const JSONFormatter = dynamic(() => import("../../../../components/JSONFormatter"), { loading: () => <Loading /> });
const CodeEditor = dynamic(() => import("../../../../components/CodeEditor"), { loading: () => <Loading /> });
const ImageCompressor = dynamic(() => import("../../../../components/ImageCompressor"), { loading: () => <Loading /> });
const QRCodeGenerator = dynamic(() => import("../../../../components/QRCodeGenerator"), { loading: () => <Loading /> });
const ImageToText = dynamic(() => import("../../../../components/ImageToText"), { loading: () => <Loading /> });
const PasswordGenerator = dynamic(() => import("../../../../components/PasswordGenerator"), { loading: () => <Loading /> });

const TOOLS: Record<string, React.ReactNode> = {
  "emi-calculator": <EMICalculator />,
  "gst-calculator": <GSTCalculator />,
  "sip-calculator": <SIPCalculator />,
  "age-calculator": <AgeCalculator />,
  "word-counter": <WordCounter />,
  "character-counter": <CharacterCounter />,
  "case-converter": <CaseConverter />,
  "slug-generator": <SlugGenerator />,
  "remove-extra-spaces": <WordCounter />,
  "bmi-calculator": <BMICalculator />,
  "html-minify": <HTMLMinifier />,
  "json-formatter": <JSONFormatter />,
  "code-editor": <CodeEditor />,
  "image-compressor": <ImageCompressor />,
  "qr-code-generator": <QRCodeGenerator />,
  "image-to-text": <ImageToText />,
  "password-generator": <PasswordGenerator />,
};

function ToolRenderer({ slug }: { slug: string }) {
  return TOOLS[slug] || null;
}
