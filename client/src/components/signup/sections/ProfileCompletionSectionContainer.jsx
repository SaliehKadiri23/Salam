import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateProfileInfo,
  setAgreements,
  updateCanProceed,
  selectCurrentStep,
  selectSelectedRole,
  selectSelectedAuthMethod,
  selectProfileInfo,
  selectAuthCredentials,
  selectCanProceed,
  selectSignupState
} from '../../../redux/signupSlice';
import ProfileCompletionSection from './ProfileCompletionSection';

const ProfileCompletionSectionContainer = () => {
  const dispatch = useDispatch();
  
  // Redux state
  const currentStep = useSelector(selectCurrentStep);
  const selectedRole = useSelector(selectSelectedRole);
  const selectedAuthMethod = useSelector(selectSelectedAuthMethod);
  const profileInfo = useSelector(selectProfileInfo);
  const authCredentials = useSelector(selectAuthCredentials);
  const canProceed = useSelector(selectCanProceed);
  const signupState = useSelector(selectSignupState);

  // Create agreements object from signupState
  const agreements = {
    terms: signupState.agreedToTerms,
    privacy: signupState.agreedToPrivacy
  };

  // Update proceed status when form changes
  useEffect(() => {
    dispatch(updateCanProceed());
  }, [authCredentials, profileInfo, signupState.agreedToTerms, signupState.agreedToPrivacy, dispatch]);

  // Handlers
  const handleProfileInfoChange = (field, value) => {
    dispatch(updateProfileInfo({ [field]: value }));
  };

  const handleAgreementChange = (field, value) => {
    if (field === 'terms') {
      dispatch(setAgreements({ terms: value }));
    } else if (field === 'privacy') {
      dispatch(setAgreements({ privacy: value }));
    }
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

  return (
    <ProfileCompletionSection
      selectedRole={selectedRole}
      profileInfo={profileInfo}
      agreements={agreements}
      onProfileInfoChange={handleProfileInfoChange}
      onAgreementChange={handleAgreementChange}
      onSubmit={handleSubmit}
      canProceed={canProceed}
      currentStep={currentStep}
    />
  );
};

export default ProfileCompletionSectionContainer;