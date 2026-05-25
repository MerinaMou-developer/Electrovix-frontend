import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaMinus,
  FaPlus,
  FaCheck,
  FaTag,
} from "react-icons/fa";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { showSuccessToast } from "../components/Toast";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { getProductImageUrl } from "../config";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const { userInfo } = useSelector((state) => state.userLogin);
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  useEffect(() => {
    setQty(1);
  }, [id]);

  const discountPrice =
    product?.discountPercentage && product?.price
      ? (product.price - product.price * (product.discountPercentage / 100)).toFixed(2)
      : null;

  const displayPrice = discountPrice || product?.price;
  const inStock = product?.countInStock > 0;
  const savings =
    discountPrice && product?.price
      ? (Number(product.price) - Number(discountPrice)).toFixed(2)
      : null;

  const addToCartHandler = () => {
    if (!inStock) return;
    dispatch(addToCart(product._id, qty));
    showSuccessToast(`${product.name} added to cart!`);
  };

  const buyNowHandler = () => {
    if (!inStock) return;
    dispatch(addToCart(product._id, qty));
    navigate("/cart");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  const decQty = () => setQty((q) => Math.max(1, q - 1));
  const incQty = () =>
    setQty((q) => Math.min(product?.countInStock || 1, q + 1));

  if (loading) {
    return (
      <div className="py-16 flex justify-center animate-fade-in">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in max-w-lg mx-auto py-12">
        <Message variant="danger">{error}</Message>
        <Link to="/products" className="btn-primary mt-6 inline-flex no-underline">
          <FaArrowLeft /> Back to shop
        </Link>
      </div>
    );
  }

  const categorySlug = product.category?.slug;
  const brandSlug = product.brand?.slug;

  return (
    <div className="animate-fade-in pb-16">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted mb-6 md:mb-8">
        <Link to="/" className="hover:text-primary no-underline transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary no-underline transition-colors">
          Shop
        </Link>
        {product.category?.name && (
          <>
            <span>/</span>
            <Link
              to={`/products?category_slug=${categorySlug}`}
              className="hover:text-primary no-underline transition-colors"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-ink font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main product */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="lg:col-span-6 xl:col-span-7">
          <div className="glass-card p-4 md:p-6 lg:sticky lg:top-28">
            <div className="relative aspect-square rounded-3xl bg-accent-pale/50 border border-accent-light overflow-hidden flex items-center justify-center">
              {product.discountPercentage > 0 && (
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-pill">
                  <FaTag className="w-3 h-3" />
                  {product.discountPercentage}% OFF
                </span>
              )}
              <img
                src={getProductImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-contain p-6 md:p-10 group-hover:scale-[1.02] transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/600x600?text=Product";
                }}
              />
            </div>
          </div>
        </div>

        {/* Info + purchase */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.brand?.name && (
                <Link
                  to={`/products?brand_slug=${brandSlug}`}
                  className="text-xs font-bold uppercase tracking-wider text-primary bg-accent-pale px-3 py-1 rounded-full no-underline hover:bg-primary hover:text-white transition-colors"
                >
                  {product.brand.name}
                </Link>
              )}
              {product.category?.name && (
                <Link
                  to={`/products?category_slug=${categorySlug}`}
                  className="text-xs font-semibold text-ink-soft bg-white border border-accent-light px-3 py-1 rounded-full no-underline hover:border-primary/40 transition-colors"
                >
                  {product.category.name}
                </Link>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Rating
                value={product.rating}
                text={`${product.numReviews} review${product.numReviews !== 1 ? "s" : ""}`}
                color="#7C3AED"
              />
              {inStock ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  <FaCheck className="w-3 h-3" /> In stock ({product.countInStock})
                </span>
              ) : (
                <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  Out of stock
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="glass-card p-5 md:p-6">
            <div className="flex flex-wrap items-end gap-3">
              <span className="text-3xl md:text-4xl font-extrabold text-primary">
                ৳{displayPrice}
              </span>
              {discountPrice && (
                <span className="text-xl text-muted line-through mb-1">
                  ৳{product.price}
                </span>
              )}
            </div>
            {savings && (
              <p className="text-sm font-semibold text-emerald-600 mt-2">
                You save ৳{savings} ({product.discountPercentage}% off)
              </p>
            )}
          </div>

          {/* Purchase box */}
          <div className="glass-card p-5 md:p-6 border-primary/15 shadow-card">
            {inStock && (
              <div className="flex items-center justify-between mb-5">
                <span className="font-semibold text-ink">Quantity</span>
                <div className="inline-flex items-center rounded-2xl border border-accent-light bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={decQty}
                    disabled={qty <= 1}
                    className="w-11 h-11 flex items-center justify-center text-ink-soft hover:bg-accent-pale disabled:opacity-40 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus className="w-3 h-3" />
                  </button>
                  <span className="w-12 text-center font-bold text-ink">{qty}</span>
                  <button
                    type="button"
                    onClick={incQty}
                    disabled={qty >= product.countInStock}
                    className="w-11 h-11 flex items-center justify-center text-ink-soft hover:bg-accent-pale disabled:opacity-40 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={addToCartHandler}
                disabled={!inStock}
                className="flex-1 btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaShoppingCart className="w-4 h-4" />
                Add to cart
              </button>
              <button
                type="button"
                onClick={buyNowHandler}
                disabled={!inStock}
                className="flex-1 btn-outline py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy now
              </button>
            </div>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-3">
            {[
              [FaTruck, "Free delivery", "Orders ৳500+"],
              [FaShieldAlt, "Secure pay", "SSLCommerz"],
              [FaUndo, "Easy returns", "30-day policy"],
            ].map(([Icon, title, sub]) => (
              <div
                key={title}
                className="text-center p-3 rounded-2xl bg-white border border-accent-light/80"
              >
                <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-[11px] font-bold text-ink leading-tight">{title}</p>
                <p className="text-[10px] text-muted mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="glass-card p-5 md:p-6">
            <h2 className="text-lg font-bold text-ink mb-3">About this product</h2>
            <p className="text-ink-soft leading-relaxed whitespace-pre-line">
              {product.description || "No description available."}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12 md:mt-16">
        <div className="glass-card p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="section-title text-xl md:text-2xl">Customer reviews</h2>
              <p className="section-subtitle">
                {product.numReviews > 0
                  ? `Average ${Number(product.rating).toFixed(1)} out of 5`
                  : "No reviews yet"}
              </p>
            </div>
            {product.numReviews > 0 && (
              <div className="flex items-center gap-3 bg-accent-pale rounded-2xl px-5 py-3">
                <span className="text-3xl font-extrabold text-primary">
                  {Number(product.rating).toFixed(1)}
                </span>
                <Rating value={product.rating} color="#7C3AED" />
              </div>
            )}
          </div>

          {product.reviews?.length === 0 && (
            <Message variant="info">No reviews yet. Be the first to share your experience!</Message>
          )}

          <ul className="space-y-4 mb-8">
            {product.reviews?.map((review) => (
              <li
                key={review._id}
                className="p-4 md:p-5 rounded-2xl bg-surface-muted/80 border border-accent-light/60"
              >
                <div className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-xl bg-cta-gradient text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {(review.name || "U").charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <strong className="text-ink">{review.name}</strong>
                      <Rating value={review.rating} color="#7C3AED" />
                    </div>
                    <p className="text-xs text-muted mb-2">
                      {review.createdAt?.substring(0, 10)}
                    </p>
                    <p className="text-ink-soft text-sm leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-accent-light">
            <h3 className="font-bold text-ink text-lg mb-4">Write a review</h3>
            {loadingProductReview && <Loader />}
            {successProductReview && (
              <Message variant="success">Review submitted. Thank you!</Message>
            )}
            {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}

            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">
                    Rating
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full border border-accent-light rounded-2xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary/25 focus:border-primary outline-none"
                  >
                    <option value={0}>Select rating...</option>
                    <option value={1}>1 — Poor</option>
                    <option value={2}>2 — Fair</option>
                    <option value={3}>3 — Good</option>
                    <option value={4}>4 — Very good</option>
                    <option value={5}>5 — Excellent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">
                    Your review
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border border-accent-light rounded-2xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary/25 focus:border-primary outline-none resize-none"
                    placeholder="What did you like? Would you recommend it?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview || !rating || !comment.trim()}
                  className="btn-primary disabled:opacity-50"
                >
                  Submit review
                </button>
              </form>
            ) : (
              <Message variant="info">
                Please{" "}
                <Link to="/login" className="text-primary font-bold hover:underline no-underline">
                  sign in
                </Link>{" "}
                to write a review.
              </Message>
            )}
          </div>
        </div>
      </section>

      <div className="mt-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark no-underline"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

export default ProductScreen;
