import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/banners/banner1.png";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {updateProfile} = useAuth();
  const [isValid, setIsValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    try {
      const response = await axiosInstance.post("/login", loginData);
      if (response.data.success) {
        updateProfile({
          userId: response.data.userId,
          name: response.data.name,
          email: response.data.email,
          profilePicture: response.data.profilePicture,
        });
        setErrorMessage("");
        navigate("/dashboard");
      } else {
        setErrorMessage(response.data.message);
        setTimeout(() => setErrorMessage(""), 2000);
      }
    } catch (error) {
      setErrorMessage("Wrong email or password");
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 pt-20 px-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="glass-card w-full max-w-5xl flex flex-col md:flex-row overflow-hidden relative z-10 border border-slate-700/50 shadow-2xl">
        
        {/* Left Side: Image/Branding */}
        <div className="w-full md:w-1/2 relative bg-slate-800 p-8 hidden md:flex flex-col justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
          <img src={loginImg} alt="Login Fitness" className="w-4/5 object-contain rounded-2xl relative z-10 shadow-[0_0_30px_rgba(0,240,255,0.2)]" />
          <div className="relative z-10 mt-8 text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-wide">Welcome Back</h2>
            <p className="text-slate-400 mt-2">Log in to track your progress and continue your journey.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-slate-900/50 backdrop-blur-md">
          <h1 className="text-3xl font-bold text-white mb-2 text-center md:text-left">Sign In</h1>
          <p className="text-slate-400 mb-8 text-center md:text-left">Enter your credentials to access your dashboard</p>

          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-center text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Email Address</label>
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
              <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors placeholder-slate-500"
                placeholder="••••••••"
                onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); }}
              />
              {isValid && <p className="text-red-400 text-xs mt-1">{passwordError}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-slate-800 border-slate-600 text-neon-blue focus:ring-neon-blue focus:ring-offset-slate-900"
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="ml-2">Remember me</span>
              </label>
              <Link to="/auth/forgot-password" className="text-sm text-neon-blue hover:text-white transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-neon-blue to-primary-dark text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all active:scale-[0.98]">
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-neon-blue font-semibold hover:text-white transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
