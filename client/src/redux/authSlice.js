import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Authentication State
  isAuthenticated: false,
  user: null,
  role: null, // 'community', 'imam', 'chief-imam'
  
  // User Object Structure
  userData: {
    id: null,
    email: '',
    name: '',
    role: null,
    profilePicture: null,
    joinDate: null,
    lastLogin: null,
    isEmailVerified: false,
  },

  // Login Form Data
  loginForm: {
    email: '',
    password: '',
    rememberMe: false,
  },

  // Session Management
  session: {
    sessionToken: null,
    expiresAt: null,
    lastActivity: null,
    deviceInfo: {
      browser: null,
      os: null,
      ip: null,
      userAgent: null,
    },
  },

  // UI State
  loading: false,
  loginLoading: false,
  errors: {},
  fieldValidation: {},

  // Remember Me State
  rememberMeEnabled: false,
  savedCredentials: {
    email: '',
    hasRememberedCredentials: false,
  },

  // Forgot Password State
  forgotPasswordModal: {
    isVisible: false,
  },
  forgotPasswordLoading: false,
  forgotPasswordStatus: 'idle', // 'idle', 'loading', 'success', 'error'

  // Auth Provider (for social auth)
  authProvider: null, // 'google', etc.
  socialAuthData: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login Form Actions
    setCredentials: (state, action) => {
      const { email, password } = action.payload;
      state.loginForm.email = email || state.loginForm.email;
      state.loginForm.password = password || state.loginForm.password;
      
      // Clear password-related errors when credentials are updated
      if (password !== undefined) {
        delete state.errors.password;
        delete state.errors.login;
      }
      if (email !== undefined) {
        delete state.errors.email;
        delete state.errors.login;
      }
    },

    toggleRememberMe: (state) => {
      state.loginForm.rememberMe = !state.loginForm.rememberMe;
      state.rememberMeEnabled = state.loginForm.rememberMe;
    },

    // Authentication Flow Actions
    loginStart: (state) => {
      state.loginLoading = true;
      state.loading = true;
      state.errors = {};
    },

    loginSuccess: (state, action) => {
      const { user, sessionToken, expiresAt, deviceInfo } = action.payload;
      
      state.isAuthenticated = true;
      state.user = user;
      state.role = user.role;
      state.userData = {
        ...state.userData,
        ...user,
      };

      // Update session data
      state.session = {
        sessionToken,
        expiresAt,
        lastActivity: new Date().toISOString(),
        deviceInfo: deviceInfo || state.session.deviceInfo,
      };

      // Handle remember me functionality
      if (state.loginForm.rememberMe) {
        state.savedCredentials = {
          email: state.loginForm.email,
          hasRememberedCredentials: true,
        };
      }

      // Reset loading states
      state.loginLoading = false;
      state.loading = false;
      state.errors = {};
    },

    loginFailure: (state, action) => {
      const { error, field } = action.payload;
      
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.loginLoading = false;
      state.loading = false;

      // Set error message
      if (field) {
        state.errors[field] = error;
      } else {
        state.errors.login = error;
      }
    },

    // Logout Action
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.userData = initialState.userData;
      state.session = initialState.session;
      state.authProvider = null;
      state.socialAuthData = {};

      // Preserve remember me settings if enabled
      if (!state.loginForm.rememberMe) {
        state.savedCredentials = initialState.savedCredentials;
        state.loginForm.email = '';
      }
      
      state.loginForm.password = '';
      state.errors = {};
      state.loading = false;
      state.loginLoading = false;
    },

    // Session Management
    updateSession: (state, action) => {
      const { sessionToken, expiresAt, lastActivity } = action.payload;
      
      state.session = {
        ...state.session,
        sessionToken: sessionToken || state.session.sessionToken,
        expiresAt: expiresAt || state.session.expiresAt,
        lastActivity: lastActivity || new Date().toISOString(),
      };
    },

    // User Role Management
    setUserRole: (state, action) => {
      const newRole = action.payload;
      state.role = newRole;
      state.userData.role = newRole;
      if (state.user) {
        state.user.role = newRole;
      }
    },

    // Form Management
    resetLoginForm: (state) => {
      state.loginForm = {
        email: state.savedCredentials.hasRememberedCredentials ? state.savedCredentials.email : '',
        password: '',
        rememberMe: state.rememberMeEnabled,
      };
      state.errors = {};
      state.fieldValidation = {};
    },

    // Error Handling
    setError: (state, action) => {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },

    clearError: (state, action) => {
      const field = action.payload;
      delete state.errors[field];
    },

    clearAllErrors: (state) => {
      state.errors = {};
    },

    // Field Validation
    setFieldValidation: (state, action) => {
      const { field, isValid } = action.payload;
      state.fieldValidation[field] = isValid;
    },

    // Loading States
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setLoginLoading: (state, action) => {
      state.loginLoading = action.payload;
    },

    // Social Authentication
    setSocialAuthData: (state, action) => {
      const { provider, data } = action.payload;
      state.socialAuthData = data;
      state.authProvider = provider;
    },

    // Device Info Update
    updateDeviceInfo: (state, action) => {
      state.session.deviceInfo = {
        ...state.session.deviceInfo,
        ...action.payload,
      };
    },

    // User Data Updates
    updateUserData: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
      
      // Update user object if it exists
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },

    // Email Verification
    setEmailVerified: (state, action) => {
      state.userData.isEmailVerified = action.payload;
      if (state.user) {
        state.user.isEmailVerified = action.payload;
      }
    },

    // Remember Me Management
    clearRememberedCredentials: (state) => {
      state.savedCredentials = initialState.savedCredentials;
      state.rememberMeEnabled = false;
      state.loginForm.rememberMe = false;
    },

    // Session Expiry Check
    checkSessionExpiry: (state) => {
      const now = new Date().getTime();
      const expiresAt = state.session.expiresAt ? new Date(state.session.expiresAt).getTime() : 0;
      
      if (expiresAt && now > expiresAt) {
        // Session expired, logout user
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
        state.session = initialState.session;
        state.errors.session = 'Your session has expired. Please log in again.';
      }
    },

    // Forgot Password Actions
    showForgotPasswordModal: (state) => {
      state.forgotPasswordModal.isVisible = true;
      state.forgotPasswordStatus = 'idle';
      state.forgotPasswordLoading = false;
      // Clear any previous errors
      delete state.errors.forgotPassword;
      delete state.errors.email;
    },

    hideForgotPasswordModal: (state) => {
      state.forgotPasswordModal.isVisible = false;
      state.forgotPasswordStatus = 'idle';
      state.forgotPasswordLoading = false;
      // Clear forgot password related errors
      delete state.errors.forgotPassword;
      delete state.errors.email;
    },

    forgotPasswordStart: (state) => {
      state.forgotPasswordLoading = true;
      state.forgotPasswordStatus = 'loading';
      // Clear any previous errors
      delete state.errors.forgotPassword;
      delete state.errors.email;
    },

    forgotPasswordSuccess: (state, action) => {
      const { message, email } = action.payload;
      state.forgotPasswordLoading = false;
      state.forgotPasswordStatus = 'success';
      state.forgotPasswordModal.successMessage = message;
      state.forgotPasswordModal.email = email;
      // Clear any errors
      state.errors = {};
    },

    forgotPasswordFailure: (state, action) => {
      const { error, field } = action.payload;
      state.forgotPasswordLoading = false;
      state.forgotPasswordStatus = 'error';
      
      // Set error message
      if (field) {
        state.errors[field] = error;
      } else {
        state.errors.forgotPassword = error;
      }
    },

    // Login Success initiated from API call (RTK Query)
    apiLoginSuccess: (state, action) => {
      const { user, sessionToken, rememberMe } = action.payload;
      
      state.isAuthenticated = true;
      state.user = user;
      state.role = user.role;
      state.userData = {
        ...state.userData,
        ...user,
      };

      // Update session data if provided
      if (sessionToken) {
        state.session = {
          ...state.session,
          sessionToken,
        };
      }

      // Handle remember me functionality
      if (rememberMe) {
        state.savedCredentials = {
          email: user.email,
          hasRememberedCredentials: true,
        };
      }

      // Reset loading states
      state.loginLoading = false;
      state.loading = false;
      state.errors = {};
    },

    // Login Failure initiated from API call (RTK Query)
    apiLoginFailure: (state, action) => {
      const { error } = action.payload;
      
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.loginLoading = false;
      state.loading = false;

      // Set error message
      state.errors.login = error;
    },

    // Logout initiated from API call (RTK Query)
    apiLogoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.userData = initialState.userData;
      state.session = initialState.session;
      state.authProvider = null;
      state.socialAuthData = {};

      // Preserve remember me settings if enabled
      if (!state.loginForm.rememberMe) {
        state.savedCredentials = initialState.savedCredentials;
        state.loginForm.email = '';
      }
      
      state.loginForm.password = '';
      state.errors = {};
      state.loading = false;
      state.loginLoading = false;
    },

    // Reset Auth State
    resetAuthState: (state) => {
      return {
        ...initialState,
        // Preserve remember me settings
        savedCredentials: state.savedCredentials,
        rememberMeEnabled: state.rememberMeEnabled,
        loginForm: {
          ...initialState.loginForm,
          email: state.savedCredentials.hasRememberedCredentials ? state.savedCredentials.email : '',
          rememberMe: state.rememberMeEnabled,
        },
      };
    },
  },
});

