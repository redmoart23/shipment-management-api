import { Request, Response } from "express";
import ClientModel from "../models/ClientModel";
import redisClient from "../database/cache";
export const ClientRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    Nombre,
    Tipo_Documento,
    Numero_Documento,
    Telefono_Fijo,
    Celular,
    Correo_Electronico,
    Departamento,
    Ciudad,
    Direccion,
  } = req.body;

  try {
    await redisClient.del("clients");

    const existingClient = await ClientModel.findByDocument(Numero_Documento);
    if (existingClient) {
      res
        .status(409)
        .json({ success: false, message: "Client already exists" });
      return;
    }

    const Client_id = "CR" + Math.random().toString(36).substring(2, 10);

    await ClientModel.create({
      Client_id,
      Nombre,
      Tipo_Documento,
      Numero_Documento,
      Telefono_Fijo,
      Celular,
      Correo_Electronico,
      Departamento,
      Ciudad,
      Direccion,
    });

    res.status(200).json({
      success: true,
      message: "Client Registered Successfully",
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const ClientList = async (req: Request, res: Response) => {
  try {
    const cachedClients = await redisClient.get("clients");

    if (cachedClients) {
      const clients = JSON.parse(cachedClients);
      res.status(200).json({ success: true, clients });
      return;
    }

    const clients = await ClientModel.findAll();

    await redisClient.set("clients", JSON.stringify(clients));

    res.status(200).json({ success: true, clients });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const ClientDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await ClientModel.findById(id);
    if (!client) {
      res.status(404).json({ success: false, message: "Client not found" });
      return;
    }
    res.status(200).json({ success: true, client });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
