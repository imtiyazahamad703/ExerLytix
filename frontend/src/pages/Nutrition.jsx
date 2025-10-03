import React from "react";
import { FaAppleAlt, FaUtensils, FaChartPie, FaLeaf } from "react-icons/fa";

const Nutrition = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      
      {/* Hero Section */}
     <section className="w-full bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-900 pt-32 pb-20 text-center">
  <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
    Fuel Your Body with <span className="text-blue-600">Smart</span>
    <span className="text-amber-500"> Nutrition</span>
  </h1>
  <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
    AI-powered nutrition tracking, meal plans, and insights to help you eat better,
    stay healthy, and reach your fitness goals.
  </p>
</section>

      {/* Features Section */}
      <section className="container mx-auto px-6 lg:px-16 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Nutrition Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <FaAppleAlt size={40} className="text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Smart Tracking</h3>
            <p className="text-gray-600 text-sm">
              Log your meals easily and let AI calculate calories & macros.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <FaChartPie size={40} className="text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Macro Insights</h3>
            <p className="text-gray-600 text-sm">
              Get a detailed breakdown of proteins, carbs, and fats in your diet.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <FaUtensils size={40} className="text-amber-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Personalized Meal Plans</h3>
            <p className="text-gray-600 text-sm">
              AI suggests meal plans based on your fitness goals and preferences.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <FaLeaf size={40} className="text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Healthy Lifestyle</h3>
            <p className="text-gray-600 text-sm">
              Build sustainable habits with clean and balanced nutrition.
            </p>
          </div>
        </div>
      </section>

      {/* Meal Plan Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Choose Your Meal Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Weight Loss</h3>
              <p className="text-gray-600 mb-6">
                A calorie-controlled plan designed to help you shed fat while staying energetic.
              </p>
              <ul className="text-gray-700 text-sm space-y-2 mb-6">
                <li>✔ Low-carb meals</li>
                <li>✔ High protein</li>
                <li>✔ Portion control</li>
              </ul>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Get Plan
              </button>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-amber-500 mb-4">Muscle Gain</h3>
              <p className="text-gray-600 mb-6">
                A protein-rich plan tailored for muscle building and strength training.
              </p>
              <ul className="text-gray-700 text-sm space-y-2 mb-6">
                <li>✔ High protein meals</li>
                <li>✔ Balanced macros</li>
                <li>✔ Energy boosting</li>
              </ul>
              <button className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
                Get Plan
              </button>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-green-600 mb-4">Balanced Diet</h3>
              <p className="text-gray-600 mb-6">
                A lifestyle-focused plan with a mix of carbs, proteins, and healthy fats.
              </p>
              <ul className="text-gray-700 text-sm space-y-2 mb-6">
                <li>✔ Balanced macros</li>
                <li>✔ Whole foods</li>
                <li>✔ Flexible meals</li>
              </ul>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Get Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-amber-500 text-white py-16 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Start Your Nutrition Journey Today!</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Join thousands of fitness enthusiasts who are transforming their health
          with ExerLytix AI-powered nutrition tracking.
        </p>
        <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>

    </div>
  );
};

export default Nutrition;
