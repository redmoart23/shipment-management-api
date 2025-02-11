import { Request, Response } from "express";
import ClientModel from "../models/ClientModel";
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
    const clients = await ClientModel.findAll();
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
