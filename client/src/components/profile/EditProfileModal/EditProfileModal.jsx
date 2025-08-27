import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import GlassmorphicCard from '../../shared/GlassmorphicCard';
import IslamicPattern from '../../utility/IslamicPattern';
import Button from '../../utility/Button';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({});
  const [loading, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && userData) {
      setFormData({
        preferredName: userData.preferredName || '',
        bio: userData.bio || '',
        location: userData.location || '',
        interests: userData.interests || [],
        languages: userData.languages || [],
        communityRole: userData.communityRole || '',
        privacySettings: {
          profileVisibility: userData.privacySettings?.profileVisibility || 'community',
          showOnlineStatus: userData.privacySettings?.showOnlineStatus || true,
          allowMessages: userData.privacySettings?.allowMessages || true
        }
      });
      setHasChanges(false);
    }
  }, [isOpen, userData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave(formData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (hasChanges) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) return;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] mx-4 animate-slide-up">
        <div className="relative overflow-hidden shadow-2xl bg-white rounded-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <IslamicPattern
              className="w-full h-full text-islamic-500"
              opacity="opacity-[0.02]"
              variant="geometric"
            />
          </div>

          <div className="relative z-10 flex flex-col max-h-[90vh] dark:border dark:border-emerald-600">
            <ModalHeader
              onClose={handleClose}
              hasChanges={hasChanges}
              title="Edit Profile"
            />

            <ModalBody
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
              userData={userData}
            />

            <ModalFooter
              onCancel={handleClose}
              onSave={handleSave}
              loading={loading}
              hasChanges={hasChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;