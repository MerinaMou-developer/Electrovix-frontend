import React from "react";
import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";

const features = [
  { icon: FaTruck, title: "Free Delivery", desc: "On orders over ৳500 worldwide" },
  { icon: FaShieldAlt, title: "Secure Payment", desc: "100% protected checkout" },
  { icon: FaUndo, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: FaHeadset, title: "24/7 Support", desc: "Dedicated multilingual team" },
];

function WhyShopWithUs() {
  return (
    <section className="py-12 glass-card px-6 md:px-10">
      <h2 className="section-title mb-10">Why Shop With Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center p-5 rounded-2xl bg-surface-muted/50 border border-accent-light/30 hover:border-accent hover:shadow-soft transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white mb-4 shadow-soft">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-primary mb-1">{title}</h3>
            <p className="text-sm text-slate-600">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyShopWithUs;
