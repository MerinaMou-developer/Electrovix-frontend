import React from "react";
import { Link } from "react-router-dom";
import { FaHeadphones, FaLaptop, FaMobileAlt, FaGamepad } from "react-icons/fa";

const categories = [
  { slug: "electronics", name: "Electronics", icon: FaHeadphones, gradient: "from-primary to-primary-light" },
  { slug: "electronics", name: "Gadgets", icon: FaMobileAlt, gradient: "from-primary-light to-accent" },
  { slug: "electronics", name: "Computers", icon: FaLaptop, gradient: "from-accent-dark to-primary-mid" },
  { slug: "electronics", name: "Gaming", icon: FaGamepad, gradient: "from-primary-mid to-accent-light" },
];

function ShopByCategory() {
  return (
    <section className="py-10">
      <h2 className="section-title mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map(({ slug, name, icon: Icon, gradient }) => (
          <Link
            key={name}
            to={`/products?category_slug=${slug}`}
            className="group flex flex-col items-center p-6 md:p-8 rounded-2xl glass-card hover:shadow-card-hover hover:border-accent transition-all duration-300 no-underline"
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 shadow-soft group-hover:scale-110 group-hover:shadow-glow transition-all duration-300`}
            >
              <Icon className="w-8 h-8" />
            </div>
            <span className="font-bold text-primary group-hover:text-primary-light transition-colors">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;
