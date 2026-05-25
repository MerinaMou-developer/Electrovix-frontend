import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBox({ className = "" }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(keyword.trim())}&page=1`);
    } else {
      navigate("/products");
    }
  };

  return (
    <form onSubmit={submitHandler} className={`w-full ${className}`}>
      <div className="search-pill">
        <FaSearch className="w-4 h-4 text-muted ml-5 shrink-0" />
        <input
          type="search"
          name="q"
          placeholder="Search products, brands, categories..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-ink placeholder:text-muted/80 px-3 py-3.5 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 m-1.5 px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-full hover:bg-primary-dark transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
