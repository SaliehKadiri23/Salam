import React from 'react';

const GlassmorphicCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...props 
}) => {
  const variants = {
    default: 'backdrop-blur-md bg-white/70 dark:bg-black/40  border border-white/20 dark:border-emerald-600',
    glass: 'backdrop-blur-lg bg-white/30 dark:bg-black/40  border border-white/10 dark:border-emerald-600',
    solid: 'bg-white dark:bg-black/40  border border-gray-200 dark:border-emerald-600',
    gradient: 'bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/20 dark:border-emerald-600',
  };

  const hoverEffect = hover 
    ? 'transition-all duration-300 hover:shadow-glass hover:bg-white/80 hover:border-white/30' 
    : '';

  return (
    <div 
      className={`
        rounded-2xl shadow-lg p-6
        ${variants[variant]}
        ${hoverEffect}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;