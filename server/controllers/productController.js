import db from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM products");
    res.json(results);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
};
export const getSpecificProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const [product] = await db.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    console.log(id);

    res.json(product);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
};
