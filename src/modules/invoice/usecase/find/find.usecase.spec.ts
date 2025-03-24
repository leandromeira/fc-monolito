import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "1234-5678",
  address: new Address(
    "Rua 123",
    "99",
    "Casa Verde",
    "Criciúma",
    "SC",
    "88888-888"
  ),
  items: [
    new InvoiceItems({
      id: new Id("1"),
      name: "Product 1",
      price: 100,
    }),
    new InvoiceItems({
      id: new Id("2"),
      name: "Product 2",
      price: 200,
    }),
  ],
});

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find Invoice usecase unit test", () => {
  it("should find an invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toBe("Invoice 1");
    expect(result.document).toBe("1234-5678");
    expect(result.address.street).toBe("Rua 123");
    expect(result.address.number).toBe("99");
    expect(result.address.complement).toBe("Casa Verde");
    expect(result.address.city).toBe("Criciúma");
    expect(result.address.state).toBe("SC");
    expect(result.address.zipCode).toBe("88888-888");
    expect(result.items).toEqual([
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
    ]);
  });
});
