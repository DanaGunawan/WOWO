import { Request, Response, NextFunction } from "express";

type asyncControllers = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const AsyncHandler =
  (controller: asyncControllers) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (e) {
      next(e);
    }
  };
