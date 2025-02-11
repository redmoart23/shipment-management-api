import { dbConnection } from "../database/database";
import { Estados, Order } from "../interfaces/order.interface";

const pool = dbConnection();

export default class OrderModel {
  static async create(order: Order): Promise<Order> {
    const sql = `INSERT INTO Ordenes
       (Orden_id, cliente_id, peso, volumen, tipo_producto,
        ciudad_origen, ciudad_destino, direccion_origen,
        direccion_destino, fecha_salida, fecha_entrega,
        precio, Estado_Orden, Created_at, Updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [
      order.Order_id,
      order.Cliente_id,
      order.Peso,
      order.Volumen,
      order.Tipo_Producto,
      order.Ciudad_Origen,
      order.Ciudad_Destino,
      order.Direccion_Origen,
      order.Direccion_Destino,
      order.Fecha_Salida,
      order.Fecha_Entrega,
      order.Precio,
      order.Estado_Orden,
      order.Created_at,
      order.Updated_at,
    ]);

    return {
      ...order,
    };
  }

  static async findAll(): Promise<Order[]> {
    const sql = "SELECT * FROM Ordenes";
    const [rows] = await pool.execute(sql);
    const orders = rows as Order[];
    return orders;
  }

  static async findById(id: string): Promise<Order | null> {
    const sql =
      "SELECT orden_id, Estado_Orden, Ciudad_Origen, Ciudad_Destino, Fecha_Salida,Fecha_Entrega FROM Ordenes WHERE Orden_id = ?";
    const [rows] = await pool.execute(sql, [id]);
    const orders = rows as Order[];
    return orders.length ? orders[0] : null;
  }

  static async updateStatus(id: string, status: string): Promise<Order> {
    const sql = `UPDATE Ordenes SET Estado_Orden = ? WHERE Orden_id = ?`;
    const [result] = await pool.execute(sql, [status, id]);

    const order = await OrderModel.findById(id);

    return order as Order;
  }
}
