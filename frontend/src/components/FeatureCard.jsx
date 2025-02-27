import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import { FiActivity, FiPieChart, FiUsers } from "react-icons/fi";

const Home = () => {
  const features = [
    {
      icon: <FiActivity size={30} className="text-blue-600" />,
      title: "Personalized Workouts",
      description: "AI-powered workouts tailored to your fitness level and goals.",
    },
    {
      icon: <FiPieChart size={30} className="text-pink-600" />,
      title: "Track Progress",
      description: "Monitor calories, exercises, and improvements over time.",
    },
    {
      icon: <FiUsers size={30} className="text-green-600" />,
      title: "Community Support",
      description: "Join a community of fitness enthusiasts and stay motivated.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-20 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose ExerLytix?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </section>

      {/* Stats / Progress Section */}
      <section className="w-full py-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Your Fitness Journey
        </h2>
        <div className="flex flex-col md:flex-row gap-6 px-6 md:px-20 justify-around">
          {/* Replace with charts or counters */}
          <div className="flex-1 bg-blue-50 p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-bold">Calories Burned</h3>
            <p className="text-xl mt-2">500 kcal today</p>
          </div>
          <div className="flex-1 bg-pink-50 p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-bold">Workouts Completed</h3>
            <p className="text-xl mt-2">10 workouts this week</p>
          </div>
          <div className="flex-1 bg-green-50 p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-bold">Active Time</h3>
            <p className="text-xl mt-2">1h 30m today</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          What Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <p className="text-gray-600 mb-4">"This app transformed my workouts!"</p>
            <h4 className="font-bold">- John D.</h4>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <p className="text-gray-600 mb-4">"Tracking calories has never been easier."</p>
            <h4 className="font-bold">- Sarah K.</h4>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <p className="text-gray-600 mb-4">"Love the AI workout suggestions!"</p>
            <h4 className="font-bold">- Mike L.</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start?</h2>
        <p className="mb-8">Join ExerLytix and transform your fitness journey today!</p>
        <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Home;
