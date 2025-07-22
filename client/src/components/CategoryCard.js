import React from "react";

function CategoryCard({ name, src }) {
  return (
    <div className="border rounded-xl overflow-hidden shadow hover:shadow-md transition duration-200 cursor-pointer">
      <img src={src} alt={name} className="w-full h-[100px] object-cover" />
      <div className="p-3 text-center font-medium">{name}</div>
    </div>
  );
}

export default CategoryCard;
