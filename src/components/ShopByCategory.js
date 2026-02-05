import React from "react";
import { Link } from "react-router-dom";
import { FaHeadphones, FaLaptop, FaMobileAlt, FaGamepad } from "react-icons/fa";

const categories = [
  { slug: "electronics", name: "Electronics", icon: FaHeadphones, color: "bg-blue-500" },
  { slug: "electronics", name: "Gadgets", icon: FaMobileAlt, color: "bg-emerald-500" },
  { slug: "electronics", name: "Computers", icon: FaLaptop, color: "bg-violet-500" },
  { slug: "electronics", name: "Gaming", icon: FaGamepad, color: "bg-amber-500" },
];

function ShopByCategory() {
  return (
    <section className="py-10">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(({ slug, name, icon: Icon, color }) => (
          <Link
            key={name}
            to={`/products?category_slug=${slug}`}
            className="group flex flex-col items-center p-6 rounded-2xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover hover:border-amber-200 transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
              <Icon className="w-7 h-7" />
            </div>
            <span className="font-semibold text-slate-800 group-hover:text-amber-600">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;
