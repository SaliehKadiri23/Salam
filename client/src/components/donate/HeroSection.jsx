import React from "react";
import { TbBuildingMosque } from "react-icons/tb";
import IslamicPattern from "../utility/IslamicPattern";
import FloatingShape from "../utility/FloatingShape";
import ProgressBar from "../utility/ProgressBar";
import AnimatedCounter from "../utility/AnimatedCounter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const CampaignProgress = () => {
  const { goal, current, donorCount } = useSelector(
    (state) => state.donate.campaignData
  );
  const percentage = Math.round((current / goal) * 100);

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            Campaign Progress
          </h3>
          <span className="text-2xl font-bold text-emerald-600">
            {percentage}%
          </span>
        </div>

        <ProgressBar percentage={percentage} animated={true} />

        <div className="flex justify-between items-center mt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800">
              $<AnimatedCounter target={current} />
            </p>
            <p className="text-gray-600">Raised</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800">
              $<AnimatedCounter target={goal} />
            </p>
            <p className="text-gray-600">Goal</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800">
              <AnimatedCounter target={donorCount} />
            </p>
            <p className="text-gray-600">Donors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickDonateActions = () => {
  const navigate = useNavigate();
  const quickAmounts = [25, 50, 100, 250];

  const handleQuickDonate = (amount) => {
    navigate(`/donate_form?type=general&amount=${amount}`);
  };

  return (
    <div className="flex flex-wrap pb-4 justify-center gap-4 overflow-hidden">
      {quickAmounts.map((amount, index) => (
        <motion.button
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 + (0.2 * index) },
          }}
          exit={{
            opacity: 0,
            y: 50,
          }}
          viewport={{ once: true }}
          key={amount}
          onClick={() => handleQuickDonate(amount)}
          className="px-6 py-3 bg-white/80 hover:bg-white text-emerald-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-200 hover:border-emerald-300"
        >
          Quick Donate ${amount}
        </motion.button>
      ))}
    </div>
  );
};

const HeroSection = () => (
  <section className="relative px-6 py-20 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-hidden">
    <div className="fixed inset-0">
      <IslamicPattern className="absolute inset-0 text-emerald-500" />
    </div>

    <FloatingShape top={20} left={10} size={20}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L13.09 7.26L18 4.27L15.18 9.32L21 9L16.77 12L21 15L15.18 14.68L18 19.73L13.09 16.74L12 22L10.91 16.74L6 19.73L8.82 14.68L3 15L7.23 12L3 9L8.82 9.32L6 4.27L10.91 7.26L12 2Z" />
      </svg>
    </FloatingShape>

    <FloatingShape top={60} right={10} size={16} delay={2}>
      <TbBuildingMosque className="w-full h-full" />
    </FloatingShape>

    <div className="max-w-6xl mx-auto text-center relative z-10">
      <div className="mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Give to Those in
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
            {" "}
            Need
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Your generous donation will help us provide essential resources and
          support to Muslim communities worldwide. We are committed to
          transparency and ensuring your contributions make a meaningful impact.
        </p>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: 70,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.55 },
        }}
        exit={{
          opacity: 0,
          y: 70,
        }}
        viewport={{ once: true }}
      >
        <CampaignProgress />
      </motion.div>

      <QuickDonateActions />
    </div>
  </section>
);

export default HeroSection;
