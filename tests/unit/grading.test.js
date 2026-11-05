import { GradeBook } from "../../src/grading.js";

describe("Question 2: Student Gradebook and Stateful Classes", () => {
  let gradeBook;

  beforeEach(() => {
    gradeBook = new GradeBook("STU-1001");
  });

  describe("Task 1: Basic Operations & Score Aggregations", () => {
    test("should handle empty gradebook with average 0 and highest score null", () => {
      expect(gradeBook.getAverage()).toBe(0);
      expect(gradeBook.getHighestScore()).toBeNull();
    });

    test("should calculate average and highest for a single score", () => {
      gradeBook.addScore(85);
      expect(gradeBook.getAverage()).toBe(85);
      expect(gradeBook.getHighestScore()).toBe(85);
    });

    test("should calculate average and highest for multiple unique scores", () => {
      gradeBook.addScore(70);
      gradeBook.addScore(80);
      gradeBook.addScore(90);
      expect(gradeBook.getAverage()).toBe(80);
      expect(gradeBook.getHighestScore()).toBe(90);
    });

    test("should handle duplicate scores correctly", () => {
      gradeBook.addScore(75);
      gradeBook.addScore(75);
      gradeBook.addScore(75);
      expect(gradeBook.getAverage()).toBe(75);
      expect(gradeBook.getHighestScore()).toBe(75);
    });

    test("should support boundary scores 0 and 100", () => {
      gradeBook.addScore(0);
      gradeBook.addScore(100);
      expect(gradeBook.getAverage()).toBe(50);
      expect(gradeBook.getHighestScore()).toBe(100);
    });

    test("should keep independent state between separate GradeBook instances", () => {
      const gb1 = new GradeBook("STU-1");
      const gb2 = new GradeBook("STU-2");

      gb1.addScore(95);
      gb2.addScore(60);

      expect(gb1.scores).toEqual([95]);
      expect(gb2.scores).toEqual([60]);
      expect(gb1.getAverage()).toBe(95);
      expect(gb2.getAverage()).toBe(60);
    });
  });

  describe("Task 2: Score Validation & Empty Gradebook Highest Score", () => {
    test("should return null for getHighestScore() when gradebook is empty", () => {
      expect(gradeBook.getHighestScore()).toBeNull();
    });

    test("should reject non-numeric and non-finite scores", () => {
      expect(() => gradeBook.addScore("85")).toThrow("Score must be a finite number between 0 and 100");
      expect(() => gradeBook.addScore(null)).toThrow("Score must be a finite number between 0 and 100");
      expect(() => gradeBook.addScore(undefined)).toThrow("Score must be a finite number between 0 and 100");
      expect(() => gradeBook.addScore(NaN)).toThrow("Score must be a finite number between 0 and 100");
      expect(() => gradeBook.addScore(Infinity)).toThrow("Score must be a finite number between 0 and 100");
      expect(() => gradeBook.addScore(-Infinity)).toThrow("Score must be a finite number between 0 and 100");
    });

    test("should reject scores outside the 0 to 100 range", () => {
      expect(() => gradeBook.addScore(-0.01)).toThrow("Score must be a finite number between 0 and 100");
      expect(() => gradeBook.addScore(100.01)).toThrow("Score must be a finite number between 0 and 100");
      expect(() => gradeBook.addScore(-50)).toThrow("Score must be a finite number between 0 and 100");
      expect(() => gradeBook.addScore(150)).toThrow("Score must be a finite number between 0 and 100");
    });
  });

  describe("Task 3: removeLowestScore() Implementation", () => {
    test("should return null when removing lowest score from an empty gradebook", () => {
      expect(gradeBook.removeLowestScore()).toBeNull();
      expect(gradeBook.scores).toEqual([]);
    });

    test("should remove the only score from a single-score gradebook and return it", () => {
      gradeBook.addScore(88);
      const removed = gradeBook.removeLowestScore();
      expect(removed).toBe(88);
      expect(gradeBook.scores).toEqual([]);
      expect(gradeBook.getAverage()).toBe(0);
      expect(gradeBook.getHighestScore()).toBeNull();
    });

    test("should remove exactly one occurrence of lowest score in case of ties", () => {
      gradeBook.addScore(60);
      gradeBook.addScore(90);
      gradeBook.addScore(60);
      gradeBook.addScore(80);

      const removed = gradeBook.removeLowestScore();
      expect(removed).toBe(60);
      expect(gradeBook.scores).toEqual([90, 60, 80]); // One 60 removed, remaining 60 preserved
      expect(gradeBook.getAverage()).toBe((90 + 60 + 80) / 3);
    });

    test("should correctly update lowest after removing the original lowest score", () => {
      gradeBook.addScore(50);
      gradeBook.addScore(70);
      gradeBook.addScore(90);

      expect(gradeBook.removeLowestScore()).toBe(50);
      expect(gradeBook.scores).toEqual([70, 90]);
      expect(gradeBook.removeLowestScore()).toBe(70);
      expect(gradeBook.scores).toEqual([90]);
    });
  });

  describe("Task 4: isPassing() and State Isolation", () => {
    test("should return false for 49.99 (below passing threshold)", () => {
      expect(GradeBook.isPassing(49.99)).toBe(false);
    });

    test("should return true for 50 (passing boundary)", () => {
      expect(GradeBook.isPassing(50)).toBe(true);
    });

    test("should return true for 50.01 (above passing threshold)", () => {
      expect(GradeBook.isPassing(50.01)).toBe(true);
    });

    test("should reject non-numeric values for isPassing", () => {
      expect(() => GradeBook.isPassing("50")).toThrow();
      expect(() => GradeBook.isPassing(NaN)).toThrow();
    });

    test("should demonstrate no state leakage between separate test executions using fresh instances", () => {
      // In this test, we start with fresh gradeBook from beforeEach
      expect(gradeBook.scores).toHaveLength(0);
      gradeBook.addScore(50);
      expect(gradeBook.scores).toHaveLength(1);

      // Verify a completely new instance is also unaffected
      const anotherGradeBook = new GradeBook("STU-NEW");
      expect(anotherGradeBook.scores).toHaveLength(0);
    });
  });
});

