import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, CheckCircle } from 'lucide-react';
import CustomSelect from './CustomSelect';

const ApplicationModal = ({ opportunity, isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Validation schema for each step
  const validationSchemas = [
    // Step 1: Personal Information
    Yup.object().shape({
      fullName: Yup.string()
        .min(2, 'Full name must be at least 2 characters')
        .required('Full name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string()
        .matches(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          'Invalid phone number'
        )
        .required('Phone number is required'),
    }),
    // Step 2: Availability & Experience
    Yup.object().shape({
      availability: Yup.string()
        .required('Please select your availability')
        .test('is-valid', 'Please select your availability', (value) => {
          return value && value !== 'All';
        }),
      experience: Yup.string(),
    }),
    // Step 3: Motivation
    Yup.object().shape({
      motivation: Yup.string()
        .min(10, 'Motivation must be at least 10 characters')
        .required('Motivation is required'),
    }),
    // Step 4: Confirmation (no validation needed)
    Yup.object().shape({}),
  ];

  // Initial form values
  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    availability: '',
    experience: '',
    motivation: '',
  };

  const nextStep = (validateForm, setTouched) => {
    // Validate current step before moving to next
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        // No errors, proceed to next step
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
      } else {
        // Mark all fields as touched to show errors
        setTouched(
          Object.keys(errors).reduce((acc, field) => {
            acc[field] = true;
            return acc;
          }, {})
        );
      }
    });
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values) => {
    onSubmit(values);
    setCurrentStep(1);
  };

  if (!isOpen || !opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Apply for {opportunity.title}
            </h2>
            <p className="text-slate-600">{opportunity.organization}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-300"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-slate-600">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[currentStep - 1]}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ isSubmitting, isValid, values, validateForm, setTouched, setFieldValue }) => (
            <Form>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Personal Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <Field
                      type="text"
                      name="fullName"
                      className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your phone number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Availability & Experience */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Availability & Experience
                  </h3>

                  <div>
                    <CustomSelect
                      label="Your Availability *"
                      value={values.availability || "All"}
                      onChange={(value) => setFieldValue('availability', value)}
                      options={['All', 'weekdays', 'weekends', 'evenings', 'flexible']}
                      placeholder="Select your availability"
                    />
                    <ErrorMessage
                      name="availability"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Relevant Experience
                    </label>
                    <Field
                      as="textarea"
                      name="experience"
                      rows={4}
                      placeholder="Tell us about any relevant experience you have..."
                      className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <ErrorMessage
                      name="experience"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Motivation */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Your Motivation
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Why do you want to volunteer for this role? *
                    </label>
                    <Field
                      as="textarea"
                      name="motivation"
                      rows={6}
                      placeholder="Share your motivation and what you hope to contribute..."
                      className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <ErrorMessage
                      name="motivation"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">
                      Application Summary
                    </h4>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p>
                        <strong>Name:</strong> {values.fullName}
                      </p>
                      <p>
                        <strong>Email:</strong> {values.email}
                      </p>
                      <p>
                        <strong>Availability:</strong> {values.availability}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Thank You */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="w-full h-[40vh] flex flex-col justify-center items-center gap-5">
                    <CheckCircle
                      size={'6em'}
                      className="text-white bg-gradient-to-tr from-green-300 via-green-600 to-green-300 rounded-full p-3"
                    />
                    <p className="text-green-600 font-bold">
                      Thank You for your Application
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="font-bold text-white bg-red-600 py-2 px-3 rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep !== totalSteps && (
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors duration-300"
                    >
                      Previous
                    </button>
                  )}

                  <div className="ml-auto">
                    {currentStep < totalSteps - 1 ? (
                      <button
                        type="button"
                        onClick={() => nextStep(validateForm, setTouched)}
                        className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 disabled:opacity-70"
                      >
                        Submit Application
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ApplicationModal;