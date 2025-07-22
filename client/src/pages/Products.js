import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error: ", err));
  }, []);

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  const groupedByCategory = products.reduce((acc, product) => {
    const cat = product.category_id || "Others";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  if (!products.length || !categories.length) {
    return <div className="p-6 pt-[100px]">Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {Object.entries(groupedByCategory).map(([categoryId, items]) => (
        <div key={categoryId} className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">
              {categoryMap[categoryId] || "Others"}
            </h3>
            <Link
              to={`/category/${encodeURIComponent(
                categoryMap[categoryId] || "Others"
              )}`}
              className="text-green-600 hover:underline text-sm"
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {items.slice(0, 5).map((prod) => (
              <ProductCard key={prod.id} product={prod} src={prod.image_url} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
