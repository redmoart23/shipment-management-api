import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../config/envs";

export const validateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["x-token"] as string;
  if (!token) {
    res.status(401).json({
      success: false,
      msg: "No token in request",
    });
    return;
  }

  try {
    const payload = jwt.verify(token, envs.secretJwtSecret);
    req.body.user = payload;
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "Token not valid",
    });
    return;
  }

  next();
};
