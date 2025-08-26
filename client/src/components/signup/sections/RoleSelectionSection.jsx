import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoleCard, { roleConfig } from '../RoleCard';
import IslamicPattern from '../../utility/IslamicPattern';

const RoleSelectionSection = ({ selectedRole, onRoleSelect, showRoleSelection = true }) => {
  return (
    <AnimatePresence>
      {showRoleSelection && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 w-full backdrop-blur-sm rounded-3xl p-8 pt-0 shadow-2xl border border-white/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <IslamicPattern variant="corner-decoration" className="w-full h-full text-islamic-500" />
          </div>

          <div className="text-center mb-8">
            <IslamicPattern variant="divider" className="w-24 h-6 mx-auto text-islamic-300 mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Choose Your Role
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Select the role that best describes how you'd like to participate in our Islamic community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {Object.entries(roleConfig).map(([roleKey, config]) => (
              <RoleCard
                key={roleKey}
                role={roleKey}
                title={config.title}
                description={config.description}
                permissions={config.permissions}
                icon={config.icon}
                selected={selectedRole === roleKey}
                onClick={onRoleSelect}
              />
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default RoleSelectionSection;