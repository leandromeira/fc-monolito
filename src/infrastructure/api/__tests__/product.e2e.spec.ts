import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });
  it("should create a product", async () => {
    const input = {
      id: "123",
      name: "Product 1",
      description: "Description of Product 1",
      purchasePrice: 80,
      stock: 20,
    };
    const response = await request(app).post("/products").send(input);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(response.body.id).toBe("123");
    expect(response.body.name).toBe("Product 1");
    expect(response.body.description).toBe("Description of Product 1");
    expect(response.body.purchasePrice).toBe(80);
    expect(response.body.stock).toBe(20);
  });
});
