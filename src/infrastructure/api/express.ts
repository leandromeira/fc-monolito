import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel as ClientOrderModel } from "../../modules/checkout/repository/client.model";
import { OrderItemModel } from "../../modules/checkout/repository/order-item.model";
import { OrderModel } from "../../modules/checkout/repository/order.model";
import ProductOrderModel from "../../modules/checkout/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { InvoiceItemsModel } from "../../modules/invoice/repository/invoice-items/invoice-items.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice/invoice.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import ProductAdmModel from "../../modules/product-adm/repository/product.model";
import ProductStoreCatalogModel from "../../modules/store-catalog/repository/product.model";
import { checkoutRoute } from "./routes/checkout.route";
import { clientRoute } from "./routes/client.route";

export const app: Express = express();
app.use(express.json());
app.use("/clients", clientRoute);
app.use("/checkout", checkoutRoute);
// app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([
    ProductAdmModel,
    ProductStoreCatalogModel,
    ProductOrderModel,
    ClientModel,
    OrderModel,
    OrderItemModel,
    ClientOrderModel,
    TransactionModel,
    InvoiceModel,
    InvoiceItemsModel,
  ]);
  await sequelize.sync();
}
setupDb();
