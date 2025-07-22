import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    navigate(`/s?q=${encodeURIComponent(value)}`);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Search products..."
      className="border p-2 rounded w-full"
    />
  );
}

export default SearchBar;
