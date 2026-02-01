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
    <div className="flex justify-center gap-1 my-4">
      {[...Array(pages).keys()].map((x) => {
        const p = x + 1;
        const isActive = p === page;
        return (
          <Link
            key={p}
            to={`${getBasePath()}${getSearchQuery(p)}`}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors ${
              isActive
                ? "bg-primary-light text-white border-2 border-accent"
                : "text-blue-600 hover:bg-gray-100 border border-gray-300"
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
