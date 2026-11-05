# Question 13: First-Order and Higher-Order Mutant Investigation - Report

## 1. Specification and Mutants Definition
Original implementation in `src/eligibility.js`:
```javascript
export function checkEligibility(age, score, hasDocument) {
  if (age >= 18 && score >= 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}
```

### Mutants Defined:
1. **First-Order Mutant 1 (FOM1)**: Relational mutation changing boundary comparison `age >= 18` to strict inequality `age > 18`.
   ```javascript
   if (age > 18 && score >= 60 && hasDocument) return "Eligible";
   ```
2. **First-Order Mutant 2 (FOM2)**: Relational mutation changing score comparison `score >= 60` to `score > 60`.
   ```javascript
   if (age >= 18 && score > 60 && hasDocument) return "Eligible";
   ```
3. **First-Order Mutant 3 (FOM3)**: Logical connector mutation replacing the first `&&` with `||`.
   ```javascript
   if ((age >= 18 || score >= 60) && hasDocument) return "Eligible";
   ```
4. **Second-Order Mutant (SOM)**: Combines the two relational changes (`age > 18` and `score > 60`).
   ```javascript
   if (age > 18 && score > 60 && hasDocument) return "Eligible";
   ```
5. **Third-Order Mutant (TOM)**: Combines all three mutations simultaneously: both relational strict inequalities and the logical disjunction (`||`).
   ```javascript
   if ((age > 18 || score > 60) && hasDocument) return "Eligible";
   ```

---

## 2. Mutant Comparison & Killing Matrix

A mutant is **killed** when a valid input causes its output to differ from the original output (`mutantOutput !== originalOutput`).

| Mutant Identifier | Mutation Applied | Killing Test Input `(age, score, hasDocument)` | Original Output | Mutant Output | Status |
|---|---|---|---|---|---|
| **FOM1** | `age >= 18` $\to$ `age > 18` | `(18, 70, true)` | `"Eligible"` | `"Not Eligible"` | **KILLED** |
| **FOM2** | `score >= 60` $\to$ `score > 60` | `(20, 60, true)` | `"Eligible"` | `"Not Eligible"` | **KILLED** |
| **FOM3** | First `&&` $\to$ `||` | `(16, 70, true)` | `"Not Eligible"` | `"Eligible"` | **KILLED** |
| **FOM3 (Alt)** | First `&&` $\to$ `||` | `(20, 45, true)` | `"Not Eligible"` | `"Eligible"` | **KILLED** |
| **SOM** | Both relational: `age > 18 && score > 60` | `(18, 60, true)` | `"Eligible"` | `"Not Eligible"` | **KILLED** |
| **SOM (Alt)** | Both relational: `age > 18 && score > 60` | `(18, 85, true)` | `"Eligible"` | `"Not Eligible"` | **KILLED** |
| **TOM (Leak)** | All 3: `(age > 18 \|\| score > 60) && hasDoc` | `(16, 75, true)` | `"Not Eligible"` | `"Eligible"` | **KILLED** |
| **TOM (Bound)** | All 3: `(age > 18 \|\| score > 60) && hasDoc` | `(18, 60, true)` | `"Eligible"` | `"Not Eligible"` | **KILLED** |

---

## 3. Explanation of Higher-Order Mutant Interactions

### Second-Order Mutant (SOM) Interaction: Compounding Restriction
- In SOM, both relational boundaries are mutated from inclusive (`>=`) to exclusive (`>`).
- These two mutations reinforce each other in the direction of increased strictness. At `(18, 60, true)`, both individual sub-predicates fail. At single-boundary points such as `(18, 85, true)` or `(22, 60, true)`, SOM fails where the original succeeded.
- Because both changes narrow the domain of inputs that return `"Eligible"`, any test that kills either FOM1 or FOM2 at their respective boundaries also kills SOM (coupled fault).

### Third-Order Mutant (TOM) Interaction: Opposing Forces and Masking
- TOM introduces a profound interaction because the relational operators and the logical operator **pull the decision boundary in opposite directions**:
  1. The relational mutations (`age > 18`, `score > 60`) make the individual conditions **stricter**.
  2. The logical mutation (`&&` replaced with `||`) makes the compound condition **more lenient** (requiring only one clause instead of both).
- **The Masking / Subsumption Phenomenon**:
  - Consider input `(18, 70, true)`:
    - Original evaluates `(18 >= 18 && 70 >= 60 && true)` $\to$ `"Eligible"`.
    - In FOM1, this was killed because `18 > 18` is `false`.
    - However, in TOM: `(18 > 18 || 70 > 60)` evaluates to `(false || true) = true`! Thus TOM returns `"Eligible"`, **masking** the relational defect on age!
  - Therefore, the test input `(18, 70, true)` that successfully killed FOM1 is **powerless** to kill TOM.
- **Distinguishing TOM**:
  - To kill TOM, we must target either:
    1. A point where both relational guards fail simultaneously (`(18, 60, true)`), preventing `||` from recovering; or
    2. A point where one condition is completely out of range (`age = 16`) while the other exceeds the strict score boundary (`score = 75`), exploiting the disjunctive leak (`||`).
- This demonstrates why higher-order mutation testing is critical: combined mutations can interact synergistically or antagonistically, leading to complex defect masking that individual first-order tests cannot expose.

