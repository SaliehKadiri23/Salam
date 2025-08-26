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

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux selectors
  const currentStep = useSelector(selectCurrentStep);
  const selectedRole = useSelector(selectSelectedRole);
  const selectedAuthMethod = useSelector(selectSelectedAuthMethod);
  const isLoading = useSelector(selectLoading);
  const profileInfo = useSelector(selectProfileInfo);
  const roleSpecificData = useSelector(selectRoleSpecificData);

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
      console.log("Submitting signup data:", submitData);

      // API integration placeholder
      // const response = await signUpUser(submitData);

      dispatch(showNotification({
        type: "success",
        message: "Account created successfully! Welcome to our community."
      }));

      // Redirect or show success state
      setTimeout(() => {
        // navigate('/dashboard');
      }, 2000);
    } catch (error) {
      dispatch(showNotification({
        type: "error",
        message: "Failed to create account. Please try again."
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 relative overflow-hidden">
      <IslamicPattern />
      <NotificationBanner />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Join Our Islamic Community
          </h1>
          <p className="text-gray-600 text-lg">
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
                    onSubmit={handleSubmit}
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
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Sign in here
            </Link>
          </p>
          <p className="text-sm">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-green-600 hover:text-green-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-green-600 hover:text-green-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
