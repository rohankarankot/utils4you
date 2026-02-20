import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import tool from "./sanity/schemas/tool";
import faq from "./sanity/schemas/faq";
import siteConfig from "./sanity/schemas/siteConfig";

import page from "./sanity/schemas/page";
import developer from "./sanity/schemas/developer";
import homepage from "./sanity/schemas/homepage";
import example from "./sanity/schemas/example";

import post from "./sanity/schemas/post";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  name: "utils4you-studio",
  title: "Utils4You Studio",
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: {
    types: [tool, faq, siteConfig, page, developer, homepage, post, example],
  },
});
// Force Sanity rebuild
