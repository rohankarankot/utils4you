import { Metadata } from "next";
import { sanityClient } from "./sanityClient";

export async function getSiteConfig() {
  const query = `*[_type == "siteConfig"][0] {
    siteName,
    siteDescription,
    metadataBase,
    seo {
      titleTemplate,
      defaultTitle,
      description,
      keywords,
      "ogImage": ogImage.asset->url
    },
    social {
      twitterHandle,
      twitterCardType
    },
    integrations {
      googleVerification,
      adsenseId
    }
  }`;
  return await sanityClient.fetch(query);
}

export async function getPageMetadata(path: string) {
  const slug = path === "/" ? "home" : path.replace(/^\//, "");
  
  // SEO is now unified in the generic "page" document
  const query = `*[_type == "page" && slug.current == $slug][0].seo {
    title,
    description,
    keywords,
    "ogImage": ogImage.asset->url
  }`;
  return await sanityClient.fetch(query, { slug });
}

export async function generateSiteMetadata(path: string = "/"): Promise<Metadata> {
  const config = await getSiteConfig();
  const pageSEO = await getPageMetadata(path);

  if (!config) {
    return {
      title: "OmniTools",
      description: "Fast, accessible, and high-performance online utility tools.",
    };
  }

  const title = pageSEO?.title || config.seo?.defaultTitle || config.siteName || "OmniTools";
  const description = pageSEO?.description || config.seo?.description || config.siteDescription;
  const keywords = pageSEO?.keywords || config.seo?.keywords || [];
  const ogImage = pageSEO?.ogImage || config.seo?.ogImage;

  return {
    metadataBase: config.metadataBase ? new URL(config.metadataBase) : new URL("https://mydailytools-pi.vercel.app/"),
    title: {
      default: title,
      template: config.seo?.titleTemplate || `%s | ${config.siteName || "OmniTools"}`,
    },
    description,
    keywords,
    verification: {
      google: config.integrations?.googleVerification,
    },
    alternates: {
      canonical: path === "/" ? "./" : path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: config.siteName,
      images: ogImage ? [{ url: ogImage }] : [],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: config.social?.twitterCardType || "summary_large_image",
      title,
      description,
      creator: config.social?.twitterHandle,
      images: ogImage ? [ogImage] : [],
    },
    other: {
      "google-adsense-account": config.integrations?.adsenseId,
    },
  };
}
