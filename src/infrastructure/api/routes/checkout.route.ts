import express, { Request, Response } from "express";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/checkout.facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  try {
    const checkoutFacade = CheckoutFacadeFactory.create();
    const input = {
      clientId: req.body.clientId,
      products: req.body.products,
    };

    const output = await checkoutFacade.placeOrder(input);

    res.status(201).json(output);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});
