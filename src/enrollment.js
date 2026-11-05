/**
 * Enrollment Management Module
 * Question 4: Enrollment Management and Side Effects
 */

export class EnrollmentManager {
  constructor(notifier) {
    this.enrollments = [];
    this.notifier = notifier;
  }

  /**
   * Enrolls a student in a course and sends a notification.
   * If the student is already enrolled in this course, throws an Error without calling notifier.
   * If notification delivery fails, rolls back the enrollment and rethrows the error.
   */
  enroll(studentId, courseId) {
    if (studentId === undefined || courseId === undefined) {
      throw new Error("studentId and courseId are required");
    }

    // Check for duplicate enrollment
    const isDuplicate = this.enrollments.some(
      (r) => r.studentId === studentId && r.courseId === courseId
    );
    if (isDuplicate) {
      throw new Error(`Duplicate enrollment: student ${studentId} is already enrolled in course ${courseId}`);
    }

    const record = { studentId, courseId };
    this.enrollments.push(record);

    try {
      if (this.notifier && typeof this.notifier.send === "function") {
        this.notifier.send(studentId, `Enrolled in course ${courseId}`);
      }
    } catch (err) {
      // Roll back newly added enrollment upon notification failure
      const index = this.enrollments.indexOf(record);
      if (index !== -1) {
        this.enrollments.splice(index, 1);
      }
      throw err;
    }

    // Return a defensive copy of the enrollment record
    return { ...record };
  }

  /**
   * Unenrolls a student from a course.
   * Returns true if enrollment existed and was removed, false otherwise.
   */
  unenroll(studentId, courseId) {
    const index = this.enrollments.findIndex(
      (r) => r.studentId === studentId && r.courseId === courseId
    );
    if (index === -1) {
      return false;
    }
    this.enrollments.splice(index, 1);
    return true;
  }

  /**
   * Returns defensive shallow copies of enrollment records for a student.
   */
  getEnrollments(studentId) {
    return this.enrollments
      .filter((r) => r.studentId === studentId)
      .map((r) => ({ ...r }));
  }
}

