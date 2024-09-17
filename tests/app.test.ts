import request from "supertest";
import app from "../src/app";
import { clearPrices, updatePrice } from "../src/services/prices";

// Mock external services
jest.mock("../src/services/binance", () => ({
  startBinanceWebSocket: jest.fn(),
}));
jest.mock("../src/services/huobi", () => ({
  startHuobiWebSocket: jest.fn(),
}));
jest.mock("../src/services/kraken", () => ({
  updateKrakenPrice: jest.fn(),
}));

describe("Test mid-price aggregator service", () => {
  beforeEach(() => {
    clearPrices();
  });

  it("should return the average price", async () => {
    // Simulate price updates
    updatePrice("binance", 50000);
    updatePrice("huobi", 50100);
    updatePrice("kraken", 50200);

    const response = await request(app).get("/api/getPrice");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("price");
    expect(response.body.price).toBe(50100);
  });

  it("should handle empty prices", async () => {
    const response = await request(app).get("/api/getPrice");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("price");
    expect(response.body.price).toBe(null);
  });
});
