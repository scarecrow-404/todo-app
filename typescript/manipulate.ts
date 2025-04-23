export function manipulate(input: string): string[] {
  if (input.length <= 1) {
    return [input];
  }
  const result = new Set<string>();
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const remainingChars = input.slice(0, i) + input.slice(i + 1);
    const remainingManipulate = manipulate(remainingChars);
    for (const perm of remainingManipulate) {
      result.add(char + perm);
    }
  }
  return Array.from(result);
}
