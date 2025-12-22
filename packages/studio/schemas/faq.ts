export default {
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    { name: 'question', type: 'string' },
    { name: 'answer', type: 'array', of: [{ type: 'block' }] }
  ]
}
