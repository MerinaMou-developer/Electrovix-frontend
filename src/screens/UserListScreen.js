import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../actions/userActions";
function UserListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr><th className="px-4 py-2 text-left text-sm font-semibold">ID</th><th className="px-4 py-2 text-left text-sm font-semibold">NAME</th><th className="px-4 py-2 text-left text-sm font-semibold">EMAIL</th><th className="px-4 py-2 text-left text-sm font-semibold">ADMIN</th><th className="px-4 py-2 text-left text-sm font-semibold"></th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.isAdmin ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link to={`/admin/user/${user._id}/edit`} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm">Edit</Link>
                    <button type="button" onClick={() => deleteHandler(user._id)} className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserListScreen;
