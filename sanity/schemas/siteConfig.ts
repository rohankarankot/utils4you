export default {
  name: "siteConfig",
  title: "Site Config",
  type: "document",
  fields: [
    { name: "siteName", title: "Site Name", type: "string" },
    { name: "siteDescription", title: "Site Description", type: "text" },
    { name: "metadataBase", title: "Metadata Base URL", type: "url", description: "e.g. https://mydailytools.com" },
    {
      name: "seo",
      title: "Default SEO",
      type: "object",
      fields: [
        { name: "titleTemplate", title: "Title Template", type: "string", description: "e.g. %s | OmniTools" },
        { name: "defaultTitle", title: "Default Title", type: "string" },
        { name: "description", title: "SEO Description", type: "text" },
        { name: "keywords", title: "Keywords", type: "array", of: [{ type: "string" }] },
        { name: "ogImage", title: "Open Graph Image", type: "image", options: { hotspot: true } },
      ],
    },
    {
      name: "social",
      title: "Social Media",
      type: "object",
      fields: [
        { name: "twitterHandle", title: "Twitter Handle", type: "string", description: "e.g. @omnitools" },
        { name: "twitterCardType", title: "Twitter Card Type", type: "string", options: { list: ["summary", "summary_large_image"] }, initialValue: "summary_large_image" },
      ],
    },
    {
      name: "integrations",
      title: "Integrations",
      type: "object",
      fields: [
        { name: "googleVerification", title: "Google Search Console Verification", type: "string" },
        { name: "adsenseId", title: "Google AdSense Publisher ID", type: "string", description: "e.g. ca-pub-XXXXXX" },
      ],
    },
  ],
};
