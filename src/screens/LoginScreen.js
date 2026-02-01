import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? "/" + new URLSearchParams(location.search).get("redirect") : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary via-primary-light to-primary">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="hidden md:block md:w-1/2 text-center">
          <img src="/images/login-rafiki.png" alt="Sign in" className="max-w-full h-auto rounded-2xl" />
        </div>
        <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-card-hover border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-primary text-center mb-6">Sign In</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-shadow"
              />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-accent text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-glow">
              Sign In
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600 text-sm">
            New customer?{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="text-accent font-semibold hover:underline no-underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
