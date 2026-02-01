import React, { useState } from "react";

function PriceFilter({ onPriceFilterChange }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onPriceFilterChange(minPrice, maxPrice);
  };

  return (
    <div className="mt-4">
      <h5 className="font-semibold text-primary mb-2">Price Range</h5>
      <form onSubmit={handleFilterSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min (৳)</label>
          <input
            type="number"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 1200000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max (৳)</label>
          <input
            type="number"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 1299999"
          />
        </div>
        <button type="submit" className="w-full bg-primary hover:bg-accent text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm">
          Apply
        </button>
      </form>
    </div>
  );
}

export default PriceFilter;
