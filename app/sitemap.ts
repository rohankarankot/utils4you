import { MetadataRoute } from "next";
import { sanityClient } from "../lib/sanityClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.utils4you.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch Tools
    const tools = await sanityClient.fetch(`*[_type == "tool"]{ "slug": slug.current, _updatedAt }`);
    const toolsUrls = tools.map((tool: any) => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: tool._updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
    }));

    // Fetch Blog Posts
    const posts = await sanityClient.fetch(`*[_type == "post"]{ "slug": slug.current, publishedAt }`);
    const postsUrls = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    // Fetch Legal Pages (since we store them in Sanity as 'page', we can check their updated time)
    // But the routes are hardcoded in Next.js structure.
    const legalPages = ["about", "privacy-policy", "terms-and-conditions", "contact-us"];
    const legalUrls = legalPages.map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.5,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/tools`,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/developer`,
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        ...toolsUrls,
        ...postsUrls,
        ...legalUrls,
    ];
}
