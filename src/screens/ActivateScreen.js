import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
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
          `${BASE_URL}/api/users/activate/${uid}/${token}/`
        );
        setStatus({
          loading: false,
          success: true,
          message: data.detail || "Account activated successfully.",
        });

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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

  const getCardContent = () => {
    if (status.loading) {
      return (
        <>
          <div className="w-12 h-12 border-4 border-primary-light border-t-transparent rounded-full animate-spin mx-auto mb-4" role="status" aria-label="Loading" />
          <h3>Loading...</h3>
        </>
      );
    }
    if (status.success) {
      return (
        <>
          <FaCheckCircle size={80} className="text-green-500 mb-4 mx-auto" aria-label="Success icon" />
          <h2 className="text-xl font-bold mb-2">Activation Successful</h2>
          <p>{status.message}</p>
          <p className="text-gray-600">Redirecting to login page...</p>
        </>
      );
    }
    return (
      <>
        <FaTimesCircle size={80} className="text-red-500 mb-4 mx-auto" aria-label="Error icon" />
        <h2 className="text-xl font-bold mb-2">Activation Failed</h2>
        <p>{status.message}</p>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white text-center p-8 shadow-lg rounded-2xl max-w-md w-full">
        {getCardContent()}
      </div>
    </div>
  );
}

export default ActivateScreen;
