import React from "react";
import Link from "next/link";
import { sanityClient } from "../lib/sanityClient";

async function getRecentPosts() {
    const query = `*[_type == "post"] | order(publishedAt desc) [0...15] {
    title,
    "slug": slug.current
  }`;
    return await sanityClient.fetch(query);
}

export default async function BlogSidebar() {
    const posts = await getRecentPosts();

    return (
        <div className="card bg-slate-50/50 dark:bg-slate-900/20 border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Reads</p>
            <nav className="flex flex-col gap-3">
                {posts.map((post: any) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="text-sm font-medium hover:text-blue-500 transition-colors line-clamp-2 leading-snug"
                    >
                        {post.title}
                    </Link>
                ))}
                {posts.length === 0 && (
                    <p className="text-sm text-[var(--muted)]">No posts found.</p>
                )}
            </nav>
        </div>
    );
}
