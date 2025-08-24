import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  goBackToRoleSelection,
  selectAuthMethod,
  updateAuthCredentials,
  proceedToProfile,
  selectCurrentStep,
  selectSelectedRole,
  selectSelectedAuthMethod,
  selectAuthCredentials
} from '../../../redux/signupSlice';
import AuthenticationSection from './AuthenticationSection';

const AuthenticationSectionContainer = ({ profileSectionRef }) => {
  const dispatch = useDispatch();
  
  // Redux state
  const currentStep = useSelector(selectCurrentStep);
  const selectedRole = useSelector(selectSelectedRole);
  const selectedAuthMethod = useSelector(selectSelectedAuthMethod);
  const authCredentials = useSelector(selectAuthCredentials);

  // Handlers
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

  const handleAuthMethodSelect = (method) => {
    if (method === 'email') {
      handleEmailAuthSelect();
    } else {
      handleSocialAuth(method);
    }
  };

  const handleAuthCredentialChange = (field, value) => {
    dispatch(updateAuthCredentials({ [field]: value }));
  };

  const handleProceedToProfile = () => {
    dispatch(proceedToProfile());
    
    // Smooth scroll to profile section after element is rendered
    setTimeout(() => {
      if (profileSectionRef?.current) {
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

  return (
    <AuthenticationSection
      selectedRole={selectedRole}
      selectedAuthMethod={selectedAuthMethod}
      authCredentials={authCredentials}
      onBackToRoleSelection={handleBackToRoleSelection}
      onAuthMethodSelect={handleAuthMethodSelect}
      onCredentialChange={handleAuthCredentialChange}
      onProceedToProfile={handleProceedToProfile}
      currentStep={currentStep}
    />
  );
};

export default AuthenticationSectionContainer;