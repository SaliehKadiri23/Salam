import React from 'react';
import IslamicPattern from '../../utility/IslamicPattern';

const SignupLayout = ({ children, sidebar }) => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-black bg-gradient-to-br from-islamic-50 via-white to-islamic-teal-50 relative overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 opacity-5">
        <IslamicPattern variant="eight-pointed-star" className="w-full h-full text-islamic-500" />
      </div>

      {/* Main Content */}
      <div className="signup-container w-full relative z-10">
        <div className="grid grid-cols-1 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-1">
            {children}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {sidebar}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLayout;