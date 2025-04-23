export function countSmileyFace(texts: string[]): number {
  const pattern = /[:;][-~]?[)D]/;
  let count = 0;
  for (const text of texts) {
    if (pattern.test(text)) {
      count++;
    }
  }
  return count;
}
