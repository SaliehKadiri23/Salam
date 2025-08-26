import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaGoogle, FaFacebook, FaChevronLeft } from "react-icons/fa";
import { SIGNUP_ROLES } from "../constants/rolesData";
import { 
  selectAuthMethod,
  goBackToRoleSelection,
  proceedToProfile,
  setSocialAuthData,
  setLoading,
  showNotification,
  selectSelectedRole,
  selectSelectedAuthMethod,
  selectCurrentStep,
  selectLoading
} from "../../../redux/signupSlice";

const AuthMethodSelectionStep = ({ stepRefs }) => {
  const dispatch = useDispatch();
  const selectedRole = useSelector(selectSelectedRole);
  const selectedAuthMethod = useSelector(selectSelectedAuthMethod);
  const currentStep = useSelector(selectCurrentStep);
  const isLoading = useSelector(selectLoading);

  const handleAuthMethodSelect = (method) => {
    dispatch(selectAuthMethod(method));
  };

  const handleBackToRoleSelection = () => {
    dispatch(goBackToRoleSelection());
  };

  const handleSocialAuth = async (provider) => {
    dispatch(setLoading(true));
    try {
      // This will be replaced with actual Passport.js integration
      console.log(`Initiating ${provider} authentication...`);

      // This will come from Passport.js callback
      const mockSocialAuthData = {
        fullName: provider === "Google" ? "Ahmed Al-Rahman" : "Omar Al-Faruq",
        email: provider === "Google" ? "ahmed@gmail.com" : "omar@facebook.com",
        profilePicture: null, // Will be available from Google and Fb
        provider: provider.toLowerCase(),
        providerId: `${provider.toLowerCase()}_123456789`,
      };

      // Set social auth data
      dispatch(setSocialAuthData(mockSocialAuthData));
      dispatch(selectAuthMethod(provider.toLowerCase()));

      // Show success notification
      dispatch(showNotification({
        type: "success",
        message: `${provider} authentication successful! Please complete your profile.`
      }));

      // Advance to step 3 (Profile Completion) with a slight delay
      setTimeout(() => {
        dispatch(proceedToProfile());
      }, 1000);
    } catch (error) {
      dispatch(showNotification({
        type: "error",
        message: `Failed to authenticate with ${provider}`
      }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleContinue = () => {
    if (selectedAuthMethod === "email") {
      dispatch(proceedToProfile());
    }
  };

  const canProceed = () => {
    return selectedAuthMethod !== null;
  };

  if (currentStep !== "selectAuth") return null;

  const currentRole = SIGNUP_ROLES.find((r) => r.id === selectedRole);

  return (
    <div
      ref={stepRefs ? (el) => (stepRefs.current[1] = el) : null}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
    >
      {/* Back Button */}
      <button
        onClick={handleBackToRoleSelection}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors mb-6"
      >
        <FaChevronLeft className="w-4 h-4" />
        <span className="text-sm">Change Account Type</span>
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Choose Authentication Method
      </h2>

      {/* Current Role Indicator */}
      {currentRole && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-3">
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-r ${currentRole.color} flex items-center justify-center`}
            >
              <currentRole.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700">
                Creating account as:
              </p>
              <p className="font-semibold text-green-800">
                {currentRole.title}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6 mb-8">
        {/* Social Authentication */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => handleSocialAuth("Google")}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-red-400 hover:bg-red-50 transition-all duration-300 disabled:opacity-50"
          >
            <FaGoogle className="text-red-500 w-5 h-5" />
            <span className="font-semibold text-gray-700">
              Continue with Google
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialAuth("Facebook")}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50"
          >
            <FaFacebook className="text-blue-500 w-5 h-5" />
            <span className="font-semibold text-gray-700">
              Continue with Facebook
            </span>
          </button>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-4 text-gray-500 font-medium">
            or
          </span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Email Authentication */}
        <button
          type="button"
          onClick={() => handleAuthMethodSelect("email")}
          className={`
            w-full p-4 border-2 rounded-2xl transition-all duration-300 font-semibold
            ${
              selectedAuthMethod === "email"
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700"
            }
          `}
        >
          Sign up with Email & Password
        </button>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBackToRoleSelection}
          className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-all duration-300"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canProceed()}
          className={`
            px-8 py-3 rounded-full font-semibold transition-all duration-300
            ${
              canProceed()
                ? "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AuthMethodSelectionStep;