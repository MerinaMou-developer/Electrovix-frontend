import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AuthInput({
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  rightSlot,
  minLength,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <label className="block text-sm font-semibold text-primary-dark">{label}</label>
          {rightSlot}
        </div>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            <Icon className="w-4 h-4" />
          </span>
        )}
        <input
          type={inputType}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`auth-input w-full rounded-xl border border-accent-light/80 bg-surface-muted/50 py-3.5 text-primary-dark placeholder:text-muted/80 transition-all duration-200 focus:bg-white focus:border-primary/40 focus:ring-4 focus:ring-primary/10 ${
            Icon ? "pl-11 pr-4" : "px-4"
          } ${isPassword ? "pr-12" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted hover:text-primary rounded-lg transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthInput;
