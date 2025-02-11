import express from "express";
import { ClientRegistration } from "../controllers/clients.controller";
import { check } from "express-validator";
import { FieldsValidator } from "../middlewares/fields-validator";
import { ClientDetail, ClientList } from "../controllers/clients.controller";
import { validateJwt } from "../middlewares/validate-jwt";

const router = express.Router();

router.use(validateJwt);

/**
 * @swagger
 * /api/v1/clients:
 *   post:
 *     summary: Create a new client
 *     description: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateClient"
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Client"
 *
 */
router.post(
  "/",
  [
    check("Nombre", "Nombre is required").not().isEmpty(),
    check("Tipo_Documento", "Tipo_Documento is required").not().isEmpty(),
    check("Numero_Documento", "Numero_Documento is required")
      .not()
      .isEmpty()
      .isNumeric(),
    check("Telefono_Fijo", "Telefono_Fijo is required"),
    check("Celular", "Celular is required").not().isEmpty(),
    check("Correo_Electronico", "Correo_Electronico is required")
      .not()
      .isEmpty()
      .isEmail(),
    check("Departamento", "Departamento is required").not().isEmpty(),
    check("Ciudad", "Ciudad is required").not().isEmpty(),
    check("Direccion", "Direccion is required").not().isEmpty(),
    FieldsValidator,
  ],
  ClientRegistration
);

/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: Get all clients
 *     description: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Client"
 */

router.get("/", ClientList);

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   get:
 *     summary: Get a client by id
 *     description: Get a client by id
 *     tags: [Clients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Client ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Client"
 */

router.get("/:id", ClientDetail);

module.exports = router;
