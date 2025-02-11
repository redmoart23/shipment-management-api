import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { envs } from "../config/envs";
import {
  clientSchema,
  createClientSchema,
  createOrderSchema,
  orderSchema,
  updateOrderSchema,
  loginSchema,
  registerSchema,
} from "./swaggerSchemas";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coordinadora API ",
      version: "1.0.0",
      description: "API para coordinadora para gestión de pedidos y clientes",
    },
    servers: [
      {
        url: `http://localhost:${envs.port || 3000}`,
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        Client: clientSchema,
        CreateClient: createClientSchema,
        Order: orderSchema,
        CreateOrder: createOrderSchema,
        UpdateOrder: updateOrderSchema,
        Login: loginSchema,
        Register: registerSchema,
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

// Función para cargar Swagger en Express
export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
