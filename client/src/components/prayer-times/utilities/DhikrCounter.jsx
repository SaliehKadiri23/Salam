import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { incrementDhikrCount, decrementDhikrCount, resetDhikrCount } from '../../../redux/islamicUtilitiesSlice';
import { motion } from "framer-motion";

const DhikrCounter = () => {
  const dispatch = useDispatch();
  const dhikrCount = useSelector((state) => state.islamicUtilities.dhikrCount);

  const handleIncrement = () => {
    dispatch(incrementDhikrCount());
  };

  const handleDecrement = () => {
    dispatch(decrementDhikrCount());
  };

  const handleReset = () => {
    dispatch(resetDhikrCount());
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 250,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
      }}
      exit={{
        opacity: 0,
        y: 250,
      }}
      viewport={{ once: true }}
      className="bg-white dark:bg-black/90 rounded-2xl shadow-xl p-6 text-center"
    >
      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-400 dark:to-amber-600 rounded-full flex items-center justify-center">
        <span className="text-2xl font-bold text-amber-100">{dhikrCount}</span>
      </div>
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Digital Tasbih
      </h3>
      <div className="flex space-x-2 justify-center">
        <button
          onClick={handleDecrement}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <Minus className="h-4 w-4 m-2" />
        </button>
        <button
          onClick={handleIncrement}
          className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="h-4 w-4 m-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default DhikrCounter;