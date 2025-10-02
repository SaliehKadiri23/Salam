import React, { useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";

// Components
import ProgressIndicator from "../components/signup/ui-components/ProgressIndicator";
import TrustIndicators from "../components/signup/ui-components/TrustIndicators";
import IslamicPattern from "../components/signup/ui-components/IslamicPattern";
import NotificationBanner from "../components/signup/ui-components/NotificationBanner";
import RoleSelectionStep from "../components/signup/steps/RoleSelectionStep";
import AuthMethodSelectionStep from "../components/signup/steps/AuthMethodSelectionStep";
import ProfileCompletionStep from "../components/signup/steps/ProfileCompletionStep";

// Redux
import {
  selectCurrentStep,
  selectSelectedRole,
  selectSelectedAuthMethod,
  selectLoading,
  selectProfileInfo,
  selectRoleSpecificData,
  goBackToAuth,
  setLoading,
  showNotification,
  hideNotification,
  updateProfileInfo,
  updateRoleSpecificData,
} from "../redux/signupSlice";

// Validation
import { getSignupValidationSchema } from "../components/signup/validation/signupValidation";

import { useSignupMutation } from "../services/apiSlice";

import SuccessModal from "../components/signup/ui-components/SuccessModal";
import {
  selectShowSuccessModal,
  showSuccessModal,
  hideSuccessModal,
} from "../redux/signupSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();
  
  // Redux selectors
  const currentStep = useSelector(selectCurrentStep);
  const selectedRole = useSelector(selectSelectedRole);
  const selectedAuthMethod = useSelector(selectSelectedAuthMethod);
  const isLoading = useSelector(selectLoading);
  const profileInfo = useSelector(selectProfileInfo);
  const roleSpecificData = useSelector(selectRoleSpecificData);
  const showSuccess = useSelector(selectShowSuccessModal);

  // Refs for smooth scrolling
  const stepRefs = useRef([]);

  // Auto-hide notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Scrolling with positioning
  const scrollToStep = (step, delay = 0) => {
    setTimeout(() => {
      const element = stepRefs.current[step - 1];
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }, delay);
  };

  // Convert step names to numbers for progress indicator
  const getCurrentStepNumber = () => {
    switch (currentStep) {
      case "selectRole": return 1;
      case "selectAuth": return 2;
      case "completeProfile": return 3;
      default: return 1;
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    dispatch(setLoading(true));
    try {
      const submitData = { 
        ...values, 
        role: selectedRole, 
        authMethod: selectedAuthMethod 
      };
      
      await signup(submitData).unwrap();

      dispatch(showSuccessModal());

    } catch (error) {
      dispatch(showNotification({
        type: "error",
        message: error.data?.message || "Failed to create account. Please try again."
      }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle back to auth step
  const handleBackToAuth = () => {
    dispatch(goBackToAuth());
  };

  // Create initial form values
  const getInitialValues = () => {
    return {
      ...profileInfo,
      ...roleSpecificData,
      password: "",
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
      <IslamicPattern />
      <NotificationBanner />
      <SuccessModal isOpen={showSuccess} onClose={() => dispatch(hideSuccessModal())} />

      <div className="relative z-10 container mx-auto px-4 py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Join Our Islamic Community
          </h1>
          <p className="text-gray-600 dark:text-gray-200 text-lg">
            Connect, learn, and grow together in faith
          </p>
        </div>

        <ProgressIndicator currentStep={getCurrentStepNumber()} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Formik
              initialValues={getInitialValues()}
              validationSchema={
                currentStep === "completeProfile"
                  ? getSignupValidationSchema(selectedRole, selectedAuthMethod)
                  : null
              }
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form className="space-y-8">
                  <RoleSelectionStep stepRefs={stepRefs} />
                  <AuthMethodSelectionStep stepRefs={stepRefs} />
                  <ProfileCompletionStep
                    stepRefs={stepRefs}
                    onPrevStep={handleBackToAuth}
                  />
                </Form>
              )}
            </Formik>
          </div>

          {/* Trust Indicators Sidebar */}
          <div className="lg:col-span-1">
            <TrustIndicators />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-100">
          <p className="mb-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 font-semibold"
            >
              Sign in here
            </Link>
          </p>
          <p className="text-sm">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
              Privacy Policy
            </Link>
          </p>
        </div>
              </div>
            </div>
        );};

export default SignUp;
