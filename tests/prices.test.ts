import { updatePrice, getAvgPrice, clearPrices } from "../src/services/prices";

describe("Price Service", () => {
  afterEach(() => {
    clearPrices();
  });

  describe("updatePrice", () => {
    it("should update the price of a given key", () => {
      updatePrice("apple", 1.5);
      updatePrice("banana", 2.0);

      expect(getAvgPrice()).toBe(1.75);
    });
  });

  describe("getAvgPrice", () => {
    it("should return correct average when prices are present", () => {
      updatePrice("apple", 3.0);
      updatePrice("banana", 4.0);
      updatePrice("cherry", 5.0);

      expect(getAvgPrice()).toBe(4.0);
    });
  });

  describe("clearPrices", () => {
    it("should remove all prices", () => {
      updatePrice("apple", 10.0);
      updatePrice("banana", 20.0);

      clearPrices();

      expect(getAvgPrice()).toBeNaN();
    });
  });
});
