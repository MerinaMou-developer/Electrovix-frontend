import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"; // Use hooks from react-router-dom
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import {
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
} from "../constants/userConstants";
function UserEditScreen() {
  const { id: userId } = useParams(); // `useParams` to get the product ID
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate(); // Use `useNavigate` for programmatic navigation

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [navigate, user, userId, successUpdate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
  };

  return (
    <div>
      <Link to="/admin/userlist" className="text-primary hover:underline mb-4 inline-block">Go Back</Link>
      <FormContainer>
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light" />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="isadmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="w-4 h-4 rounded border-gray-300" />
              <label htmlFor="isadmin" className="text-sm font-medium text-gray-700">Is Admin</label>
            </div>
            <button type="submit" className="bg-primary hover:bg-primary-light text-white font-semibold py-2 px-4 rounded-lg">Update</button>
          </form>
        )}
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;
