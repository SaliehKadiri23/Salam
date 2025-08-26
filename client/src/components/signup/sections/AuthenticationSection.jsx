import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Crown, Info, Shield, Star } from 'lucide-react';
import IslamicPattern from '../../utility/IslamicPattern';
import AuthMethodSelector from '../ui/AuthMethodSelector';
import EmailAuthForm from '../forms/EmailAuthForm';
import SocialAuthConfirmation from '../ui/SocialAuthConfirmation';

const AuthenticationSection = ({
  selectedRole,
  selectedAuthMethod,
  authCredentials,
  onBackToRoleSelection,
  onAuthMethodSelect,
  onCredentialChange,
  onProceedToProfile,
  currentStep
}) => {
  // Role badge component
  const RoleBadge = ({ role }) => {
    const roleBadgeConfig = {
      'user': {
        label: 'Community Member',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: <Shield className="w-3 h-3" />
      },
      'imam': {
        label: 'Imam',
        color: 'bg-islamic-100 text-islamic-700 border-islamic-200',
        icon: <Star className="w-3 h-3" />
      },
      'chiefImam': {
        label: 'Chief Imam',
        color: 'bg-gradient-to-r from-islamic-100 to-islamic-teal-100 text-islamic-800 border-islamic-300',
        icon: <Crown className="w-3 h-3 fill-current" />
      }
    };

    const config = roleBadgeConfig[role] || roleBadgeConfig.user;

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

  return (
    <AnimatePresence>
      {currentStep === 'selectAuth' && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8  shadow-2xl border border-white/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <IslamicPattern variant="corner-decoration" className="w-full h-full text-islamic-500" />
          </div>

          <button
            onClick={onBackToRoleSelection}
            className="flex items-center gap-2 text-islamic-600 hover:text-islamic-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Change Account Type</span>
          </button>

          <div className="text-center mb-6">
            <IslamicPattern variant="divider" className="w-24 h-6 mx-auto text-islamic-300 " />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              How would you like to sign up?
            </h2>
            <p className="text-gray-600">
              Choose your preferred registration method
            </p>
          </div>

          <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-islamic-600" />
              <div className="flex-1">
                <p className="text-sm text-islamic-700 mb-1">
                  Creating account as:
                </p>
                <RoleBadge role={selectedRole} />
              </div>
            </div>
          </div>

          {!selectedAuthMethod ? (
            <AuthMethodSelector onAuthMethodSelect={onAuthMethodSelect} />
          ) : selectedAuthMethod === 'email' ? (
            <EmailAuthForm
              authCredentials={authCredentials}
              onCredentialChange={onCredentialChange}
              onProceedToProfile={onProceedToProfile}
            />
          ) : (
            <SocialAuthConfirmation
              selectedAuthMethod={selectedAuthMethod}
              onProceedToProfile={onProceedToProfile}
            />
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default AuthenticationSection;