import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";
import { API_BASE_URL } from "../config";
function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams(); // Use useParams to get the dynamic ID

  const navigate = useNavigate(); // Use useNavigate to get the navigate function
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };
  const discountPrice =
    product?.discountPercentage && product?.price
      ? (product.price - product.price * (product.discountPercentage / 100)).toFixed(2)
      : null;

  return (
    <div className="animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-2 mb-6 px-4 py-2.5 bg-surface hover:bg-gray-200 rounded-xl text-primary font-medium transition-colors no-underline">
        ← Back to Shop
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6">
            <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-card">
              <img src={`${API_BASE_URL}${product.image}`} alt={product.name} className="w-full h-auto object-cover" />
            </div>
          </div>
          <div className="md:col-span-6 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">{product.name}</h1>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color="#fbbf24" />
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            <div className="flex items-baseline gap-3 flex-wrap">
              {discountPrice ? (
                <>
                  <span className="text-2xl font-bold text-accent">৳{discountPrice}</span>
                  <span className="text-lg text-gray-400 line-through">৳{product.price}</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary">৳{product.price}</span>
              )}
            </div>
          </div>
          <div className="md:col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 sticky top-24">
              <h3 className="text-lg font-bold text-primary mb-4">Order</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700"><span>Price</span><strong>৳{discountPrice || product.price}</strong></div>
                <div className="flex justify-between text-gray-700">
                  <span>Status</span>
                  <span className={product.countInStock > 0 ? "text-green-600 font-medium" : "text-red-600"}>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
                </div>
                {product.countInStock > 0 && (
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <span className="font-medium text-gray-700">Qty</span>
                    <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-accent/30 focus:border-accent">
                      {[...Array(product.countInStock).keys()].map((x) => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                    </select>
                  </div>
                )}
              </div>
              <button onClick={addToCartHandler} disabled={product.countInStock === 0} className="w-full bg-primary hover:bg-accent text-white font-semibold py-3 px-4 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200" type="button">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Reviews</h2>
          {product.reviews?.length === 0 && <Message variant="info">No reviews yet. Be the first!</Message>}
          <ul className="space-y-4 divide-y divide-gray-100">
            {product.reviews?.map((review) => (
              <li key={review._id} className="pt-4 first:pt-0">
                <div className="flex items-center gap-2 mb-1"><strong className="text-primary">{review.name}</strong><Rating value={review.rating} color="#fbbf24" /></div>
                <p className="text-sm text-gray-500 mb-1">{review.createdAt?.substring(0, 10)}</p>
                <p className="text-gray-700">{review.comment}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="font-bold text-primary mb-3">Write a review</h3>
            {loadingProductReview && <Loader />}
            {successProductReview && <Message variant="success">Review submitted. Thank you!</Message>}
            {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-accent/30 focus:border-accent">
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                  <textarea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none" placeholder="Share your experience..." />
                </div>
                <button type="submit" disabled={loadingProductReview} className="bg-primary hover:bg-accent text-white font-semibold py-2.5 px-5 rounded-xl transition-colors disabled:opacity-50">Submit Review</button>
              </form>
            ) : (
              <Message variant="info">Please <Link to="/login" className="text-accent font-semibold hover:underline">sign in</Link> to write a review.</Message>
            )}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
