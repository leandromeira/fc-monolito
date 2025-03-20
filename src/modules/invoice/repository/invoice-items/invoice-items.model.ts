import {
  Table,
  PrimaryKey,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { InvoiceModel } from "../invoice/invoice.model";

@Table({
  tableName: "invoice_items",
  timestamps: false,
})
export class InvoiceItemsModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false, field: "invoice_id" })
  invoiceId: string;

  @BelongsTo(() => InvoiceModel)
  invoice: InvoiceModel;
}
