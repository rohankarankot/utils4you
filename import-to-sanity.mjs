import createClient from "@sanity/client";
import fs from "fs";

// Configuration from user
const projectId = "rzrp85q6";
const dataset = "production";
const token = process.env.SANITY_AUTH_TOKEN; // User will need to provide this or run 'sanity login'

if (!token) {
  console.error("❌ Error: SANITY_AUTH_TOKEN is missing.");
  console.log("Please export it: export SANITY_AUTH_TOKEN='your_token_here'");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2023-10-10",
  useCdn: false,
});

const data = JSON.parse(fs.readFileSync("./tool-data-export.json", "utf8"));

async function importData() {
  console.log("🚀 Starting Sanity Import...");

  for (const [slug, content] of Object.entries(data)) {
    console.log(`📦 Importing: ${slug}...`);

    const doc = {
      _type: "tool",
      _id: `tool-${slug}`, // Deterministic ID
      title: content.title.split("–")[0].trim(), // Clean title for Sanity
      slug: {
        _type: "slug",
        current: slug,
      },
      shortDescription: content.description,
      heroTitle: content.heroTitle,
      heroSubtitle: content.heroSubtitle,
      showAdsense: true,
      seo: {
        title: content.title,
        description: content.description,
        keywords: content.keywords,
      },
      faqs: content.faqs.map((faq, index) => ({
        _key: `faq-${index}`,
        question: faq.question,
        answer: [
          {
            _key: `ans-${index}`,
            _type: "block",
            children: [
              {
                _key: `span-${index}`,
                _type: "span",
                text: faq.answer,
              },
            ],
            markDefs: [],
            style: "normal",
          },
        ],
      })),
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✅ Character Counter: Successfully imported ${slug}`);
    } catch (err) {
      console.error(`❌ Error importing ${slug}:`, err.message);
    }
  }

  console.log("🏁 Import complete!");
}

importData();
