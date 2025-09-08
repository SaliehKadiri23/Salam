import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ label, value, onChange, options, placeholder, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 bg-white dark:bg-black/40 border border-slate-200 dark:border-emerald-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 flex items-center justify-between hover:border-slate-300 hover:shadow-md dark:text-gray-100"
        >
          <span
            className={
              value === "All" || value === "all" || value === ""
                ? "text-slate-500 dark:text-gray-100"
                : "text-slate-900 dark:text-gray-100"
            }
          >
            {value === "All" || value === "all" || value === "" ? placeholder || "Select..." : value}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 dark:text-gray-100 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-20 w-full mt-2 bg-white dark:bg-black/90 border border-slate-200 dark:border-emerald-600 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-500 transition-colors duration-150 ${
                  index === 0 ? "rounded-t-xl" : ""
                } ${index === options.length - 1 ? "rounded-b-xl" : ""} ${
                  value === option
                    ? "bg-teal-50 dark:bg-teal-700 text-teal-700 dark:text-gray-100 font-medium border-r-2 border-teal-500"
                    : "text-slate-700 dark:text-gray-100"
                }`}
              >
                {option === "all" || option === "All" ? (placeholder || "All") : option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;