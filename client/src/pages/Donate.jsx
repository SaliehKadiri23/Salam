import React from "react";
import HeroSection from "../components/donate/HeroSection";
import DonationTypesSection from "../components/donate/DonationTypesSection";
import ImpactStoriesSection from "../components/donate/ImpactStoriesSection";
import TrustIndicators from "../components/donate/TrustIndicators";

const Donate = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-3deg);
          }
        }
      `}</style>

      <HeroSection />
      <DonationTypesSection />
      <ImpactStoriesSection />
      <TrustIndicators />
    </div>
  );
};

export default Donate;
