export function findOddNumber(numbers: number[]): number {
  const counts: { [key: number]: number } = {};

  for (const number of numbers) {
    counts[number] = (counts[number] || 0) + 1;
  }

  for (const number in counts) {
    if (counts[number] % 2 !== 0) {
      return parseInt(number, 10);
    }
  }

  throw new Error("No odd number found in the array.");
}
