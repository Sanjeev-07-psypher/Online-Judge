import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeatureSection";
import StatsSection from "../components/landing/StatsSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-bg text-white">

      <HeroSection />

      <FeaturesSection />

      <StatsSection />

      <CTASection />

      <Footer />

    </div>
  );
};

export default Home;