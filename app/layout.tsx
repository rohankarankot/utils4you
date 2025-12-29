import React from "react";
import Script from "next/script";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Layout from "../components/Layout";
import InstallPrompt from "../components/InstallPrompt";
import GlobalSchema from "../components/GlobalSchema";

import { generateSiteMetadata, getSiteConfig } from "../lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateMetadata() {
  const metadata = await generateSiteMetadata("/");
  return {
    ...metadata,
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Utils4You",
    },
    icons: {
      icon: "/icon-192.png",
      apple: "/icon-512.png",
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();
  const adsenseId = config?.integrations?.adsenseId || "ca-pub-4316956546209623";

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <GlobalSchema />
        <InstallPrompt />
        {children}
      </body>
    </html>
  );
}
