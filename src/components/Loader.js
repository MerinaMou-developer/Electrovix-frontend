import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center py-16" role="status" aria-label="Loading">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-accent rounded-full animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
