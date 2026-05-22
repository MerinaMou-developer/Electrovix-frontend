import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Message from "../components/Message";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthDivider from "../components/auth/AuthDivider";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { register } from "../actions/userActions";
import { USER_LOGIN_FAIL } from "../constants/userConstants";
import { showSuccessToast } from "../components/Toast";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect") ? `/${params.get("redirect")}` : "/";

  const { error, loading, success } = useSelector((state) => state.userRegister);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);

  useEffect(() => {
    if (success) {
      showSuccessToast(
        "Registration successful! Check your email to activate your account."
      );
    }
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else if (password.length < 8) {
      setMessage("Password must be at least 8 characters");
    } else {
      setMessage("");
      dispatch(register(name, email, password));
    }
  };

  const loginLink = params.get("redirect")
    ? `/login?redirect=${params.get("redirect")}`
    : "/login";

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Electrovix for faster checkout, order tracking, and AI shopping help."
      illustration="/images/Signup-rafiki.png"
      illustrationAlt="Create account"
      maxWidth="max-w-lg"
    >
      {(message || error) && (
        <div className="mb-5 space-y-3">
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
        </div>
      )}

      {success && (
        <div className="mb-5">
          <Message variant="success">
            Account created! Check your inbox to activate, then sign in.
          </Message>
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-4 relative">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-[2px]">
            <div className="w-10 h-10 border-4 border-accent-light border-t-primary rounded-full animate-spin" />
          </div>
        )}

        <AuthInput
          label="Full name"
          type="text"
          icon={FaUser}
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <AuthInput
          label="Email"
          type="email"
          icon={FaEnvelope}
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          type="password"
          icon={FaLock}
          required
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <AuthInput
          label="Confirm password"
          type="password"
          icon={FaLock}
          required
          placeholder="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={loading || success}
          className="btn-primary w-full rounded-xl py-3.5 mt-2 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <AuthDivider label="or sign up with" />

      <GoogleSignInButton
        disabled={loading}
        onError={(msg) => dispatch({ type: USER_LOGIN_FAIL, payload: msg })}
      />

      <p className="text-center mt-8 text-sm text-muted">
        Already have an account?{" "}
        <Link
          to={loginLink}
          className="font-semibold text-primary no-underline hover:underline"
        >
          Sign in
        </Link>
      </p>

      <p className="text-center mt-4 text-xs text-muted/80 leading-relaxed">
        By registering, you agree to receive account emails (activation & orders).
      </p>
    </AuthLayout>
  );
}

export default RegisterScreen;
