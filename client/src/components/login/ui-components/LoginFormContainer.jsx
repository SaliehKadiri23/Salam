import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { selectIsScrollingToForm, setScrollingToForm } from '../../../redux/loginUiSlice';
import { selectAuthErrors } from '../../../redux/authSlice';


const LoginFormContainer = ({ children }) => {
  const dispatch = useDispatch();
  const isScrollingToForm = useSelector(selectIsScrollingToForm);
  const errors = useSelector(selectAuthErrors);
  const signInCardRef = useRef(null);

  // Initialize scrolling state
  useEffect(() => {
    // No auto-scroll needed without role selection
  }, []);

  // No back to role selection functionality needed

  // Show login form without requiring role selection

  return (
    <motion.div
      ref={signInCardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-emerald-600"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Sign In to Your Account
        </h2>
        <p className="text-gray-600 dark:text-gray-200 mb-4">
          Access your Islamic community dashboard
        </p>
      </div>

      {/* Error Display */}
      {errors.login && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 dark:bg-red-200 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3"
        >
          <div className="w-5 h-5 text-red-500 flex-shrink-0">⚠️</div>
          <p className="text-red-700 text-sm">{errors.login}</p>
        </motion.div>
      )}

      {/* Form Content */}
      {children}
    </motion.div>
  );
};

export default LoginFormContainer;