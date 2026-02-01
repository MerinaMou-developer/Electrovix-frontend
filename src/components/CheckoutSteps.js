import React from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaUser, FaTruck, FaCreditCard, FaFileInvoiceDollar } from "react-icons/fa";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  const Step = ({ enabled, to, label, icon, done }) => {
    const content = (
      <span className="flex items-center gap-2 font-medium">
        {done ? <FaCheck className="w-4 h-4 text-green-500" /> : icon}
        {label}
      </span>
    );
    if (enabled) {
      return (
        <Link to={to} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-primary hover:bg-surface hover:text-accent transition-colors no-underline">
          {content}
        </Link>
      );
    }
    return (
      <span className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-400 cursor-not-allowed">
        {icon}
        {label}
      </span>
    );
  };

  return (
    <nav className="flex justify-center gap-2 md:gap-4 mb-8 flex-wrap">
      <Step enabled={step1} to="/login" label="Login" icon={<FaUser className="w-4 h-4" />} done={step2 || step3 || step4} />
      <Step enabled={step2} to="/shipping" label="Shipping" icon={<FaTruck className="w-4 h-4" />} done={step3 || step4} />
      <Step enabled={step3} to="/payment" label="Payment" icon={<FaCreditCard className="w-4 h-4" />} done={step4} />
      <Step enabled={step4} to="/placeorder" label="Place Order" icon={<FaFileInvoiceDollar className="w-4 h-4" />} done={false} />
    </nav>
  );
}

export default CheckoutSteps;
