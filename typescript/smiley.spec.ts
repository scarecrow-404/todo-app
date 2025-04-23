import { countSmileyFace } from "./smiley";

describe("countSmileys", () => {
  it('should return 2 for [":)", ";(", ";}", ":-D"]', () => {
    expect(countSmileyFace([":)", ";(", ";}", ":-D"])).toBe(2);
  });

  it('should return 3 for [";D", ":-(", ":-)", ";~)"]', () => {
    expect(countSmileyFace([";D", ":-(", ":-)", ";~)"])).toBe(3);
  });

  it('should return 1 for [";]", ":[", ";*", ":$", ";-D"]', () => {
    expect(countSmileyFace([";]", ":[", ";*", ":$", ";-D"])).toBe(1);
  });

  it("should return 0 for empty array", () => {
    expect(countSmileyFace([])).toBe(0);
  });
});
