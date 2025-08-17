import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  className = '',
}) => {
  const baseClasses =
    'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2';

  const variants = {
    primary:
      'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1',
    secondary:
      'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200',
    outline: 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;