import express, { Request, Response } from "express";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const checkoutFacade = CheckoutFacadeFactory.create();
  const input = {
    clientId: req.body.clientId,
  };
});
