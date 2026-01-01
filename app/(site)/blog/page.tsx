import Link from "next/link";
import { sanityClient, urlFor } from "../../../lib/sanityClient";
import Image from "next/image";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Utils4You",
    description: "Latest guides, tutorials, and updates from Utils4You.",
};

export const revalidate = 0;

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

            <div className="space-y-16">
                {posts.length === 0 && (
                    <div className="py-12 text-center text-[var(--muted)]">
                        No posts found. Check back soon!
                    </div>
                )}

                {(() => {
                    const allCategories = Array.from(new Set(posts.flatMap((p: any) => p.categories || []))).sort();

                    // Filter out categories with no posts (though logic above ensures they exist) 
                    // and maybe sort by interesting ones if we wanted.
                    // For now, simple alphabetical sort of categories.

                    return allCategories.map((category: any) => {
                        const categoryPosts = posts.filter((p: any) => p.categories?.includes(category));
                        if (categoryPosts.length === 0) return null;

                        return (
                            <section key={category} className="scroll-mt-20" id={category.toLowerCase().replace(/\s+/g, '-')}>
                                <div className="flex items-center gap-4 mb-6">
                                    <h2 className="text-2xl font-bold">{category}</h2>
                                    <div className="h-px flex-1 bg-[var(--surface-border)]"></div>
                                    <Link href={`#${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-[var(--primary)] hover:underline">
                                        View All
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {categoryPosts.map((post: any) => (
                                        <Link
                                            key={`${category}-${post.slug.current}`}
                                            href={`/blog/${post.slug.current}`}
                                            className="card group hover:scale-[1.02] transition-transform flex flex-col h-full"
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
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-[var(--muted)] line-clamp-3 mb-4 flex-1">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {post.categories?.slice(0, 3).map((cat: string) => (
                                                    <span key={cat} className="text-[10px] uppercase font-bold tracking-wider bg-[var(--surface-border)] px-2 py-1 rounded-sm text-[var(--muted)]">
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        );
                    });
                })()}
            </div>
        </main>
    );
}
