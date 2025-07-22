import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import searchProductRoutes from "./routes/searchProductRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/s", searchProductRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/cart", cartRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
