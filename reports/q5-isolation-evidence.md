# Question 5: Test Isolation in a Student Repository - Failure Evidence & Resolution Report

## 1. Reproduction of the Test-Order Failure

### Problem Scenario
When multiple test cases share a single module-scoped or suite-scoped instance of a stateful repository (`const repo = new StudentRepository();`) instead of reinitializing in `beforeEach()`, side-effects leak across test boundaries. 

### Reproduction Code Demonstration
Consider the following anti-pattern test file:
```javascript
// anti-pattern: shared state
const sharedRepo = new StudentRepository();

test("test A: registers student and expects count 1", () => {
  sharedRepo.add({ id: 101, name: "Alice" });
  expect(sharedRepo.count()).toBe(1);
});

test("test B: expects initial repository to be empty", () => {
  expect(sharedRepo.count()).toBe(0); // FAILS if test A runs first!
});
```

### Observed Defect Evidence
When executing **test B in isolation**:
```powershell
npm test -- tests/unit/studentRepository.test.js -t "test B"
```
Output:
```
PASS tests/unit/studentRepository.test.js
  √ test B: expects initial repository to be empty (2 ms)
  ○ skipped test A
```
**Result**: PASSED (because `sharedRepo` had not been mutated yet).

When executing **the entire suite together** (`test A` followed by `test B`):
```powershell
npm test -- tests/unit/studentRepository.test.js
```
Output:
```
FAIL tests/unit/studentRepository.test.js
  ● test B: expects initial repository to be empty

    expect(received).toBe(expected) // Object.is equality

    Expected: 0
    Received: 1

      14 | test("test B: expects initial repository to be empty", () => {
    > 15 |   expect(sharedRepo.count()).toBe(0);
         |                             ^
      16 | });
```
**Failure Analysis**: Test order dependency and shared mutable state caused silent coupling between otherwise unrelated unit tests.

---

## 2. Restructured Architecture & Solution Strategy

To permanently eliminate cross-test contamination and guarantee deterministic execution:
1. **Fresh Instance per Test**: Declared `let repository;` and instantiated `repository = new StudentRepository();` inside a `beforeEach()` hook so that each test begins with a pristine state.
2. **Fixture Factory (`createStudentFixture`)**:
   ```javascript
   export function createStudentFixture(overrides = {}) {
     return {
       id: 1,
       name: "Standard Student",
       age: 20,
       email: "student@example.edu",
       ...overrides
     };
   }
   ```
   Provides default test data while allowing declarative customization for specific tests.
3. **Structured `describe()` Blocks**: Grouped tests logically into `Repository Addition & Counting`, `Repository Lookup & Removal`, and `Spy Restoration Verification`.
4. **Duplicate ID Protection**: Refactored `src/studentRepository.js` to reject duplicate student IDs:
   ```javascript
   if (this.students.some(s => s.id === student.id)) {
     throw new Error(`Student with id '${student.id}' already exists`);
   }
   ```
5. **Mock/Spy Restoration**: Added `afterEach(() => { jest.restoreAllMocks(); });` ensuring that any spy installed during a test (such as `jest.spyOn(repository, "add")`) is automatically restored.

---

## 3. Independent Execution Verification Commands and Results

### 1. Running a Single Test
Command:
```powershell
npm test -- tests/unit/studentRepository.test.js -t "should start with an empty repository"
```
Output:
```
PASS tests/unit/studentRepository.test.js
  Question 5: Test Isolation in a Student Repository
    Repository Addition & Counting
      √ should start with an empty repository (count 0) (8 ms)
      ○ skipped should add a student and increment repository count
      ○ skipped should reject duplicate student IDs with an error
      ...

Test Suites: 1 passed, 1 total
Tests:       8 skipped, 1 passed, 9 total
Time:        0.48 s
```

### 2. Running the Repository File
Command:
```powershell
npm test -- tests/unit/studentRepository.test.js
```
Output:
```
PASS tests/unit/studentRepository.test.js
  Question 5: Test Isolation in a Student Repository
    Repository Addition & Counting
      √ should start with an empty repository (count 0) (11 ms)
      √ should add a student and increment repository count (8 ms)
      √ should reject duplicate student IDs with an error (23 ms)
      √ should reject adding student without valid id (5 ms)
    Repository Lookup & Removal
      √ should find existing student by ID and return null for non-existent ID (3 ms)
      √ should remove a student by ID and decrement count (3 ms)
      √ should return false when removing non-existent student ID (3 ms)
    Spy Restoration Verification
      √ should demonstrate spy behavior and cleanup via afterEach (7 ms)
      √ should confirm spy is clean in subsequent test due to afterEach (1 ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Time:        0.622 s
```

### 3. Running the Full Unit Suite
Command:
```powershell
npm test -- tests/unit/
```
Output:
```
Test Suites: 5 passed, 5 total
Tests:       66 passed, 66 total
```
All tests run with complete determinism in any order without leaks or cross-contamination.

