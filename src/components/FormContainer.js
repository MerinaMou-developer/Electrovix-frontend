import React from "react";

function FormContainer({ children, title }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 md:p-8">
        {title && (
          <h1 className="text-2xl font-bold text-primary mb-6">{title}</h1>
        )}
        {children}
      </div>
    </div>
  );
}

export default FormContainer;
