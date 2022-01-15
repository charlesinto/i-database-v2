import { Request, Response } from "express";
export const handleErrorAsync =
  (func: any) => async (req: Request, res: Response, next: any) => {
    try {
      await func(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
