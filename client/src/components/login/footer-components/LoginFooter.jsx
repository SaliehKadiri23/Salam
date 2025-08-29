import React from 'react';
import { Link } from 'react-router';


const LoginFooter = () => {
  return (
    <footer className="relative z-10 py-8 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-gray-600 text-sm">
          Need help? Contact our support team or visit our{' '}
          <Link to="/faq" className="text-islamic-600 hover:underline">FAQ</Link>
        </p>
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <Link to="/privacy" className="text-gray-500 hover:text-islamic-600 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-gray-500 hover:text-islamic-600 transition-colors">
            Terms of Service
          </Link>
          <Link to="/guidelines" className="text-gray-500 hover:text-islamic-600 transition-colors">
            Community Guidelines
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default LoginFooter;