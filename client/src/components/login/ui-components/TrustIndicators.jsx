import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaMosque, 
  FaStar, 
  FaShieldAlt, 
  FaGlobe 
} from 'react-icons/fa';

/**
 * TrustIndicators Component
 * 
 * Displays trust and credibility indicators in the sidebar
 * Shows community statistics and security features
 */
const TrustIndicators = () => {
  const trustMetrics = [
    { 
      icon: FaUsers, 
      label: 'Active Members', 
      value: '50,000+', 
      color: 'text-green-600' 
    },
    { 
      icon: FaMosque, 
      label: 'Partner Mosques', 
      value: '1,200+', 
      color: 'text-teal-600' 
    },
    { 
      icon: FaStar, 
      label: 'Trust Rating', 
      value: '4.9/5', 
      color: 'text-yellow-500' 
    },
    { 
      icon: FaShieldAlt, 
      label: 'Verified Imams', 
      value: '500+', 
      color: 'text-blue-600' 
    }
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20"
    >
      {/* Header */}
      <motion.h3 
        className="text-xl font-bold text-gray-800 mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Trusted by the Community
      </motion.h3>
      
      {/* Trust Metrics */}
      <div className="space-y-6">
        {trustMetrics.map(({ icon: Icon, label, value, color }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + (index * 0.1), duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="mt-8 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-200"
      >
        <div className="flex items-center space-x-3 mb-2">
          <FaGlobe className="text-green-600 w-5 h-5" />
          <span className="font-semibold text-green-800">Secure Access</span>
        </div>
        <p className="text-sm text-green-700">
          Your account is protected with enterprise-grade security
        </p>
      </motion.div>
    </motion.aside>
  );
};

export default TrustIndicators;