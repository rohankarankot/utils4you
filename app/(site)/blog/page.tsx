import Link from "next/link";
import { sanityClient, urlFor } from "../../../lib/sanityClient";
import Image from "next/image";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Utils4You",
    description: "Latest guides, tutorials, and updates from Utils4You.",
};

async function getPosts() {
    const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    categories
  }`;
    return await sanityClient.fetch(query);
}

export default async function BlogIndex() {
    const posts = await getPosts();

    return (
        <main>
            <Breadcrumbs items={[{ label: "Blog" }]} />
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Blog & Guides</h1>
                <p className="text-lg text-[var(--muted)]">
                    Tips, tricks, and tutorials to get the most out of our tools.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                    <Link
                        key={post.slug.current}
                        href={`/blog/${post.slug.current}`}
                        className="card group hover:scale-[1.02] transition-transform"
                    >
                        {post.mainImage && (
                            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                                <Image
                                    src={urlFor(post.mainImage).width(600).height(340).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-3">
                            <span>
                                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                            {post.categories && post.categories.length > 0 && (
                                <>
                                    <span>•</span>
                                    <span className="bg-[var(--surface-border)] px-2 py-0.5 rounded-full">
                                        {post.categories[0]}
                                    </span>
                                </>
                            )}
                        </div>
                        <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-sm text-[var(--muted)] line-clamp-3">
                            {post.excerpt}
                        </p>
                    </Link>
                ))}
                {posts.length === 0 && (
                    <div className="col-span-full py-12 text-center text-[var(--muted)]">
                        No posts found. Check back soon!
                    </div>
                )}
            </div>
        </main>
    );
}
