import React from "react";
import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";

const items = [
  { icon: FaTruck, title: "Free Shipping", desc: "Orders over ৳500" },
  { icon: FaShieldAlt, title: "Secure Checkout", desc: "SSL protected" },
  { icon: FaUndo, title: "Easy Returns", desc: "30-day policy" },
  { icon: FaHeadset, title: "24/7 Support", desc: "We're here to help" },
];

function TrustBar() {
  return (
    <section className="bg-white/80 backdrop-blur rounded-3xl border border-accent-light/60 py-5 md:py-6 px-4 mb-8 shadow-soft">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3 px-2 md:px-4">
            <div className="w-10 h-10 rounded-lg bg-accent-pale flex items-center justify-center text-primary shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{title}</p>
              <p className="text-xs text-muted">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustBar;
