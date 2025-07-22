import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // adjust the path if needed

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      fetch(`/api/s?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => {
          console.error("Search error:", err);
          setResults([]);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="pt-[100px] px-4">
      <div className="max-w-7xl mx-auto">
        {query.trim() ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Results for "{query}"
            </h2>
            {results.length === 0 ? (
              <p className="text-gray-500">No results</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default SearchPage;