export const {
  setCredentials,
  toggleRememberMe,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateSession,
  setUserRole,
  resetLoginForm,
  setError,
  clearError,
  clearAllErrors,
  setFieldValidation,
  setLoading,
  setLoginLoading,
  setSocialAuthData,
  updateDeviceInfo,
  updateUserData,
  setEmailVerified,
  clearRememberedCredentials,
  checkSessionExpiry,
  resetAuthState,
  showForgotPasswordModal,
  hideForgotPasswordModal,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  apiLoginSuccess,
  apiLoginFailure,
  apiLogoutSuccess,
} = authSlice.actions;

// Selectors
export const selectAuthState = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectUserData = (state) => state.auth.userData;
export const selectUserRole = (state) => state.auth.role;
export const selectLoginForm = (state) => state.auth.loginForm;
export const selectSession = (state) => state.auth.session;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectLoginLoading = (state) => state.auth.loginLoading;
export const selectAuthErrors = (state) => state.auth.errors;
export const selectFieldValidation = (state) => state.auth.fieldValidation;
export const selectRememberMe = (state) => state.auth.loginForm.rememberMe;
export const selectSavedCredentials = (state) => state.auth.savedCredentials;
export const selectAuthProvider = (state) => state.auth.authProvider;
export const selectSocialAuthData = (state) => state.auth.socialAuthData;
export const selectSessionToken = (state) => state.auth.session.sessionToken;
export const selectIsEmailVerified = (state) => state.auth.userData.isEmailVerified;

