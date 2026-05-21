import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword.trim()}&page=1`);
    } else {
      navigate("/products");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center w-full">
      <div className="flex flex-1 items-center bg-accent-pale border border-accent-light rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-shadow">
        <input
          type="text"
          name="q"
          placeholder="Search laptops, phones, accessories..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-primary-dark placeholder:text-muted px-4 py-2.5 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 px-4 py-2.5 bg-primary text-white hover:bg-primary-dark transition-colors"
          aria-label="Search"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
