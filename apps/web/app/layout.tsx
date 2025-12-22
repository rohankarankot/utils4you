import React from "react";
import "./globals.css";
import Layout from "../components/Layout";

export const metadata = {
  // site-level metadata available to the App Router
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
      <body>{children}</body>
    </html>
  );
}
