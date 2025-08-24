import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock } from 'lucide-react';

const EmailAuthForm = ({
  authCredentials,
  onCredentialChange,
  onProceedToProfile
}) => {
  const isFormValid = authCredentials.email && 
                     authCredentials.password && 
                     authCredentials.confirmPassword && 
                     authCredentials.password === authCredentials.confirmPassword;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-6"
    >
      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold text-sm">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={authCredentials.email}
            onChange={(e) => onCredentialChange('email', e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
            placeholder="Enter your email address"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold text-sm">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="password"
            value={authCredentials.password}
            onChange={(e) => onCredentialChange('password', e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
            placeholder="Create a strong password"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold text-sm">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="password"
            value={authCredentials.confirmPassword}
            onChange={(e) => onCredentialChange('confirmPassword', e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
            placeholder="Confirm your password"
          />
        </div>
      </div>

      <motion.button
        onClick={onProceedToProfile}
        disabled={!isFormValid}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
          isFormValid
            ? 'bg-islamic-500 text-white hover:bg-islamic-600 hover:scale-105 shadow-lg hover:shadow-islamic-glow'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        whileHover={isFormValid ? { scale: 1.02 } : {}}
        whileTap={isFormValid ? { scale: 0.98 } : {}}
      >
        Continue to Profile
        <ArrowRight className="w-5 h-5 inline ml-2" />
      </motion.button>
    </motion.div>
  );
};

export default EmailAuthForm;