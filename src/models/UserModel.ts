import { User } from "../interfaces/user.interface";
import { dbConnection } from "../database/database";

const pool = dbConnection();

export default class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    const sql = "SELECT name, email, password FROM Users WHERE email = ?";
    const [rows] = await pool.execute(sql, [email]);
    const users = rows as User[];
    return users.length ? users[0] : null;
  }

  static async create(user: User): Promise<User> {
    const sql = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";
    const [result] = await pool.execute(sql, [
      user.name,
      user.email,
      user.password,
    ]);

    return {
      ...user,
    };
  }
}
