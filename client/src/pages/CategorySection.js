import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error: ", err));
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-[100px]">
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/category/${encodeURIComponent(cat.name)}`}>
              <CategoryCard name={cat.name} src={cat.image_url} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategorySection;
