import React from 'react';
import { motion } from 'framer-motion';

const SignupHeader = () => {
  return (
    <motion.header 
      className="relative z-10 text-center py-12 px-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Islamic Greeting */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="text-islamic-600">Assalamu Alaykum!</span>
            <br />
            Welcome to Our Community
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join a global Islamic community built on authentic values, knowledge sharing, and spiritual growth.
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default SignupHeader;