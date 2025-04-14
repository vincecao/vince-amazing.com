'use client';

export function getCategoryColor(categories: string[], appearance: string): string {
  const hash = categories.reduce((acc, cat) => {
    return acc + Array.from(cat).reduce((catAcc, char) => catAcc + char.charCodeAt(0), 0) * cat.length;
  }, 0);

  const lightness = appearance === 'dark' ? 30 : 70;
  return `hsl(${hash % 270}, 15%, ${lightness}%)`;
}
