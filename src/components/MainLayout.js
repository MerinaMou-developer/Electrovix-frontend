import React from "react";

function MainLayout({ children }) {
  return (
    <div className="container mx-auto px-4 max-w-7xl relative z-10">
      {children}
    </div>
  );
}

export default MainLayout;
