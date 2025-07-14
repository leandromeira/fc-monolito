import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn = async ({ context: sequelize }) => {
  const s = sequelize as Sequelize;
  await s.getQueryInterface().createTable("orders", {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "clients", key: "id" },
    },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });
};

export const down: MigrationFn = async ({ context: sequelize }) => {
  const s = sequelize as Sequelize;
  await s.getQueryInterface().dropTable("orders");
};
