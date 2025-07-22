import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchCartItems();
  }, [userId]);

  const handleQuantityChange = async (productId, type) => {
    try {
      const endpoint =
        type === "increment" ? "/api/cart/increment" : "/api/cart/decrement";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product_id: productId }),
      });

      if (res.ok) fetchCartItems();
    } catch (err) {
      console.error(`Failed to ${type} item:`, err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product_id: productId }),
      });

      if (res.ok) fetchCartItems();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.total_quantity,
    0
  );

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6 pt-[100px]">
      <h1 className="text-3xl font-bold text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-2xl p-4 gap-4"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    ₹{item.price} × {item.total_quantity}
                  </p>
                  <p className="text-lg font-medium">
                    Total: ₹{Math.round(item.price * item.total_quantity)}
                  </p>
                </div>

                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() =>
                      handleQuantityChange(item.product_id, "increment")
                    }
                  >
                    +
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() =>
                      handleQuantityChange(item.product_id, "decrement")
                    }
                    disabled={item.total_quantity <= 1}
                  >
                    −
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
                    onClick={() => handleRemoveItem(item.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right space-y-4">
            <div className="text-xl font-semibold">
              Total Amount: ₹{Math.round(totalPrice)}
            </div>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Buy
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
