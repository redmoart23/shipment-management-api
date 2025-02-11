import express from "express";
const router = express.Router();

import { check } from "express-validator";

import {
  CreateOrder,
  OrderList,
  OrderDetail,
  UpdateOrderStatus,
} from "../controllers/orders.controller";
import { FieldsValidator } from "../middlewares/fields-validator";
import { validateJwt } from "../middlewares/validate-jwt";

router.use(validateJwt);

/**
 *  @swagger
 *  /api/v1/orders:
 *    post:
 *      summary: Create a new order
 *      description: Create a new order
 *      tags: [Orders]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CreateOrder"
 *      responses:
 *        201:
 *          description: Order created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Order"
 */

router.post(
  "/",
  [
    check("Cliente_id", "Cliente_id is required").not().isEmpty(),
    check("Peso", "Peso is required").not().isEmpty().isNumeric(),
    check("Volumen", "Volumen is required").not().isEmpty().isNumeric(),
    check("Tipo_Producto", "Tipo_Producto is required").not().isEmpty(),
    check("Ciudad_Origen", "Ciudad_Origen is required").not().isEmpty(),
    check("Ciudad_Destino", "Ciudad_Destino is required").not().isEmpty(),
    check("Direccion_Origen", "Direccion_Origen is required").not().isEmpty(),
    check("Direccion_Destino", "Direccion_Destino is required").not().isEmpty(),
    FieldsValidator,
  ],
  CreateOrder
);

/**
 *  @swagger
 *  /api/v1/orders:
 *    get:
 *      summary: Get all orders
 *      description: Get all orders
 *      tags: [Orders]
 *      responses:
 *        200:
 *          description: All orders
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Order"
 *
 */
router.get("/", OrderList);
/**
 *  @swagger
 *  /api/v1/orders/{id}:
 *    get:
 *      summary: Get a order by id
 *      description: Get a order by id
 *      tags: [Orders]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Order ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Order details
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Order"
 */
router.get("/:id", OrderDetail);

/**
 *  @swagger
 *  /api/v1/orders/{id}:
 *    patch:
 *      summary: Update a order by id
 *      description: Update a order by id
 *      tags: [Orders]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: Order ID
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UpdateOrder"
 *      responses:
 *        200:
 *          description: Order updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Order"
 */
router.patch(
  "/:id",
  [
    check("Estado_Orden", "Estado_Orden is required").not().isEmpty(),
    FieldsValidator,
  ],
  UpdateOrderStatus
);

module.exports = router;
