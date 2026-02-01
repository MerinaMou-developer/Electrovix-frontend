import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { showSuccessToast } from "../components/Toast"; // Import the toast utility
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function CartScreen() {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems = [] } = cart; // Default to an empty array for safety

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
      showSuccessToast("Product added to cart successfully!"); // Show toast on add to cart
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    showSuccessToast("Product removed from cart successfully!"); // Show toast on remove from cart
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/" className="text-primary font-semibold hover:underline">Go Back</Link>
          </Message>
        ) : (
          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {cartItems.map((item) => (
              <li key={item.product} className="p-4 flex flex-wrap items-center gap-4">
                <img src={`${BASE_URL}${item.image}`} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product}`} className="font-medium hover:underline">{item.name}</Link>
                </div>
                <span className="font-semibold">৳{item.price}</span>
                <select
                  value={item.qty}
                  onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  {item.countInStock > 0
                    ? [...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))
                    : <option value="0" disabled>Out of stock</option>}
                </select>
                <button
                  type="button"
                  onClick={() => removeFromCartHandler(item.product)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                  aria-label="Remove"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="md:col-span-4">
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h2 className="text-xl font-bold">
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
          </h2>
          <p className="text-lg font-semibold">
            ৳{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </p>
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
            className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
