import express from "express";
import {
  getAllProducts,
  getSpecificProduct,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/", getAllProducts);
router.post("/p", getSpecificProduct);
export default router;
