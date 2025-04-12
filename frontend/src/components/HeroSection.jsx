import React from "react";
import { Link } from "react-router-dom";
import bannerImage from "../assets/banners/banner1.png";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-slate-900 pt-20 transition-colors duration-300">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-10 mix-blend-overlay transition-opacity"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8 border-gray-200 dark:border-neon-blue/30 transition-colors">
              <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-neon-blue animate-pulse transition-colors"></span>
              <span className="text-sm font-medium text-gray-600 dark:text-slate-300 transition-colors">Next-Gen Fitness Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 tracking-tight transition-colors">
              Transform With <br className="hidden md:block" />
              <span className="brand-text">AI Precision</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 mb-10 max-w-2xl font-light leading-relaxed transition-colors">
              Experience the future of fitness. Our advanced computer vision tracks your form in real-time, 
              counts your reps, and personalizes your journey. No equipment needed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/register" className="btn-brand text-lg px-8 py-4 flex items-center justify-center space-x-2 group">
                <span>Start Training Free</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link to="/about" className="glass hover:bg-gray-100 dark:hover:bg-slate-800/80 text-gray-800 dark:text-white text-lg px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center border border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-neon-blue/50">
                Explore Features
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-100 dark:border-slate-900 bg-gray-200 dark:bg-slate-800 flex items-center justify-center transition-colors" style={{ zIndex: 5 - i }}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=4f46e5,3b82f6`} alt="User" className="w-full h-full rounded-full" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="text-gray-900 dark:text-white font-bold transition-colors">10,000+</p>
                <p className="text-gray-500 dark:text-slate-500 transition-colors">Athletes joined</p>
              </div>
            </div>
          </div>
          
          {/* Right Content - Banner Image */}
          <div className="w-full lg:w-1/2 relative hidden md:flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-lg mx-auto overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 transition-all">
              <img src={bannerImage} alt="ExerLytix AI Training" className="w-full h-full object-cover relative z-0" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
