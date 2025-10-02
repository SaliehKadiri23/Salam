import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaGoogle, FaFacebook, FaShieldAlt } from "react-icons/fa";
import FormField from "../form-components/FormField";
import {
  selectSelectedRole,
  selectSelectedAuthMethod,
  selectCurrentStep,
  selectLoading,
  selectProfileInfo,
  selectRoleSpecificData,
  updateProfileInfo,
  updateRoleSpecificData,
  goBackToAuth,
  setLoading,
  showNotification,
} from "../../../redux/signupSlice";


const ProfileCompletionStep = ({ stepRefs, onPrevStep }) => {
  const dispatch = useDispatch();
  const selectedRole = useSelector(selectSelectedRole);
  const selectedAuthMethod = useSelector(selectSelectedAuthMethod);
  const currentStep = useSelector(selectCurrentStep);
  const isLoading = useSelector(selectLoading);
  const profileInfo = useSelector(selectProfileInfo);
  const roleSpecificData = useSelector(selectRoleSpecificData);

  const [showPassword, setShowPassword] = useState(false);

  const handlePrevStep = () => {
    if (onPrevStep) {
      onPrevStep();
    } else {
      // Default behavior - go back to authentication step
      dispatch(goBackToAuth());
    }
  };


  if (currentStep !== "completeProfile") return null;

  const isSocialAuth = selectedAuthMethod === "google" || selectedAuthMethod === "facebook";
  const needsImamFields = selectedRole === "imam" || selectedRole === "chief-imam";
  const needsChiefImamFields = selectedRole === "chief-imam";

  return (
    <div
      ref={stepRefs ? (el) => (stepRefs.current[2] = el) : null}
      className="bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-emerald-600"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Complete Your Profile
      </h2>

      {/* Social Auth Indicator */}
      {isSocialAuth && (
        <div className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-blue-600 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-3">
            {selectedAuthMethod === "google" ? (
              <FaGoogle className="text-red-500 size-10" />
            ) : (
              <FaFacebook className="text-blue-500  size-10" />
            )}
            <div className="text-center">
              <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">
                Great! We've pre-filled some details from your{" "}
                {selectedAuthMethod === "google" ? "Google" : "Facebook"}{" "}
                account
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Base Fields */}
        <FormField
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <FormField
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          disabled={isSocialAuth}
          required
        />

        {selectedAuthMethod === "email" && (
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Create a strong password"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            required
          />
        )}

        <FormField
          name="location"
          label="Location"
          placeholder="Your city/country"
          required
        />

        <FormField
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="Optional phone number"
        />

        {/* Imam/Chief Imam specific fields */}
        {needsImamFields && (
          <>
            <FormField
              name="mosque"
              label="Mosque Affiliation"
              placeholder="Name of your mosque"
              required
            />

            <FormField
              name="certification"
              label="Certification"
              placeholder="Your Islamic certification"
              required
            />

            <FormField
              name="experience"
              label="Years of Experience"
              type="number"
              placeholder="Years of experience"
              required
            />

            <FormField
              name="specialization"
              label="Specialization"
              placeholder="Your area of specialization"
              required
            />
          </>
        )}

        {/* Chief Imam additional fields */}
        {needsChiefImamFields && (
          <>
            <div className="md:col-span-2">
              <FormField
                name="references"
                label="References"
                as="textarea"
                rows={4}
                placeholder="Professional references (names, positions, contact info)"
                required
              />
            </div>

            <div className="md:col-span-2">
              <FormField
                name="adminExperience"
                label="Administrative Experience"
                as="textarea"
                rows={4}
                placeholder="Describe your administrative experience"
                required
              />
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between">
        {/* Hide back button for social auth users to prevent duplicate registrations */}
        {!isSocialAuth ? (
          <button
            type="button"
            onClick={handlePrevStep}
            className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 dark:text-gray-100 font-semibold hover:border-gray-400 transition-all duration-300"
          >
            Back
          </button>
        ) : (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-100">
            <FaShieldAlt className="w-4 h-4 mr-2" />
            <span>
              Secured with{" "}
              {selectedAuthMethod === "google" ? "Google" : "Facebook"}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`
            px-8 py-3 rounded-full font-semibold transition-all duration-300
            ${
              isLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
            }
          `}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletionStep;