import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

// Icons
import { 
  X, 
  Mail, 
  ArrowRight, 
  Check, 
  AlertCircle,
  RefreshCw,
  Star,
  ChevronLeft
} from 'lucide-react';

// Components
import IslamicPattern from '../utility/IslamicPattern';

// Redux actions
import {
  hideForgotPasswordModal,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearAllErrors,
  selectForgotPasswordModal,
  selectForgotPasswordLoading,
  selectForgotPasswordStatus,
  selectAuthErrors,
  showForgotPasswordModal
} from '../../redux/authSlice';

const ForgotPasswordModal = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef(null);
  
  // Local form state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redux state
  const isVisible = useSelector(selectForgotPasswordModal);
  const isLoading = useSelector(selectForgotPasswordLoading);
  const status = useSelector(selectForgotPasswordStatus);
  const errors = useSelector(selectAuthErrors);

  // Email validation
  const validateEmail = (emailValue) => {
    try {
      Yup.string().email('Please enter a valid email address').required('Email address is required').validateSync(emailValue);
      return '';
    } catch (error) {
      return error.message;
    }
  };

  // Handle email change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched) {
      const error = validateEmail(value);
      setEmailError(error);
    }
  };

  // Handle email blur
  const handleEmailBlur = () => {
    setTouched(true);
    const error = validateEmail(email);
    setEmailError(error);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      setTouched(true);
      return;
    }

    setIsSubmitting(true);
    dispatch(forgotPasswordStart());
    
    
    // Simulate API call
    setTimeout(() => {
      // Mock success message
      if (email.includes('@')) {
        dispatch(forgotPasswordSuccess({
          message: "We've sent password reset instructions to your email, In sha Allah.",
          email: email
        }));
      } else {
        dispatch(forgotPasswordFailure({
          error: 'Unable to send reset email. Please check your email address and try again.',
          field: 'email'
        }));
      }
      setIsSubmitting(false);
    }, 2000);
  };

  // Reset form when modal opens
  useEffect(() => {
    if (isVisible) {
      setEmail('');
      setEmailError('');
      setTouched(false);
      setIsSubmitting(false);
      dispatch(clearAllErrors());
    }
  }, [isVisible, dispatch]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  // Focus management
  useEffect(() => {
    if (isVisible && status === 'idle') {
      setTimeout(() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }, 100);
    }
  }, [isVisible, status]);

  const handleClose = () => {
    dispatch(hideForgotPasswordModal());
    dispatch(clearAllErrors());
  };

  const handleRetry = () => {
    dispatch(clearAllErrors());
    setEmail('');
    setEmailError('');
    setTouched(false);
    setIsSubmitting(false);
     dispatch(hideForgotPasswordModal());
      dispatch(showForgotPasswordModal());
  };

  const handleBackToLogin = () => {
    handleClose();
  };

  // Modal variants for animations
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: "blur(0px)"
    },
    visible: {
      opacity: 1,
      backdropFilter: "blur(8px)",
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Success state component
  const SuccessState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-4 max-h-[45vh]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-16 h-16 bg-islamic-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check className="w-8 h-8 text-islamic-600" />
      </motion.div>

      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Check Your Email
      </h3>

      <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
        We've sent password reset instructions to your email, In sha Allah.
      </p>

      <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mb-6">
        <p className="text-islamic-700 text-sm">
          <span className="font-semibold">Didn't receive the email?</span>
          <br />
          Check your spam folder or try again with a different email address.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleBackToLogin}
          className="w-full bg-islamic-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-islamic-600 transition-colors flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Login
        </button>

        <button
          onClick={handleRetry}
          className="w-full text-islamic-600 hover:text-islamic-700 transition-colors mb-4 text-sm py-2"
        >
          Try with different email
        </button>
      </div>
    </motion.div>
  );

  // Error state component
  const ErrorState = ({ error }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <AlertCircle className="w-8 h-8 text-red-600" />
      </motion.div>

      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Unable to Send Email
      </h3>

      <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
        {error || "Something went wrong. Please try again."}
      </p>

      <div className="space-y-3">
        <button
          onClick={handleRetry}
          className="w-full bg-islamic-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-islamic-600 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>

        <button
          onClick={handleBackToLogin}
          className="w-full text-islamic-600 hover:text-islamic-700 transition-colors text-sm py-2"
        >
          Back to Login
        </button>
      </div>
    </motion.div>
  );

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        {/* Background overlay with Islamic pattern */}
        <div className="absolute inset-0 bg-black/40">
          <div className="absolute inset-0 opacity-10">
            <IslamicPattern
              variant="eight-pointed-star"
              className="w-full h-full text-white"
            />
          </div>
        </div>

        {/* Modal Content */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-md mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white/90 dark:bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-x-hidden overflow-y-scroll">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <IslamicPattern
                variant="corner-decoration"
                className="w-full h-full text-islamic-500"
              />
            </div>

            {/* Header */}
            <div className="relative p-8 pb-4">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              {/* Islamic Pattern Decoration */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="inline-flex items-center justify-center w-12 h-12 bg-islamic-100 rounded-full mb-4"
                >
                  <Star className="w-6 h-6 text-islamic-600" />
                </motion.div>

                <IslamicPattern
                  variant="divider"
                  className="w-24 h-6 mx-auto text-islamic-300 mb-4"
                />

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Forgot Password
                </h2>

                <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
                  Don't worry, it happens to the best of us. We'll help you
                  reset it, In sha Allah.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">
              {status === "success" && <SuccessState />}
              {status === "error" && (
                <ErrorState error={errors.forgotPassword} />
              )}
              {(status === "idle" || status === "loading") && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="forgot-password-email"
                      className="block text-gray-700 dark:text-gray-100 font-semibold text-sm"
                    >
                      Email Address
                      <span className="text-red-500 ml-1">*</span>
                    </label>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail
                          className={`w-5 h-5 dark:text-gray-100 transition-colors ${
                            touched
                              ? "text-islamic-500"
                              : "text-gray-400 dark:text-gray-100"
                          }`}
                        />
                      </div>

                      <input
                        ref={emailInputRef}
                        id="forgot-password-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        className={`dark:text-gray-100 border-green-300
                          w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-300
                          focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500
                          hover:border-islamic-300 bg-white/70 dark:bg-black/70 backdrop-blur-sm
                          ${
                            touched && emailError
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : touched && !emailError && email
                              ? " dark:border-emerald-600 focus:border-green-500 focus:ring-green-500"
                              : "border-gray-300"
                          }
                        `}
                        placeholder="Enter your email address"
                      />

                      {/* Success indicator */}
                      {touched && !emailError && email && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>

                    {/* Error message */}
                    {touched && emailError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" /> {emailError}
                      </motion.p>
                    )}

                    {/* Helper text */}
                    {!emailError && (
                      <p className="text-islamic-600 text-sm">
                        💡 Enter the email address associated with your account
                      </p>
                    )}
                  </div>

                  {/* General error from Redux */}
                  <AnimatePresence>
                    {errors.forgotPassword && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700 text-sm">
                          {errors.forgotPassword}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || emailError || !email}
                    className={`
                      w-full py-4 px-6 rounded-xl font-semibold text-lg
                      transition-all duration-300 transform
                      ${
                        isSubmitting || emailError || !email
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-islamic-500 text-white hover:bg-islamic-600 hover:scale-105 shadow-lg"
                      }
                    `}
                    whileHover={
                      !isSubmitting && !emailError && email
                        ? { scale: 1.02 }
                        : {}
                    }
                    whileTap={
                      !isSubmitting && !emailError && email
                        ? { scale: 0.98 }
                        : {}
                    }
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending Reset Link...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Send Reset Link
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;