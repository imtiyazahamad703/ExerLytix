import React from "react";
import { FaDumbbell, FaBrain, FaUsers, FaHeartbeat } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      
    {/* Hero Section */}
<section className="w-full bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-900 pt-32 pb-20 text-center">
  <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
    About <span className="text-blue-600">Exer</span>
    <span className="text-amber-500">Lytix</span>
  </h1>
  <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
    Transform your fitness journey with cutting-edge AI, personalized workouts,
    and expert guidance — all in one place.
  </p>
</section>
      {/* Mission Section */}
      <section className="container mx-auto px-6 lg:px-16 py-16 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At <span className="font-semibold text-blue-600">ExerLytix</span>, our mission is
              to revolutionize the fitness industry by combining artificial intelligence
              with personalized training. We aim to help individuals achieve their goals,
              stay motivated, and make fitness a sustainable lifestyle.
            </p>
          </div>
          <div className="bg-gray-800 rounded-2xl shadow-lg p-8 text-white">
            <h3 className="text-xl font-semibold mb-3">Why Choose Us?</h3>
            <p className="text-gray-300">
              Because fitness isn’t one-size-fits-all. Our AI-driven system adapts to
              your progress, giving you the tools you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <FaDumbbell size={40} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Smart Workouts</h3>
              <p className="text-gray-600 text-sm">
                AI-powered workout plans that adapt to your fitness level and goals.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <FaBrain size={40} className="text-amber-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">AI Insights</h3>
              <p className="text-gray-600 text-sm">
                Track progress with detailed analytics and recommendations.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <FaHeartbeat size={40} className="text-pink-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Health Tracking</h3>
              <p className="text-gray-600 text-sm">
                Keep an eye on your nutrition, recovery, and overall wellness.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <FaUsers size={40} className="text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Community Support</h3>
              <p className="text-gray-600 text-sm">
                Join a supportive community of like-minded fitness enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Optional Placeholder) */}
      <section className="container mx-auto px-6 lg:px-16 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Our dedicated team of fitness coaches, AI experts, and nutritionists work
          together to bring you the best experience possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
            <h3 className="font-semibold text-lg">Alex Johnson</h3>
            <p className="text-sm text-gray-500">Head Fitness Coach</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
            <h3 className="font-semibold text-lg">Sophia Lee</h3>
            <p className="text-sm text-gray-500">AI Specialist</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
            <h3 className="font-semibold text-lg">Rahul Mehta</h3>
            <p className="text-sm text-gray-500">Nutrition Expert</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
