const tools = [
  {
    _type: 'tool',
    title: 'Word Counter',
    slug: { current: 'word-counter' },
    category: 'text-tools',
    shortDescription: 'Count words in your text quickly.',
    longDescription: [
      { _type: 'block', children: [{ text: 'Word Counter is a tool to count words.' }] }
    ],
    faqs: [ { _type: 'faq', question: 'How to use?', answer: [{ _type: 'block', children: [{ text: 'Paste text.' }] }] } ],
    seo: { title: 'Word Counter - Free Tool', description: 'Count words quickly.' },
    canonicalUrl: 'https://example.com/tools/word-counter'
  },
  {
    _type: 'tool',
    title: 'EMI Calculator',
    slug: { current: 'emi-calculator' },
    category: 'calculators',
    shortDescription: 'Calculate your loan EMI with this easy tool.',
    longDescription: [ { _type: 'block', children: [{ text: 'EMI Calculator content placeholder...' }] } ],
    faqs: [ { _type: 'faq', question: 'What is EMI?', answer: [{ _type: 'block', children: [{ text: 'EMI stands for Equated Monthly Installment.' }] }] } ],
    seo: { title: 'EMI Calculator - Loan EMI Calculator', description: 'Calculate loan EMIs for home, car and personal loans.' },
    canonicalUrl: 'https://example.com/tools/emi-calculator'
  },
  {
    _type: 'tool',
    title: 'SIP Calculator',
    slug: { current: 'sip-calculator' },
    category: 'calculators',
    shortDescription: 'Estimate SIP returns for mutual funds in India.',
    longDescription: [ { _type: 'block', children: [{ text: 'SIP Calculator content placeholder...' }] } ],
    faqs: [ { _type: 'faq', question: 'How to calculate SIP returns?', answer: [{ _type: 'block', children: [{ text: 'SIP uses compound interest formula.' }] }] } ],
    seo: { title: 'SIP Calculator - Mutual Fund SIP Calculator', description: 'Estimate returns from monthly SIP investments.' },
    canonicalUrl: 'https://example.com/tools/sip-calculator'
  }
];

module.exports = tools;
