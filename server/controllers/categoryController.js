import db from "../config/db.js";

export const getAllCategories = async (req, res) => {
  try {
    const [categories] = await db.query("SELECT * FROM categories");
    res.json(categories);
  } catch (err) {
    console.error("Category Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
