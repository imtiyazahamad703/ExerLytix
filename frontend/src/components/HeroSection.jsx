import React from "react";
import fitnessImage from "../assets/banners/image.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Left Section - Text */}
        <div className="max-w-2xl text-center md:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-neon-blue/30 bg-neon-blue/10 backdrop-blur-sm text-neon-blue text-sm font-semibold tracking-wider">
            AI-POWERED FITNESS TRACKING
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white mb-6">
            Transform Your Body With <span className="gradient-text text-glow">ExerLytix</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Experience the future of fitness. Real-time form correction, automated rep counting, and intelligent analytics powered by advanced computer vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
            <Link to="/auth/login">
              <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-primary-dark rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300">
                Start Free Trial
              </button>
            </Link>
            <Link to="/about">
              <button className="px-8 py-4 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700 text-white font-semibold text-lg hover:bg-slate-700 hover:border-slate-500 transition-all duration-300">
                See How It Works
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section - Image Card */}
        <div className="mt-16 md:mt-0 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-80 md:w-96 lg:w-[450px] aspect-[4/5] bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50">
            <img
              src={fitnessImage}
              alt="Fitness AI tracking"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay stats card */}
            <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Squats Completed</p>
                <p className="text-white text-2xl font-bold">124 <span className="text-green-400 text-sm">↑ 12%</span></p>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-neon-blue flex items-center justify-center">
                <span className="text-neon-blue text-xs font-bold">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
