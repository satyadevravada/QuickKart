import express from "express";
import { getAllOrders, placeOrder } from "../controllers/orderController.js";

const router = express.Router();
router.post("/", getAllOrders);
router.post("/create", placeOrder);
export default router;
