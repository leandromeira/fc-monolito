import Address from "../../../@shared/domain/value-object/address";
import InvoiceGateway from "../../gateway/Invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find.dto";

export default class FindInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway;

  constructor(_invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = _invoiceRepository;
  }

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this._invoiceRepository.find(input.id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.address.street,
        invoice.address.number,
        invoice.address.complement,
        invoice.address.city,
        invoice.address.state,
        invoice.address.zipCode
      ),
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.items.length,
      createdAt: invoice.createdAt,
    };
  }
}
