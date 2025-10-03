import { useState, useEffect } from "react";

const banners = [
  {
    image: "/images/banner1.jpg",
    title: "Transform Your Fitness Journey",
    description: "Join us to achieve your fitness goals with personalized plans.",
  },
  {
    image: "/images/banner2.jpg",
    title: "Train Smarter, Not Harder",
    description: "AI-powered fitness recommendations tailored just for you.",
  },
  {
    image: "/images/banner3.jpg",
    title: "Eat Healthy, Stay Fit",
    description: "Get expert diet plans that complement your workouts.",
  },
];

const HeroBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* Banner Images */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img
          src={banners[currentBanner].image}
          alt={banners[currentBanner].title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          {banners[currentBanner].title}
        </h1>
        <p className="mt-3 text-lg">{banners[currentBanner].description}</p>
        <button className="mt-5 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg text-lg font-semibold">
          Get Started
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentBanner ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
