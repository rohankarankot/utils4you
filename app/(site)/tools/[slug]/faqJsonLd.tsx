export function faqJsonLd(tool: any) {
  if (!tool?.faqs || tool.faqs.length === 0) return null;

  const faqs = tool.faqs.map((f: any) => {
    // Extract text from portable text blocks safely
    const answerText = (f.answer || [])
      .map((block: any) => {
        if (block._type !== 'block' || !block.children) return '';
        return block.children.map((child: any) => child.text).join('');
      })
      .filter((text: string) => text.length > 0)
      .join('\n\n');

    return {
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answerText
      }
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
  };
}
