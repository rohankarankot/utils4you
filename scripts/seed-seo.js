const { createClient } = require('@sanity/client');

// You need a write token to run this script
const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN || 'skyRJ66yoehknsn1y0m2YUR2pWM0P2FBhOWNd91CLPC025C2kRe796dOK4dC3EQx3ygFk3zghvOe5jmWHHzI5Xd01uxrVXC9hxg369OW4zfOpcsNFbBJ4iHQ0ufcatzPTENPQxJAWzR9CD3ofGudBLPp7BRWhP7UOWQnOHHRLdUiamFqzGhR';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rzrp85q6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-10',
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
});

const initialConfig = {
  _type: 'siteConfig',
  siteName: 'OmniTools',
  siteDescription: 'Fast, accessible, and high-performance online utility tools for Indian users.',
  metadataBase: 'https://mydailytools-pi.vercel.app/',
  seo: {
    titleTemplate: '%s | OmniTools',
    defaultTitle: 'OmniTools – Free Online Utility Tools & Calculators',
    description: 'Fast, accessible, and high-performance online utility tools for Indian users. OmniTools provides calculators, text tools, and more.',
    keywords: ['online tools', 'EMI calculator', 'SIP calculator', 'GST calculator', 'age calculator', 'text processing', 'OmniTools'],
  },
  social: {
    twitterHandle: '@omnitools',
    twitterCardType: 'summary_large_image',
  },
  integrations: {
    googleVerification: 'ZU9HnTgzLCfpRJSYlE6hx8g-X9IwEq93c-zW42Fn7t0',
    adsenseId: 'ca-pub-4316956546209623',
  }
};

async function seed() {
  try {
    console.log('Seeding site configuration...');
    await client.createOrReplace({
      _id: 'singleton-siteConfig',
      ...initialConfig
    });
    console.log('✅ SEO site configuration successfully seeded!');
  } catch (err) {
    console.error('Failed to seed:', err.message);
  }
}

seed();
