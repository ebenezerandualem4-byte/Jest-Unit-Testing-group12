import { calculateTuition, findMostExpensiveCourse } from "../../src/tuition.js";

describe("Question 3: Tuition Fee Calculation and Array Processing", () => {
  describe("Task 1: Basic Scenarios & scholarshipRate Variations", () => {
    test("should return 0 subtotal, discount, and payable when course array is empty", () => {
      const result = calculateTuition([]);
      expect(result).toEqual({ subtotal: 0, discount: 0, payable: 0 });
    });

    test("should calculate tuition for a single course with default scholarshipRate", () => {
      const courses = [{ code: "CS101", creditHours: 3, pricePerCredit: 250 }];
      const result = calculateTuition(courses);
      expect(result).toEqual({ subtotal: 750, discount: 0, payable: 750 });
    });

    test("should calculate tuition for several courses with undefined scholarshipRate (defaults to 0)", () => {
      const courses = [
        { code: "CS101", creditHours: 3, pricePerCredit: 200 }, // 600
        { code: "CS102", creditHours: 4, pricePerCredit: 150 }, // 600
        { code: "ENG101", creditHours: 2, pricePerCredit: 100 }  // 200
      ];
      const result = calculateTuition(courses, undefined);
      expect(result).toEqual({ subtotal: 1400, discount: 0, payable: 1400 });
    });

    test("should explicitly reject null as an invalid scholarshipRate with TypeError", () => {
      const courses = [{ creditHours: 3, pricePerCredit: 200 }];
      expect(() => calculateTuition(courses, null)).toThrow(TypeError);
      expect(() => calculateTuition(courses, null)).toThrow("Scholarship rate cannot be null");
    });
  });

  describe("Task 2: Type Enforcement and Range Validation", () => {
    test("should throw TypeError when courses is not an array", () => {
      expect(() => calculateTuition("not-an-array")).toThrow(TypeError);
      expect(() => calculateTuition(null)).toThrow(TypeError);
      expect(() => calculateTuition({})).toThrow(TypeError);
    });

    test("should throw TypeError for invalid creditHours types", () => {
      expect(() => calculateTuition([{ creditHours: "3", pricePerCredit: 100 }])).toThrow(TypeError);
      expect(() => calculateTuition([{ creditHours: 3.5, pricePerCredit: 100 }])).toThrow(TypeError);
      expect(() => calculateTuition([{ creditHours: null, pricePerCredit: 100 }])).toThrow(TypeError);
    });

    test("should throw RangeError for negative creditHours", () => {
      expect(() => calculateTuition([{ creditHours: -1, pricePerCredit: 100 }])).toThrow(RangeError);
      expect(() => calculateTuition([{ creditHours: -5, pricePerCredit: 100 }])).toThrow("Course creditHours at index 0 must be nonnegative");
    });

    test("should throw TypeError for invalid pricePerCredit types", () => {
      expect(() => calculateTuition([{ creditHours: 3, pricePerCredit: "100" }])).toThrow(TypeError);
      expect(() => calculateTuition([{ creditHours: 3, pricePerCredit: NaN }])).toThrow(TypeError);
      expect(() => calculateTuition([{ creditHours: 3, pricePerCredit: Infinity }])).toThrow(TypeError);
    });

    test("should throw RangeError for negative pricePerCredit", () => {
      expect(() => calculateTuition([{ creditHours: 3, pricePerCredit: -10 }])).toThrow(RangeError);
    });

    test("should throw TypeError for non-numeric scholarshipRate", () => {
      const courses = [{ creditHours: 3, pricePerCredit: 100 }];
      expect(() => calculateTuition(courses, "0.25")).toThrow(TypeError);
      expect(() => calculateTuition(courses, NaN)).toThrow(TypeError);
    });

    test("should throw RangeError when scholarshipRate is outside [0, 1]", () => {
      const courses = [{ creditHours: 3, pricePerCredit: 100 }];
      expect(() => calculateTuition(courses, -0.01)).toThrow(RangeError);
      expect(() => calculateTuition(courses, 1.01)).toThrow(RangeError);
      expect(() => calculateTuition(courses, 1.5)).toThrow(RangeError);
    });
  });

  describe("Task 3: Precision, Rounding Policy & Object Immutability", () => {
    test("should round subtotal, discount, and payable to two decimal places using standard half-up rounding", () => {
      // 3 credits * 33.333 = 99.999 => subtotal rounds to 100
      // 100 * 0.333 = 33.3 => discount 33.30, payable 66.70
      const courses = [
        { creditHours: 3, pricePerCredit: 33.333 }
      ];
      const result = calculateTuition(courses, 0.333);
      expect(result.subtotal).toBe(100.00);
      expect(result.discount).toBe(33.30);
      expect(result.payable).toBe(66.70);
    });

    test("should handle floating-point precision issues like 0.1 + 0.2 without imprecision leakage", () => {
      const courses = [
        { creditHours: 1, pricePerCredit: 0.1 },
        { creditHours: 1, pricePerCredit: 0.2 }
      ];
      const result = calculateTuition(courses, 0.1);
      expect(result.subtotal).toBe(0.3);
      expect(result.discount).toBe(0.03);
      expect(result.payable).toBe(0.27);
    });

    test("should assert that no input course object or array is mutated during calculation", () => {
      const courses = [
        { code: "CS101", creditHours: 3, pricePerCredit: 150 },
        { code: "MATH201", creditHours: 4, pricePerCredit: 200 }
      ];

      // Deep freeze each course to ensure any attempt to mutate causes strict failure
      Object.freeze(courses);
      courses.forEach((c) => Object.freeze(c));

      const result = calculateTuition(courses, 0.2);

      expect(result.subtotal).toBe(1250);
      expect(result.discount).toBe(250);
      expect(result.payable).toBe(1000);
      expect(courses[0].code).toBe("CS101");
      expect(courses[1].pricePerCredit).toBe(200);
    });
  });

  describe("Task 4: findMostExpensiveCourse()", () => {
    test("should return null for an empty array of courses", () => {
      expect(findMostExpensiveCourse([])).toBeNull();
    });

    test("should throw TypeError when courses is not an array", () => {
      expect(() => findMostExpensiveCourse(null)).toThrow(TypeError);
    });

    test("should identify the single most expensive course correctly", () => {
      const courses = [
        { id: "A", creditHours: 3, pricePerCredit: 100 }, // 300
        { id: "B", creditHours: 4, pricePerCredit: 120 }, // 480 (highest)
        { id: "C", creditHours: 2, pricePerCredit: 200 }  // 400
      ];
      const expensive = findMostExpensiveCourse(courses);
      expect(expensive).toBe(courses[1]);
      expect(expensive.id).toBe("B");
    });

    test("should return the first matching course when there is a tie for highest cost", () => {
      const course1 = { id: "FIRST_TIE", creditHours: 4, pricePerCredit: 150 }; // 600
      const course2 = { id: "CHEAPER", creditHours: 2, pricePerCredit: 100 };    // 200
      const course3 = { id: "SECOND_TIE", creditHours: 3, pricePerCredit: 200 }; // 600

      const courses = [course1, course2, course3];
      const result = findMostExpensiveCourse(courses);

      expect(result).toBe(course1);
      expect(result.id).toBe("FIRST_TIE");
    });
  });
});

