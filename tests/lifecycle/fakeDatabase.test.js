import { jest } from "@jest/globals";
import { FakeDatabase } from "../../src/fakeDatabase.js";

describe("Question 6: Lifecycle Hooks and Resource Cleanup", () => {
  let db;
  let disconnectSpy;

  beforeAll(() => {
    db = new FakeDatabase();
    disconnectSpy = jest.spyOn(db, "disconnect");
    db.connect();
  });

  beforeEach(() => {
    // Reset records before every test to ensure state isolation
    db.records = [];
  });

  afterAll(() => {
    // Disconnect database after all tests complete
    db.disconnect();
    expect(disconnectSpy).toHaveBeenCalled();
    expect(db.connected).toBe(false);
  });

  describe("Connection State & Basic Insertion", () => {
    test("should insert record successfully when database is connected", () => {
      expect(db.connected).toBe(true);
      const record = { id: 1, name: "Database Record 1" };
      db.insert(record);

      expect(db.records).toHaveLength(1);
      expect(db.records[0]).toEqual(record);
    });

    test("should guarantee no record leakage from previous test (records array is fresh)", () => {
      // Because beforeEach reset records, it should have length 0
      expect(db.records).toHaveLength(0);
      db.insert({ id: 2, name: "Database Record 2" });
      expect(db.records).toHaveLength(1);
    });

    test("should reject insertion with error when database is intentionally disconnected", () => {
      const disconnectedDb = new FakeDatabase(); // not connected
      expect(disconnectedDb.connected).toBe(false);

      expect(() => {
        disconnectedDb.insert({ id: 99, name: "Orphan Record" });
      }).toThrow("Database not connected");

      expect(disconnectedDb.records).toHaveLength(0);
    });
  });

  describe("Nested Scopes and Hook Execution Order Verification", () => {
    const eventLog = [];

    beforeAll(() => {
      eventLog.push("nested-beforeAll");
    });

    beforeEach(() => {
      eventLog.push("nested-beforeEach");
    });

    afterEach(() => {
      eventLog.push("nested-afterEach");
    });

    afterAll(() => {
      eventLog.push("nested-afterAll");
    });

    test("nested test 1: records hook lifecycle events", () => {
      eventLog.push("nested-test-1");
      expect(eventLog).toEqual([
        "nested-beforeAll",
        "nested-beforeEach",
        "nested-test-1"
      ]);
    });

    test("nested test 2: verifies hook order between sequential tests", () => {
      eventLog.push("nested-test-2");
      expect(eventLog).toEqual([
        "nested-beforeAll",
        "nested-beforeEach",
        "nested-test-1",
        "nested-afterEach",
        "nested-beforeEach",
        "nested-test-2"
      ]);
    });
  });

  describe("Cleanup Verification with Spies and Rejected Operations", () => {
    test("should verify that disconnect spy is tracked and cleanup rejects subsequent inserts", () => {
      const localDb = new FakeDatabase();
      const localDisconnectSpy = jest.spyOn(localDb, "disconnect");

      localDb.connect();
      expect(localDb.connected).toBe(true);

      localDb.insert({ id: 10, title: "Active Item" });
      expect(localDb.records).toHaveLength(1);

      // Trigger disconnect
      localDb.disconnect();
      expect(localDisconnectSpy).toHaveBeenCalledTimes(1);
      expect(localDb.connected).toBe(false);

      // Verify that intentionally rejected operation is caught cleanly with toThrow
      expect(() => {
        localDb.insert({ id: 11, title: "Post-disconnect Item" });
      }).toThrow("Database not connected");

      // No failing test remains
    });
  });
});

