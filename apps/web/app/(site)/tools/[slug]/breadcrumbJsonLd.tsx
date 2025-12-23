export function breadcrumbJsonLd(tool: any){
  const baseUrl = 'https://mydailytools-pi.vercel.app';
  const itemList = [
    { "@type": "ListItem", position: 1, name: 'Home', item: baseUrl },
    { "@type": "ListItem", position: 2, name: 'Tools', item: `${baseUrl}/tools` },
    { "@type": "ListItem", position: 3, name: tool?.title || 'Tool', item: tool?.canonicalUrl || `${baseUrl}/tools/${tool?.slug?.current || ''}` }
  ];
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: itemList };
}
