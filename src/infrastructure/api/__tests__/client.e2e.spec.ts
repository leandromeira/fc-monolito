import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });
  it("should create a client", async () => {
    const input = {
      name: "John Doe",
      email: "john.doe@example.com",
      document: "1234567890",
      address: {
        street: "123 Main St",
        number: "123",
        complement: "Apt 1",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
      },
    };
    const response = await request(app).post("/clients").send(input);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("john.doe@example.com");
    expect(response.body.document).toBe("1234567890");
    expect(response.body.address).toBeDefined();
    expect(response.body.address._street).toEqual(input.address.street);
    expect(response.body.address._number).toBe(input.address.number);
    expect(response.body.address._complement).toBe(input.address.complement);
    expect(response.body.address._city).toBe(input.address.city);
    expect(response.body.address._state).toBe(input.address.state);
    expect(response.body.address._zipCode).toBe(input.address.zipCode);
  });
});
