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
router.get("/", OrderList);
router.get("/:id", OrderDetail);
router.patch(
  "/:id",
  [
    check("Estado_Orden", "Estado_Orden is required").not().isEmpty(),
    FieldsValidator,
  ],
  UpdateOrderStatus
);

module.exports = router;
