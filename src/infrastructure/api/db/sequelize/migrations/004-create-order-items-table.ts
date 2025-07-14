import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn = async ({ context: sequelize }) => {
  const s = sequelize as Sequelize;
  await s.getQueryInterface().createTable("order_items", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "orders", key: "id" },
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "products", key: "id" },
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });
};

export const down: MigrationFn = async ({ context: sequelize }) => {
  const s = sequelize as Sequelize;
  await s.getQueryInterface().dropTable("order_items");
};
