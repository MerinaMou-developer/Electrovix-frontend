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
    <form onSubmit={submitHandler} className="flex items-center gap-2 w-full">
      <input
        type="text"
        name="q"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 min-w-0 rounded-xl border border-white/20 bg-white/10 placeholder:text-slate-400 text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-shadow"
      />
      <button
        type="submit"
        className="shrink-0 p-2.5 rounded-xl bg-white/10 hover:bg-accent border border-white/20 text-white transition-colors duration-200"
        aria-label="Search"
      >
        <FaSearch className="w-4 h-4" />
      </button>
    </form>
  );
}

export default SearchBox;
