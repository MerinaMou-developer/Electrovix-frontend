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
        <button type="button" onClick={() => onBrandClick("")} className="text-red-500 hover:text-red-700" title="Reset">
          <FaUndo size={20} />
        </button>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {brands.map((brand) => (
            <li
              key={brand._id}
              onClick={() => onBrandClick(brand.slug)}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                selectedBrand === brand.slug
                  ? "bg-primary text-white"
                  : "bg-white hover:bg-gray-50 text-gray-800"
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
