import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Nutrition = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 min-h-screen pt-20 transition-colors duration-300">
      {/* Hero Section */}
      <section className="w-full bg-white dark:bg-slate-900 pt-24 pb-16 text-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 dark:bg-neon-purple/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 dark:bg-neon-blue/20 rounded-full blur-[120px]"></div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-gray-900 dark:text-white mb-6 transition-colors">
            Fuel Your <span className="brand-text">Performance</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed transition-colors">
            Nutrition is 80% of the battle. Discover the best meal plans and guides to complement your ExerLytix training.
          </p>
        </div>
      </section>

      {/* Nutrition Cards */}
      <section className="container mx-auto px-6 lg:px-16 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 transition-colors">Essential Nutrition Pillars</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="card hover:-translate-y-2 transition-transform p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Protein Power</h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 text-sm transition-colors">
              Protein is essential for muscle repair and growth after intense AI-tracked workouts. Focus on lean sources like chicken, tofu, and beans.
            </p>
            <ul className="text-gray-700 dark:text-slate-300 text-sm space-y-2 font-medium transition-colors">
              <li>✅ Chicken Breast</li>
              <li>✅ Greek Yogurt</li>
              <li>✅ Lentils</li>
            </ul>
          </div>

          <div className="card hover:-translate-y-2 transition-transform p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Carbs for Energy</h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 text-sm transition-colors">
              Carbohydrates fuel your brain and your workouts. Choose complex carbs for sustained energy without the crash.
            </p>
            <ul className="text-gray-700 dark:text-slate-300 text-sm space-y-2 font-medium transition-colors">
              <li>✅ Sweet Potatoes</li>
              <li>✅ Oats</li>
              <li>✅ Brown Rice</li>
            </ul>
          </div>

          <div className="card hover:-translate-y-2 transition-transform p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors">Healthy Fats</h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 text-sm transition-colors">
              Fats are crucial for hormone regulation and joint health, especially when lifting weights or doing high-impact exercises.
            </p>
            <ul className="text-gray-700 dark:text-slate-300 text-sm space-y-2 font-medium transition-colors">
              <li>✅ Avocados</li>
              <li>✅ Nuts & Seeds</li>
              <li>✅ Olive Oil</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full glass border-y border-gray-200 dark:border-slate-700/50 py-16 text-center mt-12 transition-colors">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 transition-colors">Plan Your Meals with AI</h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-600 dark:text-slate-400 transition-colors">
          Try our FDC-powered Meal Planner in your Dashboard to easily track your calories and macros based on real-time data.
        </p>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="btn-brand"
        >
          Go To Dashboard
        </button>
      </section>
    </div>
  );
};

export default Nutrition;
