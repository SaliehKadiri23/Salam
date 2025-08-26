import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Role Selection State
  selectedRole: null,
  
  // Form Display State
  showEmailForm: false,
  
  // Notification State
  notification: {
    show: false,
    type: '', // 'success' | 'error' | 'info' | 'warning'
    message: '',
    autoHideTimeout: 5000
  },
  
  // Password Visibility
  showPassword: false,
  
  // UI Loading States (separate from auth loading)
  isScrollingToForm: false,
};

const loginUiSlice = createSlice({
  name: 'loginUi',
  initialState,
  reducers: {
    // Role Selection Actions
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    
    clearSelectedRole: (state) => {
      state.selectedRole = null;
      state.showEmailForm = false;
    },
    
    // Form Display Actions
    showEmailForm: (state) => {
      state.showEmailForm = true;
    },
    
    hideEmailForm: (state) => {
      state.showEmailForm = false;
    },
    
    // Notification Actions
    showNotification: (state, action) => {
      const { type, message, autoHideTimeout = 5000 } = action.payload;
      state.notification = {
        show: true,
        type,
        message,
        autoHideTimeout
      };
    },
    
    hideNotification: (state) => {
      state.notification = {
        show: false,
        type: '',
        message: '',
        autoHideTimeout: 5000
      };
    },
    
    // Password Visibility Actions
    togglePasswordVisibility: (state) => {
      state.showPassword = !state.showPassword;
    },
    
    setPasswordVisibility: (state, action) => {
      state.showPassword = action.payload;
    },
    
    // UI State Actions
    setScrollingToForm: (state, action) => {
      state.isScrollingToForm = action.payload;
    },
    
    // Reset UI State
    resetLoginUi: (state) => {
      return initialState;
    },
    
    // Combined actions for better UX
    selectRoleAndShowForm: (state, action) => {
      state.selectedRole = action.payload;
      // Don't automatically show email form, show authentication options first
      state.showEmailForm = false;
    },
    
    backToRoleSelection: (state) => {
      state.selectedRole = null;
      state.showEmailForm = false;
      state.showPassword = false;
    }
  },
});

export const {
  setSelectedRole,
  clearSelectedRole,
  showEmailForm,
  hideEmailForm,
  showNotification,
  hideNotification,
  togglePasswordVisibility,
  setPasswordVisibility,
  setScrollingToForm,
  resetLoginUi,
  selectRoleAndShowForm,
  backToRoleSelection,
} = loginUiSlice.actions;

// Selectors
export const selectSelectedRole = (state) => state.loginUi.selectedRole;
export const selectShowEmailForm = (state) => state.loginUi.showEmailForm;
export const selectNotification = (state) => state.loginUi.notification;
export const selectShowPassword = (state) => state.loginUi.showPassword;
export const selectIsScrollingToForm = (state) => state.loginUi.isScrollingToForm;

// Derived selectors
export const selectHasSelectedRole = (state) => state.loginUi.selectedRole !== null;
export const selectShouldShowLoginOptions = (state) => 
  state.loginUi.selectedRole !== null && !state.loginUi.showEmailForm;
export const selectShouldShowEmailForm = (state) => 
  state.loginUi.selectedRole !== null && state.loginUi.showEmailForm;

export default loginUiSlice.reducer;