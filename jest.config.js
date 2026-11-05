export default {
  testEnvironment: "node",
  transform: {},
  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.js"],
  coverageReporters: ["text", "html", "lcov"],
  modulePathIgnorePatterns: ["<rootDir>/.stryker-tmp/"],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 85,
      functions: 90,
      lines: 90
    }
  }
};
