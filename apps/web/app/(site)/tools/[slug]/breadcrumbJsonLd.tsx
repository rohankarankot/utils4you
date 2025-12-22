export function breadcrumbJsonLd(tool: any){
  const itemList = [
    { "@type": "ListItem", position: 1, name: 'Home', item: 'https://example.com' },
    { "@type": "ListItem", position: 2, name: 'Tools', item: 'https://example.com/tools' },
    { "@type": "ListItem", position: 3, name: tool?.title || 'Tool', item: tool?.canonicalUrl || 'https://example.com/tools' }
  ];
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: itemList };
}
