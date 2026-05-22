import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import Message from "../components/Message";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import { API_BASE_URL } from "../config";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/users/password-reset/`,
        { email },
        { headers: { "Content-type": "application/json" } }
      );
      setMessage(data.detail);
      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll email you a secure link if an account exists for that address."
      illustration="/images/login-rafiki.png"
      illustrationAlt="Password reset"
      maxWidth="max-w-lg"
    >
      {error && (
        <div className="mb-5">
          <Message variant="danger">{error}</Message>
        </div>
      )}
      {message && (
        <div className="mb-5">
          <Message variant="success">{message}</Message>
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-5">
        <AuthInput
          label="Email address"
          type="email"
          icon={FaEnvelope}
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full rounded-xl py-3.5 gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane className="w-4 h-4" />
              Send reset link
            </>
          )}
        </button>
      </form>

      <Link
        to="/login"
        className="mt-8 inline-flex items-center justify-center gap-2 w-full text-sm font-semibold text-primary hover:text-primary-light no-underline py-2 rounded-lg hover:bg-accent-pale/50 transition-colors"
      >
        <FaArrowLeft className="w-3.5 h-3.5" />
        Back to sign in
      </Link>
    </AuthLayout>
  );
}

export default ForgotPasswordScreen;
