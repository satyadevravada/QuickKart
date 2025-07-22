import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedID = localStorage.getItem("userId");
    if (storedID && storedID !== "undefined") {
      setUser(storedID);
    } else {
      setUser(null);
    }
  }, []);

  const addToCart = async (productId) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user,
          product_id: productId,
          quantity: 1,
        }),
      });
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Failed to add to cart.");
    }
  };

  const renderStars = (review) => {
    const fullStars = Math.floor(review || 0);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < fullStars ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      );
    }

    return <div className="text-lg">{stars}</div>;
  };

  return (
    <div className="h-[450px] w-[250px] bg-white rounded-2xl shadow p-4 max-w-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image_url || "https://via.placeholder.com/150"}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="mb-4">{renderStars(product.review)}</div>
      </Link>
      <div className="mt-auto">
        <p className="text-gray-600 mb-2">
          ₹{Number(product.price).toFixed(2)}
        </p>
        <button
          onClick={() => addToCart(product.id)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
