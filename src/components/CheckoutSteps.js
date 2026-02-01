import React from "react";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  const stepLink = (enabled, to, label) =>
    enabled ? (
      <Link to={to} className="px-4 py-2 text-primary hover:underline font-medium">
        {label}
      </Link>
    ) : (
      <span className="px-4 py-2 text-gray-400 cursor-not-allowed">{label}</span>
    );

  return (
    <nav className="flex justify-center gap-2 mb-6 flex-wrap">
      {stepLink(step1, "/login", "Login")}
      {stepLink(step2, "/shipping", "Shipping")}
      {stepLink(step3, "/payment", "Payment")}
      {stepLink(step4, "/placeorder", "Place Order")}
    </nav>
  );
}

export default CheckoutSteps;
