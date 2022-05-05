import { Request, Response } from "express";
import { Currency } from "../model/Currency";
import respond from "../services/Respond";

export default class Report {
  static async getCoinPairReport(req: Request, res: Response) {
    try {
      const report = await Currency.find({});
      return respond(res, 201, true, "Operation successful", {
        report,
      });
    } catch ({ message }) {
      return respond(res, 500, false, message as string);
    }
  }
}
