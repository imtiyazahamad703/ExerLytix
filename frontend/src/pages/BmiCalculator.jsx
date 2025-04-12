import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const calculateBmi = (e) => {
    e.preventDefault();
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
      
      if (bmiValue < 18.5) setCategory("Underweight");
      else if (bmiValue >= 18.5 && bmiValue < 24.9) setCategory("Normal weight");
      else if (bmiValue >= 25 && bmiValue < 29.9) setCategory("Overweight");
      else setCategory("Obesity");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8 max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-wide transition-colors">
                BMI <span className="brand-text">Calculator</span>
              </h1>
              <p className="text-gray-600 dark:text-slate-400 mt-2 transition-colors">Check your Body Mass Index quickly and easily.</p>
            </div>
            
            <button 
              className="lg:hidden p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 text-blue-600 dark:text-neon-blue shadow-sm transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* Form */}
            <div className="card p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Enter Your Details</h2>
              <form onSubmit={calculateBmi} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors">Weight (kg)</label>
                  <input
                    type="number"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="input-field"
                    placeholder="e.g. 70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 transition-colors">Height (cm)</label>
                  <input
                    type="number"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="input-field"
                    placeholder="e.g. 175"
                  />
                </div>
                <button type="submit" className="w-full btn-brand mt-4">
                  Calculate BMI
                </button>
              </form>
            </div>

            {/* Results */}
            <div className="card p-8 flex flex-col justify-center items-center text-center">
              {bmi ? (
                <>
                  <div className="w-40 h-40 rounded-full border-4 border-blue-500 dark:border-neon-blue flex items-center justify-center mb-6 shadow-sm dark:shadow-[0_0_30px_rgba(0,240,255,0.3)] relative transition-all">
                    <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-neon-blue/10 animate-pulse transition-colors"></div>
                    <span className="text-5xl font-black text-gray-900 dark:text-white relative z-10 transition-colors">{bmi}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-blue-600 dark:text-neon-blue mb-3 transition-colors">
                    {category}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 max-w-sm transition-colors">
                    {category === "Normal weight" 
                      ? "Great job! You are in a healthy weight range. Keep up the good work!" 
                      : "Consider consulting a healthcare provider or checking our meal plans to reach a healthier weight range."}
                  </p>
                </>
              ) : (
                <div className="text-gray-400 dark:text-slate-500 p-8 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mx-auto mb-6 opacity-50 dark:opacity-30 transition-opacity">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  <p className="text-lg">Enter your weight and height to see your BMI result.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;
