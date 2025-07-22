import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        window.location.href = "/";
        return;
      }

      try {
        const res = await fetch("/api/products/p", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch product");

        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
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
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  console.log(product);
  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-[100px] px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        <img
          src={product[0].image_url || "https://via.placeholder.com/400"}
          alt={product[0].name}
          className="w-full md:w-1/2 object-cover h-80 md:h-auto"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {product[0].name}
            </h2>
            <p className="text-gray-600 mb-4">
              {product[0].description || "No description provided."}
            </p>
            <div className="mb-4">{renderStars(product[0].review)}</div>

            <p className="text-xl font-semibold text-blue-600 mb-4">
              ₹{Number(product[0].price).toFixed(2)}
            </p>
          </div>
          <button className="mt-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
