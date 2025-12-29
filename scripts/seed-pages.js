const { createClient } = require('@sanity/client');

// You need a write token to run this script
// Get it from sanity.io/manage -> Project -> API -> Tokens
const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN || 'skyRJ66yoehknsn1y0m2YUR2pWM0P2FBhOWNd91CLPC025C2kRe796dOK4dC3EQx3ygFk3zghvOe5jmWHHzI5Xd01uxrVXC9hxg369OW4zfOpcsNFbBJ4iHQ0ufcatzPTENPQxJAWzR9CD3ofGudBLPp7BRWhP7UOWQnOHHRLdUiamFqzGhR';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rzrp85q6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-10',
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
});

const pages = [
  {
    _id: 'page-privacy-policy',
    _type: 'page',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy-policy' },
    lastUpdated: '2023-12-24',
    seo: {
      title: 'Privacy Policy – Your Data & Local Security | Utils4You',
      description: 'Read our commitment to your privacy. Learn how Utils4You processes all calculator and text data locally in your browser for maximum security.'
    },
    highlights: [
      {
        _key: 'h1',
        icon: 'Lock',
        title: 'Local-Only Processing',
        content: 'Unlike traditional online tools, Utils4You utilizes modern browser-based technology. This means your text, loan details, and personal calculations are processed entirely on your device. We do not store, see, or transmit your calculation data to our servers.'
      },
      {
        _key: 'h2',
        icon: 'ShieldCheck',
        title: 'Google AdSense & Cookies',
        content: 'We use Google AdSense to serve ads. Google uses cookies to serve ads based on a user\'s prior visits to our website or other websites. You may opt out of personalized advertising by visiting Ads Settings.'
      },
      {
        _key: 'h3',
        icon: 'EyeOff',
        title: 'Information We Collect',
        content: 'We collect only standard, non-personally identifiable server logs (IP address, browser type) to help us diagnose technical issues. We do not require account creation or personal information to use our tools.'
      }
    ],
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'c1', _type: 'span', text: 'Specific Disclosures for Google AdSense' }]
      },
      {
        _key: 'b2',
        _type: 'block',
        children: [{ _key: 'c2', _type: 'span', text: 'This website uses Google AdSense, a service provided by Google Inc. Google uses certain technologies (such as cookies or web beacons) when it serves ads on our site. The information collected through these technologies is used to:' }]
      },
      {
        _key: 'b3',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 'c3', _type: 'span', text: 'Measure the effectiveness of advertising campaigns.' }]
      },
      {
        _key: 'b4',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 'c4', _type: 'span', text: 'Personalize the advertising content that you see.' }]
      },
      {
        _key: 'b5',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 'c5', _type: 'span', text: 'Third-party vendors, including Google, use cookies to serve ads based on a user\'s prior visits to your website or other websites.' }]
      },
      {
        _key: 'b6',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'c6', _type: 'span', text: 'Log Files' }]
      },
      {
        _key: 'b7',
        _type: 'block',
        children: [{ _key: 'c7', _type: 'span', text: 'Like many other Web sites, Utils4You makes use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user’s movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.' }]
      },
      {
        _key: 'b8',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'c8', _type: 'span', text: 'Our Commitment to Security' }]
      },
      {
        _key: 'b9',
        _type: 'block',
        children: [{ _key: 'c9', _type: 'span', text: 'We have put in place appropriate physical, electronic, and managerial procedures to safeguard and help prevent unauthorized access, maintain data security, and correctly use the information we collect online. However, please remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure.' }]
      },
      {
        _key: 'b10',
        _type: 'contactSection',
        title: 'Contact Us',
        content: 'If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this web site, please contact us through our primary channels.',
      }
    ]
  },
  {
    _id: 'page-terms-and-conditions',
    _type: 'page',
    title: 'Terms and Conditions',
    slug: { _type: 'slug', current: 'terms-and-conditions' },
    lastUpdated: '2023-12-24',
    seo: {
      title: 'Terms and Conditions – Usage Guidelines | Utils4You',
      description: 'Read the Terms and Conditions of Utils4You. Understand your rights, our liability disclaimers, and the guidelines for using our free online utility tools.'
    },
    highlights: [
      {
        _key: 'th1',
        icon: 'AlertTriangle',
        title: 'Accuracy Disclaimer',
        content: 'Calculations provided by our tools are estimates. We do not guarantee 100% accuracy and recommend consulting professional advisors for financial or legal decisions.'
      },
      {
        _key: 'th2',
        icon: 'Scale',
        title: 'Limitation of Liability',
        content: 'Utils4You and its owners shall not be held liable for any direct or indirect damages arising from the use or inability to use our platform or its tools.'
      },
      {
        _key: 'th3',
        icon: 'Globe',
        title: 'Governing Law',
        content: 'These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.'
      }
    ],
    content: [
      {
        _key: 'tb1',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'tc1', _type: 'span', text: '1. Acceptance of Terms' }]
      },
      {
        _key: 'tb2',
        _type: 'block',
        children: [{ _key: 'tc2', _type: 'span', text: 'By accessing and using [https://www.utils4you.in/](https://www.utils4you.in/), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.' }]
      },
      {
        _key: 'tb3',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'tc3', _type: 'span', text: '2. Use License' }]
      },
      {
        _key: 'tb4',
        _type: 'block',
        children: [{ _key: 'tc4', _type: 'span', text: 'Permission is granted to temporarily use the tools on Utils4You for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:' }]
      },
      {
        _key: 'tb5',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 'tc5', _type: 'span', text: 'Modify or copy the materials;' }]
      },
      {
        _key: 'tb6',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 'tc6', _type: 'span', text: 'Use the materials for any commercial purpose, or for any public display;' }]
      },
      {
        _key: 'tb7',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 'tc7', _type: 'span', text: 'Attempt to decompile or reverse engineer any software contained on the website;' }]
      },
      {
        _key: 'tb8',
        _type: 'block',
        listItem: 'bullet',
        children: [{ _key: 'tc8', _type: 'span', text: 'Remove any copyright or other proprietary notations from the materials.' }]
      },
      {
        _key: 'tb9',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'tc9', _type: 'span', text: '3. Disclaimer for Financial Tools' }]
      },
      {
        _key: 'tb10',
        _type: 'block',
        children: [{ _key: 'tc10', _type: 'span', text: 'The financial calculators (including EMI, GST, and SIP calculators) provided on this website are for informational purposes only. The results are generated based on the inputs provided and standard mathematical formulas. They do not constitute financial advice, and actual figures from banks or financial institutions may vary due to specific terms, taxes, or rounding methods. Always verify results with a qualified professional before making financial commitments.' }]
      },
      {
        _key: 'tb11',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'tc11', _type: 'span', text: '4. Intellectual Property' }]
      },
      {
        _key: 'tb12',
        _type: 'block',
        children: [{ _key: 'tc12', _type: 'span', text: 'The content, structure, design, and code of Utils4You are the intellectual property of its owners. Unauthorized reproduction or distribution of any part of this website is strictly prohibited.' }]
      },
      {
        _key: 'tb13',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'tc13', _type: 'span', text: '5. Changes to Terms' }]
      },
      {
        _key: 'tb14',
        _type: 'block',
        children: [{ _key: 'tc14', _type: 'span', text: 'Utils4You reserves the right to revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.' }]
      }
    ]
  },
  {
    _id: 'page-about',
    _type: 'page',
    title: 'About Us',
    slug: { _type: 'slug', current: 'about' },
    seo: {
      title: 'About Us – Our Mission & Values | Utils4You',
      description: 'Learn about Utils4You, our commitment to privacy, speed, and providing high-quality free online utility tools for Indian users.'
    },
    highlights: [
      {
        _key: 'ah1',
        icon: 'Shield',
        title: 'Privacy First',
        content: 'Your data never leaves your browser. All calculations and text processing happen locally on your device.'
      },
      {
        _key: 'ah2',
        icon: 'Zap',
        title: 'Blazing Fast',
        content: 'Optimized for performance. Our tools load instantly and provide real-time results as you type.'
      },
      {
        _key: 'ah3',
        icon: 'Heart',
        title: 'Simple & Free',
        content: 'No hidden costs, no subscriptions. Just clean, useful tools designed for everyday productivity.'
      }
    ],
    content: [
      {
        _key: 'ab1',
        _type: 'block',
        style: 'h2',
        children: [{ _key: 'ac1', _type: 'span', text: 'Our Story' }]
      },
      {
        _key: 'ab2',
        _type: 'block',
        children: [{ _key: 'ac2', _type: 'span', text: 'Utils4You started as a response to the cluttered and often intrusive landscape of online utility tools. We noticed that many existing calculators and text processors were slow, loaded with intrusive ads, and, most importantly, often lacked transparent privacy practices.' }]
      },
      {
        _key: 'ab3',
        _type: 'block',
        children: [{ _key: 'ac3', _type: 'span', text: 'We set out to build a platform that focused on three pillars: India-centric features, Browser-based processing, and Minimalist design. Today, we serve thousands of Indian users every day—from small business owners calculating GST to students counting words for their next big assignment.' }]
      }
    ],
    footer: {
      title: 'Start Being More Productive',
      description: 'Join thousands of users who trust Utils4You for their daily utility needs.',
      buttonText: 'Explore All Tools',
      buttonLink: '/tools'
    }
  },
  {
    _id: 'page-home',
    _type: 'page',
    title: 'Home',
    slug: { _type: 'slug', current: 'home' },
    seo: {
      title: 'Utils4You – Free Online Tools for Daily Productivity',
      description: 'Experience the power of Utils4You. Fast, secure, and private online tools for text processing, financial calculations, and professional utility.',
      keywords: ['Utils4You', 'free online tools', 'best utility tools', 'text tools', 'financial calculators India'],
    }
  },
  {
    _id: 'page-tools',
    _type: 'page',
    title: 'All Tools',
    slug: { _type: 'slug', current: 'tools' },
    seo: {
      title: 'All Productivity & Financial Tools – Utils4You Utility Hub',
      description: 'Browse our complete directory of free online utility tools. From GST and EMI calculators to word counters and slug generators, find everything you need for daily productivity on Utils4You.',
      keywords: ['Utils4You', 'online utility tools', 'financial calculators', 'text processing tools', 'free online calculators', 'productivity tools hub'],
    }
  }
];

async function seed() {
  try {
    console.log('Seeding pages with SEO data...');
    for (const page of pages) {
      await client.createOrReplace(page);
      console.log(`✅ Seeded: ${page.title}`);
    }
    console.log('✅ All pages successfully seeded!');
  } catch (err) {
    console.error('Failed to seed pages:', err.message);
  }
}

seed();
