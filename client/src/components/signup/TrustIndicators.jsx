import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Users, Heart, BookOpen, Star } from 'lucide-react';

const TrustIndicators = () => {
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-8 sticky top-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Community Stats */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        variants={itemVariants}
      >
        <h4 className="font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
          <Heart className="w-5 h-5 text-islamic-500 mr-2" />
          Trusted by Our Ummah
        </h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <motion.p 
              className="text-3xl font-bold text-islamic-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              12K+
            </motion.p>
            <p className="text-sm text-gray-600">Members</p>
          </div>
          <div className="space-y-1">
            <motion.p 
              className="text-3xl font-bold text-islamic-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              500+
            </motion.p>
            <p className="text-sm text-gray-600">Imams</p>
          </div>
          <div className="space-y-1">
            <motion.p 
              className="text-3xl font-bold text-islamic-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              75+
            </motion.p>
            <p className="text-sm text-gray-600">Communities</p>
          </div>
          <div className="space-y-1">
            <motion.p 
              className="text-3xl font-bold text-islamic-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              50+
            </motion.p>
            <p className="text-sm text-gray-600">Countries</p>
          </div>
        </div>
      </motion.div>
 
 
      {/* Islamic Quote */}
      <motion.div 
        className="bg-gradient-to-br from-islamic-50 to-islamic-teal-50 rounded-2xl p-6 border-l-4 border-islamic-500 shadow-lg"
        variants={itemVariants}
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-islamic-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-gray-700 italic leading-relaxed mb-3">
              "And whoever saves a life, it is as if he has saved all of mankind."
            </p>
            <p className="text-sm text-islamic-600 font-medium">- Quran 5:32</p>
          </div>
        </div>
      </motion.div>

   

      {/* Help & Support */}
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        variants={itemVariants}
      >
        <h4 className="font-bold text-gray-800 mb-4">Need Help?</h4>
        <div className="space-y-3 text-sm">
          <motion.a 
            href="#" 
            className="block text-islamic-600 hover:text-islamic-700 transition-colors"
            whileHover={{ x: 3 }}
          >
            → Frequently Asked Questions
          </motion.a>
          <motion.a 
            href="#" 
            className="block text-islamic-600 hover:text-islamic-700 transition-colors"
            whileHover={{ x: 3 }}
          >
            → Contact Support
          </motion.a>
          <motion.a 
            href="#" 
            className="block text-islamic-600 hover:text-islamic-700 transition-colors"
            whileHover={{ x: 3 }}
          >
            → Community Guidelines
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrustIndicators;