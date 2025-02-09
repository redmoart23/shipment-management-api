import mysql from "mysql2/promise";
import { envs } from "../config/envs";

const connectionPool = mysql.createPool({
  host: envs.dbHost,
  user: envs.dbUsername,
  password: envs.dbPassword,
  database: envs.dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connectionPool;
