import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import PaymentStatusMessage from "../components/PaymentStatusMessage";
import {
  initiatePayment,
  getOrderDetails,
  deliverOrder,
} from "../actions/orderActions";
import { ORDER_DELIVER_RESET } from "../constants/OrderConstants";
import { showSuccessToast, showErrorToast } from "../components/Toast";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function OrderScreen() {
  const { id: orderId } = useParams();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!order || order._id !== Number(orderId) || successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }

    const paymentStatus = searchParams.get("status");
    if (paymentStatus) {
      setStatus(paymentStatus); // Capture payment status
    }
  }, [
    dispatch,
    order,
    orderId,
    successDeliver,
    userInfo,
    navigate,
    searchParams,
  ]);

  useEffect(() => {
    if (status === "success") {
      showSuccessToast("Payment successful! Thank you for your order.");
    } else if (status === "fail") {
      showErrorToast("Payment failed. Please try again.");
    } else if (status === "cancel") {
      showErrorToast("Payment was canceled.");
    }
  }, [status]);

  const initiatePaymentHandler = () => {
    dispatch(initiatePayment(order._id, order.totalPrice));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>

      {/* Render payment status message */}
      {/* {status && <PaymentStatusMessage status={status} />} */}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Shipping</h2>
            <p><strong>Name: </strong>{order.user?.name}</p>
            <p><strong>Email: </strong><a href={`mailto:${order.user?.email}`} className="text-blue-600 hover:underline">{order.user?.email}</a></p>
            <p><strong>Shipping: </strong>{order.shippingAddress?.address}, {order.shippingAddress?.city} {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}, {order.shippingAddress?.phone}</p>
            {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> : <Message variant="warning">Not Delivered</Message>}
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Payment Method</h2>
            <p><strong>Method: </strong>{order.paymentMethod}</p>
            {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="warning">Not Paid</Message>}
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Order Items</h2>
            {order.orderItems?.length === 0 ? <Message variant="info">Order is empty</Message> : (
              <ul className="divide-y divide-gray-200">
                {order.orderItems?.map((item, index) => (
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
            <div className="flex justify-between"><span>Items:</span><span>৳{order.itemsPrice}</span></div>
            <div className="flex justify-between"><span>Shipping:</span><span>৳{order.shippingPrice}</span></div>
            <div className="flex justify-between"><span>Tax:</span><span>৳{order.taxPrice}</span></div>
            <div className="flex justify-between font-bold"><span>Total:</span><span>৳{order.totalPrice}</span></div>
            {!order.isPaid && (
              <button type="button" className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-2 px-4 rounded" onClick={initiatePaymentHandler}>Pay with SSLCommerz</button>
            )}
            {loadingDeliver && <Loader />}
            {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
              <button type="button" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded" onClick={deliverHandler}>Mark As Delivered</button>
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default OrderScreen;
