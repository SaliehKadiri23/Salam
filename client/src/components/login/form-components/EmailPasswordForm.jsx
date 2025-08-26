import React from 'react';
import { Formik, Form } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { clearAllErrors } from '../../../redux/authSlice';
import { selectShowPassword, togglePasswordVisibility, hideEmailForm } from '../../../redux/loginUiSlice';
import {
  getFieldLabel,
  getFieldPlaceholder,
  isFieldRequired,
  getFieldHelperText,
  checkEmailInRememberedUsers
} from '../loginValidationSchema';


const EmailPasswordForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  onFormChange,
  onForgotPassword,
  isLoading,
  errors,
  savedCredentials
}) => {
  const dispatch = useDispatch();
  const showPassword = useSelector(selectShowPassword);

  const handleBackToOptions = () => {
    dispatch(hideEmailForm());
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validate={onFormChange}
    >
      {({ values, errors: formErrors, touched, isSubmitting, isValid, setFieldValue }) => (
        <Form className="space-y-6">
          {/* Back to Options Button */}
          <button
            type="button"
            onClick={handleBackToOptions}
            className="flex items-center gap-2 text-islamic-600 hover:text-islamic-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to sign-in options</span>
          </button>

          {/* Email Field with custom styling */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-sm">
              {getFieldLabel('email')}
              {isFieldRequired('email') && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className={`w-5 h-5 transition-colors ${
                  touched.email ? 'text-islamic-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => {
                  const emailValue = e.target.value;
                  setFieldValue('email', emailValue);
                  // Clear errors when user starts typing
                  dispatch(clearAllErrors());
                  
                  // Check if email exists in remembered users (from Redux/sessions)
                  if (emailValue && savedCredentials.email) {
                    const emailExists = checkEmailInRememberedUsers(emailValue, [savedCredentials]);
                    if (emailExists) {
                      // Could show helper text that this email is remembered
                      console.log('Email found in remembered users');
                    }
                  }
                }}
                onBlur={(e) => {
                  setFieldValue('email', e.target.value);
                }}
                className={`
                  w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-300
                  focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500
                  hover:border-islamic-300 bg-white/70 backdrop-blur-sm
                  ${touched.email && formErrors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : touched.email && !formErrors.email && values.email
                    ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                    : 'border-gray-300'
                  }
                `}
                placeholder={getFieldPlaceholder('email')}
              />
              {/* Success indicator */}
              {touched.email && !formErrors.email && values.email && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
            {/* Error message */}
            {touched.email && formErrors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" /> {formErrors.email}
              </motion.p>
            )}
            {/* Helper text */}
            {!formErrors.email && (
              <p className="text-islamic-600 text-sm">
                💡 {getFieldHelperText('email')}
              </p>
            )}
          </div>

          {/* Password Field with custom styling */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-sm">
              {getFieldLabel('password')}
              {isFieldRequired('password') && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className={`w-5 h-5 transition-colors ${
                  touched.password ? 'text-islamic-500' : 'text-gray-400'
                }`} />
              </div>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={(e) => {
                  setFieldValue('password', e.target.value);
                  // Clear errors when user starts typing
                  dispatch(clearAllErrors());
                }}
                onBlur={(e) => {
                  setFieldValue('password', e.target.value);
                }}
                className={`
                  w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-300
                  focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500
                  hover:border-islamic-300 bg-white/70 backdrop-blur-sm
                  ${touched.password && formErrors.password
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : touched.password && !formErrors.password && values.password
                    ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                    : 'border-gray-300'
                  }
                `}
                placeholder={getFieldPlaceholder('password')}
              />
              <button
                type="button"
                onClick={() => dispatch(togglePasswordVisibility())}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-islamic-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {/* Error message */}
            {touched.password && formErrors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" /> {formErrors.password}
              </motion.p>
            )}
            {/* Helper text */}
            {!formErrors.password && (
              <p className="text-islamic-600 text-sm">
                💡 {getFieldHelperText('password')}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={(e) => setFieldValue('rememberMe', e.target.checked)}
                  className="sr-only"
                />
                <motion.div
                  className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300
                    ${values.rememberMe
                      ? 'bg-islamic-500 border-islamic-500'
                      : 'bg-white border-gray-300 hover:border-islamic-400'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence>
                    {values.rememberMe && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-islamic-600 hover:text-islamic-700 transition-colors hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Form validation status */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {isValid && values.email && values.password ? (
                <div className="flex items-center text-islamic-600">
                  <div className="w-2 h-2 bg-islamic-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Form is ready</span>
                </div>
              ) : (
                <div className="flex items-center text-orange-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Please complete required fields</span>
                </div>
              )}
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !isValid || !values.email || !values.password}
            className={`
              w-full py-4 px-6 rounded-xl font-semibold text-lg
              transition-all duration-300 transform
              ${isSubmitting || !isValid || !values.email || !values.password
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-islamic-500 text-white hover:bg-islamic-600 hover:scale-105 shadow-lg hover:shadow-islamic-glow'
              }
            `}
            whileHover={!isSubmitting && isValid ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting && isValid ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing In...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Sign In
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </motion.button>
        </Form>
      )}
    </Formik>
  );
};

export default EmailPasswordForm;