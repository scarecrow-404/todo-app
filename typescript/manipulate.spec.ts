import { manipulate } from "./manipulate";

describe("manipulations", () => {
  it('should return ["a"] for input "a"', () => {
    expect(manipulate("a")).toEqual(["a"]);
  });

  it('should return ["ab", "ba"] for input "ab"', () => {
    expect(manipulate("ab").sort()).toEqual(["ab", "ba"]);
  });

  it('should return 6 set of char for "abc"', () => {
    expect(manipulate("abc").sort()).toEqual([
      "abc",
      "acb",
      "bac",
      "bca",
      "cab",
      "cba",
    ]);
  });

  it('should return unique set of char for input "aabb"', () => {
    expect(manipulate("aabb").sort()).toEqual([
      "aabb",
      "abab",
      "abba",
      "baab",
      "baba",
      "bbaa",
    ]);
  });
});
