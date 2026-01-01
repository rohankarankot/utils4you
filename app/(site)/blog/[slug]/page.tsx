import React from "react";
import Link from "next/link";
import { sanityClient, urlFor } from "../../../../lib/sanityClient";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 3600; // ISR for blogs

async function getPost(slug: string) {
    const query = `*[_type == "post" && slug.current == $slug][0] {
    ...,
    "authorName": author,
    "related": *[_type == "post" && count(categories[@ in ^.categories]) > 0 && slug.current != $slug] | order(publishedAt desc) [0...3] {
      title,
      slug
    }
  }`;
    return await sanityClient.fetch(query, { slug });
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = await getPost(params.slug);
    if (!post) return {};

    return {
        title: post.seo?.title || post.title,
        description: post.seo?.description || post.excerpt,
        openGraph: {
            title: post.seo?.title || post.title,
            description: post.seo?.description || post.excerpt,
            images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
        },
    };
}

const components = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <div className="relative w-full aspect-video my-8 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <Image
                        src={urlFor(value).width(800).fit("max").url()}
                        alt={value.alt || "Blog Image"}
                        fill
                        className="object-contain"
                    />
                </div>
            );
        },
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            const target = value.blank ? '_blank' : undefined;
            return (
                <Link href={value.href} rel={rel} target={target} className="text-[var(--primary)] hover:underline">
                    {children}
                </Link>
            );
        },
    },
};

export default async function BlogPost({
    params,
}: {
    params: { slug: string };
}) {
    const post = await getPost(params.slug);

    if (!post) notFound();

    return (
        <main>
            <Breadcrumbs
                items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
            />

            <article className="max-w-4xl mx-auto">
                <header className="mb-8 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-[var(--muted)] mb-4">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full font-medium">
                            {post.categories?.[0] || "Guide"}
                        </span>
                        <span>
                            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                        {post.title}
                    </h1>
                    {post.authorName && (
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-lg font-bold">
                                {post.authorName.charAt(0)}
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-sm">{post.authorName}</p>
                                <p className="text-xs text-[var(--muted)]">Editor</p>
                            </div>
                        </div>
                    )}
                </header>

                {post.mainImage && (
                    <div className="relative aspect-[21/9] mb-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-lg">
                        <Image
                            src={urlFor(post.mainImage).width(1200).height(600).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose dark:prose-invert max-w-none prose-lg prose-blue">
                    {/* Table of Contents? Maybe later if requested. For now just content */}
                    <PortableText value={post.body} components={components} />
                </div>

                <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl">
                        <div className="flex-1">
                            <h3 className="font-bold mb-1">Written by {post.authorName}</h3>
                            <p className="text-sm text-[var(--muted)]">
                                Passionate about making productivity tools accessible to everyone.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
}
