import React from "react";
import { Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormField = ({ 
  name, 
  label, 
  type = "text", 
  placeholder, 
  required = false,
  disabled = false,
  as = "input",
  rows,
  showPassword,
  onTogglePassword,
  className = ""
}) => {
  const baseInputClass = "w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300";
  const disabledClass = disabled ? "disabled:bg-gray-200" : "";
  const textareaClass = as === "textarea" ? "resize-none" : "";
  
  const inputClass = `${baseInputClass} ${disabledClass} ${textareaClass} ${className}`;

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
      
      {type === "password" ? (
        <div className="relative">
          <Field
            name={name}
            type={showPassword ? "text" : "password"}
            className={`${inputClass} pr-12`}
            placeholder={placeholder}
            disabled={disabled}
          />
          {onTogglePassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
      ) : (
        <Field
          name={name}
          type={type}
          as={as}
          rows={rows}
          className={inputClass}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default FormField;