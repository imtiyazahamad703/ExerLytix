import React from "react";
import fitnessImage from "../assets/banners/image.png";


const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row w-screen h-screen items-center justify-around px-10 py-20 bg-gray-100">
      
      
      {/* Left Section - Text */}
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold leading-tight text-pink-800">
          Transform Your Fitness Journey with AI
        </h1>
        <p className="mt-4 text-black">
          Personalized workouts, nutrition tracking, and expert guidance all in one place.
        </p>
        <div className="mt-6 space-x-4">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white rounded-lg transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-lg bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Section - Card with Image */}
      <div className="mt-10 md:mt-0">
        <div className="w-80 h-96 mt-20 bg-gray-800 rounded-3xl shadow-lg flex items-center justify-center">
          <img
            src={fitnessImage}
            alt="Fitness"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
