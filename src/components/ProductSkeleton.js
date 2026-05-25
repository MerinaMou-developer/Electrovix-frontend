import React from "react";

function ProductSkeleton({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-accent-light/60 bg-white p-4 shadow-soft animate-pulse"
        >
          <div className="aspect-square rounded-lg bg-accent-pale mb-4" />
          <div className="h-4 bg-accent-pale rounded w-3/4 mb-2" />
          <div className="h-3 bg-accent-pale rounded w-1/2 mb-3" />
          <div className="h-5 bg-accent-pale rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

export default ProductSkeleton;
