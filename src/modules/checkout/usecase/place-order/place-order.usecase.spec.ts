import Address from "../../../@shared/domain/value-object/address";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

const mockClientFacade = (): ClientAdmFacadeInterface => ({
  add: jest.fn(),
  find: jest.fn(),
});

const mockProductFacade = (): ProductAdmFacadeInterface => ({
  addProduct: jest.fn(),
  checkStock: jest.fn(),
});

const mockCatalogFacade = (): StoreCatalogFacadeInterface => ({
  find: jest.fn(),
  findAll: jest.fn(),
});

const mockPaymentFacade = (): PaymentFacadeInterface => ({
  process: jest.fn(),
});

const mockInvoiceFacade = (): InvoiceFacadeInterface => ({
  generate: jest.fn(),
  find: jest.fn(),
});

const mockCheckoutGateway = (): CheckoutGateway => ({
  addOrder: jest.fn(),
  findOrder: jest.fn(),
});

describe("PlaceOrderUseCase unit tests", () => {
  let sut: PlaceOrderUseCase;
  let clientFacade: jest.Mocked<ClientAdmFacadeInterface>;
  let productFacade: jest.Mocked<ProductAdmFacadeInterface>;
  let catalogFacade: jest.Mocked<StoreCatalogFacadeInterface>;
  let paymentFacade: jest.Mocked<PaymentFacadeInterface>;
  let invoiceFacade: jest.Mocked<InvoiceFacadeInterface>;
  let checkoutGateway: jest.Mocked<CheckoutGateway>;

  beforeEach(() => {
    clientFacade = mockClientFacade() as jest.Mocked<ClientAdmFacadeInterface>;
    productFacade =
      mockProductFacade() as jest.Mocked<ProductAdmFacadeInterface>;
    catalogFacade =
      mockCatalogFacade() as jest.Mocked<StoreCatalogFacadeInterface>;
    paymentFacade = mockPaymentFacade() as jest.Mocked<PaymentFacadeInterface>;
    invoiceFacade = mockInvoiceFacade() as jest.Mocked<InvoiceFacadeInterface>;
    checkoutGateway = mockCheckoutGateway() as jest.Mocked<CheckoutGateway>;

    sut = new PlaceOrderUseCase(
      clientFacade,
      productFacade,
      catalogFacade,
      checkoutGateway,
      invoiceFacade,
      paymentFacade
    );
  });

  it("should place an order successfully", async () => {
    // Arrange
    const clientId = "client-1";
    const productId = "product-1";
    const orderId = "order-1";
    const invoiceId = "invoice-1";

    const client = {
      id: clientId,
      name: "Client 1",
      email: "client1@email.com",
      document: "12345678900",
      address: new Address(
        "Street 1",
        "123",
        "Apt 1",
        "City 1",
        "State 1",
        "12345-678"
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const product = {
      id: productId,
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    };

    const input: PlaceOrderInputDto = {
      clientId,
      products: [{ productId }],
    };

    clientFacade.find.mockResolvedValue(client);
    productFacade.checkStock.mockResolvedValue({
      productId,
      stock: 10,
    });
    catalogFacade.find.mockResolvedValue(product);
    paymentFacade.process.mockResolvedValue({
      transactionId: "transaction-1",
      orderId,
      amount: 100,
      status: "approved",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    invoiceFacade.generate.mockResolvedValue({
      id: invoiceId,
      name: client.name,
      document: client.document,
      street: client.address.street,
      complement: client.address.complement,
      number: client.address.number,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      items: [
        {
          id: productId,
          name: product.name,
          price: product.salesPrice,
        },
      ],
      total: 100,
    });

    // Act
    const result = await sut.execute(input);

    // Assert
    expect(result).toEqual({
      id: expect.any(String),
      invoiceId,
      status: "approved",
      total: 100,
      products: [{ productId }],
    });

    expect(clientFacade.find).toHaveBeenCalledWith({ id: clientId });
    expect(productFacade.checkStock).toHaveBeenCalledWith({ productId });
    expect(catalogFacade.find).toHaveBeenCalledWith({ id: productId });
    expect(paymentFacade.process).toHaveBeenCalledWith({
      orderId: expect.any(String),
      amount: 100,
    });
    expect(invoiceFacade.generate).toHaveBeenCalledWith({
      name: client.name,
      document: client.document,
      street: client.address.street,
      complement: client.address.complement,
      number: client.address.number,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      items: [
        {
          id: productId,
          name: product.name,
          price: product.salesPrice,
        },
      ],
    });
    expect(checkoutGateway.addOrder).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should place an order with payment declined", async () => {
    // Arrange
    const clientId = "client-1";
    const productId = "product-1";

    const client = {
      id: clientId,
      name: "Client 1",
      email: "client1@email.com",
      document: "12345678900",
      address: new Address(
        "Street 1",
        "123",
        "Apt 1",
        "City 1",
        "State 1",
        "12345-678"
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const product = {
      id: productId,
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    };

    const input: PlaceOrderInputDto = {
      clientId,
      products: [{ productId }],
    };

    clientFacade.find.mockResolvedValue(client);
    productFacade.checkStock.mockResolvedValue({
      productId,
      stock: 10,
    });
    catalogFacade.find.mockResolvedValue(product);
    paymentFacade.process.mockResolvedValue({
      transactionId: "transaction-1",
      orderId: "order-1",
      amount: 100,
      status: "declined",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    const result = await sut.execute(input);

    // Assert
    expect(result).toEqual({
      id: expect.any(String),
      invoiceId: null,
      status: "pending",
      total: 100,
      products: [{ productId }],
    });

    expect(invoiceFacade.generate).not.toHaveBeenCalled();
    expect(checkoutGateway.addOrder).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should throw an error when client is not found", async () => {
    // Arrange
    const input: PlaceOrderInputDto = {
      clientId: "invalid-client",
      products: [{ productId: "product-1" }],
    };

    clientFacade.find.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(input)).rejects.toThrow("Client not found");
  });

  it("should throw an error when no products are selected", async () => {
    // Arrange
    const client = {
      id: "client-1",
      name: "Client 1",
      email: "client1@email.com",
      document: "12345678900",
      address: new Address(
        "Street 1",
        "123",
        "Apt 1",
        "City 1",
        "State 1",
        "12345-678"
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    clientFacade.find.mockResolvedValue(client);

    const input: PlaceOrderInputDto = {
      clientId: "client-1",
      products: [],
    };

    // Act & Assert
    await expect(sut.execute(input)).rejects.toThrow("No products selected");
  });

  it("should throw an error when product is out of stock", async () => {
    // Arrange
    const clientId = "client-1";
    const productId = "product-1";

    const client = {
      id: clientId,
      name: "Client 1",
      email: "client1@email.com",
      document: "12345678900",
      address: new Address(
        "Street 1",
        "123",
        "Apt 1",
        "City 1",
        "State 1",
        "12345-678"
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const input: PlaceOrderInputDto = {
      clientId,
      products: [{ productId }],
    };

    clientFacade.find.mockResolvedValue(client);
    productFacade.checkStock.mockResolvedValue({
      productId,
      stock: 0,
    });

    // Act & Assert
    await expect(sut.execute(input)).rejects.toThrow(
      `Product ${productId} is not available in stock`
    );
  });

  it("should throw an error when product is not found in catalog", async () => {
    // Arrange
    const clientId = "client-1";
    const productId = "product-1";

    const client = {
      id: clientId,
      name: "Client 1",
      email: "client1@email.com",
      document: "12345678900",
      address: new Address(
        "Street 1",
        "123",
        "Apt 1",
        "City 1",
        "State 1",
        "12345-678"
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const input: PlaceOrderInputDto = {
      clientId,
      products: [{ productId }],
    };

    clientFacade.find.mockResolvedValue(client);
    productFacade.checkStock.mockResolvedValue({
      productId,
      stock: 10,
    });
    catalogFacade.find.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(input)).rejects.toThrow("Product not found");
  });

  it("should place an order with multiple products", async () => {
    // Arrange
    const clientId = "client-1";
    const product1Id = "product-1";
    const product2Id = "product-2";
    const invoiceId = "invoice-1";

    const client = {
      id: clientId,
      name: "Client 1",
      email: "client1@email.com",
      document: "12345678900",
      address: new Address(
        "Street 1",
        "123",
        "Apt 1",
        "City 1",
        "State 1",
        "12345-678"
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const product1 = {
      id: product1Id,
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100,
    };

    const product2 = {
      id: product2Id,
      name: "Product 2",
      description: "Product 2 description",
      salesPrice: 200,
    };

    const input: PlaceOrderInputDto = {
      clientId,
      products: [{ productId: product1Id }, { productId: product2Id }],
    };

    clientFacade.find.mockResolvedValue(client);
    productFacade.checkStock
      .mockResolvedValueOnce({ productId: product1Id, stock: 10 })
      .mockResolvedValueOnce({ productId: product2Id, stock: 5 });
    catalogFacade.find
      .mockResolvedValueOnce(product1)
      .mockResolvedValueOnce(product2);
    paymentFacade.process.mockResolvedValue({
      transactionId: "transaction-1",
      orderId: "order-1",
      amount: 300,
      status: "approved",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    invoiceFacade.generate.mockResolvedValue({
      id: invoiceId,
      name: client.name,
      document: client.document,
      street: client.address.street,
      complement: client.address.complement,
      number: client.address.number,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      items: [
        {
          id: product1Id,
          name: product1.name,
          price: product1.salesPrice,
        },
        {
          id: product2Id,
          name: product2.name,
          price: product2.salesPrice,
        },
      ],
      total: 300,
    });

    // Act
    const result = await sut.execute(input);

    // Assert
    expect(result).toEqual({
      id: expect.any(String),
      invoiceId,
      status: "approved",
      total: 300,
      products: [{ productId: product1Id }, { productId: product2Id }],
    });

    expect(productFacade.checkStock).toHaveBeenCalledTimes(2);
    expect(catalogFacade.find).toHaveBeenCalledTimes(2);
  });
});
