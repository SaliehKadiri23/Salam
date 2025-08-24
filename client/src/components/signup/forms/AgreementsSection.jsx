import React from 'react';

const AgreementsSection = ({
  agreements,
  onAgreementChange
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">Terms and Privacy</h4>
      
      <label className="flex items-start space-x-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreements.agreedToPrivacy}
          onChange={(e) => onAgreementChange('privacy', e.target.checked)}
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
          checked={agreements.agreedToTerms}
          onChange={(e) => onAgreementChange('terms', e.target.checked)}
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
  );
};

export default AgreementsSection;