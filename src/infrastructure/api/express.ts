import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { clientRoute } from "./routes/client.route";
import { ClientModel } from "../../modules/client-adm/repository/client.model";

export const app: Express = express();
app.use(express.json());
app.use("/clients", clientRoute);
// app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ClientModel]);
  await sequelize.sync();
}
setupDb();
