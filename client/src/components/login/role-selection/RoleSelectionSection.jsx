import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaMosque, FaCrown, FaCheck } from 'react-icons/fa';
import { selectSelectedRole } from '../../../redux/loginUiSlice';
import IslamicPattern from '../../utility/IslamicPattern';
import RoleBadge from './RoleBadge';


const RoleSelectionSection = ({ 
  onRoleSelect, 
  savedCredentials, 
  userData 
}) => {
  const selectedRole = useSelector(selectSelectedRole);

  // Role options
  const roles = [
    {
      id: 'community_member',
      title: 'Community Member',
      description: 'Access Islamic resources, join discussions, and connect with fellow Muslims.',
      icon: FaUsers,
      color: 'from-green-400 to-green-600',
      permissions: [
        'Join community discussions',
        'Access Islamic resources',
        'Participate in events',
        'Connect with fellow Muslims'
      ]
    },
    {
      id: 'imam',
      title: 'Imam',
      description: 'Lead prayers, provide guidance, and manage community events.',
      icon: FaMosque,
      color: 'from-teal-400 to-teal-600',
      permissions: [
        'Lead prayers and services',
        'Provide religious guidance',
        'Manage community events',
        'Moderate discussions'
      ]
    },
    {
      id: 'chief_imam',
      title: 'Chief Imam',
      description: 'Administrative oversight and spiritual leadership of the community.',
      icon: FaCrown,
      color: 'from-yellow-400 to-yellow-600',
      permissions: [
        'Full administrative access',
        'Manage Imam appointments',
        'Oversee community operations',
        'Make organizational decisions'
      ]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <IslamicPattern variant="corner-decoration" className="w-full h-full text-islamic-500" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <IslamicPattern 
          variant="divider" 
          className="w-24 h-6 mx-auto text-islamic-300 mb-6" 
        />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Select Your Account Type
        </h2>
        <p className="text-gray-600">
          Choose the role that matches your account to sign in
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className={`
              cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg relative overflow-hidden hover:scale-102
              ${
                selectedRole === role.id
                  ? "border-green-500 bg-green-50 shadow-lg scale-105"
                  : "border-gray-200 bg-white hover:border-green-300"
              }
            `}
          >
            {/* Selection indicator */}
            {selectedRole === role.id && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <FaCheck className="w-3 h-3 text-white" />
              </motion.div>
            )}

            {/* Role Icon and Title */}
            <div className="flex items-center mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center`}
              >
                <role.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 ml-3">
                {role.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {role.description}
            </p>

            {/* Permissions Preview */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                What you can do:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {role.permissions.map((permission, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="w-3 h-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-fill notice for returning users */}
      <AnimatePresence>
        {savedCredentials.hasRememberedCredentials && userData.role && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mt-6 text-center"
          >
            <p className="text-islamic-700 text-sm mb-2">
              Welcome back! We found your previous account:
            </p>
            <button
              onClick={() => onRoleSelect(userData.role)}
              className="inline-flex items-center gap-2 bg-islamic-500 text-white px-4 py-2 rounded-lg hover:bg-islamic-600 transition-colors"
            >
              Continue as <RoleBadge role={userData.role} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default RoleSelectionSection;