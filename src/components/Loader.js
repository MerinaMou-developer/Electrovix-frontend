import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center py-12">
      <div
        className="w-16 h-16 border-4 border-primary-light border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
