import express from "express";
import { check } from "express-validator";
import { UserRegistration, UserLogin } from "../controllers/auth.controller";
import { FieldsValidator } from "../middlewares/fields-validator";
import { PasswordValidationMessage } from "../utils/messages";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Register"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Login"
 *
 */
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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Login"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Login"
 */

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
