import React from 'react';

const SignupFooter = () => {
  return (
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
  );
};

export default SignupFooter;