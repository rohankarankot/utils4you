import React from "react";
import Layout from "../../components/Layout";

export default function SiteLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return <Layout sidebar={sidebar}>{children}</Layout>;
}
