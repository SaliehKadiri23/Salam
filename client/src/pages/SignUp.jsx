import React, { useRef } from 'react';

// Layout Components
import SignupLayout from '../components/signup/layout/SignupLayout';
import SignupHeader from '../components/signup/ui/SignupHeader';
import ProgressIndicator from '../components/signup/ui/ProgressIndicator';
import SignupFooter from '../components/signup/layout/SignupFooter';

// Container Components
import RoleSelectionSectionContainer from '../components/signup/sections/RoleSelectionSectionContainer';
import AuthenticationSectionContainer from '../components/signup/sections/AuthenticationSectionContainer';
import ProfileCompletionSectionContainer from '../components/signup/sections/ProfileCompletionSectionContainer';

// Other Components
import TrustIndicators from '../components/signup/TrustIndicators';

const SignUp = () => {
  // Refs for smooth scrolling - passed to container components
  const authSectionRef = useRef(null);
  const profileSectionRef = useRef(null);

  return (
    <SignupLayout>
      <SignupHeader />
      <ProgressIndicator />
      
      {/* Main Content */}
      <div className="signup-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <RoleSelectionSectionContainer authSectionRef={authSectionRef} />
            <AuthenticationSectionContainer profileSectionRef={profileSectionRef} />
            <ProfileCompletionSectionContainer />
          </div>

          {/* Right Column - Trust Indicators Sidebar */}
          <div className="lg:col-span-1">
            <TrustIndicators />
          </div>
        </div>
      </div>

      <SignupFooter />
    </SignupLayout>
  );
};

export default SignUp;
