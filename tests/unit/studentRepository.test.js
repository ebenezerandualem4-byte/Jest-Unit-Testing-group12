import { jest } from "@jest/globals";
import { StudentRepository } from "../../src/studentRepository.js";

/**
 * Reusable student fixture factory
 */
export function createStudentFixture(overrides = {}) {
  return {
    id: 1,
    name: "Standard Student",
    age: 20,
    email: "student@example.edu",
    ...overrides
  };
}

describe("Question 5: Test Isolation in a Student Repository", () => {
  let repository;

  beforeEach(() => {
    // Every test starts from a fresh, isolated repository instance
    repository = new StudentRepository();
  });

  afterEach(() => {
    // Restore any spies or mocks used during tests
    jest.restoreAllMocks();
  });

  describe("Repository Addition & Counting", () => {
    test("should start with an empty repository (count 0)", () => {
      expect(repository.count()).toBe(0);
    });

    test("should add a student and increment repository count", () => {
      const student = createStudentFixture({ id: 101, name: "Helen" });
      const added = repository.add(student);

      expect(added).toEqual(student);
      expect(repository.count()).toBe(1);
    });

    test("should reject duplicate student IDs with an error", () => {
      const student1 = createStudentFixture({ id: 202, name: "David" });
      const student2 = createStudentFixture({ id: 202, name: "Duplicate David" });

      repository.add(student1);

      expect(() => repository.add(student2)).toThrow("Student with id '202' already exists");
      expect(repository.count()).toBe(1);
    });

    test("should reject adding student without valid id", () => {
      expect(() => repository.add(null)).toThrow();
      expect(() => repository.add({ name: "Nameless" })).toThrow();
    });
  });

  describe("Repository Lookup & Removal", () => {
    test("should find existing student by ID and return null for non-existent ID", () => {
      const student = createStudentFixture({ id: 301, name: "Grace" });
      repository.add(student);

      expect(repository.findById(301)).toEqual(student);
      expect(repository.findById(999)).toBeNull();
    });

    test("should remove a student by ID and decrement count", () => {
      const student = createStudentFixture({ id: 401, name: "John" });
      repository.add(student);
      expect(repository.count()).toBe(1);

      const removed = repository.remove(401);
      expect(removed).toBe(true);
      expect(repository.count()).toBe(0);
      expect(repository.findById(401)).toBeNull();
    });

    test("should return false when removing non-existent student ID", () => {
      expect(repository.remove(888)).toBe(false);
    });
  });

  describe("Spy Restoration Verification", () => {
    test("should demonstrate spy behavior and cleanup via afterEach", () => {
      const addSpy = jest.spyOn(repository, "add");
      const student = createStudentFixture({ id: 501, name: "Spy Target" });

      repository.add(student);

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(student);
    });

    test("should confirm spy is clean in subsequent test due to afterEach", () => {
      // If afterEach didn't restore mocks, add might still be wrapped or affected
      expect(jest.isMockFunction(repository.add)).toBe(false);
    });
  });
});

