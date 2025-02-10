import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const FieldsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ ok: false, errors: errors.mapped() });
    return;
  }

  next();
};
