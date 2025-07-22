import express from "express";
const router = express.Router();
import { getAllCategories } from "../controllers/categoryController.js";

router.get("/", getAllCategories);

export default router;
