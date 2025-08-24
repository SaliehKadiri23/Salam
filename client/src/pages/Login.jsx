import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { Formik, Form } from 'formik';
import {
  setCredentials,
  toggleRememberMe,
  loginStart,
  loginSuccess,
  loginFailure,
  selectLoginForm,
  selectAuthLoading,
  selectLoginLoading,
  selectAuthErrors,
  selectSavedCredentials,
  selectUserData,
  clearAllErrors,
  setUserRole,
  showForgotPasswordModal
} from '../redux/authSlice';

// Components
import TrustIndicators from '../components/signup/TrustIndicators';
import SocialAuthButton from '../components/signup/SocialAuthButton';
import IslamicPattern from '../components/utility/IslamicPattern';
import RoleCard, { roleConfig } from '../components/signup/RoleCard';
import FormField from '../components/utility/FormField';
import ForgotPasswordModal from '../components/login/ForgotPasswordModal';

// Validation
import {
  getLoginValidationSchema,
  getLoginInitialValues,
  getFieldLabel,
  getFieldType,
  getFieldPlaceholder,
  isFieldRequired,
  getFieldHelperText,
  checkEmailInRememberedUsers,
  handleRememberMeToggle
} from '../components/login/loginValidationSchema';

// Icons
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowRight, 
  Shield, 
  Star,
  Check,
  AlertCircle,
  Info,
  ArrowLeft
} from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  
  // Local state
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  // Refs
  const signInCardRef = useRef(null);
  
  // Redux state
  const authLoading = useSelector(selectAuthLoading);
  const loginLoading = useSelector(selectLoginLoading);
  const errors = useSelector(selectAuthErrors);
  const savedCredentials = useSelector(selectSavedCredentials);
  const userData = useSelector(selectUserData);

  // Formik configuration
  const validationSchema = getLoginValidationSchema();
  
  // Initialize component
  useEffect(() => {
    // Auto-select role if user has saved credentials from Redux (session-based)
    if (savedCredentials.hasRememberedCredentials && userData.role) {
      setSelectedRole(userData.role);
    }
    
    dispatch(clearAllErrors());
  }, [dispatch, savedCredentials, userData.role]);

  // Get initial values with saved credentials from Redux (session-based)
  const initialValues = getLoginInitialValues(savedCredentials);

  // Handlers
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    dispatch(setUserRole(role));
    
    // Scroll to top of sign-in card after role selection
    setTimeout(() => {
      if (signInCardRef.current) {
        signInCardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300); // Small delay to allow animation to start
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setShowEmailForm(false); // Reset email form visibility
  };

  const handleShowEmailForm = () => {
    setShowEmailForm(true);
  };

  const handleForgotPassword = () => {
    dispatch(showForgotPasswordModal());
  };

  const handleSocialAuth = async (provider) => {
    console.log(`Initiating ${provider} authentication...`);
    dispatch(loginStart());
    
    // Simulate API call
    setTimeout(() => {
      // Simulate success/failure
      const mockUser = {
        id: 'user_123',
        email: 'user@example.com',
        name: 'Ahmed Rahman',
        role: selectedRole,
        profilePicture: null,
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isEmailVerified: true
      };
      
      dispatch(loginSuccess({
        user: mockUser,
        sessionToken: 'mock_token_123',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        deviceInfo: {
          browser: 'Chrome',
          os: 'Windows',
          ip: '192.168.1.1'
        }
      }));
    }, 2000);
  };

  // Formik form submission handler
  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      dispatch(loginStart());
      
      // Sync with Redux for compatibility
      dispatch(setCredentials({
        email: values.email,
        password: values.password
      }));
      
      // Handle Remember Me toggle
      if (values.rememberMe !== savedCredentials.hasRememberedCredentials) {
        dispatch(toggleRememberMe());
      }
      
      // TODO: Replace with actual API call to your backend with Passport.js
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   credentials: 'include', // Important for sessions
      //   body: JSON.stringify({
      //     email: values.email,
      //     password: values.password,
      //     rememberMe: values.rememberMe,
      //     role: selectedRole
      //   })
      // });
      
      // Simulate API call - replace with actual API call
      setTimeout(() => {
        // Mock validation - replace with actual response handling
        if (values.email === 'test@example.com' && values.password === 'password123') {
          const mockUser = {
            id: 'user_123',
            email: values.email,
            name: 'Ahmed Rahman',
            role: selectedRole,
            profilePicture: null,
            joinDate: '2023-01-15T10:00:00.000Z',
            lastLogin: new Date().toISOString(),
            isEmailVerified: true
          };
          
          dispatch(loginSuccess({
            user: mockUser,
            sessionToken: 'mock_token_123', // This will come from your session
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            deviceInfo: {
              browser: navigator.userAgent.split(' ')[0],
              os: navigator.platform,
              ip: '192.168.1.1' // This will come from server
            },
            rememberMe: values.rememberMe
          }));
          
          // Success message
          console.log('Login successful, Alhamdulillah!');
        } else {
          // Handle different error types
          if (values.email !== 'test@example.com') {
            dispatch(loginFailure({
              error: 'We couldn\'t find an account with this email address.',
              field: 'login'
            }));
            setFieldError('email', 'Account not found');
          } else {
            dispatch(loginFailure({
              error: 'Invalid password. Please check and try again, may Allah guide you.',
              field: 'login'
            }));
            setFieldError('password', 'Incorrect password');
          }
        }
        setSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error('Login error:', error);
      dispatch(loginFailure({
        error: 'Unable to connect. Please check your internet connection and try again.',
        field: 'login'
      }));
      setSubmitting(false);
    }
  };

  // Real-time form change handler
  const handleFormChange = (values) => {
    // Sync with Redux for real-time updates (optional)
    dispatch(setCredentials({
      email: values.email,
      password: values.password
    }));
  };

  // Role badge component
  const RoleBadge = ({ role }) => {
    const roleBadgeConfig = {
      'community': { 
        label: 'Community Member', 
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: <Shield className="w-3 h-3" />
      },
      'imam': { 
        label: 'Imam', 
        color: 'bg-islamic-100 text-islamic-700 border-islamic-200',
        icon: <Star className="w-3 h-3" />
      },
      'chief-imam': { 
        label: 'Chief Imam', 
        color: 'bg-gradient-to-r from-islamic-100 to-islamic-teal-100 text-islamic-800 border-islamic-300',
        icon: <Star className="w-3 h-3 fill-current" />
      }
    };

    const config = roleBadgeConfig[role] || roleBadgeConfig.community;

    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        {config.icon}
        {config.label}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-50 via-white to-islamic-teal-50 relative overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-5">
        <IslamicPattern variant="eight-pointed-star" className="w-full h-full text-islamic-500" />
      </div>

      {/* Header Section */}
      <motion.header 
        className="relative z-10 text-center py-8 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4"
          >
            <IslamicPattern 
              variant="divider" 
              className="w-32 h-8 mx-auto text-islamic-400 mb-4" 
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              <span className="text-islamic-600">Ahlan wa Sahlan!</span>
              <br />
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Continue your spiritual journey with our Islamic community
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div 
            className="flex justify-center items-center space-x-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full transition-colors ${
                selectedRole ? 'bg-islamic-500' : 'bg-gray-300'
              }`} />
              <span className="text-sm text-gray-600">Account Type</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full transition-colors ${
                selectedRole ? 'bg-islamic-500' : 'bg-gray-300'
              }`} />
              <span className="text-sm text-gray-600">Sign In</span>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column - Login Form (60% on desktop) */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Role Selection Section */}
            {!selectedRole && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <IslamicPattern variant="corner-decoration" className="w-full h-full text-islamic-500" />
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <IslamicPattern 
                    variant="divider" 
                    className="w-24 h-6 mx-auto text-islamic-300 mb-6" 
                  />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Select Your Account Type
                  </h2>
                  <p className="text-gray-600">
                    Choose the role that matches your account to sign in
                  </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(roleConfig).map(([roleKey, config]) => (
                    <RoleCard
                      key={roleKey}
                      role={roleKey}
                      title={config.title}
                      description={config.description}
                      permissions={config.permissions}
                      icon={config.icon}
                      selected={false}
                      onClick={handleRoleSelect}
                      className="transform hover:scale-105 transition-all duration-300"
                    />
                  ))}
                </div>

                {/* Auto-fill notice for returning users */}
                <AnimatePresence>
                  {savedCredentials.hasRememberedCredentials && userData.role && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mt-6 text-center"
                    >
                      <p className="text-islamic-700 text-sm mb-2">
                        Welcome back! We found your previous account:
                      </p>
                      <button
                        onClick={() => setSelectedRole(userData.role)}
                        className="inline-flex items-center gap-2 bg-islamic-500 text-white px-4 py-2 rounded-lg hover:bg-islamic-600 transition-colors"
                      >
                        Continue as <RoleBadge role={userData.role} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            )}
            
            {/* Login Form Container */}
            <AnimatePresence>
              {selectedRole && (
                <motion.div
                  ref={signInCardRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <IslamicPattern variant="corner-decoration" className="w-full h-full text-islamic-500" />
                  </div>

                  {/* Back Button */}
                  <button
                    onClick={handleBackToRoleSelection}
                    className="flex items-center gap-2 text-islamic-600 hover:text-islamic-700 transition-colors mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Change Account Type</span>
                  </button>

                  {/* Islamic Header Pattern */}
                  <div className="text-center mb-8">
                    <IslamicPattern 
                      variant="divider" 
                      className="w-24 h-6 mx-auto text-islamic-300 mb-6" 
                    />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      Sign In to Your Account
                    </h2>
                    <p className="text-gray-600">
                      Access your Islamic community dashboard
                    </p>
                  </div>

                  {/* Current Role Indicator */}
                  <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Info className="w-4 h-4 text-islamic-600" />
                      <div className="flex-1">
                        <p className="text-sm text-islamic-700 mb-1">
                          Signing in as:
                        </p>
                        <RoleBadge role={selectedRole} />
                      </div>
                    </div>
                  </div>

                  {/* Error Display */}
                  <AnimatePresence>
                    {errors.login && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700 text-sm">{errors.login}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sign In Options */}
                  {!showEmailForm ? (
                    <div className="space-y-4">
                      {/* Sign In with Email Button */}
                      <motion.button
                        type="button"
                        onClick={handleShowEmailForm}
                        className="w-full py-4 px-6 rounded-xl font-semibold text-lg bg-islamic-500 text-white hover:bg-islamic-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-islamic-glow"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-5 h-5" />
                          Sign In with Email
                        </div>
                      </motion.button>
                    </div>
                  ) : (
                    // Email/Password Form - Show only when user clicks "Sign In with Email"
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleFormSubmit}
                      enableReinitialize={true}
                      validate={handleFormChange}
                    >
                      {({ values, errors, touched, isSubmitting, isValid, setFieldValue }) => (
                        <Form className="space-y-6">
                          {/* Back to Options Button */}
                          <button
                            type="button"
                            onClick={() => setShowEmailForm(false)}
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
                                ${touched.email && errors.email
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                  : touched.email && !errors.email && values.email
                                  ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                                  : 'border-gray-300'
                                }
                              `}
                              placeholder={getFieldPlaceholder('email')}
                            />
                            {/* Success indicator */}
                            {touched.email && !errors.email && values.email && (
                              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                <Check className="w-5 h-5 text-green-500" />
                              </div>
                            )}
                          </div>
                          {/* Error message */}
                          {touched.email && errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" /> {errors.email}
                            </motion.p>
                          )}
                          {/* Helper text */}
                          {!errors.email && (
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
                                ${touched.password && errors.password
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                  : touched.password && !errors.password && values.password
                                  ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                                  : 'border-gray-300'
                                }
                              `}
                              placeholder={getFieldPlaceholder('password')}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-islamic-500 transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          {/* Error message */}
                          {touched.password && errors.password && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" /> {errors.password}
                            </motion.p>
                          )}
                          {/* Helper text */}
                          {!errors.password && (
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
                            onClick={handleForgotPassword}
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
                )}

                {/* Social Login Section */}
                <div className="mt-8">
                  <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">or continue with</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  <div className="space-y-3">
                    <SocialAuthButton
                      provider="google"
                      onClick={handleSocialAuth}
                      loading={authLoading}
                      disabled={loginLoading}
                    />
                    
                    <SocialAuthButton
                      provider="facebook"
                      onClick={handleSocialAuth}
                      loading={authLoading}
                      disabled={loginLoading}
                    />
                  </div>
                </div>

                {/* Sign Up Link */}
                <motion.div
                  className="text-center mt-8 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-gray-600">
                    New to Qur'an-ly?{' '}
                    <Link
                      to="/signup"
                      className="text-islamic-600 hover:text-islamic-700 font-semibold transition-colors hover:underline"
                    >
                      Create an account
                    </Link>
                  </p>
                </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Trust Indicators Sidebar (40% on desktop) */}
          <div className="lg:col-span-2">
            <TrustIndicators />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-gray-600 text-sm">
            Need help? Contact our support team or visit our{' '}
            <Link to="/faq" className="text-islamic-600 hover:underline">FAQ</Link>
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-islamic-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-islamic-600 transition-colors">
              Terms of Service
            </Link>
            <Link to="/guidelines" className="text-gray-500 hover:text-islamic-600 transition-colors">
              Community Guidelines
            </Link>
          </div>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal />
    </div>
  );
};

export default Login;