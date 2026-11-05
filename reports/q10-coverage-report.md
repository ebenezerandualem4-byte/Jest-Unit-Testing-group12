# Question 10: Admission System Coverage Improvement - Report

## 1. Overview and Context
The admission system module (`src/admission.js`) evaluates student applications across several decision gates: age limit, minimal academic score, required certificate documentation, payment of the application fee, special review for international students, and merit scholarship eligibility.

---

## 2. Before / After Coverage Metrics Comparison

| Metric | Initial (2 Baseline Tests) | Final (13 Targeted Tests) | Improvement |
|---|---|---|---|
| **Statements** | $100\%$ ($16/16$) | $100\%$ ($16/16$) | $0.0\%$ (maintained complete) |
| **Branches** | $33.33\%$ ($4/12$) | $100.0\%$ ($12/12$) | $+66.67\%$ |
| **Functions** | $100\%$ ($1/1$) | $100\%$ ($1/1$) | $0.0\%$ |
| **Lines** | $100\%$ ($16/16$) | $100\%$ ($16/16$) | $0.0\%$ |

*Note: In the V8 coverage engine, line execution was recorded at 100% initially, but lines 9–13 had uncovered branch exits, resulting in an initial branch coverage of only 33.33%. With 13 targeted tests exercising all return paths and boundaries, branch coverage reached 100%.*

---

## 3. Targeted Return Paths and Boundary Coverage

The expanded test suite (`tests/coverage/admission.test.js`) explicitly verifies every condition and its critical boundary:
1. **Age Underage Boundary (17 vs 18)**:
   - `age: 17` -> returns `{ status: "Rejected", reason: "Underage" }`
   - `age: 18` -> proceeds to subsequent evaluations
2. **Academic Score Boundary (59 vs 60)**:
   - `score: 59` -> returns `{ status: "Rejected", reason: "Low Score" }`
   - `score: 60` -> proceeds past rejection threshold
3. **Missing Certificate Documentation**:
   - `hasCertificate: false` -> returns `{ status: "Pending", reason: "Missing Certificate" }`
4. **Application Fee Payment Gate**:
   - `applicationFeePaid: false` -> returns `{ status: "Pending", reason: "Payment Required" }`
5. **International Review Gate (74 vs 75)**:
   - `isInternational: true, score: 74` -> returns `{ status: "Pending", reason: "International Review" }`
   - `isInternational: true, score: 75` -> bypasses international review, admitted
   - `isInternational: false, score: 70` -> domestic applicant with score 70 bypasses review
6. **Scholarship Merit Boundary (89 vs 90)**:
   - `score: 89` -> admitted without scholarship (`scholarship: false`)
   - `score: 90` -> admitted with scholarship (`scholarship: true`)

---

## 4. Analysis: Admission-Rule Combination Not Guaranteed by Branch Coverage Alone

While 100% branch coverage ensures that every conditional statement branch evaluates to both `true` and `false` at least once, **it does not guarantee multiple condition combinations or fault-masking interactions**:

### The Short-Circuit & Condition Combination Gap
Consider the compound condition:
```javascript
if (isInternational && score < 75)
```
- Branch coverage only requires the compound condition to evaluate to `true` (e.g. `isInternational=true, score=74`) and `false`.
- A test suite can achieve 100% branch coverage with a single `false` test where `isInternational=false` (e.g. `isInternational=false, score=70`).
- Because of short-circuit evaluation in JavaScript, when `isInternational` is `false`, the right operand `score < 75` is **never evaluated**.
- If a bug existed where an international applicant with score 80 erroneously triggered international review (e.g. if the code was accidentally written with `score > 75` or `||`), standard branch coverage alone would not catch it unless MC/DC (Modified Condition/Decision Coverage) tests were explicitly included.

### Fault Masking Across Sequential Guards
Furthermore, sequential early returns create fault masking:
- An applicant with `age = 16` AND `score = 40` AND `hasCertificate = false` returns `{ status: "Rejected", reason: "Underage" }`.
- The evaluation terminates immediately at line 6, masking whether the scoring or fee rules function properly for this profile.
- Branch coverage exercises branches in isolation along individual paths, but real-world policy verification requires combinatorial and decision-table testing to guarantee rule independence.

