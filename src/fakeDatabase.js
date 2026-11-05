/**
 * FakeDatabase Module
 * Question 6: Lifecycle Hooks and Resource Cleanup
 */

export class FakeDatabase {
  constructor() {
    this.connected = false;
    this.records = [];
  }

  connect() {
    this.connected = true;
  }

  insert(record) {
    if (!this.connected) {
      throw new Error("Database not connected");
    }
    this.records.push(record);
    return record;
  }

  disconnect() {
    this.connected = false;
  }

  clear() {
    this.records = [];
  }
}

