import * as Yup from 'yup';

// Login validation schema with Islamic-friendly error messages
export const getLoginValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address, as Allah loves those who are truthful')
      .required('Email address is required to access your account'),
    
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters for your account security')
      .required('Password is required to sign in'),
    
    rememberMe: Yup.boolean()
  });
};

// Initial values for the login form
export const getLoginInitialValues = (savedCredentials = {}) => {
  return {
    email: savedCredentials.email || '',
    password: '',
    rememberMe: savedCredentials.hasRememberedCredentials || false
  };
};

// Helper function to get field labels
export const getFieldLabel = (fieldName) => {
  const labels = {
    email: 'Email Address',
    password: 'Password',
    rememberMe: 'Remember Me'
  };
  return labels[fieldName] || fieldName;
};

// Helper function to get field types
export const getFieldType = (fieldName) => {
  const types = {
    email: 'email',
    password: 'password',
    rememberMe: 'checkbox'
  };
  return types[fieldName] || 'text';
};

// Helper function to get field placeholders
export const getFieldPlaceholder = (fieldName) => {
  const placeholders = {
    email: 'your.email@example.com',
    password: 'Enter your password',
    rememberMe: ''
  };
  return placeholders[fieldName] || '';
};

// Helper function to check if field is required
export const isFieldRequired = (fieldName) => {
  const requiredFields = ['email', 'password'];
  return requiredFields.includes(fieldName);
};

// Helper function to get validation helper text
export const getFieldHelperText = (fieldName) => {
  const helperTexts = {
    email: 'Email format: user@example.com',
    password: 'Enter the password you created for your account',
    rememberMe: 'Stay signed in on this device for easier access (not recommended on shared devices)'
  };
  
  return helperTexts[fieldName] || '';
};

// Helper function to check if email exists in remembered users
export const checkEmailInRememberedUsers = (email, rememberedUsers = []) => {
  if (!email || !Array.isArray(rememberedUsers)) return false;
  return rememberedUsers.some(user => 
    user.email && user.email.toLowerCase() === email.toLowerCase()
  );
};

// Password strength indicator helper
export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: '', color: '' };
  
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password)
  };
  
  strength = Object.values(checks).filter(Boolean).length;
  
  const indicators = {
    0: { label: '', color: '', strength: 0 },
    1: { label: 'Very Weak', color: 'text-red-500', strength: 20 },
    2: { label: 'Weak', color: 'text-red-400', strength: 40 },
    3: { label: 'Fair', color: 'text-yellow-500', strength: 60 },
    4: { label: 'Good', color: 'text-blue-500', strength: 80 },
    5: { label: 'Strong', color: 'text-green-500', strength: 100 }
  };
  
  return indicators[strength] || indicators[0];
};

// Custom validation messages with Islamic context
export const customValidationMessages = {
  emailFormat: 'Please enter a valid email address, as Allah loves those who are truthful',
  emailRequired: 'Email address is required to access your account',
  passwordRequired: 'Password is required to sign in',
  passwordMinLength: 'Password must be at least 8 characters for your account security',
  invalidCredentials: 'The email or password you entered is incorrect. Please check and try again, may Allah guide you.',
  accountNotFound: 'We couldn\'t find an account with this email address. Please check your email or create a new account.',
  emailNotVerified: 'Please verify your email address before signing in. Check your inbox for the verification link.',
  accountLocked: 'Your account has been temporarily locked for security. Please contact support or try again later.',
  networkError: 'Unable to connect at the moment. Please check your internet connection and try again.',
  serverError: 'We\'re experiencing technical difficulties. Please try again in a few moments, insha\'Allah.'
};

// Note: Remember Me functionality will be handled server-side with sessions and Passport.js
// These are just helper functions for the UI state
export const handleRememberMeToggle = (currentValue, setFieldValue) => {
  setFieldValue('rememberMe', !currentValue);
};