import { processPayment } from "../../src/payment.js";

describe("Question 8: Tuition Payment Rules and Data Combinations", () => {
  // Task 1: describe.each() for payment methods
  describe.each([
    {
      method: "card",
      cases: [
        { amount: 100, isInternational: false, expected: 102.50, desc: "Domestic standard amount 100" },
        { amount: 100, isInternational: true, expected: 104.00, desc: "International standard amount 100" },
        { amount: 250.75, isInternational: false, expected: 257.02, desc: "Domestic decimal amount 250.75" },
        { amount: 250.75, isInternational: true, expected: 260.78, desc: "International decimal amount 250.75" },
        { amount: 10000, isInternational: false, expected: 10250.00, desc: "Domestic large amount 10,000" },
        { amount: 10000, isInternational: true, expected: 10400.00, desc: "International large amount 10,000" }
      ]
    },
    {
      method: "bank",
      cases: [
        { amount: 100, isInternational: false, expected: 110.00, desc: "Domestic standard amount 100" },
        { amount: 100, isInternational: true, expected: 111.50, desc: "International standard amount 100" },
        { amount: 250.75, isInternational: false, expected: 260.75, desc: "Domestic decimal amount 250.75" },
        { amount: 250.75, isInternational: true, expected: 264.51, desc: "International decimal amount 250.75" },
        { amount: 10000, isInternational: false, expected: 10010.00, desc: "Domestic large amount 10,000" },
        { amount: 10000, isInternational: true, expected: 10160.00, desc: "International large amount 10,000" }
      ]
    }
  ])("Payment Method: $method", ({ method, cases }) => {
    test.each(cases)(
      "$desc (amount: $amount, intl: $isInternational) -> expected $expected",
      ({ amount, isInternational, expected }) => {
        const total = processPayment(amount, method, isInternational);
        expect(total).toBe(expected);
      }
    );
  });

  // Task 2 & 3: At least 16 invalid cases covering boundaries, types, missing args, unsupported methods
  describe("Task 2 & 3: Input Validation and Unsupported Cases", () => {
    const invalidCases = [
      { id: "INV-01", amount: 0, method: "card", isInternational: false, error: "Invalid amount" },
      { id: "INV-02", amount: -100, method: "card", isInternational: false, error: "Invalid amount" },
      { id: "INV-03", amount: -0.01, method: "bank", isInternational: true, error: "Invalid amount" },
      { id: "INV-04", amount: NaN, method: "card", isInternational: false, error: "Invalid amount" },
      { id: "INV-05", amount: Infinity, method: "bank", isInternational: false, error: "Invalid amount" },
      { id: "INV-06", amount: -Infinity, method: "card", isInternational: true, error: "Invalid amount" },
      { id: "INV-07", amount: "500", method: "card", isInternational: false, error: "Invalid amount" },
      { id: "INV-08", amount: null, method: "bank", isInternational: false, error: "Invalid amount" },
      { id: "INV-09", amount: undefined, method: "card", isInternational: true, error: "Invalid amount" },
      { id: "INV-10", amount: 100, method: "paypal", isInternational: false, error: "Unsupported payment method" },
      { id: "INV-11", amount: 100, method: "crypto", isInternational: true, error: "Unsupported payment method" },
      { id: "INV-12", amount: 100, method: "", isInternational: false, error: "Unsupported payment method" },
      { id: "INV-13", amount: 100, method: null, isInternational: false, error: "Unsupported payment method" },
      { id: "INV-14", amount: 100, method: undefined, isInternational: false, error: "Unsupported payment method" },
      { id: "INV-15", amount: 100, method: "card", isInternational: "true", error: "Invalid international flag" },
      { id: "INV-16", amount: 100, method: "bank", isInternational: null, error: "Invalid international flag" },
      { id: "INV-17", amount: 100, method: "card", isInternational: undefined, error: "Invalid international flag" }
    ];

    test.each(invalidCases)(
      "[$id] should reject invalid case: amount=$amount, method=$method, intl=$isInternational",
      ({ amount, method, isInternational, error }) => {
        expect(() => processPayment(amount, method, isInternational)).toThrow(error);
      }
    );
  });

  describe("Rounding Rule Verification", () => {
    test("should strictly round to two decimal places on repeating decimals", () => {
      // 33.33 * 0.025 = 0.83325 => 33.33 + 0.83325 = 34.16325 => rounds to 34.16
      expect(processPayment(33.33, "card", false)).toBe(34.16);

      // 33.33 * 0.04 = 1.3332 => 33.33 + 1.3332 = 34.6632 => rounds to 34.66
      expect(processPayment(33.33, "card", true)).toBe(34.66);
    });
  });

  describe("Question 14: Eight Targeted Mutation Tests", () => {
    // 1. Half-way round-half-up float tie test (kills EPSILON subtraction mutant)
    test("targeted 1: verifies round-half-up on half-cent boundary (40.20 card -> 41.21)", () => {
      // 40.20 * 0.025 = 1.005 => 40.20 + 1.005 = 41.205
      // In JS: 41.205 * 100 = 4120.4999999999995. With +EPSILON rounds to 41.21; with -EPSILON rounds to 41.20
      const total = processPayment(40.20, "card", false);
      expect(total).toBe(41.21);
    });

    // 2. Minimum amount boundary test
    test("targeted 2: verifies smallest positive transaction amount (0.01)", () => {
      // 0.01 + 10 (bank) = 10.01
      expect(processPayment(0.01, "bank", false)).toBe(10.01);
    });

    // 3. Exact error message for invalid amount
    test("targeted 3: asserts exact error message for invalid amount", () => {
      expect(() => processPayment(-5, "card", false)).toThrow("Invalid amount: must be a positive finite number");
      expect(() => processPayment(0, "bank", true)).toThrow("Invalid amount: must be a positive finite number");
    });

    // 4. Exact error message for unsupported method
    test("targeted 4: asserts exact error message for unsupported payment method", () => {
      expect(() => processPayment(100, "venmo", false)).toThrow("Unsupported payment method: must be 'card' or 'bank'");
      expect(() => processPayment(100, "cash", true)).toThrow("Unsupported payment method: must be 'card' or 'bank'");
    });

    // 5. Exact error message for invalid international boolean flag
    test("targeted 5: asserts exact error message for non-boolean international flag", () => {
      expect(() => processPayment(100, "card", 1)).toThrow("Invalid international flag: must be a boolean");
      expect(() => processPayment(100, "bank", "no")).toThrow("Invalid international flag: must be a boolean");
    });

    // 6. Strict international fee arithmetic test
    test("targeted 6: verifies international surcharge arithmetic for bank payment", () => {
      // amount: 200, bank domestic: 210, international (+3.00): 213.00
      expect(processPayment(200, "bank", true)).toBe(213.00);
    });

    // 7. Strict card percentage calculation test
    test("targeted 7: verifies card fee scaling without precision drift", () => {
      // amount: 80, card: 80 * 0.025 = 2.00, total = 82.00
      expect(processPayment(80, "card", false)).toBe(82.00);
    });

    // 8. Combined card and international fee rate (2.5% + 1.5% = 4.0% exact)
    test("targeted 8: verifies combined 4% fee rate on international card payment", () => {
      // 500 * 0.04 = 20.00 => total 520.00
      expect(processPayment(500, "card", true)).toBe(520.00);
    });
  });
});
