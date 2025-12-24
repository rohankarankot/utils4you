import React from "react";
import { generateSiteMetadata } from "../../../lib/seo";
import { getPageData } from "../../../lib/queries";
import SanityPage from "../../../components/SanityPage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  return await generateSiteMetadata("/terms-and-conditions");
}

export default async function TermsPage() {
  const data = await getPageData("terms-and-conditions");

  if (!data) {
    notFound();
  }

  return <SanityPage data={data} />;
}
