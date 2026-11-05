# Question 12: First-Order Mutation Testing of Scholarship Rules - Analysis Report

## 1. Executive Summary & Objective
While standard code coverage indicates which lines of code are traversed during test execution, **mutation testing evaluates the effectiveness of assertions** by artificially injecting syntactic defects (mutants) into the source code. A robust test suite must detect these subtle semantic mutations and fail ("kill" the mutant).

StrykerJS was configured to mutate `src/scholarship.js` and run the Jest test suite (`tests/data-driven/scholarship.test.js`).

---

## 2. Quantitative Results & Mutation Score Comparison

### Initial Run Summary:
- **Total Mutants Generated**: $107$
- **Killed Mutants**: $103$
- **Timed Out**: $0$
- **Survived Mutants**: $4$
- **No Coverage**: $0$
- **Initial Mutation Score**: $\frac{103 + 0}{107} \times 100\% = \mathbf{96.26\%}$

### Post-Improvement Run Summary:
- **Total Mutants Generated**: $107$
- **Killed Mutants**: $104$
- **Timed Out**: $0$
- **Survived Mutants**: $3$ (All 3 proven mathematically equivalent in JavaScript)
- **No Coverage**: $0$
- **Final Mutation Score**: $\frac{104 + 0}{107} \times 100\% = \mathbf{97.20\%}$
- **Effective Mutation Score** (excluding equivalent mutants: $104 / (107 - 3)$): $\mathbf{100.0\%}$

---

## 3. Analysis of Five First-Order Mutants

| Mutant ID | Stryker Mutator | Exact Mutation Injected | Initial Status | Targeted Test Added | Final Status |
|---|---|---|---|---|---|
| **M1 (ID: 9)** | `StringLiteral` | Line 8: `TypeError("Student must be a valid object")` $\to$ `TypeError("")` | **Survived** | `expect(() => evaluateScholarship(null)).toThrow("Student must be a valid object")` verifying specific message string. | **Killed** |
| **M2 (ID: 73)** | `StringLiteral` | Line 34: `return "Rejected"` $\to$ `return ""` | **Killed** | Verified with boundary test for `disciplinaryAction: true` expecting exact non-empty string `"Rejected"`. | **Killed** |
| **M3 (ID: 80)** | `EqualityOperator` | Line 37: `average >= 90` $\to$ `average > 90` | **Killed** | Boundary test `{ average: 90, attendance: 95, credits: 15 }` expecting `"Full Scholarship"`. If mutated to `>`, returns `"Partial Scholarship"`. | **Killed** |
| **M4 (ID: 76)** | `LogicalOperator` | Line 37: Conjunction `... && credits >= 15` $\to$ Disjunction `... \|\| credits >= 15` | **Killed** | Test `{ average: 70, attendance: 70, credits: 20 }` expecting `"Not Eligible"`. Mutant awards `"Full Scholarship"`. | **Killed** |
| **M5 (ID: 67)** | `StringLiteral` | Line 30: `Error("Disciplinary action must be a boolean")` $\to$ `Error("")` | **Killed** | Targeted assertion `expect(() => evaluateScholarship({...valid, disciplinaryAction: "yes"})).toThrow("Disciplinary action must be a boolean")`. | **Killed** |

---

## 4. Technical Justification for Surviving Mutants (Equivalent Mutants)
The remaining 3 surviving mutants (Mutants 17, 36, and 53) are **equivalent mutants** resulting from defensive programming redundancy in JavaScript:
- **Mutant 17**: `if (typeof average !== "number" || !Number.isFinite(average) ...)` $\to$ `if (false || !Number.isFinite(average) ...)`.
  - In JavaScript, `Number.isFinite(x)` evaluates to `false` for all non-number types (e.g. `strings`, `null`, `undefined`, `objects`, `NaN`, `Infinity`).
  - Therefore, `!Number.isFinite(x)` evaluates to `true` whenever `typeof x !== "number"` is true.
  - Removing `typeof average !== "number"` or replacing it with `false` cannot alter any possible execution result in Node.js. No test case in JavaScript can ever distinguish this mutant from the original code, making it an equivalent mutant.
- Identical logic applies to Mutant 36 (for `attendance`) and Mutant 53 (where `Number.isInteger(credits)` inherently guarantees that `credits` is a number).

