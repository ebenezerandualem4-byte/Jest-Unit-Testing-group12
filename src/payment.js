/**
 * Tuition Payment Module
 * Question 8: Tuition Payment Rules and Data Combinations
 * 
 * Rounding Rule:
 * Standard Commercial Rounding (half-up to 2 decimal places):
 * Math.round((amount + fee + Number.EPSILON) * 100) / 100
 */

export function processPayment(amount, method, isInternational) {
  // Validate amount: positive finite number
  if (
    typeof amount !== "number" ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    throw new Error("Invalid amount: must be a positive finite number");
  }

  // Validate method: card or bank
  if (method !== "card" && method !== "bank") {
    throw new Error("Unsupported payment method: must be 'card' or 'bank'");
  }

  // Validate isInternational: must be a strict boolean
  if (typeof isInternational !== "boolean") {
    throw new Error("Invalid international flag: must be a boolean");
  }

  let fee = 0;
  if (method === "card") {
    fee = amount * 0.025;
  } else if (method === "bank") {
    fee = 10;
  }

  if (isInternational) {
    fee += amount * 0.015;
  }

  const total = Math.round((amount + fee + Number.EPSILON) * 100) / 100;
  return total;
}

