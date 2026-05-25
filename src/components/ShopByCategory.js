import React from "react";
import { Link } from "react-router-dom";
import { FaHeadphones, FaLaptop, FaMobileAlt, FaGamepad } from "react-icons/fa";

const categories = [
  { slug: "electronics", name: "Electronics", icon: FaHeadphones },
  { slug: "electronics", name: "Gadgets", icon: FaMobileAlt },
  { slug: "electronics", name: "Computers", icon: FaLaptop },
  { slug: "electronics", name: "Gaming", icon: FaGamepad },
];

function ShopByCategory() {
  return (
    <section className="py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="section-title">Shop by category</h2>
          <p className="section-subtitle">Find what you need faster</p>
        </div>
        <Link to="/products" className="text-sm font-semibold text-primary hover:text-primary-dark no-underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {categories.map(({ slug, name, icon: Icon }) => (
          <Link
            key={name}
            to={`/products?category_slug=${slug}`}
            className="group flex flex-col items-center p-5 md:p-6 rounded-3xl bg-white border border-accent-light/60 shadow-soft hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-0.5 transition-all no-underline"
          >
            <div className="w-14 h-14 rounded-xl bg-accent-pale flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
              <Icon className="w-6 h-6" />
            </div>
            <span className="font-semibold text-ink text-sm md:text-base">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;
