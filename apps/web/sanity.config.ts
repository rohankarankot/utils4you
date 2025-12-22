import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import tool from "../../packages/studio/schemas/tool";
import faq from "../../packages/studio/schemas/faq";
import siteConfig from "../../packages/studio/schemas/siteConfig";

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
    types: [tool, faq, siteConfig],
  },
});
