import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";
import { Estados } from "../interfaces/order.interface";

import ClientModel from "../models/ClientModel";
import { addressValidation } from "../utils/google-maps-service";

const now = new Date();

export const CreateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    Cliente_id,
    Peso,
    Volumen,
    Tipo_Producto,
    Ciudad_Origen,
    Ciudad_Destino,
    Direccion_Origen,
    Direccion_Destino,
  } = req.body;

  const Order_id = "OR" + Math.random().toString(36).substring(2, 10);
  const PrecioNominal = 1000 * Peso * Volumen;
  const PrecioFinal = PrecioNominal + PrecioNominal * 0.19;

  try {
    const existingClient = await ClientModel.findById(Cliente_id);
    if (!existingClient) {
      res.status(404).json({ success: false, message: "Client not found" });
      return;
    }

    const data = await addressValidation(Direccion_Destino, Ciudad_Destino);

    if (data.results?.[0]?.partial_match) {
      res.status(404).json({ success: false, message: "Address not found" });
      return;
    }

    await OrderModel.create({
      Order_id,
      Cliente_id,
      Peso,
      Volumen,
      Tipo_Producto,
      Ciudad_Origen,
      Ciudad_Destino,
      Direccion_Origen,
      Direccion_Destino,
      Fecha_Salida: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      Fecha_Entrega: new Date(now.getTime() + 72 * 60 * 60 * 1000),
      Precio: PrecioFinal,
      Estado_Orden: Estados.EN_ESPERA,
      Created_at: new Date(),
      Updated_at: new Date(),
    });
    res
      .status(201)
      .json({ success: true, message: "Order created Successfully" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const OrderList = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.findAll();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const OrderDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const UpdateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Estado_Orden } = req.body;
    const order = await OrderModel.updateStatus(id, Estado_Orden);
    res
      .status(200)
      .json({ success: true, message: "Order Status updated", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
