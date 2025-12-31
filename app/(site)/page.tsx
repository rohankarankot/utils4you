import Link from "next/link";
import { sanityClient } from "../../lib/sanityClient";
import { Metadata } from "next";
import { generateSiteMetadata } from "../../lib/seo";
import * as Icons from "lucide-react";

export async function generateMetadata() {
  return await generateSiteMetadata("/");
}

async function getHomepageData() {
  const query = `*[_type == "homepage"][0]`;
  return await sanityClient.fetch(query);
}

const iconMap: { [key: string]: string } = {
  text: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  calculator: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  code: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  image: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
};

const colorSchemes: { [key: string]: string } = {
  indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
  purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
};

export default async function Home() {
  const homepage = await getHomepageData();

  if (!homepage) {
    return (
      <main>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Homepage content not found</h1>
          <p className="text-[var(--muted)]">Please run the seed script to populate homepage data.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="mb-12 py-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            {homepage.hero?.title} <span className="text-gradient">{homepage.hero?.highlightedText}</span>
          </h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            {homepage.hero?.subtitle}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      {homepage.stats && homepage.stats.length > 0 && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {homepage.stats.map((stat: any, index: number) => {
            const IconComponent = (Icons as any)[stat.icon];
            return (
              <div key={index} className="card text-center">
                <div className="flex justify-center mb-3">
                  {IconComponent && <IconComponent size={32} className="text-[var(--primary)]" />}
                </div>
                <div className="text-3xl font-bold text-[var(--primary)] mb-1">{stat.number}</div>
                <div className="text-sm text-[var(--muted)] font-medium">{stat.label}</div>
              </div>
            );
          })}
        </section>
      )}

      {/* Benefits Section */}
      {homepage.benefits && (
        <section className="mt-20 prose dark:prose-invert max-w-none border-t border-slate-100 dark:border-slate-800 pt-12">
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{homepage.benefits.heading}</h2>
          <p className="text-lg leading-relaxed text-[var(--muted)]">
            {homepage.benefits.description}
          </p>
        </section>
      )}

      {/* Features Section */}
      {homepage.features && homepage.features.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {homepage.features.map((feature: any, index: number) => (
            <div key={index} className="card group">
              <div className={`w-12 h-12 rounded-xl ${colorSchemes[feature.colorScheme] || colorSchemes.indigo} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconMap[feature.icon] || iconMap.text}></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">{feature.title}</h2>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                {feature.description}
              </p>
              <div className="mt-auto">
                <Link
                  href={feature.link}
                  className="btn btn-primary w-full sm:w-auto"
                >
                  Explore Tools
                </Link>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* CTA Section */}
      {homepage.cta && (
        <div className="mt-16 text-center card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <h2 className="text-2xl font-bold mb-2">{homepage.cta.heading}</h2>
          <p className="text-[var(--muted)] mb-6">{homepage.cta.description}</p>
          <Link
            href={homepage.cta.buttonLink}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            {homepage.cta.buttonText}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      )}
    </main>
  );
}
