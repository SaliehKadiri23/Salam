import React from 'react';
import BasicInfoSection from './BasicInfoSection';
import PersonalDetailsSection from './PersonalDetailsSection';
import CommunitySection from './CommunitySection';
import PrivacySection from './PrivacySection';

const ModalBody = ({
  formData,
  onInputChange,
  onNestedInputChange,
  userData
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
      {/* Basic Information */}
      <BasicInfoSection
        formData={formData}
        onInputChange={onInputChange}
      />

      {/* Personal Details */}
      <PersonalDetailsSection
        formData={formData}
        onInputChange={onInputChange}
      />

      {/* Community Information */}
      <CommunitySection
        formData={formData}
        onInputChange={onInputChange}
      />

      {/* Privacy Settings */}
      <PrivacySection
        formData={formData}
        onNestedInputChange={onNestedInputChange}
      />
    </div>
  );
};

export default ModalBody;