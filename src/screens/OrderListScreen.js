import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";
import Paginate from "../components/Paginate";

function OrderListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get("page") || 1;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      // Dispatch listOrders action with the currentPage
      dispatch(listOrders(currentPage));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, currentPage]);

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr><th className="px-4 py-2 text-left text-sm font-semibold">ID</th><th className="px-4 py-2 text-left text-sm font-semibold">USER</th><th className="px-4 py-2 text-left text-sm font-semibold">DATE</th><th className="px-4 py-2 text-left text-sm font-semibold">Total</th><th className="px-4 py-2 text-left text-sm font-semibold">PAID</th><th className="px-4 py-2 text-left text-sm font-semibold">DELIVERED</th><th className="px-4 py-2 text-left text-sm font-semibold"></th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders?.length > 0 ? orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">{order.user?.name}</td>
                    <td className="px-4 py-2">{order.createdAt?.substring(0, 10)}</td>
                    <td className="px-4 py-2">৳{order.totalPrice}</td>
                    <td className="px-4 py-2">{order.isPaid ? order.paidAt?.substring(0, 10) : <span className="text-red-500">No</span>}</td>
                    <td className="px-4 py-2">{order.isDelivered ? order.deliveredAt?.substring(0, 10) : <span className="text-red-500">No</span>}</td>
                    <td className="px-4 py-2"><Link to={`/order/${order._id}`} className="text-primary font-medium hover:underline">Details</Link></td>
                  </tr>
                )) : <tr><td colSpan="7" className="px-4 py-8 text-center text-gray-500">No orders found</td></tr>}
              </tbody>
            </table>
          </div>
          <Paginate pages={pages} page={page} isAdmin={true} basePath="/orderlist" />
        </>
      )}
    </div>
  );
}

export default OrderListScreen;
