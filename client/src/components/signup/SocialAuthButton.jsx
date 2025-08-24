import React from 'react';
import { motion } from 'framer-motion';
import { Loader, Mail } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const SocialAuthButton = ({ 
  provider, 
  onClick, 
  loading, 
  disabled 
}) => {
  const providerConfig = {
    google: {
      icon: <FaGoogle className="w-5 h-5" />,
      text: 'Continue with Google',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      hoverColor: 'hover:bg-gray-50',
      shadowColor: 'hover:shadow-lg'
    },
    facebook: {
      icon: <FaFacebook className="w-5 h-5" />,
      text: 'Continue with Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
      hoverColor: 'hover:bg-blue-700',
      shadowColor: 'hover:shadow-blue-200'
    },
    email: {
      icon: <Mail className="w-5 h-5" />,
      text: 'Continue with Email',
      bgColor: 'bg-islamic-500',
      textColor: 'text-white',
      borderColor: 'border-islamic-500',
      hoverColor: 'hover:bg-islamic-600',
      shadowColor: 'hover:shadow-islamic-200'
    }
  };
  
  const config = providerConfig[provider];
  
  return (
    <motion.button
      onClick={() => onClick(provider)}
      disabled={disabled || loading}
      className={`
        w-full py-4 px-6 rounded-xl font-semibold
        border-2 transition-all duration-300
        flex items-center justify-center gap-3
        hover:shadow-lg hover:-translate-y-0.5
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:translate-y-0 disabled:hover:shadow-none
        focus:outline-none focus:ring-2 focus:ring-islamic-500 focus:ring-offset-2
        ${config.bgColor} ${config.textColor} ${config.borderColor} ${config.hoverColor} ${config.shadowColor}
      `}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {loading ? (
        <Loader className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {config.icon}
          {config.text}
        </>
      )}
    </motion.button>
  );
};

export default SocialAuthButton;