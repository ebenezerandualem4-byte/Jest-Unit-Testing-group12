/**
 * Student Gradebook Module
 * Question 2: Student Gradebook and Stateful Classes
 */

export class GradeBook {
  constructor(studentId) {
    if (studentId === undefined || studentId === null) {
      throw new Error("studentId is required");
    }
    this.studentId = studentId;
    this.scores = [];
  }

  /**
   * Adds a valid score to the gradebook.
   * Score must be a finite number between 0 and 100.
   */
  addScore(score) {
    if (typeof score !== "number" || !Number.isFinite(score) || score < 0 || score > 100) {
      throw new Error("Score must be a finite number between 0 and 100");
    }
    this.scores.push(score);
  }

  /**
   * Computes average score. Returns 0 when empty.
   */
  getAverage() {
    if (this.scores.length === 0) return 0;
    const total = this.scores.reduce((sum, score) => sum + score, 0);
    return total / this.scores.length;
  }

  /**
   * Returns highest score, or null if the gradebook is empty.
   */
  getHighestScore() {
    if (this.scores.length === 0) return null;
    return Math.max(...this.scores);
  }

  /**
   * Removes one occurrence of the lowest score and returns the removed value.
   * Returns null if gradebook is empty.
   */
  removeLowestScore() {
    if (this.scores.length === 0) return null;
    const lowest = Math.min(...this.scores);
    const index = this.scores.indexOf(lowest);
    this.scores.splice(index, 1);
    return lowest;
  }

  /**
   * Evaluates if average is passing (>= 50).
   */
  static isPassing(average) {
    if (typeof average !== "number" || !Number.isFinite(average)) {
      throw new Error("Average must be a finite number");
    }
    return average >= 50;
  }
}

