import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
import ForgotPasswordModal from '../components/login/ForgotPasswordModal';

// Icons
import {
  FaGoogle,
  FaFacebook,
  FaUsers,
  FaMosque,
  FaCrown,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaStar,
  FaShieldAlt,
  FaUserFriends,
  FaGlobe,
  FaChevronLeft,
  FaArrowRight
} from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  
  // Local state
  const [selectedRole, setSelectedRole] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  
  // Refs
  const signInCardRef = useRef(null);
  
  // Redux state
  const authLoading = useSelector(selectAuthLoading);
  const loginLoading = useSelector(selectLoginLoading);
  const errors = useSelector(selectAuthErrors);
  const savedCredentials = useSelector(selectSavedCredentials);
  const userData = useSelector(selectUserData);

  // Role options
  const roles = [
    {
      id: 'community_member',
      title: 'Community Member',
      description: 'Access Islamic resources, join discussions, and connect with fellow Muslims.',
      icon: FaUsers,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'imam',
      title: 'Imam',
      description: 'Lead prayers, provide guidance, and manage community events.',
      icon: FaMosque,
      color: 'from-teal-400 to-teal-600'
    },
    {
      id: 'chief_imam',
      title: 'Chief Imam',
      description: 'Administrative oversight and spiritual leadership of the community.',
      icon: FaCrown,
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email address is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    rememberMe: Yup.boolean()
  });

  // Initialize component
  useEffect(() => {
    if (savedCredentials.hasRememberedCredentials && userData.role) {
      setSelectedRole(userData.role);
    }
    dispatch(clearAllErrors());
  }, [dispatch, savedCredentials, userData.role]);

  // Get initial values
  const initialValues = {
    email: savedCredentials.email || '',
    password: '',
    rememberMe: savedCredentials.hasRememberedCredentials || false
  };

  // Handlers
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    dispatch(setUserRole(role));
    
    setTimeout(() => {
      if (signInCardRef.current) {
        signInCardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300);
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setShowEmailForm(false);
  };

  const handleShowEmailForm = () => {
    setShowEmailForm(true);
  };

  const handleForgotPassword = () => {
    dispatch(showForgotPasswordModal());
  };

  const handleSocialAuth = async (provider) => {
    dispatch(loginStart());
    
    try {
      console.log(`Initiating ${provider} authentication...`);
      
      // Simulate API call
      setTimeout(() => {
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

        showNotification('success', 'Login successful, Alhamdulillah!');
      }, 2000);
    } catch (error) {
      dispatch(loginFailure({
        error: `Failed to authenticate with ${provider}`,
        field: 'login'
      }));
      showNotification('error', `Failed to authenticate with ${provider}`);
    }
  };

  // Form submission handler
  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      dispatch(loginStart());
      
      dispatch(setCredentials({
        email: values.email,
        password: values.password
      }));
      
      if (values.rememberMe !== savedCredentials.hasRememberedCredentials) {
        dispatch(toggleRememberMe());
      }
      
      // Simulate API call
      setTimeout(() => {
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
            sessionToken: 'mock_token_123',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            deviceInfo: {
              browser: navigator.userAgent.split(' ')[0],
              os: navigator.platform,
              ip: '192.168.1.1'
            },
            rememberMe: values.rememberMe
          }));
          
          showNotification('success', 'Login successful, Alhamdulillah!');
        } else {
          if (values.email !== 'test@example.com') {
            dispatch(loginFailure({
              error: 'We couldn\'t find an account with this email address.',
              field: 'login'
            }));
            setFieldError('email', 'Account not found');
          } else {
            dispatch(loginFailure({
              error: 'Invalid password. Please check and try again.',
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

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  // Trust indicators component
  const TrustIndicators = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Trusted by the Community
      </h3>
      
      <div className="space-y-6">
        {[
          { icon: FaUsers, label: 'Active Members', value: '50,000+', color: 'text-green-600' },
          { icon: FaMosque, label: 'Partner Mosques', value: '1,200+', color: 'text-teal-600' },
          { icon: FaStar, label: 'Trust Rating', value: '4.9/5', color: 'text-yellow-500' },
          { icon: FaShieldAlt, label: 'Verified Imams', value: '500+', color: 'text-blue-600' }
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-200">
        <div className="flex items-center space-x-3 mb-2">
          <FaGlobe className="text-green-600 w-5 h-5" />
          <span className="font-semibold text-green-800">Secure Access</span>
        </div>
        <p className="text-sm text-green-700">
          Your account is protected with enterprise-grade security
        </p>
      </div>
    </div>
  );

  // Islamic pattern component (simplified)
  const IslamicPattern = () => (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-green-500 rounded-full transform rotate-45"></div>
      <div className="absolute top-20 right-20 w-24 h-24 border-2 border-teal-500 rounded-full transform -rotate-45"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-yellow-500 rounded-full transform rotate-12"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 border-2 border-green-500 rounded-full transform -rotate-12"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 relative overflow-hidden">
      <IslamicPattern />

      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg">
            Sign in to your Islamic community account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Role Selection Section */}
            {!selectedRole && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Select Your Account Type
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className="cursor-pointer p-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-green-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center`}
                        >
                          <role.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">
                          {role.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Login Form Container */}
            {selectedRole && (
              <div
                ref={signInCardRef}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
              >
                {/* Back Button */}
                <button
                  onClick={handleBackToRoleSelection}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors mb-6"
                >
                  <FaChevronLeft className="w-4 h-4" />
                  <span className="text-sm">Change Account Type</span>
                </button>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Sign In to Your Account
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Access your Islamic community dashboard
                  </p>

                  {/* Current Role Indicator */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                          roles.find((r) => r.id === selectedRole)?.color
                        } flex items-center justify-center`}
                      >
                        {React.createElement(
                          roles.find((r) => r.id === selectedRole)?.icon,
                          {
                            className: "w-4 h-4 text-white",
                          }
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-green-700">Signing in as:</p>
                        <p className="font-semibold text-green-800">
                          {roles.find((r) => r.id === selectedRole)?.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                {errors.login && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <div className="w-5 h-5 text-red-500 flex-shrink-0">⚠️</div>
                    <p className="text-red-700 text-sm">{errors.login}</p>
                  </div>
                )}

                {/* Sign In Options */}
                {!showEmailForm ? (
                  <div className="space-y-4 mb-8">
                    {/* Social Login Options */}
                    <button
                      onClick={() => handleSocialAuth("Google")}
                      disabled={authLoading}
                      className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-red-400 hover:bg-red-50 transition-all duration-300"
                    >
                      <FaGoogle className="text-red-500 w-5 h-5" />
                      <span className="font-semibold text-gray-700">
                        Continue with Google
                      </span>
                    </button>

                    <button
                      onClick={() => handleSocialAuth("Facebook")}
                      disabled={authLoading}
                      className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                    >
                      <FaFacebook className="text-blue-500 w-5 h-5" />
                      <span className="font-semibold text-gray-700">
                        Continue with Facebook
                      </span>
                    </button>

                    <div className="flex items-center my-6">
                      <hr className="flex-1 border-gray-300" />
                      <span className="px-4 text-gray-500 font-medium">or</span>
                      <hr className="flex-1 border-gray-300" />
                    </div>

                    {/* Email Sign In Button */}
                    <button
                      onClick={handleShowEmailForm}
                      className="w-full py-4 px-6 rounded-xl font-semibold text-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-center justify-center gap-2">
                        📧 Sign In with Email
                      </div>
                    </button>
                  </div>
                ) : (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {({ values, errors, touched, isSubmitting }) => (
                      <Form className="space-y-6 mb-8">
                        <button
                          type="button"
                          onClick={() => setShowEmailForm(false)}
                          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors mb-4"
                        >
                          <FaChevronLeft className="w-4 h-4" />
                          <span className="text-sm">Back to options</span>
                        </button>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Field
                            name="email"
                            type="email"
                            className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300"
                            placeholder="Enter your email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password *
                          </label>
                          <div className="relative">
                            <Field
                              name="password"
                              type={showPassword ? "text" : "password"}
                              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 pr-12"
                              placeholder="Enter your password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2">
                            <Field
                              name="rememberMe"
                              type="checkbox"
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">
                              Remember me
                            </span>
                          </label>

                          <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm text-green-600 hover:text-green-700 hover:underline"
                          >
                            Forgot password?
                          </button>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            isSubmitting
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
                          }`}
                        >
                          {isSubmitting ? "Signing In..." : "Sign In"}
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}

                {/* Sign Up Link */}
                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-gray-600">
                    New to Salam?{" "}
                    <Link
                      to={"/signup"}
                      className="text-green-600 hover:text-green-700 font-semibold transition-colors hover:underline"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators Sidebar */}
          <div className="lg:col-span-1">
            <TrustIndicators />
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal />
    </div>
  );
};

export default Login;