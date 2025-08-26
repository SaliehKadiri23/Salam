import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { selectShouldShowLoginOptions } from '../../../redux/loginUiSlice';
import { selectAuthLoading } from '../../../redux/authSlice';
import { showEmailForm } from '../../../redux/loginUiSlice';

/**
 * SignInOptionsSection Component
 * 
 * Displays sign-in options including social login and email form button
 * Handles the initial sign-in method selection
 */
const SignInOptionsSection = ({ onSocialAuth }) => {
  const dispatch = useDispatch();
  const shouldShowLoginOptions = useSelector(selectShouldShowLoginOptions);
  const authLoading = useSelector(selectAuthLoading);

  const handleShowEmailForm = () => {
    dispatch(showEmailForm());
  };

  if (!shouldShowLoginOptions) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 mb-8"
    >
      {/* Social Login Options */}
      <motion.button
        onClick={() => onSocialAuth("Google")}
        disabled={authLoading}
        className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-red-400 hover:bg-red-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={!authLoading ? { scale: 1.02 } : {}}
        whileTap={!authLoading ? { scale: 0.98 } : {}}
      >
        <FaGoogle className="text-red-500 w-5 h-5" />
        <span className="font-semibold text-gray-700">
          {authLoading ? "Connecting..." : "Continue with Google"}
        </span>
      </motion.button>

      <motion.button
        onClick={() => onSocialAuth("Facebook")}
        disabled={authLoading}
        className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={!authLoading ? { scale: 1.02 } : {}}
        whileTap={!authLoading ? { scale: 0.98 } : {}}
      >
        <FaFacebook className="text-blue-500 w-5 h-5" />
        <span className="font-semibold text-gray-700">
          {authLoading ? "Connecting..." : "Continue with Facebook"}
        </span>
      </motion.button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-1 border-gray-300" />
        <span className="px-4 text-gray-500 font-medium">or</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Email Sign In Button */}
      <motion.button
        onClick={handleShowEmailForm}
        disabled={authLoading}
        className="w-full py-4 px-6 rounded-xl font-semibold text-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={!authLoading ? { scale: 1.02 } : {}}
        whileTap={!authLoading ? { scale: 0.98 } : {}}
      >
        <div className="flex items-center justify-center gap-2">
          📧 Sign In with Email
        </div>
      </motion.button>
    </motion.div>
  );
};

export default SignInOptionsSection;