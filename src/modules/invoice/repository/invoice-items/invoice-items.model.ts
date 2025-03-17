import { Table, PrimaryKey, Column, Model } from "sequelize-typescript";

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

  @Column({ allowNull: false, field: "invoice_id" })
  invoiceId: string;
}
