# Question 8: Tuition Payment Rules and Data Combinations - Test Case Matrix

## 1. Overview and Business Rules
The `processPayment(amount, method, isInternational)` function calculates the total amount payable including transaction fees based on:
- **Card**: Fixed base fee rate of $2.5\%$ (`amount * 0.025`).
- **Bank**: Flat base fee of $\$10.00$.
- **International Surcharge**: Extra $1.5\%$ of amount (`amount * 0.015`) applied if `isInternational` is true.
- **Rounding Policy**: Commercial rounding half-up to two decimal places: `Math.round((amount + fee + Number.EPSILON) * 100) / 100`.
- **Preconditions**:
  - `amount`: positive finite number (`amount > 0`).
  - `method`: exactly `"card"` or `"bank"`.
  - `isInternational`: strict boolean (`true` or `false`).

---

## 2. Test-Case Matrix

| Case ID | Category | Amount | Method | isInternational | Expected Value / Exception | Actual Jest Result | Status |
|---|---|---|---|---|---|---|---|
| **VAL-01** | Card Domestic Standard | 100.00 | `"card"` | `false` | `102.50` | `102.50` | PASS |
| **VAL-02** | Card International Standard | 100.00 | `"card"` | `true` | `104.00` | `104.00` | PASS |
| **VAL-03** | Card Domestic Decimal | 250.75 | `"card"` | `false` | `257.02` | `257.02` | PASS |
| **VAL-04** | Card International Decimal | 250.75 | `"card"` | `true` | `260.78` | `260.78` | PASS |
| **VAL-05** | Card Domestic Large | 10,000.00 | `"card"` | `false` | `10250.00` | `10250.00` | PASS |
| **VAL-06** | Card International Large | 10,000.00 | `"card"` | `true` | `10400.00` | `10400.00` | PASS |
| **VAL-07** | Bank Domestic Standard | 100.00 | `"bank"` | `false` | `110.00` | `110.00` | PASS |
| **VAL-08** | Bank International Standard | 100.00 | `"bank"` | `true` | `111.50` | `111.50` | PASS |
| **VAL-09** | Bank Domestic Decimal | 250.75 | `"bank"` | `false` | `260.75` | `260.75` | PASS |
| **VAL-10** | Bank International Decimal | 250.75 | `"bank"` | `true` | `264.51` | `264.51` | PASS |
| **VAL-11** | Bank Domestic Large | 10,000.00 | `"bank"` | `false` | `10010.00` | `10010.00` | PASS |
| **VAL-12** | Bank International Large | 10,000.00 | `"bank"` | `true` | `10160.00` | `10160.00` | PASS |
| **RND-01** | Card Repeating Decimal | 33.33 | `"card"` | `false` | `34.16` | `34.16` | PASS |
| **RND-02** | Card Repeating Decimal Intl | 33.33 | `"card"` | `true` | `34.66` | `34.66` | PASS |
| **INV-01** | Zero Amount Boundary | 0 | `"card"` | `false` | Throws Error ("Invalid amount") | Threw expected Error | PASS |
| **INV-02** | Negative Amount | -100 | `"card"` | `false` | Throws Error ("Invalid amount") | Threw expected Error | PASS |
| **INV-03** | Small Negative Amount | -0.01 | `"bank"` | `true` | Throws Error ("Invalid amount") | Threw expected Error | PASS |
| **INV-04** | NaN Amount | `NaN` | `"card"` | `false` | Throws Error ("Invalid amount") | Threw expected Error | PASS |
| **INV-05** | Positive Infinity Amount | `Infinity` | `"bank"` | `false` | Throws Error ("Invalid amount") | Threw expected Error | PASS |
| **INV-06** | Negative Infinity Amount | `-Infinity` | `"card"` | `true` | Throws Error ("Invalid amount") | Threw expected Error | PASS |
| **INV-07** | String Numeric Amount | `"500"` | `"card"` | `false` | Throws Error ("Invalid amount") | Threw expected Error | PASS |
| **INV-08** | Null Amount | `null` | `"bank"` | `false` | Throws Error ("Invalid amount") | Threw expected Error | PASS |
| **INV-09** | Undefined Amount | `undefined` | `"card"` | `true` | Throws Error ("Invalid amount") | Threw expected Error | PASS |
| **INV-10** | Unsupported Method | 100.00 | `"paypal"` | `false` | Throws Error ("Unsupported payment method") | Threw expected Error | PASS |
| **INV-11** | Unsupported Method | 100.00 | `"crypto"` | `true` | Throws Error ("Unsupported payment method") | Threw expected Error | PASS |
| **INV-12** | Empty String Method | 100.00 | `""` | `false` | Throws Error ("Unsupported payment method") | Threw expected Error | PASS |
| **INV-13** | Null Method | 100.00 | `null` | `false` | Throws Error ("Unsupported payment method") | Threw expected Error | PASS |
| **INV-14** | Undefined Method | 100.00 | `undefined` | `false` | Throws Error ("Unsupported payment method") | Threw expected Error | PASS |
| **INV-15** | String Boolean Flag | 100.00 | `"card"` | `"true"` | Throws Error ("Invalid international flag") | Threw expected Error | PASS |
| **INV-16** | Null International Flag | 100.00 | `"bank"` | `null` | Throws Error ("Invalid international flag") | Threw expected Error | PASS |
| **INV-17** | Undefined International Flag | 100.00 | `"card"` | `undefined` | Throws Error ("Invalid international flag") | Threw expected Error | PASS |

---

## 3. Observations and Summary
- All 30 combinations in the test matrix execute with complete fidelity against the defined contract.
- Jest's `describe.each()` cleanly separates the method behavior (`card` vs `bank`), while `test.each()` exercises domestic/international toggles and decimal precision.
- Guard clauses prevent numerical anomalies (e.g. `NaN`, `Infinity`, negative quantities) and malicious data types from compromising billing.

