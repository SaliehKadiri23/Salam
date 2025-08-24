import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Flow State - cleaner naming
  currentStep: 'selectRole', // selectRole -> selectAuth -> completeProfile
  selectedRole: null,
  selectedAuthMethod: null,
  showRoleSelection: true,
  
  // Step 2: Authentication Data
  authCredentials: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  
  // Step 3: Profile Data (no email/password)
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
  
  // Auth State
  isAuthenticated: false,
  authProvider: null,
  socialAuthData: {},
  
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
    }
  },
});

export const {
  selectRole,
  goBackToRoleSelection,
  selectAuthMethod,
  proceedToProfile,
  updateAuthCredentials,
  updateProfileInfo,
  updateRoleSpecificData,
  setSocialAuthData,
  setLoading,
  setError,
  clearError,
  clearAllErrors,
  setFieldValidation,
  setCurrentSection,
  setAgreements,
  updateCanProceed,
  resetSignup,
  completeSignup
} = signupSlice.actions;

// Selectors - cleaner naming
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

export default signupSlice.reducer;