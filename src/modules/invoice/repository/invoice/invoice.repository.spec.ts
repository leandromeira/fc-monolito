import { Sequelize } from "sequelize-typescript";
import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import { InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import { InvoiceItemsModel } from "../invoice-items/invoice-items.model";

describe("InvoiceRepository test", () => {
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
    const invoiceProps = {
      id: new Id("1"),
      name: "Invoice 1",
      document: "123456789",
      address: new Address(
        "Rua 1",
        "123",
        "Complement 1",
        "City 1",
        "State 1",
        "12345678"
      ),
      items: [
        new InvoiceItems({
          id: new Id("1"),
          name: "Item 1",
          price: 100,
        }),
      ],
    };
    const invoice = new Invoice(invoiceProps);
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoiceProps.id.id },
      include: [{ model: InvoiceItemsModel }],
    });

    expect(invoiceProps.id.id).toEqual(invoiceDb.id);
    expect(invoiceProps.name).toEqual(invoiceDb.name);
    expect(invoiceProps.document).toEqual(invoiceDb.document);
    expect(invoiceProps.address.street).toEqual(invoiceDb.street);
    expect(invoiceProps.address.number).toEqual(invoiceDb.number);
    expect(invoiceProps.address.complement).toEqual(invoiceDb.complement);
    expect(invoiceProps.address.city).toEqual(invoiceDb.city);
    expect(invoiceProps.address.state).toEqual(invoiceDb.state);
    expect(invoiceProps.address.zipCode).toEqual(invoiceDb.zipcode);
    expect(invoiceProps.items[0].id.id).toEqual(invoiceDb.items[0].id);
    expect(invoiceProps.items[0].name).toEqual(invoiceDb.items[0].name);
    expect(invoiceProps.items[0].price).toEqual(invoiceDb.items[0].price);
  });

  it("should find an invoice", async () => {
    const invoiceRepository = new InvoiceRepository();

    InvoiceModel.create({
      id: "1",
      name: "Invoice 1",
      document: "123456789",
      street: "Rua 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipcode: "12345678",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    InvoiceItemsModel.create({
      id: "1",
      name: "Item 1",
      price: 100,
      invoiceId: "1",
    });

    const invoice = await invoiceRepository.find("1");

    expect(invoice.id.id).toEqual("1");
    expect(invoice.name).toEqual("Invoice 1");
    expect(invoice.document).toEqual("123456789");
    expect(invoice.address.street).toEqual("Rua 1");
    expect(invoice.address.number).toEqual("123");
    expect(invoice.address.complement).toEqual("Complement 1");
    expect(invoice.address.city).toEqual("City 1");
    expect(invoice.address.state).toEqual("State 1");
    expect(invoice.address.zipCode).toEqual("12345678");
    expect(invoice.items[0].id.id).toEqual("1");
    expect(invoice.items[0].name).toEqual("Item 1");
    expect(invoice.items[0].price).toEqual(100);
  });
});
