import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get email from navigation state
  const email = location.state?.email;

  // ✅ If no email passed, redirect user back to ForgotPassword
  useEffect(() => {
    if (!email) {
      setMessage("You must go through Forgot Password first!");
      setTimeout(() => navigate("/auth/forgot-password"), 3000);
    }
  }, [email, navigate]);

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
    if (!email) return; // stop if no email carried

    if (!validatePassword(newPassword)) return;
    if (!validateConfirmPassword(confirmNewPassword)) return;

    try {
      const response = await axiosInstance.post("/reset-password", {
        userId,
        oldPassword,
        newPassword
      });

      if (response.status === 200) {
        setMessage("Password changed successfully!");
        setTimeout(() => navigate("/auth/login"), 2000);
      } else {
        setMessage(response.data?.message || "Error resetting password");
      }
    } catch (err) {
      setMessage("Server error: " + err.message);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center mt-10">
      <div className="max-w-md rounded-3xl p-8 py-12 shadow-2xl shadow-gray-600">
        <div className="mb-8 w-full text-center">
          <h1 className="mb-1.5 text-center text-2xl font-bold">
            Change Password
          </h1>
          <p className="text-sm text-gray-500">
            Provide your new password to update your account security
          </p>
        </div>

        {email ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword" className="block">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                id="newPassword"
                className="w-full rounded-md border border-gray-500 p-2"
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => validatePassword(newPassword)}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmNewPassword" className="block">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                id="confirmNewPassword"
                className="w-full rounded-md border border-gray-500 p-2"
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
                className="w-full rounded-lg bg-blue-600 p-3 font-bold text-white transition-all hover:bg-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-red-600">
            {message || "Redirecting..."}
          </p>
        )}

        {message && email && (
          <p className="mt-4 text-center text-sm text-green-700">{message}</p>
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

export default ChangePassword;
