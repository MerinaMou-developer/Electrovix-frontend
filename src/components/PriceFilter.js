import React, { useState } from "react";

function PriceFilter({ onPriceFilterChange }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onPriceFilterChange(minPrice, maxPrice);
  };

  return (
    <div className="my-4">
      <h5 className="font-semibold mb-2">Filter by Price</h5>
      <form onSubmit={handleFilterSubmit} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 1200000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 1299999"
          />
        </div>
        <button type="submit" className="w-full mt-2 bg-primary hover:bg-primary-light text-white font-medium py-2 px-4 rounded transition-colors">
          Apply
        </button>
      </form>
    </div>
  );
}

export default PriceFilter;
