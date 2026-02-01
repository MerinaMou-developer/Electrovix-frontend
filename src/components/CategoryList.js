import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/productActions";
import { FaUndo } from "react-icons/fa";

const CategoryList = ({ selectedCategory, onCategoryClick }) => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <h5 className="font-semibold">Our Categories</h5>
        <button
          type="button"
          onClick={() => onCategoryClick("")}
          className="text-red-500 hover:text-red-700"
          title="Reset"
        >
          <FaUndo size={20} />
        </button>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() => onCategoryClick(category.slug)}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                selectedCategory === category.slug
                  ? "bg-primary text-white"
                  : "bg-white hover:bg-gray-50 text-gray-800"
              }`}
            >
              {category.icon_class && <i className={category.icon_class} />}
              <span className={category.icon_class ? "ml-2" : ""}>{category.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
