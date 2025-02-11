import { Client } from "../interfaces/client.interface";

import { dbConnection } from "../database/database";

const pool = dbConnection();

export default class ClientModel {
  static async create(client: Client): Promise<Client> {
    const sql =
      "INSERT INTO Clientes (cliente_id, nombre,tipo_documento, numero_documento,Telefono_Fijo , Celular, Correo_Electronico, departamento, ciudad, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [
      client.Client_id,
      client.Nombre,
      client.Tipo_Documento,
      client.Numero_Documento,
      client.Telefono_Fijo,
      client.Celular,
      client.Correo_Electronico,
      client.Departamento,
      client.Ciudad,
      client.Direccion,
    ]);

    return {
      ...client,
    };
  }

  static async findByDocument(number_document: number): Promise<Client | null> {
    const sql =
      "SELECT cliente_id, nombre, tipo_documento, numero_documento, Celular, Correo_Electronico FROM Clientes WHERE Numero_Documento = ?";
    const [rows] = await pool.execute(sql, [number_document]);
    const clients = rows as Client[];
    return clients.length ? clients[0] : null;
  }

  static async findById(id: string): Promise<Client | null> {
    const sql =
      "SELECT cliente_id, nombre, tipo_documento, numero_documento, Celular, Correo_Electronico FROM Clientes WHERE cliente_id = ?";
    const [rows] = await pool.execute(sql, [id]);
    const clients = rows as Client[];
    return clients.length ? clients[0] : null;
  }

  static async findAll(): Promise<Client[]> {
    const sql = "SELECT * FROM Clientes";
    const [rows] = await pool.execute(sql);
    const clients = rows as Client[];
    return clients;
  }
}
