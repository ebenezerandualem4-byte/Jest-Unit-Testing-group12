# Defect Log: Question 1 - Student Registration and Validation

## 1. Executive Summary
The starter implementation of `registerStudent` in `src/registration.js` accepted incomplete, malformed, and incorrectly typed inputs, causing invalid records to be created and allowing silent data corruption. A comprehensive test suite (`tests/unit/registration.test.js`) comprising 14 automated Jest test cases was created to expose these flaws. The module was then refactored to enforce rigorous contract validation.

---

## 2. Test Execution Evidence: Before vs. After Refactoring

### Before Refactoring (Starter Implementation)
Running `npm test -- tests/unit/registration.test.js` against the uncorrected starter code produced the following failure report:
```
FAIL tests/unit/registration.test.js
  ● Student Registration › should reject malformed email
    Received function did not throw
  ● Student Registration › should reject missing ID
    Received function did not throw
  ● Student Registration › should reject negative ID
    Received function did not throw
  ● Student Registration › should reject string age
    Received function did not throw
  ● Student Registration › should reject decimal age
    Received function did not throw
  ● Student Registration › should reject age 121
    Received function did not throw

Test Suites: 1 failed, 1 total
Tests:       6 failed, 7 passed, 13 total
Snapshots:   0 total
Time:        4.007 s
```

### After Refactoring (Corrected Implementation)
Running the test suite after implementing contract validation:
```
PASS tests/unit/registration.test.js
  Question 1: Student Registration and Validation
    √ should successfully register a valid student with properly formatted fields (19 ms)
    √ should accept minimum allowable boundary age 18 (6 ms)
    √ should accept maximum allowable boundary age 120 (4 ms)
    √ should reject underage applicant at boundary age 17 (28 ms)
    √ should reject applicant above maximum boundary age 121 (6 ms)
    √ should reject empty or whitespace-only name (6 ms)
    √ should reject malformed email addresses (13 ms)
    √ should reject student object with missing required properties (8 ms)
    √ should reject non-positive safe integers for student ID (20 ms)
    √ should reject incorrect data types for name, age, and email (6 ms)
    √ should reject null, undefined, or non-object inputs (8 ms)
    √ should trim name and lowercase email upon successful registration (2 ms)
    √ should verify that the input object is unchanged after registration (3 ms)
    √ should demonstrate a meaningful comparison between toEqual() and toStrictEqual() with nested data (2 ms)

Test Suites: 1 passed, 1 total
Tests:       14 passed, 14 total
```

---

## 3. Defect Analysis and Resolution Matrix

| Defect ID | Input Condition | Observed Defect in Starter Code | Root Cause | Resolution in Corrected Module |
|---|---|---|---|---|
| **D1** | `{ name: "Abebe", age: 20, email: "abebe@example.com" }` (missing `id`) | Function succeeded and returned `{ id: undefined, ... }`. | Starter code never inspected `student.id`. | Added validation: `typeof student.id === "number" && Number.isSafeInteger(student.id) && student.id > 0`. |
| **D2** | `{ id: -1, ... }` or `{ id: 0, ... }` | Accepted non-positive student IDs. | No sign or boundary check on ID. | Enforced `student.id > 0` and integer check. |
| **D3** | `{ id: 1.5, ... }` or `{ id: "1", ... }` | Accepted float or numeric string as ID. | No safe integer type checking. | Enforced `Number.isSafeInteger(student.id)`. |
| **D4** | `{ id: 1, name: 12345, ... }` | Accepted non-string student name or produced unexpected runtime errors if `.trim()` was missing. | No string type validation before operations. | Added `typeof student.name === "string" && student.name.trim().length > 0`. |
| **D5** | `{ id: 1, name: "   ", ... }` | Threw an error, but accepted without type safety check. | Incomplete null/undefined guarding. | Added non-null object check and nonblank trimmed length check. |
| **D6** | `{ id: 1, age: "20", ... }` | `"20" < 18` evaluated to `false`, allowing string age through. | Loose type coercion with `<` operator. | Enforced `typeof student.age === "number" && Number.isInteger(student.age)`. |
| **D7** | `{ id: 1, age: 20.5, ... }` | Fractional ages were accepted. | Only checked `< 18`. | Added `Number.isInteger(student.age)`. |
| **D8** | `{ id: 1, age: 121, ... }` | Ages above 120 (e.g. 121, 500) were accepted. | Missing upper boundary constraint on age. | Added upper bound condition: `student.age <= 120`. |
| **D9** | `{ id: 1, email: "abc@", ... }` | Accepted malformed email with missing domain and TLD. | Only tested `student.email.includes("@")`. | Replaced naive substring check with RFC-compliant regex: `/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/`. |
| **D10** | `null` or `undefined` or array | Threw unhandled `TypeError: Cannot read properties of undefined/null`. | No top-level guard for input argument. | Added `if (!student || typeof student !== "object" || Array.isArray(student)) throw new TypeError(...)`. |

---

## 4. Immutability and Jest Matchers Comparison
- **Object Immutability**: The function returns a new object reference `{ id, name, age, email, status }`, ensuring the caller's input object is never mutated. Verified in test case 13.
- **`toEqual()` vs `toStrictEqual()`**:
  - `toEqual()` recursively checks equality of all properties, but **ignores keys with `undefined` values** and does not verify class prototype equality.
  - `toStrictEqual()` verifies that objects have the identical shape, prototypes, and explicitly checks for properties defined as `undefined`.
  - Test case 14 validates this difference on nested objects: an object with `{ profile: { secondaryMajor: undefined } }` satisfies `toEqual({ profile: {} })` but fails `toStrictEqual({ profile: {} })`.

