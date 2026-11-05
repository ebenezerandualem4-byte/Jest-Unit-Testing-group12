/**
 * Student Repository Module
 * Question 5: Test Isolation in a Student Repository
 */

export class StudentRepository {
  constructor() {
    this.students = [];
  }

  /**
   * Adds a student to the repository.
   * Rejects duplicate student IDs.
   */
  add(student) {
    if (!student || student.id === undefined || student.id === null) {
      throw new Error("Student must be a valid object with an id");
    }
    const exists = this.students.some((s) => s.id === student.id);
    if (exists) {
      throw new Error(`Student with id '${student.id}' already exists`);
    }
    this.students.push(student);
    return student;
  }

  /**
   * Finds a student by id.
   */
  findById(id) {
    return this.students.find((s) => s.id === id) || null;
  }

  /**
   * Removes a student by id.
   */
  remove(id) {
    const initialLength = this.students.length;
    this.students = this.students.filter((s) => s.id !== id);
    return this.students.length < initialLength;
  }

  /**
   * Returns current count of students.
   */
  count() {
    return this.students.length;
  }

  /**
   * Clears all students.
   */
  clear() {
    this.students = [];
  }
}

