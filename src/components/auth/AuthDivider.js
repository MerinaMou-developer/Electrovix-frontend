import React from "react";

function AuthDivider({ label = "or continue with" }) {
  return (
    <div className="relative my-7">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-accent-light/80" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-4 text-xs font-medium uppercase tracking-wider text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

export default AuthDivider;
