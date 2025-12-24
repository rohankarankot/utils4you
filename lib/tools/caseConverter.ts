export function caseConvert(text: string, mode: 'upper'|'lower'|'title'|'sentence'){
  if (mode === 'upper') return text.toUpperCase();
  if (mode === 'lower') return text.toLowerCase();
  if (mode === 'title') return text.replace(/\w\S*/g, (w)=>w.charAt(0).toUpperCase()+w.substr(1).toLowerCase());
  if (mode === 'sentence') return text.charAt(0).toUpperCase()+text.slice(1).toLowerCase();
  return text;
}
