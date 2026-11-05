# Question 11: Coverage Thresholds and Regression Testing - Report

## 1. Overview and Configuration
Release criteria enforce strict code coverage thresholds in `jest.config.js`:
```javascript
coverageThreshold: {
  global: {
    statements: 90,
    branches: 85,
    functions: 90,
    lines: 90
  }
}
```

---

## 2. Controlled Regression and Restoration Experiment

### Step A: Baseline Configuration
The global thresholds were configured in `jest.config.js`. With the initial 10 test suites covering existing modules, coverage surpassed the global targets:
- Statements: $97.46\%$ (Threshold: $90\%$)
- Branches: $97.00\%$ (Threshold: $85\%$)
- Functions: $93.10\%$ (Threshold: $90\%$)
- Lines: $97.46\%$ (Threshold: $90\%$)

### Step B: Introducing Coverage Regression
A new module `src/courseValidator.js` containing `validateCourseCode(code, department)` with multiple branching conditions (`!code`, `code.length < 5`, `department mismatch`, and happy path) was introduced into `src/` without automated test coverage.
- Because `collectCoverageFrom: ["src/**/*.js"]` includes all source files, `courseValidator.js` recorded $0\%$ across Statements, Branches, Functions, and Lines.
- Global Functions dropped directly down to the boundary of $90.00\%$, and Statements dropped to $94.06\%$.

### Step C: Restoring Coverage with Targeted Tests
We added `tests/coverage/threshold.test.js` covering every decision branch of `validateCourseCode`.
Results after restoration:
- Statements: $97.55\%$
- Branches: $97.14\%$
- Functions: $93.33\%$
- Lines: $97.55\%$
- All configured thresholds passed comfortably.

### Per-File vs Global Coverage Comparison

| Module / Scope | % Statements | % Branches | % Functions | % Lines | Status against Threshold |
|---|---|---|---|---|---|
| **Global Threshold Target** | **90%** | **85%** | **90%** | **90%** | **Target** |
| `src/courseValidator.js` (untested) | 0.00% | 0.00% | 0.00% | 0.00% | REGRESSION |
| `src/courseValidator.js` (tested) | 100.00% | 100.00% | 100.00% | 100.00% | PASS |
| `src/admission.js` | 100.00% | 100.00% | 100.00% | 100.00% | PASS |
| `src/payment.js` | 100.00% | 100.00% | 100.00% | 100.00% | PASS |
| `src/registration.js` | 100.00% | 100.00% | 100.00% | 100.00% | PASS |
| `src/resultProcessor.js` | 100.00% | 100.00% | 100.00% | 100.00% | PASS |
| `src/scholarship.js` | 100.00% | 100.00% | 100.00% | 100.00% | PASS |
| `src/enrollment.js` | 97.26% | 94.11% | 100.00% | 97.26% | PASS |
| `src/grading.js` | 96.87% | 95.65% | 100.00% | 96.87% | PASS |
| `src/fakeDatabase.js` | 93.54% | 100.00% | 80.00% | 93.54% | PASS (Global) |
| `src/tuition.js` | 94.82% | 89.47% | 100.00% | 94.82% | PASS |
| **All Files (Global Total)** | **97.55%** | **97.14%** | **93.33%** | **97.55%** | **PASSED** |

---

## 3. Passing Example of High Execution Coverage with an Intentionally Weak Assertion

### Weak Assertion Code Example
In `tests/coverage/threshold.test.js`:
```javascript
test("demonstrates high execution coverage with an intentionally weak assertion", () => {
  const result = validateCourseCode("CS101", "CS");
  
  // Weak assertion:
  expect(result).toBeDefined();
});
```

### Why Coverage Alone Is Insufficient: The Oracle Problem
1. **Execution vs Verification**: The test executes every line and statement inside `validateCourseCode` along the happy path. The code coverage tool marks all executed lines in bright green (100% statement coverage for those lines).
2. **Defect Blindness**: If an engineer introduces a bug by altering `return { valid: true, reason: "Valid course code" }` to `return { valid: false, reason: "Defect" }` or returning `{ error: "Corrupted" }`, the test **still passes** because `{ valid: false }` is indeed `toBeDefined()`.
3. **The Test Oracle**: Code coverage only quantifies **what instructions were evaluated by the CPU**, but provides **zero assurance that the test verified the correctness of the resulting state**. High coverage without strict, assertions offers a false sense of security.

