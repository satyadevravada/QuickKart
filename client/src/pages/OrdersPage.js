import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const id = localStorage.getItem("userId");

      if (!id) {
        setError("User not logged in.");
        window.location.href = "/";
      }
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch orders");

        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders();
  }, []);
  console.log(orders);
  return (
    <div className="min-h-screen bg-gray-100 pt-[100px] px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {orders.length === 0 && !error && (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li
              key={index}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </p>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                {order.items && order.items.length > 0 ? (
                  <ul className="list-disc ml-6 space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} — {item.quantity} × ₹
                        {Number(item.price_at_purchase).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No items found.</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrdersPage;
