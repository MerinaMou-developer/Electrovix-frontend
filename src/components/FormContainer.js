import React from "react";

function FormContainer({ children }) {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3">{children}</div>
      </div>
    </div>
  );
}

export default FormContainer;
