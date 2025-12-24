import React from "react";
import Script from "next/script";
import "./globals.css";
import Layout from "../components/Layout";

export const metadata = {
  metadataBase: new URL("https://mydailytools-pi.vercel.app/"),
  title: {
    default: "OmniTools – Free Online Utility Tools & Calculators",
    template: "%s | OmniTools",
  },
  description: "Fast, accessible, and high-performance online utility tools for Indian users. OmniTools provides calculators, text tools, and more.",
  keywords: ["online tools", "EMI calculator", "SIP calculator", "GST calculator", "age calculator", "text processing", "OmniTools"],
  verification: {
    google: "ZU9HnTgzLCfpRJSYlE6hx8g-X9IwEq93c-zW42Fn7t0",
  },
  alternates: {
    canonical: "./",
  },
  other: {
    "google-adsense-account": "ca-pub-4316956546209623",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4316956546209623"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
