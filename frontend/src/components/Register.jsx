import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import bannerImage from "../assets/banners/banner1.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/register", {
        name,
        email,
        password,
      });

      if (response.data && response.data.id) {
        login({
          userId: response.data.id,
          name: response.data.name,
          email: response.data.email
        });
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-purple/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/20 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] dark:opacity-20 mix-blend-overlay transition-opacity"></div>
      </div>

      <div className="w-full max-w-5xl card rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse relative z-10 shadow-xl dark:shadow-2xl border border-gray-200 dark:border-slate-700/50 transition-colors">
        
        {/* Right Side (Visual) - Reversed for Register */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden bg-cover bg-center transition-colors" style={{ backgroundImage: `url(${bannerImage})` }}>
          <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-900/80 transition-colors"></div>
          
          <div className="relative z-10 text-right">
            <Link to="/" className="text-3xl font-extrabold tracking-wider text-white flex items-center justify-end gap-2 mb-12 group inline-flex w-full transition-colors">
              <span className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-lg text-white transition-all shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </span>
              Exer<span className="brand-text">Lytix</span>
            </Link>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight transition-colors">
              Start Your <br />
              <span className="brand-text">Transformation</span>
            </h2>
            <p className="text-gray-200 dark:text-slate-300 text-lg mb-8 ml-auto max-w-sm transition-colors">
              Create a free account to unlock AI-powered workout tracking, meal plans, and deep analytics.
            </p>

            <div className="flex items-center justify-end gap-4 text-sm text-gray-300 dark:text-slate-400 transition-colors">
              <p>Setup takes less than <strong className="text-white transition-colors">60 seconds</strong>.</p>
            </div>
          </div>
        </div>

        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 p-10 md:p-16 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border-r border-gray-200 dark:border-slate-700/50 flex flex-col justify-center transition-colors">
          <div className="max-w-md w-full mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Create Account</h3>
            <p className="text-gray-600 dark:text-slate-400 mb-8 transition-colors">Join the next generation of fitness tracking.</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pl-11"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-11"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-11"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-brand py-3 mt-6 flex justify-center items-center group"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-slate-400 transition-colors">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-blue-600 dark:text-neon-blue hover:text-purple-600 dark:hover:text-neon-purple transition-colors">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
