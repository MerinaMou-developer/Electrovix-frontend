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
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
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
  return (
    <div>
      <Link to="/" className="inline-block mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6">
            <img
              src={`${BASE_URL}${product.image}`}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:col-span-3 space-y-2">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color="#f8e825" />
            <p>Price: ৳{product.price}</p>
            <p className="text-gray-600">Description: {product.description}</p>
          </div>
          <div className="md:col-span-3 border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span>Price:</span>
              <strong>৳{product.price}</strong>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
            </div>
            {product.countInStock > 0 && (
              <div className="flex items-center justify-between gap-2">
                <span>Qty</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={addToCartHandler}
              className="w-full mt-2 bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={product.countInStock === 0}
              type="button"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="md:col-span-12 mt-8">
          <h4 className="font-bold mb-2">Reviews</h4>
          {product.reviews?.length === 0 && <Message variant="info">No Reviews</Message>}
          <ul className="space-y-3 divide-y divide-gray-200">
                {product.reviews?.map((review) => (
                  <li key={review._id} className="pt-3">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color="#f8e825" />
                    <p className="text-sm text-gray-500">{review.createdAt?.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
          </ul>
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-bold mb-2">Write a review</h4>
            {loadingProductReview && <Loader />}
            {successProductReview && <Message variant="success">Review Submitted</Message>}
            {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Review</label>
                  <textarea
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-primary hover:bg-primary-light text-white font-medium py-2 px-4 rounded"
                >
                  Submit
                </button>
              </form>
            ) : (
              <Message variant="info">Please <Link to="/login">login</Link> to write a review</Message>
            )}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
