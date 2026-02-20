import React from "react";
import Link from "next/link";
import { sanityClient, urlFor } from "../lib/sanityClient";
import Image from "next/image";

async function getRelatedPosts(currentSlug: string) {
    const query = `*[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
        title,
        "slug": slug.current,
        excerpt,
        mainImage
    }`;
    return await sanityClient.fetch(query, { currentSlug });
}

export default async function RelatedBlogPosts({ currentSlug }: { currentSlug: string }) {
    const posts = await getRelatedPosts(currentSlug);

    if (posts.length === 0) return null;

    return (
        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-8">Related Articles & Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post: any) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                        {post.mainImage && (
                            <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                                <Image
                                    src={urlFor(post.mainImage).width(400).height(225).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                        <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                            {post.excerpt}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
