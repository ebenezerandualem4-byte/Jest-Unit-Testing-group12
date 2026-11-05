# University Testing Lab - Jest Unit & Mutation Testing

This repository contains the complete, rigorous implementation of the 14-question **Advanced Jest Unit Testing Practical Laboratory Worksheet** for the Quality Assurance (QA) university curriculum.

---

## Group Members

| No. | Full Name | Student ID |
|:---:|:---|:---:|
| 1 | SHAMBEL KIBRE | 1601605 |
| 2 | ABENEZER ANDUALEM | 1700018 |
| 3 | NAOMI DEREJE | 1601547 |

---

## Project Structure

```
university-testing-lab/
├── src/
│   ├── admission.js             # Q10: Admission system decision rules
│   ├── courseValidator.js       # Q11: Course code validation & threshold regression
│   ├── eligibility.js           # Q13: First-order & higher-order mutant test subject
│   ├── enrollment.js            # Q4: Enrollment manager with notification rollback
│   ├── fakeDatabase.js          # Q6: Stateful database simulation with lifecycle
│   ├── grading.js               # Q2: Student GradeBook stateful class
│   ├── payment.js               # Q8, Q14: Tuition payment & surcharge calculator
│   ├── registration.js          # Q1: Student registration & contract validation
│   ├── resultProcessor.js       # Q9: Data-driven score calculation & immutability
│   ├── scholarship.js           # Q7, Q12: Decision-table scholarship evaluation
│   ├── studentRepository.js     # Q5: Student repository with ID isolation
│   └── tuition.js               # Q3: Tuition calculations & price analysis
├── tests/
│   ├── unit/
│   │   ├── registration.test.js      # Q1 Unit Tests (14 tests)
│   │   ├── grading.test.js           # Q2 Unit Tests (18 tests)
│   │   ├── tuition.test.js           # Q3 Unit Tests (18 tests)
│   │   ├── enrollment.test.js        # Q4 Unit Tests (7 tests)
│   │   ├── studentRepository.test.js # Q5 Unit Tests (9 tests)
│   │   └── eligibility.test.js       # Q13 Unit & Mutant Tests (12 tests)
│   ├── lifecycle/
│   │   └── fakeDatabase.test.js      # Q6 Lifecycle Hooks & Isolation Tests (6 tests)
│   ├── data-driven/
│   │   ├── scholarship.test.js       # Q7 & Q12 Data-Driven & Mutation Tests (37 tests)
│   │   ├── payment.test.js           # Q8 & Q14 Parameterized & Targeted Tests (38 tests)
│   │   └── resultProcessor.test.js   # Q9 Parameterized Decision Table Tests (22 tests)
│   ├── coverage/
│   │   ├── admission.test.js         # Q10 Path & Boundary Coverage Tests (13 tests)
│   │   └── threshold.test.js         # Q11 Threshold & Regression Tests (7 tests)
│   └── fixtures/
│       └── scholarshipCases.js       # Q7 Parameterized Test Fixtures
├── reports/
│   ├── defect-log-q1.md                  # Q1 Defect Log & Before/After Evidence
│   ├── q5-isolation-evidence.md          # Q5 Test-Order Failure & Isolation Report
│   ├── q8-payment-matrix.md              # Q8 30-case Payment Test Matrix
│   ├── q9-result-table.md                # Q9 Parameterized Result Table
│   ├── q10-coverage-report.md            # Q10 Before/After Coverage & MCDC Report
│   ├── q11-coverage-regression-report.md # Q11 Threshold Regression & Oracle Report
│   ├── q12-mutation-analysis.md          # Q12 First-Order Mutation Testing Report
│   ├── q13-higher-order-mutants.md       # Q13 Higher-Order Mutant Analysis Matrix
│   └── q14-mutation-improvement.md       # Q14 StrykerJS Mutation Score Report
├── jest.config.js               # Jest ESM & Coverage Threshold Configuration
├── package.json                 # Project dependencies & test scripts
├── stryker.scholarship.json     # StrykerJS configuration for Q12
└── stryker.payment.json         # StrykerJS configuration for Q14
```

---

## Execution Commands

### 1. Run All Tests
```powershell
npm test
```
*Current result: **12 test suites passed, 201 tests passed, 0 failures**.*

### 2. Run Test Coverage & Verify Global Thresholds
```powershell
npm run test:coverage
```
*Configured Thresholds: Statements $\ge 90\%$, Branches $\ge 85\%$, Functions $\ge 90\%$, Lines $\ge 90\%$.*
*Observed Metrics: Statements $97.60\%$, Branches $93.56\%$, Functions $94.44\%$, Lines $97.60\%$.*

