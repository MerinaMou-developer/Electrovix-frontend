import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("SSLCOMMERZ");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shippingAddress || !shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-2xl font-bold mb-4">Payment Method</h1>
      {error && <Message variant="danger">{error}</Message>}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Method</label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="paymentMethod" value="SSLCOMMERZ" checked={paymentMethod === "SSLCOMMERZ"} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4" />
            <span>SSLCOMMERZ</span>
          </label>
        </div>
        <button type="submit" className="mt-4 bg-primary hover:bg-primary-light text-white font-semibold py-2 px-4 rounded-lg transition-colors">Continue</button>
      </form>
    </FormContainer>
  );
}

export default PaymentScreen;
