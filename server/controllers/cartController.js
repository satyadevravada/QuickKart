import db from "../config/db.js";

export const addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sql = `
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `;
    await db.query(sql, [user_id, product_id, quantity]);
    res.json({ message: "Item added to cart" });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
};
export const incrementCartItem = async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id)
    return res.status(400).json({ error: "Missing user_id or product_id" });

  try {
    await db.query(
      `
      UPDATE cart_items 
      SET quantity = quantity + 1 
      WHERE user_id = ? AND product_id = ?
      `,
      [user_id, product_id]
    );

    res.json({ message: "Quantity increased" });
  } catch (err) {
    console.error("Increment error:", err);
    res.status(500).json({ error: "Failed to increment item" });
  }
};
export const decrementCartItem = async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id)
    return res.status(400).json({ error: "Missing user_id or product_id" });

  try {
    await db.query(
      `
      UPDATE cart_items 
      SET quantity = quantity - 1 
      WHERE user_id = ? AND product_id = ? AND quantity > 1
      `,
      [user_id, product_id]
    );

    res.json({ message: "Quantity decreased" });
  } catch (err) {
    console.error("Decrement error:", err);
    res.status(500).json({ error: "Failed to decrement item" });
  }
};
export const removeCartItem = async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id)
    return res.status(400).json({ error: "Missing user_id or product_id" });

  try {
    await db.query(
      `DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`,
      [user_id, product_id]
    );

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Remove error:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
};

export const getCartItems = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id in query params" });
  }

  try {
    const sql = `
      SELECT 
        ci.product_id,
        p.name,
        p.price,
        p.image_url,
        SUM(ci.quantity) AS total_quantity
      FROM 
        cart_items ci
      JOIN 
        products p ON ci.product_id = p.id
      WHERE 
        ci.user_id = ?
      GROUP BY 
        ci.product_id, p.name, p.price, p.image_url
    `;

    const [results] = await db.query(sql, [user_id]);
    res.json(results);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
};
