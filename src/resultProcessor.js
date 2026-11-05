/**
 * Student Result Processing Module
 * Question 9: Data-Driven Student Result Processing
 */

/**
 * Calculates academic average and status from an array of scores.
 * 
 * Rules:
 * - Empty array -> { average: 0, status: "No Scores" }
 * - Scores must be finite numbers between 0 and 100 (inclusive)
 * - Throws TypeError for non-array inputs or non-numeric/non-finite items (NaN, Infinity, strings, nested arrays)
 * - Throws RangeError for numbers outside [0, 100]
 * - Input array is never mutated
 * - Average is rounded to two decimal places
 * - Pass threshold: average >= 50
 * 
 * @param {number[]} scores
 * @returns {{average: number, status: "Pass"|"Fail"|"No Scores"}}
 */
export function processResult(scores) {
  if (!Array.isArray(scores)) {
    throw new TypeError("Scores must be an array");
  }

  if (scores.length === 0) {
    return { average: 0, status: "No Scores" };
  }

  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    if (typeof score !== "number" || !Number.isFinite(score)) {
      throw new TypeError(`Score at index ${i} must be a finite number`);
    }
    if (score < 0 || score > 100) {
      throw new RangeError(`Score at index ${i} must be between 0 and 100 (inclusive)`);
    }
  }

  const sum = scores.reduce((acc, score) => acc + score, 0);
  const rawAverage = sum / scores.length;
  const average = Math.round((rawAverage + Number.EPSILON) * 100) / 100;
  const status = average >= 50 ? "Pass" : "Fail";

  return { average, status };
}

