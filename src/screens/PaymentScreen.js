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
      <h1 className="text-2xl font-bold text-primary mb-6">Payment Method</h1>
      {error && <Message variant="danger">{error}</Message>}
      <form onSubmit={submitHandler} className="space-y-4">
        <div className="bg-surface rounded-xl p-4 border border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name="paymentMethod" value="SSLCOMMERZ" checked={paymentMethod === "SSLCOMMERZ"} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-accent focus:ring-accent" />
            <span className="font-medium text-primary">SSLCOMMERZ</span>
          </label>
        </div>
        <button type="submit" className="w-full mt-6 bg-primary hover:bg-accent text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-glow">Continue</button>
      </form>
    </FormContainer>
  );
}

export default PaymentScreen;
