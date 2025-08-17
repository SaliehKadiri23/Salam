import React from 'react';
import { CheckCircle } from 'lucide-react';

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div className="flex justify-center items-center space-x-4 mb-8">
    {Array.from({ length: totalSteps }, (_, i) => (
      <div key={i} className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
            i < currentStep
              ? 'bg-emerald-500 text-white'
              : i === currentStep
              ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {i < currentStep ? <CheckCircle className="w-5 h-5" /> : i + 1}
        </div>
        {i < totalSteps - 1 && (
          <div
            className={`w-12 h-1 mx-2 transition-all duration-300 ${
              i < currentStep ? 'bg-emerald-500' : 'bg-gray-200'
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;