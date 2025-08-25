import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { Formik } from 'formik';
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
import IslamicPattern from '../components/utility/IslamicPattern';
import ForgotPasswordModal from '../components/login/ForgotPasswordModal';

// Login Components
import LoginHeader from '../components/login/header-components/LoginHeader';
import RoleSelectionSection from '../components/login/role-selection/RoleSelectionSection';
import RoleBadge from '../components/login/role-selection/RoleBadge';
import EmailPasswordForm from '../components/login/form-components/EmailPasswordForm';
import SocialLoginSection from '../components/login/form-components/SocialLoginSection';
import LoginFooter from '../components/login/footer-components/LoginFooter';

// Validation
import {
  getLoginValidationSchema,
  getLoginInitialValues
} from '../components/login/loginValidationSchema';

// Icons
import {
  Mail,
  ArrowRight,
  AlertCircle,
  Info,
  ArrowLeft
} from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  
  // Local state
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
      
      // Actual API call to backend with Passport.js
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-50 via-white to-islamic-teal-50 relative overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-5">
        <IslamicPattern variant="eight-pointed-star" className="w-full h-full text-islamic-500" />
      </div>

      {/* Header Section */}
      <LoginHeader selectedRole={selectedRole} />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column - Login Form (60% on desktop) */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Role Selection Section */}
            {!selectedRole && (
              <RoleSelectionSection
                onRoleSelect={handleRoleSelect}
                savedCredentials={savedCredentials}
                userData={userData}
              />
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
                    <EmailPasswordForm
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleFormSubmit}
                      onFormChange={handleFormChange}
                      onBack={() => setShowEmailForm(false)}
                      onForgotPassword={handleForgotPassword}
                      isLoading={loginLoading}
                      errors={errors}
                      savedCredentials={savedCredentials}
                    />
                )}

                <SocialLoginSection
                  onSocialAuth={handleSocialAuth}
                  authLoading={authLoading}
                  loginLoading={loginLoading}
                />

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

      <LoginFooter />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal />
    </div>
  );
};

export default Login;