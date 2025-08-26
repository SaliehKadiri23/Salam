import React from "react";
import { FaCheck, FaChevronRight } from "react-icons/fa";

const ProgressIndicator = ({ currentStep }) => {
  const steps = [
    { step: 1, label: "Select Role", completed: currentStep > 1 },
    { step: 2, label: "Authentication", completed: currentStep > 2 },
    { step: 3, label: "Complete Profile", completed: false },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center sm:space-x-8 space-x-2">
        {steps.map(({ step, label, completed }) => (
          <div key={step} className="flex items-center">
            <div
              className={`
              flex items-center justify-center size-6 sm:size-10 rounded-full border-2 font-semibold text-sm
              ${
                currentStep === step
                  ? "bg-green-500 border-green-500 text-white"
                  : completed
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }
            `}
            >
              {completed ? <FaCheck className="w-4 h-4" /> : step}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep === step ? "text-green-600" : "text-gray-500"
              }`}
            >
              {label}
            </span>
            {step < 3 && (
              <FaChevronRight className="sm:ml-8 ml-2 text-gray-300 w-4 h-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;