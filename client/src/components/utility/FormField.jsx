import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  helper,
  children,
  useFormik = true,
  ...props
}) => {
  // Generate unique ID
  const fieldId = `field-${name}`;

  // If children are provided , render as wrapper
  if (children) {
    return (
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-100 font-semibold mb-2">
          {label}
        </label>
        {children}
        {useFormik && (
          <ErrorMessage name={name}>
            {(msg) => (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="mr-1">⚠</span>
                {msg}
              </p>
            )}
          </ErrorMessage>
        )}
        {helper && (
          <p className="text-gray-500 dark:text-gray-100 text-sm mt-1">
            {helper}
          </p>
        )}
      </div>
    );
  }

  // If not using Formik, render simple form field
  if (!useFormik) {
    return (
      <div className="mb-6">
        <label
          htmlFor={fieldId}
          className="block text-gray-700 font-semibold mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {type === 'textarea' ? (
          <textarea
            id={fieldId}
            name={name}
            placeholder={placeholder}
            className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 resize-none min-h-[120px] border-gray-300"
            {...props}
          />
        ) : (
          <input
            id={fieldId}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 border-gray-300"
            {...props}
          />
        )}
        
        {helper && <p className="text-gray-500 text-sm mt-1">{helper}</p>}
      </div>
    );
  }

  // Render Formik Field
  return (
    <div className="mb-6">
      <label
        htmlFor={fieldId}
        className="block text-gray-700 font-semibold mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <Field name={name}>
        {({ field, form, meta }) => {
          const hasError = meta.touched && meta.error;
          
          return (
            <>
              {type === 'textarea' ? (
                <textarea
                  {...field}
                  id={fieldId}
                  placeholder={placeholder}
                  className={`
                    w-full px-4 py-3 border-2 rounded-xl transition-all duration-300
                    focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500
                    hover:border-islamic-300 resize-none min-h-[120px]
                    ${hasError
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300'
                    }
                  `}
                  {...props}
                />
              ) : (
                <input
                  {...field}
                  id={fieldId}
                  type={type}
                  placeholder={placeholder}
                  className={`
                    w-full px-4 py-3 border-2 rounded-xl transition-all duration-300
                    focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500
                    hover:border-islamic-300
                    ${hasError
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300'
                    }
                  `}
                  {...props}
                />
              )}
            </>
          );
        }}
      </Field>
      
      <ErrorMessage name={name}>
        {msg => (
          <p className="text-red-500 text-sm mt-1 flex items-center animate-slide-up">
            <span className="mr-1">⚠</span>
            {msg}
          </p>
        )}
      </ErrorMessage>
      
      {helper && !name && (
        <p className="text-gray-500 text-sm mt-1">{helper}</p>
      )}
      
      {/* Show helper text only when field is focused and no error */}
      <Field name={name}>
        {({ meta }) => {
          const showHelper = helper && !meta.error && meta.touched;
          return showHelper ? (
            <p className="text-islamic-600 text-sm mt-1 animate-fade-in">
              💡 {helper}
            </p>
          ) : null;
        }}
      </Field>
    </div>
  );
};

export default FormField;