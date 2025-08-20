import React from 'react';
import { Shield, Eye, MessageSquare, Users, Stars } from 'lucide-react';
import FormField from '../../utility/FormField';

const PrivacySection = ({ formData, onNestedInputChange }) => {
  const privacySettings = formData.privacySettings || {};

  const toggleSwitch = (field, value) => {
    onNestedInputChange('privacySettings', field, value);
  };

  const ToggleSwitch = ({ label, description, value, onChange, icon: Icon }) => (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="p-2 rounded-lg bg-islamic-100 flex-shrink-0">
          <Icon className="w-4 h-4 text-islamic-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-gray-900">{label}</div>
          <div className="text-sm text-gray-600 mt-1 break-words">{description}</div>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-islamic-500 focus:ring-offset-2 shadow-inner
            ${value ? 'bg-islamic-500' : 'bg-gray-300'}
          `}
          aria-pressed={value}
          role="switch"
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-all duration-300 ease-in-out
              ${value ? 'translate-x-5' : 'translate-x-1'}
            `}
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <Shield className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
      </div>
      
      <div className="space-y-4">
        {/* Profile Visibility */}
        <FormField label="Profile Visibility" helper="Who can see your profile information?">
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                value: 'public',
                label: 'Public',
                description: 'Anyone can view your profile',
                icon: '🌍'
              },
              {
                value: 'community',
                label: 'Community Only',
                description: 'Only registered community members can see your profile',
                icon: '✨'
              },
              {
                value: 'private',
                label: 'Private',
                description: 'Only you and people you follow can see your profile',
                icon: '🔒'
              }
            ].map((option) => {
              const isSelected = privacySettings.profileVisibility === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleSwitch('profileVisibility', option.value)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200 text-left
                    ${isSelected 
                      ? 'border-islamic-500 bg-islamic-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <div className={`font-medium ${isSelected ? 'text-islamic-700' : 'text-gray-900'}`}>
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </FormField>

        {/* Privacy Toggles */}
        <div className="space-y-3">
          <ToggleSwitch
            label="Show Online Status"
            description="Let others see when you're online and active"
            value={privacySettings.showOnlineStatus}
            onChange={(value) => toggleSwitch('showOnlineStatus', value)}
            icon={Eye}
          />


          <ToggleSwitch
            label="Show Activity Status"
            description="Display your recent community activity and participation"
            value={privacySettings.showActivity ?? true}
            onChange={(value) => toggleSwitch('showActivity', value)}
            icon={Stars}
          />

          <ToggleSwitch
            label="Prayer Reminder Notifications"
            description="Receive gentle reminders for prayer times"
            value={privacySettings.prayerReminders ?? true}
            onChange={(value) => toggleSwitch('prayerReminders', value)}
            icon={Shield}
          />
        </div>

        {/* Additional Privacy Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Your Privacy Matters</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                We respect your privacy and follow Islamic principles of discretion. Your personal information 
                is never shared without your consent, and you have full control over your visibility settings.
              </p>
            </div>
          </div>
        </div>

        {/* Data Export & Account */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Account Management</h4>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Export My Data
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Account Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySection;