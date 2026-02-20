export default {
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    {
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Text Tools', value: 'text-tools' },
          { title: 'Financial Calculators', value: 'financial-calculators' },
          { title: 'Health Calculators', value: 'health-calculators' },
          { title: 'Developer Tools', value: 'developer-tools' },
          { title: 'Image Tools', value: 'image-tools' }
        ]
      }
    },
    { name: 'shortDescription', type: 'text' },
    { name: 'heroTitle', type: 'string', title: 'Hero Title', description: 'Main heading on the page if different from title' },
    { name: 'heroSubtitle', type: 'text', title: 'Hero Subtitle', description: 'Intro paragraph below the main heading' },
    { name: 'longDescription', type: 'array', of: [{ type: 'block' }] },

    // New SEO ToolContent Fields
    { name: 'toolName', type: 'string', title: 'Tool Name', description: 'Name of the tool for SEO block (e.g. EMI Calculator)' },
    { name: 'toolDescription', type: 'text', title: 'Tool Description', description: 'What is this tool and what does it do?' },
    { name: 'howToUse', type: 'array', of: [{ type: 'string' }], title: 'How to Use Steps' },
    { name: 'formula', type: 'string', title: 'Formula / Logic', description: 'Mathematical formula or logic explanation (optional)' },
    { name: 'examples', type: 'array', of: [{ type: 'example' }], title: 'Examples' },
    { name: 'benefits', type: 'array', of: [{ type: 'string' }], title: 'Benefits List' },

    { name: 'faqs', type: 'array', of: [{ type: 'faq' }] },
    {
      name: 'seo', type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'keywords', type: 'array', of: [{ type: 'string' }] },
        { name: 'ogImage', type: 'image', title: 'OG Image', description: 'Social sharing image (1200x630px recommended)' }
      ]
    },
    { name: 'canonicalUrl', type: 'url' },
    { name: 'showAdsense', type: 'boolean', title: 'Show AdSense', initialValue: true }
  ]
}
