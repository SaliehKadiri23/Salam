import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
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
import {
  selectSelectedRole,
  selectShowEmailForm,
  selectHasSelectedRole,
  selectShouldShowEmailForm,
  selectRoleAndShowForm,
  showNotification,
  resetLoginUi
} from '../redux/loginUiSlice';

// Components
import NotificationBanner from '../components/login/ui-components/NotificationBanner';
import PageHeader from '../components/login/ui-components/PageHeader';
import RoleSelectionSection from '../components/login/role-selection/RoleSelectionSection';
import LoginFormContainer from '../components/login/ui-components/LoginFormContainer';
import SignInOptionsSection from '../components/login/ui-components/SignInOptionsSection';
import EmailPasswordForm from '../components/login/form-components/EmailPasswordForm';
import TrustIndicators from '../components/login/ui-components/TrustIndicators';
import ForgotPasswordModal from '../components/login/ForgotPasswordModal';
import IslamicPattern from '../components/utility/IslamicPattern';

const Login = () => {
  const dispatch = useDispatch();
  
  // Redux state
  const selectedRole = useSelector(selectSelectedRole);
  const showEmailForm = useSelector(selectShowEmailForm);
  const hasSelectedRole = useSelector(selectHasSelectedRole);
  const shouldShowEmailForm = useSelector(selectShouldShowEmailForm);
  const authLoading = useSelector(selectAuthLoading);
  const loginLoading = useSelector(selectLoginLoading);
  const errors = useSelector(selectAuthErrors);
  const savedCredentials = useSelector(selectSavedCredentials);
  const userData = useSelector(selectUserData);
  const loginForm = useSelector(selectLoginForm);


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
      dispatch(selectRoleAndShowForm(userData.role));
    }
    dispatch(clearAllErrors());
    
    // Reset UI state on mount
    return () => {
      dispatch(resetLoginUi());
    };
  }, [dispatch, savedCredentials, userData.role]);

  // Get initial values
  const initialValues = {
    email: savedCredentials.email || '',
    password: '',
    rememberMe: savedCredentials.hasRememberedCredentials || false
  };

  // Handlers
  const handleRoleSelect = (role) => {
    dispatch(selectRoleAndShowForm(role));
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

        dispatch(showNotification({
          type: 'success',
          message: 'Login successful, Alhamdulillah!'
        }));
      }, 2000);
    } catch (error) {
      dispatch(loginFailure({
        error: `Failed to authenticate with ${provider}`,
        field: 'login'
      }));
      dispatch(showNotification({
        type: 'error',
        message: `Failed to authenticate with ${provider}`
      }));
    }
  };

  const handleForgotPassword = () => {
    dispatch(showForgotPasswordModal());
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
          
          dispatch(showNotification({
            type: 'success',
            message: 'Login successful, Alhamdulillah!'
          }));
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
      dispatch(showNotification({
        type: 'error',
        message: 'Unable to connect. Please check your internet connection and try again.'
      }));
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <IslamicPattern />
      </div>

      {/* Notification Banner */}
      <NotificationBanner />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Page Header */}
        <PageHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Role Selection Section */}
            {!hasSelectedRole && (
              <RoleSelectionSection
                onRoleSelect={handleRoleSelect}
                savedCredentials={savedCredentials}
                userData={userData}
              />
            )}

            {/* Login Form Container */}
            {hasSelectedRole && (
              <LoginFormContainer>
                {/* Sign In Options */}
                <SignInOptionsSection onSocialAuth={handleSocialAuth} />

                {/* Email Password Form */}
                {shouldShowEmailForm && (
                  <EmailPasswordForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                    onForgotPassword={handleForgotPassword}
                    isLoading={loginLoading}
                    errors={errors}
                    savedCredentials={savedCredentials}
                  />
                )}

                {/* Sign Up Link */}
                <div className="text-center pt-6 border-t border-gray-200 mt-8">
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
              </LoginFormContainer>
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