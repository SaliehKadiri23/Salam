import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaMosque, FaCrown } from 'react-icons/fa';

// Role configuration
export const roleConfig = {
  community_member: {
    title: 'Community Member',
    description: 'Access Islamic resources, join discussions, and connect with fellow Muslims.',
    permissions: ['Join discussions', 'Access resources', 'Community events'],
    icon: FaUsers,
    color: 'from-green-400 to-green-600'
  },
  imam: {
    title: 'Imam',
    description: 'Lead prayers, provide guidance, and manage community events.',
    permissions: ['Lead prayers', 'Provide guidance', 'Manage events'],
    icon: FaMosque,
    color: 'from-teal-400 to-teal-600'
  },
  chief_imam: {
    title: 'Chief Imam',
    description: 'Administrative oversight and spiritual leadership of the community.',
    permissions: ['Full admin access', 'User management', 'System oversight'],
    icon: FaCrown,
    color: 'from-yellow-400 to-yellow-600'
  }
};


const RoleCard = ({
  role,
  title,
  description,
  permissions,
  icon: IconComponent,
  selected = false,
  onClick,
  className = ''
}) => {
  const roleData = roleConfig[role];
  const colorClass = roleData?.color || 'from-gray-400 to-gray-600';
  
  return (
    <motion.div
      onClick={() => onClick(role)}
      className={`
        cursor-pointer p-6 rounded-2xl border-2 bg-white transition-all duration-300
        ${selected 
          ? 'border-green-400 shadow-lg bg-green-50' 
          : 'border-gray-200 hover:border-green-300 hover:shadow-lg'
        }
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        {/* Role Icon */}
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center`}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        {/* Role Title */}
        <h3 className="font-bold text-lg text-gray-800 mb-2">
          {title}
        </h3>

        {/* Role Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Permissions (if provided) */}
        {permissions && permissions.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Permissions:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {permissions.slice(0, 3).map((permission, index) => (
                <li key={index} className="flex items-center justify-center gap-1">
                  <span className="w-1 h-1 bg-green-500 rounded-full flex-shrink-0"></span>
                  {permission}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Selection Indicator */}
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-4 flex items-center justify-center"
          >
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RoleCard;