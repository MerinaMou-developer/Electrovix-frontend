import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope, FaLock, FaUserShield, FaUser } from "react-icons/fa";
import Message from "../components/Message";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthDivider from "../components/auth/AuthDivider";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { login } from "../actions/userActions";
import { USER_LOGIN_FAIL } from "../constants/userConstants";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search
    ? "/" + new URLSearchParams(location.search).get("redirect")
    : "/";
  const { error, loading, userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const registerLink = location.search
    ? `/register${location.search}`
    : "/register";

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue shopping and manage your orders."
      illustration="/images/login-rafiki.png"
      illustrationAlt="Sign in to Electrovix"
    >
      {error && (
        <div className="mb-5">
          <Message variant="danger">{error}</Message>
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-5 relative">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-[2px]">
            <div className="w-10 h-10 border-4 border-accent-light border-t-primary rounded-full animate-spin" />
          </div>
        )}

        <AuthInput
          label="Email"
          type="email"
          icon={FaEnvelope}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <AuthInput
          label="Password"
          type="password"
          icon={FaLock}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          rightSlot={
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-primary hover:text-primary-light no-underline"
            >
              Forgot password?
            </Link>
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full rounded-xl py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <AuthDivider />

      <GoogleSignInButton
        disabled={loading}
        onError={(msg) => dispatch({ type: USER_LOGIN_FAIL, payload: msg })}
      />

      <p className="text-center mt-8 text-sm text-muted">
        New to Electrovix?{" "}
        <Link
          to={registerLink}
          className="font-semibold text-primary hover:text-primary-light no-underline hover:underline"
        >
          Create an account
        </Link>
      </p>

      <div className="mt-8 pt-6 border-t border-accent-light/60">
        <button
          type="button"
          onClick={() => setShowDemo((v) => !v)}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted hover:text-primary transition-colors"
        >
          <span>Demo credentials (recruiters)</span>
          <span className="text-primary">{showDemo ? "−" : "+"}</span>
        </button>

        {showDemo && (
          <div className="mt-4 space-y-3 animate-fade-in">
            <button
              type="button"
              onClick={() => {
                setEmail("demo@example.com");
                setPassword("demo1234");
              }}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-accent-pale/60 hover:bg-accent-pale border border-accent-light/50 transition-all text-left group"
            >
              <span className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary shadow-soft">
                <FaUser className="w-4 h-4" />
              </span>
              <div className="flex-1 min-w-0">
                <span className="block text-xs text-muted">Customer demo</span>
                <span className="text-sm font-semibold text-primary-dark truncate">
                  demo@example.com
                </span>
              </div>
              <span className="text-xs font-medium text-primary shrink-0">Fill</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("admin@gmail.com");
                setPassword("123");
              }}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 transition-all text-left group"
            >
              <span className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-soft">
                <FaUserShield className="w-4 h-4" />
              </span>
              <div className="flex-1 min-w-0">
                <span className="block text-xs text-muted">Admin demo</span>
                <span className="text-sm font-semibold text-primary-dark truncate">
                  admin@gmail.com
                </span>
              </div>
              <span className="text-xs font-medium text-white bg-primary px-2 py-1 rounded-lg shrink-0">
                Fill
              </span>
            </button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

export default LoginScreen;
