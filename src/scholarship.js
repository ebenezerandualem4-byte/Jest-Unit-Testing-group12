/**
 * Scholarship Evaluation Module
 * Question 7: Scholarship Eligibility Decision Table
 */

export function evaluateScholarship(student) {
  if (!student || typeof student !== "object") {
    throw new TypeError("Student must be a valid object");
  }

  const { average, attendance, credits, disciplinaryAction } = student;

  // Validate average: finite number from 0 to 100
  if (typeof average !== "number" || !Number.isFinite(average) || average < 0 || average > 100) {
    throw new Error("Average must be a finite number between 0 and 100");
  }

  // Validate attendance: finite number from 0 to 100
  if (typeof attendance !== "number" || !Number.isFinite(attendance) || attendance < 0 || attendance > 100) {
    throw new Error("Attendance must be a finite number between 0 and 100");
  }

  // Validate credits: nonnegative integer
  if (typeof credits !== "number" || !Number.isInteger(credits) || credits < 0) {
    throw new Error("Credits must be a nonnegative integer");
  }

  // Validate disciplinaryAction: Boolean
  if (typeof disciplinaryAction !== "boolean") {
    throw new Error("Disciplinary action must be a boolean");
  }

  if (disciplinaryAction === true) {
    return "Rejected";
  }

  if (average >= 90 && attendance >= 95 && credits >= 15) {
    return "Full Scholarship";
  }

  if (average >= 80 && attendance >= 85 && credits >= 12) {
    return "Partial Scholarship";
  }

  return "Not Eligible";
}

