import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SocialAuthConfirmation = ({
  selectedAuthMethod,
  onProceedToProfile
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-6 mb-6">
        <p className="text-islamic-700 mb-4">
          ✓ You'll sign in with {selectedAuthMethod === 'google' ? 'Google' : 'Facebook'}
        </p>
        <motion.button
          onClick={onProceedToProfile}
          className="bg-islamic-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-islamic-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue to Profile
          <ArrowRight className="w-5 h-5 inline ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SocialAuthConfirmation;