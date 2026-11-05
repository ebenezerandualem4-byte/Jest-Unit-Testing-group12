/**
 * Student Registration Module
 * Question 1: Student Registration and Validation
 */

/**
 * Validates and registers a student.
 * 
 * Contract:
 * - student: Object containing id, name, age, email
 * - id: Positive safe integer (> 0)
 * - name: Nonblank string
 * - age: Integer between 18 and 120 (inclusive)
 * - email: Valid basic email format (user@domain.tld)
 * 
 * Returns a new registered student record without mutating the input object.
 */
export function registerStudent(student) {
  if (!student || typeof student !== "object" || Array.isArray(student)) {
    throw new TypeError("Student must be a valid non-null object");
  }

  // ID validation: must be a positive safe integer
  if (
    typeof student.id !== "number" ||
    !Number.isSafeInteger(student.id) ||
    student.id <= 0
  ) {
    throw new Error("Student ID must be a positive safe integer");
  }

  // Name validation: must be a non-empty, nonblank string
  if (typeof student.name !== "string" || student.name.trim().length === 0) {
    throw new Error("Student name is required and must be a nonblank string");
  }

  // Age validation: integer between 18 and 120
  if (
    typeof student.age !== "number" ||
    !Number.isInteger(student.age) ||
    student.age < 18 ||
    student.age > 120
  ) {
    throw new Error("Student age must be an integer between 18 and 120");
  }

  // Email validation: documented basic format (user@domain.tld)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (typeof student.email !== "string" || !emailRegex.test(student.email.trim())) {
    throw new Error("Invalid email format");
  }

  // Return new object with trimmed name and lowercased email, leaving original input unmutated
  return {
    id: student.id,
    name: student.name.trim(),
    age: student.age,
    email: student.email.trim().toLowerCase(),
    status: "Registered"
  };
}
