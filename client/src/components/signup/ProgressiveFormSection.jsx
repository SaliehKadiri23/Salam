import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { updatePersonalInfo, updateAccountDetails, updateRoleSpecificData } from '../../redux/signupSlice';
import { selectSelectedRole, selectAuthMethod, selectFormData } from '../../redux/signupSlice';
import IslamicPattern from '../utility/IslamicPattern';
import FormField from '../utility/FormField';
import { roleConfig } from './RoleCard';
import { getValidationSchema, getInitialValues, getFieldHelperText } from './validationSchema';

const ProgressiveFormSection = () => {
  const dispatch = useDispatch();
  const selectedRole = useSelector(selectSelectedRole);
  const authMethod = useSelector(selectAuthMethod);
  const formData = useSelector(selectFormData);

  // Get validation schema and initial values based on role and auth method
  const validationSchema = getValidationSchema(selectedRole, authMethod);
  const initialValues = getInitialValues(selectedRole, authMethod);

  // Merge with existing form data from Redux
  const mergedInitialValues = {
    ...initialValues,
    ...formData.personalInfo,
    ...formData.accountDetails,
    ...formData.roleSpecificData,
  };

  // Field configuration with proper categorization
  const fieldCategories = {
    personalInfo: ['fullName', 'email', 'location', 'phone'],
    accountDetails: ['password', 'confirmPassword'],
    roleSpecific: {
      user: [],
      imam: ['mosque', 'certification', 'experience', 'specialization'],
      chiefImam: ['mosque', 'certification', 'experience', 'specialization', 'references', 'adminExperience']
    }
  };

  // Handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted:', values);
    
    // Update Redux store with validated form data
    const personalInfo = {};
    const accountDetails = {};
    const roleSpecificData = {};

    // Categorize the form values
    Object.keys(values).forEach(key => {
      if (fieldCategories.personalInfo.includes(key)) {
        personalInfo[key] = values[key];
      } else if (fieldCategories.accountDetails.includes(key)) {
        accountDetails[key] = values[key];
      } else {
        roleSpecificData[key] = values[key];
      }
    });

    // Dispatch to Redux
    dispatch(updatePersonalInfo(personalInfo));
    dispatch(updateAccountDetails(accountDetails));
    dispatch(updateRoleSpecificData(roleSpecificData));

    setSubmitting(false);
  };

  // Handle real-time form changes to keep Redux in sync
  const handleFormChange = (values) => {
    // Debounced update to Redux (optional - for real-time sync)
    const personalInfo = {};
    const accountDetails = {};
    const roleSpecificData = {};

    Object.keys(values).forEach(key => {
      if (fieldCategories.personalInfo.includes(key)) {
        personalInfo[key] = values[key];
      } else if (fieldCategories.accountDetails.includes(key)) {
        accountDetails[key] = values[key];
      } else {
        roleSpecificData[key] = values[key];
      }
    });

    dispatch(updatePersonalInfo(personalInfo));
    dispatch(updateAccountDetails(accountDetails));
    dispatch(updateRoleSpecificData(roleSpecificData));
  };

  if (!selectedRole || !authMethod) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Islamic decorative header */}
      <div className="text-center">
        <IslamicPattern 
          variant="divider" 
          className="w-24 h-6 mx-auto text-islamic-300 mb-4" 
        />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Complete Your Profile
        </h3>
        <p className="text-gray-600">
          Join our community as a {roleConfig[selectedRole]?.title}
        </p>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <Formik
          initialValues={mergedInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validate={(values) => {
            // Real-time sync with Redux on every change
            handleFormChange(values);
          }}
        >
          {({ values, errors, touched, isSubmitting, isValid }) => (
            <Form className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-islamic-500 rounded-full mr-3"></div>
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fieldCategories.personalInfo.map((fieldName) => (
                    <FormField
                      key={fieldName}
                      name={fieldName}
                      label={getFieldLabel(fieldName)}
                      type={getFieldType(fieldName)}
                      placeholder={getFieldPlaceholder(fieldName)}
                      required={isFieldRequired(fieldName)}
                      helper={getFieldHelperText(fieldName)}
                    />
                  ))}
                </div>
              </div>

              {/* Password fields for email auth */}
              {authMethod === 'email' && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-islamic-500 rounded-full mr-3"></div>
                    Account Security
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fieldCategories.accountDetails.map((fieldName) => (
                      <FormField
                        key={fieldName}
                        name={fieldName}
                        label={getFieldLabel(fieldName)}
                        type={getFieldType(fieldName)}
                        placeholder={getFieldPlaceholder(fieldName)}
                        required={isFieldRequired(fieldName)}
                        helper={getFieldHelperText(fieldName)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Role-specific fields */}
              {fieldCategories.roleSpecific[selectedRole]?.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-islamic-500 rounded-full mr-3"></div>
                    {selectedRole === 'imam' ? 'Imam Qualifications' : 'Chief Imam Qualifications'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fieldCategories.roleSpecific[selectedRole].map((fieldName) => (
                      <div 
                        key={fieldName} 
                        className={getFieldType(fieldName) === 'textarea' ? 'md:col-span-2' : ''}
                      >
                        <FormField
                          name={fieldName}
                          label={getFieldLabel(fieldName)}
                          type={getFieldType(fieldName)}
                          placeholder={getFieldPlaceholder(fieldName)}
                          required={isFieldRequired(fieldName)}
                          helper={getFieldHelperText(fieldName)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social auth info message */}
              {authMethod !== 'email' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 text-center"
                >
                  <p className="text-islamic-700 text-sm">
                    ✓ You'll sign in with {authMethod === 'google' ? 'Google' : 'Facebook'}. 
                    Additional information will be pre-filled where possible.
                  </p>
                </motion.div>
              )}

              {/* Form validation status */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {isValid ? (
                    <div className="flex items-center text-islamic-600">
                      <div className="w-2 h-2 bg-islamic-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">Form is valid</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-orange-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">Please complete all required fields</span>
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-gray-500">
                  {Object.keys(errors).length > 0 && (
                    <span>{Object.keys(errors).length} field{Object.keys(errors).length !== 1 ? 's' : ''} need attention</span>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

// Helper functions for field configuration
const getFieldLabel = (fieldName) => {
  const labels = {
    fullName: 'Full Name',
    email: 'Email Address',
    location: 'Location',
    phone: 'Phone Number',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    mosque: 'Mosque/Islamic Center',
    certification: 'Islamic Education/Certification',
    experience: 'Years of Experience',
    specialization: 'Area of Specialization',
    references: 'Professional References',
    adminExperience: 'Administrative Experience',
  };
  return labels[fieldName] || fieldName;
};

const getFieldType = (fieldName) => {
  const types = {
    fullName: 'text',
    email: 'email',
    location: 'text',
    phone: 'tel',
    password: 'password',
    confirmPassword: 'password',
    mosque: 'text',
    certification: 'text',
    experience: 'number',
    specialization: 'text',
    references: 'textarea',
    adminExperience: 'textarea',
  };
  return types[fieldName] || 'text';
};

const getFieldPlaceholder = (fieldName) => {
  const placeholders = {
    fullName: 'Enter your full name',
    email: 'Enter your email address',
    location: 'City, Country',
    phone: '+1 (555) 000-0000',
    password: 'Create a strong password',
    confirmPassword: 'Confirm your password',
    mosque: 'Name of your mosque or Islamic center',
    certification: 'Your Islamic qualifications or education',
    experience: 'Years of Islamic leadership experience',
    specialization: 'e.g., Fiqh, Quran, Hadith, Community Services',
    references: 'Please provide 2-3 professional references with contact information',
    adminExperience: 'Describe your administrative and leadership experience',
  };
  return placeholders[fieldName] || '';
};

const isFieldRequired = (fieldName) => {
  const optionalFields = ['phone'];
  return !optionalFields.includes(fieldName);
};

export default ProgressiveFormSection;