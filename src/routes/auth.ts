import express from "express";
import { check } from "express-validator";
import { UserRegistration, UserLogin } from "../controllers/auth.controller";
import { FieldsValidator } from "../middlewares/fields-validator";
import { PasswordValidationMessage } from "../utils/messages";

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail().not().isEmpty(),
    check("password", PasswordValidationMessage)
      .isLength({ min: 6, max: 20 })
      .isStrongPassword(),
    FieldsValidator,
  ],
  UserRegistration
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail().not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    FieldsValidator,
  ],
  UserLogin
);

module.exports = router;
