import React, { useState } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { showSuccessToast } from "./Toast";
import { FaShoppingCart } from "react-icons/fa";

import { getProductImageUrl } from "../config";

function Product({ product }) {
  const dispatch = useDispatch();
  const [qty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    showSuccessToast(`${product.name} added to cart!`);
  };

  const discountPrice =
    product.discountPercentage && product.price
      ? (product.price - product.price * (product.discountPercentage / 100)).toFixed(2)
      : null;
  const percentageOff = product.discountPercentage ? `${product.discountPercentage}% OFF` : null;

  return (
    <div className="group product-card overflow-hidden flex flex-col h-full min-h-[400px] animate-slide-up hover:-translate-y-0.5">
      <Link to={`/product/${product._id}`} className="block flex-1 flex flex-col no-underline">
        <div className="relative aspect-square overflow-hidden bg-accent-pale">
          {product.discountPercentage > 0 && (
            <span className="absolute top-3 left-3 z-10 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-soft">
              {percentageOff}
            </span>
          )}
          <img
            src={getProductImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x400?text=Product";
            }}
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-primary text-sm md:text-base line-clamp-2 mb-2 group-hover:text-primary-light transition-colors">
            {product.name}
          </h3>
          <div className="mb-2">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color="#455A64" />
          </div>
          <div className="mt-auto pt-2">
            {discountPrice ? (
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-lg font-bold text-primary-light">৳{discountPrice}</span>
                <span className="text-sm text-slate-400 line-through">৳{product.price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">৳{product.price}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={addToCartHandler}
          disabled={product.countInStock === 0}
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-3 px-4 rounded-xl text-sm disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-glow"
        >
          <FaShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
