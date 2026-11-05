/**
 * Student Eligibility Module
 * Question 13: First-Order and Higher-Order Mutant Investigation
 */

/**
 * Original checkEligibility function
 * Baseline: age >= 18 && score >= 60 && hasDocument
 */
export function checkEligibility(age, score, hasDocument) {
  if (age >= 18 && score >= 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

/**
 * First-Order Mutant 1 (FOM1): Relational operator mutation (age >= 18 mutated to age > 18)
 */
export function checkEligibilityFOM1(age, score, hasDocument) {
  if (age > 18 && score >= 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

/**
 * First-Order Mutant 2 (FOM2): Relational operator mutation (score >= 60 mutated to score > 60)
 */
export function checkEligibilityFOM2(age, score, hasDocument) {
  if (age >= 18 && score > 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

/**
 * First-Order Mutant 3 (FOM3): Logical operator mutation (first && mutated to ||)
 */
export function checkEligibilityFOM3(age, score, hasDocument) {
  if ((age >= 18 || score >= 60) && hasDocument) return "Eligible";
  return "Not Eligible";
}

/**
 * Second-Order Mutant (SOM): Combined two relational mutations (age > 18 && score > 60)
 */
export function checkEligibilitySOM(age, score, hasDocument) {
  if (age > 18 && score > 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

/**
 * Third-Order Mutant (TOM): Combined all three mutations ((age > 18 || score > 60) && hasDocument)
 */
export function checkEligibilityTOM(age, score, hasDocument) {
  if ((age > 18 || score > 60) && hasDocument) return "Eligible";
  return "Not Eligible";
}

