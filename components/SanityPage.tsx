import React from "react";
import { PortableText } from "@portabletext/react";
import { Lock, ShieldCheck, EyeOff, Cookie, Shield, Zap, Heart, CheckCircle, Scale, AlertTriangle, FileText, Globe } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Lock: <Lock className="text-blue-600" size={24} />,
  ShieldCheck: <ShieldCheck className="text-green-600" size={24} />,
  EyeOff: <EyeOff className="text-purple-600" size={24} />,
  Cookie: <Cookie className="text-blue-600" />,
  Shield: <Shield className="text-blue-600" size={32} />,
  Zap: <Zap className="text-yellow-500" size={32} />,
  Heart: <Heart className="text-red-500" size={32} />,
  CheckCircle: <CheckCircle className="text-green-500 shrink-0 mt-1" size={24} />,
  Scale: <Scale className="text-blue-600" size={24} />,
  AlertTriangle: <AlertTriangle className="text-amber-500" size={24} />,
  FileText: <FileText className="text-blue-600" />,
  Globe: <Globe className="text-green-600" size={24} />,
};

const components = {
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-12 mb-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-8 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
  },
  types: {
    contactSection: ({ value }: any) => (
      <section className="bg-slate-900 text-white p-8 rounded-3xl mt-12">
        <h2 className="text-2xl font-bold text-white mt-0">{value.title}</h2>
        <p className="text-slate-300">
          {value.content}
        </p>
        {value.email && (
          <a href={`mailto:${value.email}`} className="text-blue-400 hover:text-blue-300 underline underline-offset-4 mt-4 inline-block">
            {value.email}
          </a>
        )}
      </section>
    )
  }
};

interface SanityPageProps {
  data: any;
}

export default function SanityPage({ data }: SanityPageProps) {
  if (!data) return null;

  const { title, lastUpdated, highlights, content, footer } = data;

  return (
    <main className="max-w-4xl mx-auto py-8">
      <header className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white leading-tight">
          {title}
        </h1>
        {lastUpdated && (
          <p className="text-lg text-[var(--muted)]">
            Last Updated: {new Date(lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
      </header>

      {highlights && highlights.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((s: any, i: number) => (
            <div key={i} className="card p-6 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10">
              <div className="mb-4">{iconMap[s.icon] || <Shield />}</div>
              <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">{s.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{s.content}</p>
            </div>
          ))}
        </section>
      )}

      <article className="prose dark:prose-invert max-w-none">
        <PortableText value={content} components={components} />
      </article>

      {footer && (
        <footer className="text-center bg-slate-900 dark:bg-blue-600 rounded-3xl p-12 text-white overflow-hidden relative mt-20">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">{footer.title}</h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">{footer.description}</p>
            <a href={footer.buttonLink || "/tools"} className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-slate-900 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 shadow-lg">
              {footer.buttonText || "Explore All Tools"}
            </a>
          </div>
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
        </footer>
      )}
    </main>
  );
}
