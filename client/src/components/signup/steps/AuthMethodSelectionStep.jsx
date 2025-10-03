import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaGoogle, FaChevronLeft } from "react-icons/fa";
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

  const handleSocialAuth = (provider) => {
    if (provider.toLowerCase() === 'google') {
      window.location.href = `http://localhost:7000/api/auth/google?role=${selectedRole}`;
    } else {
      dispatch(showNotification({
        type: "error",
        message: `Social authentication with ${provider} is not yet implemented.`
      }));
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
      className="bg-white/80 dark:bg-black/40 backdrop-blur-sm flex flex-col justify-center rounded-3xl p-8 shadow-xl border border-white/20 dark:border-emerald-600"
    >
      {/* Back Button */}
      <button
        onClick={handleBackToRoleSelection}
        className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 transition-colors mb-6"
      >
        <FaChevronLeft className="w-4 h-4" />
        <span className="text-sm ">Change Account Type</span>
      </button>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Choose Authentication Method
      </h2>

      {/* Current Role Indicator */}
      {currentRole && (
        <div className="bg-green-50 w-full sm:w-[80%] md:w-[50%] self-center dark:bg-blue-800 border border-green-200 dark:border-emerald-600 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-3">
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-r ${currentRole.color} flex items-center justify-center`}
            >
              <currentRole.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 dark:text-gray-100">
                Creating account as:
              </p>
              <p className="font-semibold text-green-800 dark:text-gray-100">
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
            className="w-full flex items-center justify-center space-x-3 p-4 border-2 text-gray-700 dark:text-gray-100 dark:hover:text-gray-800 border-gray-200 dark:border-red-600 rounded-2xl hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-300 transition-all duration-300 disabled:opacity-50"
          >
            <FaGoogle className="text-red-500 w-5 h-5" />
            <span className="font-semibold">Continue with Google</span>
          </button>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300 dark:border-emerald-600" />
          <span className="px-4 text-gray-500 dark:text-gray-100 font-medium">
            or
          </span>
          <hr className="flex-1 border-gray-300 dark:border-emerald-600" />
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
                : "border-gray-200 hover:border-green-300 dark:border-emerald-600 hover:bg-green-50 text-gray-700 dark:text-gray-100 dark:hover:text-gray-800"
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
          className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 dark:text-gray-100 font-semibold hover:border-gray-400 transition-all duration-300"
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