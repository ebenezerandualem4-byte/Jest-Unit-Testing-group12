/**
 * Admission System Module
 * Question 10: Admission System Coverage Improvement
 */

export function evaluateAdmission(applicant) {
  const { age, score, hasCertificate, applicationFeePaid, isInternational } = applicant;

  if (age < 18) return { status: "Rejected", reason: "Underage" };
  if (score < 60) return { status: "Rejected", reason: "Low Score" };
  if (!hasCertificate) return { status: "Pending", reason: "Missing Certificate" };
  if (!applicationFeePaid) return { status: "Pending", reason: "Payment Required" };
  if (isInternational && score < 75) return { status: "Pending", reason: "International Review" };
  if (score >= 90) return { status: "Accepted", scholarship: true };

  return { status: "Accepted", scholarship: false };
}

