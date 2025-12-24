import { groq } from "next-sanity";
import { sanityClient } from "./sanityClient";

export async function getPageData(slug: string) {
  return sanityClient.fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
      title,
      lastUpdated,
      highlights,
      content,
      footer,
      seo {
        title,
        description,
        keywords,
        "ogImage": ogImage.asset->url
      }
    }`,
    { slug }
  );
}
