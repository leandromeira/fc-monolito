import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const procuctFacade = ProductAdmFacadeFactory.create();
  try {
    const input = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };

    const output = await procuctFacade.addProduct(input);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.put("/sales-price/:id", async (req: Request, res: Response) => {
  const procuctStoreFacade = StoreCatalogFacadeFactory.create();
  try {
    const input = {
      id: req.params.id,
      salesPrice: req.body.salesPrice,
    };

    const output = await procuctStoreFacade.updateSalesPrice(input);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
