import React from 'react';
import SocialAuthButton from '../SocialAuthButton';

const AuthMethodSelector = ({ onAuthMethodSelect }) => {
  const handleSocialAuth = async (provider) => {
    console.log(`Initiating ${provider} authentication...`);
    onAuthMethodSelect(provider);
    // For social auth, simulate getting user data and skip to profile
    // In real implementation, you'd handle OAuth flow here
  };

  const handleEmailAuthSelect = () => {
    onAuthMethodSelect('email');
  };

  return (
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
  );
};

export default AuthMethodSelector;