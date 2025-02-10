import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import bcrypt from "bcryptjs";
import { generateJwt } from "../helpers/jwt";

export const UserRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      res.status(409).json({ success: false, message: "User already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync();

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await generateJwt(newUser.name);

    res.status(201).json({
      ok: true,
      message: "User Registered",
      name: newUser.name,
      email: newUser.email,
      token,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const UserLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findByEmail(email);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = await generateJwt(user.name);

    res.status(200).json({
      message: "User Logged In",
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
