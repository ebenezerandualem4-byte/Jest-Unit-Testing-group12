import { evaluateAdmission } from "../../src/admission.js";

describe("Question 10: Admission System Coverage Improvement", () => {
  describe("Baseline Tests (Initial 2 Tests)", () => {
    test("initial test 1: should accept applicant with scholarship (score >= 90)", () => {
      const applicant = {
        age: 20,
        score: 95,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Accepted",
        scholarship: true
      });
    });

    test("initial test 2: should accept applicant without scholarship (60 <= score < 90)", () => {
      const applicant = {
        age: 22,
        score: 85,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Accepted",
        scholarship: false
      });
    });
  });

  describe("Expanded Boundary and Branch Coverage Tests", () => {
    // 1. Age Boundaries: 17 vs 18
    test("should reject underage applicant at boundary age 17", () => {
      const applicant = {
        age: 17,
        score: 95,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Rejected",
        reason: "Underage"
      });
    });

    test("should permit applicant at minimum age boundary 18 to proceed", () => {
      const applicant = {
        age: 18,
        score: 80,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Accepted",
        scholarship: false
      });
    });

    // 2. Score Boundaries: 59 vs 60
    test("should reject low score applicant at boundary score 59", () => {
      const applicant = {
        age: 19,
        score: 59,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Rejected",
        reason: "Low Score"
      });
    });

    test("should permit applicant at passing score boundary 60 to proceed", () => {
      const applicant = {
        age: 19,
        score: 60,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Accepted",
        scholarship: false
      });
    });

    // 3. Documentation: Missing Certificate
    test("should return pending when certificate is missing", () => {
      const applicant = {
        age: 20,
        score: 80,
        hasCertificate: false,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Pending",
        reason: "Missing Certificate"
      });
    });

    // 4. Financial: Application Fee Not Paid
    test("should return pending when application fee is not paid", () => {
      const applicant = {
        age: 20,
        score: 80,
        hasCertificate: true,
        applicationFeePaid: false,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Pending",
        reason: "Payment Required"
      });
    });

    // 5. International Boundaries: Score 74 vs 75
    test("should route international applicant with score 74 to international review", () => {
      const applicant = {
        age: 21,
        score: 74,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: true
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Pending",
        reason: "International Review"
      });
    });

    test("should bypass international review for international applicant at boundary score 75", () => {
      const applicant = {
        age: 21,
        score: 75,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: true
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Accepted",
        scholarship: false
      });
    });

    test("should not trigger international review for domestic applicant even with score < 75", () => {
      const applicant = {
        age: 21,
        score: 70,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Accepted",
        scholarship: false
      });
    });

    // 6. Scholarship Boundaries: Score 89 vs 90
    test("should not award scholarship at boundary score 89", () => {
      const applicant = {
        age: 25,
        score: 89,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Accepted",
        scholarship: false
      });
    });

    test("should award scholarship at exact boundary score 90", () => {
      const applicant = {
        age: 25,
        score: 90,
        hasCertificate: true,
        applicationFeePaid: true,
        isInternational: false
      };
      expect(evaluateAdmission(applicant)).toEqual({
        status: "Accepted",
        scholarship: true
      });
    });
  });
});
