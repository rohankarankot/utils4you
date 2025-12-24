import React from "react";
import { generateSiteMetadata } from "../../../lib/seo";
import { getPageData } from "../../../lib/queries";
import SanityPage from "../../../components/SanityPage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return await generateSiteMetadata("/about");
}

export default async function AboutPage() {
  const data = await getPageData("about");

  if (!data) {
    notFound();
  }

  return <SanityPage data={data} />;
}
