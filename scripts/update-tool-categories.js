const { createClient } = require('@sanity/client');

const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN || 'skyRJ66yoehknsn1y0m2YUR2pWM0P2FBhOWNd91CLPC025C2kRe796dOK4dC3EQx3ygFk3zghvOe5jmWHHzI5Xd01uxrVXC9hxg369OW4zfOpcsNFbBJ4iHQ0ufcatzPTENPQxJAWzR9CD3ofGudBLPp7BRWhP7UOWQnOHHRLdUiamFqzGhR';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rzrp85q6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-10',
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
});

const categorization = {
  // Text Tools
  'word-counter': 'text-tools',
  'character-counter': 'text-tools',
  'case-converter': 'text-tools',
  'remove-extra-spaces': 'text-tools',
  'slug-generator': 'text-tools',
  
  // Financial Calculators
  'emi-calculator': 'financial-calculators',
  'sip-calculator': 'financial-calculators',
  'gst-calculator': 'financial-calculators',
  
  // Health Calculators
  'age-calculator': 'health-calculators',
  'bmi-calculator': 'health-calculators',
  
  // Developer Tools
  'html-minify': 'developer-tools',
  'json-formatter': 'developer-tools',
};

async function updateCategories() {
  try {
    const tools = await client.fetch('*[_type == "tool"] { _id, "slug": slug.current }');
    
    console.log(`Found ${tools.length} tools. Updating categories...`);
    
    for (const tool of tools) {
      const category = categorization[tool.slug];
      if (category) {
        await client.patch(tool._id)
          .set({ category })
          .commit();
        console.log(`✅ Updated: ${tool.slug} -> ${category}`);
      } else {
        console.log(`⚠️ No category mapping for: ${tool.slug}`);
      }
    }
    
    console.log('✅ Tool categorization complete!');
  } catch (err) {
    console.error('Error updating tools:', err.message);
  }
}

updateCategories();
