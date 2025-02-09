import express from "express";
import { validationResult } from "express-validator";

//export const UserRegistration = async (req?: Request, res?: Response): Promise<void> => {

export const UserRegistration = async (
  req = express.request,
  res = express.response
): Promise<void> => {
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    message: "User Registered",
    name,
    email,
    password,
  });
};

export const UserLogin = async (
  req = express.request,
  res = express.response
): Promise<void> => {
  const { email, password } = req.body;

  res.json({
    message: "User Logged In",
    email,
    password,
  });
};
