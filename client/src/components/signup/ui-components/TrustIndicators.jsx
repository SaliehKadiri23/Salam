import React from "react";
import { FaGlobe } from "react-icons/fa";
import { TRUST_STATS } from "../constants/rolesData";

const TrustIndicators = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Join Our Community
      </h3>

      <div className="space-y-6">
        {TRUST_STATS.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-200">
        <div className="flex items-center space-x-3 mb-2">
          <FaGlobe className="text-green-600 w-5 h-5" />
          <span className="font-semibold text-green-800">Global Reach</span>
        </div>
        <p className="text-sm text-green-700">
          Connecting Muslims across 50+ countries worldwide
        </p>
      </div>
    </div>
  );
};

export default TrustIndicators;