import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBrands } from "../actions/productActions";
import { FaUndo } from "react-icons/fa";

const BrandList = ({ selectedBrand, onBrandClick }) => {
  const dispatch = useDispatch();
  const brandList = useSelector((state) => state.brandList);
  const { loading, error, brands } = brandList;

  useEffect(() => {
    dispatch(listBrands());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <h5 className="font-semibold">Our Brands</h5>
        <button
          type="button"
          onClick={() => (error ? dispatch(listBrands()) : onBrandClick(""))}
          className="text-red-500 hover:text-red-700"
          title={error ? "Retry" : "Reset"}
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
          {brands.map((brand) => (
            <li
              key={brand._id}
              onClick={() => onBrandClick(brand.slug)}
              className={`px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedBrand === brand.slug
                  ? "bg-primary text-white font-medium"
                  : "bg-surface text-gray-700 hover:bg-gray-200"
              }`}
            >
              {brand.icon_class && <i className={brand.icon_class} />}
              <span className={brand.icon_class ? "ml-2" : ""}>{brand.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BrandList;
