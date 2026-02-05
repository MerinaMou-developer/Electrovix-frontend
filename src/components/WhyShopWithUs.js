import React from "react";
import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";

const features = [
  { icon: FaTruck, title: "Free Delivery", desc: "On orders over ৳500" },
  { icon: FaShieldAlt, title: "Secure Payment", desc: "100% protected checkout" },
  { icon: FaUndo, title: "Easy Returns", desc: "30-day return policy" },
  { icon: FaHeadset, title: "24/7 Support", desc: "Dedicated help team" },
];

function WhyShopWithUs() {
  return (
    <section className="py-12 bg-white rounded-2xl border border-slate-200 shadow-card">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-8 text-center">Why Shop With Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
            <p className="text-sm text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyShopWithUs;
