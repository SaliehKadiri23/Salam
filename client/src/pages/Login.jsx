import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  setCredentials,
  toggleRememberMe,
  loginStart,
  loginSuccess,
  loginFailure,
  selectLoginForm,
  selectAuthLoading,
  selectLoginLoading,
  selectAuthErrors,
  selectSavedCredentials,
  selectUserData,
  clearAllErrors,
  setUserRole,
  showForgotPasswordModal,
  apiLoginSuccess,
  apiLoginFailure,
} from "../redux/authSlice";
import {
  selectShowEmailForm,
  showNotification,
  resetLoginUi,
  showEmailForm,
} from "../redux/loginUiSlice";
import { useLoginMutation } from "../services/apiSlice";

// Components
import NotificationBanner from "../components/login/ui-components/NotificationBanner";
import PageHeader from "../components/login/ui-components/PageHeader";
import LoginFormContainer from "../components/login/ui-components/LoginFormContainer";
import SignInOptionsSection from "../components/login/ui-components/SignInOptionsSection";
import EmailPasswordForm from "../components/login/form-components/EmailPasswordForm";
import TrustIndicators from "../components/login/ui-components/TrustIndicators";
import ForgotPasswordModal from "../components/login/ForgotPasswordModal";
import IslamicPattern from "../components/utility/IslamicPattern";

export default function Login() {
  const dispatch = useDispatch();

  // Redux state
  const showEmailFormState = useSelector(selectShowEmailForm);
  const authLoading = useSelector(selectAuthLoading);
  const loginLoading = useSelector(selectLoginLoading);
  const errors = useSelector(selectAuthErrors);
  const savedCredentials = useSelector(selectSavedCredentials);
  const userData = useSelector(selectUserData);
  const loginForm = useSelector(selectLoginForm);

  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  // Initialize component
  useEffect(() => {
    dispatch(clearAllErrors());

    // If user has saved credentials, show the email form by default
    if (savedCredentials.hasRememberedCredentials) {
      dispatch(showEmailForm());
    }

    // Reset UI state on mount
    return () => {
      dispatch(resetLoginUi());
    };
  }, [dispatch, savedCredentials.hasRememberedCredentials]);

  // Get initial values
  const initialValues = {
    email: savedCredentials.email || "",
    password: "",
    rememberMe: savedCredentials.hasRememberedCredentials || false,
  };

  const handleSocialAuth = (provider) => {
    if (provider.toLowerCase() === "google") {
      window.location.href = "https://salam-phi.vercel.app/api/auth/google";
    } else {
      toast.info(
        `Social authentication with ${provider} is not yet implemented.`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  const handleForgotPassword = () => {
    dispatch(showForgotPasswordModal());
  };

  // RTK Query mutation
  const [loginMutation, { isLoading: isLoginMutationLoading }] =
    useLoginMutation();

  // Form submission handler
  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      dispatch(loginStart());

      dispatch(
        setCredentials({
          email: values.email,
          password: values.password,
        })
      );

      if (values.rememberMe !== savedCredentials.hasRememberedCredentials) {
        dispatch(toggleRememberMe());
      }

      // Call the RTK Query login mutation
      const result = await loginMutation({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (result.success) {
        dispatch(
          apiLoginSuccess({
            user: result.user,
            sessionToken: result.sessionToken || null,
            rememberMe: values.rememberMe,
          })
        );

        // Show success toast
        toast.success("Login successful, Alhamdulillah!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Navigate to the appropriate page based on user role
        switch (result.user.role) {
          case "chief-imam":
            navigate("/resource_dashboard");
            break;
          case "imam":
            navigate("/resource_dashboard");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        dispatch(
          apiLoginFailure({
            error: result.message || "Login failed",
          })
        );

        // Show error toast
        toast.error(result.message || "Login failed. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage =
        "Unable to connect. Please check your internet connection and try again.";

      // Handle different error types - including network errors
      if (error && typeof error === "object") {
        if (error.status === "FETCH_ERROR") {
          errorMessage =
            "Network error: Unable to connect to the server. Please check your connection.";
        } else if (error.status === "PARSING_ERROR") {
          errorMessage = "Server response error. Please try again.";
        } else if (error.data && error.data.message) {
          errorMessage = error.data.message;
        } else if (error.error) {
          errorMessage = error.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      dispatch(
        apiLoginFailure({
          error: errorMessage,
        })
      );

      // Show error toast
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-teal-700 relative overflow-">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <IslamicPattern />
      </div>

      {/* Notification Banner */}
      <NotificationBanner />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Page Header */}
        <PageHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Login Form Container */}
            <LoginFormContainer>
              {/* Show either Sign In Options OR Email Password Form based on state */}
              {!showEmailFormState ? (
                // Sign In Options View
                <SignInOptionsSection
                  onSocialAuth={handleSocialAuth}
                  onEmailSignIn={() => dispatch(showEmailForm())}
                />
              ) : (
                // Email Password Form View
                <EmailPasswordForm
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleFormSubmit}
                  onForgotPassword={handleForgotPassword}
                  isLoading={loginLoading || isLoginMutationLoading}
                  errors={errors}
                  savedCredentials={savedCredentials}
                />
              )}
            </LoginFormContainer>
          </div>

          {/* Trust Indicators Sidebar */}
          <div className="lg:col-span-1 overflow-hidden">
            <TrustIndicators />
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal />
    </div>
  );
}

// export default Login;
