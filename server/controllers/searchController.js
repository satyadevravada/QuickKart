import db from "../config/db.js";

export const searchProducts = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query param" });

  try {
    const [results] = await db.query(
      "SELECT * FROM products WHERE name LIKE ?",
      [`%${q}%`]
    );

    res.json(results);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "DB error" });
  }
};
