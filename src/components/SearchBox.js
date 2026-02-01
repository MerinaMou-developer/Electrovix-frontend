import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword.trim()}&page=1`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center gap-2">
      <input
        type="text"
        name="q"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 max-w-[300px] rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
      />
      <button
        type="submit"
        className="p-2 rounded-full border border-gray-300 hover:bg-primary-light hover:text-white hover:border-primary-light transition-colors"
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchBox;
