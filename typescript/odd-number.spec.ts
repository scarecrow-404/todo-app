import { findOddNumber } from "./odd-number";

describe("findOddNumber", () => {
  it("should find the number that appears an odd number of times", () => {
    expect(findOddNumber([7])).toBe(7);
    expect(findOddNumber([0])).toBe(0);
    expect(findOddNumber([1, 1, 2])).toBe(2);
    expect(findOddNumber([0, 1, 0, 1, 0])).toBe(0);
    expect(findOddNumber([1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1])).toBe(4);
  });
});
