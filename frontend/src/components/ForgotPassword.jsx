import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include a number and a special character"
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== newPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(newPassword);
    const isConfirmValid = validateConfirmPassword(confirmNewPassword);

    if (!isEmailValid || !isPasswordValid || !isConfirmValid) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post("/reset-password", {
        email,
        newPassword,
      });

      if (response.status === 200) {
        setMessage("Password updated successfully! Redirecting to login...");
        setTimeout(() => navigate("/auth/login"), 2000);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      if (error.response && error.response.status === 404) {
        setMessage("This email is not registered.");
      } else if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center mt-10">
      <div className="max-w-md rounded-3xl p-8 py-12 shadow-2xl shadow-gray-600 w-full">
        <div className="mb-8 w-full text-center">
          <h1 className="mb-1.5 text-center text-2xl font-bold">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500">
            Enter your email and new password to reset it directly.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              id="email"
              className="w-full rounded-md border border-gray-500 p-2 mt-1"
              placeholder="xyz@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              id="newPassword"
              className="w-full rounded-md border border-gray-500 p-2 mt-1"
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={() => validatePassword(newPassword)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmNewPassword}
              id="confirmNewPassword"
              className="w-full rounded-md border border-gray-500 p-2 mt-1"
              placeholder="Re-enter new password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              onBlur={() => validateConfirmPassword(confirmNewPassword)}
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm">{confirmPasswordError}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 p-3 font-bold text-white transition-all duration-200 hover:bg-blue-800 disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </div>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <Link to="/auth/login" className="text-indigo-600 hover:underline text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;