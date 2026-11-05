/**
 * Fixture: Decision Table Test Cases for Scholarship Evaluation
 * Question 7: Mandatory Task 1, 2, and 4
 */

export const scholarshipObjectCases = [
  // 1. Full Scholarship - Exact threshold boundaries (90, 95, 15)
  {
    description: "Exact boundary for Full Scholarship",
    student: { average: 90, attendance: 95, credits: 15, disciplinaryAction: false },
    expected: "Full Scholarship"
  },
  // 2. Full Scholarship - Well above thresholds
  {
    description: "Well above thresholds for Full Scholarship",
    student: { average: 98, attendance: 99, credits: 20, disciplinaryAction: false },
    expected: "Full Scholarship"
  },
  // 3. Full Scholarship - Maximum values (100, 100, 30)
  {
    description: "Max possible marks for Full Scholarship",
    student: { average: 100, attendance: 100, credits: 30, disciplinaryAction: false },
    expected: "Full Scholarship"
  },
  // 4. Disciplinary action = true for otherwise full-scholarship student
  {
    description: "Disciplinary action true overrides full scholarship eligibility",
    student: { average: 95, attendance: 98, credits: 18, disciplinaryAction: true },
    expected: "Rejected"
  },
  // 5. Single-condition failure for Full: average just below 90 (89.9) -> falls back to Partial
  {
    description: "Full threshold missed: average 89.9 (falls to Partial)",
    student: { average: 89.9, attendance: 95, credits: 15, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  // 6. Single-condition failure for Full: attendance just below 95 (94.9) -> falls back to Partial
  {
    description: "Full threshold missed: attendance 94.9 (falls to Partial)",
    student: { average: 90, attendance: 94.9, credits: 15, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  // 7. Single-condition failure for Full: credits just below 15 (14) -> falls back to Partial
  {
    description: "Full threshold missed: credits 14 (falls to Partial)",
    student: { average: 90, attendance: 95, credits: 14, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  // 8. Partial Scholarship - Exact threshold boundaries (80, 85, 12)
  {
    description: "Exact boundary for Partial Scholarship",
    student: { average: 80, attendance: 85, credits: 12, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  // 9. Partial Scholarship - Mid-range values
  {
    description: "Mid-range values for Partial Scholarship",
    student: { average: 85, attendance: 90, credits: 14, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  // 10. Disciplinary action = true for otherwise partial-scholarship student
  {
    description: "Disciplinary action true overrides partial scholarship eligibility",
    student: { average: 85, attendance: 90, credits: 14, disciplinaryAction: true },
    expected: "Rejected"
  },
  // 11. Single-condition failure for Partial: average just below 80 (79.9) -> Not Eligible
  {
    description: "Partial threshold missed: average 79.9 (Not Eligible)",
    student: { average: 79.9, attendance: 85, credits: 12, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  // 12. Single-condition failure for Partial: attendance just below 85 (84.9) -> Not Eligible
  {
    description: "Partial threshold missed: attendance 84.9 (Not Eligible)",
    student: { average: 80, attendance: 84.9, credits: 12, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  // 13. Single-condition failure for Partial: credits just below 12 (11) -> Not Eligible
  {
    description: "Partial threshold missed: credits 11 (Not Eligible)",
    student: { average: 80, attendance: 85, credits: 11, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  // 14. Two conditions fail for Partial: average 79, attendance 84
  {
    description: "Multiple conditions fail for Partial",
    student: { average: 79, attendance: 84, credits: 12, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  // 15. All conditions below Partial threshold
  {
    description: "All conditions below Partial threshold",
    student: { average: 60, attendance: 70, credits: 8, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  // 16. Minimum valid values (0, 0, 0)
  {
    description: "Minimum possible numeric values (0, 0, 0)",
    student: { average: 0, attendance: 0, credits: 0, disciplinaryAction: false },
    expected: "Not Eligible"
  },
  // 17. Disciplinary action true for an otherwise not eligible student
  {
    description: "Disciplinary action true for an otherwise not eligible student",
    student: { average: 40, attendance: 50, credits: 5, disciplinaryAction: true },
    expected: "Rejected"
  },
  // 18. Boundary test: average 90, attendance 95, credits 12 (Partial because credits < 15)
  {
    description: "Full average and attendance but only 12 credits (Partial)",
    student: { average: 90, attendance: 95, credits: 12, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  // 19. Boundary test: average 90, attendance 85, credits 15 (Partial because attendance < 95)
  {
    description: "Full average and credits but attendance 85 (Partial)",
    student: { average: 90, attendance: 85, credits: 15, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  // 20. Boundary test: average 80, attendance 95, credits 15 (Partial because average < 90)
  {
    description: "Full attendance and credits but average 80 (Partial)",
    student: { average: 80, attendance: 95, credits: 15, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  // 21. Boundary test: average 80.01, attendance 85.01, credits 12
  {
    description: "Values slightly above Partial boundaries",
    student: { average: 80.01, attendance: 85.01, credits: 12, disciplinaryAction: false },
    expected: "Partial Scholarship"
  },
  // 22. Boundary test: average 90.01, attendance 95.01, credits 15
  {
    description: "Values slightly above Full boundaries",
    student: { average: 90.01, attendance: 95.01, credits: 15, disciplinaryAction: false },
    expected: "Full Scholarship"
  }
];

/**
 * Equivalent compact array-based decision table (average, attendance, credits, disciplinary, expected)
 */
export const scholarshipArrayCases = [
  [90, 95, 15, false, "Full Scholarship"],
  [95, 98, 18, true, "Rejected"],
  [89.9, 95, 15, false, "Partial Scholarship"],
  [80, 85, 12, false, "Partial Scholarship"],
  [79.9, 85, 12, false, "Not Eligible"]
];

