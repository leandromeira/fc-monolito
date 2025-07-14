import request from "supertest";
import { app, sequelize } from "../express";
import { migrator } from "../db/sequelize/config/migrator";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.drop();
    await migrator(sequelize).up();
  });

  afterAll(async () => {
    await migrator(sequelize).down();
    await sequelize.close();
  });

  it("should place an order", async () => {
    // Cria o cliente
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
    expect(clientCreated.status).toBe(200);

    // Cria o produto
    const inputProduct = {
      id: "123",
      name: "Product 1",
      description: "Description of Product 1",
      purchasePrice: 80,
      stock: 20,
    };
    const productCreate = await request(app)
      .post("/products")
      .send(inputProduct);
    expect(productCreate.status).toBe(200);

    // Faz o checkout
    const checkoutInput = {
      clientId: clientCreated.body.id,
      products: [{ id: "123" }],
    };
    const response = await request(app).post("/checkout").send(checkoutInput);
    if (response.status !== 201) {
      console.error("Erro no checkout:", response.body);
    }
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    // ...demais asserts conforme o retorno esperado
  });
});
