import React from "react";
import { sanityClient, urlFor } from "../../../lib/sanityClient";
import { PortableText } from "next-sanity";
import { Github, Linkedin, Instagram, Globe, Twitter } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Profile | Utils4You",
  description: "Meet the developer behind Utils4You.",
};

async function getDeveloperProfile() {
  const query = `*[_type == "developer"][0]`;
  const developer = await sanityClient.fetch(query);
  return developer;
}

export default async function DeveloperPage() {
  const developer = await getDeveloperProfile();

  if (!developer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Developer Profile Not Found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github": return <Github size={24} />;
      case "linkedin": return <Linkedin size={24} />;
      case "instagram": return <Instagram size={24} />;
      case "twitter": return <Twitter size={24} />;
      default: return <Globe size={24} />;
    }
  };

  return (
    <main className="min-h-screen pb-20">
      <div className="relative h-64 sm:h-80 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        {developer.coverImage && (
          <img
            src={urlFor(developer.coverImage).width(1200).height(400).url()}
            alt="Cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative -mt-32">
        <div className="bg-[var(--surface)] rounded-2xl shadow-xl overflow-hidden border border-[var(--surface-border)]">
          <div className="p-6 sm:p-10 flex flex-col items-center text-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-[var(--surface)] shadow-lg overflow-hidden mb-6 bg-slate-200 dark:bg-slate-800 relative z-10">
              {developer.image ? (
                <img
                  src={urlFor(developer.image).width(400).height(400).url()}
                  alt={developer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-400">
                  {developer.name.charAt(0)}
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{developer.name}</h1>
            {developer.role && (
              <p className="text-lg text-[var(--primary)] font-medium mb-6">{developer.role}</p>
            )}

            <div className="flex gap-4 mb-8 justify-center flex-wrap">
              {developer.socialLinks && developer.socialLinks.map((link: any) => (
                <a
                  key={link._key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--primary)] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all transform hover:-translate-y-1 shadow-sm border border-[var(--surface-border)]"
                  aria-label={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>

            {developer.bio && (
              <div className="prose dark:prose-invert max-w-2xl text-[var(--muted)] text-lg leading-relaxed">
                <PortableText value={developer.bio} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline">
            ← Back to Tools
          </Link>
        </div>
      </div>
    </main>
  );
}