// Forgot Password Selectors
export const selectForgotPasswordModal = (state) => state.auth.forgotPasswordModal.isVisible;
export const selectForgotPasswordLoading = (state) => state.auth.forgotPasswordLoading;
export const selectForgotPasswordStatus = (state) => state.auth.forgotPasswordStatus;
export const selectForgotPasswordData = (state) => state.auth.forgotPasswordModal;

// Complex Selectors
export const selectIsSessionValid = (state) => {
  const { sessionToken, expiresAt } = state.auth.session;
  if (!sessionToken || !expiresAt) return false;
  
  const now = new Date().getTime();
  const expiry = new Date(expiresAt).getTime();
  return now < expiry;
};

export const selectUserPermissions = (state) => {
  const role = state.auth.role;
  const permissions = {
    canModerate: role === 'imam' || role === 'chief-imam',
    canManageUsers: role === 'chief-imam',
    canPostAnnouncements: role === 'imam' || role === 'chief-imam',
    canManageEvents: role === 'imam' || role === 'chief-imam',
    canAccessAdminPanel: role === 'chief-imam',
  };
  return permissions;
};

export const selectLoginFormData = (state) => ({
  email: state.auth.loginForm.email,
  password: state.auth.loginForm.password,
  rememberMe: state.auth.loginForm.rememberMe,
});

export default authSlice.reducer;