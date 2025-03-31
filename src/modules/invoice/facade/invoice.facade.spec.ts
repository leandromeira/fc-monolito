import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceItemsModel } from "../repository/invoice-items/invoice-items.model";

describe("Invoice Facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate an invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: "Invoice 1",
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipCode: "88888-888",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
        },
        {
          id: "2",
          name: "Product 2",
          price: 200,
        },
      ],
    };

    const result = await invoiceFacade.generate(input);

    const invoice = await InvoiceModel.findOne({
      where: { id: result.id },
      include: [InvoiceItemsModel],
    });

    expect(invoice).toBeDefined();
    expect(invoice.id).toBeDefined();
    expect(invoice.name).toBe(input.name);
    expect(invoice.document).toBe(input.document);
    expect(invoice.street).toBe(input.street);
    expect(invoice.number).toBe(input.number);
    expect(invoice.complement).toBe(input.complement);
    expect(invoice.city).toBe(input.city);
    expect(invoice.state).toBe(input.state);
    expect(invoice.zipcode).toBe(input.zipCode);
    expect(invoice.items.length).toBe(2);
    expect(invoice.items[0].id).toBe(input.items[0].id);
    expect(invoice.items[0].name).toBe(input.items[0].name);
    expect(invoice.items[0].price).toBe(input.items[0].price);
    expect(invoice.items[1].id).toBe(input.items[1].id);
    expect(invoice.items[1].name).toBe(input.items[1].name);
    expect(invoice.items[1].price).toBe(input.items[1].price);
  });

  it("should find an invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: "Invoice 1",
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipCode: "88888-888",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
        },
        {
          id: "2",
          name: "Product 2",
          price: 200,
        },
      ],
    };

    const result = await invoiceFacade.generate(input);

    const invoiceFound = await invoiceFacade.find({ id: result.id });
    expect(invoiceFound).toBeDefined();
    expect(invoiceFound.id).toBeDefined();
    expect(invoiceFound.name).toBe(input.name);
    expect(invoiceFound.document).toBe(input.document);
    expect(invoiceFound.address.street).toBe(input.street);
    expect(invoiceFound.address.number).toBe(input.number);
    expect(invoiceFound.address.complement).toBe(input.complement);
    expect(invoiceFound.address.city).toBe(input.city);
    expect(invoiceFound.address.state).toBe(input.state);
    expect(invoiceFound.address.zipCode).toBe(input.zipCode);
    expect(invoiceFound.items.length).toBe(2);
    expect(invoiceFound.items[0].id).toBe(input.items[0].id);
    expect(invoiceFound.items[0].name).toBe(input.items[0].name);
    expect(invoiceFound.items[0].price).toBe(input.items[0].price);
    expect(invoiceFound.items[1].id).toBe(input.items[1].id);
    expect(invoiceFound.items[1].name).toBe(input.items[1].name);
    expect(invoiceFound.items[1].price).toBe(input.items[1].price);
  });
});
