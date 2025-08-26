import React from 'react';
import { motion } from 'framer-motion';
import { Check, User, BookOpen, Crown, Star } from 'lucide-react';
import IslamicPattern from '../utility/IslamicPattern';

const RoleCard = ({ 
  role, 
  title, 
  description, 
  permissions, 
  selected, 
  onClick,
  icon 
}) => {
  return (
    <motion.div
      className={`
        relative role-card p-6 rounded-2xl border-2 cursor-pointer
        transition-all duration-300 hover:shadow-islamic-lg overflow-hidden
        ${selected 
          ? 'border-islamic-500 bg-islamic-50 shadow-islamic-glow' 
          : 'border-gray-200 bg-white hover:border-islamic-300'
        }
      `}
      onClick={() => onClick(role)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Islamic geometric corner decoration */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <IslamicPattern 
          variant="corner-decoration" 
          className="text-islamic-200 opacity-30" 
        />
      </div>
      
      {/* Role Icon and Title */}
      <div className="flex items-center mb-4 relative z-10">
        <div className={`
          w-12 h-12 rounded-xl p-3 bg-green-100 flex items-center justify-center transition-colors duration-300
          ${selected ? 'bg-islamic-500 text-white' : 'bg-gray-100 text-gray-600'}
        `}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 ml-4">
          {title}
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      
      {/* Permissions Preview */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700">
          What you can do:
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          {permissions.map((permission, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-4 h-4 text-islamic-500 mr-2 flex-shrink-0" />
              <span>{permission}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Selection Indicator */}
      {selected && (
        <motion.div 
          className="absolute top-4 right-4 z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-6 h-6 bg-islamic-500 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      )}

      {/* Hover glow effect */}
      <div className={`
        absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
        ${selected ? 'opacity-20' : 'opacity-0 hover:opacity-10'}
        bg-gradient-to-br from-islamic-400 to-islamic-teal-400
      `} />
    </motion.div>
  );
};

// Role configuration data
export const roleConfig = {
  user: {
    title: "Community Member",
    description:
      "Join our Islamic community to access resources, participate in discussions, and connect with fellow Muslims.",
    permissions: [
      "Access Islamic resources and articles",
      "Join community discussions",
      "Request duas and spiritual support",
      "Attend virtual events",
      "Edit your personal profile",
    ],
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    color: "islamic-teal",
    additionalFields: [],
  },
  imam: {
    title: "Imam",
    description:
      "Lead and guide the community with Islamic knowledge, organize events, and provide spiritual guidance.",
    permissions: [
      "All Community Member privileges",
      "Create and manage community events",
      "Write and publish articles",
      "Moderate community discussions",
      "Remove inappropriate content",
      "Access imam resources and tools",
    ],
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    color: "islamic",
    additionalFields: [
      "mosque",
      "certification",
      "experience",
      "specialization",
    ],
  },
  chiefImam: {
    title: "Chief Imam",
    description:
      "Provide administrative oversight, manage imam community, and ensure Islamic authenticity across the platform.",
    permissions: [
      "All Imam privileges",
      "Manage imam accounts and permissions",
      "Access administrative dashboard",
      "Review and approve imam applications",
      "Moderate platform-wide content",
      "Access detailed community analytics",
    ],
    icon: <Crown className="w-6 h-6 text-gold-400" />,
    color: "gold",
    additionalFields: [
      "mosque",
      "certification",
      "experience",
      "specialization",
      "references",
      "adminExperience",
    ],
  },
};

export default RoleCard;