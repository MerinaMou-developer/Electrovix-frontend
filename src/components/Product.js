import React, { useState } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { showSuccessToast } from "./Toast";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { getProductImageUrl } from "../config";

function Product({ product }) {
  const dispatch = useDispatch();
  const [qty] = useState(1);
  const [wish, setWish] = useState(false);

  const addToCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product._id, qty));
    showSuccessToast(`${product.name} added to cart!`);
  };

  const discountPrice =
    product.discountPercentage && product.price
      ? (product.price - product.price * (product.discountPercentage / 100)).toFixed(2)
      : null;
  const isTop = product.rating >= 4.5 || product.numReviews >= 5;

  return (
    <div className="product-card overflow-hidden flex flex-col h-full group hover:-translate-y-1">
      <Link to={`/product/${product._id}`} className="block flex-1 flex flex-col no-underline relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setWish(!wish);
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-xl bg-white/95 flex items-center justify-center text-ink-soft hover:text-red-500 shadow-soft transition-colors"
          aria-label="Favorite"
        >
          <FaHeart className={`w-3.5 h-3.5 ${wish ? "text-red-500 fill-red-500" : ""}`} />
        </button>
        <div className="relative aspect-square overflow-hidden bg-accent-pale/50 m-3 rounded-2xl">
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg">
              {product.discountPercentage}% OFF
            </span>
          )}
          {isTop && !product.discountPercentage && (
            <span className="absolute top-2 left-2 z-10 badge-top">Top item</span>
          )}
          {isTop && product.discountPercentage > 0 && (
            <span className="absolute top-10 left-2 z-10 badge-top">Top item</span>
          )}
          <img
            src={getProductImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 p-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x400?text=Product";
            }}
          />
        </div>
        <div className="px-4 pb-2 flex flex-col flex-1">
          <h3 className="font-bold text-ink text-sm md:text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <Rating value={product.rating} text={`${product.numReviews}`} color="#7C3AED" />
        </div>
      </Link>
      <div className="px-4 pb-4 flex items-center justify-between gap-2 mt-auto">
        <div>
          {discountPrice ? (
            <div className="flex flex-col">
              <span className="price-pill py-1.5 px-3 text-sm">৳{discountPrice}</span>
              <span className="text-xs text-muted line-through mt-0.5 pl-1">৳{product.price}</span>
            </div>
          ) : (
            <span className="price-pill py-1.5 px-3 text-sm">৳{product.price}</span>
          )}
        </div>
        <button
          onClick={addToCartHandler}
          disabled={product.countInStock === 0}
          type="button"
          className="w-11 h-11 flex items-center justify-center bg-primary hover:bg-primary-dark text-white rounded-2xl disabled:opacity-50 transition-all shadow-soft hover:shadow-pill"
          aria-label="Add to cart"
        >
          <FaShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Product;
