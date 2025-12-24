import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import tool from "./sanity/schemas/tool";
import faq from "./sanity/schemas/faq";
import siteConfig from "./sanity/schemas/siteConfig";

import page from "./sanity/schemas/page";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rzrp85q6";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  name: "tools-studio",
  title: "Tools Studio",
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: {
    types: [tool, faq, siteConfig, page],
  },
});
