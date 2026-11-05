import { processResult } from "../../src/resultProcessor.js";

describe("Question 9: Data-Driven Student Result Processing", () => {
  // Task 1: At least 15 parameterized cases covering empty arrays, 0/100, duplicates, decimals, boundaries
  const validCases = [
    { id: "TC-01", scores: [], expected: { average: 0, status: "No Scores" }, desc: "Empty score array" },
    { id: "TC-02", scores: [0], expected: { average: 0, status: "Fail" }, desc: "Single boundary score 0" },
    { id: "TC-03", scores: [100], expected: { average: 100, status: "Pass" }, desc: "Single boundary score 100" },
    { id: "TC-04", scores: [0, 100], expected: { average: 50, status: "Pass" }, desc: "Min and Max combination (average 50)" },
    { id: "TC-05", scores: [50], expected: { average: 50, status: "Pass" }, desc: "Exact pass threshold single score" },
    { id: "TC-06", scores: [49.99], expected: { average: 49.99, status: "Fail" }, desc: "Immediately below pass threshold 49.99" },
    { id: "TC-07", scores: [50.01], expected: { average: 50.01, status: "Pass" }, desc: "Immediately above pass threshold 50.01" },
    { id: "TC-08", scores: [49.9, 49.9], expected: { average: 49.9, status: "Fail" }, desc: "Duplicate scores below threshold" },
    { id: "TC-09", scores: [50, 50, 50], expected: { average: 50, status: "Pass" }, desc: "Duplicate scores at threshold" },
    { id: "TC-10", scores: [80, 80, 80, 80], expected: { average: 80, status: "Pass" }, desc: "Multiple duplicate passing scores" },
    { id: "TC-11", scores: [35.5, 64.5], expected: { average: 50, status: "Pass" }, desc: "Decimals summing exactly to 100 (avg 50)" },
    { id: "TC-12", scores: [49.8, 50.1], expected: { average: 49.95, status: "Fail" }, desc: "Decimal average just below 50 (49.95)" },
    { id: "TC-13", scores: [75.25, 85.75, 90.0], expected: { average: 83.67, status: "Pass" }, desc: "Three mixed decimal passing scores" },
    { id: "TC-14", scores: [10, 20, 30], expected: { average: 20, status: "Fail" }, desc: "Multiple low failing scores" },
    { id: "TC-15", scores: [90, 95, 100], expected: { average: 95, status: "Pass" }, desc: "High distinction scores" },
    { id: "TC-16", scores: [49.94, 49.94], expected: { average: 49.94, status: "Fail" }, desc: "Decimal values confirming fail status" }
  ];

  describe("Task 1: Parameterized Valid Score Calculations", () => {
    test.each(validCases)(
      "[$id] $desc: scores $scores -> average $expected.average, status $expected.status",
      ({ scores, expected }) => {
        const result = processResult(scores);
        expect(result).toEqual(expected);
      }
    );
  });

  describe("Task 2 & 3: Invalid Input Rejection with TypeError and RangeError", () => {
    test("should throw TypeError for non-array inputs", () => {
      expect(() => processResult(null)).toThrow(TypeError);
      expect(() => processResult(undefined)).toThrow(TypeError);
      expect(() => processResult("85, 90")).toThrow(TypeError);
      expect(() => processResult({ 0: 50, length: 1 })).toThrow(TypeError);
    });

    test("should throw TypeError for string score elements", () => {
      expect(() => processResult([80, "90", 75])).toThrow(TypeError);
      expect(() => processResult(["fail"])).toThrow(TypeError);
    });

    test("should throw TypeError for nested array score elements", () => {
      expect(() => processResult([[50, 60], 70])).toThrow(TypeError);
      expect(() => processResult([70, [80]])).toThrow(TypeError);
    });

    test("should throw TypeError for NaN and non-finite scores", () => {
      expect(() => processResult([NaN])).toThrow(TypeError);
      expect(() => processResult([50, NaN])).toThrow(TypeError);
      expect(() => processResult([Infinity])).toThrow(TypeError);
      expect(() => processResult([-Infinity])).toThrow(TypeError);
      expect(() => processResult([null])).toThrow(TypeError);
    });

    test("should throw RangeError for scores below 0 or above 100", () => {
      expect(() => processResult([-0.01])).toThrow(RangeError);
      expect(() => processResult([-10, 50])).toThrow(RangeError);
      expect(() => processResult([100.01])).toThrow(RangeError);
      expect(() => processResult([150])).toThrow(RangeError);
      expect(() => processResult([60, 70, 105])).toThrow(RangeError);
    });
  });

  describe("Task 3: Protection and Immutability of Original Input Array", () => {
    test("should never mutate or alter the original input array", () => {
      const original = [70, 80, 90];
      Object.freeze(original); // Strictly throws if mutated

      const result = processResult(original);
      expect(result).toEqual({ average: 80, status: "Pass" });
      expect(original).toEqual([70, 80, 90]);
      expect(original).toHaveLength(3);
    });
  });
});

