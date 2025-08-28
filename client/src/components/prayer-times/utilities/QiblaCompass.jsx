import React from 'react';
import { useSelector } from 'react-redux';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const QiblaCompass = () => {
  const qiblaDirection = useSelector((state) => state.islamicUtilities.qiblaDirection);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 200,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
      }}
      exit={{
        opacity: 0,
        y: 200,
      }}
      viewport={{ once: true }}
      className="bg-white dark:bg-black/90 dark:border dark:border-emerald-600 rounded-2xl shadow-xl p-6 text-center"
    >
      <div className="relative w-24 h-24 mx-auto mb-4">
        <div
          className="w-full h-full border-4 border-emerald-200 dark:border-emerald-400 rounded-full relative transition-transform duration-1000"
          style={{ transform: `rotate(${qiblaDirection}deg)` }}
        >
          <Compass className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-emerald-600" />
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-red-500"></div>
        </div>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 dark:text-gray-100">
        Qibla Direction
      </h3>
      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
        {qiblaDirection}°
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-100">Northeast</p>
    </motion.div>
  );
};

export default QiblaCompass;