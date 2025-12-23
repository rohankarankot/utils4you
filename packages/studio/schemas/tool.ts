export default {
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'category', type: 'string', options: { list: [ { title: 'Text Tools', value: 'text-tools' }, { title: 'Calculators', value: 'calculators' } ] } },
    { name: 'shortDescription', type: 'text' },
    { name: 'heroTitle', type: 'string', title: 'Hero Title', description: 'Main heading on the page if different from title' },
    { name: 'heroSubtitle', type: 'text', title: 'Hero Subtitle', description: 'Intro paragraph below the main heading' },
    { name: 'longDescription', type: 'array', of: [{ type: 'block' }] },
    { name: 'faqs', type: 'array', of: [{ type: 'faq' }] },
    { name: 'seo', type: 'object', fields: [ 
        { name: 'title', type: 'string' }, 
        { name: 'description', type: 'text' },
        { name: 'keywords', type: 'array', of: [{ type: 'string' }] }
    ] },
    { name: 'canonicalUrl', type: 'url' },
    { name: 'showAdsense', type: 'boolean', title: 'Show AdSense', initialValue: true }
  ]
}
