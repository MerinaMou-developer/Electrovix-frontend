import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import AuthLayout from "../components/auth/AuthLayout";
import { API_BASE_URL } from "../config";

function ActivateScreen() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    loading: true,
    success: null,
    message: "",
  });

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/users/activate/${uid}/${token}/`
        );
        setStatus({
          loading: false,
          success: true,
          message: data.detail || "Account activated successfully.",
        });
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setStatus({
          loading: false,
          success: false,
          message:
            err.response?.data?.detail || "Invalid or expired activation link.",
        });
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <AuthLayout
      title={
        status.loading
          ? "Activating account"
          : status.success
          ? "You're all set!"
          : "Activation failed"
      }
      subtitle={
        status.loading
          ? "Please wait while we verify your link..."
          : status.success
          ? "Your Electrovix account is ready to use."
          : "This link may be expired or already used."
      }
      illustration="/images/Signup-rafiki.png"
      maxWidth="max-w-lg"
    >
      <div className="text-center py-4">
        {status.loading && (
          <div className="w-14 h-14 border-4 border-accent-light border-t-primary rounded-full animate-spin mx-auto mb-6" />
        )}
        {status.success && (
          <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        )}
        {status.success === false && (
          <FaTimesCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        )}
        {status.message && (
          <p className="text-muted text-sm leading-relaxed">{status.message}</p>
        )}
        {status.success && (
          <p className="text-xs text-muted mt-3">Redirecting to sign in...</p>
        )}
        {status.success === false && (
          <Link to="/login" className="btn-primary inline-flex mt-6 rounded-xl no-underline">
            Go to sign in
          </Link>
        )}
      </div>
    </AuthLayout>
  );
}

export default ActivateScreen;
