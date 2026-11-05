import {
  checkEligibility,
  checkEligibilityFOM1,
  checkEligibilityFOM2,
  checkEligibilityFOM3,
  checkEligibilitySOM,
  checkEligibilityTOM
} from "../../src/eligibility.js";

describe("Question 13: First-Order and Higher-Order Mutant Investigation", () => {
  describe("Task 1: Baseline Tests for Original checkEligibility", () => {
    test("should return 'Eligible' when all three conditions are satisfied", () => {
      expect(checkEligibility(20, 75, true)).toBe("Eligible");
      expect(checkEligibility(18, 60, true)).toBe("Eligible"); // Boundary values
      expect(checkEligibility(120, 100, true)).toBe("Eligible"); // Maximum values
    });

    test("should return 'Not Eligible' when age is below 18", () => {
      expect(checkEligibility(17, 80, true)).toBe("Not Eligible");
      expect(checkEligibility(0, 100, true)).toBe("Not Eligible");
    });

    test("should return 'Not Eligible' when score is below 60", () => {
      expect(checkEligibility(20, 59, true)).toBe("Not Eligible");
      expect(checkEligibility(25, 0, true)).toBe("Not Eligible");
    });

    test("should return 'Not Eligible' when hasDocument is false", () => {
      expect(checkEligibility(20, 80, false)).toBe("Not Eligible");
      expect(checkEligibility(18, 60, false)).toBe("Not Eligible");
    });
  });

  describe("Task 2, 3 & 4: Mutant Comparison Matrix and Kill Verification", () => {
    // Parameterized test matrix comparing Original vs Mutants on distinguishing inputs
    const mutantComparisonCases = [
      {
        mutantName: "FOM1 (age > 18)",
        mutantFn: checkEligibilityFOM1,
        input: [18, 70, true],
        expectedOriginal: "Eligible",
        expectedMutant: "Not Eligible",
        reason: "Input age=18 satisfies age >= 18 but fails age > 18"
      },
      {
        mutantName: "FOM2 (score > 60)",
        mutantFn: checkEligibilityFOM2,
        input: [20, 60, true],
        expectedOriginal: "Eligible",
        expectedMutant: "Not Eligible",
        reason: "Input score=60 satisfies score >= 60 but fails score > 60"
      },
      {
        mutantName: "FOM3 (first && to ||)",
        mutantFn: checkEligibilityFOM3,
        input: [16, 70, true],
        expectedOriginal: "Not Eligible",
        expectedMutant: "Eligible",
        reason: "Underage applicant satisfies condition because score >= 60 in disjunction"
      },
      {
        mutantName: "FOM3 (first && to ||) - alternative distinguishing input",
        mutantFn: checkEligibilityFOM3,
        input: [20, 45, true],
        expectedOriginal: "Not Eligible",
        expectedMutant: "Eligible",
        reason: "Low score applicant satisfies condition because age >= 18 in disjunction"
      },
      {
        mutantName: "SOM (age > 18 && score > 60)",
        mutantFn: checkEligibilitySOM,
        input: [18, 60, true],
        expectedOriginal: "Eligible",
        expectedMutant: "Not Eligible",
        reason: "Both boundary conditions (18 and 60) fail the strictly greater requirements"
      },
      {
        mutantName: "SOM (age > 18 && score > 60) - single boundary",
        mutantFn: checkEligibilitySOM,
        input: [18, 85, true],
        expectedOriginal: "Eligible",
        expectedMutant: "Not Eligible",
        reason: "Age boundary 18 fails age > 18 even with score 85"
      },
      {
        mutantName: "TOM ((age > 18 || score > 60) && hasDoc) - killing by disjunctive leak",
        mutantFn: checkEligibilityTOM,
        input: [16, 75, true],
        expectedOriginal: "Not Eligible",
        expectedMutant: "Eligible",
        reason: "Underage student passes due to score > 60 satisfying the disjunction"
      },
      {
        mutantName: "TOM ((age > 18 || score > 60) && hasDoc) - killing by boundary failure",
        mutantFn: checkEligibilityTOM,
        input: [18, 60, true],
        expectedOriginal: "Eligible",
        expectedMutant: "Not Eligible",
        reason: "Both boundary values fail strict greater than, causing disjunction to be false"
      }
    ];

    test.each(mutantComparisonCases)(
      "should distinguish and kill $mutantName on input $input",
      ({ mutantName, mutantFn, input, expectedOriginal, expectedMutant }) => {
        const [age, score, hasDocument] = input;
        const originalResult = checkEligibility(age, score, hasDocument);
        const mutantResult = mutantFn(age, score, hasDocument);

        expect(originalResult).toBe(expectedOriginal);
        expect(mutantResult).toBe(expectedMutant);

        // A mutant is killed when its output differs from the original
        expect(mutantResult).not.toBe(originalResult);
      }
    );
  });
});

