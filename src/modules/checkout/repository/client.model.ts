// src/modules/checkout/repository/client.model.ts
import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "checkout_clients", // Use um nome de tabela específico se desejar
  timestamps: false,
})
export class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;
}
