import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSuccessModal: false,
  
  currentStep: 'selectRole',
  selectedRole: null,
  selectedAuthMethod: null,
  showRoleSelection: true,
  
  // Step 2: Authentication Data
  authCredentials: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  
  // Step 3: Profile Data 
  profileInfo: {
    fullName: '',
    location: '',
    phone: '',
  },
  roleSpecificData: {
    mosque: '',
    certification: '',
    experience: '',
    specialization: '',
    references: '',
    adminExperience: '',
  },
  
  // UI State
  loading: false,
  errors: {},
  fieldValidation: {},
  
  // Notification State
  notification: {
    show: false,
    type: "",
    message: "",
  },
  
  // Auth State
  isAuthenticated: false,
  authProvider: null,
  socialAuthData: {},
  googleId: null,
  
  // Progress
  completedSections: [],
  canProceed: false,
  
  // Terms and Privacy
  agreedToTerms: false,
  agreedToPrivacy: false,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    selectRole: (state, action) => {
      state.selectedRole = action.payload;
      state.currentStep = 'selectAuth';
      state.showRoleSelection = false;
      if (!state.completedSections.includes('roleSelection')) {
        state.completedSections.push('roleSelection');
      }
    },
    
    goBackToRoleSelection: (state) => {
      state.selectedRole = null;
      state.currentStep = 'selectRole';
      state.showRoleSelection = true;
      state.selectedAuthMethod = null;
      state.authCredentials = { email: '', password: '', confirmPassword: '' };
      state.completedSections = state.completedSections.filter(section => section !== 'roleSelection');
    },
    
    selectAuthMethod: (state, action) => {
      state.selectedAuthMethod = action.payload;
      if (action.payload !== 'email') {
        // For social auth, skip to profile completion
        state.currentStep = 'completeProfile';
      }
    },
    
    proceedToProfile: (state) => {
      state.currentStep = 'completeProfile';
      if (!state.completedSections.includes('authentication')) {
        state.completedSections.push('authentication');
      }
    },
    
    goBackToAuth: (state) => {
      state.currentStep = 'selectAuth';
    },
    
    setAuthMethod: (state, action) => {
      state.authMethod = action.payload;
      state.currentSection = 'registration';
      if (!state.completedSections.includes('authentication')) {
        state.completedSections.push('authentication');
      }
    },
    
    updateAuthCredentials: (state, action) => {
      state.authCredentials = { ...state.authCredentials, ...action.payload };
    },
    
    updateProfileInfo: (state, action) => {
      state.profileInfo = { ...state.profileInfo, ...action.payload };
    },
    
    updateRoleSpecificData: (state, action) => {
      state.roleSpecificData = { ...state.roleSpecificData, ...action.payload };
    },
    
    setSocialAuthData: (state, action) => {
      state.socialAuthData = action.payload;
      state.authProvider = action.payload.provider;
      state.isAuthenticated = true;
    },
    
    setGoogleId: (state, action) => {
      state.googleId = action.payload;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
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
    
    setFieldValidation: (state, action) => {
      const { field, isValid } = action.payload;
      state.fieldValidation[field] = isValid;
    },
    
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    
    setAgreements: (state, action) => {
      const { terms, privacy } = action.payload;
      if (terms !== undefined) state.agreedToTerms = terms;
      if (privacy !== undefined) state.agreedToPrivacy = privacy;
    },
    
    updateCanProceed: (state) => {
      const { selectedRole, selectedAuthMethod, authCredentials, profileInfo, agreedToTerms, agreedToPrivacy } = state;
      
      const hasSelectedRole = selectedRole !== null;
      const hasSelectedAuth = selectedAuthMethod !== null;
      
      // For email auth, check credentials
      const hasValidAuth = selectedAuthMethod === 'email'
        ? authCredentials.email && authCredentials.password && authCredentials.confirmPassword
        : selectedAuthMethod !== null;
      
      const hasRequiredProfile = profileInfo.fullName && profileInfo.location;
      const hasAgreedToTerms = agreedToTerms && agreedToPrivacy;
      
      state.canProceed = hasSelectedRole && hasValidAuth && hasRequiredProfile && hasAgreedToTerms;
    },
    
    resetSignup: (state) => {
      return initialState;
    },
    
    completeSignup: (state) => {
      state.currentSection = 'completed';
      state.completedSections.push('registration');
    },
    
    // Notification Actions
    showNotification: (state, action) => {
      const { type, message } = action.payload;
      state.notification = {
        show: true,
        type,
        message,
      };
    },
    
    hideNotification: (state) => {
      state.notification = {
        show: false,
        type: "",
        message: "",
      };
    },
    showSuccessModal: (state) => {
      state.showSuccessModal = true;
    },
    hideSuccessModal: (state) => {
      state.showSuccessModal = false;
    }
  },
});

export const {
  selectRole,
  goBackToRoleSelection,
  selectAuthMethod,
  proceedToProfile,
  goBackToAuth,
  updateAuthCredentials,
  updateProfileInfo,
  updateRoleSpecificData,
  setSocialAuthData,
  setGoogleId,
  setLoading,
  setError,
  clearError,
  clearAllErrors,
  setFieldValidation,
  setCurrentSection,
  setAgreements,
  updateCanProceed,
  resetSignup,
  completeSignup,
  showNotification,
  hideNotification,
  showSuccessModal,
  hideSuccessModal
} = signupSlice.actions;

// Selectors
export const selectSignupState = (state) => state.signup;
export const selectCurrentStep = (state) => state.signup.currentStep;
export const selectSelectedRole = (state) => state.signup.selectedRole;
export const selectSelectedAuthMethod = (state) => state.signup.selectedAuthMethod;
export const selectShowRoleSelection = (state) => state.signup.showRoleSelection;
export const selectAuthCredentials = (state) => state.signup.authCredentials;
export const selectProfileInfo = (state) => state.signup.profileInfo;
export const selectRoleSpecificData = (state) => state.signup.roleSpecificData;
export const selectErrors = (state) => state.signup.errors;
export const selectLoading = (state) => state.signup.loading;
export const selectCanProceed = (state) => state.signup.canProceed;
export const selectNotification = (state) => state.signup.notification;
export const selectShowSuccessModal = (state) => state.signup.showSuccessModal;
export const selectGoogleId = (state) => state.signup.googleId;
export const selectAuthProvider = (state) => state.signup.authProvider;

export default signupSlice.reducer;