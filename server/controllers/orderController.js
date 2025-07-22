import db from "../config/db.js";

export const getAllOrders = async (req, res) => {
  try {
    const { id } = req.body;
    const [orders] = await db.query("SELECT * FROM orders WHERE user_id = ?", [
      id,
    ]);
    console.log(id);

    if (orders.length === 0) return res.json([]);
    const orderIds = orders.map((order) => order.id);

    const [items] = await db.query(
      `SELECT oi.*, p.name 
       FROM order_items oi 
       JOIN products p ON p.id = oi.product_id 
       WHERE order_id IN (?)`,
      [orderIds]
    );

    const ordersWithItems = orders.map((order) => {
      const orderItems = items.filter((item) => item.order_id === order.id);
      return {
        ...order,
        items: orderItems,
      };
    });

    res.json(ordersWithItems);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

export const placeOrder = async (req, res) => {
  const { user_id, shipping_address, payment_type } = req.body;

  if (!user_id || !shipping_address || !payment_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [cartItems] = await db.query(
      `
      SELECT ci.product_id, p.price, ci.quantity
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
      `,
      [user_id]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const total_price = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const [orderResult] = await db.query(
      `
      INSERT INTO orders (user_id, total_price, shipping_address, status)
      VALUES (?, ?, ?, 'paid')
      `,
      [user_id, total_price.toFixed(2), shipping_address]
    );
    const order_id = orderResult.insertId;

    await db.query(
      `
      INSERT INTO payments (user_id, order_id, amount, status, payment_type)
      VALUES (?, ?, ?, 'success', ?)
      `,
      [user_id, order_id, total_price.toFixed(2), payment_type]
    );

    const orderItemsData = cartItems.map((item) => [
      order_id,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    await db.query(
      `
      INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
      VALUES ?
      `,
      [orderItemsData]
    );

    await db.query(`DELETE FROM cart_items WHERE user_id = ?`, [user_id]);

    res.json({ message: "Order placed successfully", order_id });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
};
