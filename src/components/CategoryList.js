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
        <ul className="space-y-1">
          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() => onCategoryClick(category.slug)}
              className={`px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedCategory === category.slug
                  ? "bg-primary text-white font-medium"
                  : "bg-surface text-gray-700 hover:bg-gray-200"
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
