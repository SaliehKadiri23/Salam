import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaGoogle,
  FaFacebook,
  FaUsers,
  FaMosque,
  FaCrown,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaStar,
  FaShieldAlt,
  FaUserFriends,
  FaGlobe,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router";

const SignUp = () => {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [authMethod, setAuthMethod] = useState("");
  const [formData, setFormData] = useState({
    role: "",
    authMethod: "",
    fullName: "",
    email: "",
    password: "",
    location: "",
    phone: "",
    // Imam specific fields
    mosque: "",
    certification: "",
    experience: "",
    specialization: "",
    // Chief Imam specific fields
    references: "",
    adminExperience: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const navigate = useNavigate();

  // Refs for smooth scrolling
  const stepRefs = useRef([]);

  // Role options
  const roles = [
    {
      id: "community_member",
      title: "Community Member",
      description:
        "Join our Islamic community to access resources, participate in discussions, and connect with fellow Muslims.",
      icon: FaUsers,
      color: "from-green-400 to-green-600",
      permissions: [
        "Access Islamic resources and articles",
        "Join community discussions",
        "Request duas and spiritual support",
        "Attend virtual events",
        "Edit your personal profile",
      ],
    },
    {
      id: "imam",
      title: "Imam",
      description:
        "Lead and guide the community with Islamic knowledge, organize events, and provide spiritual guidance.",
      icon: FaMosque,
      color: "from-teal-400 to-teal-600",
      permissions: [
        "All Community Member privileges",
        "Create and manage community events",
        "Write and publish articles",
        "Moderate community discussions",
        "Remove inappropriate content",
        "Access imam resources and tools",
      ],
    },
    {
      id: "chief_imam",
      title: "Chief Imam",
      description:
        "Provide administrative oversight, manage imam community, and ensure Islamic authenticity across the platform.",
      icon: FaCrown,
      color: "from-yellow-400 to-yellow-600",
      permissions: [
        "All Imam privileges",
        "Manage imam accounts and permissions",
        "Access administrative dashboard",
        "Review and approve imam applications",
        "Moderate platform-wide content",
        "Access detailed community analytics",
      ],
    },
  ];

  // Validation schemas
  const getValidationSchema = () => {
    const baseSchema = {
      fullName: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      location: Yup.string().required("Location is required"),
      phone: Yup.string().matches(
        /^[\+]?[1-9]\d{1,14}$/,
        "Invalid phone number format"
      ),
    };

    if (authMethod === "email") {
      baseSchema.password = Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/(?=.*[a-z])/, "Password must contain lowercase letter")
        .matches(/(?=.*[A-Z])/, "Password must contain uppercase letter")
        .matches(/(?=.*\d)/, "Password must contain a number")
        .matches(/(?=.*[@$!%*?&])/, "Password must contain special character")
        .required("Password is required");
    }

    if (selectedRole === "imam") {
      baseSchema.mosque = Yup.string().required(
        "Mosque affiliation is required"
      );
      baseSchema.certification = Yup.string().required(
        "Certification is required"
      );
      baseSchema.experience = Yup.string().required("Experience is required");
      baseSchema.specialization = Yup.string().required(
        "Specialization is required"
      );
    }

    if (selectedRole === "chief_imam") {
      baseSchema.mosque = Yup.string().required(
        "Mosque affiliation is required"
      );
      baseSchema.certification = Yup.string().required(
        "Certification is required"
      );
      baseSchema.experience = Yup.string().required("Experience is required");
      baseSchema.specialization = Yup.string().required(
        "Specialization is required"
      );
      baseSchema.references = Yup.string().required("References are required");
      baseSchema.adminExperience = Yup.string().required(
        "Administrative experience is required"
      );
    }

    return Yup.object().shape(baseSchema);
  };

  // Check if user can proceed to next step
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedRole !== "";
      case 2:
        return authMethod !== "";
      case 3:
        return true; //   This is handled by Formik Validation
      default:
        return false;
    }
  };

  // Handle step navigation
  const nextStep = () => {
    if (canProceed() && currentStep < 3) {
      setCurrentStep(currentStep + 1);
      scrollToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToStep(currentStep - 1);
    }
  };

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

  // Handle role selection
  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setFormData((prev) => ({ ...prev, role: roleId }));
    // Automatically advance to step 2
    setTimeout(() => {
      setCurrentStep(2);
      scrollToStep(2);
    }, 300);
  };

  // Handle back to role selection
  const handleBackToRoleSelection = () => {
    setSelectedRole("");
    setAuthMethod("");
    setFormData((prev) => ({ ...prev, role: "", authMethod: "" }));
    setCurrentStep(1);
    scrollToStep(1);
  };

  // Handle auth method selection
  const handleAuthMethodSelect = (method) => {
    setAuthMethod(method);
    setFormData((prev) => ({ ...prev, authMethod: method }));
  };

  // Handle social auth
  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
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

      // Set auth method and pre-fill form data
      setAuthMethod(provider.toLowerCase());
      setFormData((prev) => ({
        ...prev,
        authMethod: provider.toLowerCase(),
        fullName: mockSocialAuthData.fullName,
        email: mockSocialAuthData.email,
        // Social auth users don't need password
        password: "",
      }));

      // Show success notification
      showNotification(
        "success",
        `${provider} authentication successful! Please complete your profile.`
      );

      // Advance to step 3 (Profile Completion) with a slight delay
      setTimeout(() => {
        setCurrentStep(3);
        scrollToStep(3, 100);
      }, 1000);
    } catch (error) {
      showNotification("error", `Failed to authenticate with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const submitData = { ...values, role: selectedRole, authMethod };
      console.log("Submitting signup data:", submitData);

      // API integration placeholder
      // const response = await signUpUser(submitData);

      showNotification(
        "success",
        "Account created successfully! Welcome to our community."
      );

      // Redirect or show success state
      setTimeout(() => {
        // window.location.href = '/dashboard';
      }, 2000);
    } catch (error) {
      showNotification("error", "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 5000);
  };

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center sm:space-x-8 space-x-2">
        {[
          { step: 1, label: "Select Role", completed: currentStep > 1 },
          { step: 2, label: "Authentication", completed: currentStep > 2 },
          { step: 3, label: "Complete Profile", completed: false },
        ].map(({ step, label, completed }) => (
          <div key={step} className="flex items-center">
            <div
              className={`
              flex items-center justify-center size-6 sm:size-10 rounded-full border-2 font-semibold text-sm
              ${
                currentStep === step
                  ? "bg-green-500 border-green-500 text-white"
                  : completed
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }
            `}
            >
              {completed ? <FaCheck className="w-4 h-4" /> : step}
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep === step ? "text-green-600" : "text-gray-500"
              }`}
            >
              {label}
            </span>
            {step < 3 && (
              <FaChevronRight className="sm:ml-8 ml-2 text-gray-300 w-4 h-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Trust indicators component
  const TrustIndicators = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Join Our Community
      </h3>

      <div className="space-y-6">
        {[
          {
            icon: FaUsers,
            label: "Active Members",
            value: "50,000+",
            color: "text-green-600",
          },
          {
            icon: FaMosque,
            label: "Partner Mosques",
            value: "1,200+",
            color: "text-teal-600",
          },
          {
            icon: FaStar,
            label: "Trust Rating",
            value: "4.9/5",
            color: "text-yellow-500",
          },
          {
            icon: FaShieldAlt,
            label: "Verified Imams",
            value: "500+",
            color: "text-blue-600",
          },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-200">
        <div className="flex items-center space-x-3 mb-2">
          <FaGlobe className="text-green-600 w-5 h-5" />
          <span className="font-semibold text-green-800">Global Reach</span>
        </div>
        <p className="text-sm text-green-700">
          Connecting Muslims across 50+ countries worldwide
        </p>
      </div>
    </div>
  );

  // Islamic pattern component (simplified)
  const IslamicPattern = () => (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-green-500 rounded-full transform rotate-45"></div>
      <div className="absolute top-20 right-20 w-24 h-24 border-2 border-teal-500 rounded-full transform -rotate-45"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-yellow-500 rounded-full transform rotate-12"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 border-2 border-green-500 rounded-full transform -rotate-12"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 relative overflow-hidden">
      <IslamicPattern />

      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

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

        <ProgressIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Formik
              initialValues={formData}
              validationSchema={
                currentStep === 3 ? getValidationSchema() : null
              }
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form className="space-y-8">
                  {/* Step 1: Role Selection */}
                  {currentStep === 1 && (
                    <div
                      ref={(el) => (stepRefs.current[0] = el)}
                      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Choose Your Role
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {roles.map((role) => (
                          <div
                            key={role.id}
                            onClick={() => handleRoleSelect(role.id)}
                            className={`
                              cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg relative overflow-hidden
                              ${
                                selectedRole === role.id
                                  ? "border-green-500 bg-green-50 shadow-lg scale-105"
                                  : "border-gray-200 bg-white hover:border-green-300"
                              }
                            `}
                          >
                            {/* Selection indicator */}
                            {selectedRole === role.id && (
                              <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <FaCheck className="w-3 h-3 text-white" />
                              </div>
                            )}

                            {/* Role Icon and Title */}
                            <div className="flex items-center mb-4">
                              <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center`}
                              >
                                <role.icon className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="font-bold text-lg text-gray-800 ml-3">
                                {role.title}
                              </h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                              {role.description}
                            </p>

                            {/* Permissions Preview */}
                            <div className="space-y-2">
                              <p className="text-sm font-semibold text-gray-700">
                                What you can do:
                              </p>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {role.permissions.map((permission, index) => (
                                  <li key={index} className="flex items-start">
                                    <FaCheck className="w-3 h-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{permission}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-around items-center">
                        <p className="text-gray-600">
                          Already have an account?{" "}
                          <Link
                            className="text-green-600 font-bold  hover:underline"
                            to={"/login"}
                          >
                            Login
                          </Link>
                        </p>

                        <button
                          type="button"
                          onClick={nextStep}
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
                  )}

                  {/* Step 2: Authentication */}
                  {currentStep === 2 && (
                    <div
                      ref={(el) => (stepRefs.current[1] = el)}
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
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                              roles.find((r) => r.id === selectedRole)?.color
                            } flex items-center justify-center`}
                          >
                            {React.createElement(
                              roles.find((r) => r.id === selectedRole)?.icon,
                              {
                                className: "w-4 h-4 text-white",
                              }
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-green-700">
                              Creating account as:
                            </p>
                            <p className="font-semibold text-green-800">
                              {roles.find((r) => r.id === selectedRole)?.title}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 mb-8">
                        {/* Social Authentication */}
                        <div className="space-y-4">
                          <button
                            type="button"
                            onClick={() => handleSocialAuth("Google")}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-red-400 hover:bg-red-50 transition-all duration-300"
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
                            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
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
                              authMethod === "email"
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
                          onClick={prevStep}
                          className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
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
                  )}

                  {/* Step 3: Profile Completion */}
                  {currentStep === 3 && (
                    <div
                      ref={(el) => (stepRefs.current[2] = el)}
                      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Complete Your Profile
                      </h2>

                      {/* Social Auth Indicator */}
                      {(authMethod === "google" ||
                        authMethod === "facebook") && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                          <div className="flex items-center justify-center gap-3">
                            {authMethod === "google" ? (
                              <FaGoogle className="text-red-500 w-5 h-5" />
                            ) : (
                              <FaFacebook className="text-blue-500 w-5 h-5" />
                            )}
                            <div className="text-center">
                              <p className="text-sm text-blue-700 font-medium">
                                Great! We've pre-filled some details from your{" "}
                                {authMethod === "google"
                                  ? "Google"
                                  : "Facebook"}{" "}
                                account
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Base Fields */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <Field
                            name="fullName"
                            type="text"
                            className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300"
                            placeholder="Enter your full name"
                          />
                          <ErrorMessage
                            name="fullName"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label
                            className={`block text-sm font-semibold text-gray-700 mb-2 `}
                          >
                            Email Address *
                          </label>
                          <Field
                            name="email"
                            type="email"
                            className="w-full p-4 border-2 disabled:bg-gray-200 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300"
                            placeholder="Enter your email"
                            disabled={
                              authMethod === "google" ||
                              authMethod === "facebook"
                            }
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        {authMethod === "email" && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Password *
                            </label>
                            <div className="relative">
                              <Field
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 pr-12"
                                placeholder="Create a strong password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Location *
                          </label>
                          <Field
                            name="location"
                            type="text"
                            className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300"
                            placeholder="Your city/country"
                          />
                          <ErrorMessage
                            name="location"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <Field
                            name="phone"
                            type="tel"
                            className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300"
                            placeholder="Optional phone number"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        {/* Imam/Chief Imam specific fields */}
                        {(selectedRole === "imam" ||
                          selectedRole === "chief_imam") && (
                          <>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Mosque Affiliation *
                              </label>
                              <Field
                                name="mosque"
                                type="text"
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300"
                                placeholder="Name of your mosque"
                              />
                              <ErrorMessage
                                name="mosque"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Certification *
                              </label>
                              <Field
                                name="certification"
                                type="text"
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300"
                                placeholder="Your Islamic certification"
                              />
                              <ErrorMessage
                                name="certification"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Years of Experience *
                              </label>
                              <Field
                                name="experience"
                                type="text"
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300"
                                placeholder="Years of experience"
                              />
                              <ErrorMessage
                                name="experience"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Specialization *
                              </label>
                              <Field
                                name="specialization"
                                type="text"
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300"
                                placeholder="Your area of specialization"
                              />
                              <ErrorMessage
                                name="specialization"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </>
                        )}

                        {/* Chief Imam additional fields */}
                        {selectedRole === "chief_imam" && (
                          <>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                References *
                              </label>
                              <Field
                                as="textarea"
                                name="references"
                                rows={4}
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 resize-none"
                                placeholder="Professional references (names, positions, contact info)"
                              />
                              <ErrorMessage
                                name="references"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Administrative Experience *
                              </label>
                              <Field
                                as="textarea"
                                name="adminExperience"
                                rows={4}
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 resize-none"
                                placeholder="Describe your administrative experience"
                              />
                              <ErrorMessage
                                name="adminExperience"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex justify-between">
                        {/* Hide back button for social auth users to prevent duplicate registrations */}
                        {authMethod !== "google" &&
                        authMethod !== "facebook" ? (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-all duration-300"
                          >
                            Back
                          </button>
                        ) : (
                          <div className="flex items-center text-sm text-gray-500">
                            <FaShieldAlt className="w-4 h-4 mr-2" />
                            <span>
                              Secured with{" "}
                              {authMethod === "google" ? "Google" : "Facebook"}
                            </span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isLoading || isSubmitting}
                          className={`
                            px-8 py-3 rounded-full font-semibold transition-all duration-300
                            ${
                              isLoading || isSubmitting
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
                            }
                          `}
                        >
                          {isLoading || isSubmitting
                            ? "Creating Account..."
                            : "Create Account"}
                        </button>
                      </div>
                    </div>
                  )}
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
            <a
              href="/login"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Sign in here
            </a>
          </p>
          <p className="text-sm">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-green-600 hover:text-green-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-green-600 hover:text-green-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
