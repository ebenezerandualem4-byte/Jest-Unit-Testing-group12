import { registerStudent } from "../../src/registration.js";

describe("Question 1: Student Registration and Validation", () => {
  // 1. Valid registration with clean inputs
  test("should successfully register a valid student with properly formatted fields", () => {
    const student = {
      id: 101,
      name: "Abebe Bikila",
      age: 22,
      email: "abebe.bikila@example.edu"
    };

    const result = registerStudent(student);

    expect(result).toEqual({
      id: 101,
      name: "Abebe Bikila",
      age: 22,
      email: "abebe.bikila@example.edu",
      status: "Registered"
    });
  });

  // 2. Valid registration with boundary age 18 (minimum)
  test("should accept minimum allowable boundary age 18", () => {
    const student = {
      id: 1,
      name: "Sara Connor",
      age: 18,
      email: "sara@example.com"
    };
    const result = registerStudent(student);
    expect(result.age).toBe(18);
    expect(result.status).toBe("Registered");
  });

  // 3. Valid registration with boundary age 120 (maximum)
  test("should accept maximum allowable boundary age 120", () => {
    const student = {
      id: 999,
      name: "Senior Scholar",
      age: 120,
      email: "senior@example.com"
    };
    const result = registerStudent(student);
    expect(result.age).toBe(120);
    expect(result.status).toBe("Registered");
  });

  // 4. Boundary age 17 (underage)
  test("should reject underage applicant at boundary age 17", () => {
    expect(() =>
      registerStudent({
        id: 2,
        name: "Young Student",
        age: 17,
        email: "young@example.com"
      })
    ).toThrow("Student age must be an integer between 18 and 120");
  });

  // 5. Boundary age 121 (above maximum)
  test("should reject applicant above maximum boundary age 121", () => {
    expect(() =>
      registerStudent({
        id: 3,
        name: "Ancient Student",
        age: 121,
        email: "ancient@example.com"
      })
    ).toThrow("Student age must be an integer between 18 and 120");
  });

  // 6. Blank names (empty string and spaces)
  test("should reject empty or whitespace-only name", () => {
    expect(() =>
      registerStudent({
        id: 4,
        name: "   ",
        age: 25,
        email: "spaces@example.com"
      })
    ).toThrow("Student name is required and must be a nonblank string");

    expect(() =>
      registerStudent({
        id: 4,
        name: "",
        age: 25,
        email: "empty@example.com"
      })
    ).toThrow("Student name is required and must be a nonblank string");
  });

  // 7. Malformed emails
  test("should reject malformed email addresses", () => {
    const malformedEmails = [
      "notanemail",
      "missingatsign.com",
      "@nodomain.com",
      "user@",
      "user@domain",
      "user@domain..com"
    ];

    malformedEmails.forEach((email) => {
      expect(() =>
        registerStudent({
          id: 5,
          name: "Test User",
          age: 21,
          email
        })
      ).toThrow("Invalid email format");
    });
  });

  // 8. Missing required properties
  test("should reject student object with missing required properties", () => {
    // Missing id
    expect(() =>
      registerStudent({
        name: "No ID",
        age: 20,
        email: "noid@example.com"
      })
    ).toThrow("Student ID must be a positive safe integer");

    // Missing name
    expect(() =>
      registerStudent({
        id: 10,
        age: 20,
        email: "noname@example.com"
      })
    ).toThrow("Student name is required and must be a nonblank string");

    // Missing age
    expect(() =>
      registerStudent({
        id: 11,
        name: "No Age",
        email: "noage@example.com"
      })
    ).toThrow("Student age must be an integer between 18 and 120");

    // Missing email
    expect(() =>
      registerStudent({
        id: 12,
        name: "No Email",
        age: 22
      })
    ).toThrow("Invalid email format");
  });

  // 9. Incorrect ID types and non-positive values
  test("should reject non-positive safe integers for student ID", () => {
    const invalidIds = [-1, 0, 1.5, "10", null, undefined, NaN, Infinity, Number.MAX_SAFE_INTEGER + 10];
    invalidIds.forEach((id) => {
      expect(() =>
        registerStudent({
          id,
          name: "ID Test",
          age: 20,
          email: "idtest@example.com"
        })
      ).toThrow();
    });
  });

  // 10. Incorrect input types for name, age, and email
  test("should reject incorrect data types for name, age, and email", () => {
    // Numeric name
    expect(() =>
      registerStudent({
        id: 15,
        name: 12345,
        age: 20,
        email: "numericname@example.com"
      })
    ).toThrow("Student name is required and must be a nonblank string");

    // String age
    expect(() =>
      registerStudent({
        id: 16,
        name: "String Age",
        age: "25",
        email: "stringage@example.com"
      })
    ).toThrow("Student age must be an integer between 18 and 120");

    // Floating-point age
    expect(() =>
      registerStudent({
        id: 17,
        name: "Float Age",
        age: 20.5,
        email: "floatage@example.com"
      })
    ).toThrow("Student age must be an integer between 18 and 120");

    // Non-string email
    expect(() =>
      registerStudent({
        id: 18,
        name: "Number Email",
        age: 20,
        email: 98765
      })
    ).toThrow("Invalid email format");
  });

  // 11. Non-object or null student input
  test("should reject null, undefined, or non-object inputs", () => {
    expect(() => registerStudent(null)).toThrow(TypeError);
    expect(() => registerStudent(undefined)).toThrow(TypeError);
    expect(() => registerStudent("student-string")).toThrow(TypeError);
    expect(() => registerStudent([1, 2, 3])).toThrow(TypeError);
  });

  // 12. Normalization of whitespace and case
  test("should trim name and lowercase email upon successful registration", () => {
    const student = {
      id: 20,
      name: "   Johnathan Doe   ",
      age: 24,
      email: "  Johnathan.DOE@University.EDU  "
    };

    const registered = registerStudent(student);
    expect(registered.name).toBe("Johnathan Doe");
    expect(registered.email).toBe("johnathan.doe@university.edu");
  });

  // 13. Verify input object remains unmutated
  test("should verify that the input object is unchanged after registration", () => {
    const inputStudent = {
      id: 30,
      name: "  Original Name  ",
      age: 29,
      email: "Original.Email@DOMAIN.COM"
    };

    const frozenCopy = JSON.parse(JSON.stringify(inputStudent));

    const result = registerStudent(inputStudent);

    // Verify inputStudent properties have not been mutated
    expect(inputStudent).toEqual(frozenCopy);
    expect(inputStudent.name).toBe("  Original Name  ");
    expect(inputStudent.email).toBe("Original.Email@DOMAIN.COM");
    expect(result).not.toBe(inputStudent); // Returned object is a new reference
  });

  // 14. Meaningful comparison of toEqual() and toStrictEqual() using nested data
  test("should demonstrate a meaningful comparison between toEqual() and toStrictEqual() with nested data", () => {
    // In Jest:
    // toEqual() ignores undefined object properties.
    // toStrictEqual() strictly checks for undefined properties and prototype matches.
    const nestedDataWithUndefined = {
      student: {
        id: 1,
        profile: {
          major: "Computer Science",
          secondaryMajor: undefined // Explicit undefined property in nested object
        }
      }
    };

    const nestedDataWithoutUndefined = {
      student: {
        id: 1,
        profile: {
          major: "Computer Science"
        }
      }
    };

    // toEqual treats them as equivalent because it ignores keys with undefined values
    expect(nestedDataWithUndefined).toEqual(nestedDataWithoutUndefined);

    // toStrictEqual fails if keys with undefined values are present in one but omitted in another
    expect(nestedDataWithUndefined).not.toStrictEqual(nestedDataWithoutUndefined);
  });
});
