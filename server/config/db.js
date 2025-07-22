// config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "your_db_name",
});

const db = connection.promise();

export default db;
