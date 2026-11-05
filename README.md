

# Jest Unit Testing Assignment

## University Testing Laboratory – Group 12

| Project Information | Details |
|---|---|
| Project Name | Jest Unit Testing Lab |
| Group | 12 |
| Programming Language | JavaScript |
| Runtime Environment | Node.js |
| Package Manager | npm |
| Testing Framework | Jest |
| Mutation Testing | StrykerJS |
| Module System | ES Modules |

---
---

## Group Members

| No. | Full Name | Student ID |
|:---:|:---|:---:|
| 1 | SHAMBEL KIBRE | 1601605 |
| 2 | ABENEZER ANDUALEM | 1700018 |
| 3 | NAOMI DEREJE | 1601547 |

---

### 2. Run Test Coverage & Verify Global Thresholds

```bash
npm run test

npm run test:coverage
```

**Configured Thresholds:** Statements ≥ 90%, Branches ≥ 85%, Functions ≥ 90%, Lines ≥ 90%.

**Observed Metrics:** Statements 97.60%, Branches 93.56%, Functions 94.44%, Lines 97.60%.

### 3. Run Individual Question Test Suites

- **Question 1 (Registration):** `npm test -- tests/unit/registration.test.js`
- **Question 2 (GradeBook):** `npm test -- tests/unit/grading.test.js`
- **Question 3 (Tuition):** `npm test -- tests/unit/tuition.test.js`
- **Question 4 (Enrollment):** `npm test -- tests/unit/enrollment.test.js`
- **Question 5 (Isolation):** `npm test -- tests/unit/studentRepository.test.js`
- **Question 6 (Lifecycle Hooks):** `npm test -- tests/lifecycle/fakeDatabase.test.js`
- **Question 7 (Scholarship Table):** `npm test -- tests/data-driven/scholarship.test.js`
- **Question 8 (Payment Matrix):** `npm test -- tests/data-driven/payment.test.js`
- **Question 9 (Result Processor):** `npm test -- tests/data-driven/resultProcessor.test.js`
- **Question 10 (Coverage Improvement):** `npm test -- tests/coverage/admission.test.js`
- **Question 11 (Regression Testing):** `npm test -- tests/coverage/threshold.test.js`
- **Question 12 (Mutation Analysis):** `npx stryker run stryker.scholarship.json`
- **Question 13 (Higher-Order Mutants):** `npm test -- tests/unit/eligibility.test.js`
- **Question 14 (Mutation Improvement):** `npx stryker run stryker.payment.json`

---


## 1. Project Overview

This project focuses on practical implementation of automated unit testing using Jest.

It covers different testing techniques applied to university management system scenarios, including student registration, grading, tuition calculation, enrollment management, scholarship eligibility, admission decisions, and payment processing.

The main objective is to identify software defects, verify expected behavior, improve test isolation, measure code coverage, and evaluate test effectiveness through mutation testing.

## 2. Technologies and Tools

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| npm | Dependency and package management |
| JavaScript | Application implementation |
| Jest | Automated unit testing |
| StrykerJS | Mutation testing |
| Visual Studio Code | Code editor |
| Linux Terminal | Project execution |
| Web Browser | Viewing HTML coverage and mutation reports |

## 3. Project Directory Structure

The following structure represents the actual project folders and files:

```text
Jest-Unit-Testing-group12/
│
├── src/
│   ├── admission.js
│   ├── courseValidator.js
│   ├── eligibility.js
│   ├── enrollment.js
│   ├── fakeDatabase.js
│   ├── grading.js
│   ├── payment.js
│   ├── registration.js
│   ├── resultProcessor.js
│   ├── scholarship.js
│   ├── studentRepository.js
│   └── tuition.js
│
├── tests/
│   ├── coverage/
│   │   ├── admission.test.js
│   │   └── threshold.test.js
│   │
│   ├── data-driven/
│   │   ├── payment.test.js
│   │   ├── resultProcessor.test.js
│   │   └── scholarship.test.js
│   │
│   ├── fixtures/
│   │   └── scholarshipCases.js
│   │
│   ├── lifecycle/
│   │   └── fakeDatabase.test.js
│   │
│   └── unit/
│       ├── eligibility.test.js
│       ├── enrollment.test.js
│       ├── grading.test.js
│       ├── registration.test.js
│       ├── studentRepository.test.js
│       └── tuition.test.js
│
├── reports/
│   ├── defect-log-q1.md
│   ├── mutation/
│   │   ├── mutation.html
│   │   └── mutation.json
│   ├── q5-isolation-evidence.md
│   ├── q8-payment-matrix.md
│   ├── q9-result-table.md
│   ├── q10-coverage-report.md
│   ├── q11-coverage-regression-report.md
│   ├── q12-mutation-analysis.md
│   ├── q13-higher-order-mutants.md
│   ├── q14-mutation-improvement.md
│   ├── Screenshot From 2026-11-05 20-09-19.png
│   └── Screenshot From 2026-11-05 20-12-00.png
│
├── coverage/
├── node_modules/
├── jest.config.js
├── package.json
├── package-lock.json
├── stryker.payment.json
├── stryker.scholarship.json
└── README.md
```

## 4. Installation and Configuration

### Prerequisites

- Node.js
- npm
- Visual Studio Code


### Step 1: Verify Node.js and npm

```bash
node --version
npm --version
```

### Step 2: Navigate to the project

```bash
cd ~/Desktop/Jest-Unit-Testing-group12
```

### Step 3: Install project dependencies

```bash
npm install
```

