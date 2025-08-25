import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star } from 'lucide-react';

/**
 * RoleBadge Component
 * 
 * Displays a styled badge indicating the user's role with appropriate colors and icons
 * 
 * @param {Object} props - Component props
 * @param {'community' | 'imam' | 'chief-imam'} props.role - The user role to display
 */
const RoleBadge = ({ role }) => {
  const roleBadgeConfig = {
    'community': { 
      label: 'Community Member', 
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: <Shield className="w-3 h-3" />
    },
    'imam': { 
      label: 'Imam', 
      color: 'bg-islamic-100 text-islamic-700 border-islamic-200',
      icon: <Star className="w-3 h-3" />
    },
    'chief-imam': { 
      label: 'Chief Imam', 
      color: 'bg-gradient-to-r from-islamic-100 to-islamic-teal-100 text-islamic-800 border-islamic-300',
      icon: <Star className="w-3 h-3 fill-current" />
    }
  };

  const config = roleBadgeConfig[role] || roleBadgeConfig.community;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
    >
      {config.icon}
      {config.label}
    </motion.div>
  );
};

export default RoleBadge;