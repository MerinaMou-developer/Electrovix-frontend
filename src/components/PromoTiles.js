import React from "react";
import { Link } from "react-router-dom";
import { FaFire, FaStar, FaPercent, FaBoxOpen } from "react-icons/fa";

const promos = [
  {
    to: "/products?filter_by=latest",
    icon: FaBoxOpen,
    label: "New Arrivals",
    desc: "Latest tech",
    bg: "bg-white",
    iconBg: "bg-accent-pale text-primary",
  },
  {
    to: "/products?filter_by=discount",
    icon: FaPercent,
    label: "Today's Deals",
    desc: "Save up to 50%",
    bg: "bg-deals-panel text-white",
    iconBg: "bg-white/20 text-white",
  },
  {
    to: "/products?filter_by=best_seller",
    icon: FaFire,
    label: "Best Sellers",
    desc: "Top picks",
    bg: "bg-white",
    iconBg: "bg-accent-pale text-primary",
  },
  {
    to: "/products?filter_by=featured",
    icon: FaStar,
    label: "Featured",
    desc: "Editor's choice",
    bg: "bg-white",
    iconBg: "bg-accent-pale text-primary",
  },
];

function PromoTiles() {
  return (
    <section className="py-6 md:py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {promos.map(({ to, icon: Icon, label, desc, bg, iconBg }) => (
          <Link
            key={label}
            to={to}
            className={`${bg} rounded-xl border border-accent-light/60 p-4 md:p-5 shadow-soft hover:shadow-card transition-all duration-200 no-underline group`}
          >
            <div className={`w-11 h-11 rounded-lg ${iconBg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className={`font-bold text-sm md:text-base ${bg.includes("text-white") ? "text-white" : "text-primary-dark"}`}>
              {label}
            </p>
            <p className={`text-xs mt-0.5 ${bg.includes("text-white") ? "text-white/80" : "text-muted"}`}>
              {desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PromoTiles;
