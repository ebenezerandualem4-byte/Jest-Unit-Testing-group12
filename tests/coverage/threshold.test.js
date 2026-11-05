import { validateCourseCode } from "../../src/courseValidator.js";

describe("Question 11: Coverage Thresholds and Regression Testing", () => {
  describe("Weak Assertion Demonstration (Coverage without Verification)", () => {
    test("demonstrates high execution coverage with an intentionally weak assertion", () => {
      const result = validateCourseCode("CS101", "CS");

      // WEAK ASSERTION: Merely asserts that a value was returned.
      // This achieves statement and branch execution, but does not verify
      // whether result.valid is actually true, or whether the reason string is correct.
      // If a defect mutated `valid: true` to `valid: false`, this test would STILL pass!
      expect(result).toBeDefined();
    });
  });

  describe("Meaningful Branch Assertions Restoring Full Coverage", () => {
    test("branch 1: should reject null, undefined, or empty course code", () => {
      expect(validateCourseCode(null)).toEqual({
        valid: false,
        reason: "Invalid code format"
      });
      expect(validateCourseCode("")).toEqual({
        valid: false,
        reason: "Invalid code format"
      });
    });

    test("branch 2: should reject non-string course codes", () => {
      expect(validateCourseCode(10101)).toEqual({
        valid: false,
        reason: "Invalid code format"
      });
    });

    test("branch 3: should reject course code with length less than 5 characters", () => {
      expect(validateCourseCode("CS1")).toEqual({
        valid: false,
        reason: "Code too short"
      });
    });

    test("branch 4: should reject code when department prefix does not match", () => {
      expect(validateCourseCode("ENG101", "CS")).toEqual({
        valid: false,
        reason: "Department mismatch"
      });
    });

    test("branch 5: should accept matching department and code length >= 5", () => {
      expect(validateCourseCode("CS101", "CS")).toEqual({
        valid: true,
        reason: "Valid course code"
      });
    });

    test("branch 6: should accept valid code when department argument is omitted", () => {
      expect(validateCourseCode("MATH200")).toEqual({
        valid: true,
        reason: "Valid course code"
      });
    });
  });
});

