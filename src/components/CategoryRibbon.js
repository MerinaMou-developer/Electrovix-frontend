import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/productActions";

const STATIC_PILLS = [
  { label: "All", to: "/products", query: "" },
  { label: "Deals", to: "/products", query: "filter_by=discount" },
  { label: "Best sellers", to: "/products", query: "filter_by=best_seller" },
  { label: "New", to: "/products", query: "filter_by=latest" },
];

function CategoryRibbon() {
  const dispatch = useDispatch();
  const location = useLocation();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading } = categoryList;

  useEffect(() => {
    if (!categories.length && !loading) {
      dispatch(listCategories());
    }
  }, [dispatch, categories.length, loading]);

  const params = new URLSearchParams(location.search);
  const activeCategory = params.get("category_slug") || "";
  const activeFilter = params.get("filter_by") || "";
  if (!location.pathname.startsWith("/products")) return null;

  const isActive = (slug, filter) => {
    if (filter) return activeFilter === filter && !activeCategory;
    if (slug === "") return !activeCategory && !activeFilter && location.pathname === "/products" && !location.search;
    return activeCategory === slug;
  };

  return (
    <div className="border-t border-accent-light/60 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-hide">
          {STATIC_PILLS.map(({ label, to, query }) => {
            const filter = query.includes("filter_by=") ? query.split("=")[1] : "";
            const href = query ? `${to}?${query}` : to;
            const active = isActive("", filter);
            return (
              <Link
                key={label}
                to={href}
                className={`filter-pill shrink-0 ${active ? "filter-pill-active" : "filter-pill-inactive"}`}
              >
                {label}
              </Link>
            );
          })}
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat._id}
              to={`/products?category_slug=${cat.slug}`}
              className={`filter-pill shrink-0 ${
                activeCategory === cat.slug ? "filter-pill-active" : "filter-pill-inactive"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryRibbon;
