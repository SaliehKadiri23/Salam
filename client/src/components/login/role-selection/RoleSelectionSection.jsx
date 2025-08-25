import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoleCard, { roleConfig } from '../../signup/RoleCard';
import IslamicPattern from '../../utility/IslamicPattern';
import RoleBadge from './RoleBadge';

/**
 * RoleSelectionSection Component
 * 
 * Displays the role selection interface for login
 * Shows available roles and allows user to select their account type
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onRoleSelect - Callback when a role is selected
 * @param {Object} props.savedCredentials - User's saved credentials from Redux
 * @param {Object} props.userData - Current user data from Redux
 */
const RoleSelectionSection = ({ 
  onRoleSelect, 
  savedCredentials, 
  userData 
}) => {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(roleConfig).map(([roleKey, config]) => (
          <RoleCard
            key={roleKey}
            role={roleKey}
            title={config.title}
            description={config.description}
            permissions={config.permissions}
            icon={config.icon}
            selected={false}
            onClick={onRoleSelect}
            className="transform hover:scale-105 transition-all duration-300"
          />
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