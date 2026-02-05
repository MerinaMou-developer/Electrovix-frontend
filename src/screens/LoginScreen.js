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

          {/* Demo credentials for recruiters */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 text-center">Demo credentials</p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => { setEmail("demo@example.com"); setPassword("demo1234"); }}
                className="w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 transition-all group"
              >
                <div className="text-left">
                  <span className="block text-xs font-medium text-slate-500">User</span>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-amber-800">demo@example.com</span>
                  <span className="text-xs text-slate-400">••••••••</span>
                </div>
                <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded-lg">Click to fill</span>
              </button>
              <button
                type="button"
                onClick={() => { setEmail("admin@gmail.com"); setPassword("123"); }}
                className="w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all group"
              >
                <div className="text-left">
                  <span className="block text-xs font-medium text-slate-500">Admin</span>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-indigo-800">admin@gmail.com</span>
                  <span className="text-xs text-slate-400">•••</span>
                </div>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-lg">Click to fill</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
