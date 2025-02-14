import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Testimonials from "../components/Testimonials";

function LandingPage() {
  return (
    <div>
      {/* Hero Section with Carousel */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials / Call to Action */}
      <Testimonials />
    </div>
  );
}

export default LandingPage;
