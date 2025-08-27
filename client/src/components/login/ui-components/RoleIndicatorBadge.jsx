import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {FaMosque, FaCrown } from 'react-icons/fa';
import { selectSelectedRole } from '../../../redux/loginUiSlice';
import { Stars } from 'lucide-react';

/**
 * RoleIndicatorBadge Component
 * 
 * Displays the currently selected role with icon and styling
 * Shows role information in a badge format
 */
const RoleIndicatorBadge = () => {
  const selectedRole = useSelector(selectSelectedRole);

  // Role configuration
  const roles = {
    community_member: {
      title: 'Community Member',
      icon: Stars,
      color: 'from-green-400 to-green-600'
    },
    imam: {
      title: 'Imam',
      icon: FaMosque,
      color: 'from-teal-400 to-teal-600'
    },
    chief_imam: {
      title: 'Chief Imam',
      icon: FaCrown,
      color: 'from-yellow-400 to-yellow-600'
    }
  };

  if (!selectedRole || !roles[selectedRole]) {
    return null;
  }

  const roleConfig = roles[selectedRole];
  const IconComponent = roleConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-green-50 dark:bg-green-900/60 border border-green-200 dark:border-emerald-600 rounded-xl p-4 mb-6"
    >
      <div className="flex items-center justify-center gap-3">
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-r ${roleConfig.color} flex items-center justify-center`}
        >
          <IconComponent className="w-4 h-4 text-white" />
        </div>
        <div className="text-center">
          <p className="text-sm text-green-700 dark:text-gray-200">
            Signing in as:
          </p>
          <p className="font-semibold text-green-800 dark:text-gray-100">
            {roleConfig.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RoleIndicatorBadge;