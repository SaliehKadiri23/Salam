import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectRole,
  goBackToRoleSelection,
  selectAuthMethod,
  proceedToProfile,
  updateAuthCredentials,
  updateProfileInfo,
  setAgreements,
  updateCanProceed,
  selectCurrentStep,
  selectSelectedRole,
  selectSelectedAuthMethod,
  selectShowRoleSelection,
  selectAuthCredentials,
  selectProfileInfo,
  selectCanProceed,
  selectSignupState
} from '../redux/signupSlice';

// Components
import RoleCard, { roleConfig } from '../components/signup/RoleCard';
import SocialAuthButton from '../components/signup/SocialAuthButton';
import TrustIndicators from '../components/signup/TrustIndicators';
import IslamicPattern from '../components/utility/IslamicPattern';
import FormField from '../components/utility/FormField';

// Icons
import { ArrowRight, Check, ArrowLeft, Info, Shield, Star, Mail, Lock, User, MapPin, Phone } from 'lucide-react';

const SignUp = () => {
  const dispatch = useDispatch();
  
  // Refs for smooth scrolling
  const authSectionRef = useRef(null);
  const profileSectionRef = useRef(null);
  
  // Redux state - cleaner naming
  const currentStep = useSelector(selectCurrentStep);
  const selectedRole = useSelector(selectSelectedRole);
  const selectedAuthMethod = useSelector(selectSelectedAuthMethod);
  const showRoleSelection = useSelector(selectShowRoleSelection);
  const authCredentials = useSelector(selectAuthCredentials);
  const profileInfo = useSelector(selectProfileInfo);
  const canProceed = useSelector(selectCanProceed);
  const signupState = useSelector(selectSignupState);

  // Update proceed status when form changes
  useEffect(() => {
    dispatch(updateCanProceed());
  }, [authCredentials, profileInfo, signupState.agreedToTerms, signupState.agreedToPrivacy, dispatch]);

  // Handlers - cleaner naming
  const handleRoleSelect = (role) => {
    dispatch(selectRole(role));
    
    // Smooth scroll to authentication section after element is rendered
    setTimeout(() => {
      if (authSectionRef.current) {
        authSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        
        // Additional scroll up by 120px for better positioning
        setTimeout(() => {
          window.scrollBy({
            top: -120,
            behavior: 'smooth'
          });
        }, 100);
      }
    }, 600); // Wait longer for animation to complete
  };

  const handleBackToRoleSelection = () => {
    dispatch(goBackToRoleSelection());
  };

  const handleSocialAuth = async (provider) => {
    console.log(`Initiating ${provider} authentication...`);
    dispatch(selectAuthMethod(provider));
    // For social auth, simulate getting user data and skip to profile
    // In real implementation, you'd handle OAuth flow here
  };

  const handleEmailAuthSelect = () => {
    dispatch(selectAuthMethod('email'));
  };

  const handleAuthCredentialChange = (field, value) => {
    dispatch(updateAuthCredentials({ [field]: value }));
  };

  const handleProfileInfoChange = (field, value) => {
    dispatch(updateProfileInfo({ [field]: value }));
  };

  const handleProceedToProfile = () => {
    dispatch(proceedToProfile());
    
    // Smooth scroll to profile section after element is rendered
    setTimeout(() => {
      if (profileSectionRef.current) {
        profileSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        
        // Additional scroll up by 120px for better positioning
        setTimeout(() => {
          window.scrollBy({
            top: -120,
            behavior: 'smooth'
          });
        }, 100);
      }
    }, 600); // Wait longer for animation to complete
  };

  const handleTermsChange = (field, value) => {
    dispatch(setAgreements({ [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Complete!', {
      role: selectedRole,
      authMethod: selectedAuthMethod,
      credentials: selectedAuthMethod === 'email' ? authCredentials : 'Social Auth',
      profile: profileInfo,
      agreements: {
        terms: signupState.agreedToTerms,
        privacy: signupState.agreedToPrivacy
      }
    });
    // Here you would handle actual form submission
    // Redirect to dashboard or email verification
  };

  // Role badge component similar to Login.jsx
  const RoleBadge = ({ role }) => {
    const roleBadgeConfig = {
      'user': {
        label: 'Community Member',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: <Shield className="w-3 h-3" />
      },
      'imam': {
        label: 'Imam',
        color: 'bg-islamic-100 text-islamic-700 border-islamic-200',
        icon: <Star className="w-3 h-3" />
      },
      'chiefImam': {
        label: 'Chief Imam',
        color: 'bg-gradient-to-r from-islamic-100 to-islamic-teal-100 text-islamic-800 border-islamic-300',
        icon: <Star className="w-3 h-3 fill-current" />
      }
    };

    const config = roleBadgeConfig[role] || roleBadgeConfig.user;

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
        className="relative z-10 text-center py-12 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Islamic Greeting */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="text-islamic-600">Assalamu Alaykum!</span>
              <br />
              Welcome to Our Community
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join a global Islamic community built on authentic values, knowledge sharing, and spiritual growth.
            </p>
          </motion.div>

          {/* Progress Indicator - 3 Clear Steps */}
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
              <span className="text-sm text-gray-600">Select Role</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full transition-colors ${
                selectedAuthMethod ? 'bg-islamic-500' : 'bg-gray-300'
              }`} />
              <span className="text-sm text-gray-600">Authentication</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full transition-colors ${
                currentStep === 'completeProfile' ? 'bg-islamic-500' : 'bg-gray-300'
              }`} />
              <span className="text-sm text-gray-600">Complete Profile</span>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="signup-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* STEP 1: Role Selection */}
            <AnimatePresence>
              {showRoleSelection && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <IslamicPattern variant="corner-decoration" className="w-full h-full text-islamic-500" />
                  </div>

                  <div className="text-center mb-8">
                    <IslamicPattern variant="divider" className="w-24 h-6 mx-auto text-islamic-300 mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                      Choose Your Role
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                      Select the role that best describes how you'd like to participate in our Islamic community.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(roleConfig).map(([roleKey, config]) => (
                      <RoleCard
                        key={roleKey}
                        role={roleKey}
                        title={config.title}
                        description={config.description}
                        permissions={config.permissions}
                        icon={config.icon}
                        selected={selectedRole === roleKey}
                        onClick={handleRoleSelect}
                      />
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* STEP 2: Authentication Method Selection */}
            <AnimatePresence>
              {currentStep === 'selectAuth' && (
                <motion.section
                  ref={authSectionRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <IslamicPattern variant="corner-decoration" className="w-full h-full text-islamic-500" />
                  </div>

                  <button
                    onClick={handleBackToRoleSelection}
                    className="flex items-center gap-2 text-islamic-600 hover:text-islamic-700 transition-colors mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Change Account Type</span>
                  </button>

                  <div className="text-center mb-8">
                    <IslamicPattern variant="divider" className="w-24 h-6 mx-auto text-islamic-300 mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      How would you like to sign up?
                    </h2>
                    <p className="text-gray-600">
                      Choose your preferred registration method
                    </p>
                  </div>

                  <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Info className="w-4 h-4 text-islamic-600" />
                      <div className="flex-1">
                        <p className="text-sm text-islamic-700 mb-1">
                          Creating account as:
                        </p>
                        <RoleBadge role={selectedRole} />
                      </div>
                    </div>
                  </div>

                  {!selectedAuthMethod ? (
                    <div className="max-w-md mx-auto space-y-3">
                      <SocialAuthButton
                        provider="google"
                        onClick={handleSocialAuth}
                        loading={false}
                        disabled={false}
                      />
                      
                      <SocialAuthButton
                        provider="facebook"
                        onClick={handleSocialAuth}
                        loading={false}
                        disabled={false}
                      />

                      <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                      </div>

                      <SocialAuthButton
                        provider="email"
                        onClick={handleEmailAuthSelect}
                        loading={false}
                        disabled={false}
                      />
                    </div>
                  ) : selectedAuthMethod === 'email' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-md mx-auto space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="block text-gray-700 font-semibold text-sm">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            value={authCredentials.email}
                            onChange={(e) => handleAuthCredentialChange('email', e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-gray-700 font-semibold text-sm">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            value={authCredentials.password}
                            onChange={(e) => handleAuthCredentialChange('password', e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
                            placeholder="Create a strong password"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-gray-700 font-semibold text-sm">
                          Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            value={authCredentials.confirmPassword}
                            onChange={(e) => handleAuthCredentialChange('confirmPassword', e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
                            placeholder="Confirm your password"
                          />
                        </div>
                      </div>

                      <motion.button
                        onClick={handleProceedToProfile}
                        disabled={!authCredentials.email || !authCredentials.password || !authCredentials.confirmPassword || authCredentials.password !== authCredentials.confirmPassword}
                        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                          authCredentials.email && authCredentials.password && authCredentials.confirmPassword && authCredentials.password === authCredentials.confirmPassword
                            ? 'bg-islamic-500 text-white hover:bg-islamic-600 hover:scale-105 shadow-lg hover:shadow-islamic-glow'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        whileHover={authCredentials.email && authCredentials.password && authCredentials.confirmPassword && authCredentials.password === authCredentials.confirmPassword ? { scale: 1.02 } : {}}
                        whileTap={authCredentials.email && authCredentials.password && authCredentials.confirmPassword && authCredentials.password === authCredentials.confirmPassword ? { scale: 0.98 } : {}}
                      >
                        Continue to Profile
                        <ArrowRight className="w-5 h-5 inline ml-2" />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-6 mb-6">
                        <p className="text-islamic-700 mb-4">
                          ✓ You'll sign in with {selectedAuthMethod === 'google' ? 'Google' : 'Facebook'}
                        </p>
                        <motion.button
                          onClick={handleProceedToProfile}
                          className="bg-islamic-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-islamic-600 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Continue to Profile
                          <ArrowRight className="w-5 h-5 inline ml-2" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </motion.section>
              )}
            </AnimatePresence>

            {/* STEP 3: Complete Profile */}
            <AnimatePresence>
              {currentStep === 'completeProfile' && (
                <motion.section
                  ref={profileSectionRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <IslamicPattern variant="corner-decoration" className="w-full h-full text-islamic-500" />
                  </div>

                  <div className="text-center mb-8">
                    <IslamicPattern variant="divider" className="w-24 h-6 mx-auto text-islamic-300 mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      Complete Your Profile
                    </h2>
                    <p className="text-gray-600">
                      Tell us more about yourself to complete your registration
                    </p>
                  </div>

                  <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Info className="w-4 h-4 text-islamic-600" />
                      <div className="flex-1">
                        <p className="text-sm text-islamic-700 mb-1">
                          Creating account as:
                        </p>
                        <RoleBadge role={selectedRole} />
                      </div>
                    </div>
                  </div>

                  <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-semibold text-sm">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={profileInfo.fullName}
                          onChange={(e) => handleProfileInfoChange('fullName', e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-700 font-semibold text-sm">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <MapPin className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={profileInfo.location}
                          onChange={(e) => handleProfileInfoChange('location', e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-700 font-semibold text-sm">
                        Phone Number (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          value={profileInfo.phone}
                          onChange={(e) => handleProfileInfoChange('phone', e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-800">Terms and Privacy</h4>
                      
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={signupState.agreedToPrivacy}
                          onChange={(e) => handleTermsChange('privacy', e.target.checked)}
                          className="mt-1 w-4 h-4 text-islamic-500 border-gray-300 rounded focus:ring-islamic-500"
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">
                          I agree to the{' '}
                          <a href="#" className="text-islamic-600 hover:underline">
                            Privacy Policy
                          </a>{' '}
                          and understand how my data will be used according to Islamic principles.
                        </span>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={signupState.agreedToTerms}
                          onChange={(e) => handleTermsChange('terms', e.target.checked)}
                          className="mt-1 w-4 h-4 text-islamic-500 border-gray-300 rounded focus:ring-islamic-500"
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">
                          I agree to the{' '}
                          <a href="#" className="text-islamic-600 hover:underline">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-islamic-600 hover:underline">
                            Community Guidelines
                          </a>{' '}
                          based on Islamic values.
                        </span>
                      </label>
                    </div>

                    <motion.button
                      onClick={handleSubmit}
                      disabled={!profileInfo.fullName || !profileInfo.location || !signupState.agreedToTerms || !signupState.agreedToPrivacy}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                        profileInfo.fullName && profileInfo.location && signupState.agreedToTerms && signupState.agreedToPrivacy
                          ? 'bg-islamic-500 text-white hover:bg-islamic-600 hover:scale-105 shadow-lg hover:shadow-islamic-glow'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      whileHover={profileInfo.fullName && profileInfo.location && signupState.agreedToTerms && signupState.agreedToPrivacy ? { scale: 1.02 } : {}}
                      whileTap={profileInfo.fullName && profileInfo.location && signupState.agreedToTerms && signupState.agreedToPrivacy ? { scale: 0.98 } : {}}
                    >
                      <Check className="w-5 h-5 inline mr-2" />
                      Complete Registration
                    </motion.button>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Trust Indicators Sidebar */}
          <div className="lg:col-span-1">
            <TrustIndicators />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-16 py-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-600 text-sm">
            Need help? Contact our support team or visit our{' '}
            <a href="#" className="text-islamic-600 hover:underline">FAQ</a>
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-islamic-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-islamic-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-islamic-600 transition-colors">
              Community Guidelines
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
