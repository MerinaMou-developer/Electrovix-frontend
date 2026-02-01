import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/OrderConstants";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function PlaceOrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    // Check for payment method and navigate if it's not selected
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, navigate]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigate]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Shipping</h2>
            <p>{cart.shippingAddress?.address}, {cart.shippingAddress?.city} {cart.shippingAddress?.postalCode}, {cart.shippingAddress?.country}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Payment Method</h2>
            <p><strong>Method: </strong>{cart.paymentMethod}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Order Items</h2>
            {cart.cartItems?.length === 0 ? (
              <Message variant="info">Your cart is empty</Message>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cart.cartItems?.map((item, index) => (
                  <li key={index} className="py-3 flex flex-wrap items-center gap-4">
                    <img src={`${BASE_URL}${item.image}`} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <Link to={`/product/${item.product}`} className="flex-1 font-medium hover:underline">{item.name}</Link>
                    <span>{item.qty} X ৳{item.price} = ৳{(item.qty * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <div className="flex justify-between"><span>Items:</span><span>৳{cart.itemsPrice}</span></div>
            <div className="flex justify-between"><span>Shipping:</span><span>৳{cart.shippingPrice}</span></div>
            <div className="flex justify-between"><span>Tax:</span><span>৳{cart.taxPrice}</span></div>
            <div className="flex justify-between font-bold"><span>Total:</span><span>৳{cart.totalPrice}</span></div>
            {error && <Message variant="danger">{error}</Message>}
            <button type="button" className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={!cart.cartItems?.length} onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
