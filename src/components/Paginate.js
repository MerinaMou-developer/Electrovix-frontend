import React from "react";
import { Link } from "react-router-dom";

function Paginate({
  pages,
  page,
  keyword = "",
  isAdmin = false,
  filterBy = "",
  category_slug = "",
  brand_slug = "",
  minPrice = "",
  maxPrice = "",
  basePath = "/",
}) {
  const getBasePath = () => (isAdmin ? `/admin${basePath}` : basePath);
  const getSearchQuery = (pageNumber) =>
    `?keyword=${keyword}&filter_by=${filterBy}&page=${pageNumber}&category_slug=${category_slug}&brand_slug=${brand_slug}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  if (pages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 my-8 flex-wrap">
      {[...Array(pages).keys()].map((x) => {
        const p = x + 1;
        const isActive = p === page;
        return (
          <Link
            key={p}
            to={`${getBasePath()}${getSearchQuery(p)}`}
            className={`min-w-[2.5rem] h-10 flex items-center justify-center rounded-xl font-medium transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-glow"
                : "bg-surface text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            {p}
          </Link>
        );
      })}
    </div>
  );
}

export default Paginate;
