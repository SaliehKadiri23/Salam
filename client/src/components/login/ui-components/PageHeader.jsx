import React from 'react';
import { motion } from 'framer-motion';


const PageHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-8"
    >
      <motion.h1
        className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Welcome Back
      </motion.h1>
      <motion.p
        className="text-gray-600 dark:text-gray-200 text-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Sign in to your account
      </motion.p>
    </motion.header>
  );
};

export default PageHeader;