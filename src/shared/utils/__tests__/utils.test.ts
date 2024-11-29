import { replaceHyphensWithSpaces, validateNumber, validateStrings } from "../utils"

describe("Utils", () => {
  it("should replace hypens with spaces", () => {
    const result = replaceHyphensWithSpaces("home-decoration");
    expect(result).toBe("home decoration");
  });

  it("should validate correct string and return true", () => {
    const result = validateStrings("Fátima Corina");
    expect(result).toBe(true);
  });

  it("should validate incorrect string and return false", () => {
    const result = validateStrings("Fátima21");
    expect(result).toBe(false);
  });

  it("should validate correct number and return true", () => {
    const result = validateNumber("987654321");
    expect(result).toBe(true);
  });

  it("should validate incorrect number and return false", () => {
    const result = validateNumber("number987654321");
    expect(result).toBe(false);
  });
})