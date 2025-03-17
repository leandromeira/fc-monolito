import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
  find(id: number): Promise<Invoice>;
  generate(invoice: Invoice): Promise<void>;
}
