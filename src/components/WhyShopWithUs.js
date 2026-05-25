import React from "react";
import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";

const features = [
  { icon: FaTruck, title: "Free Delivery", desc: "On orders over ৳500" },
  { icon: FaShieldAlt, title: "Secure Payment", desc: "SSL encrypted checkout" },
  { icon: FaUndo, title: "Easy Returns", desc: "30-day return window" },
  { icon: FaHeadset, title: "24/7 Support", desc: "Friendly help anytime" },
];

function WhyShopWithUs() {
  return (
    <section className="py-10 md:py-12 rounded-4xl bg-white border border-accent-light/60 shadow-card px-6 md:px-10 mb-8">
      <div className="text-center mb-8">
        <h2 className="section-title">Why shop with Electrovix</h2>
        <p className="section-subtitle">Built for a smooth, trustworthy shopping experience</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center p-4">
            <div className="w-12 h-12 rounded-xl bg-accent-pale flex items-center justify-center text-primary mx-auto mb-3">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-ink mb-1">{title}</h3>
            <p className="text-sm text-muted">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyShopWithUs;
