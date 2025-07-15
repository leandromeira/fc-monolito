import request from "supertest";
import { app, sequelize } from "../express";
import { migrator } from "../db/sequelize/config/migrator";

describe("E2E test for invoice", () => {
  beforeEach(async () => {
    await sequelize.drop();
    await migrator(sequelize).up();
  });

  afterAll(async () => {
    await migrator(sequelize).down();
    await sequelize.close();
  });

  it("should get an invoice by id", async () => {
    const inputClient = {
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
    const clientCreated = await request(app).post("/clients").send(inputClient);

    const inputProduct = {
      id: "123",
      name: "Product 1",
      description: "Description of Product 1",
      purchasePrice: 80,
      stock: 20,
    };
    await request(app).post("/products").send(inputProduct);

    await request(app)
      .put(`/products/sales-price/123`)
      .send({ salesPrice: 120 });

    const checkoutInput = {
      clientId: clientCreated.body.id,
      products: [{ id: "123" }],
    };
    const checkoutResponse = await request(app)
      .post("/checkout")
      .send(checkoutInput);

    const invoiceId =
      checkoutResponse.body.invoiceId || checkoutResponse.body.id;
    const response = await request(app).get(`/invoices/${invoiceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(invoiceId);
  });
});
