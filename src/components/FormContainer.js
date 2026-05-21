import React from "react";

function FormContainer({ children, title }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="glass-card p-6 md:p-8">
        {title && (
          <h1 className="text-2xl font-extrabold text-primary mb-6 pb-3 border-b border-accent-light/50">
            {title}
          </h1>
        )}
        {children}
      </div>
    </div>
  );
}

export default FormContainer;
