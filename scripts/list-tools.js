const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rzrp85q6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-10',
  useCdn: false,
});

async function listTools() {
  try {
    const tools = await client.fetch('*[_type == "tool"] { title, "slug": slug.current, category }');
    console.log(JSON.stringify(tools, null, 2));
  } catch (err) {
    console.error('Error fetching tools:', err.message);
  }
}

listTools();
