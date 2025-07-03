/*
describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });
  it("should place an order", async () => {
    const input = {
      clientId: "123",
      products: [{ id: "1" }, { id: "2" }],
    };
    const response = await request(app).post("/checkout").send(input);
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.total).toBeDefined();
    expect(response.body.products).toBeDefined();
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0].productId).toBe("1");
    expect(response.body.products[1].productId).toBe("2");
    expect(response.body.clientId).toBe("123");
    expect(response.body.status).toBe("approved");
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });
});
*/
