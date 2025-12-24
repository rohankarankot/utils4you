import React from "react";
import Script from "next/script";
import "./globals.css";
import Layout from "../components/Layout";

import { generateSiteMetadata, getSiteConfig } from "../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata("/");
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
    <html lang="en">
      <body className="antialiased">
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
