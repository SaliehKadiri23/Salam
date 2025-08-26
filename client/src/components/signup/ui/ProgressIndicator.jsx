import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ProgressIndicator = ({ selectedRole, selectedAuthMethod, currentStep }) => {
  return (
    <motion.div
      className="flex justify-center items-center space-x-4 mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full transition-colors ${
          selectedRole ? 'bg-islamic-500' : 'bg-gray-300'
        }`} />
        <span className="text-sm text-gray-600">Select Role</span>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400" />
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full transition-colors ${
          selectedAuthMethod ? 'bg-islamic-500' : 'bg-gray-300'
        }`} />
        <span className="text-sm text-gray-600">Authentication</span>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400" />
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full transition-colors ${
          currentStep === 'completeProfile' ? 'bg-islamic-500' : 'bg-gray-300'
        }`} />
        <span className="text-sm text-gray-600">Complete Profile</span>
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;