export default {
  name: 'siteConfig',
  title: 'Site Config',
  type: 'document',
  fields: [
    { name: 'siteTitle', type: 'string' },
    { name: 'siteDescription', type: 'text' },
    { name: 'defaultSEO', type: 'object', fields: [ { name: 'title', type: 'string' }, { name: 'description', type: 'text' } ] }
  ]
}
