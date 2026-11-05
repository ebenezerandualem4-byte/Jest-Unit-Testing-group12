# Question 9: Data-Driven Student Result Processing - Result Table

## 1. Specification and Validation Contract
The `processResult(scores)` function computes the average of student marks and determines if the student passed (`average >= 50`) or failed (`average < 50`), with an empty set producing `{ average: 0, status: "No Scores" }`.

### Preconditions and Error Handling:
- **Input Type**: Must be an array. If not, throws `TypeError`.
- **Element Type**: Each item must be a finite number. Non-finite values (`NaN`, `Infinity`, strings, nested arrays, null/undefined) throw `TypeError`.
- **Value Range**: Each score must satisfy $0 \le score \le 100$. Out-of-range values throw `RangeError`.
- **Immutability**: Input array is never mutated.

---

## 2. Test Execution Result Table

| Case ID | Input Category | Input Scores | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| **TC-01** | Empty Array | `[]` | `{ average: 0, status: "No Scores" }` | `{ average: 0, status: "No Scores" }` | PASS |
| **TC-02** | Lower Boundary Single | `[0]` | `{ average: 0, status: "Fail" }` | `{ average: 0, status: "Fail" }` | PASS |
| **TC-03** | Upper Boundary Single | `[100]` | `{ average: 100, status: "Pass" }` | `{ average: 100, status: "Pass" }` | PASS |
| **TC-04** | Min/Max Extremes | `[0, 100]` | `{ average: 50, status: "Pass" }` | `{ average: 50, status: "Pass" }` | PASS |
| **TC-05** | Exact Threshold Single | `[50]` | `{ average: 50, status: "Pass" }` | `{ average: 50, status: "Pass" }` | PASS |
| **TC-06** | Immediately Below Threshold | `[49.99]` | `{ average: 49.99, status: "Fail" }` | `{ average: 49.99, status: "Fail" }` | PASS |
| **TC-07** | Immediately Above Threshold | `[50.01]` | `{ average: 50.01, status: "Pass" }` | `{ average: 50.01, status: "Pass" }` | PASS |
| **TC-08** | Duplicates Below Threshold | `[49.9, 49.9]` | `{ average: 49.9, status: "Fail" }` | `{ average: 49.9, status: "Fail" }` | PASS |
| **TC-09** | Duplicates At Threshold | `[50, 50, 50]` | `{ average: 50, status: "Pass" }` | `{ average: 50, status: "Pass" }` | PASS |
| **TC-10** | High Duplicates | `[80, 80, 80, 80]` | `{ average: 80, status: "Pass" }` | `{ average: 80, status: "Pass" }` | PASS |
| **TC-11** | Decimals Averaging to 50 | `[35.5, 64.5]` | `{ average: 50, status: "Pass" }` | `{ average: 50, status: "Pass" }` | PASS |
| **TC-12** | Decimals Averaging to 49.95 | `[49.8, 50.1]` | `{ average: 49.95, status: "Fail" }` | `{ average: 49.95, status: "Fail" }` | PASS |
| **TC-13** | Mixed Decimals Passing | `[75.25, 85.75, 90]` | `{ average: 83.67, status: "Pass" }` | `{ average: 83.67, status: "Pass" }` | PASS |
| **TC-14** | Low Failing Scores | `[10, 20, 30]` | `{ average: 20, status: "Fail" }` | `{ average: 20, status: "Fail" }` | PASS |
| **TC-15** | Distinction Level Scores | `[90, 95, 100]` | `{ average: 95, status: "Pass" }` | `{ average: 95, status: "Pass" }` | PASS |
| **TC-16** | Decimal Fail Confirmation | `[49.94, 49.94]` | `{ average: 49.94, status: "Fail" }` | `{ average: 49.94, status: "Fail" }` | PASS |
| **ERR-01** | Non-array Input (null) | `null` | `TypeError` | Throws `TypeError` | PASS |
| **ERR-02** | Non-array Input (string) | `"85, 90"` | `TypeError` | Throws `TypeError` | PASS |
| **ERR-03** | String Element | `[80, "90", 75]` | `TypeError` | Throws `TypeError` | PASS |
| **ERR-04** | Nested Array Element | `[[50, 60], 70]` | `TypeError` | Throws `TypeError` | PASS |
| **ERR-05** | NaN Element | `[NaN]` | `TypeError` | Throws `TypeError` | PASS |
| **ERR-06** | Infinity Element | `[Infinity]` | `TypeError` | Throws `TypeError` | PASS |
| **ERR-07** | Negative Score Boundary | `[-0.01]` | `RangeError` | Throws `RangeError` | PASS |
| **ERR-08** | Negative Score Large | `[-10, 50]` | `RangeError` | Throws `RangeError` | PASS |
| **ERR-09** | Over 100 Boundary | `[100.01]` | `RangeError` | Throws `RangeError` | PASS |
| **ERR-10** | Over 100 Large | `[150]` | `RangeError` | Throws `RangeError` | PASS |
| **IMM-01** | Array Immutability Check | `[70, 80, 90]` (frozen) | Unchanged original | Original array identical | PASS |

---

## 3. Summary
The parameterized tests prove full coverage of:
- Edge cases ($0$, $100$, empty array).
- Precise threshold boundaries ($49.99$, $50.00$, $50.01$).
- Type integrity and range constraints.
- Complete data protection with zero input mutation.

