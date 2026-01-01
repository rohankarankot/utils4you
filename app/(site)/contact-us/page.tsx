import React from "react";
import { generateSiteMetadata } from "../../../lib/seo";
import { getPageData } from "../../../lib/queries";
import SanityPage from "../../../components/SanityPage";
import { notFound } from "next/navigation";

export async function generateMetadata() {
    return await generateSiteMetadata("/contact-us");
}

export default async function ContactPage() {
    const data = await getPageData("contact-us");

    if (!data) {
        notFound();
    }

    return <SanityPage data={data} />;
}
