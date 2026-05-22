import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import Message from "../components/Message";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import { API_BASE_URL } from "../config";

function ResetPasswordScreen() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/users/password-reset/confirm/`,
        { uid, token, password },
        { headers: { "Content-type": "application/json" } }
      );
      setMessage(data.detail);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Could not reset password. Request a new link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create a new password"
      subtitle="Choose a strong password you haven't used on Electrovix before."
      illustration="/images/Signup-rafiki.png"
      illustrationAlt="New password"
      maxWidth="max-w-lg"
    >
      {error && (
        <div className="mb-5">
          <Message variant="danger">{error}</Message>
        </div>
      )}
      {message && (
        <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
          <FaCheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{message} Redirecting to sign in...</span>
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-5">
        <AuthInput
          label="New password"
          type="password"
          icon={FaLock}
          required
          minLength={8}
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <AuthInput
          label="Confirm password"
          type="password"
          icon={FaLock}
          required
          minLength={8}
          placeholder="Repeat new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={loading || !!message}
          className="btn-primary w-full rounded-xl py-3.5 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-muted">
        Link expired?{" "}
        <Link
          to="/forgot-password"
          className="font-semibold text-primary no-underline hover:underline"
        >
          Request a new one
        </Link>
      </p>
    </AuthLayout>
  );
}

export default ResetPasswordScreen;
