import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

function CustomDropdown({ options, value, onChange, placeholder, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" style={{ zIndex: 99999 }} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full  px-4 py-3 bg-white dark:bg-black/40 bg-opacity-90 backdrop-blur-sm border border-gray-200 dark:border-emerald-600 rounded-xl cursor-pointer transition-all duration-200 hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon className="w-5 h-5 text-gray-400 dark:text-gray-100 group-hover:text-emerald-500 transition-colors" />
          )}
          <span
            className={
              selectedOption
                ? "text-gray-800 dark:text-gray-100"
                : "text-gray-500"
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 dark:text-gray-100 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-white dark:bg-black/90 backdrop-blur-xl bg-opacity-95 border border-gray-200 dark:border-emerald-600 rounded-xl shadow-2xl overflow-hidden" style={{ zIndex: 999999 }}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-all duration-200 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                {option.icon && (
                  <option.icon className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" />
                )}
                <span className="text-gray-700 dark:text-gray-100 group-hover:text-emerald-700 font-medium">
                  {option.label}
                </span>
              </div>
              {value === option.value && (
                <Check className="w-4 h-4 text-emerald-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;