### Step 4: Configure Jest

The project uses Jest with JavaScript ES Modules.

The Jest configuration is defined in:

```text
jest.config.js
```

## 5. Running the Tests

### Run all tests

```bash
npm run test
```

### Run tests with code coverage

```bash
npm run test:coverage
```

### Run a specific unit test

```bash
npx jest tests/unit/registration.test.js
```

### Run data-driven tests

```bash
npx jest tests/data-driven/
```

### Run lifecycle tests

```bash
npx jest tests/lifecycle/
```

### Run coverage tests

```bash
npx jest tests/coverage/
```

## 6. Assignment Questions and Implementation

The project contains practical implementations covering the following assignment topics:

| Question | Topic | Test Category |
|---|---|---|
| Q1 | Student Registration and Validation | Unit Testing |
| Q2 | Student Gradebook and Stateful Classes | Unit Testing |
| Q3 | Tuition Fee Calculation and Array Processing | Unit Testing |
| Q4 | Enrollment Management and Side Effects | Mock Testing |
| Q5 | Test Isolation in a Student Repository | Test Isolation |
| Q6 | Lifecycle Hooks and Resource Cleanup | Lifecycle Testing |
| Q7 | Scholarship Eligibility Decision Table | Data-Driven Testing |
| Q8 | Tuition Payment Rules and Data Combinations | Data-Driven Testing |
| Q9 | Data-Driven Student Result Processing | Data-Driven Testing |
| Q10 | Admission System Coverage Improvement | Code Coverage |
| Q11 | Coverage Thresholds and Regression Testing | Coverage Testing |
| Q12 | First-Order Mutation Testing of Scholarship Rules | Mutation Testing |
| Q13 | First-Order and Higher-Order Mutant Investigation | Mutation Testing |
| Q14 | Mutation Score Improvement Project | Mutation Testing |

## 7. Code Coverage Analysis

Code coverage measures how much of the source code is executed by the test suite.

The project evaluates four coverage metrics:

1. Statement Coverage
2. Branch Coverage
3. Function Coverage
4. Line Coverage

Generate the coverage report:

```bash
npm run test:coverage
```

The HTML report is available at:

```text
coverage/lcov-report/index.html
```

Open the report:

```bash
xdg-open coverage/lcov-report/index.html
```

Coverage analysis and regression evidence are documented in:

- `reports/q10-coverage-report.md`
- `reports/q11-coverage-regression-report.md`

## 8. Mutation Testing with StrykerJS

Mutation testing evaluates the effectiveness of the existing test cases by introducing intentional changes into source code.

The project includes two Stryker configuration files:

```text
stryker.payment.json
stryker.scholarship.json
```

Mutation testing investigates:

- Killed mutants
- Survived mutants
- Timeout mutants
- No-coverage mutants

The mutation score is calculated as:

```text
Mutation Score =

(Killed + Timeout) /

(Killed + Timeout + Survived + No Coverage) × 100
```

Mutation testing evidence is organized in:

- `reports/mutation/`
- `reports/q12-mutation-analysis.md`
- `reports/q13-higher-order-mutants.md`
- `reports/q14-mutation-improvement.md`

## 9. Documentation and Evidence

The `reports/` directory contains supporting assignment documentation.

| File | Description |
|---|---|
| defect-log-q1.md | Registration defects and corrections |
| q5-isolation-evidence.md | Test isolation evidence |
| q8-payment-matrix.md | Payment test-case matrix |
| q9-result-table.md | Result processing test table |
| q10-coverage-report.md | Admission coverage report |
| q11-coverage-regression-report.md | Coverage threshold evidence |
| q12-mutation-analysis.md | Scholarship mutation analysis |
| q13-higher-order-mutants.md | Higher-order mutant investigation |
| q14-mutation-improvement.md | Payment mutation improvement |
| mutation/mutation.html | Mutation testing HTML report |
| mutation/mutation.json | Mutation testing result data |
| Screenshot From 2026-11-05 20-09-19.png | Assignment execution evidence |
| Screenshot From 2026-11-05 20-12-00.png | Assignment execution evidence |

## 10. Test Execution Results

The following results were obtained from the current Jest execution:

| Metric | Result |
|---|---:|
| Test Suites Passed | 12 |
| Test Suites Failed | 0 |
| Total Tests Passed | 201 |
| Tests Failed | 0 |
| Snapshots | 0 |
| Execution Time | 1.951 seconds |

**Overall Result:** All 12 test suites and 201 tests passed successfully.

## 11. Learning Outcomes

This practical assignment demonstrates the ability to:

1. Design and implement automated unit tests.
2. Validate inputs and handle exceptions.
3. Test object-oriented classes and state management.
4. Use Jest mocks to verify interactions.
5. Apply test isolation and lifecycle hooks.
6. Implement parameterized and data-driven tests.
7. Analyze code coverage and coverage thresholds.
8. Perform regression testing.
9. Apply first-order and higher-order mutation testing.
10. Improve software quality through systematic testing.

## 12. Conclusion

This project demonstrates the practical application of Jest unit testing and software quality assurance techniques.

Through 14 assignment questions, different testing approaches are applied to identify defects, validate application behavior, improve test independence, measure code coverage, and evaluate test effectiveness using mutation testing.

The project provides practical experience in developing reliable JavaScript applications through automated testing.

---

**Project:** Jest Unit Testing Lab

**Group:** 12

**Testing Framework:** Jest

**Mutation Testing Tool:** StrykerJS

**Current Test Status:** 201 Tests Passed
