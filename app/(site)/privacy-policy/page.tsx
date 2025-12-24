import React from "react";
import { generateSiteMetadata } from "../../../lib/seo";
import { getPageData } from "../../../lib/queries";
import SanityPage from "../../../components/SanityPage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return await generateSiteMetadata("/privacy-policy");
}

export default async function PrivacyPage() {
  const data = await getPageData("privacy-policy");

  if (!data) {
    notFound();
  }

  return <SanityPage data={data} />;
}
