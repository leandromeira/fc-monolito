import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";
import express, { Request, Response } from "express";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  const invoiceFacade = InvoiceFacadeFactory.create();
  try {
    const input = {
      id: req.params.id,
    };
    const output = await invoiceFacade.find(input);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
