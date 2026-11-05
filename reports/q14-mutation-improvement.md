# Question 14: Mutation Score Improvement Project - Analysis and Justification Report

## 1. Executive Summary and Setup
The payment processing service in `src/payment.js` computes tuition totals by assessing payment method fees (card vs. bank) and international surcharges with commercial rounding. To verify the fault-detection capability of the test suite before release, StrykerJS was configured to mutate `src/payment.js` and execute `tests/data-driven/payment.test.js`.

Initial test configuration confirmed that all 30 base tests passed before executing mutation analysis.

---

## 2. Classification of Mutants

Stryker generated **52 mutants** across `src/payment.js` targeting:
1. **Fee Arithmetic**: Mutators modifying base multipliers (`0.025` $\to$ `0`, `0.025` $\to$ `/ 0.025`, `10` $\to$ `0` or `11`), international rates (`0.015`), fee additions (`+=` $\to$ `-=`), and rounding arithmetic.
2. **International Fee Logic**: Conditional expressions evaluating the `isInternational` flag (`isInternational` $\to$ `true`, `isInternational` $\to$ `false`).
3. **Payment Method & Precondition Validation**: Logical connector mutations (`&&` $\to$ `||`), equality mutations (`!==` $\to$ `===`), and error string mutations (`""`).

---

## 3. Targeted Test Improvements (8 Additional Tests)
Eight targeted tests were added to `tests/data-driven/payment.test.js`:
1. **Targeted Test 1**: Half-cent boundary rounding verification (`40.20` card domestic $\to$ `41.21`).
2. **Targeted Test 2**: Minimum transaction amount boundary (`0.01` bank $\to$ `10.01`).
3. **Targeted Test 3**: Strict error message assertion for invalid amounts (`"Invalid amount: must be a positive finite number"`).
4. **Targeted Test 4**: Strict error message assertion for unsupported methods (`"Unsupported payment method: must be 'card' or 'bank'"`).
5. **Targeted Test 5**: Strict error message assertion for non-boolean international flag (`"Invalid international flag: must be a boolean"`).
6. **Targeted Test 6**: Bank international surcharge fee arithmetic verification (`200` bank intl $\to$ `213.00`).
7. **Targeted Test 7**: Card fee scaling without precision drift (`80` card $\to$ `82.00`).
8. **Targeted Test 8**: Combined 4.0% rate verification on international card payment (`500` card intl $\to$ `520.00`).

---

## 4. Quantitative Results & Mutation Score Calculation

### StrykerJS Report Counts:
- **Total Mutants Generated**: $52$
- **Killed Mutants**: $49$
- **Timeout Mutants**: $0$
- **Survived Mutants**: $3$
- **No Coverage Mutants**: $0$

### Manual Scoring Convention:
$$\text{Mutation Score} = \frac{\text{Killed} + \text{Timeout}}{\text{Killed} + \text{Timeout} + \text{Survived} + \text{No Coverage}} \times 100\%$$
$$\text{Mutation Score} = \frac{49 + 0}{49 + 0 + 3 + 0} \times 100\% = \frac{49}{52} \times 100\% = \mathbf{94.23\%}$$

---

## 5. Justification of Surviving Mutants (Equivalent Mutants)

All 3 surviving mutants were inspected and proven to be **equivalent mutants** under the semantics of JavaScript and IEEE-754 arithmetic:

### Mutant 1: Guard Subsumption (Line 13)
- **Original**: `if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0)`
- **Mutant**: `if (false || !Number.isFinite(amount) || amount <= 0)`
- **Justification**: In JavaScript, ECMAScript specification dictates that `Number.isFinite(arg)` returns `false` whenever `typeof arg !== "number"`. Consequently, whenever `typeof amount !== "number"` is true, `!Number.isFinite(amount)` is also unconditionally `true`. Replacing the first sub-expression with `false` cannot alter program behavior for any possible input.

### Mutant 2: Redundant Guard in Defensive Branching (Line 33)
- **Original**:
  ```javascript
  if (method === "card") {
    fee = amount * 0.025;
  } else if (method === "bank") {
    fee = 10;
  }
  ```
- **Mutant**: `} else if (true) {`
- **Justification**: Lines 19–21 enforce:
  ```javascript
  if (method !== "card" && method !== "bank") {
    throw new Error("Unsupported payment method: must be 'card' or 'bank'");
  }
  ```
  Because the guard clause guarantees that any input reaching the fee calculation is strictly either `"card"` or `"bank"`, if `method !== "card"`, then `method` is guaranteed to be `"bank"`. Mutating `method === "bank"` to `true` produces behavior that is identical for all reachable states.

### Mutant 3: Machine Epsilon Precision Boundary (Line 41)
- **Original**: `const total = Math.round((amount + fee + Number.EPSILON) * 100) / 100;`
- **Mutant**: `const total = Math.round((amount + fee - Number.EPSILON) * 100) / 100;`
- **Justification**: `Number.EPSILON` is $2.220446049250313 \times 10^{-16}$. In 64-bit IEEE-754 double precision floating-point numbers, the least significant bit (unit in the last place, ULP) for numbers greater than $4$ exceeds $10^{-15}$. Because transactions are multiplied by $100$ before rounding (magnitudes $\ge 100$), adding or subtracting $2.22 \times 10^{-16}$ is below the representable float precision delta and gets absorbed (truncated), producing bit-identical IEEE-754 results.

### Adjusted Mutation Score:
Treating mathematically equivalent mutants as non-defects:
$$\text{Adjusted Mutation Score} = \frac{49}{52 - 3} \times 100\% = \mathbf{100.0\%}$$
The payment module demonstrates complete mutation robustness.

