import { evaluateScholarship } from "../../src/scholarship.js";
import { scholarshipObjectCases, scholarshipArrayCases } from "../fixtures/scholarshipCases.js";

describe("Question 7: Scholarship Eligibility Decision Table", () => {
  describe("Task 1 & 2: Object-Based Parameterized Decision Table Tests", () => {
    test.each(scholarshipObjectCases)(
      "$description -> expects $expected",
      ({ student, expected }) => {
        const result = evaluateScholarship(student);
        expect(result).toBe(expected);
      }
    );
  });

  describe("Task 3: Input Validation and Boundary Error Enforcement", () => {
    const validStudent = { average: 85, attendance: 90, credits: 15, disciplinaryAction: false };

    test("should reject non-object or null student", () => {
      expect(() => evaluateScholarship(null)).toThrow(TypeError);
      expect(() => evaluateScholarship(undefined)).toThrow(TypeError);
      expect(() => evaluateScholarship("string")).toThrow(TypeError);
    });

    test("should reject invalid average values", () => {
      const invalidAverages = [-1, 100.1, -0.01, 105, NaN, Infinity, -Infinity, "85", null];
      invalidAverages.forEach((avg) => {
        expect(() =>
          evaluateScholarship({ ...validStudent, average: avg })
        ).toThrow("Average must be a finite number between 0 and 100");
      });
    });

    test("should reject invalid attendance values", () => {
      const invalidAttendance = [-5, 100.5, NaN, Infinity, "90", null];
      invalidAttendance.forEach((att) => {
        expect(() =>
          evaluateScholarship({ ...validStudent, attendance: att })
        ).toThrow("Attendance must be a finite number between 0 and 100");
      });
    });

    test("should reject invalid credits values", () => {
      const invalidCredits = [-1, 15.5, NaN, Infinity, "15", null];
      invalidCredits.forEach((cr) => {
        expect(() =>
          evaluateScholarship({ ...validStudent, credits: cr })
        ).toThrow("Credits must be a nonnegative integer");
      });
    });

    test("should reject non-boolean disciplinaryAction", () => {
      const invalidDisciplinary = ["true", "false", 0, 1, null, undefined, {}];
      invalidDisciplinary.forEach((disc) => {
        expect(() =>
          evaluateScholarship({ ...validStudent, disciplinaryAction: disc })
        ).toThrow("Disciplinary action must be a boolean");
      });
    });
  });

  describe("Task 4: Equivalent Array-Based Parameterized Table", () => {
    test.each(scholarshipArrayCases)(
      "array case: avg %d, att %d, credits %d, disc %s -> %s",
      (avg, att, cr, disc, expected) => {
        const result = evaluateScholarship({
          average: avg,
          attendance: att,
          credits: cr,
          disciplinaryAction: disc
        });
        expect(result).toBe(expected);
      }
    );
  });

  describe("Question 12: Targeted Mutation Tests to Kill Mutants", () => {
    test("kills M9: StringLiteral mutant replacing error message with empty string", () => {
      expect(() => evaluateScholarship(null)).toThrow("Student must be a valid object");
      expect(() => evaluateScholarship(undefined)).toThrow("Student must be a valid object");
    });

    test("kills M73: StringLiteral mutant replacing Rejected return with empty string", () => {
      const student = { average: 90, attendance: 95, credits: 15, disciplinaryAction: true };
      const res = evaluateScholarship(student);
      expect(res).toBe("Rejected");
      expect(res.length).toBeGreaterThan(0);
    });

    test("kills M80: Relational operator mutant changing average >= 90 to average > 90", () => {
      const student = { average: 90, attendance: 95, credits: 15, disciplinaryAction: false };
      expect(evaluateScholarship(student)).toBe("Full Scholarship");
    });

    test("kills M76: Logical operator mutant changing credits >= 15 conjunction to disjunction", () => {
      const student = { average: 70, attendance: 70, credits: 20, disciplinaryAction: false };
      expect(evaluateScholarship(student)).toBe("Not Eligible");
    });

    test("kills M67: StringLiteral mutant replacing Disciplinary validation error message", () => {
      const student = { average: 90, attendance: 95, credits: 15, disciplinaryAction: "yes" };
      expect(() => evaluateScholarship(student)).toThrow("Disciplinary action must be a boolean");
    });
  });
});
