/**
 * Course Code Validator Module
 * Question 11: Coverage Thresholds and Regression Testing
 */

export function validateCourseCode(code, department) {
  if (!code || typeof code !== "string") {
    return { valid: false, reason: "Invalid code format" };
  }

  if (code.length < 5) {
    return { valid: false, reason: "Code too short" };
  }

  if (department && !code.startsWith(department)) {
    return { valid: false, reason: "Department mismatch" };
  }

  return { valid: true, reason: "Valid course code" };
}

