import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export const UserRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      res.status(409).json({ ok: false, message: "User already exists" });
      return;
    }

    await UserModel.create({ name, email, password });
    res.status(201).json({
      ok: true,
      message: "User Registered",
      name,
      email,
      password,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};

export const UserLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  res.json({
    message: "User Logged In",
    email,
    password,
  });
};
