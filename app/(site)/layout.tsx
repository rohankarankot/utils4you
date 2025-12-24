import React from "react";
import Layout from "../../components/Layout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
