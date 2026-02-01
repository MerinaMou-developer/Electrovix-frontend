import React, { useState } from "react";
import Ratings from "./Rating";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { showSuccessToast } from "./Toast";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function Product({ product }) {
  const dispatch = useDispatch();
  const [qty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    showSuccessToast(`${product.name} has been added to your cart!`);
  };

  const discountPrice =
    product.discountPercentage && product.price
      ? (product.price - product.price * (product.discountPercentage / 100)).toFixed(2)
      : null;
  const percentageOff = product.discountPercentage ? `${product.discountPercentage}% OFF` : null;

  return (
    <div className="group my-3 p-3 rounded-lg border border-gray-200 bg-white flex flex-col justify-between min-h-[460px] max-h-[460px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
      <Link to={`/product/${product._id}`}>
        <div className="relative">
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold z-10">
              {percentageOff}
            </span>
          )}
          <img
            src={`${BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full h-[220px] object-cover border-b-2 border-primary"
          />
        </div>
      </Link>
      <div className="p-3 flex flex-col flex-1">
        <Link to={`/product/${product._id}`}>
          <div className="font-bold text-primary text-center text-sm mb-1 line-clamp-2">
            {product.name}
          </div>
        </Link>
        <div className="my-1">
          <Ratings value={product.rating} text={`${product.numReviews} reviews`} color="#f8e825" />
        </div>
        <div className="text-center my-2">
          {discountPrice ? (
            <span>
              <span className="text-red-500 font-bold">৳{discountPrice}</span>{" "}
              <span className="text-gray-500 line-through text-sm">৳{product.price}</span>
            </span>
          ) : (
            <span className="font-bold">৳{product.price}</span>
          )}
        </div>
        <div className="mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)]">
          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            type="button"
            className="w-full bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded-full text-sm disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
