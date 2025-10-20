import mysql2, { type Pool } from "mysql2/promise";
import {env}  from "../confiq.js";

export const db: Pool = mysql2.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  port: env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10
});
