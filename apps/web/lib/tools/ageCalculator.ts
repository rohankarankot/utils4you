export function calculateAge(birthDate: string | Date) {
  const b = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  if (isNaN(b.getTime())) throw new Error('Invalid date');
  const now = new Date();
  let years = now.getFullYear() - b.getFullYear();
  let months = now.getMonth() - b.getMonth();
  let days = now.getDate() - b.getDate();
  if (days < 0) { months -= 1; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (months < 0) { years -= 1; months += 12; }
  return { years, months, days };
}
