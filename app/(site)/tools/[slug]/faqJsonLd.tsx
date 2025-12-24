export function faqJsonLd(tool: any){
  if (!tool?.faqs) return null;
  const faqs = tool.faqs.map((f:any)=>({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: (f.answer||[]).map((b:any)=>b.children?.map((c:any)=>c.text).join('')).join('\n') }
  }));
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
  };
}
