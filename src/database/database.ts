import mysql from "mysql2/promise";
import { envs } from "../config/envs";

export const dbConnection = () => {
  try {
    const connection = mysql.createPool({
      host: envs.dbHost,
      user: envs.dbUsername,
      password: envs.dbPassword,
      database: envs.dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("Database connected");
    return connection;
  } catch (error) {
    console.log(error);
    throw new Error("Database connection error");
  }
};
