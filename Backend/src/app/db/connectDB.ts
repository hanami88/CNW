import mysql from "mysql2/promise";
import { ENV } from "../../../env.js";

export const pool = mysql.createPool({
  host: "localhost",
  port: ENV.PORT_DB,
  user: "root",
  password: ENV.PASSWORD_DB,
  database: ENV.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testConnection(): Promise<void> {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully!");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
    process.exit(1);
  }
}
