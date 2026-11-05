/**
 * Tuition Fee Calculation Module
 * Question 3: Tuition Fee Calculation and Array Processing
 * 
 * Rounding Policy:
 * Standard Commercial Half-Up Rounding to two decimal places (cents)
 * Formula: Math.round((value + Number.EPSILON) * 100) / 100
 */

function roundCurrency(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

/**
 * Calculates tuition subtotal, scholarship discount, and payable amount.
 * 
 * @param {Array<{creditHours: number, pricePerCredit: number}>} courses
 * @param {number} [scholarshipRate=0]
 * @returns {{subtotal: number, discount: number, payable: number}}
 */
export function calculateTuition(courses, scholarshipRate = 0) {
  // 1. Validate courses array
  if (!Array.isArray(courses)) {
    throw new TypeError("Courses must be an array");
  }

  // 2. Validate scholarshipRate
  if (scholarshipRate === null) {
    throw new TypeError("Scholarship rate cannot be null");
  }
  if (typeof scholarshipRate !== "number" || !Number.isFinite(scholarshipRate)) {
    throw new TypeError("Scholarship rate must be a finite number");
  }
  if (scholarshipRate < 0 || scholarshipRate > 1) {
    throw new RangeError("Scholarship rate must be between 0 and 1 (inclusive)");
  }

  // 3. Validate each course
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    if (!course || typeof course !== "object") {
      throw new TypeError(`Course at index ${i} must be an object`);
    }

    // creditHours: nonnegative integer
    if (typeof course.creditHours !== "number" || !Number.isInteger(course.creditHours)) {
      throw new TypeError(`Course creditHours at index ${i} must be an integer`);
    }
    if (course.creditHours < 0) {
      throw new RangeError(`Course creditHours at index ${i} must be nonnegative`);
    }

    // pricePerCredit: nonnegative finite number
    if (typeof course.pricePerCredit !== "number" || !Number.isFinite(course.pricePerCredit)) {
      throw new TypeError(`Course pricePerCredit at index ${i} must be a finite number`);
    }
    if (course.pricePerCredit < 0) {
      throw new RangeError(`Course pricePerCredit at index ${i} must be nonnegative`);
    }
  }

  // 4. Calculate subtotal, discount, payable without mutating inputs
  const rawSubtotal = courses.reduce(
    (sum, course) => sum + course.creditHours * course.pricePerCredit,
    0
  );
  const subtotal = roundCurrency(rawSubtotal);
  const discount = roundCurrency(subtotal * scholarshipRate);
  const payable = roundCurrency(subtotal - discount);

  return { subtotal, discount, payable };
}

/**
 * Finds the most expensive course in terms of total course fee (creditHours * pricePerCredit).
 * Returns null if array is empty. In case of ties, returns the first matching course.
 * Does not mutate the courses array or course objects.
 * 
 * @param {Array<{creditHours: number, pricePerCredit: number}>} courses
 * @returns {object|null}
 */
export function findMostExpensiveCourse(courses) {
  if (!Array.isArray(courses)) {
    throw new TypeError("Courses must be an array");
  }

  if (courses.length === 0) {
    return null;
  }

  // Validate courses
  for (let i = 0; i < courses.length; i++) {
    const c = courses[i];
    if (!c || typeof c !== "object") throw new TypeError("Invalid course object");
    if (typeof c.creditHours !== "number" || !Number.isInteger(c.creditHours) || c.creditHours < 0) {
      throw new Error("Invalid course creditHours");
    }
    if (typeof c.pricePerCredit !== "number" || !Number.isFinite(c.pricePerCredit) || c.pricePerCredit < 0) {
      throw new Error("Invalid course pricePerCredit");
    }
  }

  let mostExpensive = courses[0];
  let maxCost = courses[0].creditHours * courses[0].pricePerCredit;

  for (let i = 1; i < courses.length; i++) {
    const cost = courses[i].creditHours * courses[i].pricePerCredit;
    // Strict greater than ensures the first matching course is preserved on ties
    if (cost > maxCost) {
      maxCost = cost;
      mostExpensive = courses[i];
    }
  }

  return mostExpensive;
}

