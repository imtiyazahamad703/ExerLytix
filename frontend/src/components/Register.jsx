import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    setIsValid(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      setIsValid(true);
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    setIsValid(false);
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setIsValid(true);
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    setIsValid(false);
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      setIsValid(true);
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    if (isValid) return;

    const RegisterData = { name, email, password };

    try {
      const response = await axiosInstance.post("/register", RegisterData);

      setSuccessMessage("Registration successful!");
      setErrorMessage("");

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/auth/login");
      }, 1500);

    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
      setSuccessMessage("");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 pt-20 px-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="glass-card w-full max-w-5xl flex flex-col md:flex-row overflow-hidden relative z-10 border border-slate-700/50 shadow-2xl">
        
        {/* Left Side: Branding */}
        <div className="w-full md:w-1/2 relative bg-slate-800 p-8 hidden md:flex flex-col justify-center items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-transparent opacity-80"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-extrabold text-white tracking-wide">
              Join <span className="gradient-text text-glow">ExerLytix</span>
            </h2>
            <p className="text-slate-300 text-lg">
              Start your intelligent fitness journey today. Experience real-time form tracking and personalized insights.
            </p>
            <div className="flex flex-col space-y-4 mt-8 items-center text-slate-400">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue">✓</div>
                <span>Real-time Form Correction</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue">✓</div>
                <span>Automated Rep Counting</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue">✓</div>
                <span>Advanced Analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-slate-900/50 backdrop-blur-md">
          <h1 className="text-3xl font-bold text-white mb-2 text-center md:text-left">Create Account</h1>
          <p className="text-slate-400 mb-8 text-center md:text-left">Fill in your details to get started</p>

          {successMessage && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-6 text-center text-sm">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-center text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleRegistration} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors placeholder-slate-500"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors placeholder-slate-500"
                placeholder="you@example.com"
                onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
              />
              {isValid && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors placeholder-slate-500"
                placeholder="••••••••"
                onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); }}
              />
              {isValid && <p className="text-red-400 text-xs mt-1">{passwordError}</p>}
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors placeholder-slate-500"
                placeholder="••••••••"
                onChange={(e) => { setConfirmPassword(e.target.value); validateConfirmPassword(e.target.value); }}
              />
              {isValid && <p className="text-red-400 text-xs mt-1">{confirmPasswordError}</p>}
            </div>

            <button type="submit" className="w-full mt-4 bg-gradient-to-r from-neon-blue to-primary-dark text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all active:scale-[0.98]">
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400 text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-neon-blue font-semibold hover:text-white transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
