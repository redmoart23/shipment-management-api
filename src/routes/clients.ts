import express from "express";
import { ClientRegistration } from "../controllers/clients.controller";
import { check } from "express-validator";
import { FieldsValidator } from "../middlewares/fields-validator";
import { ClientDetail, ClientList } from "../controllers/clients.controller";
import { validateJwt } from "../middlewares/validate-jwt";

const router = express.Router();

router.use(validateJwt);

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

router.get("/", ClientList);
router.get("/:id", ClientDetail);

module.exports = router;
