import { jest } from "@jest/globals";
import { EnrollmentManager } from "../../src/enrollment.js";

describe("Question 4: Enrollment Management and Side Effects", () => {
  let mockNotifier;
  let manager;

  beforeEach(() => {
    mockNotifier = {
      send: jest.fn()
    };
    manager = new EnrollmentManager(mockNotifier);
  });

  describe("Task 1: Mock Notification Verification", () => {
    test("should verify enrollment record, notification text, call arguments, and call count", () => {
      const record = manager.enroll("S101", "CS201");

      expect(record).toEqual({ studentId: "S101", courseId: "CS201" });
      expect(mockNotifier.send).toHaveBeenCalledTimes(1);
      expect(mockNotifier.send).toHaveBeenCalledWith("S101", "Enrolled in course CS201");
    });
  });

  describe("Task 2: Duplicate Enrollment Rejection & Shared Course Support", () => {
    test("should reject duplicate studentId/courseId enrollment without creating a record or sending notification", () => {
      manager.enroll("S101", "CS201");
      expect(mockNotifier.send).toHaveBeenCalledTimes(1);

      expect(() => manager.enroll("S101", "CS201")).toThrow(
        "Duplicate enrollment: student S101 is already enrolled in course CS201"
      );

      // Verify no extra notification was sent
      expect(mockNotifier.send).toHaveBeenCalledTimes(1);
      // Verify enrollment records still contain only 1 record
      expect(manager.getEnrollments("S101")).toHaveLength(1);
    });

    test("should permit two different students to enroll in the same course", () => {
      manager.enroll("S101", "CS301");
      manager.enroll("S102", "CS301");

      expect(mockNotifier.send).toHaveBeenCalledTimes(2);
      expect(mockNotifier.send).toHaveBeenNthCalledWith(1, "S101", "Enrolled in course CS301");
      expect(mockNotifier.send).toHaveBeenNthCalledWith(2, "S102", "Enrolled in course CS301");

      expect(manager.getEnrollments("S101")).toHaveLength(1);
      expect(manager.getEnrollments("S102")).toHaveLength(1);
    });
  });

  describe("Task 3: Notification Failure Rollback Policy", () => {
    test("should roll back enrollment and rethrow error when notification fails", () => {
      const errorNotifier = {
        send: jest.fn(() => {
          throw new Error("SMS Gateway Timeout");
        })
      };
      const failingManager = new EnrollmentManager(errorNotifier);

      expect(() => failingManager.enroll("S105", "PHYS101")).toThrow("SMS Gateway Timeout");

      // Verify call occurred
      expect(errorNotifier.send).toHaveBeenCalledTimes(1);
      expect(errorNotifier.send).toHaveBeenCalledWith("S105", "Enrolled in course PHYS101");

      // Verify state was rolled back - no persistent enrollment
      expect(failingManager.getEnrollments("S105")).toEqual([]);
    });
  });

  describe("Task 4: unenroll() & Defensive Copy Isolation", () => {
    test("should return true when unenroll removes an existing enrollment", () => {
      manager.enroll("S200", "MATH101");
      expect(manager.getEnrollments("S200")).toHaveLength(1);

      const unenrollResult = manager.unenroll("S200", "MATH101");
      expect(unenrollResult).toBe(true);
      expect(manager.getEnrollments("S200")).toHaveLength(0);
    });

    test("should return false when unenroll is attempted on a non-existent enrollment", () => {
      const result = manager.unenroll("S999", "UNKNOWN");
      expect(result).toBe(false);
    });

    test("should return defensive copies from getEnrollments to prevent external state corruption", () => {
      manager.enroll("S300", "CHEM101");
      const enrollments = manager.getEnrollments("S300");

      expect(enrollments).toHaveLength(1);

      // Attempt to mutate the returned defensive copy
      enrollments[0].courseId = "HACKED_COURSE";
      enrollments.push({ studentId: "S300", courseId: "ILLEGAL" });

      // Verify internal manager state is unaffected
      const freshEnrollments = manager.getEnrollments("S300");
      expect(freshEnrollments).toHaveLength(1);
      expect(freshEnrollments[0].courseId).toBe("CHEM101");
    });
  });
});

