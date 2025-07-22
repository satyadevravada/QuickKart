import React, { useEffect, useState } from "react";
import Products from "./Products";
import CategorySection from "./CategorySection";

function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-10 p-4">
      <CategorySection />

      <Products />
    </div>
  );
}

export default HomePage;
