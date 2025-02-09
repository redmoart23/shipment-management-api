import { validationResult } from "express-validator";
import express from "express";

export const FieldsValidator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ ok: false, errors: errors.mapped() });
    return;
  }

  next();
};
