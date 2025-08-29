import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import IslamicPattern from '../../utility/IslamicPattern';


const LoginHeader = ({ selectedRole }) => {
  return (
    <motion.header 
      className="relative z-10 text-center py-8 px-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-4"
        >
          <IslamicPattern 
            variant="divider" 
            className="w-32 h-8 mx-auto text-islamic-400 mb-4" 
          />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            <span className="text-islamic-600">Ahlan wa Sahlan!</span>
            <br />
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Continue your spiritual journey with our Islamic community
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="flex justify-center items-center space-x-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-colors ${
              selectedRole ? 'bg-islamic-500' : 'bg-gray-300'
            }`} />
            <span className="text-sm text-gray-600">Account Type</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-colors ${
              selectedRole ? 'bg-islamic-500' : 'bg-gray-300'
            }`} />
            <span className="text-sm text-gray-600">Sign In</span>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default LoginHeader;