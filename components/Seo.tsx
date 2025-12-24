import React from "react";
import Head from "next/head";

export default function Seo({
  title,
  description,
  canonical,
  image,
}: {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}) {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const url = canonical || site;
  const imageUrl = image || `${site}/og.png`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
}
