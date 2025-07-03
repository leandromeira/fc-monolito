import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { OrderItemModel } from "./order-item.model";

@Table({
  tableName: "order",
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @Column({ allowNull: false })
  total: number;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false })
  clientId: string;

  @BelongsTo(() => ClientModel)
  client: ClientModel;

  @HasMany(() => OrderItemModel)
  items: OrderItemModel[];
}
