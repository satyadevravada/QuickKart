import express from "express";
import {
  addToCart,
  getCartItems,
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
} from "../controllers/cartController.js";

const router = express.Router();
router.post("/add", addToCart);
router.post("/", getCartItems);
router.post("/increment", incrementCartItem);
router.post("/decrement", decrementCartItem);
router.post("/remove", removeCartItem);

export default router;
