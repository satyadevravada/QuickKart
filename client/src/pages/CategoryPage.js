import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((res) => res.json()),
      fetch("/api/categories").then((res) => res.json()),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
  );

  const filteredProducts = category
    ? products.filter((p) => p.category_id === category.id)
    : [];

  if (loading) {
    return <div className="p-6 pt-[100px]">Loading...</div>;
  }

  if (!category) {
    return <div className="p-6 pt-[100px]">Category not found.</div>;
  }

  return (
    <div className="p-6 pt-[100px] w-full max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">{category.name}</h2>

      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
