import React, { useState } from "react";

function CheckoutPage() {
  const userId = localStorage.getItem("userId");

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [message, setMessage] = useState("");
  const paymentOptions = [
    { label: "Credit Card", value: "credit_card" },
    { label: "UPI", value: "upi" },
    { label: "Cash on Delivery", value: "cod" },
    { label: "Net Banking", value: "net_banking" },
  ];
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!shippingAddress || !paymentType) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          shipping_address: shippingAddress,
          payment_type: paymentType, // Changed from payment_id
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Order placed successfully! Order ID: ${data.order_id}`);
        setShippingAddress("");
        setPaymentType("");
      } else {
        setMessage(`❌ ${data.error || "Failed to place order"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg mt-10 pt-[100]px]">
      <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

      <form onSubmit={handlePlaceOrder} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Shipping Address</label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows="3"
            placeholder="Enter your shipping address"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Payment Type</label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select a payment method</option>
            <option value="credit_card">Credit Card</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
            <option value="net_banking">Net Banking</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 text-center font-semibold ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
