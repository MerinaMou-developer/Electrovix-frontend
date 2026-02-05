import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { showSuccessToast } from "../components/Toast";
import { FaTrashAlt, FaShoppingBag } from "react-icons/fa";

import { API_BASE_URL } from "../config";

function CartScreen() {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems = [] } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
      showSuccessToast("Product added to cart!");
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    showSuccessToast("Item removed from cart.");
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 text-center">
          <Message variant="info">
            Your cart is empty.{" "}
            <Link to="/" className="text-accent font-semibold hover:underline no-underline">
              Continue shopping
            </Link>
          </Message>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 md:p-5 flex flex-wrap items-center gap-4"
              >
                <Link to={`/product/${item.product}`} className="shrink-0">
                  <img
                    src={`${API_BASE_URL}${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product}`}
                    className="font-semibold text-primary hover:text-accent no-underline line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-accent font-bold mt-1">৳{item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-accent/30"
                  >
                    {item.countInStock > 0
                      ? [...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))
                      : <option value={0} disabled>Out of stock</option>}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeFromCartHandler(item.product)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    aria-label="Remove"
                  >
                    <FaTrashAlt className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 sticky top-24">
              <h2 className="text-lg font-bold text-primary mb-4">Order Summary</h2>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-bold text-primary">৳{subtotal}</span>
                </div>
              </div>
              <button
                type="button"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white font-semibold py-3 px-4 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-glow"
              >
                <FaShoppingBag className="w-4 h-4" /> Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
