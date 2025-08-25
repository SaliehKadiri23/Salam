import React from 'react';
import SocialAuthButton from '../../signup/SocialAuthButton';

/**
 * SocialLoginSection Component
 * 
 * Displays social authentication options (Google, Facebook)
 * with divider and loading states
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSocialAuth - Callback when social auth is initiated
 * @param {boolean} props.authLoading - Whether auth is currently loading
 * @param {boolean} props.loginLoading - Whether login is currently loading
 */
const SocialLoginSection = ({ onSocialAuth, authLoading, loginLoading }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">or continue with</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="space-y-3">
        <SocialAuthButton
          provider="google"
          onClick={onSocialAuth}
          loading={authLoading}
          disabled={loginLoading}
        />
        
        <SocialAuthButton
          provider="facebook"
          onClick={onSocialAuth}
          loading={authLoading}
          disabled={loginLoading}
        />
      </div>
    </div>
  );
};

export default SocialLoginSection;