### 3. Run Individual Question Test Suites
- **Question 1 (Registration)**: `npm test -- tests/unit/registration.test.js`
- **Question 2 (GradeBook)**: `npm test -- tests/unit/grading.test.js`
- **Question 3 (Tuition)**: `npm test -- tests/unit/tuition.test.js`
- **Question 4 (Enrollment)**: `npm test -- tests/unit/enrollment.test.js`
- **Question 5 (Isolation)**: `npm test -- tests/unit/studentRepository.test.js`
- **Question 6 (Lifecycle Hooks)**: `npm test -- tests/lifecycle/fakeDatabase.test.js`
- **Question 7 (Scholarship Table)**: `npm test -- tests/data-driven/scholarship.test.js`
- **Question 8 (Payment Matrix)**: `npm test -- tests/data-driven/payment.test.js`
- **Question 9 (Result Processor)**: `npm test -- tests/data-driven/resultProcessor.test.js`
- **Question 10 (Coverage Improvement)**: `npm test -- tests/coverage/admission.test.js`
- **Question 11 (Regression Testing)**: `npm test -- tests/coverage/threshold.test.js`
- **Question 12 (Mutation Analysis)**: `npx stryker run stryker.scholarship.json`
- **Question 13 (Higher-Order Mutants)**: `npm test -- tests/unit/eligibility.test.js`
- **Question 14 (Mutation Improvement)**: `npx stryker run stryker.payment.json`

---

## Question Summary & Results

| Question | Topic | Source Module | Test File | Report Artifact | Tests | Status |
|---|---|---|---|---|---|---|
| **Q1** | Student Registration & Validation | `src/registration.js` | `tests/unit/registration.test.js` | `reports/defect-log-q1.md` | 14 | **PASS** |
| **Q2** | Gradebook & Stateful Classes | `src/grading.js` | `tests/unit/grading.test.js` | Embedded documentation | 18 | **PASS** |
| **Q3** | Tuition Calculation & Rounding | `src/tuition.js` | `tests/unit/tuition.test.js` | Embedded documentation | 18 | **PASS** |
| **Q4** | Enrollment & Side-Effect Mocks | `src/enrollment.js` | `tests/unit/enrollment.test.js` | Embedded documentation | 7 | **PASS** |
| **Q5** | Test Isolation & Fixtures | `src/studentRepository.js` | `tests/unit/studentRepository.test.js` | `reports/q5-isolation-evidence.md` | 9 | **PASS** |
| **Q6** | Lifecycle Hooks & Cleanup | `src/fakeDatabase.js` | `tests/lifecycle/fakeDatabase.test.js` | Embedded documentation | 6 | **PASS** |
| **Q7** | Decision-Table Scholarship Testing | `src/scholarship.js` | `tests/data-driven/scholarship.test.js` | `tests/fixtures/scholarshipCases.js` | 32 | **PASS** |
| **Q8** | Parameterized Payment Combinations | `src/payment.js` | `tests/data-driven/payment.test.js` | `reports/q8-payment-matrix.md` | 30 | **PASS** |
| **Q9** | Data-Driven Result Processing | `src/resultProcessor.js` | `tests/data-driven/resultProcessor.test.js` | `reports/q9-result-table.md` | 22 | **PASS** |
| **Q10** | Admission Decision Coverage | `src/admission.js` | `tests/coverage/admission.test.js` | `reports/q10-coverage-report.md` | 13 | **PASS** (100% Branches) |
| **Q11** | Coverage Thresholds & Regression | `src/courseValidator.js` | `tests/coverage/threshold.test.js` | `reports/q11-coverage-regression-report.md` | 7 | **PASS** |
| **Q12** | First-Order Mutation Testing | `src/scholarship.js` | `tests/data-driven/scholarship.test.js` | `reports/q12-mutation-analysis.md` | +5 targeted | **PASS** (97.20% / 100% adj) |
| **Q13** | First- & Higher-Order Mutants | `src/eligibility.js` | `tests/unit/eligibility.test.js` | `reports/q13-higher-order-mutants.md` | 12 | **PASS** (All killed) |
| **Q14** | Mutation Score Improvement | `src/payment.js` | `tests/data-driven/payment.test.js` | `reports/q14-mutation-improvement.md` | +8 targeted | **PASS** (94.23% / 100% adj) |

