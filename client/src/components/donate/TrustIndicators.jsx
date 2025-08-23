import React from "react";
import { Shield, Award, TrendingUp, Globe } from "lucide-react";
import { motion } from "framer-motion";

const TrustBadge = ({ icon, title, description }) => (
  <div className="text-center group">
    <div className="inline-flex p-4 bg-emerald-100 rounded-2xl text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const TrustIndicators = () => (
  <section className="py-16 px-6 bg-white">
    <motion.div
      initial={{
        opacity: 0,
        y: 150,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.55 },
      }}
      exit={{
        opacity: 0,
        y: 150,
      }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto text-center"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-12">
        Why Donate with Salam?
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <TrustBadge
          icon={<Shield className="w-8 h-8" />}
          title="Secure Donations"
          description="SSL encrypted payments"
        />
        <TrustBadge
          icon={<Award className="w-8 h-8" />}
          title="Scholar Endorsed"
          description="Approved by Islamic scholars"
        />
        <TrustBadge
          icon={<TrendingUp className="w-8 h-8" />}
          title="100% Transparent"
          description="Full accountability reports"
        />
        <TrustBadge
          icon={<Globe className="w-8 h-8" />}
          title="Global Reach"
          description="Supporting 40+ countries"
        />
      </div>
    </motion.div>
  </section>
);

export default TrustIndicators;